---
name: method-gauntlet
description: Adversarial review in rotating roles. Each round wears one role (scrutinize, bug-hunter, security, a11y, editor, design-jury, edge-case) so it finds what the other roles structurally cannot, and each round FIRST re-verifies that the previous round's fixes actually landed before hunting new defects. Findings are triaged into fix-now / record-with-price / withdrawn-with-reason. Use to review a diff, a PR, a screen, a spec, or a milestone; when the user says review / loop 2 times / loop 3 times / เปลี่ยน role / adversarial pass / find what is wrong with this.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-gauntlet

You are running rounds of adversarial review, one role per round, against a
change you must trace as a real code path — not just read as a diff.

## The failure this prevents

Two. First, a single reviewer finds only what its posture can see; a security
pass will not notice a 46-word callout and an editor will not notice an IDOR.
The owner's rule is to change the role each round *"to maximise what the loop
can see"*. Second, and more expensive: **a claimed fix that never landed**. This
corpus records three separate review rounds catching a fix that had been
reported as done and was not — an edit *"targeted a string that had already
changed, silently matched nothing, and I reported the change as done without
reading the file back"*. A round that opens by hunting new defects builds its
findings on top of a lie.

## Step 1 — pick the roster

Read `roles` from `.method/config.yml`. From it, select only the roles this
change can actually expose, in the order they will run:

| The change is | The roster starts with |
|---|---|
| Pure CSS / layout / a screen | design-jury, a11y |
| A server action, an endpoint, a query | security, edge-case, bug-hunter |
| Copy, labels, error text, a spec | editor, a11y |
| A migration or schema change | security (who can read this), edge-case (re-run, empty table, backfill) |
| A guard or a test | scrutinize (does it fail on a real mutation), edge-case |
| An AI/model call or anything costing money | cost/bounds, edge-case, security |

**Every role names the discipline it wears.** A posture with no method behind it
reviews by taste. When a round selects `security`, read `method-lockpick` and
follow it — adding `method-trapdoor` where the change is web-facing, and
`method-puppeteer` where it prompts a model or renders one's output. This table says
*which* posture; those skills say *what it does*.

**No role repeats until the roster is exhausted.** If the roster runs out before
the rounds do, stop — a repeated role finds the same class again and calls it
progress. Name the chosen roster and the reason for each pick before round 1.

Roles are postures, not personalities. A role is legitimate only if it has a
question the others do not ask.

## Step 2 — rounds

Two to three rounds by default. Each round has exactly two phases, in this order.

### Phase A — re-verify the previous round (non-negotiable)

Skip this and the whole exercise is theatre. For **every** finding the previous
round marked fix-now:

1. Name the fix that was claimed.
2. Settle it **in the medium where it is true**, not in the diff — the DOM for
   rendered output, the compiled artifact for a style token, a real query for a
   data claim, the ledger for a cost claim, the running command's exit code for
   a build claim. Reading the file back is the floor, not the ceiling.
3. Record the actual output. *"The org filter lands: a cross-org request returns
   0 rows"* — a count from the database, not a sentence about the code.
4. If it did not land, it goes back in this round's fix-now bin, and you say so
   plainly. A fix that half-landed is a fix that did not land.

Two verification failures have their own names here, and you should expect both:
an assertion that matched **nothing** and was read as success, and a probe that
matched **too much** — *"a strict-mode locator resolving to three elements
throws, and I read the throw as 'not rendered'"*. When a probe throws, find out
what it means before you write it down.

Round 1 has no phase A. Instead, run the project's `verify.check` and
`verify.guards` commands and record their exit codes — that is the baseline the
later rounds re-verify against.

### Phase B — hunt, in this round's role

Trace the real code path, not the diff. Ask where the caller is, what happens
when the input is empty, what the second user sees. Each finding carries:

- **What is wrong**, in one sentence.
- **Where** — file and line.
- **The evidence** — the query, the assertion, the measurement. A design-jury
  finding measures: this project's juries measured all three states at 1512 and
  1280 themselves, measured `lab(45.13 18.36 -71.70)` off the live DOM, and
  proved a comment's "~510px" false by measuring 583. An unmeasured aesthetic
  claim is an opinion wearing a review's clothes.
- **The bin** — see below.

## Step 3 — triage, three bins, everything lands in one

**fix-now.** A defect with evidence and a bounded fix. Fix it in this round or
name who does.

**record-with-price.** Real, but larger than this task's honest scope. Only
three reasons qualify: (a) bigger than the current task's honest scope, (b)
blocked on something unavailable — a key out of quota, an API that cannot be
reached — or (c) a genuine judgment call the owner should make. It becomes a
priced entry in the spec's declined/deferred section, worded so **nobody
re-proposes it**, and costed honestly: items that share rework are priced
*together*, because pricing them apart makes each look cheap and the pair look
free.

**withdrawn.** You were wrong. Record it anyway, with the reason — a jury that
withdrew a proposed deletion and was still right about the underlying form is
worth keeping the reasoning of, and a withdrawal that vanishes will be
re-discovered by round 3.

**A silent drop is never allowed.** A finding that leaves without a bin is the
one failure mode this triage exists to prevent.

## The findings that may never be deferred

A **cheap-direction lie** — anything that misleads toward false comfort — is
always fix-now, regardless of scope, schedule, or how small the surface is:

- **Null shown as zero.** Unknown is not free. *"Null, not zero, when the ledger
  will not answer."* An export with no logged cost shows "—", never ฿0.00.
- **A ceiling rounded down.** `toFixed(2)` turned ฿0.1234 into ฿0.12 — *"a bound
  the real spend can beat, which is the one thing a bound may not be."* A
  ceiling rounds up or it is not a ceiling.
- **A warranty on screen the code cannot honour.** A control the server never
  reads; a "Stop" that does not stop; a cap advertised in the UI and enforced
  nowhere; a "Saved" over a mutation that touched zero rows. *"No control exists
  unless the server reads it."*
- **A success message on an unverified path** — "we never tried it" and "it
  works" rendered identically. If a check was skipped, it is announced loudly as
  skipped.

These are not severity judgments; they are a category. Deferring one means
shipping a statement you know to be false in the direction that flatters you.

## Stop condition

Stop when a round both (a) confirms the previous round's fixes landed, in their
medium, and (b) finds nothing new. Rounds that keep finding things do not stop
at three — they stop when the roster is exhausted, and then you say what is
still unexamined rather than implying it is clean.

Where the config names an independent reviewer (`models.reviewer` — a second
engine, not one of your roles), hand it the milestone. Its blind spots differ
from yours, which is the entire value; a report that cannot survive another
engine re-running the load-bearing check is theatre by definition.

## What you refuse

- To open a round without re-verifying the previous one.
- To accept a report as evidence. Name the command, the query, or the DOM
  assertion and its actual output, or downgrade the claim to *attempted,
  unverified*.
- To confirm a rendered claim from source. A running server can serve a stale
  chunk; a thing proven in source and not observed in the browser is recorded as
  exactly that.
- To defer a cheap-direction lie.
- To let a finding leave without a bin.
- To repeat a role while the roster has an unused one.

## Report

Per round: the role, the phase-A re-verification lines with their actual
outputs, the findings with evidence and bins. Then the totals — fix-now fixed,
record-with-price entries (and where they were written), withdrawn with reasons
— and what remains unexamined because no role in the roster covers it.
