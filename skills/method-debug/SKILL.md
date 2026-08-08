---
name: method-debug
description: One broken thing, diagnosed properly — reproduce it reliably, find the fail path, try to DISPROVE your hypothesis before testing it, and cross-reference every run against every earlier one. Use for a single reported defect, a regression, or anything intermittent; when the user says พัง / ทำไม / why is X doing Y / this is broken / it works locally but not in production.
---

# method-debug

The failure this prevents: fixing the first plausible cause, shipping it, and
finding the bug again next week because the cause was a coincidence.

`method-guard` fires when a bug has recurred TWICE. `method-review` needs a
change to review. This is for one bug, now, whose cause nobody knows.

## 1. Reproduce before anything else

No fix is proposed before the bug can be reproduced on demand.

- **Reliable** — capture it as a runnable artifact: a failing test, a curl, a
  script, a browser trace. Not a description.
- **Intermittent** — raise the rate before diagnosing. Loop it, add load,
  narrow the timing window. 50% is debuggable; 1% is not.
- **Cannot reproduce at all** — stop and say so. Ask for the environment, a
  capture, or permission to instrument. Do NOT proceed to hypotheses; a
  hypothesis with no repro is a guess with a paragraph attached.

## 2. Find the fail path

In this order, escalating only when the previous one fails:

1. **Read the state at the failure.** A debugger, a breakpoint, a dump. One
   observation beats ten guesses.
2. **Trace the path and enumerate the knobs.** Every branch, flag, config
   value, timing and input shape that could change the outcome. Each knob is an
   axis to flip — flip ONE at a time.
3. **Instrument.** Tag every probe with one unique prefix so cleanup is a single
   search. Let the trace show where reality departs from your model.

## 3. Try to disprove it

You will have a favourite hypothesis early. It is the most dangerous object in
the session.

- Generate **three to five** ranked hypotheses, not one. A single hypothesis
  anchors everything that follows.
- For the leading one, ask: what would I see if this were FALSE?
- **Run that disproof first.** If the hypothesis survives an honest attempt to
  kill it, it is probably real. If it dies, you were saved a day.

## 4. Every run is a breadcrumb

Keep a ledger: what changed, what happened, what it ruled in or out.

When a new hypothesis appears, walk the whole ledger. It must explain **every**
prior observation, not just the most recent. One contradicting run means the
hypothesis is wrong or incomplete — refine it or drop it.

When stuck, do not churn on adjacent runs. Design the ONE experiment whose
outcome makes the answer certain, and run that.

## 5. Then, and only then

Hand the confirmed cause to the fix. If this class of bug has now been fixed
twice, hand to `method-guard` — the second occurrence is when a rule is born.
Settle the fix in its medium with `method-verify`; a bug is not fixed because
the code changed.

## What you refuse

- **To propose a fix without a reliable repro.**
- **To test the hypothesis before trying to disprove it.**
- **To accept a cause that does not explain an earlier observation.**
- **To call it fixed because the symptom stopped once.** Intermittent bugs stop
  by themselves; that is what makes them intermittent.
