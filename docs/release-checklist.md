# First implementation milestone

## Compact desktop rail, 2026-10-27

- Added a desktop-only toggle at the bottom of the rail. Collapsing takes the rail from 208px to 72px; the state lasts for the session and survives client-side navigation.
- The toggle holds the bottom of the sticky rail in both states, stays put while the page scrolls, and remains visible when the rail scrolls at short heights.
- The shell keeps its expanded outer width, so the main column absorbs the freed 136px. The content's right edge holds still and its left edge follows the rail. Full-column content widens while intro copy keeps its reading measure; the pressed toggle and page bounds no longer slide.
- One critically damped spring with a 0.36-second response drives rail width, label collapse, character exit, and icon centering from a shared `--rail-progress`. Reversals keep the live position and velocity. A non-negative frame delta guard keeps the spring from inverting when a frame timestamp predates the scheduling sample.
- Compact controls are 44px targets centered in the rail. Labels remain accessible names and gain native title tooltips. Identity copy leaves the tab order through aria-hidden and tabIndex -1, and the character wrapper becomes inert. The Blob buddy stays visible at 60px.
- Mobile navigation is unchanged. Below 1001px the rail renders expanded and the toggle hides; compact state returns at desktop widths. Reduced motion and hidden tabs snap to the endpoint.
- Test readiness now waits for a client-only `data-hydrated` marker instead of the server-rendered `data-paused` value, so a hover or click cannot land before the effects attach. Blob keyboard feedback is sampled per frame so the short Jelly state cannot be missed by a delayed poll.
- All seven compact-rail browser checks pass, covering control geometry and accessible names, the content handoff and fixed right edge, laptop heights at 1440, 1280, 1024, and 1001px, spring reversal, reduced motion and keyboard operation, mobile isolation, and the bottom position after scrolling. The full 31-check suite and the production build pass.
- Captures: [expanded](references/sidebar-expanded.png) and [compact](references/sidebar-compact.png).

## Portrait early-tap guard, 2026-10-27

- A tap can land after hydration but before the portrait's effect subscribes its spring. The revealed state was saved, but the effect started from a zero target, so the caption stayed hidden. The effect now reads the saved state when it mounts.
- The existing portrait check passes in the full suite. Normal pointer, keyboard, and touch input is unchanged.

## One Home character per layout, 2026-10-26

- Desktop Home now shows only the sidebar character. Removed the duplicate hero figure and its reserved grid column above 1000px.
- When the hamburger replaces the sidebar at 1000px and below, Home retains its existing right-hand character and responsive sizes.
- The responsive check passed across eight widths from 320px through 1440px and asserts exactly one visible Home character. The waving-hand check and production build also passed. Desktop and mobile captures were inspected.

## Reversible menu spring, 2026-10-26

- Applied Alan's apple-design request to mobile menu motion. A single critically damped spring with a 0.3-second response replaces the separate clip, fade, and perspective sequences. Opening and closing follow the same path, and rapid reversals retain the current value and velocity.
- The 44px toggle remains over the original hamburger throughout the transition. Transform and inverse-transform layers keep text at its natural width and controls fixed while the rounded window expands. Its neutral surface and soft shadow are preserved.
- Keep focus containment and scroll locking active until dismissal settles. The toggle can reopen the menu during closing. Reduced motion uses the final state without spatial animation; resize and unmount cancel the active frame work.
- All seven focused browser checks passed. New frame-level assertions verify the fixed toggle, constant text width, velocity continuity, repeated reversals, completed dismissal, and focus restoration. Existing narrow/landscape, enlarged text, RTL, forced-color, touch, reduced-motion, contact, and resume checks pass.
- The production build passed, including TypeScript and static rendering. Opening, closing, settled phone, and narrow-phone captures were inspected in `.impeccable/review/mobile-menu-apple-*.png` and `mobile-menu-*.png`.

## Neutral menu and interface review, 2026-10-26

- Applied Alan's requested neutral canvas/ink/gray palette, lighter backdrop, and soft shadow. The inner surface owns the reveal mask; its outer wrapper owns elevation. The complete 44px close control is inset 16px.
- Fixed focus-ring clipping at internal scroll edges, removed an incorrect expanded state from the close action, preserved full text access during enlargement, and retained the current-page dot, navigation, contact dialog, resume, and social links.
- All seven focused browser checks passed, including 320px sizing, 200% enlarged text, RTL, forced colors, reduced motion, contact handoff, and 10% animation playback. The production build passed with TypeScript and static rendering.
- [The better-interface review](reviews/mobile-menu-interface-review.md) covers all six owning domains, the three fixed findings, measured contrast, evidence, and verification limits. Verdict: Approve for the reviewed menu scope.

## Compact side menu, 2026-10-26

- Replaced the compact inline dropdown with the expanding rounded panel and perspective link reveal from Olivier Larose's supplied Awwwards Side Menu tutorial. Uses Geist, pale blue, cobalt, and the site's existing navigation, contact, resume, and social content.
- The overlay keeps page geometry fixed. It traps focus, locks background scrolling, supports Escape/backdrop dismissal, closes after navigation or desktop resize, and restores focus appropriately. Contact opens above it and returns to its menu trigger; the resume downloads directly.
- Verified both routes at 320, 390, 768, and 1000px, plus a 640px by 240px landscape viewport. Content scrolls inside short panels; the close control stays visible. Reduced motion removes clip expansion and perspective movement.
- All 19 Playwright checks passed, including existing portrait, Shelf, character, Blob buddy, and contact regressions. The production build passed with TypeScript and static rendering.
- Two bounded visual rounds confirmed compact layouts and the unchanged desktop rail. Evidence: `.impeccable/review/mobile-menu-*.png`. The single mechanical scan returned 40 documentation advisories and no non-advisory findings; the menu's local type and icon geometry are documented in DESIGN.md and its sidecar.

## Responsive introductions and header, 2026-10-26

- Compact headers now group identity and Blob buddy on the left and leave only the menu toggle on the right.
- About's portrait stays at the introduction's top-right at all sizes. Compact About removes the caricature; desktop keeps its sidebar figure. Text flows beside the photo and then uses the full width below it.
- Home uses a separate right-hand character column. Desktop and tablet figures match the 144px by 240px sidebar size; phones use 104px by 184px and narrow phones use 96px by 168px. The phone headline spans both columns. Greeting space is separate from paragraph text.
- The eight-width responsive check verifies header grouping, portrait position and text clearance, Home figure placement and sizing, and page-wide overflow. Greeting, wave, Shelf, keyboard/touch, and contact checks passed. The portrait caption was reduced to one line for the smaller phone print, and the affected portrait check passed again.
- Final captures are in `.impeccable/review/responsive-home-*.png` and `responsive-about-*.png`. The mechanical detector returned documentation advisories only.
- The final production build passed, including TypeScript and static rendering of Home and About.

## About experience list, 2026-10-26

- Added Experience immediately above the Shelf using Alan's supplied CV and visual reference. CADIT appears first with the existing UI/UX Designer role and October 2025 start, followed by Freelance, Digistar Class Telkom, and Startup Campus.
- Company and role sit left with dates right and thin row separators. Dates stack beneath the role below 600px.
- The existing responsive browser check passed at 1440, 1280, 1001, 1000, 768, 600, 390, and 320px, with no page-wide overflow or JavaScript errors. Desktop and phone captures were inspected.

## Greeting and desktop Shelf correction, 2026-10-26

- Alan supplied screenshots showing the greeting crowding the identity and the final Shelf item clipped by horizontal overflow. Those captures override the prior visual-review conclusion for these states.
- The greeting now uses a single line, centered desktop tail, and 16px of reserved sidebar clearance. The artwork mask remains separate from the bubble.
- Desktop Shelf geometry scales as a group to the actual content width, capped at 88% of the original size with 16px gaps. All five items and the open-book reveal fit at 1440px, 1280px, and 1001px. Compact layouts retain the existing full-size scroller.
- The new regression verifies bubble/identity separation, tail boundaries, cover bounds, and the open book without desktop overflow. It also checks mobile greetings at 320px and 390px on both pages.
- The full browser run passed 15 of 16 checks. The unrelated contact-arrow visibility check passed on its isolated retry. The single mechanical scan returned documentation advisories only.
- The final targeted regression also passed for mobile introduction text clearance and active record/greeting states. The production build passed, including TypeScript and static prerendering. The independent reviewer scored all six requested corrections resolved and returned `ship` for those fixes.
- Evidence: [1440px](../.impeccable/review/shelf-fit-1440.png), [1280px](../.impeccable/review/shelf-fit-1280.png), and [1001px](../.impeccable/review/shelf-fit-1001.png).

## Portfolio refinement, 2026-10-26

Alan approved the reference-review recommendations and requested implementation with Impeccable.

- Refined Home and About within the existing identity: slimmer rail, clearer CADIT context, larger screen-focused project previews with captions, consistent alignment, quieter typography, and a smaller mobile character.
- Removed dormant project-navigation and view-control treatments. Project previews remain static.
- Preserved the portrait, Shelf, Blob buddy, Alan character, native cursor, contact destinations, and magnetic controls. Fixed same-frame scroll dismissal of a newly hovered Shelf item and portrait callbacks reading cleared refs during navigation.
- All 15 Playwright tests passed after those corrections. The production build passed, including TypeScript and static rendering of Home and About.
- The mechanical detector ran once and reported design-system documentation advisories. The independent finish review returned `ship` with no material fixes for the authorized refinement.
- Final evidence: [desktop Home](../.impeccable/review/portfolio-desktop.png), [mobile Home](../.impeccable/review/portfolio-mobile.png), [desktop About](../.impeccable/review/portfolio-about-desktop.png), [mobile About](../.impeccable/review/portfolio-about-mobile.png), and [1280px Home](../.impeccable/review/portfolio-user-1280.png).

The historical first-milestone checklist follows.

Status: scope confirmed by Alan and implemented on 2026-10-24. Local preview and verification complete.

## Deliverable

A working Next.js website in `D:\Project\pen.dev Personal Web`, with Home and About and a local browser preview.

Use the [project brief](project-brief.md), [interaction spec](interaction-spec.md), and current FIX frames as the implementation references. Use the supplied design assets and reuse the older project's Alan character and resume assets.

## Pages and design

- [x] Home at `/` matches FIX 1 - Home.
- [x] About at `/about` matches FIX 1 - About.
- [x] Desktop layout, imagery, typography, spacing, colors, and visible copy follow pen.dev.
- [x] Shared navigation works between Home and About and indicates the active page.
- [x] Projects navigation, View All, project controls, and previews remain static, without fake destinations or interactive styling that promises a working action.
- [x] Light-mode mobile layouts use the agreed compact header/menu, smaller Alan character, single-column project previews, and horizontally scrollable Shelf.
- [x] Desktop, tablet, and narrow mobile layouts have readable content without page-wide horizontal overflow.

## Contact and destinations

- [x] The sidebar contact button and page contact CTAs open the same Contact modal.
- [x] The modal follows the supplied reference pattern and pen.dev design tokens, including channel hover surfaces and tooltips.
- [x] Email opens a draft to `alansahlanwork@gmail.com`, with a selectable address and copy fallback.
- [x] WhatsApp links to `https://wa.me/62881027208832`, derived from Alan's supplied `0881027208832`.
- [x] Instagram links to `https://www.instagram.com/alannshln/`.
- [x] The footer contains LinkedIn, Instagram, and Behance, using the recorded destinations.
- [x] The resume button downloads the existing `D:\Project\Personal Web\public\resume\alan-sahlan-resume.pdf`.
- [x] The modal has a visible close control, Escape/backdrop dismissal, focus containment and restoration, and background scroll locking. In short viewports it scrolls within the available height and keeps focused controls visible.
- [x] External profile and WhatsApp links open separately from the website; email uses the visitor's mail handler.

## Character, blob, and Shelf

- [x] Reuse the older Alan character's greeting, wave, pointer-aware head behavior, assets, and accessible input alternatives.
- [x] Blob idle states include restrained floating, breathing, glances, and blinking.
- [x] Blob pointer tracking uses the approved 24px neutral zone and 240px maximum response radius, with bounded tilt and pupil movement.
- [x] Blob activation squishes and settles smoothly, including on repeated presses.
- [x] Decorative tracking and idle animation pause when offscreen, in a hidden tab, or behind the Contact modal.
- [x] Shelf music covers reveal their records and information without navigating to music services.
- [x] The book, game/film quotes, and portrait follow the existing pen.dev interaction references.
- [x] Interactions support keyboard and touch, with reduced-motion behavior.

## Review and handoff

- [x] Compare the desktop implementation visually against the current FIX frames.
- [x] Check the modal, menus, tooltips, and reveal states with keyboard and touch-sized viewports.
- [x] Check reduced motion and repeated/interrupted pointer interactions.
- [x] Confirm image assets, resume download, and configured contact destinations are correct.
- [x] Run the production build and the project's configured code checks.
- [x] Provide a working local preview for Alan to review.
- [x] Keep future canvas edits as explicit page-sync requests, with pen.dev governing visual intent/copy and the repository governing the working implementation.

GitHub connection and public deployment follow review of this milestone. Hosting and paid services have not been selected.

## Sticky cursor and magnetic pill update, 2026-10-26

Alan subsequently removed the sticky cursor on the same date. Its component, overlay styles, registration, and cursor-hiding rule are removed. The magnetic/gooey pill and arrows remain unchanged. Current pill capture: [magnetic pill](references/magnetic-pill.png). The original validation below records the earlier combined change.

- Add the reference's following dot and spring-driven sticky, stretched cursor over contact controls. Keep it pointer-transparent and restore native input during keyboard use, scroll, navigation, text selection/editing, touch, reduced motion, forced colors, and the Contact modal.
- Reuse the arrow's Liquid Gooey and magnetic behavior for the sidebar Get in touch pill. Preserve its 144px by 44px shape, text/icon clarity, fixed target, immediate modal action, and focus restoration. Add clipping room without moving sidebar content.
- All 15 Playwright checks passed, including the new cursor/pill check, both existing arrow checks, laptop sidebar clearance, page layouts, and all existing interactions. Production build and TypeScript passed.
- Captures: [sticky cursor over the pill](references/sticky-cursor-pill.png) and [touch menu](references/magnetic-pill-mobile.png).

## Portrait print update, 2026-10-26

- Keep the photo print straight by default and rotate the entire print 2 degrees counterclockwise on reveal. Keep the image crop and size fixed while opening the white caption band below it.
- Use an interruptible critical spring, with keyboard and touch reveal and a straight reduced-motion alternative. Preserve the layout and keep the expanded print clear of the Shelf at 1440, 1001, 1000, 390, and 320px.
- All 14 Playwright checks and the production build passed. The portrait check covers exact angles, fixed crop and hit area, caption clearance, rapid hover reversals, keyboard, touch toggling, and live reduced-motion changes.
- Captures: [straight](references/portrait-straight.png), [desktop hover](references/portrait-hover-1440.png), [phone hover](references/portrait-hover-390.png), and [320px hover](references/portrait-hover-320.png).
- Follow-up: reduce the print size, shorten the spring response to 0.16 seconds, and replace unequal image sizing with proportional width and automatic height. The portrait check now verifies the displayed photo matches its natural aspect ratio. Portrait and responsive-layout checks passed again, along with the production build; the captures above show this final treatment.

## Magnetic contact-arrow update, 2026-10-26

- Add bounded magnetic hover and Liquid Gooey surface movement to the contact-panel arrow on Home and About. Keep the arrow crisp, the target fixed, and modal activation immediate.
- Include held compression, spring return, touch feedback, static reduced-motion and forced-color alternatives, and paused effects offscreen or behind the modal.
- All 13 Playwright checks passed, including both new contact-arrow checks and the existing layout, Contact modal, Shelf, Blob buddy, and Alan character checks. Production build and TypeScript passed.
- Captures: [magnetic hover](references/contact-magnetic-about.png), [held press](references/contact-gooey-pressed-about.png), and [compact layout](references/contact-magnetic-mobile.png).

## Initial verification

- Production build passed, including TypeScript checking. Both pages are statically prerendered.
- Ten Playwright browser checks passed, covering layouts at 1440, 1280, 1001, 1000, 768, 600, 390, and 320px; laptop sidebar visibility; contact destinations and focus, including a 640 by 240px viewport; Shelf mouse, keyboard, and touch states; blob tracking, held compression, jelly rebound, interruption, cancellation, modal pause, touch, and reduced motion; and the character's complete waving hand and return to rest.
- The copied resume matches the supplied file's SHA-256 hash.
- Rendered screenshots: [Home](references/implementation-home.png), [About](references/implementation-about.png), [mobile Home](references/implementation-home-mobile.png), [mobile About](references/implementation-about-mobile.png), [laptop sidebar and greeting](references/implementation-about-laptop.png), [game quote](references/implementation-about-quote.png), and [contact controls in a short viewport](references/implementation-contact-short.png).
- Local preview: http://127.0.0.1:3000.

## Blob motion update, 2026-10-26

- Add more varied idle drift, breathing, body skew, glances, and double blinks.
- Add attentive hover/focus feedback, held compression, and a spring-driven stretch and wobble on release, using the original artwork and fixed hit area.
- Retain position and velocity on rapid interactions. Cancel held states on pointer cancellation, lost capture, blur, or Escape.
- Keep touch, keyboard, reduced-motion, hidden-tab, offscreen, and Contact modal behavior.
- Browser captures: [pressed](references/blob-pressed.png) and [rebound](references/blob-rebound.png).

## Blob life update, 2026-10-27

- Replace the fixed blink and glance loops with scheduled quick, double, and slow blinks plus idle glances, settles, and perks. Keep the two-eye artwork and fixed 60px hit area.
- Make press reactions follow the contact point, add an eye pop on release, end long holds with a slow blink, and add a small head cock on keyboard focus.
- Let the eyes follow a leaving pointer for 650ms. Wake the blob with a lift and double blink after the contact modal closes, on tab return, and on first sighting.
- Keep touch, keyboard, reduced-motion, forced-color, hidden-tab, offscreen, and Contact modal pause behavior.
- All 24 Playwright checks, TypeScript, and the production build passed. Existing pressed and rebound captures refreshed.
- Browser captures: [idle](references/blob-idle.png), [blink](references/blob-blink.png), and [side press](references/blob-pressed-side.png).

## Shelf quote bubble update, 2026-10-26

- [x] Replace the dark quote cards and accent lines with Alan's selected soft speech bubbles. Share the pale-blue surface, dark-blue quote, muted-blue attribution, unequal corners, curved tail, and soft shadow across game, film, and book quotes.
- [x] Add a brief 360ms squash-and-stretch reveal and short pointer-follow easing, followed by a still resting state.
- [x] Anchor both quote and tail to the artwork with reduced motion. Respond to preference changes while a quote is open.
- [x] Keep exact quotes, authors, album titles, artists, artwork, vinyl/book reveals, fixed hit areas, keyboard focus, touch toggling, outside dismissal, and Escape.
- [x] Keep the whole bubble and tail inside 24px viewport gutters, including narrow and short screens.
- [x] Record the incumbent visual system and local extension in [DESIGN.md](../DESIGN.md) and [.impeccable/design.json](../.impeccable/design.json). No new shipping raster assets were added.

Verification for this update:

- The first full Playwright run passed all 11 checks. After the reduced-motion anchoring correction, all four affected Shelf, keyboard, and touch checks passed again. These include a stationary bubble and tail while the pointer moves, live reduced-motion changes, and restored pointer following when the preference changes back.
- The final production build passed after the reduced-motion correction, including TypeScript checking and static prerendering of Home and About.
- Visual review used refreshed [desktop](../.impeccable/review/desktop.png), [mobile](../.impeccable/review/mobile.png), [809px](../.impeccable/review/user-809.png), [320px](../.impeccable/review/user-320.png), [short viewport](../.impeccable/review/user-640.png), and [reduced-motion](../.impeccable/review/reduced-motion.png) captures. Per-item references: [game](references/quote-rdr2.png), [film](references/quote-inception.png), and [book](references/quote-witcher.png).
- The Impeccable detector returned no findings. The finish review requested reduced-motion anchoring and the missing design-system record; both changes are implemented and verification is complete.

## Polish review, 2026-10-24

- Match navigation, location, and action icons to the canvas's Lucide icons, while retaining its Phosphor social icons.
- Use image candidates that account for the enlarged portrait crop and game-cover crop, avoiding upscaling small optimized images.
- Match the game and film quote surfaces, accent rules, type spacing, widths, and corner radii to the FIX Shelf frame.
- Keep contact and resume actions visible at laptop heights by allowing the character to shrink. Keep the blob inside the identity row.
- Place the greeting above the character's face at desktop, tablet, and phone sizes.
- Allow 16px of extra artwork space on each side of the character frame so the raised hand remains visible in the compact About layout. The frame size and artwork position stay fixed.
- Keep horizontal Shelf overflow contained at intermediate desktop widths as well as on phones.
- Keep keyboard reveals open during native focus scrolling and reanchor their quotes. Schedule quote positioning when the pointer, viewport, or tooltip size changes.
