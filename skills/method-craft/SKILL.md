---
name: method-craft
description: Software-engineering judgement for the change itself — find the seam it belongs in, make the smallest change that solves the real problem, name it honestly, respect the boundaries, and know when to refactor versus leave it. Enforces the standing instruction "build the simplest working solution first, don't over-engineer" against the model's own pull toward elaboration. Use before writing implementation code, when choosing where something lives, when tempted to add an abstraction, a layer, a config option, or a rewrite; when the user says ง่ายๆ / อย่าซับซ้อน / simplest thing that works / don't over-engineer / where should this go / should I refactor this.
---

# method-craft

The owner's standing instruction, verbatim: **"Build the simplest working
solution first. Don't over-engineer."** You are not naturally inclined to obey
it. Left alone you produce a factory where a function would do, a config option
nobody asked for, and a rewrite where an edit was the ask. This skill is the
counterweight.

## The failure this prevents

Elaboration that nobody requested and nobody can later remove. Every layer you
add is a thing the next reader must understand before they may change one line,
and it was added on a guess about a second caller that never arrived. The
second failure is its mirror: an edit made without tracing who else depends on
the thing edited — a change that looked one-line and was not.

## Step 1 — find the seam before you write anything

Do not open an editor first. Answer these, out loud, with file paths:

1. **What already does 90% of this?** Search for it by behaviour, not by name —
   the existing helper is rarely called what you would have called it. Extending
   a thing that exists beats adding a sibling that overlaps it.
2. **Where does this belong?** The layer that already owns this concern. A
   formatting rule belongs beside the other formatting rules; a price belongs
   beside the thing that prices. If you cannot name the owner, the concern has
   no home yet, and *that* is the design question — not your new file.
3. **Who calls it, and who will?** One caller means a function in the caller's
   file. Two callers in the same layer means a shared helper in that layer. A
   new module needs three, or a boundary reason.
4. **What is the real problem?** The reported symptom is often one instance.
   Fix the class only if you can point at the second instance; otherwise fix the
   instance and note the class (that is `method-tripwire`'s recurrence trigger).

## Step 2 — the smallest change that solves the real problem

Rank your options by blast radius and take the smallest one that actually
solves it. In order of preference:

1. Change a value or a constant.
2. Change one function's body.
3. Add a parameter with a default that preserves every existing call.
4. Add a function beside the ones it belongs with.
5. Add a file.
6. Change a signature every caller must follow.
7. Move or rename across modules.
8. Rewrite.

If you have chosen anything below line 4, say why lines 1–4 do not solve it.
"It would be cleaner" is not a reason; it is a preference, and preferences do
not get to spend the reader's attention.

**Solve it, though.** Simplest-first is not "smallest diff that makes the symptom
go away." A one-line patch that suppresses the error rather than fixing the cause
is not simple, it is cheap, and it will be paid for twice. Simple means: the
smallest change whose *mechanism* is the real fix.

## Step 3 — naming

The name is the interface. Name it for what it *is* at the call site, not for
how it is implemented — implementations change and the name then lies. Prefer
the vocabulary already in the codebase over the vocabulary in your head; two
names for one concept is a bug that hasn't happened yet. If naming it is hard,
the seam is wrong: a thing that needs an `AndAlso` in its name is two things.

## Step 4 — boundaries: what may import what

Boundary violations here do not fail loudly. **This project's server-only
boundary silently hands a client importer a function proxy instead of the
value.** No error, no crash — a value that is quietly the wrong type until
something downstream behaves absurdly. Assume every boundary you cross fails
this way.

The discipline that survives it, proved here:

- **A value used by both server and client is passed as plain data, never
  imported across the boundary.** The server reads it and passes it down as a
  prop or a serialised payload. Crossing the import boundary to "share" it is
  how you get the proxy.
- **Types may cross; behaviour may not.** A shared `types.ts` is fine. A shared
  module that reads env, opens a client, or touches a secret is not.
- **Before adding any import, name the direction.** UI imports domain; domain
  imports nothing from UI. An import that points backwards is the real defect,
  and the symptom you were chasing is downstream of it.

**Do not duplicate a NUMBER across a boundary either.** If a call site states a
limit and something else prices or enforces that limit, one of them must *read*
the other. Duplicated, they drift, and the day they drift the ceiling stops
describing the call it claims to bound — a bound that no longer bounds anything,
still rendered confidently on screen. Export the constant; have the other side
import it. (When the duplication is across a build boundary where an import
cannot reach, that is `method-tripwire`'s job: a guard that reads the source of
truth and fails when the two disagree.)

## Step 5 — comments record the WHY

Not what the code does — the reader can see that. A comment here carries three
things:

- **The why.** What forced this shape.
- **The measurement.** The number and where it came from. A comment claiming
  "~510px" was proved false by measuring 583px; if a comment states a number,
  it states how the number was obtained.
- **The alternative that was rejected, and why.** This is the part that stops
  the next person re-proposing it, and it is the part everyone omits.

A comment with none of these is noise. Delete it and let the code speak.

## Step 6 — refactor, or leave it

Refactor when: you are already changing this code and it fights you; the same
shape has now appeared a third time; or a name has started lying.

Leave it when: it is merely unlike how you would have written it; it works and
nothing is asking it to change; or the refactor is bundled into a feature commit
where the reviewer cannot separate the two. **A refactor rides its own commit**,
so the diff of the feature stays readable and the refactor can be reverted alone.

## What you refuse

- **An abstraction with one caller.** No interface, factory, strategy, registry,
  or generic parameter until a second real caller exists. The speculative
  abstraction is the single most common form of over-engineering, and it is
  always defended with a future that does not arrive.
- **A rewrite where an edit would do.** If you cannot state what the existing
  code gets *wrong* — not what it does *differently* — you are not rewriting,
  you are re-typing, and you are re-introducing every bug the original had
  already fixed.
- **A change whose blast radius has not been traced.** Before editing a shared
  thing, enumerate its callers and say what each one now does differently. "It
  compiles" is not a blast-radius trace; it is a syntax check.
- **A config option nobody asked for.** An option is a branch, a test matrix,
  and a promise. Pick the right default and ship one behaviour.
- **A control the server does not read.** If the UI offers it, something must
  act on it. Otherwise it is a lie with a nice affordance.

## Hand off

- A rule you keep re-explaining in review → `method-tripwire`, so a build fails
  instead of a person remembering. Duplicated constants across a boundary are
  the classic candidate.
- "The smaller change works" → `method-witness`. Simplest-first is a claim about
  behaviour, and it is settled in the medium, not by how confident the diff looks.
- The shape of the change once written → `method-gauntlet`, whose scrutinize role
  asks the question you cannot ask yourself: would a simpler thing have done?

## Report

The seam (where it went, and what already existed that you extended); the
options considered and why the chosen one is the smallest that solves the real
problem; the boundaries crossed and how each value travelled; any constant now
read rather than copied; what you refused to build, and the reason.
