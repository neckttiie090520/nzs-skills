---
name: nzs-scrapbook
description: Records what to repeat and what never to repeat — into engram, so it survives the session. Captures wins worth building on, mistakes with the shape that caused them, and this person's own taste and workflow, so later work is judged against THEIR standard rather than a generic one. Use after finishing something notable, after a mistake is understood, when the user corrects your approach, or when they say จำไว้ / บันทึก / remember this / don't do that again / learn from this.
---

# nzs-scrapbook

Two things are worth persisting: **what worked and why**, and **the shape of a
mistake** so it is recognisable before it happens again. Everything else is
narration.

Write to engram. If the engram tools are not connected, say so and write to
`.method/learned.md` instead — but say which, because a memory the user thinks
is durable and is not is worse than no memory.

## What to record — four kinds only

### 1. A win worth repeating
Not "the feature shipped". A *technique* that beat the obvious alternative.

> Mutation-testing a guard at birth found a defect in the guard itself: it
> compared bytes, so autocrlf made two identical files differ after any
> checkout. Writing the guard was not the value; watching it fail was.

### 2. A mistake, recorded by its SHAPE
The shape is what makes it recognisable next time. The instance is not.

> An edit silently matched nothing and I reported it done. Three times in one
> session, in three different files. **Shape: a find-and-replace whose target
> string had already changed.** Countermeasure: grep for the result afterwards,
> never trust the edit's own success.

Record the countermeasure with it. A mistake with no countermeasure is a regret.

### 3. This person's taste
Their standards, in their words where possible. This is what later reviews are
judged against instead of a generic bar.

> Controls must be sized to their content — *"แบบยาวมากเกินขนาดที่จะใช้จริง"*.
> A one-sentence field at 1115px is the complaint that started an entire pass.

### 4. A workflow fact that saves the next session real time
Tool behaviour, environment traps, what is fast and what is slow here.

> Codex agents in this environment background themselves and do not return
> inline. Do not block on them.

## How to write it

- **One fact per memory.** A memory holding three things is retrieved for none
  of them.
- **Include the evidence.** The measurement, the quote, the commit. A rule with
  its evidence is believed; a rule alone is skimmed.
- **Absolute dates**, never "yesterday".
- **Update, do not duplicate.** Search engram first — a sharper version of an
  existing memory replaces it.
- **Never store secrets, keys, or anything the user would not want persisted.**

## When to write

At the moment of understanding, not at the end of the session. The insight is
sharpest immediately after the mistake is diagnosed, and a session that runs out
of context before its retrospective loses everything it learned.

Also write when **the user corrects you**. That correction is the highest-value
signal available — it is their taste, stated explicitly, usually once.

## What you refuse

- **To record a mistake without its shape and countermeasure.**
- **To record what the repo already says.** Code structure, git history and
  CLAUDE.md are not memories; they are files, and they are already there.
- **To record a win you have not verified.** A technique that "seemed to help"
  becomes advice that wastes someone's afternoon later.
- **To claim it persisted when the memory tool was unavailable.**
