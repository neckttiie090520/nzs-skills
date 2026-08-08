---
name: method-blueprint
description: Spec-before-build. Turns a feature request into a numbered spec whose milestones and tasks each name exact files and carry a verifiable success criterion, whose references section records what is borrowed AND what is refused with its price, and whose non-negotiables ban controls the server never reads. Use before writing code for anything spanning more than one file, when the user says plan / spec / design it / write the spec / break this down, or when a request arrives with milestones, phases, or "how should we build X".
---

# method-blueprint

You are turning a request into a spec that somebody else — or you after a
compaction — can execute without asking you a question.

## The failure this prevents

A plan whose tasks say "make the export work" is discovered to be unbuildable at
review time, when the cost of the discovery is highest. Weak success criteria
are rejected at plan time or they are not rejected at all. The second failure is
quieter: a good idea is declined in conversation, the reason evaporates, and
three weeks later somebody proposes it again and it is re-argued from scratch.
This project answers that with an entire commit whose only product is a priced
gap list, written so *"nobody re-proposes them"*.

## Before you write a line of spec

1. **Read `.method/config.yml`.** You need `verify.check` and `verify.guards`
   (the commands your tasks will end in), `references` (what this project takes
   its taste from), `budgets`, and the plan directory convention. No config →
   run `method-groundwork` first. Do not invent a verify command; a spec whose
   tasks end in a command that does not exist is a spec of fiction.
2. **Read the two most recent specs in the plan directory.** You are matching a
   house shape, not inventing one. Copy its numbering, its heading style, its
   "Written &lt;date&gt; against &lt;commit&gt;" line.
3. **Check the extract gate.** If the request carries a reference — a URL, a
   repo, a screenshot folder, "make it like X", "world-class" — you may not
   plan yet. `method-scout` fetches it, `method-distill` turns it into rules.
   **You may cite only extracted rules, never raw references.** An extracted
   rule is *claim + measurement + source + why it applies here*. "Linear does it
   this way" is admiration and has no path into a spec. This is the structural
   anti-cargo-cult gate: spec 22 rejected Google AI Studio's temperature dials
   not because the pattern is bad but because the reason it exists there (a
   general-purpose playground) does not hold here.
4. **Measure the problem before describing it.** §1 of the spec is numbers, not
   adjectives. "The page is wordy" is not a problem statement; "the page renders
   1,167 words before anyone interacts with it" is, and it is also the number
   the eventual guard will police. If you cannot measure it, say what you tried
   and mark it unmeasured — do not upgrade a guess into a fact.

## The spec's shape

Write `docs/plan/NN-<FEATURE>-SPEC.md` (next free NN, matching the house
convention). Sections, in this order:

- **§1 The measured problem.** Numbers with the command or query that produced
  them. Include what is *not* broken, so the scope has an edge.
- **§2 What the research says.** Each claim names its source. A source you did
  not fetch is marked unverified and **may not justify a decision** — the house
  wording: *"Where a source could not be verified it is named as unverified and
  is not used to justify a decision."*
- **§3 References: borrowed and refused.** Two lists. Borrowed: the extracted
  rule, its source, why it applies here. Refused: the pattern, and **the price
  of refusing it** — what the user does not get, and roughly what it would cost
  to change our mind. A refusal with no price is a preference, and preferences
  get re-litigated.
- **§4 The decisions.** One heading per decision, each stating the rule in
  language a guard could later enforce: a threshold, a set, a direction. Write
  *"any other admin page ≤ 150 words"*, not *"keep pages short"*. This is the
  hand-off to `method-tripwire` — a decision phrased as a number is a decision that
  can grow teeth; a decision phrased as a mood cannot.
- **§5 Non-negotiables.** At minimum: no control ships unless the server reads
  it; existing guards stay green; no claim marked done without its medium. Add
  the ones this feature needs.
- **§6 Milestones and tasks.** See below.
- **§7 Declined, with the price.** See below.

## Milestones and tasks

Milestones are numbered `M1`, `M2`; tasks `T1.1`, `T1.2`. A milestone is a unit
that can be reviewed and shipped on its own — if M2 cannot be merged without M3,
they are one milestone.

Every task carries three things and is rejected without them:

1. **The exact files** it touches, by path. Not "the export module" —
   `src/lib/billing/export.ts` and `src/app/admin/billing/page.tsx`. If you do
   not know the path, find it before writing the task; a path you guessed is a
   path the executor will guess differently.
2. **What changes**, in one or two sentences, stating the end state rather than
   the activity.
3. **`→ verify:`** — the command, query, or DOM assertion that settles it, and
   the output that counts as pass. `→ verify: npm run check:prose-budget exits
   0 with /admin/ai at ≤120`. Not `→ verify: it looks right`.

If a task's success cannot be stated as a check, the task is not ready: either
split it until the checkable part is separable, or move it to §7 with its price.
Never ship a task whose criterion is "make it work".

Order tasks so the piece that keeps the others honest lands first — the guard or
the test before the change it polices, where that is possible.

## §7 Declined, with the price

Every idea raised and not taken gets an entry. Three fields, no exceptions:

- **What was proposed** — in the proposer's terms, generously, so a reader does
  not think you misunderstood it.
- **Why not, now** — larger than this task's honest scope / blocked on something
  unavailable / a genuine judgment call the owner should make. Those are the
  only three legitimate reasons. "We did not get to it" is not a reason; it is a
  task you forgot to write.
- **The price** — what the user does not get, and the honest cost to reverse.
  Cost items that share rework are priced *together*, not separately: a Stop
  button was costed with streaming because they share the rework, and pricing
  them apart would have made each look cheap and the pair look free.

A thing considered and rejected leaves as a priced record, never as silence.
Silence is what makes people re-propose dead ideas.

## What you refuse

- **To spec a control the server will not read.** *"No control exists unless the
  server reads it."* A toggle whose value never reaches a handler is a lie on
  screen; refuse it in the spec, where it costs nothing, rather than at review.
- **To cite a source you did not fetch**, or to present a recalled fact as a
  fetched one. Never answer stack or design questions from memory.
- **To cite a raw reference.** Only rules that came through `method-distill`,
  each carrying its measurement and its *why it applies here*.
- **To write a task whose success is not a check.**
- **To raise a budget in a spec.** Budgets ratchet down. A spec that needs a
  budget raised says so in §7 with the measurement that justifies it, and the
  raise happens in the diff where a reviewer can see it.
- **To let a spec assert something is currently true without saying how you know.**
  If §1 claims the current build passes, name the command and its output.

## Done when

The spec exists at its path; every task names files and ends in `→ verify:`;
§3 has at least one refusal with a price if anything was refused; §7 is present
even if it is one line saying nothing was declined. Report the path, the
milestone count, the task count, and the count of priced declines.
