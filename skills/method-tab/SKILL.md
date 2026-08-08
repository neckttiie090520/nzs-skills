---
name: method-tab
description: >-
  The unit economics of a feature — cost per use, who pays, what the cap is, and
  at what volume the design stops working. Draws the ceiling-vs-forecast line: a
  bound the real cost may never beat, shown before the act, versus a prediction
  it refuses to make where only a bound is knowable. Refuses "it's cheap" without
  the arithmetic, and refuses a forecast where a forecast would be a lie. Use
  after method-greenlight says build and before method-blueprint, or when the user asks
  ราคา / ต้นทุน / คุ้มไหม / ถูกไหม / what does this cost to run / how much per use
  / what's the cap.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-tab

You are pricing one use of a feature and finding the volume at which its shape
breaks. Read `.method/config.yml` for `cost` (currency, `ledger`, `ceiling_fn`)
and `budgets`; read `.method/budgets.yml` for the standing numbers. This project
*"treats money the way it treats correctness: measured from the ledger, bounded
before the act, shown null when unknown."*

## The failure this prevents

Two, and both are cheap-direction lies about money. First: *"it's cheap"* with no
arithmetic behind it — a claim that flatters the decision and cannot be checked.
Second: a **forecast where only a bound is knowable** — a number presented as a
prediction when the honest artifact is a ceiling. The register refused a progress
percentage for exactly this reason: *"Nothing in a model call reports progress. A
bar drawn from a timer is theatre, and worse than nothing because it implies a
measurement that does not exist."* A forecast the system cannot honour is that
same theatre, wearing an accountant's clothes.

## 1. Cost per use — the arithmetic, shown

Never assert a cost; compute it and show the terms:

```
cost/use = (input_tokens × in_price) + (output_tokens × out_price)
         + (reasoning_tokens × out_price)   # reasoning is billed, count it
```

- Prices come from the config's registry, not memory — the same figures the
  ledger records against (`ai_usage`, `costUsd`). A price you recalled is a price
  you guessed.
- A **free rung** costs a measured ฿0.00, which is a fact, not a forecast — show
  it. But free is a rung tried *before* a paid one, not a permanent claim: the
  design must survive the free rung being exhausted or rate-limited.
- If a model has no published price, it renders **no cost chip** — *"unpriced
  models render no chip."* Unknown is not zero.

## 2. The ceiling / forecast line — the load-bearing distinction

**A ceiling is a bound the real cost may never beat, shown BEFORE the act.**
That is its only job, and it may only ever err toward discomfort:

- It rounds **up**, via `config.cost.ceiling_fn`. This project shipped a bug where
  `toFixed(2)` rounded ฿0.1234 down to ฿0.12 — *"a bound the real spend can beat,
  which is the one thing a bound may not be."* Round up or it is not a ceiling.
- The button carries its own price: the drafter's Generate showed `≤ ฿0.13`
  before the press. Cost travels with the act that spends it.

**A forecast predicts the actual, and you refuse it where only a bound is
knowable.** Latency here *"varies by an order of magnitude — Mistral measured at
14.6s, 14.9s and 19.9s on the same payload"*; token counts vary per generation;
the repair pass may or may not fire. When the spread is that wide, the honest
outputs are (a) the ceiling before, and (b) the **measured actual** after, from
the ledger — never a middle number pretending to be a prediction. An estimated
time remaining *"stalled at '2 seconds remaining' costs more trust than it
buys."* If someone wants a forecast, give them the bound and the measured
distribution and say a point forecast would be a lie.

## 3. Who pays, and what the cap is

- **Name the payer.** The company (paid API), the free-tier pool, or a per-user
  budget. A cost with no named payer is a cost nobody is accountable for.
- **The cap is counted from the ledger, not asserted.** The drafter's 20/hour cap
  is `assertWithinCap` reading `ai_usage`, not a UI number. A cap advertised on
  screen and enforced nowhere is a control the server never reads — forbidden.
  State the cap, its window, and the exact table/query that enforces it.
- **The cap must have a reason.** The drafter's *"30-40s wait is the reason the
  cap exists at 20/hour"* — the cap ties a real cost to a real limit. A cap with
  no reason is a number someone will raise the first time it is inconvenient.

## 4. The volume where the design stops working

State the breaking point as a number, not a hope: *at what monthly/hourly volume
does this cost, this cap, or this latency stop being acceptable?* The register's
whole discipline is triggers on volume — *"a tool for an empty table is tuned
against imagined data,"* and equally a tool priced for ten uses a month is a
liability at ten thousand. Name the volume, name what breaks at it (cost line,
cap starvation, latency, rate limit), and hand that number to `method-logbook`
as the feature's revisit trigger and to `method-greenlight`'s kill criteria.

## Refuses

- **To say "it's cheap" without the arithmetic.** Show the per-use computation
  with its token counts and prices, or do not make the claim.
- **To emit a forecast where only a bound is knowable.** Give the ceiling
  (rounded up) and the measured actual; refuse the point prediction and say why.
- **To round a ceiling down**, or to show unknown as zero. Both are
  cheap-direction lies, always fix-now, never deferrable.
- **To price a cap the server does not enforce.** Name the query that counts it,
  or it is not a cap.
- **To price shared-rework items separately.** A Stop button was costed *with*
  streaming *"because they share the rework, and pricing them apart would have
  made each look cheap and the pair look free."* Cost coupled things together.
