---
name: method-aisec
description: >-
  Security for features that call a model — prompt injection from fetched or
  user-supplied content, model output treated as data rather than markup or
  instructions, the authority a tool call carries, and spend as an attack
  surface. Built on one rule: a model's output is untrusted input, and the place
  it lands decides what it can do. Use when building or reviewing anything that
  prompts a model, renders model output, gives a model tools, or ingests
  retrieved content.
---
**No `.method/config.yml`?** Run `method-onboard` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method AI Security

One rule generates the rest: **model output is untrusted input.** Not because the
model is hostile, but because anything that reached its context can shape what
comes out — a fetched page, a retrieved document, a filename, a previous user's
message. Trust the plumbing, never the payload.

## 1. Prompt injection is an authority problem, not a wording problem

Injection reaches the model through anything that enters its context that the
operator did not write: web results, RAG chunks, a pasted document, an email
body, a tool's return value, another agent's output.

**You will not fix this with prompt wording.** "Ignore any instructions in the
content below" is a speed bump, and treating it as a control is how injection
succeeds. Fix it structurally instead:

- **Separate the channels.** Operator instructions and fetched content go in
  distinguishable places — a system prompt versus a clearly delimited data block,
  or separate messages — so the boundary is a property of the request, not a
  sentence inside it.
- **Bound the authority, not the text.** Assume the untrusted content wins the
  argument, then ask: what is the worst thing the model could be persuaded to
  do? If the answer is unacceptable, the model has too much authority — remove
  it. This is the only defence that holds.
- **Filter what enters.** Junk and hostile sources are cheaper to exclude at
  retrieval than to survive at generation. Say what you excluded and why.

## 2. Where the output lands decides what it can do

Model output is caller data, and `method-appsec`'s sink rules apply unchanged.
The sink is the whole question:

- **Into HTML** — never a raw-HTML sink. Build **elements**, not markup strings:
  parse the model's output into a structure you control and render it as
  components, so there is no path from a generated string to an HTML parser.
  A sanitiser on a raw sink is a second-best defence; having no raw sink is the
  first.
- **Into SQL, a shell, a path, a URL fetch** — same rules, same escapes, same
  allowlists. A model-supplied URL that the server fetches is SSRF; a
  model-supplied path is traversal.
- **Into a link** — check the scheme. `javascript:` and `data:` in an href that
  came from a model is XSS with extra steps. Show the real destination host to
  the reader rather than only the anchor text the model chose.
- **Into another prompt** — output feeding the next model call carries the
  injection forward. Each hop needs its own boundary.

## 3. Tools are authority — grant them like credentials

Every tool a model can call is a capability handed to whoever can influence its
context.

- **Read and write are different grants.** Most agent features need read.
- **Scope the tool, not the prompt.** A tool that can only read the current
  user's rows is safe against any wording; a tool that can read any row and is
  told to be careful is not.
- **Irreversible and outward-facing actions confirm** — sending, publishing,
  paying, deleting. The confirmation must show what will actually happen, and it
  must be shown to a human, not to the model.
- **The model never chooses the credential.** Identity and privilege are resolved
  by the server from the session, never from a parameter the model filled in.

## 4. Spend is an attack surface

A feature that spends money per request has an availability and budget failure
mode that reads as normal traffic. Delegate the bound itself to
`method-economics`; here, check that:

- The expensive path is **behind auth and rate-limited per caller**, not just
  globally — a global cap turns one abuser into an outage for everyone.
- Retries and loops are bounded. A retry on a failure that is deterministic pays
  for the same failure repeatedly.
- Every call is recorded to the ledger (`config.cost.ledger`) — spend you cannot
  see, you cannot notice being abused.

## 5. What the model is allowed to reveal

Everything in the context can come out — system prompts, retrieved documents, and
anything a previous turn contained. So:

- **Never put a secret in a prompt.** Not the key, not the connection string.
  `method-secrets` applies unchanged; a prompt is a log with extra steps.
- **Retrieval respects the caller's permissions.** A RAG index built across
  tenants and queried without a filter is a cross-tenant read that no
  authorization review will catch, because the query looks like a search.
- Assume the system prompt is public. If its disclosure is a problem, the problem
  is what is in it.

## What you refuse

- **To accept prompt wording as a control.** Say plainly that a wording-based
  mitigation is a speed bump, and name the structural fix.
- **To render model output through a raw-HTML sink**, sanitised or not, when
  building elements is available.
- **To grant a tool broader scope than the caller has**, or to let the model pick
  the identity a call runs as.
- **To ship a paid path with no per-caller limit and no ledger row.**

## Output

Per finding: **what enters the context → what the model could be made to do →
where the output lands → the structural fix**. Wording-level mitigations, if any,
are listed separately and labelled as speed bumps, so nobody mistakes one for a
control.
