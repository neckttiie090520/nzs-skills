---
name: method-tripwire
description: Grows a project's executable rules. Turns a recurring bug class or a spec rule into a guard script, then proves the guard works by making it FAIL on a real mutation and pass when restored, and writes the guard's header as an argument for its own existence. Use when the same bug has been fixed twice, when a review keeps flagging the same class, when a spec says "any X must Y", or when the user asks for a rule enforced mechanically, a check script, a lint rule, or "make this impossible to get wrong".
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-tripwire

You are giving a rule teeth. A guard is a script that fails a build. Everything
here exists to stop you shipping one that cannot.

## The failure this prevents

Two, and they look opposite. A rule that lives only in a document is obeyed
until the person who wrote it stops reading reviews: this project fixed one
mutation-without-row-check bug **three separate times** — inquiry status,
note-with-status, user role — *"before anyone noticed it was one systematic
defect rather than three incidents."* And the other: a guard that was never seen
failing passes forever, including on the day the thing it polices breaks. A
green that means nothing is worse than no green, because people trust it.

## Law 1 — a guard is born on the second occurrence, not the first

The first time a bug is fixed, fix it and note the class. The **second** time a
bug of the same class appears, that is the trigger — recurrence is the evidence
that the cause is systematic and not an incident. Before then you are guessing
at a pattern from one point.

Exception: a rule stated as a threshold or a set in an approved spec (*"any
other admin page ≤ 150 words"*) is already a second occurrence in argument form
— it was written down because it had been violated. Guard it.

Never port another project's guards wholesale. A row-level-security mutation
guard is meaningless in a project with no row-level security. Guards come from
this project's own fixed bugs.

## Law 2 — read the source of truth, never a copy

A guard that restates the number it polices can drift from that number — which
is the drift it was invented to prevent, wearing a constant's clothes. So:
export the constant from the code, and have the guard read it.

```js
// The scale lives in ui.tsx as exported constants and this script reads THEM —
// not a copy of them — so the check and the components can never disagree.
const uiSource = readFileSync("src/components/admin/ui.tsx", "utf8");
function readToken(source, name) {
  const match = source.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match) {
    console.error(`${UI} no longer exports ${name}. The scale and its check have drifted apart.`);
    process.exit(1);   // a missing source of truth is a hard error, never a skip
  }
  return match[1];
}
```

Note the exit: when the source of truth moves, the guard **fails loudly**. A
guard that silently skips when it cannot find what it checks is decoration.

## Law 3 — narrow until the violations are real

*"A rule whose violations are mostly false is a rule people learn to skip."*

Before you wire a guard in, run it against the untouched tree and count. If most
findings are correct code, the rule is wrong, not the code. Measure and narrow:

- A first draft banned every `h-` value outside a set. Measured: **41** flags,
  none of them controls — skeleton bars, icon dots, avatars, a progress rule at
  `h-0.5`. Narrowed to *control-shaped class strings only* (a radius **and**
  horizontal padding — a thing you press or type into): the flags became real.
- A first draft banned `w-full` on inputs with an exception list. Measured: 22
  inputs, most correct. *"An exception list holding 14 of 22 entries documents
  nothing."* Narrowed to the cases where the content type is knowable from the
  markup — a number, a date, a one-line reason field — where there is no
  judgment left in the call.
- A first draft used a fixed 14-line window to find a guard after a mutation and
  flagged two already-correct call sites whose checks sat 19 lines down.
  Narrowed by balancing brackets to the actual end of the statement.

Record the narrowing in the header. The reason a guard is narrower than the
spec's first draft is the most useful thing in it.

If narrowing is impossible without judgment, do not ship the guard. Write the
gap down in prose beside the code.

## Law 4 — mutation-test at birth. This is the step people skip

A guard is not trusted until you have watched it go red on a real violation and
green when restored. Do it before wiring it into the suite, and put the
transcript in the commit body. The house standard: *"All five were seen failing
on a real mutation and passing when restored"*; *"Both mutations proven to fail
before the fix and pass after."*

**The procedure.** For each assertion the guard makes, one mutation:

1. **Baseline.** Run the guard on the clean tree. It must exit 0. If it exits 1
   you have findings to fix first — a guard born red teaches nothing.
2. **Mutate a real file**, in the real tree, in the smallest way that violates
   the rule. Not a synthetic fixture unless the tree genuinely has no instance:
   a fixture proves your regex matches your fixture. Prefer editing a file the
   guard already scans, and prefer a mutation that a careless human would
   actually make.
3. **Run the guard. Assert exit 1, and read the message.** The message must name
   the file, the line, and the rule. Confirm it points at the line you mutated —
   a guard that fails for a different reason has passed nothing.
4. **MUTATE ONLY A FILE WITH NO UNCOMMITTED CHANGES. Check `git status --short
<file>` is empty first, or commit/stash your real work before you start. A guard
is born when a bug recurs — which is mid-feature, exactly when the tree is
dirty — and the restore below is `git checkout --`, which discards EVERY
uncommitted change to that file, not just your one-line mutation.

Restore exactly** (`git checkout -- <file>` or `git stash pop`), rerun,
   assert exit 0. `git status` must be clean of your mutation before you move on.
5. **Mutate the negative case too**, where one exists. If the guard is supposed
   to be *blind* to something, prove the blindness: the prose budget's own
   mutation test *"asserts that: put a hundred words in a comment and the count
   must not move."* An exemption nobody tested is an exemption nobody has.

A copy-pasteable shape:

```bash
node scripts/check-<rule>.mjs; echo "clean: $?"            # expect 0
# edit the real file to violate the rule (one line)
node scripts/check-<rule>.mjs; echo "mutated: $?"          # expect 1, message names that line
git checkout -- <file>
node scripts/check-<rule>.mjs; echo "restored: $?"         # expect 0
git status --short                                          # expect empty
```

Paste the three exit codes and the failure message into the commit body. A
mutation test you ran but did not record is, to the next reader, one you did not
run.

**Watch for the trap that fooled the first draft of a real guard here:** a
scanner that read string literals without stripping comments first matched from
one backtick in a comment to the next, swallowed the source between them, and
**reported PASS on a deliberately broken file**. Strip comments (blank them in
place, so line numbers stay true) before scanning, and let the mutation test be
the thing that catches you.

## Law 5 — a guard nobody can explain does not ship

*"A guard change nobody can explain is worse than a gap somebody wrote down."*

The header is not documentation, it is the guard's argument for its own
existence, and writing it is how you find out whether the guard should exist.
Required sections, in the file's top comment:

- **One line: what fails.** *"Fails when a server action performs an UPDATE or
  DELETE without checking that it actually affected a row."*
- **WHY A SCRIPT AND NOT A REVIEW NOTE.** The specific thing that makes review
  insufficient. Good ones name a mechanism: *"An UPDATE denied by RLS is not an
  error in Postgres: zero rows, success returned. So the failure is silent by
  construction — the UI says 'Saved', the database is untouched, and no log
  anywhere disagrees."* Or a number: *"'Write less' is a preference somebody
  argues with. A number a build fails on is not."*
- **WHAT IS ENFORCED AND WHY IT IS NARROWER THAN IT COULD BE** — Law 3's
  measurements, with the counts.
- **WHY NOT THE HEAVIER TOOL** where one exists (a custom lint plugin, an AST
  rule): what it would cost, and the condition under which it becomes right.
- **Known blindness.** Every guard approximates. Say what it cannot see —
  *"a drafter reached through an indirection is invisible to it"* — so the next
  reader does not mistake green for proof.
- **Usage line.** The exact invocation.

Every exemption entry carries its reason inline. *"Each entry is a reason, not a
silencer."* An exemption list with no reasons is a mute button.

If you cannot write the WHY, or cannot prove with a probe that the guard fires,
**do not ship it**. Record the gap in prose beside the code instead. The method
would rather have a written-down gap than an enforcement mechanism nobody
understands, because the latter fails silently and teaches people to trust a
green that means nothing.

## Wiring in

Add the script to the project's guard command from `.method/config.yml`
(`verify.guards`, or `verify.check` for the fast tree-scanners), following the
existing naming. Run the whole suite once after wiring — a guard that breaks a
sibling's assumptions is your problem, discovered now.

## Report

Guard path; the rule in one line; the recurrence evidence (the two occurrences,
by commit or file); the narrowing measurement (flags before / flags after); the
mutation transcript (clean 0 → mutated 1 with its message → restored 0); the
suite command it is wired into; and its known blindness.

## Refuses

- **To wire in a guard that has not been seen failing.** The mutation transcript
  — clean, mutated, restored — is what makes a guard a guard rather than a file
  that runs.
- **To write a guard on the first occurrence.** One bug is an incident; the
  second is a class, and only a class earns permanent enforcement.
- **To ship a guard whose failure message does not say what to do.** A red build
  that leaves the reader guessing gets disabled — and then the class is
  unguarded *and* invisible.
- **To hide a guard's blindness.** Every guard names what it cannot catch, so
  nobody mistakes its green for a broader guarantee than it makes.
