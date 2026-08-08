---
name: nzs-grill
description: >-
  Resolves every unresolved branch of a vague or large request AGENTICALLY —
  it does not wait on a human. For each branch it either spawns the single
  most capable subagent to find the answer, or casts a three-seat role panel
  (biased outsider, exacting CTO, senior arbiter) to render a judgment call,
  then ENDS IN AN ARTIFACT — a spec, an assumption map, or extracted rules —
  never a summary of the interview. Use before building anything whose shape
  is not settled, when the request is vague or large, or when the user says
  grill this / คุยกันเอง / resolve this yourself / figure out what we need.
---

# nzs-grill

Premise: nobody knows exactly what they want, and the gap shows up as rework
after the build rather than as doubt before it. Unlike `grill-me`, this does
not interview a human — it interviews itself. You find every unresolved
branch, then resolve each one by spawning agents rather than by waiting for
an answer, and you end holding something executable.

## Finding the branches — the discipline is unchanged

Ask about the branch, not the preference. "Blue or green" is taste. "What
happens when it fails while the user is mid-way through" is a branch, and it
is where the rework lives. Look for:

- the failure path — what happens when this does not work
- the empty and the enormous case — nothing yet, and ten thousand
- who else touches it — the second editor, the other tab, the cron job
- what happens after — who reads this, when, and what they do with it
- the reversal — what would make us undo this in a month
- the price — what this costs to run, and who pays

**Follow the flinch.** A branch where your own first-pass answer is vague,
hedged, or "figure that out later" is the branch that matters. That is the
signal that replaces a human's hesitation — if you cannot answer it crisply on
the first pass, it needs a subagent, not a guess written down anyway.

## Resolving a branch — pick the tactic by what kind of question it is

Two tactics. Use the cheaper one whenever it fits; reaching for a three-seat
panel on a fact you could look up is theatre with extra steps.

### 1. A researchable branch — spawn one, the most capable available

If the branch has a knowable answer — a convention, a limit, how a comparable
product handles it, what the framework does by default — spawn a **single**
subagent at the highest model tier this project names
(`config.models.architect`, or the strongest you can spawn if unconfigured).
Give it the branch as a question to research, not as a request for opinion.
Record its answer with what it checked.

### 2. A judgment branch — cast three seats, borrowed from `nzs-panel`

If the branch is a genuine tradeoff with no single correct answer, run the
same cast `nzs-panel` uses, scoped to this one branch instead of a whole
decision:

- **the outsider, with a declared bias** — a stance that is not this
  project's, so it proposes what an insider structurally cannot. Must declare
  the bias in the first line.
- **the opinionated CTO/CEO** — hard to please, and may resolve the branch as
  *"not now, and here is the price"* instead of answering it directly.
- **the senior** — reads both, arbitrates, and the verdict stands **unless**
  the outsider or the CTO cited something checkable the senior did not check.

Run these three inline, yourself, as part of this interview — **never invoke
`nzs-panel` directly.** A user-invoked skill does not call another
user-invoked skill; that rule is what keeps `/nzs-grill` and `/nzs-panel`
unambiguous to route to. Borrowing the mechanism is fine. Calling the skill
is not.

**`nzs-grill` vs `nzs-panel`, so the two never blur.** Panel renders **one**
verdict on an already-formed decision — build it or don't. Grill resolves
**many** branches of a request that has no shape yet. If the whole ask is
"should we build this at all", that is panel's job whole — route there
instead of running grill against a single giant branch pretending to be many.

## Every resolution is an assumption until someone confirms it

**This is the honesty rule that makes the agentic version safe.** A
subagent's answer is a well-reasoned guess wearing the form of a fact. Label
every resolution with how it was reached:

- `RESEARCHED` — the single-agent tactic, with what it checked
- `JUDGED` — the three-seat tactic, with the verdict and the strongest
  surviving objection
- `CONFIRMED` — only when a real person answered this exact branch, mid-run

Carry these labels into the artifact. `method-decide`'s assumption map already
has a slot for exactly this — risk × strength-of-evidence, per item — so a
`JUDGED` resolution is not a demotion, it is the correct classification, not
a euphemism for guessing.

**If a person is actually present and answers a branch as you go**, take that
as `CONFIRMED` and skip spawning for it — but never wait for one. The loop
does not block on a human; it only upgrades a resolution when one volunteers
it.

## When to stop

Stop when every branch has a resolution (`RESEARCHED`, `JUDGED`, or
`CONFIRMED`) — or, the same rule `nzs-goal` uses, on **two consecutive rounds
that find no new branch**. That second condition is the loop's own exit
signal, since nothing here is waiting on a human to eventually run out of
questions.

## Ending in an artifact — mandatory, unchanged

An interview that ends in a summary has produced nothing that survives the
session. Convert, and say which you are producing before you start writing:

| what the interview produced | hand to | artifact |
|---|---|---|
| a shape that is agreed and buildable | `method-plan` | a spec with milestones and observable criteria |
| a shape whose value is still uncertain | `method-decide` | an assumption map, each ranked risk × evidence |
| rules borrowed from a reference | `method-extract` | candidate rules with measurements and sources |

Carry into the artifact, verbatim where possible: every resolution with its
label, the branches resolved as "not now" with their price, and anything a
subagent found that nobody had thought to ask about — those last ones are the
interview's real yield.

## What you refuse

- **To end in a summary of the conversation.** Artifact or the interview did
  not finish.
- **To label a subagent's answer as `CONFIRMED`.** It is `RESEARCHED` or
  `JUDGED` until a real person said it.
- **To spawn the three-seat cast for a fact you could look up.** That is the
  single-agent tactic's job; running three roles on it is waste dressed as
  rigor.
- **To move past a flinch by guessing instead of spawning.** If your own
  first-pass answer was vague, that is the signal to resolve it properly, not
  to write it down anyway.
- **To invoke `nzs-panel` directly.** Borrow its mechanism inline; never call
  the skill.
- **To start building.** You resolve the shape; another skill builds it.
