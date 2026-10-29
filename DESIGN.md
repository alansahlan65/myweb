---
name: "Alan Sahlan's personal website"
description: "The implemented Home and About visual system, with shared layout tokens and About's Shelf quote bubbles."
colors:
  canvas: "#fff"
  ink: "#0a0a0a"
  secondary: "#626262"
  muted: "#707070"
  subtle: "#f7f7f7"
  secondary-action: "#f2f2f2"
  hover: "#e8e8e8"
  action-hover: "#303030"
  border: "#e7e7e7"
  border-control: "#d6d6d6"
  cobalt: "#245bc2"
  blue-surface: "#edf3ff"
  blue-secondary: "#50698b"
  scrim: "#0a0a0a66"
typography:
  display:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "48px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.03em"
  headline:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.4px"
  about-heading:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.03em"
  contact-heading:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.025em"
  project-title:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-.02em"
  introduction:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "17px"
    lineHeight: 1.65
  project-description:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "14px"
    lineHeight: 1.6
  project-category:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "12px"
    lineHeight: 1.5
  body:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  hand:
    fontFamily: '"Caveat", cursive'
    fontSize: "24px"
  compact-navigation:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "clamp(30px, 8.5vw, 40px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-.03em"
  compact-social:
    fontFamily: '"Geist Variable", "Geist", Arial, sans-serif'
    fontSize: "13px"
    lineHeight: 1.5
rounded:
  radius-small: "8px"
  radius-large: "16px"
  radius-pill: "9999px"
spacing:
  page-gutter: "48px"
  rail-width: "208px"
  rail-compact: "72px"
  layout-gap: "64px"
  content-width: "960px"
  reading-width: "640px"
  section-gap: "80px"
  artwork-gap: "28px"
components:
  primary-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.radius-pill}"
    padding: "12px 20px"
  secondary-button:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.radius-pill}"
    padding: "12px 20px"
  nav-item:
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.radius-pill}"
    padding: "12px"
  rail-toggle:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.radius-small}"
    padding: "0"
  skill-tags:
    textColor: "{colors.secondary}"
    padding: "0"
  project-card:
    textColor: "{colors.ink}"
    padding: "0"
  project-artwork:
    backgroundColor: "{colors.subtle}"
    rounded: "{rounded.radius-large}"
  contact-panel:
    backgroundColor: "{colors.blue-surface}"
    textColor: "{colors.blue-secondary}"
    rounded: "{rounded.radius-large}"
    padding: "40px"
  quote-surface:
    backgroundColor: "{colors.blue-surface}"
    textColor: "#18365b"
    rounded: "26px 30px 28px 12px"
    padding: "22px 24px"
---

# Design system: Alan Sahlan's personal website

## Overview

This records the existing Home and About implementation. White space, dark text, restrained cobalt accents, and cover artwork carry the pages. The Alan character and Blob buddy provide the site's playful interactions. Geist carries the interface and prose; Caveat marks personal notes.

The Shelf quote bubble is a local extension approved on 2026-10-26. Its pale-blue fill relates to the existing Blob buddy and contact panel. It does not replace the site's buttons, Contact modal tooltips, or other containers.

Key characteristics:

- A white canvas with gray controls and fine separators.
- Rounded controls and artwork within flat project articles.
- Brief input feedback with keyboard, touch, and reduced-motion alternatives.

## Colors

The frontmatter preserves the shared color names from `src/app/globals.css` and records the scoped blue-secondary text color used by contact and Shelf attribution.

### Primary

- `cobalt` marks the product-designer role, experience heading, social hover states, and Shelf keyboard focus.
- `blue-surface` fills the contact panel, text selection, and Shelf quote bubbles.
- `blue-secondary` supports contact-panel copy and Shelf attribution. Its use remains scoped to these blue surfaces.

### Neutral

- `canvas` and `ink` provide the page background, primary text, and inverse primary actions.
- `secondary` and `muted` support secondary copy and location text.
- `subtle` and `secondary-action` fill artwork fallbacks, secondary buttons, and active navigation. Project articles and skill labels sit directly on the canvas.
- `hover` and `action-hover` provide light and dark control hover states.
- `border` and `border-control` separate sections and outline controls. `scrim` dims the page behind the Contact modal.

The Shelf quote text keeps its component-local dark blue from the frontmatter. The related Shelf surface brief remains authoritative for its local treatment and behavior.

## Typography

Geist Variable and Caveat are loaded locally through the packages imported in `src/app/layout.tsx`. The frontmatter captures recurring roles and the desktop Home display style.

- Home's main heading uses the display role, then `clamp(34px, 6vw, 44px)` at 1000px and below. Its line height and tracking remain unchanged.
- About's main heading uses the about-heading role, reducing to 40px in the compact layout, 32px below 600px, and 28px below 360px. Location follows immediately beneath it.
- Contact-panel headings use the contact-heading role and reduce to 30px in the compact layout.
- Project titles, categories, and descriptions use their respective roles. The headline role remains in the Contact modal; it no longer describes project titles. The Shelf heading remains 26px on desktop and 24px in the compact layout.
- Home and About introductions use the introduction role. Home reduces to 16px in the compact layout; About reduces to 16px below 600px. Regular body copy uses the body role.
- The shared identity uses 20px name text and a 14px role. Below 360px, the role uses 13px.
- Caveat appears in personal notes, the Shelf prompt, and the portrait caption. Alan's closing signature uses custom vector lettering. Quote typography is unchanged.
- Shelf quotes use Geist at 15px, weight 450, line height 1.55, and letter spacing -.08px. Attribution is 12px, weight 400, with a 1.5 line height. At viewport heights of 400px or less, quote text is 14px with a 1.5 line height.

## Layout

The frontmatter's spacing tokens define the desktop shell: a sticky rail, a separate main column that rests at content-width, and shared outer gutters. The combined maximum shell width is 1328px. That outer width is fixed to the expanded rail, so collapsing the rail hands its freed width to the main column: the content's right edge stays put while its left edge moves left. At 1250px and below, page-gutter becomes 40px and layout-gap becomes 48px; outer widths stay fixed. At 1000px and below, the shell becomes a single column up to 848px, with a compact identity header, overlaid side menu, and 24px gutters. Below 360px, gutters are 20px.

Home uses section-gap between its main sections, reducing to 64px in the compact layout. Its introduction stops at reading-width, while project previews, experience, contact, and footer share the main column's edges. About retains 64px between sections on desktop and 48px in the compact layout.

Project previews use two columns at widths of 600px and above, and one column below 600px. The desktop grid uses 40px row gaps and artwork-gap between columns. Compact layouts use 32px row gaps and a 24px artwork-gap. Each image has a 3:2 frame, followed by its caption after 16px.

The compact header groups the name, role, and Blob buddy together on the left, with only the menu toggle on the right. Desktop keeps the existing identity arrangement in its rail.

The sidebar Alan character occupies 144px by 240px and can shrink vertically to 160px in a short viewport. A 16px top margin reserves clearance for its greeting. Desktop Home shows only this sidebar character; its introduction has no separate figure or empty character column. At 1000px and below, the hamburger replaces the sidebar and Home shows a right-hand 144px by 240px character beside the introduction. Below 600px, the headline spans both columns while the introduction and 104px by 184px character sit side by side. Below 360px the character is 96px by 168px. A separate greeting allowance keeps the bubble clear of text. About has no character in its compact layout; desktop retains the shared sidebar character.

The desktop Alan greeting stays on one line, with maximum width `min(192px, calc(100vw - 48px))` and both bubble and tail centered above the character. Compact Home positions the bubble 12px above its figure. Below 600px the greeting wraps inside the character column at 12px, with its tail centered. Keep the complete greeting and tail clear of text and within the page.

The Shelf is an inline-size container. Above 1000px, all five items fit within a full-width row using 16px gaps and `--shelf-unit: min(.88px, calc((100cqw - 112px) / 872))`. The five original hit widths total 872 units; 112px reserves 48px edge padding and four gaps totaling 64px. Cover, stage, record, book, and reveal dimensions scale together while text sizes stay unchanged. Each hit area stays fixed during its reveal. At 1000px and below, the Shelf retains its full-size `1px` unit, 24px gaps, and horizontal scroller.

Quote bubbles render in a fixed portal outside that scroller. Their 320px preferred width shrinks within 24px viewport gutters, with 14px reserved above and below for the tail. Positioning also respects the visual viewport and flips above or below the artwork or pointer when space requires it.

## Elevation & Depth

Most page containers use tonal fill or a fine border. Artwork reveals and transient overlays add depth where needed. The portrait has a one-pixel border-like shadow. The Contact modal uses a broad shadow over its blurred scrim. Shelf bubbles use one soft, low-offset drop shadow around the whole bubble and curved tail: `drop-shadow(0 8px 12px #183d7318)`.

## Shapes

The shared small and large radii frame artwork and containers. Navigation, buttons, and circular controls use the pill radius. Project article wrappers and skill labels have no filled container. The Shelf bubble has softly unequal corners, with the alternate below-artwork placement reversing their arrangement to `12px 28px 30px 26px`. Its 28px by 14px curved SVG tail shares the fill and shadow of the body. It has no accent line.

## Components

### Buttons and navigation

Primary actions use canvas text on ink; secondary actions use the subtle fill with ink text. Pill buttons have a 44px minimum height and an 8px icon gap. Their active state scales to .97. Navigation uses secondary text, a gray fill and ink text for the current page, and a subtle fill on fine-pointer hover. Keyboard focus uses a two-pixel outline with four-pixel offset.

### Blob buddy

The Blob buddy sits beside the identity. It keeps the original 46px artwork, cobalt fill, and two white eyes. No eyebrows or mouth are added. Its idle motion combines floating, breathing, a gentle body skew, scheduled blinks, and small glances. Blinks vary between quick, double, and slow. Idle beats add a glance, a settle, or a tiny perk every few seconds.

Pointer proximity drives the gaze, tilt, and a small lift. Hover widens the eyes and adds elastic entry feedback. Keyboard focus adds a slight head cock. Presses follow the contact point, with the eyes looking toward it. Release pops the eyes before the face settles. Closing the contact modal or returning to the tab wakes it with a small lift and a double blink.

Keep the eyes as the only facial feature. Reduced motion, forced colors, hidden tabs, offscreen positions, and the Contact modal pause the decorative motion and scheduled reactions.

### Desktop compact rail

Above 1000px, the rail can collapse from 208px to 72px with a 44px toggle at the bottom of the sidebar. The toggle uses a 1px border-control border, the 8px small radius, a 16px Lucide ChevronsLeft icon, and the same hover and press treatment as the other secondary controls. Its icon rotates 180 degrees as the rail closes. The accessible label switches between Collapse sidebar and Expand sidebar, and aria-expanded reports the rail state.

The toggle holds the bottom of the sticky rail in both states. Its auto margin carries it down on tall viewports, and sticky bottom positioning keeps it visible when the rail scrolls at short heights.

One critically damped spring with a 0.36-second response drives a shared `--rail-progress` value. Rail width, label widths, navigation padding, action alignment, character exit, and icon centering all read that value, so a reversal keeps the live position and velocity. The shell keeps its expanded outer width, so the second grid column absorbs the 136px the rail gives up. The content's right edge holds still and its left edge follows the rail, which keeps the pressed toggle and the page's outer bounds from sliding under the pointer. Full-column elements such as the project grid, experience rules, footer, and contact panel widen with it, while intro copy stays at its reading measure. Labels stay in the DOM for accessible names and collapse with max-width and opacity. They fade faster than the geometry so half-words do not linger. Navigation, Get in touch, resume, and the toggle are 44px targets centered in the 72px rail. Navigation, contact, and resume add native title tooltips in compact mode.

The Blob buddy stays visible at 60px and centered at the top of the rail. The identity copy leaves the tab order through aria-hidden and tabIndex -1, and the character wrapper becomes inert. The character loses height and fades, so its artwork scales uniformly instead of squashing.

The mode is desktop-only and lasts for the session. It survives client-side navigation but not a reload. At 1000px and below the rail renders expanded, the toggle is hidden, and the compact state returns when the viewport crosses back above 1000px. Reduced motion, hidden tabs, and live preference changes snap to the endpoint without a spring transition.

### Compact side menu

At 1000px and below, the hamburger opens a neutral canvas panel anchored to its top-right corner. This adapts [Olivier Larose's Awwwards Side Menu](https://blog.olivierlarose.com/tutorials/awwwards-side-menu): a rounded expanding window and staggered perspective links. Use Geist, ink text, secondary text for social links, and the existing 16px radius. A current-page dot and aria-current identify the active page. Desktop retains its sidebar navigation.

The panel is at most 420px wide and 520px tall, constrained to the available viewport. Measure the hamburger when opening: the panel extends 16px above and beyond its trailing edge, with a minimum 4px viewport clearance. Its 44px close control remains exactly over the hamburger, 16px inside the panel, with ink strokes on secondary-action fill. The two icon strokes have 1px rounded ends. Home and Know me better use the compact-navigation type role and wrap rather than overflow. Contact and resume use the existing 44px pill controls; resume uses subtle fill. LinkedIn, Instagram, and Behance use the existing profile destinations, compact-social text labels, and 14px external-link arrows. Separate groups with space. A scrollable content area keeps every link reachable in short landscape viewports while the close button stays visible. Eight-pixel block padding, scroll padding, and target scroll margins preserve complete keyboard focus rings at the scroll edges.

The inner surface provides rounded overflow masking and the outer wrapper provides soft elevation. Keep the shadow layers `drop-shadow(0 12px 24px #0000000d) drop-shadow(0 4px 8px #0000000a)` and neutral `#0000001f` backdrop. One critically damped spring with a 0.3-second response drives both opening and closing. It retains position and velocity when retargeted. The surface expands from the button with transforms; an inverse transform keeps text and the close target at their natural size. Compensate the corner radii during scaling. The opaque surface returns along the same path on close; the backdrop follows its progress. Content reveals in a short sequence derived from that same progress, with at most 8px of vertical travel. Morph the two hamburger strokes into the close icon with the same spring. There are no separate reveal timers or perspective flips.

Keep the dialog mounted, focus contained, and scrolling locked until the spring reaches its closed endpoint. The close control can reopen the menu during dismissal, carrying the current velocity. Page selection still closes the menu and focuses main content afterward. Reduced motion applies the final geometry and state immediately, and changing that preference during a transition cancels the spatial movement. Local controls press to scale .96; hover colors respond immediately. Forced colors use system outlines instead of shadow for separation. Source: `src/components/use-menu-motion.ts` and the shared mobile navigation component.

The menu contains keyboard focus, locks background scrolling, closes through Escape or its backdrop, and returns focus to the hamburger. Selecting a page closes the panel and focuses the main content. Resizing to desktop also closes it. Get in touch opens the existing Contact modal above the menu; closing contact returns to the menu action. Resume downloads keep the menu available.

### Skills and project previews

About's Experience section sits between the introduction and the Shelf. Four rows list CADIT, Freelance, Digistar Class Telkom, and Startup Campus using the supplied CV and current CADIT context. Each row has a 15px semibold organization name, a 14px secondary role beneath it, and 13px secondary dates aligned right. Fine separators divide the rows. Below 600px, dates stack beneath the role. The section heading follows About's existing heading scale.

The skill list uses flat 12px labels with fine vertical separators, an 18px line height, and 8px by 12px wrapping gaps. It has no pill fill or action states.

The four project previews are static articles. Rounded artwork carries the image; titles, categories, and descriptions sit outside it on the canvas. Images use cover crops focused on the existing product screens: Paylecta at 90% center, PawFriend at 85% center, and Aurelia and Munchpal at right center. Responsive image source sizes account for the roughly twofold cover crop. Preserve image proportions and the supplied artwork.

Home has no inactive view switch or View All control. Shared navigation exposes Home and About; the dormant Projects menu entry is removed until that page is designed.

### Contact panel

The pale-blue panel shares the main column's alignment. Supporting copy uses blue-secondary and a 16px size with 1.6 line height. Padding reduces from its desktop component token to 32px at 1250px and 24px in the compact layout. The existing magnetic arrow and Contact modal behavior remain authoritative.

### Personal photo print

About's portrait is straight at rest. Hover, keyboard focus, or touch reveal rotates the complete print 2 degrees counterclockwise, including the photo, white paper, and caption. Keep the photo's size and crop fixed. The paper extends into the existing gap for the caption without moving the header or Shelf.

Use a quick, critically damped spring with a 0.16-second response, preserving velocity when the interaction reverses. Animate the print rotation, paper scale, and caption opacity only. The fixed button remains the layout anchor. Reduced motion reveals the caption on a straight print without animated movement. Caption spacing stays inside the paper at compact sizes.

The print stays at the introduction's top-right, with text flowing beside it and then using the full width below it. It is 248px wide on desktop, 220px in compact desktop, 184px on tablets, 128px below 600px, and 104px below 360px. The image uses a uniform 160% width crop with automatic height and bottom alignment, preserving the original photo's proportions. Phone captions remain on one line, at 18px below 600px and 16px below 360px, inside the existing caption band. Do not set independent image width and height percentages.

### Magnetic contact controls

Home and About's contact-panel arrow retains its circular ink surface and white Lucide icon. Its visible diameter is 64px on desktop and 48px in the compact layout. A fixed target includes 14px of extra pointer area around the circle; its center does not move with the artwork.

The sidebar's Get in touch pill shares the same component and liquid behavior. Keep its 144px by 44px footprint, white MessageCircle icon, and 14px label. Its pointer margin is 8px, and the sidebar reserves extra clipping room without changing content alignment. Limit its magnetic travel using the shorter 44px dimension.

Fine-pointer hover attracts the surface toward the pointer, limited to 18% of the diameter. Independent springs use stiffness 100, damping 10, and mass 1, carrying velocity through direction changes and returning to center on leave. Liquid Gooey's Move effect gives the silhouette a soft trail and velocity deformation. The arrow lives on a separate, unfiltered layer. A held press compresses the surface, and release rebounds. Opening the Contact modal remains immediate.

Touch gets press feedback without magnetic tracking. Reduced motion and forced colors use a static circle and native keyboard focus. Decorative motion stops offscreen, in a hidden tab, and behind the Contact modal. Source: `src/components/magnetic-contact-button.tsx` and its CSS module.

### Alan signature

About's sign-off after Sincerely uses a custom monoline Alan, with a tall capital A, looped l, connected lowercase letters, and a light finishing underline. The original copy and introduction heading remain unchanged. The ink uses the existing ink token, 2.8-unit round strokes, and a 1.8-unit underline in a 240 by 120 SVG viewBox. The component is 192px by 96px, reducing to 176px by 88px below 600px, with a 12px top margin.

This is a first-arrival delight, not a repeating decoration. Write once when at least 80% of the signature enters the viewport, then leave the complete name visible. Ten pen segments follow their natural drawing direction through animated clip-mask rectangles. WAAPI animates only the masks' transforms with linear pen timing. Segment durations reuse motion-fast, motion-base, and motion-slow, totaling 1660ms at the current token values. No runtime or font dependency is added.

Keep accessible text Alan in reading order and hide the decorative SVG from assistive technology. Reduced motion displays the full signature immediately; changing the preference while writing completes it without movement. The full vector signature is also visible without JavaScript. Unmounting cancels animations and disconnects the observer. Source: `src/components/alan-signature.tsx` and its CSS module.

### Native pointer

Use the browser's native cursor throughout the site. Alan removed the sticky-cursor effect on 2026-10-26. Keep the magnetic and gooey contact controls without a cursor overlay or cursor-hiding styles.

### Shelf quote bubbles

Game, film, and book quotes share one pale-blue speech-bubble treatment. Quote and attribution have a 10px gap. Keep the exact quotes, authors, album titles, and artists in `src/components/shelf.tsx`.

Fine-pointer hover reveals a quote after 90ms. The bubble follows with short easing, then settles. The body and tail enter together through a 220ms squash-and-stretch sequence and rest without continuous deformation. Keyboard and touch quotes anchor to the revealed artwork. Reduced motion removes the entrance transform and pointer following; both body and tail stay anchored to the artwork. A live preference change updates tracking without requiring a reload. The artwork reveal itself is plain CSS under `(hover: hover) and (pointer: fine)`, so it responds before hydration and while smooth scrolling moves the page under a resting pointer. A 140ms scroll-settle re-arms the quote once the page stops.

Pointer leave, later user scrolling, pointer cancellation, and Escape dismiss the relevant reveal. Scroll-into-view in the frame that opens a pointer reveal preserves that reveal. Touch supports a second tap and outside activation. Keyboard focus keeps the reveal open during native focus scrolling and reanchors the quote. The existing record and book reveals remain part of the interaction.

## Do's and Don'ts

### Do:

- Do retain the shared source token names and font families when extending existing pages.
- Do keep the entire Shelf bubble and tail within the viewport gutters.
- Do preserve the Shelf's exact content, fixed hit areas, and keyboard and touch behavior.
- Do anchor both quote and tail to the artwork when reduced motion is enabled.

### Don't:

- Don't apply the Shelf's bubble shape or local dark-blue text colors to every site container.
- Don't add the rejected dark cards or accent lines back to Shelf quotes.
- Don't make quote readability depend on continuous motion or hover alone.
