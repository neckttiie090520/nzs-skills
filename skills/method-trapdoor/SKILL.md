---
name: method-trapdoor
description: >-
  The web-specific sweep — IDOR and broken object-level authorization, injection,
  SSRF, unsafe redirects, file upload, CSRF and cookie posture, security headers,
  and what error responses leak. Each check names the request that proves it,
  never a pattern match. Use when reviewing an endpoint, a server action, a form,
  an upload, or anything that takes a URL or an ID from the caller.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# Method Trapdoor

The web checklist, ordered by what actually breaks applications rather than by
what is famous. `method-lockpick` asks who may reach a thing; this asks what they
can do once they are there.

Each item below is written as **the request that proves it**. A finding you
cannot express as a request is a suspicion.

## 1. Object-level authorization — the one that is actually everywhere

Any identifier that comes from the caller — a row id, a slug, a filename, a
tenant key, a signed-looking token — is a claim, not a fact.

**The proof:** take a legitimate request, change the id to one belonging to
another user, and send it authenticated as the first user. Anything other than a
refusal is the finding. Do this for **read, write, and delete separately** —
they are frequently guarded in different places, and delete is the one that gets
forgotten.

Watch for the sibling: an id that is not in the URL but in the body, or inferred
from an unvalidated `Referer`, a hidden field, or a client-supplied tenant header.

## 2. Injection, by sink

Injection is not one bug; it is a family named by where the data lands. For each
place caller data reaches a sink, name the sink and its correct escape:

- **SQL** — parameterised queries. String interpolation into SQL is the finding
  regardless of what validation ran first. Watch dynamic `ORDER BY` and table
  names, which parameters cannot cover — those need an allowlist.
- **Shell** — argument arrays, never a concatenated command string.
- **HTML** — the framework's escaping. Any raw-HTML sink (`innerHTML`,
  `dangerouslySetInnerHTML`, `v-html`) takes caller or model data only after
  sanitisation, and the better fix is usually to build elements instead so there
  is no raw sink at all.
- **Path** — resolve, then assert the result is inside the intended root.
  `../` filtering is a blocklist and loses to encoding.
- **Redirects** — an allowlist of paths. An open redirect is a phishing primitive
  that costs you nothing to prevent and your users their credentials.

## 3. SSRF — any URL the caller influences

If the server fetches a URL the caller supplied, chose from, or partly shaped:

**The proof:** point it at the cloud metadata endpoint and at `localhost`. If
either is reachable, the server is a proxy into your own network.

Defence is an allowlist of hosts plus resolving the DNS name and checking the
**resolved IP** is not private — checking the hostname alone loses to a name that
resolves to `127.0.0.1`, and checking once loses to a name that resolves
differently the second time.

## 4. Upload

Content type from the client is a hint. Verify the bytes; store outside the web
root or in object storage; generate the stored name yourself rather than trusting
the supplied one; cap the size *before* reading the body; and serve back with a
content type you chose and `Content-Disposition` where appropriate. An uploaded
file served from your origin with a type the uploader picked is stored XSS.

## 5. Session, CSRF, and cookies

- Cookies carrying identity: `HttpOnly`, `Secure`, and `SameSite` set
  deliberately — and if the answer is `SameSite=None`, say what needs it.
- State-changing requests need a CSRF defence unless the framework's own
  mechanism covers them and you can name it. "It's a POST" is not a defence.
- Logout invalidates server-side. A token still valid after logout is a finding.

## 6. What the response leaks

Stack traces, ORM errors, and driver messages go to the log, not the client. The
raw database error is the single most useful thing you can hand an attacker: it
names your tables, your columns, and your driver version.

Distinguishable failure modes are disclosure too — a login that fails
differently for "no such user" and "wrong password" enumerates your users, and so
does a 404 that takes measurably longer for records that exist.

## 7. Headers, briefly

`Content-Security-Policy` (the one that pays for itself), `Strict-Transport-Security`,
`X-Content-Type-Options: nosniff`, and a deliberate `Referrer-Policy`. Set them at
the edge so they cover every route, including the ones added after this review.

## What you refuse

- **To report a pattern match as a finding.** `innerHTML` on a string literal is
  not XSS. Trace whether caller data reaches the sink.
- **To check input validation before object-level authorization.** The ordering is
  the method; the second is where the expensive bugs live.
- **To recommend a blocklist** where an allowlist is possible.
- **To claim a fix works from the diff.** Re-send the request that proved the bug
  and show the refusal — `method-witness`, same medium rule.

## Output

Per finding: **the request that proves it → what came back → what should have →
the fix**. Then the checks you ran that found nothing, so the coverage is legible.
