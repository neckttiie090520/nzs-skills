# 0007 — All 33 skills renamed, prefix kept, a name with personality

**Status:** accepted
**Date:** 2026-08-09

## Context

ADR 0005 renamed eleven skills that were structurally unreadable — initialisms
and insider abbreviations a newcomer could not decode. It deliberately left
the rest alone: the goal was decodability, not tone, and most remaining names
were already plain English (`method-plan`, `method-review`, `method-verify`).

The owner's request here was different in kind: rename the **whole set**, aim
for something an indie developer finds memorable and a little cheeky, not
merely legible. Plain-and-correct was never the complaint this time — flat
was.

## Decision

Renamed all 33 skills. Prefix convention (`method-*` model-invoked,
`nzs-*` user-invoked) is unchanged — it still carries real information about
which layer a skill belongs to, and nothing about "give it personality"
implied touching that. Only the part after the prefix changed.

Full mapping:

| was | now | was | now |
|---|---|---|---|
| `method-evidence` | `method-rulebook` | `method-review` | `method-gauntlet` |
| `method-onboard` | `method-groundwork` | `method-debug` | `method-whodunit` |
| `method-research` | `method-scout` | `method-verify` | `method-witness` |
| `method-clone` | `method-mimic` | `method-design` | `method-sketch` |
| `method-extract` | `method-distill` | `method-security` | `method-lockpick` |
| `method-decide` | `method-greenlight` | `method-threat` | `method-lookout` |
| `method-cost` | `method-tab` | `method-secrets` | `method-vault` |
| `method-record` | `method-logbook` | `method-web-security` | `method-trapdoor` |
| `method-postmortem` | `method-autopsy` | `method-ai-security` | `method-puppeteer` |
| `method-scope` | `method-brief` | `method-ship` | `method-launch` |
| `method-discovery` | `method-fieldwork` | `method-run` | `method-conductor` |
| `method-ideas` | `method-longlist` | `nzs-start` | `nzs-compass` |
| `method-plan` | `method-blueprint` | `nzs-roundtable` | `nzs-huddle` |
| `method-code` | `method-craft` | `nzs-goal` | `nzs-marathon` |
| `method-guard` | `method-tripwire` | `nzs-setup` | `nzs-bootcamp` |
| `method-harden` | `method-stress-test` | `nzs-handoff` | `nzs-baton` |
| | | `nzs-learn` | `nzs-scrapbook` |

Every name was checked against `CONTEXT.md`'s glossary (medium, evidence,
claim, guard, bound, ratchet, declined-with-price, observable) for collision
before it was picked — `method-guard` moving to `method-tripwire` was chosen
partly because it *frees* the word "guard" to mean only the glossary term (an
executable rule) rather than doing double duty as a skill name too.

## What broke, twice, and what that produced

The rename script matched hyphenated identifiers with a boundary-safe regex
(the same technique ADR 0005 used, verified again not to eat
`method-secrets`/`method-security` as substrings of each other). It could not
catch, and did not know to look for, two classes of prose that name a skill
without using its hyphenated form:

1. **A skill's own body calling itself by its old *concept word*.**
   `nzs-huddle` — the merged Grill+Panel skill — still said "cast the
   roundtable" and "seat the roundtable" nine times in its own body after the
   directory and every cross-reference elsewhere were correctly renamed. Found
   by reading the file, not by tooling; fixed by hand.

2. **A capitalised "# Method Whatever" H1 heading**, which is a different
   string from the hyphenated `method-whatever` the script matched. Nine
   files had this — and some had been silently wrong since ADR 0005's rename,
   one (`method-trapdoor`, née `method-appsec`) since the *first* security
   naming pass before that. Three separate renames left it unnoticed because
   nothing compared a skill's H1 to its own directory name.

The second class earned a guard: `scripts/validate.mjs` now checks every
skill's H1 against its directory name. Mutation-tested — a stale heading
turns it red, the correct one turns it green. This repo's own law is that a
guard is born on the second occurrence; this defect had survived three.

## What it cost

33 directory moves, 6 command file renames, 636 name occurrences rewritten
across 55 files by script, plus the two classes of hand-fixes above. Every
external integration — anyone's saved `/nzs-start` muscle memory, any doc
linking the old names — breaks. Recorded as a breaking change, version 1.4.0.

## Consequences

- The set now reads with a consistent voice: single evocative words
  (`method-vault`, `method-tab`, `nzs-compass`) rather than a mix of
  plain-but-flat names and initialisms.
- `scripts/validate.mjs` is permanently better at catching this class of
  drift for every future rename, not just this one.
- ADR 0005's reasoning about *why* renaming was worth the cost while the repo
  was young still applies, more so now — this is the second full naming pass,
  and a third would cost real goodwill from anyone who had started depending
  on the previous names. Treat the naming as settled going forward.
