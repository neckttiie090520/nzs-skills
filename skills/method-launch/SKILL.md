---
name: method-launch
description: >-
  The pre-push and deploy discipline. Migrations assert their own end state and are
  additive and re-runnable; production schema is verified BEFORE the push that
  needs it; the commit body records the why, the measurement, and the rejected
  alternative; budgets ratchet down only and any raise needs a written reason in
  the diff. Use when committing, migrating, or deploying.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Launch

The last gate before code leaves your machine. Read `.method/config.yml` for
`budgets`, `cost.ceiling_fn`, `mediums.persistence.prod`, and the `verify`/`guards`
commands. Nothing here ships on a report — apply `method-rulebook` and confirm
`method-witness` has settled every claim the commit body will make.

## The production-precondition check — do this FIRST

**This project shipped code to production twice against a database that lacked its
tables.** The push and the schema it depends on are one unit; a push that lands
before its schema is a self-inflicted outage. Before any push that reads or writes
a table, column, index, function, or policy:

1. Identify every schema object the new code depends on.
2. Confirm each one **exists in production**, read from the production database
   itself (`config.mediums.persistence.prod`) — not "the migration is in the repo," not
   "it ran locally." *"applied to local and to production and verified in both"*
   (6139679).
3. If it is not yet in production, the migration goes first and is verified there
   *before* the push. Never the reverse. If you cannot reach production to verify,
   you cannot push — the push is "attempted, unverified" and it waits.

A green local build against a production schema that lacks the tables is the exact
false comfort this rule exists to kill.

## Migrations

Every migration must:

- **Assert its own end state, both directions.** *"The migration asserts its own
  end state, including both directions"* (5670d36) — it declares what must be true
  after it runs, so a partial or skipped apply is detectable, not silent.
- **Be additive and re-runnable.** Use `IF NOT EXISTS` / `IF EXISTS`, additive
  columns with defaults, no destructive drops on a live column without a recorded
  reason. Running it twice must be safe; running it against an already-migrated DB
  must be a no-op, not an error.
- **Be verified in the medium of persistence**, per `method-witness`: read the
  object back from the DB after applying, in local AND production, before the push.

## Budgets and the ratchet

Budgets live in `config.budgets` and obey doctrine law 5:

- **Ratchet down only.** A budget number is the *measured* weight of the thing it
  polices, and it carries the reason it is that number.
- **A raise needs a written reason in the diff.** Refuse a silent raise. Because
  the number is a measurement, a raise is a new measurement — state what grew and
  why it is justified (the ratchet moved 233→242 once, with its reason in the
  diff, 1c18c64). No reason line → the raise does not ship.
- **Bounds round the honest way** (law 3): a cost ceiling uses `config.cost
  .ceiling_fn` and rounds UP; unknown is null, never zero. Re-check before ship.

## The commit body

Written in the house voice. It records, for the change:

- **What was wrong** — the measured problem, in numbers not adjectives.
- **The measurement** — the evidence, with its unit and where it came from (a
  number travels with its source: *"measured, it is 583px and 76 characters,
  because `ch` is the width of a ZERO"*, 676fca5).
- **What was tried and rejected** — the alternative and why it lost, so nobody
  re-proposes it.
- **`<verify> exits 0`** — the config's check/guards command run, with its result.
- **For a new guard** — its mutation-test transcript (red-before / green-after),
  from `method-tripwire`.
- **For a refused control or deferred defect** — its priced record (law 4).

The body may not assert a fix that `method-witness` has not settled. If a claim is
"attempted, unverified," the commit body says exactly that.

## Deploy

- Run the full `config.verify.check` and `config.verify.guards`; both exit 0, and
  you have read that output this session.
- Production-precondition check (above) is green.
- Deploy, then confirm the deployed artifact serves the change in its medium (the
  live DOM / endpoint / ledger), not just that the deploy command returned success
  — a deploy tool's "success" is not the running site's behavior.
- Update `config.handoff` (handoff.md): what shipped, any guard added, any deferred
  item with its price.

## Refuses

- To push code whose migration has not been applied and verified **in production**.
- To raise a budget without a reason line in the diff.
- To write a commit body that asserts a fix `method-witness` has not settled.
- To treat a deploy command's success as proof the change is live.
