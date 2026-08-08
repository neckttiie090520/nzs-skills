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
| credentials, money, other people's data, uploads, external input | build, but model it first | `method-threat` → `method-plan` |
| a leaked key, "rotate", .env, a repo about to go public | contain | `method-secrets` |
| vague want, "something like…", no clear scope | elicit | `nzs-grill` |
| a decision that needs an argument, not a checklist | challenge | `nzs-panel` |

If the request is a reference plus a build ("make our page like theirs"),
acquisition runs FIRST and its output is what planning may cite. Never plan
from a raw reference.

**When the job is underspecified, `nzs-grill` comes before everything.** A stack
built on a request nobody has pinned down is a stack that will be rebuilt. Grill
ends in an artifact — a spec, an assumption map, extracted rules — and that
artifact is what the rest of the stack consumes.

**`nzs-panel` is not a review round.** `method-review` rotates disciplines over a
diff; the panel casts people with interests, and it earns its place when the open
question is *whether this should exist or who it is for* — not whether the code
is correct.

## 1b. The lifecycle skills — never in the stack, sometimes the answer

Three skills serve the session rather than the job. They are not stack steps, so
they never appear in an ordered list — but if the request is one of these, say so
and route there instead of classifying it as work:

| the request carries | route to |
|---|---|
| "set this up", ติดตั้ง, a fresh workspace or machine | `nzs-setup` |
| "hand this over", running out of context, ending a session | `nzs-handoff` |
| "remember this", จำไว้, or the user just corrected you | `nzs-learn` |

The last one also fires unprompted: **a correction from the user is the highest-value
signal in the session**, and routing it to `nzs-learn` costs one step and saves the
same mistake twice.

**Keeping these tables honest.** Most `method-*` skills correctly have no row — they
are disciplines, and they enter in §2 when the stack is named, not from a bare
request. The rows exist only for **entry points**: what a job can *start* at. So the
failure to watch for is narrow and specific — a new user-invoked skill that nothing
here can reach. Before answering, check the `nzs-*` skills in the available-skills
listing against the two tables above. One that appears in neither is unreachable
from any request, and that is worth saying out loud rather than routing around.

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
