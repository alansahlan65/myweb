# Reference review and proposed direction

Reviewed on 26 October 2026, Asia/Jakarta.

Reference: [Faiz Intifada](https://faizintifada.com/).
Target: Alan Sahlan's local Home and About pages at `http://127.0.0.1:3000/`.

This is a design recommendation, not a replacement for the project's root `DESIGN.md` or an approved implementation specification. No application source was changed for this review.

## Recommendation

Give the work more space, simplify the page structure, and make Alan's professional context clear earlier. Preserve the Blob buddy, Alan character, portrait, Shelf, and restrained blue palette. Their presentation should support the portfolio's hierarchy.

The reference's quality comes from a quiet reading column, generous image presentation, consistent spacing, and credible personal content. A font change is low priority: both websites already use Geist.

## Evidence and scope

- Inspected the live reference on desktop, including the introduction, selected-work carousel, speaking photographs and event list, testimonials, and video grid.
- Read its page content and branding extraction through Firecrawl. Verified important typography and image dimensions against computed styles in the live browser.
- Inspected Alan's current Home and About in the local browser and read their components, shared CSS, project brief, interaction specification, and design documentation.
- Inspected the stored mobile Home capture at `docs/references/implementation-home-mobile.png` and checked the corresponding responsive rules. This was not a fresh mobile browser session.
- The saved desktop captures are `reference-home.png` and `current-home.png` in this folder, at approximately 1280 by 720.
- Motion timing, reference mobile behavior, field validation, performance, and case-study interiors were not audited. Motion values proposed below are recommendations, not extracted reference values.

[Reference desktop capture](<D:/Project/pen.dev Personal Web/docs/references/faizintifada-review/reference-home.png>) and [current Home desktop capture](<D:/Project/pen.dev Personal Web/docs/references/faizintifada-review/current-home.png>).

## What the reference actually does

### Typography and reading width

Measured at the inspected desktop viewport:

| Element | Observed value |
| --- | --- |
| Font | Geist, with Arial/system fallbacks |
| Visible name heading | 16px, weight 500, line height 20.8px |
| Role/location line | 14px, weight 400, line height 18.2px |
| Introduction | 16px, weight 400, line height 25.6px |
| Introduction width | 600px |
| Section labels | 14px, weight 400, line height 18.2px |
| Primary text | `rgb(10, 10, 10)` |
| Secondary text | Computed as `oklab(0.144787 0.00000661612 0.00000289828 / 0.65)` over white |

The compact headings matter. This reference achieves hierarchy through position, spacing, imagery, and contrast rather than a large display headline.

Firecrawl's automatic branding extraction reported red as a primary color and green as a link color. Those are not reliable descriptions of the visible homepage palette. The red appeared in an invisible form status element during computed-style inspection. Use visible, verified elements when translating this reference.

### Layout and imagery

- The introduction and supporting text use a narrow, centered reading column.
- Selected work expands beyond that column in a horizontal carousel with neighboring projects partly visible.
- Measured project images were 560 by 373 CSS pixels, approximately 3:2. The immediate parent reported a 32px radius.
- Each project has a distinct visual setting, while image framing and scale remain consistent.
- Speaking photographs overlap in a loose photo-print composition, followed by a compact event list.
- Testimonials use readable text and named attribution.
- The video grid expands wider than the prose column. Images carry more visual weight than section headings.
- A small fixed portrait/contact entry stays near the lower-left corner of the inspected desktop page.

The transferable pattern is narrow prose with larger visual sections. A carousel, speaking section, video feed, or contribution chart is useful only when it serves Alan's content.

## Improvements for Alan's site

### 1. Make selected work the main visual attraction

Current project images use a 12:5 aspect ratio inside a two-column grid. At the inspected desktop width, each image is roughly 390px wide and 160px tall. Product interfaces, devices, scenery, and embedded type compete in that shallow frame.

Proposed changes:

- Start with a 3:2 image frame, or 16:10 when a specific project benefits from it. Recompose the artwork for the new ratio rather than stretching or blindly cropping the existing banners.
- Show real interface details at a scale visitors can inspect. Use supporting device mockups when they help explain the product.
- Give all four previews a shared approach to margins, image quality, corner treatment, and product scale. Their individual brand colors can remain distinct.
- Remove the outer pale card wrapper and place title and a short description below the artwork. Start with 18-20px titles and 14-15px descriptions.
- Add accurate context: product type, Alan's responsibility, and one useful design problem or result. Do not invent outcomes or metrics.
- Keep projects directly visible in a grid or vertical sequence for easy scanning. The reference carousel is an option, not a requirement.

The existing project previews remain intentionally static under the first-release agreement. Their destinations should only be enabled as part of a future Projects/case-study scope. Meanwhile, a future design pass can omit the inactive grid/list switch and View All treatment so they do not suggest available actions.

### 2. Reduce the desktop sidebar's visual weight

The current shell reserves a 248px sidebar plus a 64px gap before the main content, with 48px outer padding at the wide breakpoint. The identity, Blob buddy, full character, navigation, and two actions stay visible together.

The strongest proposed direction is a compact header and centered content. Use a roughly 960-1040px visual-content width with a 600-640px prose column inside it. The wider container is a proposed starting point, not a reference measurement.

If the sidebar is part of Alan's preferred identity, retain it in a slimmer form and reduce the character's reserved space. Compare the two layouts visually before choosing. Keep the character greeting and Blob buddy behavior; neither needs additional effects.

### 3. Introduce Alan and his work earlier

The current slogan communicates personality but leaves the employer and concrete responsibilities farther down the page.

Proposed introduction copy, using information already present on the site:

> I'm Alan, a product designer based in Bandung. At CADIT, I work on component libraries and interfaces for international client projects.

The current personality line can remain as a supporting statement. If retaining a display headline, test approximately 40-48px on desktop instead of the current 60px. Keep supporting prose around 16-18px and constrain its width.

Use the CADIT employment context consistently when mentioning client work, so visitors understand the relationship. Project summaries should explain Alan's role rather than relying on attractive images alone.

### 4. Make section alignment consistent

Home's selected work aligns with the main column, while the about section and footer inset their content by another 80px at the widest breakpoint. The approach section also divides the remaining width into two columns with a 96px gap.

Use one shared alignment system for section labels, prose, image grids, and the footer. Let selected visuals expand deliberately, as in the reference. Avoid adding nested padding to every section.

Proposed starting rhythm:

- 80-96px between major desktop sections.
- 48-64px between major mobile sections.
- 24-32px between a section label and its content.
- 12-16px between project artwork and caption.
- 20-24px mobile page gutters.

These are proposed design tokens. Adjust them after reviewing real content and responsive layouts.

### 5. Keep personal details and give each a clear role

The About page already has distinctive content: Alan's story, a real portrait, the Shelf, and a handwritten prompt. Preserve these.

- Let the portfolio work dominate Home.
- Let the portrait, Shelf, and personal story carry About.
- Keep the Blob buddy as a small identity detail.
- Place or scale the Alan character so it does not interrupt the path from introduction to work, especially on mobile.
- Keep the native cursor and existing accessible contact controls, consistent with the approved interaction specification.

The stored mobile Home capture shows a separate character block between the introduction and selected work. Integrating a smaller character into the introduction would bring the first project higher without removing the character.

### 6. Add proof that fits a product designer

The reference supports its introduction with projects, speaking activity, named testimonials, and published content. Alan's equivalent should follow his actual work.

Prioritize a strong case study, clear CADIT experience, design-system examples, and an authentic colleague or collaborator quote when available. Add small interface experiments later if they show useful craft. A tool list or contribution chart has lower value unless it helps the intended employer or collaborator assess Alan.

### 7. Refine motion after the layout

The current site already has substantial custom interaction work. More animation is not the main missing ingredient.

Retain the greetings, magnetic contact feedback, portrait reveal, and Shelf interactions. For future clickable projects, test a subtle image scale around 1.02 and restrained caption/arrow feedback over roughly 180-240ms. Keep fixed hit targets, keyboard equivalents, touch operation, and reduced-motion alternatives.

Keep meaningful text and project information visible without hover. Add page-entry or scroll reveals only after the composition works without them.

## Proposed Home sequence

1. Compact identity and navigation.
2. A short introduction explaining role, location, and current work.
3. Three or four selected projects with larger imagery and useful captions.
4. Concise experience or one authentic testimonial.
5. A clear contact area and quiet footer.

About keeps the personal story, portrait, Shelf, and closing note.

## Recommended order of work

| Pass | Deliverable | Review criterion |
| --- | --- | --- |
| 1 | Home layout study covering header/sidebar, introduction, and one project preview | Alan's role is immediately clear and the project gets the strongest visual emphasis |
| 2 | Recompose all four project previews and captions | Interfaces remain legible and the projects read as one curated collection |
| 3 | Align experience, About, contact, and footer with the chosen spacing/type system | Shared elements feel consistent across both pages |
| 4 | Review responsive layouts and existing interactions | First work appears promptly on mobile; keyboard, touch, and reduced motion still work |
| Later | Projects page and case studies | Visitors can understand the problem, Alan's decisions, and the resulting product |

No framework migration or new animation library is needed for the visual refinement. The current Next.js, React, CSS, Geist, and existing interaction components can support it.

## Source files for a future implementation

- `src/components/site-shell.tsx`: identity, sidebar, navigation, and contact/resume actions.
- `src/app/page.tsx`: introduction, project collection, and experience content.
- `src/app/globals.css`: shared tokens, shell dimensions, project framing, section spacing, and responsive layouts.
- `src/app/about/page.tsx`: story, portrait, Shelf, and personal closing.
- `src/components/contact-panel.tsx`: shared contact composition.
- `public/images/design/`: existing project artwork and personal assets.

Read the relevant installed Next.js guides before implementation, as required by `AGENTS.md`. Treat any layout or interaction changes above as proposals until implementation is requested.
