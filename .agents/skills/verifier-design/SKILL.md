---
name: verifier-design
description: Verify that UI changes in the ethanlanting.dev portfolio match the approved mockup and DESIGN.md - spacing, type, color, states, responsive layout and basic accessibility. Use for any change a visitor can see.
---

# verifier-design

Runs after verifier-browser on the same dev server and session.

## Reference

- The approved spec and mockup: `.lavish/cook-spec.html`.
- The design system: `DESIGN.md`. Design tokens: `tailwind.config.ts` (`background`, `accent`, container widths) and `app/globals.css`.
- Shared components: `components/shared/`. A new one-off component where a shared one exists is a FAIL.

## Steps

1. For each screen in the mockup, take a screenshot in each state and viewport it shows (`agent-browser set viewport <w> <h>`). For a shared UI change, use the widths in `DESIGN.md`: 390, 640, 768, 1024 and 1440. The site is dark only, so skip light mode.
2. Compare each one to the mockup. List each difference as: intended (with the reason from the build) or a defect.
3. Check the tokens: no hard-coded colors, sizes or fonts where a token exists (`git diff` for hex values and px literals in the changed files). Use `bg-background` and `text-accent`, not `#0E0E10` and `#87C8FE`. `DESIGN.md` lists the other literal colors that are in use.
4. Check for overflow at 390: `agent-browser eval '(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth])()'`. The two values must be equal.
5. Long content: put long text and many items in the UI (from the mockup's state switcher, or test data). Nothing may overflow or overlap.
6. Accessibility basics: every control can be reached and used with the keyboard (`press Tab`), focus is visible, images and icon buttons have labels (`snapshot` shows names), text contrast is readable.
7. Reduced motion: when the change adds motion, check it with the reduced-motion preference. `DESIGN.md` lists the existing gaps.

## Result

PASS, FAIL or BLOCKED for each screen, with paired screenshots (mockup and real) and the list of differences.

## Track record
