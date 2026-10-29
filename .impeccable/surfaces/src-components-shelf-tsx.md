---
version: 1
slug: "src-components-shelf-tsx"
primary_target: "src/components/shelf.tsx"
related_targets: ["src/app/globals.css"]
---

# Shelf quote bubbles

Approved by Alan on 2026-10-26. This is a local extension of About's existing visual system, in Experience mode. The existing quotes and authors, Geist, cover artwork, reveals, and input behavior remain authoritative.

## Direction contract

THESIS: Quotes feel like the Shelf is speaking, through soft bubbles related to the Blob buddy. Replace the rejected dark cards and accent lines completely.

OWN-WORLD: Use the existing pale-blue surface, dark blue ink, blue-tinted secondary text, softly unequal corners, a curved tail, and one low-offset soft shadow.

STORY: Exploring a game, film, or book reveals Alan's chosen quote. Content remains still and readable after a short jelly entrance.

FIRST VIEWPORT: One compact bubble sits clear of the pointer or above its focused cover. Quote first, author below, with generous internal padding. Reserve room for the tail and keep the entire shape inside the viewport on phones and short screens.

FORM: Alan selected soft speech bubbles, the first proposed direction. This is a precisely scoped component extension; no concept seed or new visual-world workshop applies.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Quality bar

- Match About's white canvas, pale-blue accents, and Geist rather than introducing a separate themed palette.
- Brief squash and stretch on reveal; restrained pointer following that settles. Reduced motion uses static positioning and no entrance transform.
- Readable quotes and attribution, a visible curved tail, no cutoffs at 320px or in a short viewport, and preserved keyboard/touch dismissal.
- The quote treatment remains local. Alan's later screenshot-requested correction also covers fitting the desktop Shelf row; it preserves the visual system and uses the existing raster assets.

## Desktop fitting correction

Alan requested that all five Shelf items fit in the desktop view without horizontal scrolling. Above 1000px, the Shelf is an inline-size container and its row uses `width: 100%`, 16px gaps, and `--shelf-unit: min(.88px, calc((100cqw - 112px) / 872))`. The five original hit widths total 872 units. The reserved 112px accounts for 48px of edge padding and four gaps totaling 64px, including clearance for reveals.

Cover, stage, vinyl record, open book, fixed hit-area dimensions, and reveal offsets all scale by the same unit. Text sizes remain unchanged. At 1000px and below, keep the full-size `1px` unit, 24px gaps, and existing horizontal scroller. Quote content, portal positioning, input handling, and reduced-motion behavior remain authoritative.

Targeted regression checks at 1440px, 1280px, and 1001px passed for all covers and the open-book extent.
