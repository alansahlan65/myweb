# Graph Report - pen.dev Personal Web  (2026-10-29)

## Corpus Check
- Large corpus: 145 files · ~1,037,223 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 844 nodes · 1287 edges · 68 communities (56 shown, 12 thin omitted)
- Extraction: 81% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 235 edges (avg confidence: 0.84)
- Token cost: 323,906 input · 94,705 output

## Community Hubs (Navigation)
- Design system and release notes
- Home page project sections
- Home page reference screenshots
- About page reference screenshots
- About page implementation
- About page and Next config
- Home page composition
- Blob buddy animation
- Alan character pose assets
- About mobile layout
- About page project cards
- Package manifest and footer
- About gooey press reference
- About experience timeline
- About page review and handoff
- TypeScript config
- Agent workflow and design specs
- Shared design proposals
- Shelf cover art hover
- About page layout reference
- About page implementation details
- App shell and smooth scroll
- About mobile bio and signature
- Contact provider and navigation
- Playwright test helpers
- Blob pressed state reference
- Portrait card mobile detail
- Home hero reference screenshot
- Magnetic pill button reference
- Witcher shelf reference
- Contact CTA card
- Mobile menu overlay
- Polaroid portrait card
- Portrait hover reveal
- Menu motion hooks
- Issue tracker workflow
- Eames quote bubble
- Geralt quote bubble
- Sidebar motion hook
- Next.js agent rules
- Triage labels
- Blob blink reference
- Blob pressed side reference
- Red Dead quote bubble
- NPM scripts
- Portrait straight reference
- Portrait print release
- Blob idle reference
- Paylecta project card
- Quote card references
- Contact pill cursor
- Vinyl record artwork
- Shelf pointer quote design
- Alan character down pose
- Alan character up-right pose
- Arctic Monkeys album
- The Killers album
- Signature spec
- Alan character greeting assets
- Alan portrait photo
- Inception film poster
- Red Dead quote state

## God Nodes (most connected - your core abstractions)
1. `Alan character` - 37 edges
2. `AlanCharacter()` - 23 edges
3. `Shelf` - 23 edges
4. `BlobBuddy()` - 21 edges
5. `MagneticContactButton()` - 17 edges
6. `compilerOptions` - 16 edges
7. `About` - 16 edges
8. `react` - 15 edges
9. `SiteShell()` - 14 edges
10. `schedule()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Proposed earlier CADIT context` --semantically_similar_to--> `CADIT UI/UX Designer`  [INFERRED] [semantically similar]
  docs/references/faizintifada-review/DESIGN.md → public/resume/alan-sahlan-resume.pdf
- `Alan character` --implemented_by--> `AlanCharacter()`  [INFERRED]
  docs/references/pen-home.png → src/components/alan-character.tsx
- `Portrait` --implemented_by--> `Portrait()`  [INFERRED]
  docs/references/implementation-character-arm-mobile.png → src/components/portrait.tsx
- `Shelf` --implemented_by--> `Shelf()`  [INFERRED]
  CONTEXT.md → src/components/shelf.tsx
- `Contact panel` --conceptually_related_to--> `Contact modal`  [INFERRED]
  DESIGN.md → docs/references/contact-modal-hover.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Compact rail intent, spec, implementation, and verification** — context_compact_rail, design_compact_rail, docs_interaction_spec_compact_rail, docs_release_checklist_compact_rail [EXTRACTED 1.00]
- **Sidebar CTA pair: filled contact pill above tinted resume pill** — docs_references_magnetic_pill_get_in_touch_button, docs_references_magnetic_pill_resume_button, docs_references_magnetic_pill_sidebar_action_stack, docs_references_magnetic_pill_cta_hierarchy [EXTRACTED 1.00]
- **Shelf quote bubble concept, spec, design, and verification** — context_shelf, design_shelf_quote_bubbles, docs_interaction_spec_shelf_input, docs_release_checklist_shelf_quote_bubble [EXTRACTED 1.00]
- **Contact modal pattern, spec, panel, and magnetic trigger** — docs_references_contact_modal_hover_contact_modal, docs_interaction_spec_contact_modal, design_contact_panel, design_magnetic_contact_controls [INFERRED 0.95]

## Communities (68 total, 12 thin omitted)

### Community 0 - "Design system and release notes"
Cohesion: 0.05
Nodes (49): Compact rail, Blob buddy component, Color tokens, Desktop compact rail component, Contact panel, Alan Sahlan website design system, Layout tokens and shell widths, Magnetic contact controls (+41 more)

### Community 1 - "Home page project sections"
Cohesion: 0.08
Nodes (38): HomePage(), projects, AlanCharacter(), face(), measure(), onBlur(), onKeyDown(), onLeave() (+30 more)

### Community 2 - "Home page reference screenshots"
Cohesion: 0.06
Nodes (45): 3D Character Avatar Illustration, Dark Circular Arrow CTA Button, Client Roster Daikin, Thai Honda, SP Group, Sidebar Collapse Chevron Button, Have Something In Mind Contact Banner, Product Design, Design Systems, Prototyping Tags, CADIT UI UX Designer Experience Entry, Page Footer (+37 more)

### Community 3 - "About page reference screenshots"
Cohesion: 0.07
Nodes (40): About narrative copy, About page screenshot, Neutral palette with lavender accent, Active nav pill state, Alan Sahlan identity block, Pixel-art avatar portrait, Blue blob mark, Footer meta bar (+32 more)

### Community 4 - "About page implementation"
Cohesion: 0.09
Nodes (32): Pixel-Art Character Avatar, Two-Paragraph Personal Bio, Sidebar Collapse Chevron Control, Circular Arrow Button With Diagonal Arrow, Say Hi Contact Card On Pale Blue Panel, Get In Touch Black Pill Button, Experience Section With Dated Rows, Footer With Edition, Local Time, And Socials (+24 more)

### Community 5 - "About page and Next config"
Cohesion: 0.10
Nodes (26): nextConfig, next, react-dom, AboutPage(), experience, metadata, AlanSignature(), finish() (+18 more)

### Community 6 - "Home page composition"
Cohesion: 0.10
Nodes (29): Home, Project, Projects page, Agreed first release, Projects before the Projects page exists, Site purpose, Current Home comparison screenshot, Current home project grid (+21 more)

### Community 7 - "Blob buddy animation"
Cohesion: 0.16
Nodes (27): advance(), Blink type, BlobBuddy(), attend(), blink(), cancel(), lookAfter(), measure() (+19 more)

### Community 8 - "Alan character pose assets"
Cohesion: 0.10
Nodes (25): Existing Alan character assets, Alan character, Responsive introductions and header, Alan character standing, Standing pose, Alan character greeting, Raised hand greeting, Alan character looking down left (+17 more)

### Community 9 - "About mobile layout"
Cohesion: 0.12
Nodes (25): Personal Bio Paragraphs, Blue Blob Logo Mark, Off-white Palette with Blue Accent, Say hi Contact Card with Arrow Button, Still Figuring Things Out Paragraph, Editorial Type Scale with Serif Headings, Hairline Divider Between Experience Rows, Experience Entry (Company, Role, Date Range) (+17 more)

### Community 10 - "About page project cards"
Cohesion: 0.11
Nodes (24): About Section: From The First Flow To The Final Component, Aurelia Hospitality Booking Project Card, Cartoon Avatar Illustration, Blue Link Accent Color, Contact Call To Action Band: Have Something In Mind, Circular Black Arrow Button, CADIT UI/UX Designer Experience Entry, Oct 2025 To Present, Footer With Edition Year, Local Time And Social Links (+16 more)

### Community 11 - "Package manifest and footer"
Cohesion: 0.16
Nodes (20): dependencies, devDependencies, name, private, version, @base-ui/react, @fontsource/caveat, @fontsource/libre-baskerville (+12 more)

### Community 12 - "About gooey press reference"
Cohesion: 0.14
Nodes (20): First-Person About Body Copy, Circular Dark Arrow Action Button, 3D Avatar Illustration of the Author, Sidebar Collapse Chevron Control, Edition and Copyright Mark, Footer Meta Row, Get in Touch Primary Button in Pressed Gooey State, Name and Role Lockup (+12 more)

### Community 13 - "About experience timeline"
Cohesion: 0.14
Nodes (20): About Section Headline: From the first flow to the final component, Aurelia Project Card, Hospitality Booking Site, 3D Character Avatar Illustration Beside Intro, Blue Accent Color Reserved for the CADIT Link, Capability Tag Chips: Product Design, Design Systems, Prototyping, Client List Line: Daikin Singapore, Thai Honda, SP Group Singapore, Lavender Contact CTA Card with Arrow Button, Oversized Display Type Used for Section Statements (+12 more)

### Community 14 - "About page review and handoff"
Cohesion: 0.22
Nodes (18): About desktop review, Shelf quote bubble, About mobile shelf review, Keyboard focus outline, About focus review, Narrow mobile shelf review, Medium shelf quote review, Tablet About shelf review (+10 more)

### Community 15 - "TypeScript config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 16 - "Agent workflow and design specs"
Cohesion: 0.13
Nodes (18): docs/adr Architecture Decision Records, Agent Skills Section, Root CONTEXT.md, Domain Documentation Set, Domain Docs Agent Guide, GRAPH_REPORT.md, graphify-out Directory, graphify query Command (+10 more)

### Community 17 - "Shared design proposals"
Cohesion: 0.16
Nodes (9): Muhammad Sahlan Shadiq, Alan Sahlan, Aurelia hospitality concept, CADIT UI/UX Designer, International client UI mockups, Digistar Class Telkom UI/UX internship, University of Brawijaya Computer Science, Freelance UI/UX Designer, Product design skills and tools (+1 more)

### Community 18 - "Shelf cover art hover"
Cohesion: 0.12
Nodes (18): Revealed Book Spine on Hover, Alan Wake Cover, Inception Cover, Killers of the Flower Moon Cover, Red Dead Redemption II Cover, Horizontal Row of Media Covers, The Last Wish (Andrzej Sapkowski) Book Cover, Date Range: Feb 2023 - Jun 2023 (+10 more)

### Community 19 - "About page layout reference"
Cohesion: 0.16
Nodes (18): Pixel-Art Character Avatar Illustration, Personal Story Bio Paragraphs, Sidebar Collapse Chevron Button, Experience Rows with Role and Date Range, Experience Section, Get in Touch Primary Pill CTA, Blue Ghost Mascot Mark, Greeting Heading "Hi, I'm Alan!" (+10 more)

### Community 20 - "About page implementation details"
Cohesion: 0.13
Nodes (17): Two-Paragraph Personal Bio, Sidebar Collapse Chevron Button, Minimal Light Editorial Layout with Generous Whitespace, Experience Row with Role, Company and Right-Aligned Dates, Experience Section, Handwritten Pick something up. Annotation, Icon-Only Vertical Navigation Rail, A few things I keep coming back to Section (+9 more)

### Community 21 - "App shell and smooth scroll"
Cohesion: 0.22
Nodes (11): metadata, RootLayout(), viewport, ContactProvider(), isDesktop(), serverDesktop(), SiteShell(), navigate() (+3 more)

### Community 22 - "About mobile bio and signature"
Cohesion: 0.22
Nodes (14): Handwritten Alan Signature With Underline, Black Circular Arrow CTA Button, Bio Paragraph: Design at CADIT, Learning With AI, Contact CTA Intent: Invite Casual Outreach, Microcopy: A film recommendation is a perfectly good reason, Footer Meta: 2026 Edition and Indonesia Local Time, Horizontal Hairline Section Dividers, Magnetic Pull CTA Interaction (+6 more)

### Community 23 - "Contact provider and navigation"
Cohesion: 0.24
Nodes (10): channels, ContactContext, contactHandle, ContactTrigger(), MenuPanel(), MobileNavigation(), pages, profiles (+2 more)

### Community 25 - "Blob pressed state reference"
Cohesion: 0.36
Nodes (10): Blue Blob Mascot Character, Blue Accent Color, White Eye Dots, Text and Mascot Hero Composition, Alan Sahlan Intro Line, Alan Sahlan Name Heading, Blob Pressed Interaction State, Product Designer Link Text (+2 more)

### Community 26 - "Portrait card mobile detail"
Cohesion: 0.22
Nodes (10): Personal About / Biography Section, Body Copy Layer Behind Card, Handwritten Caption "Yep, that's me.", Hover-Triggered Portrait Reveal, 390px Mobile Viewport Composition, Polaroid-Style Photo Card, Portrait Photo of Man in Black Shirt, Portrait Hover Reference (390px) (+2 more)

### Community 27 - "Home hero reference screenshot"
Cohesion: 0.31
Nodes (9): Blue Blob Mascot With White Eyes, Two-Line Hero Intro Block, Minimal Whitespace Left-Aligned Layout, Alan Sahlan Name Heading, Blue Inline Role Link, "is a product designer" Role Sentence, Blob Rebound Reference Screenshot, Black On White With Blue Accent Palette (+1 more)

### Community 28 - "Magnetic pill button reference"
Cohesion: 0.50
Nodes (8): Filled primary versus tinted secondary CTA hierarchy, Get in touch filled pill button, Inline icon and label button pairing, Full-radius pill control shape, Magnetic pill sidebar CTA reference capture, At-rest capture with no pointer displacement, See my resume secondary pill button, Sidebar action stack above a hairline divider

### Community 29 - "Witcher shelf reference"
Cohesion: 0.32
Nodes (8): The Last Wish, Open book hover reference, Soft speech bubble, Speech bubble preview with character, Opened book, Opened Witcher book artwork, Andrzej Sapkowski, Witcher book cover

### Community 30 - "Contact CTA card"
Cohesion: 0.39
Nodes (8): Contact Section Card, Low-Friction Contact Invitation Section Pattern, Left-Aligned Headline and Subtitle Stack, Circular Dark CTA Button with Up-Right Arrow, Magnetic Cursor-Follow Hover Effect on CTA, Pale Blue Rounded Surface, "Say hi?" Headline, "A film recommendation is a perfectly good reason." Subtitle

### Community 31 - "Mobile menu overlay"
Cohesion: 0.39
Nodes (8): Circular Close (X) Button, Large Headline "Know me better", Mobile Menu Overlay Panel, Mobile Full-Screen Drawer Navigation Pattern, Section Label with Bullet ("Home •"), Primary Pill CTA "Get in touch", Secondary Pill CTA "See my resume", Social Link Row (LinkedIn, Instagram, Behance)

### Community 32 - "Polaroid portrait card"
Cohesion: 0.36
Nodes (8): Black button-down shirt and dark trousers, Handwritten caption 'Yep, that's me.', Hover to reveal portrait interaction, Nighttime entryway with stone wall and lantern sconce, Playful first-person copy tone, Polaroid style white photo frame, Portrait hover state reference (1440), Portrait of a young man in a black shirt

### Community 33 - "Portrait hover reveal"
Cohesion: 0.36
Nodes (8): "Yep, that's me." Caption Line, Portrait Hover Card (320px reference), Rounded White Card Frame with Soft Shadow, Hover-Triggered Personal Intro Reveal, Compact Vertical Stack: Image Above Caption, Warm Neutral Palette: Cream, Charcoal, Brick, Photo of Man in Black Shirt Against Brick Wall, Handwritten Script Typeface

### Community 34 - "Menu motion hooks"
Cohesion: 0.50
Nodes (7): clamp(), useMenuMotion(), measure(), paint(), rest(), tick(), update()

### Community 35 - "Issue tracker workflow"
Cohesion: 0.43
Nodes (6): Developer ticket assignment, Child sub-issues, Native issue dependencies, gh CLI, GitHub Issues, Wayfinding effort map

### Community 36 - "Eames quote bubble"
Cohesion: 0.43
Nodes (7): Attribution: Eames, Bubble tail pointing down, Pale blue card surface with rounded corners, Dark navy typography, Quote block with caption component, Inception quote card, Quote: You mustn't be afraid to dream a little bigger, darling

### Community 37 - "Geralt quote bubble"
Cohesion: 0.43
Nodes (7): Attribution Line: Geralt of Rivia, Bubble Tail Pointer, Date Range Label: Feb 2023 - Jun 2023, Pale Blue Surface with Dark Navy Text, Quoted Testimonial Block Pattern, Witcher quote bubble, Quote Text: "The world doesn't need a hero. It needs a professional."

### Community 38 - "Sidebar motion hook"
Cohesion: 0.57
Nodes (6): clamp(), useSidebarMotion(), paint(), rest(), tick(), update()

### Community 39 - "Next.js agent rules"
Cohesion: 0.40
Nodes (6): Deprecation Notices Guidance, generate-agent-files.js, next dev Command, nextjs-agent-rules Block, This Is NOT The Next.js You Know, node_modules/next/dist/docs Guides

### Community 40 - "Triage labels"
Cohesion: 0.33
Nodes (5): needs-info, needs-triage, ready-for-agent, ready-for-human, wontfix

### Community 41 - "Blob blink reference"
Cohesion: 0.47
Nodes (6): Blink State (eyes closed, single frame), Blob Character (blue amoeba mascot), Organic Blob Silhouette with Head Tuft, Closed Eye Strokes (two short white horizontal dashes), Flat Saturated Blue Fill on White Canvas, Centered Square Canvas Framing with Generous Whitespace

### Community 42 - "Blob pressed side reference"
Cohesion: 0.53
Nodes (6): Blue Organic Blob Body, Interrupted Black Circle Outline, Two Round White Eye Cutouts, Press Squash Deformation, Blob Pressed Side Reference Image, Side Profile Orientation

### Community 43 - "Red Dead quote bubble"
Cohesion: 0.47
Nodes (6): Attribution Line: Sister Calderón, to Arthur Morgan, Soft Tinted Card Styling (Large Radius, Navy Type, Muted Secondary Text), Light Blue Rounded Quote Bubble, "Take a gamble that love exists and do a loving act.", Red Dead Redemption 2 In-Game Dialogue, Speech Bubble Tail Connector

### Community 44 - "NPM scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, typecheck

### Community 45 - "Portrait straight reference"
Cohesion: 0.70
Nodes (5): Portrait Reference (Straight-On, Rounded Frame), Vertical Three-Quarter Portrait Composition, Rounded-Corner Mask / Card Framing, Outdoor Evening Setting with Wall Lantern and Brickwork, Young Man in Black Collared Shirt

### Community 47 - "Portrait print release"
Cohesion: 0.67
Nodes (4): Personal photo print, Portrait interaction spec, Portrait early-tap guard, Portrait print update

### Community 48 - "Blob idle reference"
Cohesion: 0.83
Nodes (4): Blue Blob Character Mascot, Character Animation State Set (Blink, Pressed, Rebound), Idle Pose (Rounded, Symmetric, Eyes Centered), Blob Mascot Idle State Reference

### Community 49 - "Paylecta project card"
Cohesion: 0.67
Nodes (4): Paylecta Dashboard Laptop and Phone Mockup, Project Caption "Paylecta" with Category "Finance", Paylecta Project Image Card, Selected Work Section

### Community 50 - "Quote card references"
Cohesion: 0.50
Nodes (4): Geralt of Rivia quote, Inception quote, Red Dead Redemption 2 quote, Reference quote cards

### Community 51 - "Contact pill cursor"
Cohesion: 0.50
Nodes (4): Circular cursor highlight, Contact pill cursor highlight, Get in touch, See my resume

### Community 53 - "Vinyl record artwork"
Cohesion: 0.50
Nodes (4): 505 vinyl record, Vinyl record with olive center, Mr. Brightside vinyl record, Vinyl record with blue center

### Community 54 - "Shelf pointer quote design"
Cohesion: 0.67
Nodes (3): Keyboard and touch support, Pointer-following quote, Shelf interaction design board

### Community 55 - "Alan character down pose"
Cohesion: 0.67
Nodes (3): Alan character looking down, Alan character looking down with open smile, Downward head pose

### Community 56 - "Alan character up-right pose"
Cohesion: 0.67
Nodes (3): Alan character looking up right, Alan character looking up right with open smile, Up right head pose

### Community 57 - "Arctic Monkeys album"
Cohesion: 0.67
Nodes (3): Arctic Monkeys, Favourite Worst Nightmare, Favourite Worst Nightmare album artwork

### Community 58 - "The Killers album"
Cohesion: 0.67
Nodes (3): Hot Fuss, Hot Fuss album artwork, The Killers

## Ambiguous Edges - Review These
- `Blink State (eyes closed, single frame)` → `Flat Saturated Blue Fill on White Canvas`  [AMBIGUOUS]
  docs/references/blob-blink.png · relation: semantically_similar_to
- `Have Something In Mind Contact Banner` → `Gooey Pressed Contact Interaction State`  [AMBIGUOUS]
  docs/references/contact-gooey-pressed-home.png · relation: conceptually_related_to
- `Get In Touch Pill Button` → `Gooey Pressed Contact Interaction State`  [AMBIGUOUS]
  docs/references/contact-gooey-pressed-home.png · relation: conceptually_related_to
- `Magnetic Pull CTA Interaction` → `Mobile Contact Section on About Page`  [AMBIGUOUS]
  docs/references/contact-magnetic-mobile.png · relation: conceptually_related_to

## Knowledge Gaps
- **155 isolated node(s):** `Faiz Intifada`, `Email tooltip`, `Email copy control`, `Selected work carousel`, `VibeDev ID` (+150 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 235 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Alan character` connect `Alan character pose assets` to `Design system and release notes`, `Home page project sections`, `Home page composition`, `About page review and handoff`, `Alan character down pose`, `Alan character up-right pose`, `Alan character greeting assets`, `Witcher shelf reference`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Alan character` (e.g. with `About` and `Compact rail`) actually correct?**
  _`Alan character` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Faiz Intifada`, `Email tooltip`, `Email copy control` to the rest of the system?**
  _155 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design system and release notes` be split into smaller, more focused modules?**
  _Cohesion score 0.05388471177944862 - nodes in this community are weakly interconnected._
- **Why does `AlanCharacter()` connect `Home page project sections` to `Alan character pose assets`, `App shell and smooth scroll`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Blink State (eyes closed, single frame)` and `Flat Saturated Blue Fill on White Canvas`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Have Something In Mind Contact Banner` and `Gooey Pressed Contact Interaction State`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._