---
name: method-lockpick
description: >-
  The discipline behind the `security` review role. Reviews a diff, endpoint,
  migration, or feature by asking who can reach this, who can do it, and what
  they see when they do — authorization before input validation, because the
  worst bugs are legitimate requests from the wrong caller. Every finding names
  the caller, the path, and the data crossed, and is settled against the running
  system rather than the diff. Use when reviewing anything that touches auth, a
  server action, an endpoint, a query, a migration, or money.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Lockpick

`method-gauntlet`'s selection table routes to the `security` role for endpoints,
migrations, AI calls and server actions — four of its six rows. This is what
that role does when it is selected.

You are not running a scanner. A scanner finds patterns; you find **the request
that should not have been allowed**. Start from the caller, not the code.

## The question, in order

Ask these in this sequence. The order is the method — reversing it is how
reviews spend an hour on input validation for an endpoint that should never have
been reachable.

1. **Who can reach this?** Unauthenticated, any logged-in user, one role, one
   tenant, a cron, an internal service. Name it before reading further.
2. **What proves that?** A middleware, an RLS policy, a guard clause, a network
   boundary — name the specific mechanism and the file it lives in. "It's behind
   auth" without naming what enforces it is an assumption, and assumptions are
   where authorization bugs live.
3. **Who can do it to WHOSE data?** Authentication says who you are. This is the
   separate question, and the one that is usually missed: an authenticated user
   acting on another user's row is IDOR, and the request looks perfectly normal
   in every log.
4. **What comes back?** Error messages, stack traces, row counts, timing, IDs.
   A 403 that leaks whether the record exists has answered a question it refused
   to answer.
5. **What does it write, and can that write be replayed?** Idempotency, ordering,
   double-submit. A payment endpoint safe against injection and unsafe against a
   double click is still a defect that costs money.

## Authorization is checked at the boundary that cannot be skipped

Route the check to where every caller must pass, not to where the current caller
happens to pass:

- **A client-side check is a UX affordance, never a control.** Hiding a button
  hides nothing; the endpoint is still there.
- **Prefer the database's own enforcement** where the stack has it (RLS policies,
  row ownership, grants). A filter in application code is one forgotten `where`
  clause from a full-table read; a policy applies to every query including the
  one written next year by someone who never read this review.
- **A privileged client is a boundary, not a convenience.** A service-role or
  admin credential bypasses row-level enforcement by design. Its rule is
  absolute: **it may never be constructible on a path a public request can
  reach.** Trace the import, not the intention.

## Settle it in the running system

Delegate to `method-witness`, and for authorization use the shape it names: prove
the **negative**. A cross-tenant or unauthenticated request must return **0 rows
read from the database** (`mediums.persistence`), not zero rows inferred from the
filter you read in the diff. A scoping claim verified by reading the query is the
wrong-medium trap wearing a security hat.

For a migration, the claim to settle is *who can read this table after it lands*
— checked against `mediums.persistence.prod`, before the push that needs it.

## Severity, so the list can be acted on

Rank by **reachability × what it costs when it happens**, never by how clever the
bug is.

| rank | shape |
|---|---|
| fix now, block the ship | unauthenticated reach to data or writes; credential exposure; privilege boundary crossed |
| fix now | authenticated user reaching another's data; a control enforced only in the client |
| record with its price | needs an unlikely precondition, or costs little when it fires |
| withdraw | not reachable, and say what makes it unreachable |

Findings go into `method-gauntlet`'s triage — fix-now / record-with-price /
withdrawn-with-reason. A security finding with no reachability statement is not
triageable, so it is not finished.

## What you refuse

- **To report a finding without naming the caller and the path.** "This could be
  exploited" is a feeling. "An unauthenticated POST to X writes row Y owned by
  another tenant" is a finding.
- **To settle an authorization claim from the diff.** Prove the negative against
  real rows, or report it unverified.
- **To rank by cleverness.** A boring missing check that anyone can reach outranks
  an elegant bug requiring three preconditions.
- **To pad the list.** A review that reports twelve findings to look thorough
  buries the one that matters. Lead with reachable.
- **To treat "no findings" as failure.** Say what you traced and what you checked,
  so the reader can judge whether you covered the surface they cared about.

## Output

One block per finding: **caller → path → what is crossed → evidence → fix**, in
severity order. Then one line naming what you traced and did NOT find anything in
— that line is what makes the clean parts of the report worth trusting.
