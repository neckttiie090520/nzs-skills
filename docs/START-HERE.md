# Start here

**English** · [ภาษาไทย](START-HERE.th.md)

If you vibecode — you describe what you want, the AI writes it, you ship — this
page is for you. You do not need to know what STRIDE is. You do not need to have
read the other docs. Fifteen minutes, and you will have used this thing.

---

## The problem this solves

You have felt this. The AI says:

> "Fixed! The button now works correctly."

And it doesn't. Or it does, but something three files away quietly broke. Or it
said "tests pass" without running them. You did not lie to yourself — the AI
told you it was done, in complete sentences, with confidence.

That is not a model being bad. It is a model **reporting on its intention
instead of on reality**, which is an easy mistake to make when nothing forces
the difference.

Here is a real one from the project this came from. A field that parsed URLs
split them on the letter `s`. One backslash was missing from a regular
expression. It was live, in production, and **it had never worked once** — not a
single time since the day it was written. Nobody noticed for months, because
when it broke, the error looked like the *other website* was down.

Reading the code would not have caught it. Only running it would.

So the whole idea here is one sentence:

> **Nothing is done until it has been checked in the place where "done" is
> actually true.**

Says "it shows on the page"? Look at the page. Says "it saved"? Read the row
back out of the database. Says "the build passes"? Run the build and paste what
it printed. Not the code. Not the plan. The thing itself.

That's it. Everything else in this repo is that one idea, applied to a specific
kind of work.

---

## Install it (2 minutes)

```
/plugin marketplace add neckttiie090520/nzs-skills
/plugin install nzs-skills@nzs-skills
```

If the install says `Run /reload-plugins to activate`, run that.

**Check it worked.** Type `/` and you should see `nzs-start` in the list. If you
don't, the install didn't take — see [When it doesn't work](#when-it-doesnt-work).

---

## Your first real use (10 minutes)

Don't read the skill list. Just ask:

```
/nzs-start I want to add a login page to my app
```

You will get back a **plan of which skills to use, in order**, and — the part
that matters — a finish line anyone can check. Something like:

```
Job type: build

Stack:
  1. method-plan      break it into milestones with a check for each
  2. method-code      write it, one milestone at a time
  3. method-security  it handles credentials, so this is not optional
  4. method-verify    prove it before you call it done

Not in the stack: method-research — you are not copying anyone's design.

Done when: you can log in as a real user in the browser, and logging in
as user A cannot read user B's data (proven by an actual request, not by
reading the code).
```

Notice what it did **not** do: hand you ten options and make you choose. A
router that gives you a menu has just given the decision back to you, which is
the thing you asked it to take away.

Now just say **"go"** and let it work through the stack.

---

## What you'll notice is different

**It argues with itself.** `method-review` goes over your code several times,
wearing a different hat each round — one round only hunts security holes, one
only hunts edge cases, one only reads it as a stranger. Each hat sees things the
others structurally cannot. And each round starts by re-checking that the
*previous* round's fixes actually landed, because in the source project three
separate rounds caught a fix that had been reported as done and never happened.

**It refuses to say "done" without showing you.** If it cannot prove something,
it says **"attempted, unverified — here's why"** instead of quietly claiming
success. That sounds worse. It is enormously better. You now know which parts to
trust.

**It says no.** Ask it whether to build something and it is allowed to answer
*"don't"* — with the reason written down, so you don't re-argue it next month.

**It remembers.** `/nzs-learn` records what worked and — more useful — the
*shape* of mistakes. Not "the edit failed on line 40", but "a find-and-replace
whose target text had already changed". A shape you can recognise next month in
a different file. The instance teaches you nothing; the shape teaches you
everything.

---

## The commands you will actually use

Everything else the AI picks up on its own. You only need these.

| type this | when |
|---|---|
| `/nzs-start` | **any time you're unsure.** It plans which tools to use |
| `/nzs-grill` | you have a vague idea and want it pinned down before building |
| `/nzs-panel` | you want it argued with — a biased outsider, a hard-to-please CTO, and a senior who corrects them both |
| `/nzs-learn` | something just worked, or just broke, and you want it remembered |
| `/nzs-handoff` | you're out of context or stopping for the day |

There is also `/nzs-setup` for a fresh machine, and `/nzs-goal` for jobs too big
for one sitting.

---

## "Which one do I need?" — in plain words

You never have to memorise this. `/nzs-start` picks for you. But if you like
knowing what's in the box:

| what you're thinking | the skill |
|---|---|
| "should we even build this?" | `method-decide` |
| "what would this cost to run?" | `method-cost` |
| "is this code any good?" | `method-code` |
| "find what's wrong with it" | `method-review` |
| "why is this broken?" | `method-debug` |
| "prove it actually works" | `method-verify` |
| "will it survive real users?" | `method-harden` |
| "can someone hack this?" | `method-security` |
| "is it safe to put AI in it?" | `method-ai-security` |
| "I leaked an API key" | `method-secrets` |
| "make this bug impossible to repeat" | `method-guard` |
| "make it look good" | `method-design` |
| "copy how that site does it" | `method-clone` |
| "ship it" | `method-ship` |

---

## The one habit worth stealing

Even if you never install this, take this one thing:

**When the AI says it's done, ask "show me."**

Not "are you sure?" — it will say yes. Ask for the *evidence*: the command and
what it printed, the screenshot, the row from the database, the actual HTTP
response. If it can't produce that, the work isn't finished; it's just described.

That single question is most of the value here. The repo is that question,
written down so the AI asks it of itself before you have to.

---

## When it doesn't work

**`/nzs-start` doesn't appear when I type `/`**
The plugin didn't install or didn't reload. Run `/plugin` and check
`nzs-skills` is listed. Then `/reload-plugins`. If you copied the files by hand
instead, they must be in `~/.claude/skills/` or `.claude/skills/` — one folder
per skill, each containing a `SKILL.md`.

**It asks about `.method/config.yml`**
Normal on first use. That file records what *your* project uses — your test
command, your database, your browser. Let `method-onboard` write it; it asks at
most six questions and works the rest out by looking at your files. This is why
no skill here hardcodes a framework or a database: they all read that file.

**It keeps saying "attempted, unverified"**
Working as intended, and it's telling you something real: it cannot reach the
thing that would settle the claim. Usually a dev server isn't running, or a
browser tool isn't connected. Fix that and the same check will settle properly.

**It refused to do what I asked**
Every skill declares what it won't do, and the refusals are deliberate — they're
the part that makes the rest trustworthy. If a refusal is wrong for your
situation, say so and it will proceed; you're the one who decides. But read the
reason first. It's usually the cheap version of a lesson someone already paid
for.

**It feels slow**
It is, on purpose, at the start. Checking things costs time up front and saves
the afternoon where you rebuild something that was silently broken the whole
time. If you want speed for something genuinely throwaway, don't use this — that
is a legitimate choice, and it's yours.

---

## Where to go next

- **[README](../README.md)** — what the whole set is
- **[The ecosystem guide](ECOSYSTEM.md)** — the tools this works with, what each
  one is for, and where each one fails
- **[CONTRIBUTING](../CONTRIBUTING.md)** — the bar for adding a skill

And if you only remember one line from any of it: **ask to be shown.**
