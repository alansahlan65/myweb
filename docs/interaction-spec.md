# First-release interaction spec

Requirements and approved starting motion limits for the Home and About implementation. Alan confirmed the complete scope on 2026-10-24; the interactions are implemented and checked in a browser.

## Contact modal

### Agreed direction

- Use the user's [default reference](references/contact-modal-default.png) and [hover reference](references/contact-modal-hover.png) for the contact-choice pattern.
- Follow the pen.dev design system for typography, surfaces, text, borders, spacing, radii, hover colors, focus, and motion. The reference's olive colors and the name Faiz are example content, not Alan's design tokens or identity.
- Present a compact modal over a dimmed, softly blurred backdrop, with a heading, short supporting text, and circular icon links.
- Hovering a channel changes the circular surface and shows an anchored label. Provide the label on keyboard focus as well.
- Alan's Instagram account is `@alannshln`, with destination `https://www.instagram.com/alannshln/`.
- Alan supplied WhatsApp number `0881027208832`. Use Indonesia's country code in the destination: `https://wa.me/62881027208832`.

### Shared flow

- The sidebar Get in touch button and each page's contact CTA open the same modal.
- Use "Get in touch" as the heading and "Choose how you'd like to reach me" as supporting text.
- Email opens a draft addressed to `alansahlanwork@gmail.com`. Provide a copy-address fallback.
- Present email, WhatsApp, and Instagram as the three active channels. Instagram opens Alan's supplied profile; WhatsApp opens the supplied number using the destination above.
- Use labels such as "Email Alan", "WhatsApp Alan", and "Instagram". Accessible names are available without requiring a hover.
- Include a visible close control, Escape dismissal, backdrop dismissal, focus containment, scroll locking, and focus restoration to the trigger.
- On touch, channel links work on the first tap. Tooltips do not gate navigation.
- Reuse the site's motion tokens; reduced motion keeps state changes understandable without movement.

### Magnetic contact controls

- The arrow CTA in Home and About's pale-blue contact panel pulls toward a fine pointer with bounded spring movement. Its target remains fixed, including a 14px pointer margin around the circle.
- Use `liquid-gooey` 0.2.2 Move for a liquid silhouette beneath the crisp arrow. Held presses squish the surface; release rebounds. Keep the existing 64px desktop and 48px compact diameters, ink/hover colors, and immediate Contact modal action.
- Touch receives press feedback without magnetic tracking. Reduced motion and forced colors use a static circle, with keyboard operation and focus restoration preserved. Stop decorative motion offscreen, in a hidden tab, and behind the modal.
- References: [Olivier Larose's magnetic button](https://blog.olivierlarose.com/tutorials/magnetic-button) and [Liquid Gooey](https://libraries.dev/gooey).

- The sidebar Get in touch pill reuses the arrow's magnetic/gooey component. Keep its 144px by 44px size, label, white icon, and immediate modal action. Cap travel by the shorter dimension and keep a fixed target with an 8px pointer margin. The sidebar has enough clipping room for the surface to move.

## Personal signature

- Replace only the closing Alan after Sincerely on About with personalized vector handwriting inspired by Alan's supplied screen recording. Keep the heading and sign-off copy intact.
- Trigger once when 80% of the signature is in view. Draw the capital A, tall looped l, connected a/n, and a small underline, then leave the completed signature still. Scrolling away and back does not replay it.
- Use WAAPI transform animations on individual SVG clip-mask rectangles with linear timing and the shared fast/base/slow duration tokens. The current stroke sequence totals 1860ms.
- Preserve the name as accessible text. Reduced motion and no-JavaScript views show the full signature. A live switch to reduced motion completes an in-progress signature immediately. Clean up animations and the observer on navigation.

## Page scrolling

- Lenis 1.3.27 smooths wheel scrolling on every page with a 0.1 lerp. Touch scrolling stays native.
- `respectReducedMotion` is on, so a reduced-motion preference turns smoothing off and makes programmatic scrolls instant, including when the preference changes while the page is open.
- Route changes still land at the top of the page instantly. `scrollToTop()` goes through the Lenis instance so its internal position cannot snap back.
- Load the library stylesheet from `lenis/dist/lenis.css` rather than copying its rules. It handles the automatic `html` and `body` height, the stopped state, and scroll chaining out of `data-lenis-prevent` areas.
- The contact modal and the mobile menu call `lockScroll()` and `unlockScroll()` around their open state. The lock count handles the contact modal opening on top of the mobile menu, and Lenis stays stopped until the last one closes. Both scroll areas keep `data-lenis-prevent` so their own scrolling stays native.
- Do not add Motion just to drive the frame loop. It only pays off when Motion's `scroll()` or `useScroll` animations are on the page, and this site animates pointer input instead.

## Native pointer

- Alan removed the sticky cursor on 2026-10-26. Keep the native browser cursor on all pages and controls.
- Preserve the magnetic and gooey contact buttons. Do not add a custom cursor overlay or cursor-hiding rules.

## Personal portrait

- Keep the complete photo print straight by default. Fine-pointer hover turns the whole print 2 degrees counterclockwise, matching Alan's supplied default and hover references.
- Rotate the photo, white paper, and caption together. Keep the image size and crop fixed. Extend the white bottom band to contain "Yep, that's me." without shifting the surrounding layout.
- Use an interruptible, critically damped spring with a quick 0.16-second response. Return along the same path when hover or focus leaves; preserve velocity on rapid reversals.
- Keep the print at the top-right of About's introduction: 248px on desktop, 220px on compact desktop, 184px on tablets, 128px below 600px, and 104px below 360px. Use one proportional image scale with automatic height so the source photo is never stretched. Phone captions stay on one line inside the paper.
- Keyboard focus reveals the same state. Touch toggles it on activation. Reduced motion keeps the print straight while revealing the caption immediately. Keep caption and expanded frame clear of the Shelf at narrow widths.

## Blob buddy

### Agreed behavior

- Keep the blob anchored beside Alan's identity.
- Track a nearby fine pointer with body tilt and eye movement. Use a minimum and maximum response distance.
- At rest, make it feel alive with restrained floating, breathing, eye movement, and occasional blinking.
- Clicking or keyboard activation produces the squish response, without another panel or navigation action.
- Use the original artwork and pen.dev colors.

The request for ongoing lively idle states replaces the earlier pen.dev note to breathe twice and then rest.

On 2026-10-26 Alan requested more lively, fluid, jelly-like behavior and hover interactions. The following expands the original restrained squish while retaining the artwork, anchored position, and nearby-pointer limits.

- Idle motion combines breathing, a small drifting float, soft body skew, independent eye glances, and occasional double blinks.
- Hover or keyboard focus makes the eyes more attentive and gently lifts the body. Pointer entry and exit give it a small elastic wobble.
- Pressing and holding compresses the body about 24% vertically and widens it about 18%. Releasing produces a stretch and damped sideways wobble. A quick tap also compresses before rebounding.
- The interactive movement uses the existing spring model with mass 1, stiffness 100, and damping 10. Repeated presses retain current position and velocity.
- Pointer cancellation, loss of capture, blur, and Escape release a held squish. Touch and keyboard activation have the same response.
- Reduced motion and forced colors retain static feedback. Decorative movement and interaction springs stop while offscreen, in a hidden tab, or behind the Contact modal.

### Approved state behavior

| State | Behavior |
| --- | --- |
| Idle | Gentle breathing and floating, occasional blinks and small eye glances |
| Nearby pointer | Look toward the pointer, with bounded body tilt and pupil travel |
| Hover or keyboard focus | Attentive eyes, a small lift and elastic entry/exit feedback, with the existing focus treatment |
| Pressed | Compress while held, or briefly compress on a quick tap |
| Returning | Stretch and wobble after release, carrying current velocity through repeated presses |
| Offscreen, hidden tab, or contact modal open | Pause decorative motion and pointer tracking |

### Approved starting limits

- Measure distance from the blob's center in viewport CSS pixels.
- Use a 24px neutral zone to avoid jitter around the center and a 240px maximum response radius.
- Blend back toward neutral at the outer edge, with no abrupt state jump.
- Limit body tilt to about 5 degrees and pupil travel to about 3px. Keep float travel to about 2px.
- Reuse the original 4.8-second breathing cadence with a restrained continuous idle cycle.
- Keep the layout and hit area fixed. Pupils stay inside their eye shapes.
- Interrupt and reverse from the current pose. Repeated pointer entry and presses must not queue animations or restart from an unrelated pose.
- For touch, use tap feedback instead of pointer tracking. For reduced motion, remove the floating, breathing transforms, pointer-following movement, and spring bounce; retain clear static or gentle non-spatial feedback.

Alan approved these starting limits. They are a feel-test baseline rather than measurements extracted from the existing design.

### Liveliness expansion, 2026-10-27

On 2026-10-27 Alan asked for more face reactions and idle life while keeping the two-eye design. This adds expression without eyebrows, a mouth, eyelids, or new artwork.

- Blinks are scheduled between 2.6 and 6.2 seconds with quick, double, and slow variants. They replace the fixed 8.6-second CSS loop so the rhythm stops feeling metronomic.
- An idle beat every 4.2 to 8.2 seconds chooses one small action: a glance within 2.4px horizontally and 2.1px vertically, a soft body settle, or a tiny perk. Idle beats stop while the pointer tracks the blob or the blob is hovered or focused.
- The eye layer combines pointer tracking, idle gaze, and press gaze. Each uses its own spring, so looking at a pointer stays quick while idle looks drift slowly.
- Pressing the left or right side moves the squish origin to that point and makes the eyes look toward it. Releasing adds a short eye pop before the face settles. A hold longer than 700ms ends with a slow blink.
- Hover widens the eyes and lifts the body. Keyboard focus adds a 2.2-degree head cock and the same eye widening. When the pointer leaves, the eyes follow it for 650ms before returning to center.
- Closing the contact modal or returning to the tab wakes the blob with a small lift and a double blink. The first sighting also gets a double blink as a greeting.
- The eyes remain the only facial feature. No eyebrows, mouth, eyelids, or extra shapes are added.
- Pause and reduced-motion behavior is unchanged. Timers, scheduled blinks, and WAAPI animations stop offscreen, in a hidden tab, behind the contact modal, under reduced motion, and in forced colors.

New reactions stay inside the existing limits: pointer pupil travel remains 3px, body tilt remains 5 degrees, float travel remains about 2px, and the hit area stays 60px square.

## Shelf input behavior

- Album and book reveals work on hover, keyboard focus, and touch activation. The hit areas stay fixed while the artwork moves. Hover styling is plain CSS, so the artwork responds before React hydrates and while smooth scrolling moves the page under a resting pointer.
- Fine-pointer quotes appear after 90ms, follow the pointer with short easing, and dismiss on leave, scroll, cancellation, or Escape. Games, films, and the book share the same quote treatment. When a scroll settles with the pointer still on an item, the reveal re-arms so the quote returns without a fresh entry.
- Keyboard quotes stay anchored to their focused item, including when native focus scrolls the page or Shelf. Escape dismisses the quote; moving focus to another item reveals that item's state.
- Touch quotes stay anchored and dismiss on a second tap or outside activation.
- On 2026-10-26 Alan selected soft speech bubbles related to the existing Blob buddy. This replaces the FIX Shelf frame's dark quote cards and accent rules. Use one pale-blue surface, dark-blue quote text, blue-tinted attribution, softly unequal corners, a curved SVG tail, and one low-offset soft shadow. Keep Geist and the exact quote and author content.
- The bubble enters with a 220ms squash-and-stretch sequence, then rests. Reduced motion removes the entrance transform and pointer following. Quote and tail anchor to the revealed artwork, including when the preference changes while the quote is open.
- Render the bubble in a fixed portal outside the Shelf scroller. Keep the entire bubble and tail inside 24px viewport gutters, reserve tail space, and flip placement when needed. Compact padding and type apply in viewports 400px high or shorter.
- Keep the existing cover, vinyl, and open-book reveals. The local visual treatment is recorded in [DESIGN.md](../DESIGN.md) and its [sidecar](../.impeccable/design.json).

## Desktop compact rail

- Keep the mobile hamburger layout unchanged. Compact rail behavior applies above 1000px only.
- Collapse the rail from 208px to 72px. A 44px toggle at the bottom of the rail switches state, and its ChevronsLeft icon rotates 180 degrees as the rail closes. The accessible label switches between "Collapse sidebar" and "Expand sidebar", and `aria-expanded` reports the state.
- Pin the toggle to the bottom of the sticky rail in both states, including while the page scrolls. It stays visible when the sidebar scrolls in short viewports.
- Drive width, label collapse, character exit, and icon centering from one shared `--rail-progress` value. Use one critically damped spring with a 0.36-second response. Reversing mid-transition keeps the current position and velocity instead of snapping.
- Keep the shell's outer width fixed at the expanded rail size and let the main column absorb the freed 136px. The content's right edge stays put while its left edge follows the rail, so the toggle under the pointer and the page's outer bounds do not slide. Full-column content widens; intro copy stays at its reading measure.
- Keep nav labels in the DOM as accessible names. Collapse them with `max-width` and opacity, and fade them faster than the rail so words are not clipped mid-letter. In compact mode, navigation, contact, resume, and the toggle become 44px icon controls centered in the rail, with native `title` tooltips.
- Keep the Blob buddy visible at 60px, centered at the top of the rail. Remove the identity copy from the tab order with `aria-hidden` and `tabIndex={-1}`, and mark the character wrapper `inert`. The character loses height and fades rather than being squashed.
- Keep compact state for the session across client-side navigation. Do not persist it across reloads. Below 1001px the rail renders expanded and the toggle hides; returning to desktop restores compact. Reduced motion and hidden tabs snap to the target state without spatial movement.

## Mobile and theme

- At 1000px and below, retain the rounded expanding window inspired by [Olivier Larose's Awwwards Side Menu](https://blog.olivierlarose.com/tutorials/awwwards-side-menu), with Geist, the neutral canvas/ink/gray palette, and existing controls. Anchor the 44px close target exactly over the hamburger, 16px inside the window, and keep the soft shadow outside its rounded overflow mask.
- Open above the page without shifting content. Keep Home, Know me better, Get in touch, See my resume, LinkedIn, Instagram, and Behance connected to their existing destinations.
- Trap keyboard focus, lock background scrolling, support Escape and backdrop dismissal, and return focus to the hamburger. Page selection closes the menu and focuses main content. Resizing to desktop clears the open state.
- Contact opens above the menu and restores focus to its menu action on close. The resume downloads directly. Keep all links reachable through internal scrolling in short landscape viewports, with the close button fixed inside the panel.
- Opening and closing share one critically damped spring with a 0.3-second response. Carry its live position and velocity through rapid reversals. Use transforms with an inverse content layer to keep glyphs and the close target from stretching. The content and two-line icon follow the same progress, with gentle 8px label movement and no perspective flips or independent delays.
- Keep the dialog active through dismissal. Tapping its toggle during closing reopens it immediately, without waiting for an exit to complete. Reduced motion applies the final state without spatial movement.
- Preserve complete focus indicators at internal scroll edges, including with 200% enlarged text. Keep the active-page dot as a visual cue independent of color. Forced colors retain system outlines, and logical placement mirrors the menu in RTL.

- Ship light mode first, following the current FIX frames.
- Use a compact identity header and accessible navigation menu on small screens.
- Keep identity and Blob buddy grouped left, with only the navigation toggle on the right.
- When the hamburger replaces the sidebar at 1000px and below, Home shows Alan's character in a dedicated right-hand column beside the introduction. Desktop Home shows only the sidebar character and has no extra hero column. About uses the top-right portrait and omits the compact character.
- Show project previews in one column when the desktop grid no longer fits.
- Make the Shelf horizontally scrollable on mobile.
- Keep the Contact modal within the viewport, with usable close and channel controls.

## Other destinations

- LinkedIn and Behance reuse the older site's destinations recorded in the project brief.
- Instagram uses Alan's newly supplied account.
- Music covers retain their reveal interactions without music-service navigation for now.
- Under the approved portfolio refinement on 2026-10-26, the dormant Projects navigation entry, view switch, and View All treatment are omitted. Project previews remain static until the Projects page is ready.
- Reuse the existing resume PDF as specified in the final first-release checklist.

## Final review

The contact destinations, blob response limits, and mobile/light-mode scope are settled. Implementation and verification are recorded in [the release checklist](release-checklist.md).
