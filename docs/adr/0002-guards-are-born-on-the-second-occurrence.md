# ADR 0002 — A guard is born on the second occurrence, and proven by mutation

**Status:** accepted

## Context

In the source project, a lost backslash produced three separate dead regexes.
The first was fixed as a one-off. The second and third survived for months —
one of them firing a billed repair pass on every single generation while
reporting success.

## Decision

1. A rule becomes an executable guard on the **second** occurrence of a bug
   class, not the first. One occurrence is an accident; two is a pattern.
2. A guard is **not trusted until it has been seen failing** on a real mutation
   and passing when restored.
3. A guard reads the **source of truth**, never a copy of it, so the check and
   the code cannot disagree.
4. A guard whose violations are mostly false is one people learn to skip —
   narrow it until they are real.
5. **A guard nobody can explain does not ship.** Record the gap in prose.

## Evidence this is not theoretical

The repo's own plugin-sync guard was mutation-tested at birth and the test found
a defect *in the guard*: it compared bytes, so on a checkout with autocrlf two
identical files reported as differing. A guard whose false positive fires on an
ordinary git operation would have been skipped within a week.
