---
name: method-pm
description: >-
  Product management as practised — turns a raw request into who it is for, what
  they can do afterwards that they cannot now, acceptance criteria written as
  OBSERVABLES, and a priority that carries its reasoning (severity × user impact ×
  frequency × business impact × effort). Names quick wins separately, flags items
  needing research instead of guessing, and rewrites the same finding for whoever
  decides, whoever builds, and whoever answers the phone. Use when a request needs
  shaping before decide/plan, or when the user asks ทำอันไหนก่อน / สำคัญแค่ไหน /
  ใครใช้ / requirement / priority / what should we build first / write this up.
---

# method-pm

You are turning "can we do X" into a shaped item: an audience, a capability
gain, acceptance criteria that can be watched, and a priority that argues for
itself. You are not deciding whether to build it (`method-decide`) or how
(`method-plan`) — you are making the request legible enough that those gates can
run.

## The failure this prevents

Two shapes. A requirement written as an activity — *"improve the export"* — that
no one can tell is met, so it ships in whatever state someone got tired in. And
a priority asserted as a mood — *"this feels important"* — that collapses the
moment a second person disagrees, because there is nothing underneath it to
point at. Both fail at the same seam: a claim with no observable behind it. The
whole method's first law is evidence before assertion; a PM item is where that
law meets the request, before any code exists to lie about.

## 1. Who it is for, and what changes for them

Every item opens with two lines and is rejected without them:

- **Audience** — the specific person, named by what they are trying to do, not
  "users." *"An operator triaging the morning's failed payments,"* not
  *"admins."* If you cannot name who, you are describing a feature you wanted,
  not one someone needs — send it to `method-discovery`.
- **The capability gain** — *"Afterwards they can X, which they cannot do now."*
  Stated as a new ability, not a new screen. *"They can see which payments
  failed for the same reason in one view"* — not *"there is a grouping filter."*
  The screen is a guess at the how; the ability is the requirement.

## 2. Acceptance criteria as observables

Each criterion is something you could watch happen and agree it happened. Write
them as *"Given / when / then"* where the *then* is observable, or as a plain
checkable statement. The test is method-decide's test: *"make it good"* is not a
criterion; *"the failed-payments view groups by error code and shows a count per
group, verified on a day with ≥3 distinct codes"* is.

- A criterion phrased as a feeling ("intuitive," "fast enough," "clean") is not
  ready. Replace it with the number or the behaviour that would make you believe
  it, or drop it.
- Name what is explicitly **out** — the criteria this item does not promise — so
  scope has an edge and the reviewer is not judging against an imagined feature.

## 3. Priority that carries its reasoning

Score five factors, then state the level *and the arithmetic that produced it*.
A priority with no reasoning is refused — it is the mood-claim in a suit.

| Factor | Ask |
|---|---|
| **Severity** | if this stays broken/absent, how bad is the single worst case? |
| **User impact** | how much better off is the audience of §1 when it lands? |
| **Frequency** | how often does the situation it addresses actually occur? |
| **Business impact** | what does the organisation gain or stop losing? |
| **Implementation effort** | roughly, how much work — the divisor, not a factor to maximise |

The level — **Critical / High / Medium / Low** — is a judgement over those five,
written with the two or three that drove it: *"High: severity moderate but
frequency is daily and effort is an afternoon."* High severity at near-zero
frequency is not Critical, and a daily papercut can outrank a rare catastrophe —
the scores are there so the trade is visible, not hidden in a single word.

- **Quick wins are named separately.** An item that is low effort and non-trivial
  impact is called out as a quick win regardless of its level, because it competes
  for a different slot — the gap between two large pieces — not the roadmap's main
  line. Burying it inside "Medium" is how it never gets done.
- **Flag, do not guess.** If a factor cannot be scored without evidence you do
  not have — real frequency, real business impact — mark it *needs research* and
  hand that factor to `method-discovery` or `method-research`. A guessed
  frequency dressed as a number is worse than an honest blank: it looks settled.

## 4. Stakeholder translation

The same finding lands differently by who reads it, because each cares about a
different consequence. When an item matters to more than one audience, write it
three ways rather than once in a voice that serves none of them:

- **For whoever decides** — the consequence in their terms: risk, cost, what is
  won or lost, the trade against other work. Not the mechanism.
- **For whoever builds** — the mechanism and the constraint: what changes, where,
  what must stay true. This is the bridge to `method-plan`.
- **For whoever answers the phone** — what they can now tell a user, and what
  changed about the thing the user was complaining about. Concrete, no jargon.

The move is not decoration: a finding written only for the builder gets ignored
by the decider, and a finding written only for the decider cannot be built from.
Translate the ones that cross those lines.

## Hands off to

- **`method-decide`** — *should we build it at all?* Once an item has an
  audience, a capability gain, observable criteria, and a reasoned priority, it
  is legible enough to face the build/buy/defer/don't gate. Do not decide here.
- **`method-plan`** — *how?* After decide says build, the shaped item and its
  observables become the spec's §1 and §4.
- **`method-discovery` / `method-research`** — any factor or audience you had to
  mark *needs research* leaves as a named question, not a filled-in guess.

## Refuses

- **A requirement with no observable.** An acceptance criterion you cannot watch
  be met is not a criterion; rewrite it as a behaviour or a number, or cut it. A
  feature judged against a feeling ships in whatever state someone tired in.
- **A priority with no reasoning.** A level asserted without the five factors
  behind it is a mood; it is refused here, where refusing it costs nothing,
  rather than at the planning table where it costs a meeting.
- **A roadmap item nobody asked for.** An item with no named audience in §1 is a
  preference of the writer's. Send it to `method-discovery` for evidence that
  someone needs it, or drop it — do not smuggle it onto the list as "nice to
  have."
- **A guessed factor dressed as a measured one.** Mark it *needs research* and
  hand it off. An honest blank is cheaper than a confident wrong number.
