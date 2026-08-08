# Changelog

Notable changes. Dates are when the change landed on `main`.

## 1.2.0 — 2026-08-08

**Renamed eleven skills, plus the bare `method`.** Names that could not be
decoded without reading the file. `method-se` → `method-code`,
`method-doctrine` → `method-evidence`, `method-robust` → `method-harden`,
`method-pm` → `method-scope`, `method-register` → `method-record`,
`method-economics` → `method-cost`, `method-visual` → `method-design`,
`method-ideate` → `method-ideas`, `method-appsec` → `method-web-security`,
`method-aisec` → `method-ai-security`, `ask-nzs` → **`nzs-start`**, and
`method` → `method-run`. Reasoning and cost in
[ADR 0005](docs/adr/0005-plain-names-over-precise-ones.md).

**Breaking for anyone who installed 1.1.0.** Re-run the install; the old
directories are gone. `/ask-nzs` is now `/nzs-start`.

**Added [`docs/START-HERE.md`](docs/START-HERE.md)** (and the Thai edition) —
a front door for people who describe what they want and ship it, rather than
writing code all day. No jargon, the real bug that motivated the method,
install, first use with the output to expect, a plain-words "which one do I
need" table, and troubleshooting for what actually goes wrong.

**Validator fixes the rename exposed.** It required the router to route to
itself; and its cross-reference pattern was `[a-z]+`, so two-word names like
`method-web-security` matched nothing and every reference to them was silently
unchecked.

## 1.1.0 — 2026-08-08

**Five security disciplines.** `method-security` (the discipline behind the
`security` review role, which the review table already selected in four of its
six rows while nothing defined it), `method-threat`, `method-secrets`,
`method-web-security`, `method-ai-security`. Scoped to what this method is used
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
