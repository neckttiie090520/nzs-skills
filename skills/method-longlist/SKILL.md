---
name: method-longlist
description: >-
  Generating options worth choosing between — not volume, but N genuinely
  different approaches from named angles (cheapest, most robust, most reversible,
  best for the user, and do-nothing, always included), each with what it costs and
  what it forecloses, then a judge pass that scores them and synthesises from the
  winner while grafting the best of the runners-up. Use when facing a decision with
  only one option on the table, or when the user asks มีทางเลือกอะไรบ้าง /
  คิดหลายๆ แบบ / ทางเลือกอื่น / what are the options / how else could we do this /
  brainstorm approaches / give me alternatives.
---

# method-longlist

You are producing the set of options a decision will be made from. Your job is
finished when there is a real choice on the table — several genuinely different
approaches, each priced — not when there are many words. You do not pick the
winner for keeps; you rank and synthesise, then hand the field to `method-greenlight`.

## The failure this prevents

A single option presented as a decision. When one approach arrives already
written up, the "decision" is a rubber stamp — the alternatives were never on the
table to lose to it, so the choice was made before anyone chose. The register's
recurring disease is the reach for the elaborate where the plain would do (*"a
plan that reaches for a model where a `WHERE` clause would do"*); that disease
survives precisely because the plain option was never generated to compete. Real
options, each with its cost, are how the cheap-and-sufficient one gets a chance
to win.

## 1. Generate from named angles — not variations on one idea

Produce one option per angle. The angles force genuine difference; three flavours
of the same architecture are one option, not three.

- **Cheapest** — the least work that could plausibly solve the real problem. Often
  a query, a config, a curated list — no new machinery. This is the option the
  disease above tends to skip; generate it first, on purpose.
- **Most robust** — the one that survives load, edge cases, and the next three
  requirements. Costs the most now; ask whether the future it hardens for is real.
- **Most reversible** — the one you can back out of cheapest if it turns out
  wrong. Reversibility is itself a feature when the evidence is thin (see
  `method-fieldwork`).
- **Best for the user** — the one that gives the audience the most, effort aside.
  It sets the ceiling the others are measured against, even if it loses.
- **Do-nothing** — **always included.** State what happens if you build none of
  it: the cost that continues, the workaround people already use. If do-nothing
  wins, you have saved the whole build; it can only win if it is on the list.

Add other angles when the problem invites them (fastest to ship, lowest ongoing
cost — hand that one to `method-tab`), but never drop the five above.

## 2. Each option carries cost AND what it forecloses

An option with no cost attached is a wish, and it is refused. For each, two lines:

- **What it costs** — the honest effort, plus ongoing cost where it differs
  (a thing cheap to build and expensive to run is not a cheap option). Round
  toward discomfort, per the doctrine: an option that flatters its own price
  corrupts the comparison.
- **What it forecloses** — what choosing this makes harder or impossible later.
  The reversible option forecloses little; the robust one may lock in a data
  model; the cheap one may foreclose the feature the user will ask for next. This
  is the column that turns a list of ideas into a set of trades — naming only the
  upside of each makes them all look free and the choice arbitrary.

## 3. The judge pass — score, then synthesise

Do not just hand over the winner. Score the options against the criteria that
matter for this decision (state them — user impact, effort, reversibility, risk),
then do the move that a plain ranking misses:

- **Synthesise from the winner, grafting the best of the runners-up.** The
  strongest single option is rarely the best achievable one. If the cheapest
  approach wins but the robust one had a failure-handling idea that costs little
  to add, the answer is the cheap approach with that graft — named as such. Say
  which option is the spine and what was borrowed onto it, so the synthesis is
  traceable, not a fourth idea smuggled in as a summary.
- **Keep the losers legible.** Note why each was not the spine, in one line. That
  reasoning is what `method-greenlight` needs and what stops a discarded option being
  re-proposed later as if it were never considered.

## Hands off to

- **`method-greenlight`** — the scored set, the synthesis, and the do-nothing option
  are exactly the raw material of the build/buy/defer/don't gate and its
  assumption map. Ideate widens the field; decide closes it and files the verdict.
- **`method-tab`** — when options differ mainly on running cost, send the
  finalists for the per-use arithmetic before decide rules.

## Refuses

- **A single option presented as a decision.** One approach written up alone is
  not a choice — it is a rubber stamp with the alternatives hidden. Generate the
  angles, including do-nothing, or you have not ideated.
- **An option with no cost attached.** A wish, not an option. Every candidate
  carries its effort and what it forecloses, or it does not go on the list.
- **Angles that are one idea in disguise.** Three variations on the same
  architecture are one option. If two "options" foreclose the same things and
  cost the same, collapse them and generate a genuinely different one.
- **Dropping do-nothing.** The baseline is never optional; without it there is no
  measure of whether any build is worth its cost.
