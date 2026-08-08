---
name: method-verify
description: >-
  The evidence gate before any claim of done, fixed, or passing. For each claim it
  settles it in the medium where it is true — the DOM for rendered output, the
  compiled artifact for a style token, the ledger for cost, real rows for
  persistence, the built bundle for a build claim — never by reading the diff.
  Refuses assertion. Use immediately before committing, before saying a feature
  works, or before writing any success report.
---
**No `.method/config.yml`?** Run `method-onboard` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Verify

You are the gate. Nothing passes you on a report. Read `.method/config.yml` for
this project's `mediums` map and `verify` commands, then settle each claim in the
medium where the claim is actually true. Reading the file back is the *floor*, not
the ceiling — the diff shows your intention, not the fact.

First apply `method-doctrine`'s anti-theatre gate to your own output. Then, for
every claim, do the medium-specific settlement below and record the actual output.

## Settle the claim in its medium

Match the claim to its kind. Do not verify a claim of one kind in the medium of
another — that is the single most expensive trap in the corpus (the stale-chunk
precedent, 8d6a4d8: a token proven in *source* was flagged NOT observed in the
*browser*, because the running server served a stale chunk).

**Rendered output — the DOM.** "It renders / shows / is on the page" is settled by
querying the live DOM of the running server via the config's `mediums.rendered`
driver, not by reading JSX.
- Read the element's state, not just its presence: `getComputedStyle`, text
  content, attributes, ARIA.
- A strict-mode locator that resolves to *many* elements THROWS — that is
  **inconclusive**, never "not rendered" (a34fafc). Narrow the selector until it
  resolves to exactly the one thing, then read it.
- For structural claims, query directly:
  `document.querySelectorAll("form form").length` proves invalid nesting; a probe
  returning 0 is the evidence, not your reading of the tree.
- If the server may be serving a stale chunk, force a rebuild/reload before you
  read, or the DOM you read is a lie about older code.

**A style token — the COMPILED CSS artifact, not the source.** A CSS variable or
Tailwind token is settled in the built stylesheet or the computed style, e.g.
`outline-color: var(--ring)` resolved to its actual value in the browser (8d6a4d8).
Source that *sets* `--ring` is not proof the token *reaches* the element — cascade,
specificity, and stale builds all break that link. Measure the computed value; the
juries measured `lab(45.13 18.36 -71.70)` off the live DOM (9309afe) and proved a
comment's "~510px" false by measuring 583px (676fca5). Measure, do not eyeball.

**Cost — the named ledger.** A money claim is settled against `config.cost.ledger`
(the `ai_usage` table here), reading the real recorded spend — never estimated
from token math in your head. Bounds obey doctrine law 3: a ceiling rounds UP
(`config.cost.ceiling_fn`); unknown cost is shown **null, not zero**. Sweep
history where a bound is claimed: no past record may exceed the ceiling it would
have been quoted.

**Persistence — real rows read cold.** "It saves / persists" is settled by reading
the row back from the database (`config.mediums.persistence`) in a *separate* read
after the write, ideally a fresh connection. The write call returning success is
not the row existing. For scoping/authorization claims, prove the negative too: a
cross-tenant request must return **0 rows**, read from the DB, not inferred from
the filter in the diff.

**A build / typecheck / lint claim — the command's exit code and output.** Run the
config's `check` / `build` / `guards` command and read its actual output and exit
status. "The build passes" without the command having run this session is
narration. `<verify> exits 0` is the fact a build produces; paste it.

**A guard claim — seen failing, then passing.** Delegate to `method-guard`: a
guard is verified only by its red-on-mutation / green-on-restore transcript.

## The two non-negotiables

1. **A report is not evidence.** If you cannot name the command, query, or DOM
   assertion *and its actual output* for a claim, the claim is "attempted,
   unverified" — say so and say why it could not be settled. 45e1dde shipped a
   fallback precisely *because* the first fix could not be verified (free-tier key
   out of quota) — an honest downgrade, not a narrated success.

2. **"We never tried it" and "it works" are different states — say which.** The
   SKIPPED-loudly principle (`test-cost-preview.mjs`): a check that could not run
   is reported as SKIPPED, loudly, with the reason — never silently counted as a
   pass. A skip dressed as a pass is theatre.

## Refuses

- To accept a report, a diff, or a tool's "success" message as evidence of the
  running system's behavior.
- To confirm a rendered fact from source, a cost from token math, or a
  persistence fact from the write call — wrong-medium verification.
- To read a throw or a multi-match as a negative result.
- To count a check that did not run as a pass.

## Output

For each claim, one line: the claim, the medium, the exact command/query/assertion,
its actual output, and the verdict (**verified** / **attempted, unverified —
reason**). Hand the verified set to `method-ship` or the caller; hand any
unverified claim back as a defect or a priced record, never as a quiet pass.
