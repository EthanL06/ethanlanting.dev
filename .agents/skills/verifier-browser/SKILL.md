---
name: verifier-browser
description: Verify changes to the ethanlanting.dev portfolio in a real browser, the way a visitor uses it - pages load, tabs and project links work, no console errors. Use for any change under app/, components/, data/, hooks/ or public/ that a visitor can see or click.
---

# verifier-browser

Drives the portfolio with agent-browser against the dev server of the worktree under test.

## Setup

1. `cd "$(git rev-parse --show-toplevel)"` and `pnpm install` if `node_modules` is missing.
2. Start the dev server on a free port and keep its log: `PORT=3457 pnpm dev > "$run/dev.log" 2>&1 &`. Save the PID. Wait until `curl -sf http://localhost:3457/` answers (at most 90 s), else BLOCKED with the last 30 lines of the log.
3. Use one headless browser session per run: `export AGENT_BROWSER_SESSION="verify-$(basename "$run")"` and `unset AGENT_BROWSER_HEADED`. Do not pass `--headed` unless a check needs a window (the user must act in the browser, real hover, the OS clipboard, a smooth recording), and say why in the result.
4. Sign in: no auth. A worktree has no `.env.local`, so the homepage shows the achievements paragraph, not a song. This is correct. `node --test tests/spotify.test.mjs` covers the song state.

## Steps

For each claim that touches the UI:

1. `agent-browser open http://localhost:3457<path>` and `agent-browser snapshot -i -c` to find the elements.
2. Do the flow as a user would (`click`, `fill`, `press`, `select`). Use refs from the snapshot (`click @e46`), not guessed selectors.
3. Check the result on the page (`get text`, `get url`, `is visible`), not only that no error appeared.
4. `agent-browser screenshot "$run/<claim>-<state>.png"` for each state the claim names. For UI work, take the same states and viewports as the approved mockup (`set viewport 390 844` for mobile). The site is dark only.
5. `agent-browser errors` and `agent-browser console`: a new error or warning from this change is a FAIL.

The baseline routes for a shared UI change:

- `/`: the Projects tab, then the Tech Stack button.
- A project thumbnail click to `/projects/ut-dining`, then back.
- `/nope-not-real` for the 404 page.

Do not click Send on the contact form. It posts to a real endpoint.

Adjacent probes: reload the page and check the state survives when it should; go back and forward once.

Baseline console output: Next.js logs one LCP warning for each page, for `/images/ut-dining.png` and `/images/bettercampus.png`. These warnings are on `main` and are not a FAIL. The small `xs`, `xl` badge at the bottom left is the dev-only `TailwindIndicator`.

When you run `agent-browser eval` more than once in a session, wrap the code in `(()=>{...})()`. A repeated top-level `const` is a syntax error.

## Teardown

`agent-browser close`, then stop the dev server PID you started. Stop nothing else.

## Result

PASS, FAIL or BLOCKED for each claim, with the screenshot and log paths.

## Track record
