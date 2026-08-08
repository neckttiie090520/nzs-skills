---
name: nzs-huddle
description: >-
  One huddle, two jobs — pick by scope, not by asking. RESOLVE a request
  that has no shape yet: find every unresolved branch and settle each one
  agentically (spawn a subagent to research, or seat a biased outsider, an
  opinionated CTO, and a senior to judge — never wait on a human), then end in
  an artifact. JUDGE a decision that already has a shape: seat the same three
  and render one verdict, including "don't build it". Use when a request is
  vague or large, when a decision feels settled too easily, or when the user
  says grill this / ตบหน่อย / huddle this / resolve this yourself / what
  would a CTO say / play devil's advocate / คุยกันเอง.
---

# nzs-huddle

One engine, two jobs. Both start the same way — call the huddle — and
diverge only in what they seat it against: **many open branches** of a request
with no shape, or **one decision** that already has a shape and needs
attacking.

**Pick the job from what you have, not from a menu:**

| what you have | job | ends in |
|---|---|---|
| a request whose shape is not settled — vague, large, "something like…" | **Resolve** | an artifact |
| a decision already formed, that feels settled too easily | **Judge** | one verdict |

If you are not sure which, you have a Resolve job — a genuine Judge target
already has a name and a shape you could state in one sentence. If you cannot
state it in one sentence, it has branches, not a verdict, to find.

## The huddle — the mechanism both jobs share

For any question this seats, pick the tactic by what kind of question it is.
Reaching for three seats on a fact you could look up is theatre with extra
steps.

### 1. A researchable question — spawn one, the most capable available

If the question has a knowable answer — a convention, a limit, how a
comparable product handles it, what the framework does by default — spawn a
**single** subagent at the highest model tier this project names
(`config.models.architect`, or the strongest you can spawn if unconfigured).
Give it the question to research, not to opine on. Record its answer with
what it checked. Label it `RESEARCHED`.

### 2. A judgment question — seat three

If the question is a genuine tradeoff with no single correct answer, seat:

- **the outsider, with a declared bias** — a stance that is not this
  project's, so it proposes what an insider structurally cannot. Must declare
  the bias in the first line: *"I am arguing as someone who thinks internal
  tools should never be built when a spreadsheet would do."*
- **the opinionated CTO/CEO** — hard to please, and may answer *"don't"* or
  *"not now, and here is the price"* instead of engaging the question at all.
  Asks what the craft never asks: cost per use and at ten times the volume,
  who it is for and how many of them there are, what it costs to maintain
  once the builder leaves, what would be cut to make room for it.
- **the senior** — reads both, arbitrates, and the verdict stands **unless**
  the outsider or the CTO cited something checkable the senior did not
  check — a measurement, a file, a row, a real product's behaviour. That
  exception is the whole mechanism; without it three voices are theatre with
  extra steps, because the last speaker always wins.

The first two never see each other's output. The senior sees both. Label the
outcome `JUDGED`, with the verdict and the strongest surviving objection.

**A person may answer directly instead**, mid-run, in either job. Take that as
`CONFIRMED` and skip seating for it — but never wait for one. Neither job
blocks on a human; a `CONFIRMED` label only exists because someone chose to
volunteer one.

---

## Job 1 — Resolve (a request with no shape)

Find every unresolved branch, then seat the huddle against each one
instead of asking a person and waiting.

**Finding the branches.** Ask about the branch, not the preference. "Blue or
green" is taste. "What happens when it fails while the user is mid-way
through" is a branch, and it is where the rework lives. Look for:

- the failure path — what happens when this does not work
- the empty and the enormous case — nothing yet, and ten thousand
- who else touches it — the second editor, the other tab, the cron job
- what happens after — who reads this, when, and what they do with it
- the reversal — what would make us undo this in a month
- the price — what this costs to run, and who pays

**Follow the flinch.** A branch where your own first-pass answer is vague,
hedged, or "figure that out later" is the branch that matters. If you cannot
answer it crisply on the first pass, it needs seating, not a guess written
down anyway.

**Every resolution is an assumption until someone confirms it.** A subagent's
answer is a well-reasoned guess wearing the form of a fact. Carry the
`RESEARCHED` / `JUDGED` / `CONFIRMED` label into the artifact.
`method-greenlight`'s assumption map already has a slot for exactly this — risk ×
strength-of-evidence, per item — so `JUDGED` is a classification, not a
euphemism for guessing.

**When to stop.** Every branch has a label — or, two consecutive rounds find
no new branch. That second condition is the loop's own exit signal, since
nothing here waits for a human to eventually run out of questions.

**End in an artifact — mandatory.** A session that ends in a summary produced
nothing that survives it. Say which you are producing before you start
writing:

| what the branches produced | hand to | artifact |
|---|---|---|
| a shape that is agreed and buildable | `method-blueprint` | a spec with milestones and observable criteria |
| a shape whose value is still uncertain | `method-greenlight` | an assumption map, each ranked risk × evidence |
| rules borrowed from a reference | `method-distill` | candidate rules with measurements and sources |

Carry into the artifact, verbatim where possible: every resolution with its
label, branches resolved as "not now" with their price, and anything a
subagent found that nobody had thought to ask — those last ones are the real
yield.

---

## Job 2 — Judge (a decision that already has a shape)

Seat the huddle once, against the whole decision, not against a branch.
This is the job for a decision that "feels settled too easily" — use
`method-gauntlet` instead if what you actually have is a diff to inspect.

**Output — a single verdict:**

- the decision, one line
- what changed because of the huddle — if nothing changed, say so
  plainly; a session that never moves a decision was not seated hard enough
- the strongest surviving objection, and why it did not win
- what would reverse the decision, stated as something observable

File the verdict with `method-logbook`, so nobody re-derives it.

---

## What you refuse

- **To end Resolve in a summary of the conversation.** Artifact or the job
  did not finish.
- **To label a subagent's or a seat's answer `CONFIRMED`.** It is
  `RESEARCHED` or `JUDGED` until a real person said it.
- **To seat three for a fact you could look up.** That is the single-agent
  tactic's job; seating three on it is waste dressed as rigor.
- **To move past a flinch by guessing instead of seating.** If your own
  first-pass answer was vague, resolve it properly rather than writing it
  down anyway.
- **An outsider who does not declare their bias.** Undeclared bias is not a
  perspective, it is a distortion.
- **A CTO seat that cannot say no.** If the answer was decided before the
  huddle sat, do not seat one.
- **Resolving Job 2 by seniority when evidence was cited and unchecked.**
- **Three seats that all agree, in Job 2.** Recast the outsider — the stance
  was too close to the project's own.
- **To start building.** Job 1 resolves the shape; another skill builds it.
