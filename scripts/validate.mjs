#!/usr/bin/env node
// The repo's own guard. Every rule this set teaches, checked against this set.
//
// A method that says "guards, born on the second occurrence, seen failing before
// they are trusted" and ships a repo where nothing is enforced has published a
// description of a discipline rather than the discipline. So each check below
// exists because the defect it catches HAS HAPPENED HERE — the count in a doc
// that went stale twice, the router that could not reach five of its own
// entry points, the seven command descriptions truncated mid-word.
//
// Usage:  node scripts/validate.mjs
//         node scripts/validate.mjs --verbose
//
// Exits 0 with a count when clean, 1 with the failures when not. No dependencies.

import { readFileSync as rawRead, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Every read goes through here. On a Windows checkout git hands back CRLF, and
 * a parser that anchors on "\n---" then reasons about the bytes after it sees
 * something subtly different from the file the author wrote. check-plugin-sync
 * learned this the same way — by a guard reporting identical files as different.
 */
const readFileSync = (path, enc = "utf8") => rawRead(path, enc).replace(/\r\n/g, "\n");

const VERBOSE = process.argv.includes("--verbose");
const problems = [];
const checks = [];

const fail = (check, detail) => problems.push({ check, detail });
const ran = (name, count) => checks.push(`${name} (${count})`);

// ---------------------------------------------------------------- load skills

const skillDirs = readdirSync("skills", { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

/** Minimal YAML frontmatter reader. Only the two fields we require. */
function frontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = text.slice(4, end);
  const out = {};
  let key = null;
  for (const line of block.split("\n")) {
    const m = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (m) {
      key = m[1];
      // `>-` and `|` folded scalars: the value is the indented block that follows
      out[key] = /^[>|]-?$/.test(m[2].trim()) ? "" : m[2].trim();
    } else if (key && /^\s+\S/.test(line)) {
      out[key] = `${out[key]} ${line.trim()}`.trim();
    }
  }
  return out;
}

const skills = new Map();
for (const dir of skillDirs) {
  const path = join("skills", dir, "SKILL.md");
  if (!existsSync(path)) {
    fail("skill has a SKILL.md", `${dir} — directory with no SKILL.md`);
    continue;
  }
  const text = readFileSync(path, "utf8");
  const fm = frontmatter(text);
  if (!fm) {
    fail("frontmatter parses", `${dir} — no parseable --- frontmatter block`);
    continue;
  }
  skills.set(dir, { fm, text, path });
}
ran("skills loaded", skills.size);

// ------------------------------------------------- 1. the frontmatter contract

for (const [dir, { fm }] of skills) {
  if (!fm.name) fail("frontmatter has name", `${dir}`);
  else if (fm.name !== dir)
    fail("name matches directory", `${dir} — frontmatter says "${fm.name}"; the harness registers by DIRECTORY, so this skill loads under the wrong name`);

  if (!fm.description) fail("frontmatter has description", `${dir}`);
  else if (fm.description.length < 40)
    fail("description is substantive", `${dir} — ${fm.description.length} chars; the description is the only thing the model routes on`);
}
ran("frontmatter contract", skills.size);

// ---------------------------------------------------- 1b. the H1 stays honest
//
// Three separate renames left the frontmatter `name` updated but the body's
// `# Method Whatever` heading pointing at the OLD name — invisible because
// nothing compared them. The rename script only ever touched the hyphenated
// identifier; a human-readable "Title Case With Spaces" heading was a
// different string, so it survived three passes unnoticed. Same shape as the
// count-in-prose defect, one level down: a value duplicated between the
// frontmatter and the body, with nothing keeping the second one honest.

for (const [dir, { text }] of skills) {
  const m = text.match(/^# (.+)$/m);
  if (!m) {
    fail("skill has an H1 title", `${dir} — no "# Title" line in the body`);
    continue;
  }
  const normalised = m[1].trim().toLowerCase().replace(/\s+/g, "-");
  if (normalised !== dir)
    fail("H1 matches the skill's current name", `${dir} — body heading reads "${m[1]}", a name this skill no longer has`);
}
ran("H1 titles", skills.size);

// --------------------------------------- 2. descriptions are not cut mid-word
//
// All seven command descriptions once shipped sliced at ~100 chars: "in what ",
// "ENDS IN AN ARTIFAC". A truncated description is the first thing a user sees
// in the slash-command menu, and nothing was checking it.

const looksTruncated = (s) => !/[.!?"'`)\]]$/.test(s.trim());

for (const [dir, { fm }] of skills) {
  if (fm.description && looksTruncated(fm.description))
    fail("description ends in a complete sentence", `${dir} — ends "…${fm.description.slice(-32)}"`);
}

// ------------------------------------------------- 3. no dangling cross-links

// [a-z-]+ , not [a-z]+ — two-word skills like `method-trapdoor` matched
// NOTHING under the old pattern, so every cross-reference to them was silently
// unchecked. A guard that quietly stops covering part of its surface is worse
// than one that fails loudly.
const NAMED = /`(method(?:-[a-z-]+)?|nzs-[a-z-]+)`/g;
let linkCount = 0;
for (const [dir, { text }] of skills) {
  for (const [, name] of text.matchAll(NAMED)) {
    linkCount += 1;
    if (!skills.has(name))
      fail("cross-reference resolves", `${dir} — names \`${name}\`, which is not a skill in this repo`);
  }
}
ran("cross-references", linkCount);

// ------------------------------- 4. every entry point is reachable and wired
//
// nzs-go once named exactly one of the six nzs-* skills. Five entry points
// existed and no request could reach them.

const ROUTER = "nzs-go";
// The router is an entry point too, but it cannot be required to route to
// itself — you reach it by typing its name.
const entryPoints = [...skills.keys()].filter((n) => n.startsWith("nzs-") && n !== ROUTER);
const router = skills.get(ROUTER);
if (!router) fail("the router exists", `skills/${ROUTER} is missing`);
else
  for (const name of entryPoints)
    if (!router.text.includes(`\`${name}\``))
      fail("entry point is reachable from the router", `${name} — no row in ${ROUTER}, so no request routes to it`);

for (const name of entryPoints.concat(ROUTER)) {
  const cmd = join("commands", `${name}.md`);
  if (!existsSync(cmd)) fail("entry point has a slash command", `${name} — no commands/${name}.md`);
}
ran("entry points", entryPoints.length + 1);

// ---------------------------------------- 5. commands point at real skills

const commandFiles = existsSync("commands") ? readdirSync("commands").filter((f) => f.endsWith(".md")) : [];
for (const file of commandFiles) {
  const name = file.replace(/\.md$/, "");
  if (!skills.has(name)) fail("command targets a real skill", `commands/${file} — no skills/${name}`);

  const fm = frontmatter(readFileSync(join("commands", file), "utf8"));
  if (!fm?.description) fail("command has a description", `commands/${file}`);
  else if (looksTruncated(fm.description))
    fail("command description is not cut mid-word", `commands/${file} — ends "…${fm.description.slice(-32)}"`);
}
ran("commands", commandFiles.length);

// ------------------------------------------------- 6. the README covers the set
//
// A skill absent from the README is a skill nobody browsing the repo finds.

// Both READMEs, when a translation exists — otherwise the translated one goes
// stale silently, which is worse than not having it: a reader trusts it.
const readmes = ["README.md", "README.th.md"].filter((f) => existsSync(f));
for (const file of readmes) {
  const text = readFileSync(file, "utf8");
  for (const name of skills.keys())
    if (!text.includes(`\`${name}\``))
      fail("README lists the skill", `${name} — not mentioned in ${file}`);
}
ran("README coverage", skills.size * readmes.length);

// --------------------------------------------- 7. no counts written in prose
//
// The shape that bit this repo three times: "expect 26" beside a command
// returning 29; "29 skills"; "the four entry points" when there were seven.
// A number in prose next to the thing that computes it goes stale silently.
// Write the comparison, never the count.

const PROSE = [
  "README.md",
  "README.th.md",
  "CONTEXT.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "docs/ECOSYSTEM.md",
  "docs/START-HERE.md",
  "docs/ECOSYSTEM.th.md",
  "docs/START-HERE.th.md",
  ...[...skills.values()].map((s) => s.path),
];
const COUNT_IN_PROSE = /\b(\d{2,})\s+skills\b|\bthe\s+(two|three|four|five|six|seven|eight|nine|ten)\s+(entry points|skills|commands)\b/gi;
/**
 * Code spans and fenced blocks are QUOTING, not asserting. The case study that
 * documents this very defect has to be able to write `29 skills` as the example
 * of what went wrong — flagging it there was this check's own false positive,
 * found the first time the docs described the bug that created the check.
 */
const proseOnly = (text) =>
  text.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ");

for (const file of PROSE) {
  if (!existsSync(file)) continue;
  for (const m of proseOnly(readFileSync(file, "utf8")).matchAll(COUNT_IN_PROSE))
    fail("no hardcoded count in prose", `${file} — "${m[0].trim()}" will be wrong the day the set changes; state the comparison instead`);
}

// ------------------------------------------------------- 8. no secret shapes
//
// This repo is public. method-vault says exposure is a rotation event, so the
// cheapest moment to catch a key is before it is ever pushed.

const SECRET_SHAPES = [
  [/\bsk-[A-Za-z0-9]{20,}/, "OpenAI-style key"],
  [/\bsk-ant-[A-Za-z0-9-]{20,}/, "Anthropic key"],
  [/\bghp_[A-Za-z0-9]{30,}/, "GitHub token"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./, "JWT"],
];
for (const file of PROSE) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, "utf8");
  for (const [re, label] of SECRET_SHAPES)
    if (re.test(text)) fail("no credential-shaped strings", `${file} — looks like a ${label}. Rotate it, then remove it.`);
}
ran("prose files scanned", PROSE.length);

// ------------------------------------------------- 9. every skill refuses something
//
// The set's own bar: a skill that cannot say what it will not do has no edge,
// and a skill with no edge is a paragraph of advice.

for (const [dir, { text }] of skills)
  if (!/^##[^\n]*\brefus\w*\b/im.test(text))
    fail("skill declares what it refuses", `${dir} — no "Refuses" section; a skill with no edge is advice`);

// ------------------------------------------------------------------- report

if (VERBOSE) for (const c of checks) console.log(`  checked ${c}`);

if (problems.length) {
  console.error(`\nnzs-skills validation FAILED — ${problems.length} problem(s):\n`);
  const byCheck = new Map();
  for (const { check, detail } of problems) {
    if (!byCheck.has(check)) byCheck.set(check, []);
    byCheck.get(check).push(detail);
  }
  for (const [check, details] of byCheck) {
    console.error(`  ${check}`);
    for (const d of details) console.error(`    - ${d}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`nzs-skills validation PASS — ${skills.size} skills, ${commandFiles.length} commands, ${checks.length} checks.`);
