# Contributing

The bar here is unusual, so it is worth stating before you spend an evening on a
pull request.

## What a skill must be

**One discipline, done properly.** If you cannot say in one sentence what the
skill does and what it hands to the next step, it is two skills or none.

**It must refuse something.** Every skill declares what it will not do, and
`scripts/validate.mjs` fails the build if the section is missing. This is not
ceremony: a skill with no edge is a paragraph of advice, and advice does not
change what a model does. The refusals are the skill.

**It must say how a claim is settled.** "Check that it works" is not a step.
Name the medium — the command and its exit code, the DOM query, the row read
back, the ledger. If your skill cannot name the evidence, it is a preference.

**It must be portable.** No skill names a framework, a database, or a currency.
Anything project-specific is read from `.method/config.yml`, which
`method-groundwork` writes. If you need a new config key, add it to
`method-groundwork` in the same pull request — a key nothing writes is a key that
is always missing.

## Which layer

| you are adding | prefix | invoked by |
|---|---|---|
| something that orchestrates — routes, loops, interviews, judges | `nzs-` | the user, by name |
| one discipline the model reaches for mid-task | `method-` | a skill, or the model |

A user-invoked skill may call a discipline. It never calls another user-invoked
skill — that rule is what keeps triggers unambiguous, and it is the reason the
`decide / pm / ideate / discovery` collision stopped mattering.

A new `nzs-` skill needs a row in `nzs-go` and a file in `commands/`. The
validator enforces both, because an entry point nothing routes to is one nobody
will ever reach — which is a defect this repo shipped once already.

## The description is the interface

The frontmatter `description` is the only thing the model sees when deciding
whether to invoke your skill. Write it for that job:

- Say what it does **and when to use it**, including the words a user would
  actually type — in any language they would type them in.
- Make it discriminating. If your description also matches three existing
  skills, the model cannot choose, and all four become unreliable.
- Finish the sentence. The validator rejects descriptions cut mid-word, because
  seven of them once shipped that way.

## Before you open the pull request

```bash
node scripts/validate.mjs --verbose
```

It checks the frontmatter contract, cross-references, entry-point reachability,
command targets, README coverage, credential-shaped strings, and the rule
against writing counts in prose. It is fast and has no dependencies.

**If you add a check, mutation-test it.** Break the thing it is meant to catch,
watch it go red, restore, watch it go green — and put that transcript in the
pull request. A check nobody has seen fail is decoration, and this repo will not
merge decoration. That rule is `method-tripwire`, applied to itself.

## What gets rejected

- A skill that is a summary of good practice with no refusals and no evidence
  step.
- A change that raises a budget or loosens a check without a written reason in
  the diff.
- A count written into prose. State the comparison instead — the number goes
  stale silently, and it has, three times.
- Anything that makes a claim the repo cannot check.
