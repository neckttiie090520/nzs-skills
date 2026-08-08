---
name: method-groundwork
description: >-
  Detects the project's stack and writes .method/config.yml — the file every other
  method-* skill reads for its commands, mediums, budgets, references, and model
  tiers. Detects what is knowable from the tree, asks at most six unknowables, and
  refuses to invent a verify command it cannot find. Runs automatically the first
  time any other method skill runs in a project with no groundwork laid yet;
  invoke directly to redo it or to add a reference.
---

# Method Groundwork

You write the config the whole method reads. Everything portable lives in
`.method/config.yml`; no verb skill names a framework, a database, or a currency —
they read your output. Detect what the tree tells you, ask only what it cannot,
and never guess a command you have not confirmed exists.

The owner's UX law governs this too — *"user ไม่ต้องคอดเองเยอะ"* (type as little as
possible). Detect aggressively, offer smart defaults, ask sparingly.

## Step 1 — Detect what is knowable

Read the tree, do not ask about what it already answers:

- **Package manager and scripts** — `package.json` scripts (or `Makefile`,
  `manage.py`, `pyproject.toml`, `Cargo.toml`, `go.mod`). Find the one command
  that runs lint+typecheck+build (`npm run check` here) and the test/guard command.
- **Framework** — from dependencies (`next`, `django`, `rails`, `astro`, …).
- **Database client** — `@supabase/*`, `pg`, `psycopg`, `prisma`, an ORM config.
- **Styling system** — Tailwind config, CSS modules, styled-components.
- **Existing guard convention** — `scripts/check-*.mjs`, a `tests/` layout, a
  pre-commit config. If guards already exist, `config.guards` runs them.
- **Lockfile** — to pin the correct package manager in every command you write.

## Step 2 — Ask only the unknowables (at most six)

Each has a smart default; ask, do not interrogate. Skip any the tree answered.

1. **Currency and cost ledger** — only if the project makes AI or paid API calls.
   "Is there a table or log that records spend?" (names `cost.ledger`,
   `cost.currency`). If no paid calls exist, omit the `cost` block entirely.
2. **Rendered-claim medium** — which browser driver settles DOM claims (Playwright,
   Puppeteer, Cypress). Default: whichever MCP/driver is already installed.
3. **Review roles** — which adversarial roles fit this domain. Default the roster
   to `[scrutinize, bug-hunter, a11y, editor, security, edge-case]`; add
   `design-jury` only if there is UI, `codex` (or another engine) as the
   independent reviewer.
4. **Model tiers available** — architect (high), builder (mid), mechanical (cheap),
   and the independent reviewer. Record by *capability*, not brand, so the config
   travels.
5. **Where the handoff lives** — default `handoff.md` at repo root.
6. **References this project takes its taste from** — products, repos, local
   folders, a domain KB, the live production site. **Each entry MUST name what it
   is consulted FOR.** A reference with no `for:` is decoration — refuse to record
   it. Add `as_of:` (year-month) to any external reference so staleness is
   detectable. This block is load-bearing: reviewers judge against THESE, not
   against a standard they invent.

## Step 3 — Write the files

Write `.method/config.yml` in this shape (fill only the blocks that apply; omit
`cost` if there are no paid calls):

```yaml
project:      <name>
stack:        { framework: <fw>, db: <db|none>, styling: <sys|none> }
verify:                              # the commands that ARE the evidence
  check:      "<lint+typecheck+build in one>"
  guards:     "<the executable-guard suite>"
  build:      "<build command>"
mediums:                             # where a claim of each kind is settled
  rendered:    <browser driver>
  persistence:                       # TWO connections, and prod is the one
    local:     "<db read command>"   # that matters: method-launch verifies the
    prod:      "<read-only prod cmd>"# schema HERE before the push that needs it
  cost:        "<ledger name>"       # omit if no paid calls
budgets:      .method/budgets.yml    # ratchet-only numbers, each with a reason
register:     docs/plan/NN-<AREA>-REGISTER.md   # where decisions are recorded
cost:                                # omit this whole block if no paid calls
  currency:   <ISO>
  ledger:     <table/log name>
  ceiling_fn: <rounds UP; a bound may never round down>
roles:        [<the roster that fits this domain>]
              # must include every role method-gauntlet's table can select,
              # e.g. scrutinize, bug-hunter, a11y, editor, security,
              # edge-case, cost/bounds. A table that selects a role the
              # roster lacks selects nothing.
references:                          # each entry names what it is consulted FOR
  products: [ { name: "...", for: "...", as_of: YYYY-MM } ]
  repos:    [ { url: "...", for: "..." } ]
  local:    [ { path: "...", for: "..." } ]
  corpus:   [ { path: "...", for: "..." } ]
models:                              # tiers by capability, not brand
  architect:  { tier: high }
  builder:    { tier: mid }
  mechanical: { tier: cheap }
  reviewer:   { external: <engine> }
handoff:      handoff.md
```

Also write:

- **`.method/budgets.yml`** — empty, with a header stating the ratchet law: every
  number carries the reason it is that number, numbers only go down, a raise needs
  a written reason in the diff.
- **`handoff.md`** — a stub if none exists, so continuity has somewhere to live.

## Refuses

- **To guess a verify command it cannot find.** If there is no `npm run check`
  equivalent — no single command that proves the code is sound — say so plainly.
  The method will not invent evidence it cannot run; a project with no verify
  command is told to add one before the verb skills can settle any claim.
- **To record a reference with no `for:`.** A reference the config cannot say what
  it is consulted for is decoration, and it drops.
- **To ask about anything the tree already answers**, or to exceed six questions.
