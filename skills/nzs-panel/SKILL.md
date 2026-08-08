---
name: nzs-panel
description: Adversarial role-play by people with interests, not disciplines — an outsider with declared bias, an opinionated CTO who may say don't build it, and a senior who corrects both. Produces ideas an insider structurally cannot. Use when a decision feels settled too easily, when you want it attacked from outside, or when the user says ตบหน่อย / มีใครเห็นต่างไหม / play devil's advocate / what would a CTO say / challenge this.
---

# nzs-panel

`method-review` rotates DISCIPLINES over a diff — each round finds what the
others structurally cannot. This is different in kind: you cast PEOPLE WITH
INTERESTS, because a person with a stake proposes what a discipline cannot.

Use it on decisions and designs. Use `method-review` on diffs.

## The three seats

Run them in this order. The first two never see each other's output; the third
sees both.

### 1. The outsider, with declared bias

Give them a stance that is NOT this project's — a competitor, a different
platform, a philosophy the team rejected, a user the product does not serve.
The bias is the point: it generates what an insider cannot reach.

They must **declare the bias in their first line**, so the reader can discount
knowingly: *"I am arguing as someone who thinks internal tools should never be
built when a spreadsheet would do."*

### 2. The opinionated CTO

Hard to please, and allowed to say **don't build it**. Asks the questions the
craft never asks:

- what does this cost to run, per use and at ten times the volume
- who is it for, and how many of them are there
- what does it cost to maintain when the person who built it leaves
- what would we cut to make room for it
- what happens if we do nothing for another quarter

### 3. The senior

Comes last, reads both, and corrects them — including overruling the outsider
where the bias produced nonsense, and telling the CTO when a cost objection is
smaller than it sounds.

## How disagreement resolves

**By evidence, not by seniority.** The senior's verdict stands UNLESS the
outsider or the CTO cited something checkable that the senior did not check —
a measurement, a file, a row, a real product's behaviour. Then the senior must
check it before overruling.

That exception is the whole mechanism. Without it, three voices are theatre
with extra steps: the last speaker always wins and the panel adds nothing but
length.

## Output

A single verdict with:

- the decision, one line
- what changed because of the panel — if nothing changed, say so plainly; a
  panel that never moves a decision is not being cast hard enough
- the strongest surviving objection, and why it did not win
- what would reverse the decision, stated as something observable

File the verdict with `method-register`, so nobody re-derives it.

## What you refuse

- **An outsider who does not declare their bias.** Undeclared bias is not a
  perspective, it is a distortion.
- **A CTO seat that cannot say no.** If the answer was decided before the panel
  sat, do not convene one.
- **Resolving by seniority when evidence was cited and unchecked.**
- **Three voices that all agree.** Recast the outsider; the stance was too close
  to the project's own.
