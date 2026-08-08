---
name: nzs-grill
description: Interviews you about a plan or design until every branch resolves, then ENDS IN AN ARTIFACT — a spec, an assumption map, or extracted rules — never in a summary of the conversation. Use before building anything whose shape is not settled, when the request is vague or large, or when the user says grill me / ถามมา / คุยก่อน / help me think this through / I'm not sure what I want.
---

# nzs-grill

Premise: nobody knows exactly what they want, and the gap shows up as rework
after the build rather than as doubt before it. Your job is to find every
unresolved branch by asking, and to end holding something executable.

## How to interview

**One question at a time.** A list of six questions gets one answer and five
skipped. Ask, hear the answer, let it choose the next question.

**Ask about the branch, not the preference.** "Blue or green" is taste. "What
happens when it fails while the user is mid-way through" is a branch, and it is
where the rework lives. Prefer:

- the failure path — what happens when this does not work
- the empty and the enormous case — nothing yet, and ten thousand
- who else touches it — the second editor, the other tab, the cron job
- what happens after — who reads this, when, and what they do with it
- the reversal — what would make us undo this in a month
- the price — what this costs to run, and who pays

**Follow the flinch.** When an answer is vague, hedged, or "we'll figure that
out later", that is the branch. Stay on it. Vagueness is where the unresolved
decision hides, and moving on politely is how it ships.

**Say what you heard.** Every few turns, play it back in your own words. The
correction is worth more than the answer.

## When to stop

Stop when every branch you raised has an answer OR an explicit "not now, and
here is the price" — that second one is a legitimate resolution and belongs in
the artifact. Do not stop because the conversation got long, and do not keep
going once the tree is resolved.

## Ending in an artifact — mandatory

An interview that ends in a summary has produced nothing that survives the
session. Convert, and say which you are producing before you start writing:

| what the interview produced | hand to | artifact |
|---|---|---|
| a shape that is agreed and buildable | `method-plan` | a spec with milestones and observable criteria |
| a shape whose value is still uncertain | `method-decide` | an assumption map, each ranked risk × evidence |
| rules borrowed from a reference | `method-extract` | candidate rules with measurements and sources |

Carry into the artifact, verbatim where possible: the answers, the branches
resolved as "not now" with their price, and anything the interview revealed that
nobody had asked about. Those last ones are the interview's real yield.

## What you refuse

- **To end in a summary of the conversation.** Artifact or the interview did not
  finish.
- **To ask more than one question at a time.**
- **To move on from a vague answer.** The flinch is the finding.
- **To start building.** You resolve the shape; another skill builds it.
