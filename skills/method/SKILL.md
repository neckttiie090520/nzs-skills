---
name: method
description: >-
  Runs the full working loop for a feature — acquire (research/clone/extract when
  the request carries a reference), plan, build simplest-first, review in rotating
  roles, verify by evidence, ship — delegating each stage to the right model tier
  (architect/builder/mechanical) with an independent reviewer at every milestone,
  and keeping handoff.md current. Use to drive a feature end to end, or when the
  user describes a multi-stage build.
---

# Method

You sequence the other method-* skills; you do not re-implement them. Read
`.method/config.yml` — especially `models` (the tiers), `references`, and
`handoff`. Every stage below cites `method-evidence`; no "done" in this loop may be
narrated instead of shown.

**If `.method/config.yml` does not exist, run `method-onboard` first.** Every skill
here reads it; without it there is no verify command, no medium map, no references.

## Route by what the request carries — acquisition BEFORE planning

The triggers are mechanical, because this is how requests actually arrive. Do not
plan a reference-bearing request before acquisition has produced cited findings —
planning against a memory of a product is planning against a hallucination.

- **A URL or repo in the request** → `method-research` (and `method-clone` too if
  the ask is to look or behave like it).
- **A local folder of images or documents** ("อยากได้ ui แนวนี้เลย …\Downloads\2")
  → `method-clone` on those references.
- **"make it like X" / "world-class" / เลียนแบบ / แนว naming a product class**, with
  no reference in hand → `method-research` first to fetch the actual references,
  because cloning a memory of Canva is cloning a hallucination.
- **After research or clone, `method-extract` runs before `method-plan`** — so the
  plan cites extracted RULES (each with the reason it applies here), never raw
  admiration — and `config.references` is updated so later reviewers judge against
  the same standard.
- **No reference and no open research question → skip the acquisition layer
  entirely.** Acquisition ceremony on a typo fix is the same disease as spec
  ceremony on one. Route a small bounded edit straight to the mechanical tier.

## Decide before you plan — the gate above the work

For anything of **real size** (a new feature, surface, dependency, or
integration), route to `method-decide` BEFORE `method-plan` — build / buy /
defer / don't, decided in writing before a spec is opened. It produces the
assumption map, names what is LOST by the simpler shape, and sets kill criteria.
This is where the project's most expensive failure is caught for free: *seven
commits of interface sophistication on a generator producing 13% of a target
article* — the craft was real, the thing was not needed yet. A `build` verdict
hands to `method-cost` (the unit cost, the cap, the volume it breaks at)
and then to `method-plan`; every verdict is filed by `method-record` so no
declined idea is silently dropped. **Skip the gate for a bounded edit** — decide-
ceremony on a typo is the same disease as spec-ceremony on one.

## The loop

Delegate each stage to the model tier the config names, by capability not brand.

1. **Acquire** (only if routed above) — `method-research` / `method-clone` /
   `method-extract`. Produces cited findings and updated `config.references`.
   Tier: architect for judgment, mechanical for bulk transcription.

2. **Plan** — `method-plan` on the **architect** tier, for anything past one-file
   scope. Produces the numbered spec: measured problem, references borrowed and
   refused-with-price, tasks each ending in `→ verify:`.

3. **Build simplest-first** — the **builder** tier implements, the **mechanical**
   tier fans out bulk/scaffold work. Simplest thing that satisfies the task, not
   the most general.

4. **Review** — `method-review`, 2–3 rounds, **rotating the role each round** so
   each finds what the others structurally cannot; round N+1 first re-verifies
   round N's fixes landed in their medium. The **independent reviewer**
   (`config.models.reviewer`, e.g. Codex) reviews every milestone — *"อย่าลืมให้
   codex reviews เสมอ"* (never forget Codex reviews). Adversarial roles run on the
   architect tier.

5. **Verify** — `method-verify` before any milestone is called done. Each claim
   settled in its medium, or downgraded to "attempted, unverified."

6. **Guard** — `method-guard` fires on recurrence: the *second* time a bug of one
   class is fixed, a guard is proposed, seen failing, and wired in.

7. **Ship** — `method-ship`: production-precondition check, migration end-state,
   honest bounds, ratchet check, commit body, deploy confirmed in its medium.

8. **Postmortem** — after ship, at the feature's recorded trigger, `method-postmortem`:
   instrument the assumption map's deferred tests against real usage and ledger
   data, and return either evidence it earned its keep or a kill/simplify
   recommendation. It judges the feature by use, never by how well it was built,
   and updates `method-record` with the outcome.

## Handoff — after every milestone

Update `config.handoff` (handoff.md): decisions, trade-offs, architecture, next
steps — *"Record decisions, trade-offs, architecture, and next steps"* (msg 43).
Continuity across compaction is part of the method, not hygiene around it.

## Refuses

- To skip the review or verify gates for speed.
- To plan a reference-bearing request before acquisition has produced cited
  findings.
- To plan a feature of real size before `method-decide` has ruled on it and
  stated its success as an observable.
- To mark a milestone done before `method-verify` passes.
- To let a stage's model tier exceed the cost the config permits — the cheap-model
  law: *"ใช้แค่โมเดลถูกๆ"* (use only cheap models) for mechanical fan-out; reserve
  the architect tier for judgment, review, and security-shaped forks.

## The six the loop used to skip

The set grew from eleven skills to twenty-one and this file was written for the
eleven. A review found that the driver never named six of them, so the three
most craft-load-bearing additions were unreachable unless the user knew their
names — a router that abandons its own skills.

Wire them where they belong:

- **Before Decide** — `method-scope` shapes a raw request into who it is for and
  what they can do afterwards; `method-ideas` generates the options including
  do-nothing; `method-discovery` goes and finds out what is true when the
  answer is "nobody knows". All three hand into `method-decide`, which rules.
- **Inside Build** — `method-code` before any implementation: find the seam, make
  the smallest change that solves the real problem, trace the blast radius.
- **Inside Review and Verify** — `method-harden` for anything holding money,
  state or more than one step; `method-design` for any surface a person looks
  at, both to sketch it before building and to judge the rendered pixels after.
