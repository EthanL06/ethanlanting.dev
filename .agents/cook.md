---
base: main
tracker: github
branch: "{type}/{slug}"
commit: "{summary}"
review: no-mistakes
browser: agent-browser
specs: local
notify: on
ui_refs: mobbin
commands:
  install: pnpm install
  dev: pnpm dev
  check: pnpm lint && pnpm exec tsc --noEmit && node --test 'tests/*.test.mjs'
deploy_steps:
  - lib/spotify.ts
  - vercel.json
verifiers: [browser, design, tests]
---

# ethanlanting.dev

Ethan Lanting's personal portfolio at https://ethanlanting.dev. One Next.js 15 App Router app with React 19, TypeScript and Tailwind CSS 3. The homepage is server-rendered, because it reads the Spotify listening status on the server. Project pages are static and come from `data/projects.ts`. Vercel deploys `main` to production and makes a preview for each branch.

## Rules

- Follow `DESIGN.md` for all visual work. When a change alters a documented pattern, update `DESIGN.md` in the same PR.
- Do not click Send on the contact form against the live endpoint. `components/sections/Contact.tsx` posts to a real external endpoint. To test the form, intercept the request.
- Keep the Spotify variables server-only. Do not use a `NEXT_PUBLIC_` prefix, and do not fetch Spotify in the browser.
- Add projects in `data/projects.ts` and technologies in `data/tech-stack.tsx`. Use the same image for the thumbnail and the detail page.
- This repo is public. Do not put secrets or private notes in commits, issues or PRs.
- The gaps listed in `DESIGN.md` under "Existing gaps" are known. They are not regressions, and they are not patterns to copy.

## Deploy steps

Vercel deploys on merge to `main`, with no manual step. A person must act only when an environment variable changes: set it in the Vercel project settings and in `.env.local`. `lib/spotify.ts` reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. The refresh token needs the `user-read-currently-playing` scope.
