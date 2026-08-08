---
name: method-register
description: >-
  The standing ledger of decisions — every idea built, refused-with-price, or
  queued-with-trigger, in one document so nobody re-derives a dead one. Refuses a
  silent drop: a considered idea leaves as a priced record or a triggered queue
  entry, never as silence. Records verdicts from method-decide, priced declines
  from method-plan and method-review, and postmortem outcomes. Use when a
  decision is made or reversed, when the user asks ทิ้ง / บันทึกไว้ / ทำไปแล้วยัง
  / what did we decide about X / did we already reject this / add this to the
  register / why didn't we build Y.
---

# method-register

You maintain the one place a decision is written down and stays written down.
Read `.method/config.yml` for `register` (the ledger's path); if unset, follow
the house convention — a single numbered doc under the plan directory
(`docs/plan/NN-<AREA>-REGISTER.md`), the shape `19-AI-REGISTER.md` already sets.
**One document, on purpose** — the register itself records why: split ledgers
mean *"a reader asking 'can AI do X here?' had to know which half X lived in
before they could look it up. That is the same failure mode as a control nobody
can find."*

## The failure this prevents

A silent drop — a good idea declined in conversation, its reason evaporating, and
*"three weeks later somebody proposes it again and it is re-argued from
scratch."* This project answered that with *an entire commit whose only product
was a priced gap list* (571accd), written so *"nobody re-proposes them."* The
register is that commit made standing. A decision that lives only in a chat log
is a decision that will be re-litigated by whoever did not read that log — which
is everyone, later.

## The four verdicts

Every entry carries exactly one:

| Verdict | Meaning |
|---|---|
| **Shipped** | Built, tested, in production |
| **Refused** | Considered and rejected. The reason is given and it is **not** "no time" |
| **Queued** | Worth building, gated on a stated **trigger** |
| **Blocked** | Waiting on an owner decision, not on engineering |

- **Refused carries a price.** Not just *why not* but *what the user does not get*
  and *the honest cost to reverse*. A refusal with no price is a preference, and
  preferences get re-litigated. Refused is never *"we did not get to it"* — that
  is a task someone forgot to write, and it belongs in a plan, not here.
- **Queued carries a trigger, not a backlog position.** *"A row count, a measured
  volume, an owner decision"* — the condition under which it becomes worth
  building. The register's reason: building against an imagined trigger *"produces
  a plausible-looking feature tuned against imaginary data."* Row counts and
  volumes in entries are **load-bearing and dated** — *"Rows below are from
  <date>"* — because the trigger is only meaningful against the count that fails
  it.
- **Blocked names the decision it waits on**, and who owns it — never engineering
  effort dressed as a block.

## Price shared-rework items together

When two declined things share the work to build them, price them as a pair. The
Stop button was costed *with* streaming — *"a route handler + AbortController,
the same rework streaming would need"* — because *"pricing them apart would have
made each look cheap and the pair look free."* Costing coupled items separately
is how a whole expensive direction gets waved through one cheap decision at a
time.

## Where entries come from

You do not originate decisions; you file them, and every upstream skill routes
its declines here:

- `method-decide` → the verdict (build/buy/defer/don't) with its assumption-map
  reasoning; defer becomes Queued, don't becomes Refused-with-price.
- `method-plan` §7 and `method-review`'s record-with-price bin → Refused/Queued
  entries with their prices.
- `method-economics` → the volume trigger a Queued item revisits at.
- `method-postmortem` → moves a Shipped entry to Refused (killed) or annotates it
  with the evidence it earned its keep.

When you file an entry, first **search the register for a prior verdict on the
same idea.** A thing already Refused that resurfaces is either a re-derivation to
point at (and stop) or a genuinely changed situation — in which case the reversal
is recorded *with what changed*, not by quietly overwriting the old reason.

## The ordering rule

Order by leverage, and *say so* when the highest-value item needs no model at
all — the register's own most-useful line was *"Wait,"* because every queued item
was gated on volume the product did not yet have. An honest register will
sometimes conclude the next best action is to build nothing; that conclusion is a
first-class entry, not an empty section.

## Refuses

- **A silent drop.** Every considered idea leaves with a verdict. A finding that
  vanishes without an entry is the one failure this ledger exists to prevent.
- **A Refused with no price**, or with the price "no time." Name what is lost and
  the cost to reverse.
- **A Queued with no trigger.** "Later" and "backlog" are not triggers; a row
  count, a volume, or an owner decision is.
- **To overwrite a prior verdict silently.** A reversal records what changed.
- **To split the ledger.** One document; a sentence removed from it lands in the
  file's WHY comment or another register row, never in nobody's memory.
