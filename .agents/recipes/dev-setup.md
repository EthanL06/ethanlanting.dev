# Dev setup

These steps worked in a clean worktree of `origin/main` on 2026-11-02.

1. `pnpm install`. This takes about 4 s. The "Ignored build scripts: sharp" warning did not stop the build or the dev server.
2. `PORT=3457 pnpm dev`. Without `PORT`, Next.js uses 3000. The server was ready in about 2 s.
3. Open `http://localhost:3457/`.

## Spotify

`.env.local` is optional and git-ignored, so a new worktree does not have it. Without it, the homepage shows the achievements paragraph instead of a song. This is the correct fallback. To see a song, copy `.env.local` from the main checkout. It holds `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. Do not print the values.

## Node

`package.json` wants Node 24.x. pnpm prints an "Unsupported engine" warning on other versions. The check, the build and the dev server all passed on Node 26.9.0.

## Checks

- Full check: `pnpm lint && pnpm exec tsc --noEmit && node --test 'tests/*.test.mjs'`
- Build: `pnpm build`
