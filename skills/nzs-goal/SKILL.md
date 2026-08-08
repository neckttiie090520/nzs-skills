---
name: nzs-goal
description: Generates a standing goal-loop for Claude Code — a ~4000-character /goal prompt plus a plan file the loop re-reads each iteration, built so the loop actually TERMINATES and so one model can run long without filling its window. Use for work too big for one pass, when the user says /goal / /loop / ทำจนจบ / run until done / set up a loop for this / keep going until it works.
---

# nzs-goal

You produce two artifacts. Neither is the work; both are what lets the work
finish without a human re-explaining it every iteration.

## Artifact A — `.nzs/goal-<slug>.md`, the plan the loop re-reads

This file is the loop's memory. It holds only what must survive between passes:

```markdown
# <goal in one line>

## Done when
- [ ] <observable> — evidence: <where it will be settled>
- [ ] <observable> — evidence: <where it will be settled>

## Ledger
| # | changed | verified in | evidence |
|---|---------|-------------|----------|

## Open
1. <next piece of work, smallest first>

## Blocked
- <what> — needs <who/what> — since iteration <N>

## Do not retry
- <approach> — refuted in iteration <N> because <reason>
```

Five sections, each load-bearing:

- **Done when** is the exit condition, written as observables with the medium
  each will be settled in. "Feature works" is not one. "`npm run check` exits 0"
  is.
- **Ledger** is written by the LOOP, not by the agent that did the work. An
  agent that did nothing produces an empty row rather than a convincing
  paragraph. This is the anti-theatre defence and the reason the ledger exists.
- **Open** must shrink. If it grows two iterations running, the goal was too
  big — say so and split it.
- **Do not retry** is what stops a loop rediscovering the same dead end at
  iteration 9 that it refuted at iteration 3.

## Artifact B — the `/goal` prompt, about 4000 characters

The prompt is CONSTANT. It carries doctrine, the protocol, and the roster; it
does **not** carry the work list, because the work list changes and the prompt
must not. Compose it from:

1. **The goal**, one sentence.
2. **The protocol**, verbatim: read `.nzs/goal-<slug>.md` first; take the top
   item from `## Open`; do it; verify it in its medium; write one Ledger row;
   update `## Open`; stop.
3. **The doctrine that must not be re-derived** — evidence before assertion,
   verify in the medium where the claim is true, a guard seen failing before it
   is trusted, nothing declared done from reading a diff.
4. **The roster** — which roles may be spawned for this job, from `nzs-start`.
5. **The stop rules**, below.

Aim for 3,500–4,000 characters. Longer and the model skims it; shorter and it
re-derives what you left out.

## Termination — three rules, all mechanical

1. **Done:** every `## Done when` box is ticked AND carries an evidence
   reference. A tick with no evidence does not count.
2. **Stalled:** two consecutive iterations with no Ledger change. A loop that
   cannot show progress is not making any. Stop and report what is blocking.
3. **Budget:** a hard iteration cap, set when the goal is written. Reaching it
   is a report, not a failure — it says the goal was bigger than believed.

## Token economy — where the context goes

The main loop holds three things only: the prompt, the plan file, and the
current diff. Everything expensive is pushed outward.

**The rule: if a step would put more than a screenful into the main window, it
is a subagent.** Reading a large file, sweeping a codebase, driving a browser,
running a review role, reading a long transcript — all of these are subagents
whose findings come back as a Ledger row, never as a transcript.

This is what lets one model run for many iterations without exhausting its
window, and it is why the ledger row format is narrow: it is the compression
boundary.

## Spawning the team

The roster comes from `nzs-start`. Spawn roles in parallel only when their work is
independent — two reviewers, yes; a builder and a reviewer of that build, no.
Findings return as rows. Where two roles disagree, hand to `nzs-roundtable` rather
than averaging them.

## What you refuse

- **A goal with no observable exit.** Write the `## Done when` boxes first; if
  you cannot, the goal is not yet a goal and belongs in `nzs-roundtable`.
- **A plan file whose `## Open` only grows.** That is a goal that needed
  splitting, reported as progress.
- **Putting the work list in the prompt.** The prompt is constant; the plan file
  is what changes.
- **Spawning a role the job does not need**, or in parallel when one depends on
  the other's output.
