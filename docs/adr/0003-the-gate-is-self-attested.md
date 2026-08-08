# ADR 0003 — The anti-theatre gate is self-attested, and that is unresolved

**Status:** accepted, with a known hole

## Context

The set's foundation is `method-rulebook`'s gate: before any claim of done, name
the medium and the artifact that settled it. It exists because three edits in
one session silently matched nothing and were reported as complete, and because
a probe that matched *too much* threw an error that was read as "feature
absent".

## The hole

An adversarial review attacked the gate directly and defeated it. Every item is
graded by the same model that produced the work. A model can write *"☑ ruled it
out: I read the artifact back"* without reading anything, and paste plausible
command output under "name the command and its actual output".

The gate raises the **cost** of faking. It provides **no detection**.

## Decision

Ship it, and say so — here, and in the README.

The alternative was to describe the gate as stronger than it is, which would
have been the exact failure it exists to prevent, committed by the document that
defines it.

## The fix, when someone takes it

Promote the independent reviewer's re-run from a rhetorical question to a
mandatory step for any load-bearing claim, with the verbatim output written to
an artifact the reviewer re-runs. That moves the witness outside the producing
model. It is a design change, not an edit, which is why it is recorded rather
than done.
