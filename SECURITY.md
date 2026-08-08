# Security

## What this repository is

Markdown skill files and one dependency-free Node validator. There is no server,
no database, and nothing here handles your data. The realistic risk is not a
vulnerability in this code — it is that **a skill instructs an agent to do
something harmful in your repository.**

That is the threat this policy is about.

## Reporting

Use GitHub's **private vulnerability reporting** (Security → Report a
vulnerability) rather than a public issue, and expect a first response within a
week. Please include the skill, the instruction, and what an agent following it
would do.

Reports worth sending:

- A skill whose instructions could destroy work, exfiltrate data, or run
  something dangerous when followed literally by an agent.
- Wording an untrusted source could exploit — a skill that reads fetched content
  and treats it as instruction is a prompt-injection path, and this set has
  skills that read the web.
- A credential, token, or private URL committed anywhere in the history.

Not a vulnerability: disagreeing with a skill's advice, or an agent doing
something wrong for reasons the skill did not instruct.

## If you find a credential in this repository

Report it privately, and assume it is already compromised. `method-secrets`
states the rule this project holds itself to: **exposure is a rotation event,
never a cleanup event.** Deleting the line does not un-publish it. The fix is
rotate, revoke, confirm the old one fails, then clean up.

`scripts/validate.mjs` scans the tracked prose for credential shapes on every
push, which catches the common ones and is not a substitute for not committing
them.

## Using these skills safely

- **Read a skill before you run it.** These are instructions for an agent with
  access to your machine. The same is true of every skill repository, including
  the ones with more stars.
- **The security skills describe defensive review** — authorization tracing,
  threat modelling, secret handling, application and AI security. They are for
  systems you own or are authorised to test.
- `nzs-setup` installs tooling and asks before doing anything expensive or
  irreversible, such as indexing a whole repository. If a skill here ever takes
  an irreversible action without asking, that is a bug worth reporting.
