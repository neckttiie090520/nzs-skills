---
name: nzs-setup
description: Installs and VERIFIES the whole working environment in a workspace — the nzs-skills set, plus codegraph, engram, headroom, rtk, caveman and fablelize — then writes .method/config.yml. Every tool is proven working by running it, never by reporting that it was installed. Use on a fresh workspace, a new machine, or when the user says ติดตั้ง / setup / เตรียมเครื่อง / set this project up / install everything.
---

# nzs-setup

You install an environment and then PROVE each piece works. An installer that
reports success it did not check is the failure this whole set exists to
prevent, committed at the moment the user trusts you most.

Work in order. Each step: install, then run the check, then record the result.
A step that cannot be verified is reported as **unverified**, never as done.

## 0. Report the plan first

List what you are about to install and what each one buys. The user may already
have some, may not want others, and a setup that installs six things silently is
a setup nobody can debug later.

## 1. The skills themselves

```bash
mkdir -p .claude/skills
cp -r <path-to-nzs-skills>/skills/* .claude/skills/
```

**Check:** the destination holds every skill the source ships — compare the two
directories, never a number written here:

```bash
diff <(ls <path-to-nzs-skills>/skills) <(ls .claude/skills | grep '^\(method\|nzs\|nzs-start\)')
```

Empty output is the pass. A literal count in this file would be wrong the day
the set grows, and an install check that goes red on a correct install is one
the user learns to ignore.

Then confirm the harness registered them: they appear in the available-skills
listing. Copying a file and loading it are different events — a skill whose
frontmatter does not parse copies fine and never appears. If one is missing from
the listing, say which.

## 2. codegraph — a symbol graph so you stop grepping

```bash
codegraph --version || echo "not installed"
codegraph init            # in the repo root; indexing is the USER'S decision
```

**Check:** `.codegraph/` exists AND `codegraph explore "<a symbol you know exists>"`
returns that symbol's source. A `.codegraph/` directory with an empty index is
not an install.

**Do not run `codegraph init` without asking.** It indexes the whole repo.

## 3. engram — memory that survives the session

An MCP server. Check it is connected, then prove a round trip:

**Check:** call `mem_current_project`, then `mem_search` for anything. If both
answer, memory is live. If the tools are not listed, engram is not connected to
this workspace — say so and point at the MCP config; do not pretend.

This is what `/self-learning` writes into. Without it, that skill degrades to a
local file and must say so.

## 4. headroom — context compression

MCP server. **Check:** `headroom_stats` returns. If it does not, the tools are
not connected.

## 5. rtk — token-killing CLI proxy

```bash
rtk --version    # expect: rtk X.Y.Z
rtk gain         # expect: savings analytics, not "command not found"
```

**Check:** BOTH commands answer. `rtk --version` alone is not enough — there is
a different package called `rtk` (a Rust type kit) that will answer `--version`
and fail `gain`. If `gain` fails, the wrong `rtk` is installed; say which.

## 6. caveman — output compression

A plugin, with levels. Set it to **full**:

```
/caveman full
```

**Check:** the response register changes — articles dropped, fragments, no
filler. If the statusline badge is not configured, offer the one-line settings
edit rather than doing it silently.

## 7. fablelize

**Check:** it appears in the plugin or skill listing and answers when invoked.
If you cannot find it, say so plainly and move on — a setup that invents a
successful install of something absent is worse than an incomplete setup.

## 8. Write the config

Run `method-onboard`. It detects the stack and writes `.method/config.yml`,
which every other skill reads. Setup is not finished until that file exists.

## 9. The report

A table, one row per tool: **installed / verified how / result**. Anything you
could not verify goes in a second table headed **unverified**, with the reason.

```
tool        status      proven by
codegraph   ok          explore "AiDraftForm" returned source
engram      ok          mem_current_project answered
rtk         WRONG PKG   gain failed; rtk --version answered (Rust Type Kit)
fablelize   absent      not in plugin listing
```

## What you refuse

- **To report an install you did not run the check for.** Unverified is a
  legitimate result; a false green is not.
- **To index a repo without asking.** `codegraph init` is the user's decision.
- **To edit settings files silently.** Offer the change, show the line.
- **To continue past a failed check without saying which one failed.**
