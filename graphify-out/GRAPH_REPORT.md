# Graph Report - pen.dev Personal Web  (2026-11-05)

## Corpus Check
- 129 files · ~841,124 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 817 nodes · 1207 edges · 74 communities (61 shown, 13 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 268 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Shell, theme, and contact runtime
- Home page and interactive components
- Package and deployment config
- About page copy and rhythm
- App shell and page components
- Blob buddy component logic
- Home work grid and brand
- Alan character poses
- Project preview mockups
- About statement and case tiles
- TypeScript config
- Expanded sidebar reference
- Home pressed-CTA reference
- Playwright test suite
- Quote card testimonial
- About hero and experience rows
- About two-column shell
- About mobile implementation
- Mobile menu sheet states
- About sections and footer
- Bubble and shelf verification
- Site context and design references
- About implementation reference
- Portfolio refinement review
- Agent instructions and skills
- Contact modal references
- Resume and career history
- Compact rail and theme spec
- Project context and domain docs
- Mobile menu interface reviews
- Portrait hover mobile
- Shelf and blob decisions
- Signature and interaction spec
- Release checklist milestones
- Quote bubble typography
- Magnetic contact controls spec
- Magnetic pill CTA hierarchy
- Portrait hover reference
- Shelf and quote card visuals
- Issue tracker workflow
- Blob mascot hero alignment
- Contact CTA card
- Home design reference
- Triage labels
- Blob blink state
- Blob pressed state
- Footer and sign-off block
- Portrait card hover
- Blob rebound card
- Portrait photo reference
- Blob idle states
- Reference quote cards
- CTA cursor highlights
- Vinyl record shelf items
- Witcher book shelf item
- About bio and employer
- Shelf interaction design
- Alan looking down
- Alan looking down left
- Alan looking down right
- Arctic Monkeys shelf item
- The Killers shelf item
- Contact mobile reference
- Interests section heading
- Soft speech bubble preview
- Alan waving
- Portrait photograph
- Inception poster
- Client roster

## God Nodes (most connected - your core abstractions)
1. `Alan character` - 29 edges
2. `AlanCharacter()` - 23 edges
3. `BlobBuddy()` - 21 edges
4. `MagneticContactButton()` - 17 edges
5. `compilerOptions` - 16 edges
6. `Release checklist` - 16 edges
7. `react` - 15 edges
8. `schedule()` - 14 edges
9. `SiteShell()` - 13 edges
10. `About Page, Mobile Implementation` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Proposed earlier CADIT context` --semantically_similar_to--> `CADIT UI/UX Designer`  [INFERRED] [semantically similar]
  docs/references/faizintifada-review/DESIGN.md → public/resume/alan-sahlan-resume.pdf
- `Blob buddy interaction limits` --conceptually_related_to--> `Blob buddy`  [INFERRED]
  docs/interaction-spec.md → public/images/design/blob-original.svg
- `Blob life update` --references--> `Blob buddy`  [INFERRED]
  docs/release-checklist.md → public/images/design/blob-original.svg
- `Portrait` --implemented_by--> `Portrait()`  [INFERRED]
  docs/references/implementation-character-arm-mobile.png → src/components/portrait.tsx
- `Alan character` --implemented_by--> `AlanCharacter()`  [INFERRED]
  docs/references/pen-home.png → src/components/alan-character.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sidebar Navigation Cluster** — docs_references_implementation_about_profile_sidebar, docs_references_implementation_about_active_nav_pill, docs_references_implementation_about_primary_cta_pill [EXTRACTED 1.00]
- **About Page Vertical Section Flow** — docs_references_implementation_about_mobile_header_identity_bar, docs_references_implementation_about_mobile_hero_intro, docs_references_implementation_about_mobile_experience_timeline, docs_references_implementation_about_mobile_curated_media_rail, docs_references_implementation_about_mobile_current_work_section, docs_references_implementation_about_mobile_closing_signoff, docs_references_implementation_about_mobile_contact_card [EXTRACTED 1.00]
- **Compact rail intent, spec, implementation, and verification** — context_compact_rail, design_compact_rail, docs_interaction_spec_compact_rail, docs_release_checklist_compact_rail [EXTRACTED 1.00]
- **Contact CTA Card Composition** — docs_references_contact_magnetic_preview_contact_cta_card, docs_references_contact_magnetic_preview_say_hi_headline, docs_references_contact_magnetic_preview_film_recommendation_microcopy, docs_references_contact_magnetic_preview_arrow_cta_button, docs_references_contact_magnetic_preview_asymmetric_two_column_layout [EXTRACTED 1.00]
- **Sidebar Identity and Action Rail** — docs_references_contact_magnetic_home_identity_lockup, docs_references_contact_magnetic_home_primary_nav, docs_references_contact_magnetic_home_get_in_touch_button, docs_references_contact_magnetic_home_resume_button [EXTRACTED 1.00]
- **Persistent Identity Rail** — docs_references_contact_gooey_pressed_home_persistent_sidebar_nav, docs_references_contact_gooey_pressed_home_identity_header, docs_references_contact_gooey_pressed_home_avatar_illustration, docs_references_contact_gooey_pressed_home_contact_gooey_cta, docs_references_contact_gooey_pressed_home_resume_secondary_cta [EXTRACTED 1.00]
- **Quote card visual composition** — docs_references_quote_inception_quote_card, docs_references_quote_inception_soft_blue_surface, docs_references_quote_inception_speech_tail, docs_references_quote_inception_quote_typography, docs_references_quote_inception_attribution_line [EXTRACTED 1.00]
- **Quote Callout Anatomy** — docs_references_quote_witcher_quote_callout, docs_references_quote_witcher_quote_text, docs_references_quote_witcher_attribution, docs_references_quote_witcher_date_range_label, docs_references_quote_witcher_speech_tail [EXTRACTED 1.00]
- **Shelf quote bubble concept, spec, design, and verification** — context_shelf, design_shelf_quote_bubbles, docs_interaction_spec_shelf_input, docs_release_checklist_shelf_quote_bubble [EXTRACTED 1.00]
- **Portfolio page section stack (about, experience, interests)** — docs_references_sidebar_compact_about_hero, docs_references_sidebar_compact_experience_section, docs_references_sidebar_compact_interests_section [EXTRACTED 1.00]
- **Sidebar Rail Affordances** — docs_references_sidebar_expanded_identity_header, docs_references_sidebar_expanded_nav_pill_active_state, docs_references_sidebar_expanded_primary_cta, docs_references_sidebar_expanded_secondary_cta, docs_references_sidebar_expanded_sidebar_footer_controls [EXTRACTED 1.00]
- **Contact Conversion Path** — docs_references_contact_magnetic_about_get_in_touch_button, docs_references_contact_magnetic_about_say_hi_contact_card, docs_references_contact_magnetic_about_magnetic_arrow_button, docs_references_contact_magnetic_about_page_footer_meta [INFERRED 0.75]
- **Page Frame: Sidebar, Hero, Footer Meta** — docs_references_shelf_witcher_hover_sidebar_nav, docs_references_shelf_witcher_hover_hero_intro, docs_references_shelf_witcher_hover_footer_meta [INFERRED 0.75]
- **Portfolio Entry Page Section** — docs_references_shelf_hover_detail_experience_header, docs_references_shelf_hover_detail_pull_quote, docs_references_shelf_hover_detail_section_header [INFERRED 0.75]
- **Personal Voice Arc: Origin, Habits, Present, Sign-off** — docs_references_implementation_about_mobile_hero_intro, docs_references_implementation_about_mobile_off_screen_note, docs_references_implementation_about_mobile_current_work_section, docs_references_implementation_about_mobile_closing_signoff, docs_references_implementation_about_mobile_first_person_voice [INFERRED 0.85]
- **Sequential Reading Column Sections** — docs_references_implementation_about_hero_intro, docs_references_implementation_about_experience_timeline, docs_references_implementation_about_media_carousel, docs_references_implementation_about_say_hi_card [INFERRED 0.85]
- **About Page Visual System** — docs_references_implementation_about_mobile_type_led_monochrome_layout, docs_references_implementation_about_mobile_accent_palette, docs_references_implementation_about_mobile_single_column_scroll, docs_references_implementation_about_mobile_contact_card [INFERRED 0.85]
- **Hero Intro Composition (copy + two-tone type + mascot + alignment)** — docs_references_blob_pressed_hero_intro, docs_references_blob_pressed_two_tone_type, docs_references_blob_pressed_blob_mascot, docs_references_blob_pressed_baseline_alignment [INFERRED 0.85]
- **Mascot Interaction Model (character + pressed deformation + affordance)** — docs_references_blob_pressed_blob_mascot, docs_references_blob_pressed_pressed_state, docs_references_blob_pressed_interactive_mascot [INFERRED 0.85]
- **Minimal Identity Lockup (Name, Role, Mascot)** — docs_references_blob_rebound_identity_header, docs_references_blob_rebound_role_link_treatment, docs_references_blob_rebound_blob_mascot, docs_references_blob_rebound_flat_white_card [INFERRED 0.85]
- **Persistent Sidebar Rail Composition** — docs_references_contact_magnetic_about_profile_sidebar, docs_references_contact_magnetic_about_pixel_avatar_illustration, docs_references_contact_magnetic_about_sidebar_navigation, docs_references_contact_magnetic_about_get_in_touch_button, docs_references_contact_magnetic_about_theme_toggle_control [INFERRED 0.85]
- **Contact Conversion Path** — docs_references_contact_magnetic_home_get_in_touch_button, docs_references_contact_magnetic_home_magnetic_cta_banner, docs_references_contact_magnetic_home_circular_arrow_affordance [INFERRED 0.85]
- **Above-the-Fold Credibility Stack** — docs_references_contact_magnetic_home_project_card_pair, docs_references_contact_magnetic_home_intro_headline, docs_references_contact_magnetic_home_capability_tags, docs_references_contact_magnetic_home_experience_entry [INFERRED 0.85]
- **Editorial Flat Surface Language** — docs_references_sidebar_expanded_warm_monochrome_palette, docs_references_sidebar_expanded_generous_whitespace, docs_references_sidebar_expanded_hairline_divider, docs_references_sidebar_expanded_nav_pill_active_state [INFERRED 0.85]
- **Gooey Contact Affordance Flow** — docs_references_contact_gooey_pressed_home_gooey_blob_orb, docs_references_contact_gooey_pressed_home_contact_gooey_cta, docs_references_contact_gooey_pressed_home_contact_panel_have_something_in_mind, docs_references_contact_gooey_pressed_home_circular_arrow_button [INFERRED 0.85]
- **Home Page Proof-to-Pitch Stack** — docs_references_contact_gooey_pressed_home_project_showcase_strip, docs_references_contact_gooey_pressed_home_positioning_statement, docs_references_contact_gooey_pressed_home_capability_tags, docs_references_contact_gooey_pressed_home_experience_entry_cadit, docs_references_contact_gooey_pressed_home_client_roster [INFERRED 0.85]
- **Homepage Narrative Reading Sequence** — docs_references_implementation_home_hero_headline, docs_references_implementation_home_selected_work_grid, docs_references_implementation_home_about_statement, docs_references_implementation_home_experience_panel, docs_references_implementation_home_contact_cta_banner [INFERRED 0.85]
- **Interruptible spring motion across site controls** — design_compact_rail, design_side_menu, design_portrait_print, design_magnetic_contact_controls [INFERRED 0.85]
- **Paired Hero CTA Buttons with Tiered Emphasis** — docs_references_magnetic_pill_get_in_touch_cta, docs_references_magnetic_pill_see_my_resume_cta, docs_references_magnetic_pill_primary_secondary_hierarchy, docs_references_magnetic_pill_cta_stack [INFERRED 0.85]
- **Mobile conversion path: headline to primary CTA to secondary CTA to social links** — docs_references_magnetic_pill_mobile_greeting_headline, docs_references_magnetic_pill_mobile_get_in_touch_cta, docs_references_magnetic_pill_mobile_see_resume_cta, docs_references_magnetic_pill_mobile_social_link_row [INFERRED 0.85]
- **Design system choices: pill buttons, oversized type, neutral palette, mobile-first stack** — docs_references_magnetic_pill_mobile_pill_button_pattern, docs_references_magnetic_pill_mobile_oversized_display_type, docs_references_magnetic_pill_mobile_neutral_soft_palette, docs_references_magnetic_pill_mobile_mobile_first_stack [INFERRED 0.85]
- **Portfolio refinement finish review chain** — impeccable_surfaces_src_app_page_tsx_document, design_document, _impeccable_review_portfolio_finish_review_document, _impeccable_review_bubble_shelf_verdict_document, docs_release_checklist_portfolio_refinement [INFERRED 0.85]
- **Shelf Browse Interaction** — docs_references_shelf_hover_detail_media_shelf, docs_references_shelf_hover_detail_tilted_scatter, docs_references_shelf_hover_detail_hover_lift, docs_references_shelf_hover_detail_blue_accent [INFERRED 0.85]
- **Media Shelf Browsing Interaction** — docs_references_shelf_witcher_hover_media_shelf, docs_references_shelf_witcher_hover_shelf_hover_state, docs_references_shelf_witcher_hover_shelf_carousel_controls, docs_references_shelf_witcher_hover_hover_reveal_pattern [INFERRED 0.85]
- **Desktop Shelf fit correction and its verification** — impeccable_surfaces_src_components_shelf_tsx_desktop_fit_correction, design_layout, _impeccable_review_bubble_shelf_test_results_shelf_fit_regression, _impeccable_review_bubble_shelf_verdict_document [INFERRED 0.85]
- **Compact rail navigation system** — docs_references_sidebar_compact_icon_only_sidebar, docs_references_sidebar_compact_nav_icon_button, docs_references_sidebar_compact_active_nav_state, docs_references_sidebar_compact_nav_group_divider, docs_references_sidebar_compact_sidebar_footer_controls [INFERRED 0.85]
- **Profile Identity Rail (name, mark, character, nav)** — docs_references_contact_gooey_pressed_about_profile_identity_block, docs_references_contact_gooey_pressed_about_blob_logo, docs_references_contact_gooey_pressed_about_pixel_character, docs_references_contact_gooey_pressed_about_pill_navigation [INFERRED 0.95]

## Communities (74 total, 13 thin omitted)

### Community 0 - "Shell, theme, and contact runtime"
Cohesion: 0.07
Nodes (51): @base-ui/react, lenis, react, metadata, RootLayout(), viewport, channels, ContactContext (+43 more)

### Community 1 - "Home page and interactive components"
Cohesion: 0.07
Nodes (42): liquid-gooey, lucide-react, @phosphor-icons/react, HomePage(), projects, AlanCharacter(), face(), measure() (+34 more)

### Community 2 - "Package and deployment config"
Cohesion: 0.04
Nodes (45): author, dependencies, @base-ui/react, @fontsource/caveat, @fontsource-variable/geist, lenis, liquid-gooey, lucide-react (+37 more)

### Community 3 - "About page copy and rhythm"
Cohesion: 0.08
Nodes (32): "Still Figuring Things Out" About Copy, Designer Who Builds With AI (Self-Description), Blue Blob Avatar Mark, Footer (Copyright, Local Time, Social Links), Handwritten "Alan" Signature, Local Time Badge (Indonesia, 10:07 AM GMT+7), Pill Navigation (Home, Know me better, Get in touch, See my resume), Pixel-Art Personal Character Illustration (+24 more)

### Community 4 - "App shell and page components"
Cohesion: 0.09
Nodes (26): nextConfig, next, react-dom, AboutPage(), experience, metadata, AlanSignature(), finish() (+18 more)

### Community 5 - "Blob buddy component logic"
Cohesion: 0.16
Nodes (27): advance(), Blink, BlobBuddy(), attend(), blink(), cancel(), lookAfter(), measure() (+19 more)

### Community 6 - "Home work grid and brand"
Cohesion: 0.11
Nodes (17): Hotel Booking Mobile App Project Card, Character Avatar Illustration Beside Intro Copy, Personal Brand Identity (Alan Sahian, Bandung-Based Product Designer), CADIT Dashboard Project Card (Laptop and Phone Mockup), Tinted Contact CTA Card with Arrow Button, Footer Meta (Edition 2026, Indonesia, Local Time GMT+7), Greenly Recipe and Meal Shopping App Project Card, Compact Header Bar (Name, Role, Logo Mark, Theme Toggle, Menu) (+9 more)

### Community 7 - "Alan character poses"
Cohesion: 0.13
Nodes (20): Alan character, Alan character standing, Standing pose, Alan character greeting, Raised hand greeting, Alan character looking left, Alan character looking left with open smile, Left head pose (+12 more)

### Community 8 - "Project preview mockups"
Cohesion: 0.15
Nodes (19): Current home project grid, Home greeting project grid, Home project grid, Aurelia, Aurelia project preview, Aurelia preview card, Villa booking interface, Munchpal (+11 more)

### Community 9 - "About statement and case tiles"
Cohesion: 0.13
Nodes (18): About Statement "From the first flow to the final component", Blue Chat Bubble Availability Indicator, Photographic Case Study Tile, Contact CTA Banner "Have something in mind?", In-Context Device Mockup Imagery, Discipline Tag Row (Product design, Design systems, Prototyping), Experience Panel (CADIT, UI/UX Designer, Oct 2025 - present), Generous Whitespace and Hairline Section Dividers (+10 more)

### Community 10 - "TypeScript config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Expanded sidebar reference"
Cohesion: 0.15
Nodes (11): Sidebar Expanded Reference Screenshot, Availability Status Indicator, Expanded Sidebar Navigation Rail, Experience Timeline List, Personal Hero Intro Block, Sidebar Identity Header (Name, Role, Avatar), Location Line with Pin Icon, Pixel-Art Avatar Illustration (+3 more)

### Community 12 - "Home pressed-CTA reference"
Cohesion: 0.15
Nodes (17): 3D Character Avatar Illustration, Capability Tags (Product design, Design systems, Prototyping), Circular Arrow Button, Client Roster (Daikin Singapore, Thai Honda, SP Group Singapore), Gooey Contact CTA in Pressed State, Have Something in Mind? Contact Panel, Current Role Entry: CADIT, UI/UX Designer, Oct 2025 to present, Footer Utility Bar (edition, local time, social links) (+9 more)

### Community 14 - "Quote card testimonial"
Cohesion: 0.18
Nodes (13): Muted attribution line, Cropped speaker portrait at card edge, Partially visible blue control below card, Quote Card (speech-bubble testimonial block), Quote typography with curly quotation marks, Centered speech-bubble tail, Arthur Morgan (Addressee), quote-rdr2.png (RDR2 quote card screenshot) (+5 more)

### Community 15 - "About hero and experience rows"
Cohesion: 0.18
Nodes (12): About hero block ("Hi, I'm Alan!" + bio paragraphs), Active nav state (filled dark circle), Experience entry row (company + role left, date range right), Experience section (stacked role rows), Compact icon-only sidebar rail, "A few things I keep coming back to" section with handwritten prompt, Location badge (Bandung, Indonesia) with pin glyph, Blue ghost logo mark at rail top (+4 more)

### Community 16 - "About two-column shell"
Cohesion: 0.18
Nodes (12): About Page Two-Column Layout, Get in Touch Primary Pill Button, Handwritten Signature Mark, Cropped Top Image Strip Gallery, Circular Arrow Button in Contact Card, Footer Meta: Edition, Local Time, Social Links, Pixel-Art Character Avatar, Persistent Profile Sidebar Rail (+4 more)

### Community 17 - "About mobile implementation"
Cohesion: 0.31
Nodes (12): About Page, Mobile Implementation, Accent Palette (Indigo, Ink, Pale Blue), Closing Signoff ('Sincerely,'), 'Say hi?' Contact Card, Curated Media Rail ('A few things I keep coming back to'), Still Figuring Things Out Section, Experience Timeline, Footer Meta Row (+4 more)

### Community 18 - "Mobile menu sheet states"
Cohesion: 0.21
Nodes (10): Active-state dot appended to current section label, Circular close (X) button, top-right of sheet, Diagonal arrow (\u2197) external-link affordance, Primary CTA: black pill "Get in touch" with speech-bubble icon, Two-line greeting headline: "Home · / Know me better", Mobile Menu Sheet (near-fullscreen rounded panel), Paylecta project card with dashboard imagery and arrow corner action, Secondary CTA: light-gray pill "See my resume" with document icon (+2 more)

### Community 19 - "About sections and footer"
Cohesion: 0.22
Nodes (12): Still Figuring Things Out Closing Section, Say Hi CTA Card with Arrow Button, Experience List with Right-Aligned Date Ranges, Footer Metadata with Local Time and Social Icons, Hero Intro Block with Location Badge and Portrait, 3D Pixel-Art Mascot Portrait, Horizontal Media Shelf of Books and Games, Alan Sahlan Personal Site About Page (full screenshot) (+4 more)

### Community 20 - "Bubble and shelf verification"
Cohesion: 0.19
Nodes (13): Bubble and Shelf browser verification record, Production build EPERM retry, Shelf fit regression at 1440, 1280 and 1001px, Bubble and Shelf verdict, Ship disposition scoped to scored fixes, Greeting and Shelf correction milestone, Shelf quote bubble update, Responsive rail and character adaptation (+5 more)

### Community 21 - "Site context and design references"
Cohesion: 0.24
Nodes (12): About, Shelf, pen.dev design references, Design and code handoff contract, Open book hover reference, About laptop character greeting, About Red Dead quote state, Mobile character greeting state (+4 more)

### Community 22 - "About implementation reference"
Cohesion: 0.24
Nodes (9): About Page Implementation Reference (2026 Edition), Active Nav Pill State (Know me better), Experience List with Right-Aligned Date Ranges, Footer Meta Bar (edition year, local time, social links), Hero Intro: Hi, I'm Alan! with Location and Portrait, Media Carousel (A few things I keep coming back to), Dark Pill CTA (Get in touch), Profile Sidebar (name, role, avatar, nav) (+1 more)

### Community 23 - "Portfolio refinement review"
Cohesion: 0.18
Nodes (4): Portfolio refinement finish review, Six desktop and mobile finish captures, Persistence gate without PRODUCT.md, Portfolio refinement milestone

### Community 24 - "Agent instructions and skills"
Cohesion: 0.18
Nodes (10): Agent skills section, Root CONTEXT.md, Domain docs rule, graphify-out/GRAPH_REPORT.md, graphify skill, Issue tracker rule, Next.js agent rules block, Required skills for every task (+2 more)

### Community 25 - "Contact modal references"
Cohesion: 0.22
Nodes (11): Contact modal default reference, Contact channel, Contact modal, Contact modal email hover reference, Email tooltip, Faiz Intifada, Faiz Intifada portfolio reference, Selected work carousel (+3 more)

### Community 26 - "Resume and career history"
Cohesion: 0.31
Nodes (9): Muhammad Sahlan Shadiq, Alan Sahlan, Aurelia hospitality concept, CADIT UI/UX Designer, International client UI mockups, Digistar Class Telkom UI/UX internship, University of Brawijaya Computer Science, Freelance UI/UX Designer, Product design skills and tools (+1 more)

### Community 27 - "Compact rail and theme spec"
Cohesion: 0.24
Nodes (10): Compact rail, Light and dark color tokens, Desktop compact rail, Shared rail progress value, Theme toggle, Compact rail spec, Lenis smooth scrolling, Compact desktop rail milestone (+2 more)

### Community 28 - "Project context and domain docs"
Cohesion: 0.20
Nodes (6): Project, Projects page, Theme, Mobile and theme spec, Agreed first release, Projects before the Projects page exists

### Community 29 - "Mobile menu interface reviews"
Cohesion: 0.22
Nodes (10): Home and About visual system, Compact side menu, Portfolio refinement 2026-10-26, Reversible menu spring milestone, Neutral menu and interface review, Compact side menu milestone, Focus-ring clipping finding, Mask and elevation split finding (+2 more)

### Community 30 - "Portrait hover mobile"
Cohesion: 0.22
Nodes (10): Personal About / Biography Section, Body Copy Layer Behind Card, Handwritten Caption "Yep, that's me.", Hover-Triggered Portrait Reveal, 390px Mobile Viewport Composition, Polaroid-Style Photo Card, Portrait Photo of Man in Black Shirt, Portrait Hover Reference (390px) (+2 more)

### Community 31 - "Shelf and blob decisions"
Cohesion: 0.31
Nodes (6): Keep list of identity features, Shelf quote bubbles, Shelf input behavior, Soft speech bubble treatment, Blob buddy, Blue blob face asset

### Community 32 - "Signature and interaction spec"
Cohesion: 0.25
Nodes (8): Alan signature, Geist and Caveat type roles, Blob buddy interaction limits, Personal portrait interaction, Personal signature interaction, Initial verification record, Project README, Next.js 16 stack

### Community 33 - "Release checklist milestones"
Cohesion: 0.31
Nodes (9): Shell layout and spacing tokens, Personal photo print, Existing Alan character assets, About experience list milestone, Blob life update, Release checklist, Portrait early-tap guard, Portrait print update (+1 more)

### Community 34 - "Quote bubble typography"
Cohesion: 0.28
Nodes (5): Geralt of Rivia Attribution, Feb 2023 - Jun 2023 Date Range Label, Quote Callout Bubble, "The world doesn't need a hero. It needs a professional.", Downward Speech Bubble Tail

### Community 35 - "Magnetic contact controls spec"
Cohesion: 0.25
Nodes (8): Magnetic arrow reduced-motion test retry, Contact panel, Magnetic contact controls, Native pointer rule, Contact modal interaction, Magnetic contact controls spec, Magnetic contact-arrow update, Sticky cursor removal

### Community 36 - "Magnetic pill CTA hierarchy"
Cohesion: 0.39
Nodes (4): Stacked Vertical Hero CTA Group, Get in Touch Primary CTA, Magnetic Pill Button Reference Screenshot, See My Resume Secondary CTA

### Community 37 - "Portrait hover reference"
Cohesion: 0.29
Nodes (8): Dark Interior Backdrop with Wall Sconce, Handwritten Caption "Yep, that's me.", Hover State Trigger for Portrait, Playful Personal-Brand Voice, Portrait Photo of a Person in Black Shirt, Rounded Portrait Card, Portrait Hover Reference (320px), Rounded Reveal on Hover Interaction

### Community 38 - "Shelf and quote card visuals"
Cohesion: 0.36
Nodes (4): Curated Taste As Portfolio Signal, Experience Entry Header, Media Shelf Strip, Pull Quote Card

### Community 39 - "Issue tracker workflow"
Cohesion: 0.43
Nodes (6): Developer ticket assignment, Child sub-issues, Native issue dependencies, gh CLI, GitHub Issues, Wayfinding effort map

### Community 40 - "Blob mascot hero alignment"
Cohesion: 0.43
Nodes (4): Blue Blob Mascot Character, Hero Intro Statement Line, Pressed Blob Deformation State, Blob Pressed State Reference Screenshot

### Community 41 - "Contact CTA card"
Cohesion: 0.43
Nodes (6): Circular Arrow CTA Button, Asymmetric Content-Left Action-Right Layout, Contact CTA Card (lavender surface), Film Recommendation Microcopy, Low-Friction Invitation Pattern, "Say hi?" Headline

### Community 42 - "Home design reference"
Cohesion: 0.47
Nodes (6): Home, Site purpose, Current Home comparison screenshot, Home character greeting state, Contact CTA, Home design reference

### Community 43 - "Triage labels"
Cohesion: 0.33
Nodes (5): needs-info, needs-triage, ready-for-agent, ready-for-human, wontfix

### Community 44 - "Blob blink state"
Cohesion: 0.47
Nodes (6): Blink State (eyes closed, single frame), Blob Character (blue amoeba mascot), Organic Blob Silhouette with Head Tuft, Closed Eye Strokes (two short white horizontal dashes), Flat Saturated Blue Fill on White Canvas, Centered Square Canvas Framing with Generous Whitespace

### Community 45 - "Blob pressed state"
Cohesion: 0.53
Nodes (6): Blue Organic Blob Body, Interrupted Black Circle Outline, Two Round White Eye Cutouts, Press Squash Deformation, Blob Pressed Side Reference Image, Side Profile Orientation

### Community 46 - "Footer and sign-off block"
Cohesion: 0.33
Nodes (5): Footer Meta Row, Handwritten Signature Mark, Local Time and Location Indicator, Personal Signoff Block, Monochrome Social Icon Links

### Community 47 - "Portrait card hover"
Cohesion: 0.47
Nodes (6): Handwritten Caption 'Yep, that's me.', Card Hover Interaction Reference, Playful Personal-Branding Tone, Rounded Polaroid Frame with Inner Photo and Caption Strip, Polaroid-Style Portrait Card (hover state, 1440px), Portrait Photo of Man in Black Shirt by Doorway

### Community 48 - "Blob rebound card"
Cohesion: 0.60
Nodes (4): Blue Blob Mascot Character, Flat White Card Surface, Name and Role Identity Header, Role Phrase in Link Blue

### Community 49 - "Portrait photo reference"
Cohesion: 0.70
Nodes (5): Portrait Reference (Straight-On, Rounded Frame), Vertical Three-Quarter Portrait Composition, Rounded-Corner Mask / Card Framing, Outdoor Evening Setting with Wall Lantern and Brickwork, Young Man in Black Collared Shirt

### Community 50 - "Blob idle states"
Cohesion: 0.83
Nodes (4): Blue Blob Character Mascot, Character Animation State Set (Blink, Pressed, Rebound), Idle Pose (Rounded, Symmetric, Eyes Centered), Blob Mascot Idle State Reference

### Community 51 - "Reference quote cards"
Cohesion: 0.50
Nodes (4): Geralt of Rivia quote, Inception quote, Red Dead Redemption 2 quote, Reference quote cards

### Community 52 - "CTA cursor highlights"
Cohesion: 0.50
Nodes (4): Circular cursor highlight, Contact pill cursor highlight, Get in touch, See my resume

### Community 54 - "Vinyl record shelf items"
Cohesion: 0.50
Nodes (4): 505 vinyl record, Vinyl record with olive center, Mr. Brightside vinyl record, Vinyl record with blue center

### Community 55 - "Witcher book shelf item"
Cohesion: 0.50
Nodes (4): Opened book, Opened Witcher book artwork, Andrzej Sapkowski, Witcher book cover

### Community 56 - "About bio and employer"
Cohesion: 0.67
Nodes (3): Personal Bio Paragraph, CADIT Design Employer, Learning to Build With AI

### Community 57 - "Shelf interaction design"
Cohesion: 0.67
Nodes (3): Keyboard and touch support, Pointer-following quote, Shelf interaction design board

### Community 58 - "Alan looking down"
Cohesion: 0.67
Nodes (3): Alan character looking down, Alan character looking down with open smile, Downward head pose

### Community 59 - "Alan looking down left"
Cohesion: 0.67
Nodes (3): Alan character looking down left, Alan character looking down left with open smile, Down left head pose

### Community 60 - "Alan looking down right"
Cohesion: 0.67
Nodes (3): Alan character looking down right, Alan character looking down right with open smile, Down right head pose

### Community 61 - "Arctic Monkeys shelf item"
Cohesion: 0.67
Nodes (3): Arctic Monkeys, Favourite Worst Nightmare, Favourite Worst Nightmare album artwork

### Community 62 - "The Killers shelf item"
Cohesion: 0.67
Nodes (3): Hot Fuss, Hot Fuss album artwork, The Killers

## Ambiguous Edges - Review These
- `Blink State (eyes closed, single frame)` → `Flat Saturated Blue Fill on White Canvas`  [AMBIGUOUS]
  docs/references/blob-blink.png · relation: semantically_similar_to
- `Cropped speaker portrait at card edge` → `Partially visible blue control below card`  [AMBIGUOUS]
  docs/references/quote-inception.png · relation: conceptually_related_to

## Knowledge Gaps
- **119 isolated node(s):** `Soft speech bubble`, `Design and code handoff contract`, `Site purpose`, `Open book hover reference`, `Red Dead Redemption 2 cover artwork` (+114 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 251 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Proposal: preserve the site's identity elements` connect `Site context and design references` to `Home page and interactive components`, `App shell and page components`, `Alan character poses`, `Project preview mockups`, `Home design reference`, `Portfolio refinement review`, `Shelf and blob decisions`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `AlanCharacter()` (e.g. with `Alan character` and `measure()`) actually correct?**
  _`AlanCharacter()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Soft speech bubble`, `Design and code handoff contract`, `Site purpose` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Shell, theme, and contact runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.06597222222222222 - nodes in this community are weakly interconnected._
- **Why does `Alan character` connect `Alan character poses` to `Soft speech bubble preview`, `Release checklist milestones`, `Home page and interactive components`, `Alan waving`, `Home design reference`, `Site context and design references`, `Alan looking down`, `Alan looking down left`, `Alan looking down right`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Blink State (eyes closed, single frame)` and `Flat Saturated Blue Fill on White Canvas`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Cropped speaker portrait at card edge` and `Partially visible blue control below card`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._