---
name: verifier-tests
description: Run the ethanlanting.dev static checks and automated tests on the worktree under test - lint, typecheck, unit tests and a production build - and check that new behavior has a test. Use for every change.
---

# verifier-tests

## Steps

1. The full check: `pnpm lint && pnpm exec tsc --noEmit && node --test 'tests/*.test.mjs'`. Save the output. It takes less than one minute, so run all of it each time.
2. The production build: `pnpm build`. It prerenders each project page, so it finds errors in `data/projects.ts` that the check does not find.
3. A failure that also happens on the base branch is not this change's fault. Prove it: run the same command in a scratch worktree of the base. Report it as "already broken on base", not as FAIL. The lint warning at `components/shared/Aurora.tsx:215` is on the base branch.
4. New behavior needs a test. When the diff adds or changes logic and no test covers it, the claim "has a test" is FAIL. Write the missing test only if the task allows it. Tests use `node:test` in `tests/*.test.mjs`. Content-only changes in `data/` do not need a test.
5. Never skip, delete or loosen a test or a lint rule to get a pass.

`tests/spotify-navigation.mjs` is a separate browser script, not part of the check. It needs a Playwright path and a running server: `node tests/spotify-navigation.mjs <playwright-index.mjs> <site-url>`. Run it when a change touches `components/shared/NowPlaying.tsx` or `lib/spotify.ts`.

## Result

PASS, FAIL or BLOCKED, with each command, its exit code and the log path.

## Track record
