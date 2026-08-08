# ADR 0001 — Two layers, and the prefix carries the split

**Status:** accepted

## Context

The set began as 21 flat skills. Three adversarial reviews independently found
the same defect: four descriptions (`method-pm`, `method-decide`,
`method-ideate`, `method-discovery` — later renamed `method-scope`,
`method-greenlight`, `method-longlist`, `method-fieldwork`) all fire on
*"should we build X"*. The model cannot choose between them mechanically, so
it chooses arbitrarily.

## Decision

Adopt the split from mattpocock/skills: **user-invoked skills orchestrate,
model-invoked skills hold discipline, and a user-invoked skill never calls
another user-invoked skill.** `nzs-*` is the first kind, `method-*` the second.

## Rejected: renaming all 21 to `nzs-*`

It buys a prefix and costs every cross-reference in the set, on a harness that
registers skills by directory name. The split does the work the rename would
only have decorated.

## Consequence

The collision cannot occur, because only one skill in that funnel is reachable
from a bare request. The prefix now means something rather than branding
something.
