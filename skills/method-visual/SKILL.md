---
name: method-visual
description: Think in pixels and diagrams instead of prose. Two halves — REASONING, draw the surface before you build it (an ASCII box with the measures on it for layout, mermaid for flows and state), and VERIFYING, judge the rendered pixels and never the code (take the screenshot and READ it, measure getBoundingClientRect, sample colour through a 1x1 canvas rather than parsing a colour string, diff against the previous screenshot not against memory). Use when designing or changing any UI surface, before a layout decision, and whenever a visual claim is about to be made; when the user says วาดให้ดู / ดูรูป / diagram / sketch it / show me the layout / does it look right / screenshot it.
---

# method-visual

Prose is the wrong medium for a surface. A paragraph describing a layout can be
read three ways and none of them is measurable; a box with numbers on it can be
argued with. Half of this skill is drawing before you build. The other half is
refusing to believe your own code about what rendered.

## The failure this prevents

Two. First: a layout decision defended in prose, where nobody can see the
trade-off, so nobody catches that the most important thing on the screen is not
the biggest. Second, and more embarrassing: **a visual claim made by reading
source.** This project once reported **428 contrast failures** by regex-parsing
`oklch()` colour strings out of the stylesheet — an audit that produced hundreds
of confident findings and had never looked at a pixel. Zero of them were real in
the way they were stated.

---

# Part A — REASONING: draw it before you build it

## Draw the layout as an ASCII box, with the measures on it

Before writing a component, draw the surface. Put the numbers and the intent on
the drawing. The drawing is the decision — this project's composer is documented
exactly this way in a code comment, and the diagram is what made the argument
legible:

```
//     ╭─────────────────────────────────────────────────────╮
//     │  what should this article be about?                 │   <- the only
//     │                                                     │      thing with
//     │                                                     │      real weight
//     ├─────────────────────────────────────────────────────┤
//     │  [web search]  [pages to read]      0/300  [Generate]│   <- furniture
//     ╰─────────────────────────────────────────────────────╯
```

Rules for the sketch:

- **Annotate the hierarchy.** Mark what is the subject and what is furniture.
  If two things are both marked "the subject", the design is not finished.
- **Put measures on it** where they are load-bearing: the measure of a text
  column, the max-width, the gap, the breakpoint at which the arrangement
  changes. A number on the sketch is a number you can later go and measure.
- **Draw every state you intend to ship** — empty, loading, one item, many,
  error, at the cap. A layout that only exists in its happy state is one
  drawing short (hand the states themselves to `method-robust`).
- **Draw the narrow width too** if the arrangement changes. "Responsive" without
  a second drawing is an intention.
- **Keep the sketch.** Put it in the spec, or in the component's header comment
  where the next reader will hit it before they hit the JSX.

## Use mermaid for flows and state, not for layout

- **A flow** — what happens when the user clicks, including every failure exit:
  `flowchart`.
- **A state machine** — idle / drafting / streaming / failed / saved, with the
  transitions and what is on screen in each: `stateDiagram-v2`.
- **A sequence** — client, server action, model, ledger, database, with the
  timeouts marked: `sequenceDiagram`.

Do not draw layout in mermaid; boxes-and-arrows cannot express a measure. Do not
draw a flow in ASCII; you will get the branches wrong.

A diagram earns its place when it shows a **mechanism** — an ordering, a branch,
a boundary. A diagram that restates a list is decoration; write the list.

---

# Part B — VERIFYING: judge rendered pixels, never the code

The rule is absolute: **a visual claim is settled in the browser, on the running
page.** Source is your intention. The pixel is the fact.

## Take the screenshot, then READ it

Taking a screenshot is not verifying. Look at it and describe what is actually
there before you say whether it is right. Most false visual claims are made by
agents that captured an image and never examined it.

## Measure, do not eyeball

For anything you are about to claim about size, position, or spacing, measure it
in the live DOM:

```js
const r = el.getBoundingClientRect();   // width, height, top, left — the fact
getComputedStyle(el).fontSize;          // the resolved value, not the class
```

A comment here claimed a measure of "~510px". Measured, it was **583px and 76
characters** — because `ch` is the width of a ZERO, not of an average glyph.
Every adjective in a visual review ("too wide", "cramped", "aligned") has a
number behind it, and the number is what you report.

## Sample colour through a 1x1 canvas — never parse a colour string

Do not read a token, do not regex a stylesheet, do not reason about `oklch()`
arithmetic. Render the colour and read the pixel:

```js
const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
c.fillStyle = getComputedStyle(el).color;   // let the BROWSER resolve it
c.fillRect(0, 0, 1, 1);
const [r, g, b] = c.getImageData(0, 0, 1, 1).data;   // the actual sRGB pixel
```

This is the fix for the 428 false failures. The browser owns colour-space
conversion; you do not. The same rule covers the effective background: an
element's own `background-color` is often `transparent`, so walk up to the first
painted ancestor and sample *that*, or your contrast ratio is against nothing.

## Compare against the previous screenshot, not against your memory of it

Keep the before image. Put before and after side by side and name what changed.
Your memory of a layout is a description, and descriptions are exactly what this
skill exists to replace. For a clone or a parity claim, compare against the
reference image at the measured breakpoints, number to number.

## The two traps proved here

- **A stale dev-server stylesheet chunk means the browser can disagree with the
  source — and the browser is not always right either.** A token fix was proven
  correct in source and recorded as *NOT observed in browser*, because the
  running server was serving an old chunk. When source and DOM disagree, force a
  rebuild and a hard reload, then read again. Report the disagreement rather
  than picking the answer you prefer.
- **A strict-mode locator that matches too much throws, and the throw reads as
  "element absent".** A locator resolving to three elements throws; that is
  **inconclusive**, never a negative. Narrow the selector until it resolves to
  exactly one thing, then read its state. Counting first
  (`document.querySelectorAll(sel).length`) tells you which situation you are in.

## What you refuse

- **A visual claim with no rendered evidence.** "It looks right", "the spacing is
  consistent", "it's centred", "it matches the reference" — none of these survive
  without a screenshot you read and a measurement you took. If the page could not
  be rendered, the claim is *attempted, unverified*, and you say why.
- **A colour judgement made by reading a token instead of sampling the pixel.**
  Including contrast ratios, dark-mode checks, and "the accent is applied". The
  cascade, opacity, blend modes, and the colour space all sit between the token
  and the pixel.
- Reading a throw or a multi-match as absence.
- Reporting a diff of a layout from the diff of the code.

## Hand off

- A measure or ratio you want to hold forever → `method-guard`: a script that
  reads the computed value and fails the build beats a person re-measuring.
- Any "it renders / it is applied" claim → `method-verify`, which owns the medium
  map and the stale-chunk rule.
- The rendered result itself → `method-review`'s design-jury role, which measures
  every state at each breakpoint rather than judging one screenshot.

## Report

The sketch (inline, before the build). Then per claim: the screenshot path, what
you saw in it, the measurement with its selector and value, the sampled RGB where
colour is in question, and the before/after comparison. State plainly anything
you could not render, and never let it pass as observed.
