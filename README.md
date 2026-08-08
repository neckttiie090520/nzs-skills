# nzs-skills

**English** · [ภาษาไทย](README.th.md)

![nzs-skills](docs/assets/banner.png)

A working method, as executable skills for [Claude Code](https://claude.com/claude-code).

[![validate](https://github.com/neckttiie090520/nzs-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/neckttiie090520/nzs-skills/actions/workflows/validate.yml)
[![licence: MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

> **New here, or you vibecode rather than write code all day?**
> Read **[Start here](docs/START-HERE.md)** ([ภาษาไทย](docs/START-HERE.th.md))
> instead of this page. Fifteen minutes, no jargon, and you will have used it.

Not a prompt collection. These were extracted from **279 commits and 106
instructions** of one real project, then attacked by adversarial review until
the reviews stopped finding things that mattered — including the reviews that
found defects in the skills themselves.

The method in one sentence: **nothing is done until it has been settled in the
medium where the claim is true.**

---

## Install

As a plugin, which keeps it updatable:

```
/plugin marketplace add neckttiie090520/nzs-skills
/plugin install nzs-skills@nzs-skills
```

Or copy the files, if you would rather read them first — and you should:

```bash
git clone https://github.com/neckttiie090520/nzs-skills.git
cp -r nzs-skills/skills/* ~/.claude/skills/        # global
# or, per project:
cp -r nzs-skills/skills/* .claude/skills/
```

Then, in any project:

```
/nzs-start I need to add rate limiting to the public API
```

The first run writes `.method/config.yml` via `method-onboard`. Everything
project-specific lives there — commands, mediums, budgets, references, model
tiers — which is why **no skill in this repo names a framework, a database, or a
currency.**

---

## The two layers

**Entry points.** You invoke these by name. They orchestrate.

| skill | what it does |
|---|---|
| **`nzs-start`** | returns the skill *stack* for a job, with an observable exit condition |
| **`nzs-goal`** | writes a `/goal` prompt and the plan file a loop re-reads, built to terminate |
| **`nzs-grill`** | interviews until every branch resolves, then ends in an artifact |
| **`nzs-panel`** | outsider with declared bias, opinionated CTO, senior who corrects both |
| **`nzs-setup`** | installs the whole environment and *proves* each piece works |
| **`nzs-handoff`** | compacts a session into something the next agent can resume from |
| **`nzs-learn`** | records wins, mistake *shapes*, and your taste — into engram |

**Disciplines.** The model reaches for these. One thing each, done properly.

| stage | skills |
|---|---|
| doctrine | `method-evidence` · `method-onboard` |
| acquire | `method-research` · `method-clone` · `method-extract` |
| decide | `method-decide` · `method-cost` · `method-record` · `method-postmortem` · `method-scope` · `method-discovery` · `method-ideas` |
| build | `method-plan` · `method-code` · `method-guard` · `method-harden` |
| verify | `method-review` · `method-debug` · `method-verify` · `method-design` |
| secure | `method-security` · `method-threat` · `method-secrets` · `method-web-security` · `method-ai-security` |
| ship | `method-ship` · `method` (orchestrator) |

A user-invoked skill may call a discipline. It never calls another user-invoked
skill — the rule that keeps triggers unambiguous.

---

## What it actually enforces

- **Evidence before assertion.** A fix reported from reading the diff is not a
  fix. Settle it in the DOM, the compiled artifact, the ledger, the rows.
- **A guard is born on the second occurrence** — and is not trusted until it has
  been *seen failing* on a real mutation and passing when restored.
- **Bounds never flatter.** A ceiling is not a forecast. Null is not zero. A
  displayed cost rounds up.
- **Declined work is recorded with its price**, so nobody re-derives it.
- **Budgets ratchet down only.** A raise needs a written reason in the diff.
- **Production is verified before the push that needs it**, not after.
- **Every control must be real.** No UI for behaviour the server does not have.

---

## Why the method exists

Four things that happened in the source project, each of which became a rule:

- A field split URLs on the letter `s` — a lost backslash — and had **never
  worked once**. Nobody noticed because the error message read like a broken
  site rather than a broken split.
- A style guard's regexes were dead in the same way, so a repair pass fired on
  **every single generation**, billed twice, and threw the result away.
- Drafts came back at **13% of their target length** while seven commits of
  interface polish landed on top. Every craft review passed. None could have
  caught it, because it was not a craft question.
- Three separate edits **silently matched nothing** and were reported as done.

The last one is why `method-evidence` exists, and why its gate names those exact
self-deceptions by shape.

---

## The known weakness

The anti-theatre gate is **self-attested**. A model can tick its checkboxes and
paste invented command output; nothing external witnesses it. `nzs-panel` is the
closest thing to an external witness here, and it is not enough. Making the
independent reviewer's re-run mandatory for load-bearing claims is the open
design decision.

It is stated here rather than buried, because a method that hides its own weak
point has already broken its first rule.

---

## Layout

```
skills/           one directory each, name matching its frontmatter
commands/         one slash command per entry point
scripts/          validate.mjs — the repo's guard on itself
.claude-plugin/   plugin + marketplace manifests
.github/          CI, which is that validator and nothing else
docs/adr/         the decisions, with what they cost
CONTEXT.md        the shared language every skill assumes
```

## The repo holds itself to the method

A set that preaches executable guards and enforces nothing would be a
description of a discipline rather than the discipline. So:

```bash
node scripts/validate.mjs --verbose
```

No dependencies. It checks the frontmatter contract, that every cross-reference
resolves, that every entry point is reachable from the router and has a command,
that the README covers the set, that no credential-shaped string is committed,
and that **no count is written into prose** — each because that exact defect
shipped here first. Every check has been mutation-tested: broken deliberately,
seen red, restored, seen green.

## It does not work alone — read [the ecosystem guide](docs/ECOSYSTEM.md)

A skill decides **what counts as evidence**. A tool is **how you go and get it**.
`method-verify` says a rendered claim is settled in the DOM; Playwright is what
opens the browser. `nzs-learn` says a lesson must outlive the session; engram is
what stores it.

**[docs/ECOSYSTEM.md](docs/ECOSYSTEM.md)** ([ภาษาไทย](docs/ECOSYSTEM.th.md)) is
the other half of this repo: every tool the method composes with — Playwright,
CodeGraph, engram, headroom, Context7, rtk, caveman, codex, bug-hunter,
scrutinize, debug-mantra, impeccable, 9router — what each one is, what it buys,
how to drive it, **where it fails**, seven named stances worth memorising, use
cases end to end, and the case studies that produced every rule here.

## Credit

This method stands on other people's work. The full list, with what each one is
used *for*, is in [the ecosystem guide](docs/ECOSYSTEM.md#credits). The load-
bearing ones:

- [mattpocock/skills](https://github.com/mattpocock/skills) — the user-invoked /
  model-invoked split and the shared-language file, which is the structure of
  this whole repo. `nzs-grill` is adapted from his `grill-me`. Adopted as rules
  with reasons rather than as copies, which is what `method-extract` requires of
  any borrowed pattern.
- [obra/superpowers](https://github.com/obra/superpowers) — process-before-
  implementation discipline.
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman),
  [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc),
  [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
  — the plugins this method runs beside daily.
- [mukul975/anthropic-cybersecurity-skills](https://github.com/mukul975/anthropic-cybersecurity-skills)
  — the security library whose conventions the `secure` row borrows.
- [decolua/9router](https://github.com/decolua/9router) — the gateway that
  generated this repo's artwork.
- **CodeGraph**, **engram**, **headroom**, **rtk**, **Playwright MCP**,
  **Context7**, and Claude Code itself, which is the substrate all of it runs on.

## Licence

MIT.

