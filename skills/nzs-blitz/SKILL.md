---
name: nzs-blitz
description: >-
  The whole adversarial sweep, one command. Runs scrutinize (outsider, trace,
  is-this-necessary), bug-hunter (Recon → Hunter → Skeptic → Referee, with
  fixes), and codex as a genuinely independent reviewer against the SAME
  diff, merges the findings, and routes anything nobody can explain through
  debug-mantra BEFORE any fix is claimed. Ends in one report, not three. Use
  when the user wants everything thrown at a change at once, or says sweep
  this / ลุยเลย / hit it with everything / full pass / everything you've got.
---

# nzs-blitz

Four tools, one target, one report. Each one structurally cannot see what the
others catch — that is the whole reason to run all four rather than picking
one. Run them in this order; each stage's findings feed the next rather than
four disconnected reports stapled together.

## Scope, resolved once

Resolve the target the same way `bug-hunter` does — a branch diff, a PR, staged
files, or a path — and resolve it **once**, at the start. Every stage below
runs against that same resolved scope, never a scope it re-derives itself.
Report the scope and file count before starting.

## The order, and why it is this order

### 1. `/scrutinize` — is this even the right shape?

Runs first because it is the cheapest question and the one that makes the
other three pointless if the answer is no: does this change need to exist,
is there a simpler version, does the diff actually do what it claims end to
end. Its output is a verdict (ship / fix-then-ship / rework / reject) plus a
findings list.

**If the verdict is reject or rework at the architecture level**, stop here
and report that — running bug-hunter and codex against a diff whose shape is
wrong is polishing the wrong thing. Otherwise continue with scrutinize's
findings carried forward.

### 2. `bug-hunter` — the adversarial pipeline, full loop

Run it against the same resolved scope, in its default mode (loop on, fix on).
Let bug-hunter run its own Recon → Hunter → Skeptic → Referee pipeline —
do not reimplement any part of it here; this skill orchestrates, it does not
duplicate. Carry scrutinize's findings into bug-hunter's context as
`--threat-model`-style priors where they name a security-relevant shape
concern, so the Hunter is not starting cold on something already found.

### 3. Codex — the genuinely independent pass

Run codex (via whatever the environment exposes — `codex:codex-rescue`,
`/codex:review`, or the companion script directly) against the **same**
resolved scope. This is not decoration: it is a different model, trained
differently, and it is this method's own documented weak point that the
anti-theatre gate is otherwise self-attested (`method-rulebook`). A finding
codex surfaces that neither scrutinize nor bug-hunter did is the whole reason
this stage exists — do not skip it because the first two passes came back
clean.

**If codex is not reachable in this environment**, say so plainly in the
report rather than silently proceeding as three tools. A report that reads
like four passes ran when three did is exactly the false-completeness this
method refuses everywhere else.

### 4. `/debug-mantra` — before any fix is claimed, not after

For every finding across all three passes above that involves a fix already
applied, or a bug nobody can yet explain the root cause of: run the
four-step discipline (reproduce → know the fail path → falsify the
hypothesis → cross-reference every run) **before** the finding is marked
fixed in the final report. A fix applied without a reliable repro first is
exactly the failure this method's own history is full of — the focus-ring
fix that changed the wrong token, the fix reported done that was never
re-read from the file.

This is not a fifth independent tool run blind; it is the standing
discipline applied to whatever the first three stages could not already
settle in the medium (`method-witness`'s job) without more digging.

## What this does NOT include, and why

**`/code-review` (the multi-agent cloud review) is never auto-triggered.**
It is user-invoked and billed, and this skill does not spend the user's
money without them typing the command themselves. Name it in the final
report as the available heavier escalation — *"for a second opinion beyond
this sweep, run `/code-review ultra` yourself"* — never run it.

## The merged report

One report, not four stapled together:

- **Scope.** What was resolved, how many files, which stage(s) actually ran.
- **Confirmed findings**, deduplicated across stages and ranked by severity —
  a finding scrutinize and bug-hunter both surfaced is one line, not two.
  Each finding names which stage(s) caught it; a finding **only** codex
  caught is the signal worth reading closest, since that is the one an
  agentic pass alone would have missed entirely.
- **Fixes applied**, each carrying its debug-mantra transcript — repro,
  fail path, the hypothesis that was disproved before the one that held,
  and the verification medium and command that settled it.
- **What did not run**, plainly, if codex was unreachable or scrutinize
  stopped the sweep early at stage 1 — never silently reported as if all
  four ran clean.
- **The one line about `/code-review`**, naming it as available, not run.

## What you refuse

- **To reimplement bug-hunter's pipeline instead of calling it.** This skill
  orchestrates four existing disciplines; it is not a fifth bug-hunting
  engine wearing this skill's name.
- **To skip codex because the first two passes found nothing.** A clean
  scrutinize and a clean bug-hunter pass is not evidence codex would agree —
  it is the exact self-attested gate this method's own known weakness names.
- **To claim a fix without its debug-mantra transcript**, when the finding
  needed one. A fix with no repro behind it is a guess wearing a checkmark.
- **To auto-run `/code-review`.** It is billed and user-invoked. Name it,
  never trigger it.
- **To report four passes ran when fewer did.** Say exactly what ran, and
  why anything skipped was skipped.
- **To merge findings by concatenation.** Deduplicate; a finding two tools
  both caught is one line naming both, not two lines.
