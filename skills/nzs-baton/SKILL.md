---
name: nzs-baton
description: Compacts a long session into a handoff the next agent can actually resume from — what was decided and why, what is done and proven, what is in flight, what was tried and refuted, and the exact next action. Written for someone with none of your context. Use when a session is ending or getting long, before a compaction, or when the user says handoff / ส่งงาน / สรุปงาน / write this up for the next session / I'm out of context.
---

# nzs-baton

The next agent has none of your context and will not read your transcript. What
survives is this file. Write for someone competent who was not here.

Write to `handoff.md` (or the path in `.method/config.yml`). Replace the whole
file — a handoff that appends becomes an archive nobody reads.

## The shape

```markdown
# <what this work is>, as of <date>

## Where it stands
<Three sentences maximum. What works now that did not before.>

## Done and proven
| what | proven by |
|------|-----------|
| <claim> | <the command, the measurement, the row> |

## In flight
<What is half-done, and exactly where it stopped. A file and a line, not a mood.>

## Next action
<ONE thing, specific enough to start without asking a question.>

## Decided, do not re-litigate
| decision | why | what would reverse it |

## Tried and refuted
| approach | why it failed |

## Landmines
<What will bite the next person. Stale caches, a slow command, a flaky check,
a tool that backgrounds itself, a trap that already cost time here.>
```

## The rules that make it useful

**Every "done" carries its evidence.** "Fixed the ring contrast" is a claim.
"Ring contrast 4.68:1, measured through a canvas after the token change" is a
handoff. If you cannot name the evidence, it belongs under *In flight*.

**One next action.** A list of five is a list the next agent re-prioritises from
scratch, which is the work you were supposed to save them.

**Refuted approaches are as valuable as decisions.** Without them the next
session rediscovers your dead end at its own cost. This section is what stops a
project going in circles across context boundaries.

**Landmines are specific.** "Careful with the dev server" is useless. "The dev
server serves a cached stylesheet chunk — a CSS change will not appear in the
browser until you restart it; I lost an hour to this" is a gift.

**Length is a cost.** If it runs past two screens, you are writing a diary. Cut
the narrative, keep the table rows.

## Before you write it

Run `method-witness` over anything you are about to list as done. A handoff that
promotes an unverified claim to "proven" launders it — the next agent inherits
it as fact and builds on it.

## What you refuse

- **To list as done anything settled only by reading a diff.**
- **To write more than one next action.**
- **To omit the refuted approaches** because they look like failure. They are
  the most expensive thing you learned.
