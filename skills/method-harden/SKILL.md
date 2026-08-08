---
name: method-harden
description: Makes a feature survive contact with reality — interrupted and abandoned journeys, two tabs racing the same row, step 2 failing after step 1 succeeded, behaviour AT the limit and one past it, nested timeouts, hostile input, and one broken piece taking the whole page down. Runs as checklists that produce findings with evidence, not reassurance. Also audits every error message for the three things they keep missing: what happened, whether it cost anything, what to do next. Use before shipping anything with money, state, or multiple steps; when the user says พัง / ทน / edge case / error state / what if / race condition / what happens when it fails.
---

# method-harden

You are trying to break this, on purpose, before a user does it by accident. Each
section below is a checklist that must produce **findings with evidence** — a
reproduction, a row count, a log line, a screenshot — not sentiments. "Should be
fine" is not a finding. "I ran it twice in two tabs and got two rows" is.

## The failure this prevents

Features that work on the happy path and lie everywhere else. The expensive
version in this project: a **read-then-act race** — the code read a row, saw it
was unclaimed, and then wrote. Two requests both read "unclaimed" and both wrote,
and the user was charged twice. The fix was not a lock; it was to make **the
conditional UPDATE itself the gate** and to read its **row count** as the verdict.
An UPDATE denied by row-level security is not an error in Postgres: zero rows,
success returned. The UI says "Saved", the database is untouched, and no log
disagrees.

## 1. Interrupted and abandoned journeys

For every multi-step or async operation, walk each of these and record what
happens:

- [ ] Navigate away mid-operation. Does the work continue? Does it complete and
      write, with nobody watching?
- [ ] Close the tab. Same question. Anything already **paid for** must survive —
      if money was spent and the artefact is gone, that is the worst class of
      bug in this system.
- [ ] Back button, then forward. Is stale state re-rendered as if current?
- [ ] Refresh mid-flight. Does the in-progress operation come back, restart, or
      vanish? A refresh that silently restarts a paid call bills twice.
- [ ] Double-click the trigger. A double click once bought two drafts here.
      Disable on submit AND make the server idempotent — the client guard is
      convenience, the server guard is the fix.
- [ ] Resume: come back an hour later. Does the page recover the result, or
      does it show an empty form as though nothing happened?

Name, for each, **what is lost** and **what was already paid for**.

## 2. Concurrency

- [ ] Two tabs, same user, same row. Both submit. Then both submit again.
- [ ] Two users, same row.
- [ ] Any read-then-act sequence: find them by searching for a SELECT/check
      followed by an INSERT/UPDATE on the same key. **Every one is a race.**
- [ ] Make the conditional write the gate. `UPDATE ... WHERE <the condition you
      were about to check>` and then **read the affected row count**. Zero rows
      means it did not happen — surface that, never report success.
- [ ] Uniqueness that exists only in application code is not uniqueness. Is
      there a constraint in the database?
- [ ] Prove it: run the operation twice concurrently and count the rows.

## 3. Partial failure

- [ ] For each multi-step operation, list the steps and ask: step 1 succeeds,
      step 2 fails — what state is the system in?
- [ ] What is rolled back, and by what mechanism? (A transaction? Nothing?)
- [ ] What crosses a boundary that cannot roll back — an external call, an
      email, a charge? Those must be **last**, or be idempotent and re-driveable.
- [ ] After the rollback, verify the rollback: read the row back. A rollback
      nobody checked is a hope.
- [ ] Is the partial state visible to the user, or does the UI show the success
      of step 1 while step 2's absence is silent?

## 4. Limits and caps

For every limit — row cap, character cap, rate limit, file size, page size,
budget ceiling:

- [ ] Exactly AT the limit. Does it pass?
- [ ] One past it. Does it fail cleanly, with a message that names the limit?
- [ ] Zero, empty, and one. An empty export that reports success is a defect;
      so is a list that renders "1 items".
- [ ] Is the limit enforced on the **server**? A cap advertised in the UI and
      enforced nowhere is a warranty the code cannot honour.
- [ ] Does the number in the message come from the same constant as the check?
      If it is typed twice, they will drift (hand to `method-code`).
- [ ] Far past it — 100x. Does it degrade or fall over?

## 5. Timeouts and their nesting

Write the timeouts down as a nested list with their real numbers, including the
ones you do not control.

- [ ] Platform/hosting ceiling. Gateway. Client fetch. Your own inner timeout.
- [ ] **Do the arithmetic.** A 45s inner timeout, retried, inside a 120s platform
      ceiling: 45 + 45 = 90, plus setup and the second call's overhead, and the
      platform kills the request. A platform kill has **no error path** — your
      catch never runs, your cleanup never runs, and the user sees a blank
      failure. Every inner budget times its retry count must fit inside the outer
      ceiling with headroom.
- [ ] Is there an error path for the outer timeout at all? If the platform kills
      you, what does the user see and what does the database contain?
- [ ] Is the timeout shorter than the slowest legitimate case you have measured?

## 6. Unknown and hostile input

- [ ] Empty, whitespace-only, and absent-vs-null (they are different states).
- [ ] Very long — 10x the expected maximum.
- [ ] Unicode, RTL, emoji, combining characters, zero-width spaces.
- [ ] Markup and template syntax in anything rendered or interpolated.
- [ ] Numbers as strings, negative, zero, and non-integer where an integer is
      assumed.
- [ ] Data from another tenant/org — the request must return **0 rows**, proved
      by a query, not by reading the filter in the diff.
- [ ] An external response that is malformed, truncated, or an HTML error page
      where JSON was expected.

## 7. Silent degradation

- [ ] One failing piece must not take the whole feature down. A panel that
      cannot load renders its own error and the rest of the page still works.
- [ ] Anything optional — an image host, an analytics call, a preview — fails
      to a degraded state, not to a crash.
- [ ] But degradation must be **visible**. A section that quietly renders empty
      when its fetch failed is indistinguishable from "there is nothing here",
      and that is a cheap-direction lie. Say it failed.
- [ ] A missing value shows as unknown, never as zero. Unknown cost is "—", not
      ฿0.00.

## 8. Every error message says three things

Audit each error path. This project's audits kept finding the same three
omissions, so check all three explicitly:

1. **What happened** — in the user's terms, specific to this failure. Not
   "Something went wrong."
2. **Whether it cost anything** — was money spent, was work lost, was anything
   saved? Silence here is read as "nothing happened", which is often false.
3. **What to do next** — retry, wait, change the input, contact someone. An
   error with no next step makes the user invent one, usually by clicking again.

## What you refuse

- **A catch that swallows a distinct error type into a generic message.** If
  timeout, quota-exceeded, malformed-response, and permission-denied all render
  as "Failed to generate", you have destroyed the only information the user
  needed to act, and the only information *you* will have when they report it.
  Distinguish them, or say why they are genuinely the same.
- **A retry offered for a failure that will fail identically.** A retry button on
  a quota exhaustion, a validation error, or a permanently malformed input is a
  button that spends the user's time to reproduce a known result. Offer retry
  only where the failure is transient, and say so.
- **A finding with no reproduction.** Every item above produces evidence or it
  is not a finding.
- **Deferring a cheap-direction lie** — null shown as zero, a success message on
  an unverified path, a cap the server does not enforce. Those are always
  fix-now.

## Hand off

- A failure class you have now fixed twice → `method-guard`, so a build catches
  the third (the read-then-act race became exactly this kind of guard here).
- Every "it handles that" you are about to write → `method-verify`. Robustness
  claims are settled by running the broken case, not by reading the catch block.
- The findings themselves → `method-review`'s triage: fix-now, record-with-price,
  or withdrawn. Nothing leaves without a bin.

## Report

Per section: what you tried, what happened, and the evidence. Then the findings
list with bins, the error paths you audited against the three-part rule (and
which failed it), and the timeout arithmetic written out. Say plainly which
sections you could not exercise and why — a section skipped is announced, never
counted as clean.
