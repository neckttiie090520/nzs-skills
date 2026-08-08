# Changelog

Notable changes. Dates are when the change landed on `main`.

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
routing through `nzs-compass` (was `nzs-start`) already resolves correctly
regardless of what you call things.

## 1.3.0 — 2026-08-09

**Breaking: `nzs-grill` and `nzs-panel` merged into `nzs-huddle`.** Both
seated the same three roles (biased outsider, opinionated CTO, senior
arbiter) — Grill against many branches of a shapeless request, Panel against
one already-formed decision. One engine, two scopes, one name: `Resolve` ends
in an artifact, `Judge` ends in a verdict. See
[ADR 0006](docs/adr/0006-grill-and-panel-merge-into-roundtable.md).

If you invoke `/nzs-grill` or `/nzs-panel` directly, use `/nzs-huddle`
instead — routing through `nzs-compass` already picks the right job for you.

## 1.2.0 — 2026-08-08

**Renamed eleven skills, plus the bare `method`.** Names that could not be
decoded without reading the file. `method-se` → `method-craft`,
`method-doctrine` → `method-rulebook`, `method-robust` → `method-stress-test`,
`method-pm` → `method-brief`, `method-register` → `method-logbook`,
`method-economics` → `method-tab`, `method-visual` → `method-sketch`,
`method-ideate` → `method-longlist`, `method-appsec` → `method-trapdoor`,
`method-aisec` → `method-puppeteer`, `ask-nzs` → **`nzs-compass`**, and
`method` → `method-conductor`. Reasoning and cost in
[ADR 0005](docs/adr/0005-plain-names-over-precise-ones.md).

**Breaking for anyone who installed 1.1.0.** Re-run the install; the old
directories are gone. `/ask-nzs` is now `/nzs-compass`.

**Added [`docs/START-HERE.md`](docs/START-HERE.md)** (and the Thai edition) —
a front door for people who describe what they want and ship it, rather than
writing code all day. No jargon, the real bug that motivated the method,
install, first use with the output to expect, a plain-words "which one do I
need" table, and troubleshooting for what actually goes wrong.

**Validator fixes the rename exposed.** It required the router to route to
itself; and its cross-reference pattern was `[a-z]+`, so two-word names like
`method-trapdoor` matched nothing and every reference to them was silently
unchecked.

## 1.1.0 — 2026-08-08

**Five security disciplines.** `method-lockpick` (the discipline behind the
`security` review role, which the review table already selected in four of its
six rows while nothing defined it), `method-lookout`, `method-vault`,
`method-trapdoor`, `method-puppeteer`. Scoped to what this method is used
on rather than to a domain encyclopedia — see
[ADR 0004](docs/adr/0004-security-scoped-to-what-we-ship.md).

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
