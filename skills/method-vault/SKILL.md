---
name: method-vault
description: >-
  The lifecycle of a credential — where it may live, what must never see it, and
  what to do the moment it leaks. Treats exposure as a rotation event, never as a
  cleanup event, because a key that was public for one second is public. Installs
  the guard that fails the build if a secret becomes tracked. Use when adding an
  API key or environment variable, when a key appears in chat, a log, a diff or a
  screenshot, before making a repo public, or when the user says rotate / .env /
  key / token / ความลับ.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Vault

A credential has exactly one safe location and many unsafe ones. Your job is to
keep it in the first and to know, without hesitating, what to do when it reaches
the second.

## The one rule that decides everything

**Exposure is rotation, not cleanup.** A key pasted into a chat, committed and
reverted, printed to a log, or caught in a screenshot is compromised from that
moment. Deleting the message, force-pushing the history, or editing the log does
not un-expose it — it only removes your evidence that it happened.

So the response is always the same three steps, in this order:

1. **Rotate first.** Issue the new credential and deploy it. Do this before any
   cleanup, because cleanup takes time and the old key is live the whole while.
2. **Revoke the old one**, and confirm it is dead by using it and getting a
   failure. A key you believe is revoked and never tested is a key you hope is
   revoked.
3. **Then** clean up the artifact, and record where it leaked so the path can be
   closed.

Telling the user "I removed it from the file" and stopping is the failure this
skill exists to prevent. Say plainly: *this key must be rotated*, and treat it as
outstanding work until they confirm it was.

## Where a secret may live

- **A gitignored environment file** (`.env.local`, `.env.cloud`) or the platform's
  own secret store. Nothing else.
- **Never** in: source, a config file that is tracked, a client bundle, a log
  line, an error message, a test fixture, a comment, a commit message, a CI
  echo, or a screenshot for the user.
- **Never rendered in the UI.** Not masked, not last-four, not behind a reveal
  toggle — if the value reaches the browser it is in the page source, and a mask
  is a decoration over a disclosure. Show *whether a key is set*, never any part
  of the key itself.
- **Client-exposed prefixes are a naming contract, not a suggestion.** Any name
  that the framework inlines into the browser bundle (`NEXT_PUBLIC_*`,
  `VITE_*`, `PUBLIC_*`) is public by definition. A secret that acquires such a
  prefix has been published; treat it as leaked and rotate.

## The privilege question

Not all keys are equal, and the review that matters is which one a path can
reach. A key that bypasses row-level enforcement — a service-role key, an admin
token, a signing key — **may never be constructible on a path a public request
can reach.** Trace the import chain from every public entry point; do not rely on
the file being named `server`. Delegate to `method-lockpick` for the reachability
argument.

## The guard, because this recurs

This is a recurring class, so it earns an executable guard rather than a rule
people remember. Delegate to `method-tripwire` and add it to `verify.guards`:

- **Fail the build if any environment file is tracked by git.** The check is
  `git ls-files` against the env patterns — a file's presence in the index is the
  fact, not its presence in `.gitignore`.
- Mutation-test it at birth: `git add -f .env.local` must turn it red, and
  un-adding must turn it green. A secret guard that has never been seen failing
  is decoration.
- Scanning file *contents* for key-shaped strings is a useful second layer and a
  poor first one — it produces false positives on test fixtures and false
  negatives on any key shape it does not know. The tracked-file check has neither
  failure mode.

## Before a repo goes public

History is the whole repo, not the current tree. `git log -p` contains every key
ever committed, and making the repo public publishes all of it. Check history —
not just the working tree — and if anything is there, rotate before the repo
flips, not after.

## What you refuse

- **To call a leaked key handled without rotation.** Removing it from a file is
  step three of three.
- **To print a key value** — in a report, a log, a UI, a commit message, or back
  to the user in chat. If you must refer to it, name the variable.
- **To store a secret in memory tooling.** `nzs-scrapbook` records shapes and taste,
  never values.
- **To claim a `.gitignore` entry protects an already-tracked file.** It does not;
  the file stays tracked until it is explicitly removed from the index.

## Output

For each credential: **name, where it lives, who can read it, and whether it is
currently exposed**. Anything exposed gets an explicit ROTATE line at the top of
the report, above everything else, and stays on the open list until confirmed.
