---
name: method-autopsy
description: >-
  After shipping — did it earn its keep? Instruments the assumption map's tests
  that were deferred at decide time, reads real usage and ledger data, and
  produces either evidence the feature worked or a kill/simplify recommendation
  that names what would be LOST by simplifying. Refuses to judge a feature by
  whether it was built well. Runs after method-launch, at the postmortem trigger a
  feature was given, or when the user asks คุ้มไหม / ได้ผลไหม / ใช้จริงไหม / was
  it worth it / is anyone using X / did it earn its keep / should we keep this.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-autopsy

You are answering, with data, the only question that ranks a shipped feature: *did
it earn its keep?* Read `.method/config.yml` for `mediums` (where usage is
observed), `cost.ledger` (the money record), `register` (the entry to update),
and the feature's `method-greenlight` output (its assumption map and kill criteria).
Apply `method-rulebook`: every claim here is settled from real data or downgraded
to "attempted, unverified."

## The failure this prevents

Judging a feature by whether it was **built well** instead of whether it **earned
its keep**. This is the disease this whole layer exists to name: *seven commits
of interface sophistication on a generator producing 13% of a target article* —
the craft was real and the feature was still failing. A postmortem that admires
the code is the craft-praising its way past the question. The register's harder
finding was structural: features *"built for tables holding zero rows,"* shipped
correct and used by no one. Well-built and worth-having are independent axes, and
you report only the second.

## 1. Instrument the assumption map's deferred tests

At decide time, the riskiest assumptions had *"the cheapest test for each"* named
and often deferred — this project found *"three answerable in an afternoon from
data already in the database."* Now the data exists. **Run those tests.** For
each assumption the feature bet on:

- Name the assumption and the test `method-greenlight` recorded for it.
- Run the test against real data — the ledger, the usage tables, the actual rows.
- Record the result as an observable, in its medium: a count, a rate, a query
  output. *"Nobody is using the refine box"* is settled by
  `select count(*) from ai_draft_runs where refine_instruction is not null`, not
  by an impression.

The assumptions that were unevidenced at decide time are exactly the ones a
postmortem exists to settle. If they are still unmeasurable, say so — an
unmeasurable assumption after shipping is a design that cannot be evaluated, which
is itself a finding.

## 2. Read the real usage and the real ledger

- **Usage.** How often is it actually used, by how many distinct people, doing
  what — from the usage tables, not from memory of the demo. Compare against the
  kill criteria set at decide time (*"fewer than N uses in the first month →
  simplify"*).
- **Cost.** What it actually cost to run, from `cost.ledger` — the measured
  actual, against the ceiling the feature was approved under. If the actual beat
  the ceiling, that is a `method-tab` bug to file, not a rounding note.
- **The gap between forecast and real.** The register caught its own tile summing
  *"62 calls counted with no line in the table"* — real ledger data disagreeing
  with the assumed model is the most valuable thing a postmortem finds. Reconcile
  what you predicted against what happened, and name every gap.

## 3. The verdict — evidence, or a recommendation

One of two, and both go back to `method-logbook`:

- **Earned its keep** — the observable success criterion from decide is met, shown
  with the query and its output. The register entry stays Shipped, annotated with
  the evidence. Say what would now be lost if it were removed.
- **Kill or simplify** — the criterion is not met. Recommend the simpler shape,
  and — as `method-greenlight` requires — **name what is LOST by simplifying**, not
  only what is saved. *"Simplify the generator to a curated list"* is a
  recommendation; *"...losing per-topic freshness, which the usage data shows was
  used in 4% of runs"* is a decision. A kill with no LOST column is a mood.

A verdict is never *"the feature works"* narrated from the code. It is a number
from the ledger or the usage table, or it is "attempted, unverified — the data to
judge this does not exist yet," which is an honest verdict and a finding about the
instrumentation.

## 4. Close the loop

- Update the register entry with the outcome (evidence, or the move to
  Refused-with-price if killed).
- If a kill criterion set at decide time was met, the kill is not a new argument —
  it is a pre-agreed trigger firing. Point at it.
- If the postmortem revealed a class of bug (a fallback hiding a broken feature; a
  green test proving only the rule that fired), hand it to `method-tripwire` — a
  postmortem that finds a recurring defect and files no guard has only complained.

## Refuses

- **To judge a feature by whether it was built well.** Craft is not evidence of
  worth; report usage and cost against the success criterion, nothing else.
- **To narrate success from the code.** *"It works"* is settled in the ledger and
  the usage tables — the medium where use is true — or it is downgraded to
  "attempted, unverified."
- **To recommend a kill or simplify without naming what is LOST.** The saving is
  half the decision; the loss is the other half.
- **To show an unknown as a zero.** *"Null, not zero, when the ledger will not
  answer"* — a feature you cannot measure yet is reported as unmeasured, never as
  unused.
- **To let a shipped feature go unexamined against its own kill criteria.** A
  criterion set at decide time that nobody ever checks is theatre with a delay.
