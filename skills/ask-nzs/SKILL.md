---
name: ask-nzs
description: The router for nzs-skills. Given a job, returns the skill STACK — which skills, in what order, and the loop that finishes the work with its exit condition stated as an observable. Use when you do not know which skill fits, when a job spans several stages, or when the user asks ใช้อันไหน / เริ่มยังไง / which skill / what's the plan / how do I approach this.
---

# ask-nzs

You return a plan, not a menu. One stack, ordered, with an exit condition
anybody can check. A router that offers three options has decided nothing and
handed the decision back.

## 1. Classify the job

Read the request and place it. Most jobs are one of these; some are two in
sequence.

| the request carries | the job is | the stack starts at |
|---|---|---|
| a URL, repo, screenshot folder, "make it like X" | acquire | `method-research` → `method-extract` |
| "should we", "worth it", "คุ้มไหม" | decide | `method-decide` |
| a feature described in prose | build | `method-plan` |
| a diff, PR, screen, "review this" | review | `method-review` |
| one broken thing, "why is X doing Y" | diagnose | `method-debug` |
| "ship", "deploy", "push" | ship | `method-ship` |
| "how do users", "is this real" | discover | `method-discovery` |

If the request is a reference plus a build ("make our page like theirs"),
acquisition runs FIRST and its output is what planning may cite. Never plan
from a raw reference.

## 2. Name the stack

List the skills in order. One line each saying why it is in the list — if you
cannot write that line, the skill does not belong.

Always answer these three, because leaving them implicit is how a stack becomes
a wish:

- **What is NOT in the stack, and why.** A stack listing everything decided
  nothing.
- **Where evidence enters.** Which step produces the artifact a later step
  cites. A stack with no acquisition and no measurement is opinion in sequence.
- **Where it can stop early.** Most jobs have a step whose result can end the
  work — a `method-decide` that says don't build, a `method-discovery` that
  finds the assumption false. Name it.

## 3. Name the loop

State how many passes, what changes between them, and the exit condition.

- **Passes:** for review, 2–3 with rotating roles; for build, one per milestone.
- **What changes:** each pass must change something a later pass can see —
  a fix landed, a finding recorded, an assumption tested. A pass that changes
  nothing is the signal to stop, not to try harder.
- **Exit, as an observable:** "`npm run check` exits 0 and every finding is
  fixed or recorded with its price" — not "when it looks done".

If the job is large enough to need its own standing loop, hand to `nzs-goal`,
which writes the `/goal` prompt and the plan file for it.

## 4. Hand off

Name the first skill and stop. Do not do its work — you are the router, and a
router that starts building has stopped routing.

## What you refuse

- **Two candidate stacks.** That is deferral wearing thoroughness. Pick one and
  say what would change your mind.
- **A stack with no exit condition**, or one stated as a feeling.
- **Planning from a raw reference.** Acquisition first, always.
- **Doing the work yourself.** Route, then stop.
