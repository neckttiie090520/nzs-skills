---
name: method-research
description: >-
  Turns a question into citation-carrying evidence. Sources it accepts: web search, a named
  reference product, a GitHub repo, a pasted article, a local folder of screenshots, a PDF, a
  domain knowledge base, the live production site. Every claim in its output names its source;
  "best practice" with no link does not survive it. Can also EXTRACT EXECUTABLE PROMPTS from an
  article and run them as adversarial audit roles against your own product. Use when the request
  says research / ศึกษา / study X / "how do world-class products do Y", or carries a URL, a repo,
  an article, or a folder to learn from — and before any plan that would otherwise cite memory.
---

# method-research

## The failure mode this exists to prevent

Answering a stack, design, or market question **from memory** and presenting the recollection as
a finding. The standing rule in this project: *never answer stack questions from memory*. A
recalled fact dressed as a fetched one is the research-shaped form of rigour theatre — a long
confident document with nothing behind it. Every sentence you write here must be traceable to
something you actually opened.

## 0. Read the config first

Read `.method/config.yml`. You need `references:` (this project's standing sources, each with its
`for:` and `as_of:`) and `handoff`. If `.method/config.yml` does not exist, run `method-onboard`
before continuing — research with no recorded references produces findings nobody can re-judge.

A reference already in `config.references` whose `as_of` is older than 6 months is **stale**:
re-fetch it before you cite it. Reference drift — the copied thing changed and nobody re-checked
— is a real defect, not a formality.

## 1. Classify each source before you touch it

| The user sent | Do this |
|---|---|
| A URL or live site | Fetch it. Browser automation if the claim is about rendered behaviour. |
| A GitHub repo | Read the actual files that carry the pattern. Name paths and line ranges. |
| A pasted article | Read it whole. Then ask: is it **factual** or **procedural**? (see §4) |
| A folder of screenshots / a PDF | Open every file. These are primary sources; describe what is in them, not what you expect. |
| A domain KB directory | Content from here is **copied verbatim, never invented**. |
| A product name with no link ("like Canva") | You do not have the reference. Go find it. Reasoning about a memory of Canva is reasoning about a hallucination. |

If a source cannot be reached — paywalled, offline, quota exhausted — say so by name and mark it
**unverified**. An unverified source may appear in the findings; it may **not** justify a decision.

## 2. The output: one findings file, every claim sourced

Write `docs/research/<topic>.md`. Open it with the honesty line this project already uses:

> Everything below was fetched. Where a source could not be verified it is named as unverified
> and is not used to justify a decision.

Then, per finding:

```markdown
### <The claim, stated as something checkable>
- **Source:** <URL / repo path:lines / screenshot filename / KB file> — fetched <date>
- **What it actually says:** <the specific observation, with the number or quote>
- **Borrow / Reject:** <which>
- **Cost of borrowing:** <what adopting it costs — build time, a new dependency, a constraint it
  imposes> — or, for a Reject, the reason and the price of the road not taken.
```

Every Reject carries a reason and, where known, a price. A rejected idea with no recorded price
gets re-proposed by the next person; that is the whole reason this format exists.

Do **not** decide here whether a borrow applies to this project. That judgement belongs to
`method-extract` and is the gate that stops cargo-culting. Your job ends at sourced evidence.

## 3. Numbers are evidence; adjectives are not

If the finding is about size, spacing, colour, latency, price, or ratio, get the **number** from
the source. A precedent from this corpus: a comment claimed a column was "~510px"; measured, it
was **583px and 76 characters, because `ch` is the width of a ZERO**. The adjective was wrong
and had survived review for weeks. If you write "generously spaced" where a measurement was
available, you have failed.

## 4. The named move: article → executable audit roles

When a source is **procedural** — a methodology, a heuristic set, a research protocol — the
highest-value extraction is not a summary. It is **a set of prompts you run against your own
product.**

Real precedent in this repo: two UX-research articles the owner sent became five executable
audit agents run against the live product — *accessibility reviewer, edge-case finder,
error-state generator, devil's advocate, assumption mapper* (3ad4644). The articles produced
defects, not a reading note.

Do it like this:

1. Read the article for its *questions*, not its conclusions. A methodology article is a list of
   questions somebody found productive.
2. Write each as a standing role prompt: who the auditor is, what they are looking for, what
   evidence they must produce for a finding to count.
3. Run each role against the real artefact — the running product, the real screen, the real data
   — not against your description of it.
4. Record the source article beside each role in the findings file, so a later reviewer can see
   which discipline the role came from.
5. Hand the findings into `method-review`'s triage like any other round: fix-now /
   record-with-price / withdrawn.

A procedural source that produces zero findings is itself a finding: record that the audit ran
and came back clean, with the roles listed. Silence is not the same as a pass.

## 5. Refuse

- **An unsourced assertion.** If you cannot name where it came from, delete it.
- **The phrase "best practice" with no link behind it.** Also: "industry standard", "commonly
  accepted", "most modern apps". These are memory wearing a lab coat.
- **Presenting a recalled fact as a fetched one.** If you did not open it this session, it is not
  fetched. Mark it recalled, or go open it.
- **Adopting a pattern without recording what it costs.** A Borrow with no cost line is not a
  finding, it is enthusiasm.
- **Answering a stack or API question from memory.** Fetch the docs. Your training data is older
  than the library.
- **Letting an unverified source carry a decision.** It can inform; it cannot justify.

## 6. Hand off

- Findings that might become project rules → **`method-extract`**. It is the only path from a
  reference into a spec: `method-plan` may cite extracted rules, never raw admiration.
- A visual or interaction reference the project intends to reproduce → **`method-clone`**.
- New standing sources you fetched → add to `config.references` with `for:` and `as_of:`, so
  every later reviewer judges against the same standard instead of one they invent.
- Update `handoff.md` with what was researched, what was rejected, and what remains unverified.
