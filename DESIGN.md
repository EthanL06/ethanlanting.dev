# Website design system

This document describes the current portfolio implementation, including the Spotify listening paragraph. It incorporates the September 5, 2026 source review of the merged Spotify, profile, and layout changes. Responsive measurements come from the earlier local Chrome inspection of the homepage, both content tabs, a project detail page, the contact form, and the 404 page at 390, 640, 768, 1024, and 1440px viewports; that browser inspection was not repeated for this documentation update. Interaction timings and conditional states below come from the source, not exhaustive interaction testing.

## Visual direction

Ethan Lanting’s portfolio feels personal, compact, and focused on the work. A near-black canvas, muted gray copy, white emphasis, and pale blue links provide a quiet frame for colorful project screenshots. The animated aurora across the top and the waving emoji add personality without occupying much space.

The defining conventions are:

- Keep the introduction narrow and left-aligned within a wider content container. The empty space to its right is part of the composition.
- Use weight and color to establish hierarchy. The homepage introduction is body-sized, while project detail titles are larger.
- Present projects as open grid entries. Borders enclose screenshots, not entire cards; descriptions and actions sit directly on the page background.
- Reserve blue for actions and small highlights. Project artwork and technology logos retain their own colors.
- Use restrained outlines and spacing to separate content. The floating navigation is the main translucent surface; most of the page is flat.

## Implementation and source map

The site uses Next.js App Router, React, TypeScript, and Tailwind CSS 3. Styling lives primarily in component class names. There is no general UI component library or standalone token package. Technologies listed in the portfolio describe Ethan’s work and tools, not necessarily dependencies of this website.

| Concern                                                   | Source                                                                                                                                                                           |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme colors, container widths, CSS animation definitions | [tailwind.config.ts](tailwind.config.ts)                                                                                                                                         |
| Base text treatment and screenshot hover rules            | [app/globals.css](app/globals.css)                                                                                                                                               |
| Manrope font, global aurora, motion wrapper               | [app/layout.tsx](app/layout.tsx)                                                                                                                                                 |
| Homepage composition                                      | [app/page.tsx](app/page.tsx)                                                                                                                                                     |
| Navigation and social destinations                        | [Navbar.tsx](components/shared/Navbar.tsx), [nav-links.ts](data/nav-links.ts), [social-links.ts](data/social-links.ts)                                                           |
| Introduction and listening status                         | [About.tsx](components/sections/About.tsx), [NowPlaying.tsx](components/shared/NowPlaying.tsx)                                                                                   |
| Spotify lookup and setup                                   | [spotify.ts](lib/spotify.ts), [README.md](README.md#spotify-indicator) |
| Content tabs and shared grid entries                      | [Content.tsx](components/sections/Content.tsx), [GridItem.tsx](components/shared/GridItem.tsx)                                                                                   |
| Project and technology content                            | [projects.ts](data/projects.ts), [tech-stack.tsx](data/tech-stack.tsx)                                                                                                           |
| Project detail composition                                | [project page](app/projects/%5Bslug%5D/page.tsx), [ProjectItem.tsx](components/shared/ProjectItem.tsx)                                                                           |
| Screenshot presentation and navigation transitions        | [ProjectImage.tsx](components/shared/ProjectImage.tsx), [ProjectMotionProvider.tsx](components/shared/ProjectMotionProvider.tsx), [BackLink.tsx](components/shared/BackLink.tsx) |
| Form, footer, and error page                              | [Contact.tsx](components/sections/Contact.tsx), [Footer.tsx](components/sections/Footer.tsx), [NotFound.tsx](components/sections/NotFound.tsx)                                   |

## Color and surfaces

Only `background` and `accent` are named custom Tailwind colors. The other values are existing literal colors or opacity utilities, not additional named tokens.

| Role               | Value / utility                       | Use                                                             |
| ------------------ | ------------------------------------- | --------------------------------------------------------------- |
| Page background    | `#0E0E10`, `bg-background`            | Page, form fields, mobile tab bar; also the browser theme color |
| Default copy       | `#9C9C9C`                             | Body text, secondary actions, inactive tabs                     |
| Primary text       | `#FFFFFF`, `text-white`               | Headings, emphasized names, labels, social icons                |
| Action accent      | `#87C8FE`, `text-accent`              | Main links, contact email, focus borders, tab indicator         |
| Quiet outline      | `border-white/10`                     | Navigation, screenshots, fields, badges, section dividers       |
| Muted badge text   | `text-white/50`                       | Project technology labels                                       |
| Navigation surface | `bg-background/75`                    | Fixed pill with `backdrop-blur-lg`                              |
| Spotify identity   | `#1DB954`                             | Inline Spotify icon in the listening link                       |
| Required marker    | `text-red-700`                        | Asterisks beside form labels                                    |
| Filled action      | `bg-white text-background`            | Send button                                                     |

Links commonly fade to `text-accent/80` or `text-white/80` on hover. Social icons use 75% opacity. Fields move from a 10% white border to `accent/50` on hover and solid accent on focus.

The global aurora is an absolutely positioned, pointer-transparent, 192px-high layer with a 40px blur (`h-48 blur-2xl`). The layout supplies `#264653`, `#3A86FF`, `#8ECAE6`, `#B5EAD7`, and `#CDB4DB`, with amplitude `1`, blend `0.5`, and speed `0.5`. The shader defines only three color stops; treat the five-value configuration as an implementation mismatch, not a verified five-stop gradient. See [Aurora.tsx](components/shared/Aurora.tsx).

## Typography

Manrope is loaded through `next/font/google` and applied to the body with antialiasing. There is no secondary display font. Global base styles set relaxed line height and force tight tracking (`-0.025em`); size utilities and explicit line-height utilities determine the resulting line height per element.

Sizes below assume the default 16px root font size.

| Element                                | Size                               | Weight / treatment                                                                   |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| Homepage introduction and biography    | 16px                               | Medium 500; 26px measured line height; names and achievements use white semibold 600 |
| Project detail title                   | 36px (`text-4xl`)                  | Bold 700, white                                                                      |
| Project / technology title             | 16px (`text-base`)                 | Extra bold 800, white                                                                |
| Contact heading                        | 18px (`text-lg`)                   | Extra bold 800, centered                                                             |
| Card descriptions                      | 14px (`text-sm`)                   | Medium 500, relaxed line height                                                      |
| Navigation and tabs                    | 14px                               | Navigation 500; tabs 600, active tab 800                                             |
| External URL in a grid entry           | 14px                               | Bold 700, accent                                                                     |
| Form text, labels, Send               | 12px (`text-xs`)                   | Labels and actions use semibold 600                                                  |
| Project technology badges              | 10px, 12px from `sm`               | Semibold 600, uppercase                                                              |
| Spotify listening paragraph           | 16px                               | Inherits introduction text; song and artist use white semibold 600 |
| Old-site link                         | 10px                               | Small supporting text                                                                |
| Brand mark `EL`                       | 36px                               | Bold 700, white text                                                                 |
| 404 heading                            | 36px → 48px at `sm` → 60px at `md` | Extra bold 800, white                                                                |

Descriptions use `text-pretty`; the contact introduction uses centered `text-balance`. Preserve readable wrapping and compact hierarchy when extending the site.

## Layout and responsive behavior

Home and project pages share a full-width wrapper with a minimum viewport height, 32px top padding, and horizontal padding of 20px below `sm` or 64px at `sm` and above. A 64px gap separates the header row from the main content. The header mark and social icons align to the outer page gutters; the main content sits in a narrower centered container.

The Tailwind container is capped at 1024px from `lg` onward, including `xl` and `2xl`. Its rendered width is also constrained by the wrapper’s available inner width.

| Viewport      | Measured main width | Grid columns | Navigation / form behavior                    |
| ------------- | ------------------- | ------------ | --------------------------------------------- |
| 390px         | 350px               | 1            | Floating nav hidden; name/email stacked       |
| 640px (`sm`)  | 512px               | 1            | Floating nav visible; name/email side by side |
| 768px (`md`)  | 640px               | 2            | Same desktop navigation and form arrangement  |
| 1024px (`lg`) | 896px               | 3            | Three project / technology columns            |
| 1440px        | 1024px              | 3            | Container stops growing                       |

The homepage flows from header to introduction, Projects / Tech Stack switcher and grid, contact form, then footer. Main sections have a 48px gap. The introduction has a 500px maximum width and 24px gaps between its content groups.

Project grids use 40px gaps and 24px padding above the first row. Technology grids use the same columns and horizontal gap; their vertical gap increases from 40px to 64px at `sm`.

The tab bar sticks to the top of the viewport below 640px, with an opaque background and `z-10`. At `sm` it becomes ordinary positioned content. The desktop navigation remains fixed 32px from the top at `z-50`. There is no mobile replacement menu; the logo, social links, introduction actions, and page content remain available.

Project detail pages flow from Go Back to a wrapping title / metadata / action row, a full-width screenshot, and the footer. The description column is capped at 500px. Actions fit to its right when space permits and wrap below it on narrower screens.

### Spacing and shape vocabulary

| Value            | Existing use                                                               |
| ---------------- | -------------------------------------------------------------------------- |
| 4–8px            | Inline icon gaps, label spacing, badge gaps                                |
| 12px             | Grid-entry internal gap                                                   |
| 16px             | Introduction action gap, project-detail copy gap                           |
| 24px             | Biography groups, form groups, grid top padding, footer vertical padding   |
| 32px             | Page top padding, navigation link / social icon gaps                       |
| 40px             | Grid spacing                                                               |
| 48px             | Main section gaps, contact vertical padding, detail copy bottom margin     |
| 64px             | Header-to-main gap, desktop horizontal gutters, larger technology row gaps |
| 4px radius       | Technology badges (`rounded`)                                              |
| 8px radius       | Project thumbnails                                                         |
| 16px radius      | Detail screenshot and message textarea                                     |
| Full pill radius | Navigation, single-line inputs, Send button                                |

Borders are 1px. The large project screenshot and its transition overlay use `shadow-2xl shadow-accent/10`; ordinary grid entries do not use elevated card surfaces.

## Components and states

### Header and introduction

The header row is 48px high. `EL` links home; three 24px social icons sit on the right. The desktop navigation uses 20px horizontal and 12px vertical padding, a subtle outline, and a blurred translucent background.

The introduction starts with a 30px waving-hand emoji button and the greeting “Hi, I'm Ethan!” The biography lists Lead Software Engineer at BetterCampus and Web Developer at UT Austin as current roles, with Cloudflare and Planview as former internships. White semibold spans highlight employers and achievements. Employer links reveal a 1px underline over 300ms.

The listening or achievements paragraph follows the biography, before the actions. Contact Me is the blue primary text action; View Resume is white. Both pair text with a 14px northeast arrow and use `shrink-0`; their row wraps with a 16px gap when space is limited. The resume opens [resume.pdf](public/files/resume.pdf) in a new tab.

### Projects and technologies

Projects is the initial selection. Active tabs are white and extra bold; inactive tabs are muted gray. Both tab buttons use `shrink-0` to preserve their widths. A small blue dot with a ping animation accompanies Tech Stack regardless of selection. Switching tabs replaces the grid directly, with no tab-panel transition.

Both lists reuse `GridItem`: media, heading, description, then an optional external URL. Flexible description height aligns bottom actions within a grid row. Project thumbnails and titles link to the detail route. The external URL is shown without its protocol, `www.`, or trailing slash, and truncated to one line. Its arrow shifts up and right on hover.

Technology entries replace screenshots with brand icons, generally 64px; the custom Java SVG is 64 × 72px. Their title links currently have a routing defect described below.

### Project screenshots and detail metadata

Screenshots use `next/image`, a 16:9 aspect ratio, centered `object-cover`, and clipped rounded borders. Thumbnail dimensions are declared as 480 × 270; detail dimensions are declared as 1440 × 810. These are presentation dimensions, not a guarantee of every source file’s intrinsic resolution. Existing artwork lives in [public/images](public/images).

Preserve each project’s own screenshot or device mockup and its colors. The portfolio supplies the frame. Use the same asset for the thumbnail and detail image so navigation has visual continuity. Detail images link to the external project when a URL exists.

Project metadata is rendered as wrapping, outlined uppercase badges with 8px horizontal and 4px vertical padding. Open Project is an accent text link; View Code is a quieter secondary link and appears only when a repository URL exists.

### Spotify listening paragraph

`NowPlaying` renders a paragraph between the biography and the introduction actions, with two visible states:

- Playing: “I'm currently listening to” followed by a Spotify link containing a green 14px icon and the song title and artist, separated by an em dash. The link uses white semibold text within the ordinary introduction paragraph; text wraps naturally without a truncation rule.
- Fallback: the complete achievements paragraph listing a state finalist placement, a state win, two national finalist placements, and two hackathon wins. Paused or absent playback, unsupported items such as episodes or local tracks, missing credentials, and API failures use this state. The lookup also rejects playback when the response explicitly marks the device as a private session.

The song link opens Spotify in a new tab with `noopener noreferrer` and an accessible label naming the song, artist, and destination. Its decorative icon is hidden from assistive technology. A 1px underline reveals on hover over 300ms; keyboard focus adds a 2px accent outline with a 2px offset. Reduced-motion preferences disable the link and underline transitions.

The dynamic homepage awaits the server lookup before rendering and caches its result with a 15-second revalidation interval. The browser receives the selected paragraph in the server HTML. There is no album artwork, card surface, loading placeholder, client polling, or hydration-time copy swap. The paragraph stays unchanged during a visit; a later server render can select different content and produce a different paragraph height. Credentials and setup instructions are documented in [README.md](README.md#spotify-indicator).

### Contact form

The contact section is bounded by horizontal rules and 48px vertical padding. The centered form is at most 526px wide; its heading and explanatory text are capped at 430px. Name and Email share a row from `sm`; Message always spans the width and has a 112px minimum height.

Fields use the page background, 12px text, 12px horizontal / 8px vertical padding, and visible labels. Native required-field and email validation are enabled. Focus replaces the default outline with the accent border. The compact white Send pill aligns right and uses a 14px icon.

While submitting, the button is disabled and a spinner replaces the send icon; its text stays “Send.” The success path clears the fields and opens a browser alert. Failures are logged without visible feedback. These states were read from source; the external contact endpoint was not submitted during the design review.

### Footer and 404

At `sm` and above, the footer has copyright and an old-site link on the left, a waving hand-sign button in the center, and Austin location / time on the right. Below `sm`, the emoji moves above wrapping metadata. Small 405px and 420px adjustments control old-site-link alignment and metadata distribution.

The clock updates once per second using `America/Chicago`; the displayed `CST` suffix is hardcoded. The year is computed dynamically.

The 404 page centers a large white heading, short muted explanation, and blue Return Home link in a full-height view. It retains the global aurora and adds a softly blurred, animated 500px blob behind the message. It omits the regular navigation and footer.

## Motion

Motion is implemented with Tailwind / CSS, `motion/react`, OGL for the aurora, and `canvas-confetti` for emoji interactions.

| Interaction                              | Implemented behavior                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| Screenshot hover                         | 200ms ease; opacity `0.85`, scale `1.04`, only for hover-capable fine pointers           |
| Screenshot hover with reduced motion     | Opacity change only; no scale                                                            |
| Thumbnail-to-detail image                | 400ms; cubic Bézier `(0.77, 0, 0.175, 1)`; image overlay moves and scales between bounds |
| Detail-to-thumbnail image                | 500ms spring, bounce `0.1`; user interaction can end the return overlay                  |
| Detail copy following image navigation   | 200ms opacity / 4px upward reveal; 35ms stagger beginning after 70ms                     |
| Reduced-motion detail copy               | 140ms fade, no displacement or stagger                                                   |
| Aurora reveal following image navigation | 400ms fade; 140ms under reduced motion                                                   |
| Text links and arrow movement            | Typically 300–500ms; arrows move 2px                                                     |
| Waving emoji                             | Repeating 2-second rotation; introduction button also scales on hover and press          |
| 404 blob                                 | Repeating 10-second transform / opacity and color cycles                                 |

The screenshot transition is reserved for eligible pointer navigation. Reduced-motion preferences bypass the image transform. Touch devices use ordinary page navigation for project-image links. Shared motion settings use `reducedMotion="user"`, but that setting does not cover the independent CSS, canvas, or WebGL animations.

Global CSS also defines `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Motion components repeat these values as arrays. Tailwind separately defines `in-out-quint` as `(0.83, 0, 0.17, 1)`; it is not the same curve.

## Existing gaps to keep separate from design intent

These are observations about the current implementation, not patterns to reproduce:

- **Technology title destinations:** `GridItem` always constructs `/projects/${slug}` for its heading, while technology entries have no slug. Chrome inspection confirmed `/projects/undefined`. Their separate external URL links have the intended destinations.
- **Tab semantics:** the visual switcher uses buttons without tab roles, selected-state attributes, panel associations, or arrow-key handling. It should not be treated as an accessible tab implementation template.
- **Reduced motion:** project motion has explicit accommodations, but the aurora, emoji waves, ping indicator, 404 blob, and confetti have no equivalent preference handling in their own code.
- **Form feedback:** errors are not shown to visitors, and success uses a browser alert rather than inline status. A completed product flow should expose failure and submission status accessibly.
- **Clock label:** `America/Chicago` handles daylight saving time, while the hardcoded `CST` label does not describe every date correctly.
- **Aurora configuration:** the layout supplies five colors to a shader declaring three stops. Reconcile that mismatch before treating the configured palette as a reusable gradient contract.

## Extending the design

Use the existing palette, Manrope hierarchy, page wrapper, grid, and link treatments as the starting point. Add project content through `data/projects.ts` and technology content through `data/tech-stack.tsx`; reuse the existing screenshot and metadata components for project pages. Keep promotional claims tied to actual project content, and keep copy short, concrete, and in Ethan’s first-person voice where appropriate.

Preserve the contrast between a compact introduction and generous project imagery. Reuse the current radii and subtle outlines before introducing another surface treatment. Keep brand-specific colors inside artwork and provider identities; new primary site actions should use the existing accent.

When changing shared UI, inspect the homepage in both tabs, a project detail page, and the contact section at narrow and wide widths. Check keyboard focus, long titles and URLs, missing optional media, and reduced-motion behavior. Development-only breakpoint badges and Next.js indicators visible in local previews are not part of the production design.
