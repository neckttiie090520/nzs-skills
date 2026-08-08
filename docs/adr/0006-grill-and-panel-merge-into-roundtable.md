# 0006 — `nzs-grill` and `nzs-panel` merge into `nzs-huddle`

**Status:** accepted
**Date:** 2026-08-09

## Context

The previous commit made `nzs-grill` fully agentic — resolving branches by
spawning subagents rather than interviewing a human — and gave it the same
three-seat mechanism `nzs-panel` already owned (biased outsider, opinionated
CTO, senior arbiter), explicitly forbidding it from calling `nzs-panel`
directly since a user-invoked skill may not call another user-invoked skill.

That produced two files describing one mechanism at two scopes: Grill seated
three roles against **many branches** of a shapeless request; Panel seated the
identical three against **one** already-formed decision. Same cast, same
resolution rule (evidence beats seniority), same refusals (undeclared bias, a
CTO that cannot say no), duplicated across two skill files that a user had to
already know were different to choose correctly.

The owner asked for a merge under one clear, memorable name.

## Decision

Merge into **`nzs-huddle`**. One engine, two jobs, distinguished by scope
rather than by which of two similarly-described skills the user happened to
pick:

- **Resolve** — a request with no shape yet. Finds every unresolved branch,
  seats the roundtable against each, ends in an artifact (spec, assumption
  map, or extracted rules). This is the old Grill.
- **Judge** — a decision that already has a shape and feels settled too
  easily. Seats the roundtable once, against the whole thing, ends in one
  verdict. This is the old Panel.

The name is deliberately concrete: a roundtable is where several seated
positions argue toward either a decision or a plan, which is exactly what both
jobs do. It reads without the entry-layer's naming convention needing
explanation.

## Why not keep them separate

The split existed for a defensible reason at the time — mattpocock's
convention and ADR 0001's own logic say a user-invoked skill does one
orchestration job. But two skills sharing one engine at different scopes are
not two disciplines; they are one discipline with a scope parameter, and
making a user distinguish them by name before invoking either is asking them
to already know the answer this repo exists to give.

## What it cost

Two directory removals (`nzs-grill`, `nzs-panel`), one command file, and every
reference across README (both languages), the ecosystem guide (both
languages), START-HERE (both languages), `nzs-compass`'s routing table, and
`nzs-marathon`'s cross-references — a full sweep, not a redirect. 33 skills, 6
entry points, down from 34 and 7.

## Consequences

- `nzs-compass`'s routing table now points both the "elicit" and "challenge"
  rows at `nzs-huddle`, naming which job in parentheses — the router
  still resolves to one skill per request, it just also names the mode.
- Anyone who invoked `/nzs-grill` or `/nzs-panel` directly (rather than
  through the router) needs `/nzs-huddle` instead — recorded as a
  breaking change in CHANGELOG.md, version bumped to 1.3.0.
