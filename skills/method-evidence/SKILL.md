---
name: method-evidence
description: >-
  The invariant laws behind the whole method — evidence before assertion, guards
  seen failing before trusted, bounds that never flatter, declined work recorded
  with its price, budgets that only ratchet down. Loaded and cited by every other
  method-* skill. Invoke directly when you need the reasoning behind a rule, or
  the moment before you claim something is done, fixed, working, or passing.
---

# Method Doctrine

These are the laws the rest of the method obeys. They are stack-independent: read
`.method/config.yml` for this project's commands and mediums, nothing else here.
Do not paraphrase these laws into slogans — each one names an artifact you must
produce. A law you cannot point at an artifact for, you have not obeyed.

## The five laws

1. **Evidence before assertion.** Say only what you have watched be true, in the
   medium where it is true. "Done / fixed / works / passing" is not a claim you
   are allowed to narrate — it is a claim you must show. No command output, no
   query result, no DOM assertion → the claim downgrades to **"attempted,
   unverified"**. There is no third state.

2. **A guard is seen failing before it is trusted.** A rule worth keeping becomes
   an executable guard, and the guard is proven by making it go RED on a real
   mutation and GREEN when restored — *"All five were seen failing on a real
   mutation and passing when restored"* (ff0763d). An untested guard is
   decoration that will pass forever without checking anything.

3. **Bounds are honest — they only ever err toward discomfort.** A ceiling may be
   beaten by nothing: `toFixed(2)` once rounded ฿0.1234 down to ฿0.12, *"a bound
   the real spend can beat, which is the one thing a bound may not be"* (f451e4c).
   Round bounds UP. And null is never zero: *"Null, not zero, when the ledger will
   not answer"* (51ecd82). Unknown shown as a comfortable number is a lie in the
   cheap direction, and cheap-direction lies are never deferrable.

4. **Not-fixed is recorded with its price.** A defect you decline to fix leaves as
   a priced record — worded so nobody re-proposes it — never as silence. 571accd
   is an entire commit whose only product is a priced gap list. A silent drop is
   forbidden.

5. **Budgets ratchet down only.** Every budget number *"carries the reason it is
   that number"* and can only go down; raising one is a deliberate edit somebody
   has to justify in the diff. The number is a measurement, not a target — so a
   raise is visibly a new measurement, not a convenience.

The one-line compression: *say only what you have watched be true, in the medium
where it is true; when a truth is worth keeping, give it teeth; when you decline,
record the price.*

## The anti-theatre gate

This is the most important thing in the method. A skill set *about* rigour is the
perfect disguise for its absence — you can learn the vocabulary of measurement and
produce a report that *sounds* like a real commit body without having run
anything. Before you report ANY completion, run this gate against your own output.
You may not pass it by asserting; each line demands a named artifact.

**The four shapes of self-deception — name each one and rule it out.** These are
the exact ways this model has fooled itself before. Recognise the shape of your
own bluff:

- [ ] **The edit that silently matched nothing.** Did an edit target a string that
  had already changed, match nothing, and get reported as done? — *"the edit
  targeted a string that had already changed, silently matched nothing, and I
  reported the change as done without reading the file back"* (772dc4b); *"the
  third silent no-match this session"* (d4b4ccf). **Rule it out:** read the
  artifact back and confirm the new text is present. The edit tool reporting
  success is not the artifact showing the change.

- [ ] **The probe that matched too much and was read as absence.** Did a check
  throw or return many hits, and did you read that noise as "not there"? — *"a
  strict-mode locator resolving to three elements throws, and I read the throw as
  'not rendered'"* (a34fafc). **Rule it out:** a throw, an error, or a
  multi-match is an *inconclusive* result, never a negative one. Narrow the probe
  until it resolves to exactly the thing, then read its state.

- [ ] **The claim verified in the wrong medium.** Did you confirm a rendered fact
  from source, a cost from code, a persistence claim from the write call? — a
  token proven in source was *"flagged NOT observed in browser"* because the
  running server served a stale chunk (8d6a4d8). **Rule it out:** settle the
  claim where it is true (§ delegate to `method-verify` for the medium map).
  Source is not the DOM; the write call is not the row.

- [ ] **The fix reported from the diff rather than from the artifact.** Did you
  report success by looking at what you changed instead of what the running
  system now does? **Rule it out:** run the verify command, hit the endpoint,
  read the row, load the page. The diff is your intention; the artifact is the
  fact.

**Then the final instruction, non-negotiable:** a report is not evidence. For the
claim you are about to make, name the command, the query, or the DOM assertion —
*and its actual output* — or downgrade the claim to "attempted, unverified" and
say why it could not be settled. If a second engine (the config's independent
reviewer) re-ran your load-bearing check, would it get your result? If you cannot
answer yes with the command in hand, you have not verified — you have narrated.

## How the other skills apply this

- `method-verify` is this gate made medium-specific: it owns HOW to settle each
  kind of claim. Call it before any "done."
- `method-guard` enforces law 2: it will not wire in a guard not seen failing.
- `method-ship` enforces laws 3 and 5: honest bounds, ratchet-only budgets, and a
  commit body that may not assert a fix `method-verify` has not settled.
- `method-review` enforces law 4: every finding is fix-now, record-with-price, or
  withdrawn — never silently dropped.

## Refuses

- **To let a claim through without its medium.** "Done", "fixed" or "passing"
  with no command, query or measurement behind it is narration, and this gate
  exists to catch it before anyone else has to.
- **To count a check that did not run as a pass.** A skip is reported loudly,
  with its reason.
- **To raise a ratchet without a written reason in the diff**, or to state a
  bound that rounds down. A flattering bound is worse than none, because it
  will be trusted.
- **To drop a review finding silently.** Fix it, price it, or withdraw it with
  the reason — those are the only three exits.
