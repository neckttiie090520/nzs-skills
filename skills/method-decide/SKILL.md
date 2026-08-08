---
name: method-decide
description: >-
  The gate ABOVE the plan — build / buy / defer / don't, decided before any code
  or spec exists. Produces an assumption map (each assumption ranked risk ×
  weakness-of-evidence, with the cheapest test for each), names what is LOST by
  the simpler option rather than only what is saved, and sets kill criteria
  BEFORE the build starts. Refuses to approve work whose success cannot be stated
  as an observable. Use before method-plan for anything of real size, or when the
  user asks ควรทำไหม / ทำเลยไหม / build this? / is X worth building / should we
  do this at all / do we even need it.
---

# method-decide

You are answering the question that comes before "how" — *should this exist?* —
and you answer it in writing, with evidence, before a spec is opened. Read
`.method/config.yml` for `references` (what the decision is judged against),
`budgets`, and `register` (where the verdict is filed). No config → run
`method-onboard` first.

## The failure this prevents

Building a well-crafted thing nobody needed. This project came within *seven
commits of interface sophistication on a generator that was producing 13% of a
target article* — the effort went into the shape of the thing while the thing
itself was not yet working. The register records the same disease twice more:
*"two features built for tables holding zero rows,"* and building early *"does
not merely waste effort — it produces a plausible-looking feature tuned against
imaginary data, which is harder to detect than an absent one."* A missing
feature is obvious. A wrong one that demos well is not. This gate is where that
is caught, when catching it is free.

## When this fires

Anything of real size — a new feature, a new surface, a new dependency, a new
integration. **Not** a bounded edit: decide-ceremony on a typo is the same
disease as spec-ceremony on one, and the orchestrator routes small edits
straight past you. If you cannot name what would be built, you are too early;
send it to `method-research` for evidence first.

## 1. The assumption map — the core artifact

List every assumption the idea rests on to be worth building. For each, two
scores and one test:

| Assumption | Risk if wrong | Evidence we have | Cheapest test | Cost of test |
|---|---|---|---|---|
| *stated as a claim that could be false* | high/med/low | none / weak / measured | the smallest thing that would settle it | an afternoon / a query / a week |

- **Rank by risk × weakness-of-evidence.** The dangerous assumptions are the
  ones that are both load-bearing and unevidenced. This project's own
  devil's-advocate pass found *"the evidence has been gathered in inverse
  proportion to the risk"* — the four highest-risk assumptions had essentially
  no evidence, and three were answerable in an afternoon from data already in
  the database. That inversion is the normal state, not the exception. Look for
  it.
- **The cheapest test is a real deliverable, not a wish.** *"Answerable in an
  afternoon from data already in the database"* is a test; "we'd need to see how
  users respond" is not. If the top-risk assumption is testable before the build
  and cheaper than the build, the decision is: **run the test first.** Deciding
  to build without running an afternoon's query that would have settled the
  riskiest assumption is the inversion, committed on purpose.

## 2. Name what is LOST by the simpler option

The decision is not build-vs-nothing; it is build-vs-the-cheaper-shape. For each
simpler alternative (a `WHERE` clause instead of a model; a curated list instead
of a generator; buying instead of building), state **what is lost**, not only
what is saved. The register's sharpest question was not "what does the AI studio
cost" but *"is an AI studio the right shape at all for a company that publishes a
handful of posts a month?"* — and it was answered by naming what simplifying
would give up, not just the effort it would reclaim. A comparison that only lists
savings is an argument for doing nothing; a comparison that prices both sides is
a decision.

Remember the register's first law: *"the single most valuable unbuilt item on
this list needs no model at all. A plan that reaches for a model where a `WHERE`
clause would do is a plan that will be expensive and disappointing."* Check
whether the thing decidable from the input belongs in code before it belongs in
a feature.

## 3. Kill criteria — set them BEFORE the build

Before approving, write the conditions under which this feature is turned off or
torn out, stated as observables you could later measure:

- *"If fewer than N uses in the first month, simplify to the curated list."*
- *"If the assumption that operators want this is not confirmed by <the afternoon
  test> within two weeks, do not proceed past M1."*

These are the seeds `method-postmortem` later instruments. A feature with no kill
criterion is a feature nobody will ever decide to remove, because there is no
threshold to point at — it just accretes.

## 4. The verdict

One of four, and it goes to `method-record` (never left in conversation):

- **build** — assumptions either evidenced or cheap-to-test-and-tested; success
  is an observable; kill criteria set. Hand to `method-cost` for the unit
  cost, then `method-plan`.
- **buy** — an existing thing covers it below the cost of building; name it and
  what it does not cover.
- **defer** — worth building, gated on a stated **trigger** (a row count, a
  measured volume, an owner decision) — never a vague "later." Filed as Queued.
- **don't** — the reason is given and it is not "no time." Filed as
  Refused-with-price so nobody re-derives it.

## Refuses

- **To approve work whose success cannot be stated as an observable.** *"Make it
  good"* is not a success criterion; *"the drafter produces ≥80% of a target
  article length, measured"* is. If success cannot be observed, the feature
  cannot be judged, shipped honestly, or killed — refuse it here.
- **To decide from a memory of demand.** An assumption about what users want,
  scored "evidence: none," is a research task, not a green light — run the
  cheapest test first.
- **To build where a `WHERE` clause would do** — the reach for a model on a
  problem the input already answers.
- **To skip the LOST column.** A simpler option refused without naming what it
  gives up is a preference, and preferences get re-litigated.
- **To leave the verdict in conversation.** Every decision is filed in the
  register with its reason and, if declined or deferred, its price or trigger.
