---
name: method-lookout
description: >-
  A threat model scoped to what is actually being built — STRIDE applied to one
  feature, diff, or milestone, producing a short ranked list of what an attacker
  would try and what already stops each one. Ends in review tasks and guards, not
  a document nobody reads. Use before building anything that handles credentials,
  money, other people's data, file uploads, or external input; or when the user
  says threat model / attack surface / what could go wrong.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Lookout

A threat model is worth exactly as much as the work it changes. A forty-page
document produced once and never opened has cost more than it saved. Yours is
short, scoped to one feature, and its output is a list of things to check and
guards to write.

Run this **before** building, when the design can still absorb the answer.
Running it after is a review, and `method-lockpick` is the skill for that.

## 1. Draw the boundary, in one paragraph

Name what is in scope and what is outside it. Then, for the thing in scope, list:

- **Entry points** — every way input or a request gets in. Endpoints, forms,
  webhooks, file uploads, queue consumers, model outputs, third-party callbacks.
- **Assets** — what an attacker would actually want here. Other users' data,
  credentials, money, compute, reputation, availability.
- **Trust boundaries** — every place data crosses from less-trusted to
  more-trusted. Browser to server, tenant to tenant, model output to renderer,
  free tier to paid, external API response to your database.

If you cannot draw this in one paragraph, the feature is too big to model in one
pass — split it, and say where you split it.

## 2. STRIDE, one line per entry point

For each entry point, walk the six and keep only what is real here:

| | the question |
|---|---|
| **S**poofing | can someone claim to be another caller? |
| **T**ampering | can they change data or requests in flight or at rest? |
| **R**epudiation | can they deny doing it, and would we be able to show otherwise? |
| **I**nformation disclosure | what do they learn — including from errors, timing, and row counts? |
| **D**enial of service | can they exhaust something? include **cost**: an endpoint that spends money per request is a budget DoS |
| **E**levation of privilege | can they end up with more authority than they started with? |

Most rows will be "not applicable here, because X". Write the X — a dismissal
with its reason is reusable next time; a blank row gets re-derived.

## 3. Rank by reachability × cost

The same ranking `method-lockpick` uses, for the same reason: a model that ranks
by interest produces a list nobody can act on. An unauthenticated path to an
asset outranks an elegant attack needing three preconditions.

Keep the top few. **A threat model that lists everything has prioritised
nothing**, and its readers will skim it exactly once.

## 4. Land it as work, or it did not happen

Every kept threat leaves this skill as one of exactly three things:

1. **A control that already exists** — name it and the file it lives in, so the
   next review does not re-litigate it.
2. **A task**, with the review role that will check it (`method-gauntlet` will
   select `security`) or the code that must be written.
3. **A guard**, when the threat is a class that recurs rather than a one-off —
   handed to `method-tripwire`, red-on-mutation before it counts.

Then record the model in the register (`config.register`), so the next person
inherits the dismissals and does not pay for them again.

## What you refuse

- **To produce a document with no tasks.** The deliverable is the list of things
  that changed as a result. If nothing changed, say why the model was worth
  running anyway — or admit it was not.
- **To model the whole system** when one feature was asked about. Scope creep
  here is how threat modelling got its reputation.
- **To list a threat with no control and no task.** That is a worry, not a model.
- **To skip the cost row** on anything that calls a paid API. Spend is an
  availability asset — delegate the bound to `method-tab`.

## Output

A table: **entry point | threat | rank | already stopped by / task / guard**.
Under it, the dismissals with their reasons. Whole thing fits on one screen or
it has stopped being a threat model.
