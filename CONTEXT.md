# CONTEXT

The shared language. Every skill assumes these words mean exactly this, so no
skill has to re-explain them. If this file grows past one screen it has become
documentation and must be cut back.

## The words

**Claim** — a statement that something is done, fixed, passing, or true.
Every claim has a **medium**.

**Medium** — where a claim is settled. The DOM for rendered output. The
compiled artifact for a style token. The ledger for cost. Real rows for
persistence. The build's exit code for a build. Never the diff.

**Evidence** — the observation that settled a claim in its medium. A command
and its actual output; a measurement; a row. Not a report that one was made.

**Guard** — an executable rule. Born on the SECOND occurrence of a bug class,
never trusted until it has been seen failing on a real mutation and passing
when restored.

**Bound** — a ceiling that the real value may never beat. Rounds up. Never a
forecast, never rounded down, never flattering.

**Ratchet** — a budget that only decreases. A raise needs a written reason in
the diff.

**Declined with a price** — work considered and not done, recorded with what it
would cost, so nobody re-derives it.

**Observable** — a success condition anybody can check without asking the
author. "`check` exits 0", not "it works".

## The two layers

**`nzs-*`** — user-invoked. They orchestrate: route, loop, interview, judge.
A user-invoked skill may call a discipline. It never calls another `nzs-*`.

**`method-*`** — model-invoked. One discipline each, done properly.

## The config

`.method/config.yml`, written by `method-groundwork` on first run. Everything
project-specific lives there — commands, mediums, budgets, references, roles,
model tiers — which is why no skill in this repo names a framework, a database
or a currency.
