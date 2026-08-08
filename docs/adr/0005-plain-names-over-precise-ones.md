# 0005 — Plain names over precise ones

**Status:** accepted
**Date:** 2026-08-08

## Context

The set was named by someone who already knew what each skill did. Measured on
the published repo:

- `method-se`, `method-doctrine`, `method-robust`, `method-pm`, `method-register`
  and `ask-nzs` cannot be decoded from the name by anyone who has not read the
  file. `nzs` means nothing at all to a stranger.
- The README carried 18 uses of load-bearing vocabulary (*medium*, *doctrine*,
  *ratchet*, *adversarial*, *anti-theatre*) in 1,149 words, none defined at first
  use.
- There was no page describing what success looks like, and no troubleshooting.

Most people writing software with an agent today are not full-time engineers.
A name that requires the glossary is a door that only opens for people who
already have the key.

ADR 0002's reasoning — that renaming buys a prefix and costs 21 directory moves
— was correct at the time and is not the same question. That proposal changed
the prefix and nothing else. This one changes names that were *wrong*: opaque,
or inconsistent with what the skill actually does.

## Decision

Rename eleven skills to plain verbs and nouns; leave the twenty that were
already legible. (Names below are what each became **at this ADR's decision**
— several were renamed again in later passes; ADR 0007 has the current names.)

| was | became (1.2.0) | why |
|---|---|---|
| `method-se` | `method-code` | "se" is an initialism only insiders expand |
| `method-doctrine` | `method-evidence` | it is about evidence; "doctrine" describes its tone, not its job |
| `method-robust` | `method-harden` | a verb, and the verb people already use |
| `method-pm` | `method-scope` | "pm" is a job title, not a task |
| `method-register` | `method-record` | "register" reads as a verb meaning sign-up |
| `method-economics` | `method-cost` | the question people actually ask |
| `method-visual` | `method-design` | it covers layout and diagrams, not only visuals |
| `method-ideate` | `method-ideas` | "ideate" is consultant vocabulary |
| `method-appsec` | `method-web-security` | initialism |
| `method-aisec` | `method-ai-security` | initialism |
| `ask-nzs` | `nzs-start` | "start" says what to type first; "ask-nzs" required knowing the brand |
| `method` | `method-run` | a bare `method` beside thirty `method-*` reads as a typo |

Timing is the argument. The repo was one day old with no dependents; the same
rename in a month breaks everyone who installed it.

## What it cost

Twelve directory moves and 126 reference rewrites across 34 files, done with a
lookahead-guarded script because a naive replace of `method-se` also consumes
the first nine characters of `method-secrets` and `method-security` — the
names those two skills carried at the time.

Two names got *longer* (`method-web-security`, `method-ai-security`). That is
the deliberate trade: an initialism is shorter to type and slower to understand,
and these are read far more often than typed.

## Consequences

- `docs/START-HERE.md` (and the Thai edition) became possible to write, because
  a beginner's page whose table is full of initialisms is not a beginner's page.
- The validator gained two fixes the rename exposed: it required the router to
  route to itself, and its cross-reference pattern was `[a-z]+`, which matched
  **nothing** for two-word names — so every reference to `method-web-security`
  was silently unchecked. A guard that quietly stops covering part of its
  surface is worse than one that fails loudly.
- ADR 0002 stands: prefix churn for its own sake is still refused. This ADR is
  narrower — it renames what was *unreadable*, not what was merely differently
  prefixed.
