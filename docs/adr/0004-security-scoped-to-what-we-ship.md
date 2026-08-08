# 0004 — Security is five disciplines scoped to what we ship, not a domain library

**Status:** accepted
**Date:** 2026-08-08

## Context

`method-review`'s selection table routes to the `security` role for endpoints,
migrations, AI calls and server actions — four of its six rows, making it the
most-selected role in the set. Nothing defined what that role does.

A roster entry with no discipline behind it reviews by taste. This is the exact
failure `method-onboard` warns about for roles ("a table that selects a role the
roster lacks selects nothing"), committed inside our own set and unnoticed
through three adversarial review rounds — because every round selected the role
and none asked what it read.

The prompting case was
[mukul975/anthropic-cybersecurity-skills](https://github.com/mukul975/anthropic-cybersecurity-skills):
817 skills across 29 domains, mapped to MITRE ATT&CK, NIST CSF, ATLAS and D3FEND.

## Decision

Write five disciplines — `method-security`, `method-threat`, `method-secrets`,
`method-web-security`, `method-ai-security` — scoped to the systems this method is used on.
Do **not** vendor the domain library.

Two of its conventions are adopted: a verification section per skill, and
findings anchored to something checkable rather than to a vibe.

## Why not vendor it

- **Different species.** 817 domain procedures — OT/ICS, malware reverse
  engineering, forensics, cloud CSPM — are an encyclopedia. This set is a
  method. Merging them makes the method harder to find inside its own repo.
- **Skills nobody invokes go stale first**, and they go stale invisibly, because
  nothing exercises them.
- **Licence.** Theirs is Apache 2.0, ours is MIT. Vendoring is legal with a
  NOTICE file and mixes two licences in a repo about to be published, for
  breadth that would not be used.

## What it cost

Breadth. This set has nothing to say about incident response, container
escapes, firmware, or OT protocols, and if a job needs those, the right move is
to consult that library directly rather than to expect a row here. Recorded so
nobody re-derives the comparison.

## Consequences

- `method-review` now names the discipline each role wears, so selecting
  `security` reads a method rather than improvising one.
- `nzs-start` routes threat modelling before building anything that handles
  credentials, money, other people's data, or external input.
- `method-secrets` makes the project's existing practice explicit and
  enforceable: exposure is a rotation event, never a cleanup event.
- `method-ai-security` records, with its reasoning, a decision the source project had
  already made correctly and never written down — model output is rendered as
  elements, never through a raw-HTML sink.
