---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/site-shell.tsx", "src/components/mobile-navigation.tsx", "src/components/mobile-navigation.module.css", "src/components/use-menu-motion.ts", "src/app/globals.css", "src/app/about/page.tsx", "src/components/contact-panel.tsx", "src/components/site-footer.tsx", "src/components/alan-character.tsx", "src/components/alan-character.module.css"]
---

# Portfolio layout refinement

Alan approved the recommendations from the Faiz Intifada reference review on 2026-10-26. Experience mode. Refine the incumbent Geist, white, neutral and cobalt system; no new visual world or framework.

## Direction contract

THESIS: The projects lead. A quieter rail, short professional introduction and generous project previews give Alan's work room to be understood.

OWN-WORLD: Keep Geist, Caveat personal notes, the white canvas, blue details, Alan character, Blob buddy, portrait and Shelf. Simplify wrappers and control chrome, align sections and use consistent spacing.

READING PATH: Identity and role, introduction with CADIT context, four project previews with factual captions, experience, contact. The narrower sticky rail supports that path. Home and About retain their working navigation.

FIRST VIEWPORT: A 48px personality headline, readable introduction and the start of large 3:2 project images. Crop the supplied wide scenes around their existing product screens without inventing UI or stretching artwork. Project titles and captions sit outside the image without a surrounding gray card.

ADAPTATION: Desktop uses a 208px rail and a main column up to 960px, showing Alan's character only in the rail. Compact headers group identity and blob left with the menu alone at right. At 1000px and below, Home's character sits in a separate right column at 144px by 240px, reducing to 104px by 184px on phones and 96px by 168px below 360px. The phone headline spans both columns. About places its portrait top-right beside the introduction and omits the compact character. Projects use two columns where useful and one below 600px. Preserve portrait, greeting, and Shelf input behavior.

CONSTRAINTS: Project previews stay static until the Projects page is designed. Remove inactive View All, view switches and the dormant Projects menu entry. Preserve native cursor, magnetic fixed targets, character hand clearance, Contact modal, quote bubbles, reduced motion and touch behavior. Add no unsupported achievements, metrics, testimonials or project responsibilities.

## Quality bar

- Project screens are larger and more legible than the prior shallow banners.
- Shared section edges, clear image-caption grouping and generous section separation.
- No page-wide overflow at 320, 390, 600, 768, 1000, 1001, 1280 or 1440px.
- Existing greetings, Shelf reveals, portrait, Blob buddy and contact states continue to work.
- Finish with the mechanical detector, an independent review and accurate system documentation.

## Implemented result

Alan supplied a short handwriting recording for the name at the end of About. The closing note now uses custom vector Alan lettering, with a tall A, looped l, connected a/n, and a small underline. It writes once on first entering the viewport, using directional SVG mask transforms, WAAPI, linear pen timing, and the existing duration tokens. Full ink remains after completion, with static reduced-motion and no-JavaScript equivalents. The About heading and factual copy are preserved. Sources: `src/components/alan-signature.tsx` and its CSS module.

Alan requested the compact side menu from Olivier Larose's Awwwards Side Menu tutorial, then a neutral palette, soft shadow, and clipping correction through better-interface. His apple-design motion refinement replaces the separate clip/fade/perspective transitions with one critically damped spring, using a 0.3-second response and no bounce. The close target remains exactly over the hamburger, 16px inside the window. Transform and inverse-transform layers keep text crisp and controls fixed while the rounded surface expands. Labels, icon, and backdrop follow the same progress. Rapid reversals retain live position and velocity; the dialog remains active until dismissal settles. At 1000px and below the window uses ink navigation, gray social links, and a current-page dot, with its soft neutral shadow outside the inner overflow mask. Focus-safe internal spacing keeps outlines intact at scroll boundaries. It uses the existing Home/About routes, contact dialog, resume, and social profiles. Desktop navigation remains in the rail. Reduced motion uses the final state without spatial movement. Sources are `src/components/mobile-navigation.tsx`, its CSS module, and `src/components/use-menu-motion.ts`.

Alan subsequently requested an Experience list on About, above the Shelf, matching his supplied row reference. Show organization and role on the left, dates on the right, with fine separators; stack dates below the role on phones. Use the supplied CV entries for Freelance, Digistar Class Telkom and Startup Campus, adding CADIT as UI/UX Designer from October 2025 to present. No responsibilities or metrics are added to the compact list.

The approved refinement retains the incumbent identity. The shell uses a 208px rail, a 960px main-column limit, 640px reading width, 80px Home section gaps, and the responsive gutter and grid rules recorded in DESIGN.md. Home's heading is 48px on desktop. Its four 3:2 project images have factual captions beneath them, with no gray article wrapper or inactive view controls. The experience, contact panel, and footer share the main alignment; skill labels use fine separators. Shared navigation contains Home and About.

About's heading is 44px on desktop, 40px on tablets, 32px on phones, and 28px below 360px. The portrait floats at the top-right with proportional image cropping and a single-line caption inside its paper. Compact About omits the character; keyboard navigation goes from the portrait to the Shelf. A same-frame scroll-into-view preserves a new pointer Shelf reveal; later user scrolling still dismisses it. Portrait animation caches its DOM nodes for effect cleanup.

Alan's screenshot-requested correction reserves 16px above the sidebar character for its single-line greeting. Desktop bubble and tail center above the character, with maximum width `min(192px, calc(100vw - 48px))`. Compact layouts retain their right-aligned placement and viewport limit. The complete greeting and tail must stay visible without overlapping the identity. The greeting bubble exposes `data-character-part="greeting-bubble"` for regression checks.

Home uses a responsive grid instead of a paragraph float. Desktop has a single introduction column and only the sidebar character. When the sidebar is replaced by the hamburger, the larger Home character occupies a dedicated right-hand column with greeting clearance. On narrow phones the headline spans the row, leaving readable introduction text beside the figure. Regression checks cover a single visible Home character at every breakpoint, header grouping, top-right photo/text separation, character position and size, greeting clearance, portrait reveals, and hand boundaries.

The same correction fits all five Shelf items in the desktop row above 1000px by scaling artwork, fixed hit areas, and reveal dimensions together. The related Shelf brief records the exact container formula. Mobile and tablet keep the full-size horizontal scroller; quote content and portal behavior are unchanged.

## Finish evidence

The independent finish reviewer returned ship. Persistence, fidelity, ceiling, material fixes, and keep all passed with no material fixes. The desktop, mobile, About, 1280px, and preview screenshots in `.impeccable/review/` were inspected. All 15 Playwright tests and the production build passed, including TypeScript and static rendering.

The mechanical detector ran once before the final narrow fixes. Its advisory mismatches included component-local type, color, and radius values that predate this refinement. Documentation updates cover values changed by this refinement; unrelated pre-existing documentation debt is not promoted into new global rules or repaired in this pass. No shipping raster assets changed, so no new raster provenance record is required.
