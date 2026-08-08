# Changelog

Notable changes. Dates are when the change landed on `main`. Each entry names
skills using whatever they were called **at that version** — a changelog is a
historical record, not living documentation, and rewriting past entries to
match the current names would erase the fact that the earlier name ever
existed.

## 1.5.0 — 2026-08-09

**Three names reconsidered from 1.4.0's pass.** `nzs-compass` → `nzs-go`
(shorter), `nzs-bootcamp` → `nzs-setup` (back to plain — installing an
environment doesn't need a costume), `nzs-baton` → `nzs-handoff` (same
reasoning). Owner's call on all three, after living with 1.4.0's names for
a day.

Also fixed: 1.4.0's own rename script had rewritten *this file's* older
entries (1.1.0 and 1.2.0), and four ADRs (0001, 0003, 0004, 0006), to use
names that did not exist yet at those versions — `ask-nzs → nzs-compass` in
the 1.2.0 entry, when 1.2.0 actually shipped `ask-nzs → nzs-start` and
`nzs-compass` was not coined until 1.4.0. Restored every one of them to what
was actually true when it shipped, and added the header note above so it
does not happen a third time.

**Added `nzs-crucible`.** One command for the full adversarial sweep:
`scrutinize` (is this diff even the right shape) → `bug-hunter` (its own
Recon → Hunter → Skeptic → Referee loop) → codex as a genuinely independent
pass against the same target → `debug-mantra` gating any fix before it is
claimed done. Merges all four into one report rather than four stapled
together. Deliberately never auto-triggers `/code-review` — that one is
billed and user-invoked, so it is named in the report as an available
escalation, never run on the user's behalf.

## 1.4.0 — 2026-08-09

**Breaking: all 33 skills renamed.** Prefix convention unchanged
(`method-*` / `nzs-*` still marks model-invoked vs user-invoked) — everything
after the prefix got a single memorable word instead of a flat description.
`method-security` → `method-lockpick`, `method-verify` → `method-witness`,
`nzs-start` → `nzs-compass`, and 30 more. Full mapping and reasoning in
[ADR 0007](docs/adr/0007-a-name-with-personality.md).

Two things the mechanical rename script could not catch on its own: a skill
referring to itself by its old *concept word* inside its own body (found in
`nzs-huddle`, fixed by hand), and a capitalised `# Method Whatever` heading
that is a different string from the hyphenated identifier the script
matched — nine of these had been silently wrong since the **previous**
rename, one since the one before that. `scripts/validate.mjs` now checks
every skill's H1 against its own directory name, so this class of drift
cannot survive a rename silently again.

If you use any skill by its old name, use the new one from the table above —
routing through `nzs-start` (its name at the time) already resolved
correctly regardless of what you called things. (`nzs-start` itself is now
`nzs-go` — see 1.5.0.)

## 1.3.0 — 2026-08-09

**Breaking: `nzs-grill` and `nzs-panel` merged into `nzs-roundtable`.** Both
seated the same three roles (biased outsider, opinionated CTO, senior
arbiter) — Grill against many branches of a shapeless request, Panel against
one already-formed decision. One engine, two scopes, one name: `Resolve` ends
in an artifact, `Judge` ends in a verdict. See
[ADR 0006](docs/adr/0006-grill-and-panel-merge-into-roundtable.md).

If you invoke `/nzs-grill` or `/nzs-panel` directly, use `/nzs-roundtable`
instead — routing through `nzs-start` already picks the right job for you.
(`nzs-roundtable` was later renamed `nzs-huddle` in 1.4.0.)

## 1.2.0 — 2026-08-08

**Renamed eleven skills, plus the bare `method`.** Names that could not be
decoded without reading the file. `method-se` → `method-code`,
`method-doctrine` → `method-evidence`, `method-robust` → `method-harden`,
`method-pm` → `method-scope`, `method-register` → `method-record`,
`method-economics` → `method-cost`, `method-visual` → `method-design`,
`method-ideate` → `method-ideas`, `method-appsec` → `method-web-security`,
`method-aisec` → `method-ai-security`, `ask-nzs` → **`nzs-start`**, and
`method` → `method-run`. Reasoning and cost in
[ADR 0005](docs/adr/0005-plain-names-over-precise-ones.md). (All eleven were
renamed again in 1.4.0's personality pass — see that entry for current names.)

**Breaking for anyone who installed 1.1.0.** Re-run the install; the old
directories are gone. `/ask-nzs` is now `/nzs-start`.

**Added [`docs/START-HERE.md`](docs/START-HERE.md)** (and the Thai edition) —
a front door for people who describe what they want and ship it, rather than
writing code all day. No jargon, the real bug that motivated the method,
install, first use with the output to expect, a plain-words "which one do I
need" table, and troubleshooting for what actually goes wrong.

**Validator fixes the rename exposed.** It required the router to route to
itself; and its cross-reference pattern was `[a-z]+`, so two-word names like
`method-web-security` matched nothing and every reference to them was
silently unchecked.

## 1.1.0 — 2026-08-08

**Five security disciplines.** `method-security` (the discipline behind the
`security` review role, which the review table already selected in four of its
six rows while nothing defined it), `method-threat`, `method-secrets`,
`method-web-security`, `method-ai-security`. Scoped to what this method is used
on rather than to a domain encyclopedia — see
[ADR 0004](docs/adr/0004-security-scoped-to-what-we-ship.md). (All five were
renamed again in 1.4.0 — see that entry for current names.)

**[`docs/ECOSYSTEM.md`](docs/ECOSYSTEM.md)** (+ Thai) — every tool the method
composes with, what each buys, and where each fails.

**Thai README.**

**`scripts/validate.mjs` + CI.** The repo now enforces on itself what it asks of
everyone else: frontmatter contract, cross-references resolve, entry points
reachable from the router, README coverage in both languages, no
credential-shaped strings, no counts written into prose. Every check
mutation-tested.

**`SECURITY.md`, `CONTRIBUTING.md`, PR template, marketplace manifest,
`.gitattributes`.**

## 1.0.0 — 2026-08-07

First public release. The entry layer, the discipline layer, and three ADRs,
extracted from one real project's working history.
