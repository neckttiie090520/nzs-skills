---
name: method-extract
description: >-
  Pulls a REUSABLE RULE out of an external reference — the step that turns copying into taste.
  Its output is never a component; it is a candidate rule for this project's own config: a claim,
  the measurement that makes it checkable, its source, and the reason it applies HERE. "Observed
  elsewhere, not adopted, because X" is a first-class output. The mandatory bridge from
  method-research / method-clone into method-guard and method-plan. Use after studying any
  reference, when the request says "learn from this", or the moment a borrowed pattern is about to
  be adopted into the codebase.
---
**No `.method/config.yml`?** Run `method-onboard` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-extract

## The failure mode this exists to prevent

**Cargo-culting** — copying a pattern whose *reason* does not hold here. It is the most
expensive acquisition failure because it is invisible: the code looks like the world-class thing
it came from, passes review, and quietly imposes a constraint that solved somebody else's
problem.

The counter is structural, not a warning. **`method-plan` may cite extracted rules only, never
raw references.** So an unjustified copy has no path into a spec, and this skill is the gate it
has to pass. Precedent from this project: Google AI Studio's temperature and top-p dials were
studied and **rejected** — the right pattern there (a general-purpose playground where the user
tunes the model) and the wrong reason here (quality comes from a measured house style, so a dial
would be a control offering the user a worse result). Same observation, opposite conclusion,
because the *reason* was tested rather than the *appearance* admired.

## 0. Inputs

Read whichever you have: a findings file from `method-research`, the measurement docs from
`method-clone`, or the reference itself. Also read `.method/config.yml` (`references`, and the
existing parameters) and `.method/budgets.yml`.

If the observation is not written down anywhere yet, stop and run `method-research` first. You
cannot extract a rule from an impression.

## 1. The rule shape — all four fields, or it is not a rule

```markdown
### <Rule, stated as a claim that can be checked>
- **Measurement:** <the number, threshold, ordering, or assertion that makes it testable>
- **Source:** <reference name + URL/path, what was observed, as_of <date>>
- **Why it applies here:** <the mechanism by which the reason that makes it true there is also
  true in this project — named specifically, not "because good design">
- **Verdict:** adopt-as-parameter | adopt-as-guard-candidate | observed-elsewhere-not-adopted
- **Cost:** <what adopting it constrains, or what declining it costs>
```

**The measurement is the load-bearing field.** A rule with no measurement cannot be checked, so
it cannot become a guard, so it will be silently violated within a month. Precedents:

- A design jury's observation against Canva/Gamma/ChatGPT became *"the article becomes the
  biggest thing on the screen"* (676fca5) — not an opinion but a **measured ordering**: draft
  title 22px, page heading below it. Later juries re-verified it by measuring again.
- Sparkle-scarcity research (NN/g n=107, IBM Carbon, AWS Cloudscape) did not stay a reading note.
  It became `check-ai-mark.mjs`, a guard whose header cites the studies that justify it.
- The house voice was extracted this way: study the entire published corpus, reverse-engineer it,
  and the product was **nine measured style rules** in `post-style.ts` — not a vibe.

If you can only state the rule as an adjective, go back to the reference and measure it. If it
genuinely has no measurable form, its verdict is `observed-elsewhere-not-adopted` and its reason
is "no checkable form" — that is an honest output.

## 2. Test the *reason*, not the appearance

For each candidate, run this three-question test and write the answers:

1. **Why is it true there?** Name the mechanism — their scale, their user, their business model,
   their constraint. If you cannot name it, you have not understood the pattern, only seen it.
2. **Does that mechanism exist here?** Same users? Same scale? Same constraint? Be specific and
   be willing to answer no.
3. **What does it cost here?** A rule imposes a constraint on every future change. Price it.

A rule that fails question 2 is **not adopted** — and that verdict is a valuable output, not a
failure of the exercise. `observed-elsewhere, not adopted, because <reason>` is written down
precisely so nobody re-proposes it in three months, and it is far cheaper than a wrong guard.

## 3. Reference drift

Every entry you write cites its source with an `as_of` date. If the reference you are extracting
from is older than the config's staleness window (default 6 months), **re-fetch it before you
extract** — send it back through `method-research`. Taste is allowed to drift, but only on
purpose. A rule justified by a product that changed last quarter is a rule justified by nothing.

## 4. Where each verdict goes

- **adopt-as-parameter** → append to `.method/config.yml` (or `.method/budgets.yml` if it is a
  number). A budget entry carries the reason it is that number, and budgets **ratchet down only**
  — raising one is a deliberate edit somebody has to justify in the diff.
- **adopt-as-guard-candidate** → hand to **`method-guard`**, which will write the script, prove
  it fails on a real mutation and passes when restored, and refuse to ship it if nobody can
  explain why it is a script and not a review note. Do not write the guard yourself here.
- **observed-elsewhere-not-adopted** → record in the findings file and, if it is likely to be
  re-proposed, in the relevant spec's declined section with its price.

Then: **`method-plan`** cites these rules by name. That citation is the only legal route from a
reference into the codebase.

## 5. Refuse

- **To output a component, a snippet, or any code as your product.** Producing the artefact is
  `method-clone`'s job. Your product is a rule. If you find yourself writing JSX, you are in the
  wrong skill.
- **To emit a rule with no measurement attached.** Unmeasurable rule, unenforceable rule.
- **To adopt a rule whose stated reason does not transfer to this project.** Say
  `observed-elsewhere, not adopted, because X` and move on. Admiration is not a justification.
- **To skip the source citation**, or to cite a source you did not open.
- **To let a rule pass with "why here: it's good UX" / "it's the industry standard" / "users
  expect it".** Those are restatements of the observation, not mechanisms. Name the specific
  property of *this* project that makes the rule hold.
- **To adopt more than the evidence supports.** One measured observation licenses one rule, not a
  design philosophy.

## 6. Report

For each candidate: the rule, its verdict, and one line on where it went (config key, guard
candidate handed to `method-guard`, or declined-with-price). Count adopted vs not-adopted
explicitly — a session that adopts everything it looked at did not run the test in §2.
