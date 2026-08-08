# The ecosystem

**English** · [ภาษาไทย](ECOSYSTEM.th.md)

![the tools](assets/ecosystem.png)

The skills in this repository are a **method**. A method needs **capability** —
something that can actually read a database, drive a browser, index a codebase,
or remember last week. This page is the other half: every tool this method
composes with, what it is, what it buys, how to use it, and where it fails.

Read it once. After that, `nzs-start` will name the stack for you.

**Never used this set before?** Read [Start here](START-HERE.md) first — this
page assumes you have.

---

## The shape of the whole thing

One sentence explains every pairing below:

> **A skill decides what counts as evidence. A tool is how you go and get it.**

`method-verify` says a rendered claim is settled in the DOM. It does not know
how to open a browser — Playwright does. `method-security` says a scoping claim
is settled by reading real rows. It does not know your database — your client
does. `nzs-learn` says a lesson must survive the session. It cannot persist
anything — engram can.

That separation is deliberate. A skill that named a specific browser driver
would be worthless the day you changed drivers. Instead, every project writes
`.method/config.yml` once (via `method-onboard`) and every skill reads *that*.

```
        you ── /nzs-start ──▶ a stack of skills          ← the method (this repo)
                              │
                              ▼
                    .method/config.yml                  ← what THIS project uses
                              │
        ┌─────────────────────┼──────────────────────┐
        ▼                     ▼                      ▼
   capability            memory + context        review engines
   playwright            engram, headroom        codex, bug-hunter,
   codegraph             CLAUDE.md               scrutinize, impeccable
   your db client        handoff.md              debug-mantra, fablize
```

---

## What is on this page, and what is deliberately not

Every tool below can be **installed and then proven working by a command**, which
is what `nzs-setup` does. That is the entry requirement.

Anything that needs a human to open a browser, create an account and paste a key
back is excluded — not because it is bad, but because a setup step cannot verify
it, and this method does not list what it cannot check. If you already run such a
service, use it; it just is not part of the automated path.

---

## Layer 1 — capability: how a claim gets settled

These are the reason `method-verify` can refuse a report and demand evidence.

### Playwright MCP — the medium for anything rendered

**What it is.** A browser Claude can drive: navigate, click, type, screenshot,
read the live DOM, run JavaScript in the page, watch network requests.

**What it buys.** It is the *only* honest answer to "does it actually render?"
Reading JSX proves your intention. Reading the DOM proves the fact. This is the
single most-used tool in the method, because most claims about a UI are lies
until measured.

**How it is used here.** `config.mediums.rendered` names it. Then:

```js
// a style claim — settled in the computed value, never in the source
getComputedStyle(el).outlineColor      // → "lab(45.13 18.36 -71.70)"
// a structural claim — the probe IS the evidence
document.querySelectorAll("form form").length   // → 1 proves invalid nesting
```

**The trap that has actually bitten.** A dev server can serve a **stale CSS
chunk**. A token proven correct in source read as *not applied* in the browser,
and the browser was right about the running code — it was serving older code.
Force a rebuild before you trust a negative. Also: a strict-mode locator that
matches many elements **throws**, and a throw is *inconclusive*, never "not
found". Narrow the selector and re-read.

### CodeGraph — a symbol graph instead of grep

**What it is.** A local SQLite graph of your codebase: symbols, call edges,
files. `codegraph explore "<question or symbol>"` returns the verbatim
line-numbered source of the relevant symbols **plus the call paths between
them**, in one round trip.

**What it buys.** It follows dynamic dispatch, which grep structurally cannot.
When `method-security` asks *"can a public request path reach this
service-role client?"*, that is a call-path question — exactly what a graph
answers and a text search only guesses at.

**How to use it.**

```bash
codegraph init                       # indexes the repo — ASK FIRST, it is not free
codegraph explore "AiDraftForm"      # source + callers + blast radius
```

Or the `codegraph_explore` MCP tool, which takes `projectPath` so one server can
answer for many repos.

**The rule.** Never run `codegraph init` without asking — it indexes everything.
If there is no `.codegraph/` directory, the project has not opted in; use Read
and Grep and do not create one silently.

## Layer 2 — memory and context: how work survives

### engram MCP — memory across sessions

**What it is.** Persistent, searchable memory. `mem_save` writes an observation;
`mem_search` finds it next week; `mem_context` restores recent history after a
compaction.

**What it buys.** It is the difference between a method that improves and one
that repeats itself. `nzs-learn` writes four kinds into it: a win with the
technique that beat the obvious alternative; a mistake recorded **by its shape**
with a countermeasure; your taste in your own words; and workflow facts that save
real time.

**Why "by its shape" is the load-bearing part.** *"An edit matched nothing"* is
an instance and teaches nothing. *"A find-and-replace whose target string had
already changed"* is a shape, and a shape is recognisable in a different file
next month. This project produced that mistake three times before anyone named
it; naming it ended it.

**The honesty rule.** If engram is not connected, `nzs-learn` says so and writes
a local file instead — **loudly**. A memory the user believes is durable and is
not is worse than no memory at all.

### headroom MCP — context compression

**What it is.** `headroom_compress` and `headroom_retrieve` move bulk out of the
working window and bring it back on demand; `headroom_stats` reports the state.

**What it buys.** Long runs. `nzs-goal`'s token economy rule — *"if a step would
put more than a screenful into the main window, it is a subagent"* — is the
policy; headroom is one of the mechanisms that makes it affordable.

### `handoff.md` + `nzs-handoff` — continuity between sessions

**What it is.** A plain file at the repo root, named by `config.handoff`.

**What it buys.** The next session starts where this one ended instead of
re-deriving it. The rules that make it work are unusual and deliberate: every
"done" carries its evidence or it moves to "in flight"; there is **exactly one**
next action, because a list of five gets re-prioritised from scratch and that
was the work it was meant to save; and refuted approaches are **mandatory**,
because without them the next session pays again for the dead end this one
already found.

---

## Layer 3 — the review engines

![verified and refuted](assets/verified-refuted.png)

`method-review` rotates roles, and these are the engines that wear them. The
rule that makes rotation work: **no role repeats until the roster is exhausted**,
because a repeated role finds the same class again and calls it progress.

| engine | the posture it wears | what it structurally cannot miss |
|---|---|---|
| **bug-hunter** | Recon → Hunter → Skeptic → Referee, with a fix pipeline | behavioural bugs, and false positives — the Skeptic stage exists to kill them |
| **scrutinize** | outsider, end-to-end, "should this exist at all?" | scope that was never justified; a simpler alternative nobody costed |
| **debug-mantra** | reproduce → fail path → falsify → cross-reference | a fix proposed before the bug was reproduced |
| **impeccable** | award-level design director | craft: hierarchy, rhythm, restraint, the quality floor |
| **codex** (OpenAI) | a genuinely different model | whatever a single model's blind spot is — this is the closest thing to an external witness |

**Where they meet this repo.** `method-review` selects the roster and re-verifies
the *previous* round's fixes before hunting new defects — because this project
recorded three separate rounds catching a fix that had been reported as done and
never landed. `method-security`, `method-web-security` and `method-ai-security` are the
disciplines the `security` role reads.

**debug-mantra deserves its own note**, because it is the discipline
`method-debug` encodes: *do not propose a fix before a reliable repro exists;
run the disproof before the proof.* This project once "fixed" a focus ring by
changing a token, measured 1.97:1 against a 3:1 requirement, and only found the
real cause — an opacity modifier — by following that order.

---

## Layer 4 — output and workflow

### caveman — output compression

Drops articles, filler and hedging; keeps every technical fact. `/caveman
lite|full|ultra`. **Code, commits and security text are written normally** — the
compression is for prose, and ambiguity is never an acceptable saving.

### rtk — token-killing CLI proxy

Rewrites common CLI calls into filtered equivalents, cutting 60–90% of the
tokens a raw `git status` or build log would cost. `rtk gain` shows the savings.

**The trap `nzs-setup` checks for.** There is a *different* package called `rtk`
(a Rust type kit) that answers `--version` perfectly and fails `gain`. Verifying
with `--version` alone reports a successful install of the wrong software. Both
commands must answer.

### superpowers — process-first skill discipline

Establishes that process skills run *before* implementation skills: brainstorm
before planning, systematic debugging before domain fixes. Compatible with this
set by design — `nzs-start` occupies the same slot for this method's own skills.

### fablize — the same rule, enforced mechanically

**What it is.** A Claude Code plugin
([fivetaku/fablize](https://github.com/fivetaku/fablize)) shipping the
procedural differences its author measured between Fable 5 and Opus across
roughly 1,500 tool calls — and **only** the ones the comparison proved
transferable. Its README states the ceiling plainly: *"It cannot raise model
capability."* That refusal to overclaim is a large part of why it is here.

```
/plugin marketplace add fivetaku/fablize
/plugin install fablize
bash ${CLAUDE_PLUGIN_ROOT}/setup/setup.sh    # always-on mode
```

**Check:** `/fablize` answers and the plugin appears in `/plugin`. Like
everything else in this guide, it installs and proves itself with no account to
create.

**What it buys — and why it is the closest thing here to a fix for our stated
weakness.** It enforces what this method merely *instructs*: run and observe the
rendered artifact before claiming done, decompose the work and refuse completion
without evidence, reproduce before hypothesising, and an **early-stop hook** that
blocks an incomplete claim of completion.

Read that against [the known weakness](../README.md#the-known-weakness). Our
anti-theatre gate is **self-attested** — a model can tick its own boxes and
paste invented output. A hook cannot be talked around by the model it
constrains. The overlap is not duplication; it is the same rule at a different
level of the stack, and the mechanical level is the one we do not have.

**The honest caveat.** Two systems enforcing one rule can double-report a
finding, and a stop that fires for a reason you did not write is harder to debug
than one you did. Running both, treat fablize as the floor and `method-verify`
as the discipline above it — not as two opinions to reconcile.

### fable modes — model tiering when spawning

`fable-opus` / `fable-sonnet` / `fable-haiku` map work to model capability.
`config.models` records the same idea by **capability, not brand** — architect,
builder, mechanical, reviewer — so the config survives a model rename.

**A real trap.** Codex agents in this environment **background themselves and do
not return inline**. Waiting on them blocks forever. Worse: three planning agents
once returned confident summaries having called **zero tools** and written no
file — caught only by listing the path, not by reading the report. This is why
`nzs-goal`'s Ledger is written by the loop from evidence it can see, never by
the agent that claims the work.

---

## The stances — combinations worth memorising

Named so you can ask for them by name.

**1. The cold read** — `scrutinize` → `method-decide`
Before building anything sizeable. One outsider pass asking whether it should
exist, then the decision recorded with its assumptions. Cheapest possible way to
avoid building the wrong thing.

**2. Reference-first build** — `method-research` → `method-extract` → `method-plan` → `method-code`
Acquisition **always** runs before planning. Never plan from a raw reference:
extract the rules first, then plan against the rules. `method-clone` replaces the
first two when the reference is a live site.

**3. The rotation** — `method-review` × 3, roles rotated, then `method-verify`
Round 1 re-verifies nothing (there is nothing yet), rounds 2 and 3 open by
re-checking the previous round's fixes. Exit when the roster is exhausted, not
when you feel finished.

**4. The hunt** — `bug-hunter --fix` → `debug-mantra` on anything it cannot explain → `method-guard` on anything that recurs
The third step is the one people skip and the one that compounds: a bug class
that appeared twice earns a guard, permanently.

**5. The long run** — `nzs-goal` → `/goal` + `/loop`, with headroom and subagents
For work too big for one window. The prompt stays constant; the plan file
changes. It stops when `## Open` is empty **or** two consecutive iterations
change no Ledger row — a loop that cannot show progress is not making any.

**6. Shipping** — `method-verify` → `method-ship`
Production schema is verified **before** the push that needs it, not after.

**7. Closing a session** — `nzs-learn` then `nzs-handoff`
Learn first, while the insight is sharp; hand off second, once there is nothing
left to record.

---

## Use cases, end to end

**"Make our page look like theirs."**
`method-clone` (capture the reference, with Playwright measuring real computed
values) → `method-extract` (rules with reasons, not screenshots) → `method-plan`
→ build → `method-design` + `impeccable` → `method-review` with `design-jury`.
The measurement step is non-negotiable: an eyeballed "about 510px" was wrong by
73px, and only a measurement said so.

**"Is this feature worth building?"**
`nzs-grill` if the want is vague → `method-discovery` (is the assumption true?)
→ `method-decide` → `method-cost` if it costs money per use. A `decide`
that says *don't build* is a success, and is recorded with its price so nobody
re-derives it.

**"Review this PR properly."**
`method-review` with a roster picked from the change type. An endpoint gets
`security` (reading `method-security` + `method-web-security`), `edge-case`, then
`bug-hunter`. Findings triage into fix-now / record-with-price / withdrawn —
never silently dropped.

**"Something is broken and nobody knows why."**
`method-debug` / `debug-mantra`. Reproduce first — no repro, no hypothesis.
Then knobs, then instrumentation. Keep the ledger; a new hypothesis must hold
for **every** prior observation, not just the latest.

**"We're adding AI to this product."**
`method-threat` first → `method-ai-security` for the injection and output-sink
questions → `method-cost` for the ceiling → `method-guard` for the spend
bound. Model output is untrusted input, and the sink decides what it can do.

**"Set up a new machine / workspace."**
`nzs-setup`. It installs and then *proves* each piece, and reports anything it
could not verify as **unverified** rather than done.

**"I'm out of context."**
`nzs-learn` → `nzs-handoff`.

---

## Case studies — what actually happened

These are why the rules exist. Each cost real money or real time.

**A field that had never worked once.** A URL parser split on the letter `s` —
one lost backslash in a regex. It was in production, silently, for its entire
life. Nobody noticed because the failure looked like a broken destination site
rather than broken parsing. *Rule: an edit that silently matches nothing and a
probe that matches too much are the same failure.*

**Seven commits of polish on a broken product.** Drafts were coming back at
**13% of target length** while seven commits of interface refinement landed on
top. Every craft review passed — correctly, because it was not a craft question.
*Rule: `method-review` must rotate roles; a single posture cannot see outside
itself.*

**A repair pass that fired every single time.** A style guard's regexes were
dead in the same way, so a repair generation ran on **every** request, billed
twice, and discarded the result. Nobody saw it because the output looked fine.
*Rule: `method-cost` reads the ledger, not the intention.*

**A guard that failed its own birth test.** A newly written sync guard compared
bytes, so on a Windows checkout `git checkout --` restored CRLF and two
**identical** files reported as differing. It was caught by its own mutation
test. *Rule: `method-guard` — a guard is not trusted until it has been seen
failing on a real mutation and passing when restored.* The same trap then hit
this repo's validator, which is why `.gitattributes` pins `eol=lf`.

**The router that could not reach its own entry points.** `nzs-start` — the skill
whose entire job is finding the right skill — named exactly one of six
user-invoked skills. Five were unreachable from any request. Three adversarial
review rounds missed it because every round *used* the router and none asked
what it could reach. *Rule: the fix was not editing a list; it was an executable
check that fails CI.*

**A number that went stale three times.** `expect 26` beside a command that
returned 29; `29 skills`; `the four entry points` when there were seven. *Rule:
never write the count — write the comparison.* Now enforced by
`scripts/validate.mjs`.

**Two drafts for one click.** An `aria-disabled` change introduced a regression
where a double click bought two generations. Proven fixed by clicking five times
and counting **one** POST. *Rule: settle it in the medium — the network tab, not
the diff.*

---

## Credits

This method stands on other people's work. Every one of these is used, not
merely admired.

**Skills and conventions**
- [mattpocock/skills](https://github.com/mattpocock/skills) — the user-invoked /
  model-invoked split and the shared-language file, which is the structure of
  this entire repo. `nzs-grill` is adapted from his `grill-me`.
- [mukul975/anthropic-cybersecurity-skills](https://github.com/mukul975/anthropic-cybersecurity-skills)
  — 817 security skills across 29 domains, framework-mapped. Not vendored (see
  [ADR 0004](adr/0004-security-scoped-to-what-we-ship.md)); its per-skill
  verification section and evidence-anchoring convention were adopted.
- [obra/superpowers](https://github.com/obra/superpowers) — process-before-
  implementation skill discipline.

**Plugins**
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — output
  compression that keeps every technical fact.
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) — Codex as
  the independent review engine, the nearest thing to an external witness this
  method has.
- [fivetaku/fablize](https://github.com/fivetaku/fablize) — the verification
  gate as a hook rather than an instruction, and a README honest about its own
  ceiling.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
  — Vercel and Figma plugins.

**Review and craft skills**
`bug-hunter` (adversarial Recon → Hunter → Skeptic → Referee), `scrutinize`
(outsider, end-to-end), `debug-mantra` (the four-step debugging discipline that
`method-debug` encodes), `impeccable` (the design craft floor),
`karpathy-guidelines`.

**Infrastructure**
- **CodeGraph** — symbol graph and call paths.
- **engram** — memory that survives the session.
- **headroom** — context compression.
- **rtk** — token-killing CLI proxy.
- **Playwright MCP** — the medium in which every rendered claim is settled.
- **9router** — not a dependency of the method; it generated this repo's
  artwork, and is credited for that alone.
- **Claude Code** itself, whose skills, plugins, MCP and `/goal` + `/loop`
  primitives are the substrate all of this runs on.

If you build on this set, the thing worth carrying forward is not the file
layout. It is the one rule underneath it: **settle the claim in the medium where
it is true.**


