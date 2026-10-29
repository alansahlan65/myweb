# Personal website project brief

Working record of agreements from the grill-with-docs interview. Updated 2026-10-24. Alan confirmed shared understanding with "start"; the first local implementation is complete and verified.

## Purpose

Help potential employers or collaborators understand Alan's product-design work and contact him. Personal expression and learning to build and maintain the website are supporting goals.

## Portfolio refinement, 2026-10-26

Alan approved applying the recommendations from the Faiz Intifada website review with Impeccable. The implementation now follows this refinement; the earlier FIX frames describe the first milestone.

- Preserve Geist, the white/neutral/blue palette, Alan character, Blob buddy, portrait, Shelf, native cursor, and contact interactions.
- Use a slimmer desktop sidebar, a smaller display headline, and a professional introduction with Alan's current CADIT context.
- Present the four existing projects in larger 3:2 image frames, with screen-focused crops, factual captions, and no outer gray card wrapper.
- Align experience and footer with selected work, simplify skill labels, and integrate a smaller character beside Home's mobile introduction.
- Omit the dormant Projects navigation entry, grid/list switch, and View All treatment. Project previews remain static until the Projects page is designed.
- The current visual system is recorded in root `DESIGN.md` and `.impeccable/design.json`; the refinement contract is `.impeccable/surfaces/src-app-page-tsx.md`.

## Agreed first release

- Build the personal website with Next.js.
- Implement Home and About first, including their shared identity, navigation, and contact areas.
- Defer the Projects page, which has not been designed yet.
- Keep the existing Home project previews.
- Preserve the current visual direction while allowing content refinements, responsive layouts, accessibility improvements, and missing interaction states.
- Completion criteria and verification are recorded in [the release checklist](release-checklist.md).
- Use the approved light-mode mobile adaptation documented in [the interaction spec](interaction-spec.md).
- Expect occasional repository updates with AI assistance. Alan also wants to edit the design directly on the pen.dev canvas.

## Design and code handoff

- pen.dev is the reference for visual design and visible copy.
- The repository holds the working implementation, including responsive and accessibility adjustments.
- After editing the canvas, Alan requests a sync of the affected page. Inspect the current frame, compare it with the code, and apply the requested changes deliberately.

## Projects before the Projects page exists

- Keep all project-related navigation, View All, controls, and project previews static until Alan finishes the Projects page.
- Do not enable project navigation or external case-study links in this first release.
- Home and About navigation and their other agreed interactions remain part of the release.

## Interaction scope

- Include the documented Shelf and portrait motion in the first release, plus the expanded Blob buddy behavior below.
- Support keyboard, touch, and reduced-motion alternatives.
- Reuse the Alan character's existing hover animation from `D:\Project\Personal Web`.
- Use a Contact modal based on Alan's supplied screenshots, styled with the pen.dev design system.
- The Blob buddy follows a nearby pointer with bounded tilt and eye motion, has lively idle states, and squishes on activation.
- See [the interaction spec](interaction-spec.md) for contact channels, source screenshots, approved starting motion limits, and mobile behavior.

## Existing implementation references

Inspected read-only in the older project. Reuse the character behavior while adapting its placement to the FIX frames.

- `D:\Project\Personal Web\app\components\alan-character.tsx` and `alan-character.module.css`: greeting on hover, focus, or activation; 150ms expression and greeting-bubble transitions; 240ms body and arm blend; raised arm rotates from -12 degrees to 0 degrees; greeting text is "Hi! Nice to meet you!".
- The character tracks a fine pointer using eight head directions, with a neutral radius and hysteresis to avoid flickering. Escape, blur, and outside taps dismiss the greeting. Reduced motion, touch/coarse input, and forced colors use alternatives; offscreen and hidden-tab tracking pauses.
- Nineteen registered transparent PNGs in `public\images`: three full-character poses, eight directional heads, and eight matching greeting heads. Preserve their common 1122 by 1402 registration because body, head, and arm masks depend on it.
- The component uses React, `next/image`, the browser Web Animations API, CSS, and `speech-bubble.module.css`. It does not require an animation library.
- `app\lib\portfolio-links.ts`: `alansahlanwork@gmail.com` and `/resume/alan-sahlan-resume.pdf`. The PDF exists under `public\resume`.
- `app\components\site-footer.tsx`: LinkedIn at `https://www.linkedin.com/in/muhammadsahlanshadiq/`, GitHub at `https://github.com/alansahlan65`, and Behance at `https://www.behance.net/muhammadsahlanshadiq`.
- The FIX footer contains LinkedIn, Instagram, and Behance icons. The older app/docs sources had no Instagram or music-track URLs; Alan has since supplied Instagram in the interaction spec. Music navigation remains deferred.
- The older blob opens instructions for a role-switching hero. The new site's agreed activation is a squish response, documented in the interaction spec.

## Design references

[Alan's pen.dev file](https://app.pen.dev/s/2OfncsqKbOrDz0FpUx8pIs5D1kBUe6eUV6vNkbOm9mI)

- `ZzLQS`: FIX 1 - Home.
- `XElO4`: FIX 1 - About / Alan, a little more personally.
- `YdTwg`: FIX Shelf / Music, book and cinema hover states.

The Shelf frame is an interaction reference for About, not a third website page.

## Final review and later stages

- Alan has supplied the WhatsApp destination and approved the blob response limits and mobile/light-mode scope.
- The first implementation milestone, including reuse of the existing resume PDF, is complete and verified in [the release checklist](release-checklist.md).
- Start with a working local preview for review. GitHub repository connection, public hosting, and any ongoing spending are later-stage decisions.
- No specific deadline or budget has been established.
