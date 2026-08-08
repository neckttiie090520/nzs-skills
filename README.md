# nzs-skills

A working method, as executable skills for [Claude Code](https://claude.com/claude-code).

Not a prompt collection. These were extracted from **279 commits and 106
instructions** of one real project, then attacked by adversarial review until
the reviews stopped finding things that mattered — including the reviews that
found defects in the skills themselves.

The method in one sentence: **nothing is done until it has been settled in the
medium where the claim is true.**

---

## Install

```bash
git clone https://github.com/<you>/nzs-skills.git
cp -r nzs-skills/skills/* ~/.claude/skills/        # global
# or, per project:
cp -r nzs-skills/skills/* .claude/skills/
```

Then, in any project:

```
/ask-nzs I need to add rate limiting to the public API
```

The first run writes `.method/config.yml` via `method-onboard`. Everything
project-specific lives there — commands, mediums, budgets, references, model
tiers — which is why **no skill in this repo names a framework, a database, or a
currency.**

---

## The two layers

**Entry points.** You invoke these by name. They orchestrate.

| skill | what it does |
|---|---|
| **`ask-nzs`** | returns the skill *stack* for a job, with an observable exit condition |
| **`nzs-goal`** | writes a `/goal` prompt and the plan file a loop re-reads, built to terminate |
| **`nzs-grill`** | interviews until every branch resolves, then ends in an artifact |
| **`nzs-panel`** | outsider with declared bias, opinionated CTO, senior who corrects both |
| **`nzs-setup`** | installs the whole environment and *proves* each piece works |
| **`nzs-handoff`** | compacts a session into something the next agent can resume from |
| **`nzs-learn`** | records wins, mistake *shapes*, and your taste — into engram |

**Disciplines.** The model reaches for these. One thing each, done properly.

| stage | skills |
|---|---|
| doctrine | `method-doctrine` · `method-onboard` |
| acquire | `method-research` · `method-clone` · `method-extract` |
| decide | `method-decide` · `method-economics` · `method-register` · `method-postmortem` · `method-pm` · `method-discovery` · `method-ideate` |
| build | `method-plan` · `method-se` · `method-guard` · `method-robust` |
| verify | `method-review` · `method-debug` · `method-verify` · `method-visual` |
| secure | `method-security` · `method-threat` · `method-secrets` · `method-appsec` · `method-aisec` |
| ship | `method-ship` · `method` (orchestrator) |

A user-invoked skill may call a discipline. It never calls another user-invoked
skill — the rule that keeps triggers unambiguous.

---

## What it actually enforces

- **Evidence before assertion.** A fix reported from reading the diff is not a
  fix. Settle it in the DOM, the compiled artifact, the ledger, the rows.
- **A guard is born on the second occurrence** — and is not trusted until it has
  been *seen failing* on a real mutation and passing when restored.
- **Bounds never flatter.** A ceiling is not a forecast. Null is not zero. A
  displayed cost rounds up.
- **Declined work is recorded with its price**, so nobody re-derives it.
- **Budgets ratchet down only.** A raise needs a written reason in the diff.
- **Production is verified before the push that needs it**, not after.
- **Every control must be real.** No UI for behaviour the server does not have.

---

## Why the method exists

Four things that happened in the source project, each of which became a rule:

- A field split URLs on the letter `s` — a lost backslash — and had **never
  worked once**. Nobody noticed because the error message read like a broken
  site rather than a broken split.
- A style guard's regexes were dead in the same way, so a repair pass fired on
  **every single generation**, billed twice, and threw the result away.
- Drafts came back at **13% of their target length** while seven commits of
  interface polish landed on top. Every craft review passed. None could have
  caught it, because it was not a craft question.
- Three separate edits **silently matched nothing** and were reported as done.

The last one is why `method-doctrine` exists, and why its gate names those exact
self-deceptions by shape.

---

## The known weakness

The anti-theatre gate is **self-attested**. A model can tick its checkboxes and
paste invented command output; nothing external witnesses it. `nzs-panel` is the
closest thing to an external witness here, and it is not enough. Making the
independent reviewer's re-run mandatory for load-bearing claims is the open
design decision.

It is stated here rather than buried, because a method that hides its own weak
point has already broken its first rule.

---

## Layout

```
skills/           one directory each, name matching its frontmatter
commands/         one slash command per entry point
.claude-plugin/   plugin manifest
docs/adr/         the decisions, with what they cost
CONTEXT.md        the shared language every skill assumes
```

## Credit

The user-invoked / model-invoked split, and the discipline of a shared-language
file, are taken from [mattpocock/skills](https://github.com/mattpocock/skills).
Adopted here as rules with reasons rather than as copies — which is what
`method-extract` requires of any borrowed pattern.

## Licence

MIT.
