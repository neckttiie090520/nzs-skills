---
name: method-fieldwork
description: >-
  Finding out what is true before building — open-ended interview questions each
  carrying a bias check, a synthesis that groups findings into themes with the
  supporting quote and keeps contradictions SEPARATE, a Jobs-To-Be-Done pass that
  refuses to invent a job it lacks evidence for, and a "what's missing" pass naming
  unanswered questions, unsupported assumptions, and overlooked user groups. Use
  before decide/plan when you do not yet know what is real, or when the user asks
  ผู้ใช้ต้องการอะไร / จริงไหม / สัมภาษณ์ / หาข้อมูล / what do users actually want /
  who is this for / is this real / talk to users.
---

# method-fieldwork

You are establishing what is true — about the user, the job, the demand — before
anyone spends effort acting on it. Your output is evidence and named gaps, not a
recommendation; the recommendation is `method-greenlight`'s to make from what you
find.

## The failure this prevents, in this project's own words

An assumption map on this codebase found that the four highest-risk assumptions
had almost no evidence, while the best-evidenced items mattered least — *"the
evidence has been gathered in inverse proportion to the risk."* That inversion is
the normal state, not the exception. Discovery done badly deepens it: it gathers
more of the evidence that was already easy, confirms what was already believed,
and leaves the load-bearing unknowns exactly as unknown — now dressed in the
confidence of "we did research." This skill exists to point the effort at the
risky-and-unevidenced, and to come back with the contradictions intact rather
than smoothed away.

## 1. Interview questions, each with a bias check

Write open-ended questions — ones that cannot be answered yes/no and do not name
the answer inside the question. For each, write the bias it risks and the
neutral form beside it:

| Draft question | The bias it carries | Neutral form |
|---|---|---|
| *"Would a grouping view help you?"* | leading — supplies the answer and the feature | *"Walk me through the last time you triaged failed payments."* |
| *"How much do you hate the current export?"* | loaded — presumes the feeling | *"Tell me about the last time you used the export."* |

- **Ask about the last real instance, not the general case.** "What usually
  happens" invites a tidy story; "what happened the last time" returns behaviour.
- **Never validate your own idea.** A question whose best answer confirms the
  thing you hoped to build is a question you wrote for yourself. The bias-check
  column is where you catch it before the interview, not after.

## 2. Synthesis — themes with quotes, contradictions kept separate

Group findings into themes. Each theme carries the supporting quote verbatim —
*a theme with no quote behind it does not exist yet*, it is a hunch you are
laundering through structure.

- **One quote minimum per theme, in the speaker's words.** If you cannot produce
  the line someone actually said, the theme is your interpretation, not their
  finding. Mark it as interpretation or drop it.
- **Contradictions stay separate — never forced into a theme.** When two people
  want opposite things, that is the finding. Resist the pull to average them into
  a bland "users want flexibility." Record both, named, with both quotes: *"A
  wants fewer clicks even if it hides detail; B wants every field visible even at
  the cost of clicks."* A contradiction is a decision someone will have to make;
  hiding it in a theme makes the decision for them, invisibly and wrong.
- Note how many sources support each theme. One person is an anecdote wearing a
  theme's clothes; say so.

## 3. Jobs-To-Be-Done — only where there is evidence

State the job the user is hiring the product to do: *"When [situation], I want to
[motivation], so I can [outcome]."* Each JTBD names the finding it rests on.

- **Refuse to invent a job to fill a gap.** If the interviews do not support a
  job, you do not have that job — you have an unanswered question (send it to
  §4). A JTBD written from imagination is more dangerous than a missing one: it
  reads as grounded and gets built against. This is the discovery form of the
  register's warning — a plausible-looking artifact tuned against imaginary input
  is harder to detect than an absent one.
- The same restraint applies to personas: describe only user groups the evidence
  actually shows. A persona assembled to round out the set is fiction with a
  stock photo.

## 4. The "what's missing" pass

Discovery's most valuable output is often the honest map of its own holes. Before
you hand off, produce three lists:

- **Unanswered questions** — what you set out to learn and did not, and why (no
  one to ask / ran out of time / needs data not interviews). Each becomes a task
  for `method-scout`.
- **Unsupported assumptions** — beliefs the plan would rest on that no finding
  backs. Cross-reference the highest-risk ones against §1: if the riskiest
  assumption is also the least evidenced, say so plainly — that is the inversion,
  caught. These are the seeds of `method-greenlight`'s assumption map.
- **Overlooked user groups** — who was affected but not talked to. The people who
  churned before you interviewed, the ones who never adopted, the operator on the
  night shift. Absence of complaint is not evidence of satisfaction; it is
  frequently evidence you asked only the survivors.

## Hands off to

- **`method-scout`** — every unanswered question and unsupported assumption in
  §4 leaves as a named thing to go find out, with the cheapest source that would
  settle it where you can name one.
- **`method-greenlight`** — the themes, the JTBDs, and the §4 assumption list feed
  directly into the build/buy/defer/don't gate and its assumption map. Discovery
  finds; decide judges.

## Refuses

- **A theme with no quote behind it.** A grouping asserted without a line someone
  actually said is interpretation dressed as finding; mark it interpretation or
  cut it. This is the discovery form of evidence-before-assertion.
- **A persona or a job invented to fill a gap.** No evidence, no JTBD, no
  persona — the gap goes to §4 as an unanswered question. A fabricated job that
  demos well is the exact failure the method fears most: harder to detect than an
  absent one.
- **A contradiction smoothed into a theme.** Opposing findings are recorded
  separately, both quoted, as the decision they represent — never averaged into a
  false consensus.
- **Confirmation dressed as discovery.** If every question was written so its
  best answer validated an existing plan, you did not run discovery; you ran a
  ceremony. The bias-check column of §1 is what makes that visible before it
  happens.
