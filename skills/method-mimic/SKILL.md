---
name: method-mimic
description: >-
  Reverse-engineers an existing artefact — a whole site, a single screen, or a design
  system/component library — into this codebase by measurement rather than eyeball. Runs a scaled
  version of the five-phase extraction protocol (visual audit, component inventory, layout
  architecture, tech-stack analysis, documented output), copies real content and real assets
  verbatim, never copies someone else's brand or licensed imagery, and ends with a mandatory
  pixel-parity verification against the reference. Use when the request says clone / เลียนแบบ /
  "make it look like X" / "rebuild this page", or supplies a reference URL, a repo, or a folder of
  screenshots.
---
**No `.method/config.yml`?** Run `method-groundwork` first and come back. Reading a
config that does not exist is how a model invents a ledger name, a production
connection, or a verify command it has never seen.


# method-mimic

## The failure mode this exists to prevent

**Cloning a memory.** Asked to "make it like Linear", the model produces what it believes Linear
looks like, in adjectives it converts to plausible Tailwind classes, and reports a match it never
rendered. Two defects at once: the reference was never in hand, and the parity claim was
narrated instead of shown. Both are fatal. The reference must be **open in front of you**, and
every number must be **read off it**.

## 0. Preconditions

1. Read `.method/config.yml` — `references`, `mediums.rendered` (your browser driver), `verify`.
2. **The reference must be in hand.** A live URL you have fetched, a screenshot folder you have
   opened, a repo you have read. A product *name* is not a reference — send it to
   `method-scout` to acquire the real thing first.
3. Browser automation is required for a live reference. Without it you cannot measure, and
   without measurement this skill does nothing but guess prettily.
4. Confirm the project builds before you start changing it.

## 1. Pick the scale — the protocol scales, the rigour does not

`docs/research/INSPECTION_GUIDE.md` is this project's five-phase protocol. Scale it:

| Scale | Phases to run |
|---|---|
| **A whole site** | All five, in full: visual audit → component inventory → layout architecture → tech-stack analysis → documented output. |
| **A single screen** | Phases 1–3 scoped to that screen: its tokens, its component inventory, its layout grid, all of its states. Skip site-wide tech analysis. |
| **A design system / component library** | Skip layout entirely. Go deep on tokens, and on each component's **variants, states, and API shape** — the props and the state matrix are the artefact, not the page. |

Say which scale you chose and why, in the output doc. A site-scale sweep on a single button is
ceremony; a screen-scale sweep on a whole site guarantees you miss the grid.

## 2. Measure. Never eyeball.

These are read from the live artefact, not inferred from a screenshot and not recalled:

- **Colours** — computed values, at full precision. The design jury in this repo measured
  `lab(45.13 18.36 -71.70)` off the live DOM (9309afe). "Roughly indigo" is not a token.
- **The spacing scale** — collect the actual padding/margin/gap values across the artefact and
  find the scale they fall on. Do not assume 4/8/12/16.
- **The type ramp** — size, weight, line-height, letter-spacing for every distinct text role.
  A precedent: a comment's "~510px" claim was proven false by measuring **583px** (676fca5).
- **Border radii, shadows, z-index layers** — exact values.
- **Breakpoints** — **found by resizing**, not assumed from a framework's defaults. Sweep widths
  and record where layout actually changes.
- **Interaction model** — before writing anything interactive, determine whether a section is
  click-, scroll-, hover-, or time-driven. Scroll first, click second. Building click-tabs over a
  scroll-driven original is a rewrite, not a CSS fix.
- **Every state, not the default** — hover, active, scrolled, each tab, empty, error. Capture the
  computed styles in state A, trigger the change, capture state B. **The diff is the spec.**

Extraction snippet for a container (adapt per driver):

```javascript
(function (sel) {
  const el = document.querySelector(sel);
  if (!el) return JSON.stringify({ error: 'not found: ' + sel });
  const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'backgroundColor','padding','margin','width','maxWidth','display','flexDirection',
    'justifyContent','alignItems','gap','gridTemplateColumns','borderRadius','border',
    'boxShadow','position','zIndex','opacity','transform','transition'];
  const walk = (e, d) => d > 4 ? null : ({
    tag: e.tagName.toLowerCase(),
    text: e.children.length === 0 ? e.textContent.trim().slice(0, 200) : null,
    styles: Object.fromEntries(props.map(p => [p, getComputedStyle(e)[p]])
      .filter(([, v]) => v && !['none','normal','auto','0px','rgba(0, 0, 0, 0)'].includes(v))),
    children: [...e.children].slice(0, 20).map(c => walk(c, d + 1)).filter(Boolean),
  });
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

Write measurements to `docs/research/` (per-host subfolder for multi-target runs) before building
anything. A builder that has to guess a value is a builder you under-briefed.

## 3. Copy verbatim / never copy

**Copy verbatim.** Real text, real images, real video, real inline SVG, real alt text. AGENTS.md's
own law: *"Real content — use actual text and assets from the target site, not placeholders."*
Domain content comes verbatim from the knowledge base — *no invention*. Layered compositions are
common: enumerate **every** `<img>` and background-image inside a container, including
absolutely-positioned overlays, or the clone will look empty where the original looks full.

**Never copy, under any framing.** Not "just for the demo", not "we'll swap it later":

- Brand identity — name, logo, wordmark, trade dress.
- Licensed or stock imagery, and photography of real people.
- Tracking, analytics, and telemetry snippets.
- Code under a licence this project cannot carry.

The line: **structure and grammar are stolen; identity is not.** *Steal ideas, not products.*
If the request is explicitly to reproduce someone's brand, stop and say so — do not produce a
partial version and hope nobody notices.

## 4. Pixel-parity verification — mandatory, no exceptions

"It matches" is exactly the claim that gets asserted without evidence, so it is settled in the
rendered medium and nowhere else. Produce a **parity artifact**:

1. Side-by-side screenshots of reference and clone, at **every measured breakpoint** (not just
   desktop).
2. Spot-checked computed values compared **number to number** — type sizes, spacing, colours,
   radii — from *both* the reference and your build. Reading your own source code is not
   verification: a running server can serve a stale chunk, and a value proven in source has been
   flagged NOT observed in browser before (8d6a4d8).
3. A divergence list, every entry with a reason:
   - **Intentional** — our brand, our content, our licence constraint. Recorded, not a defect.
   - **Unintentional** — a defect. Fix it, or record it with its price; never let it pass silently.
4. Run the config's `verify` command. A clone that does not build is not a clone.

**No parity artifact, no clone claim.** If you could not render the comparison, the honest report
is *"built, parity unverified, because <reason>"* — never "done".

## 5. Refuse

- To clone from **memory** of what a famous product looks like. The reference must be in hand.
- To substitute **placeholder** content or lorem ipsum for content the reference actually has.
- To report parity you have **not rendered**. A description of a comparison is not a comparison.
- To copy anything on the never-copy list, regardless of how the request is framed.
- To hand a builder a spec containing an **estimated** CSS value. Every number is measured or the
  brief is not ready.
- To declare the interaction model without having scrolled the section first.

## 6. Hand off

- Measurements that should become **project-wide rules** (a token scale, a type ramp, a spacing
  budget) → **`method-distill`**. A clone produces components; only `method-distill` turns an
  observation into a rule that must state *why it applies here*. Skipping that step is
  cargo-culting by definition.
- The parity artifact and the divergence list → **`method-witness`**, which owns the "done" gate.
- New references you fetched → `config.references`, each with `for:` and `as_of:`, so later
  reviewers re-fetch rather than trust your description.
- For a full multi-page site rebuild with parallel builder agents, the house pipeline is
  `clone-website` — this skill is the measurement-and-honesty discipline that pipeline runs on.
