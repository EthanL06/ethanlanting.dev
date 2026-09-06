### 👋 Hi, I'm Ethan—a developer, designer, and creator.

I’m a web/mobile developer with 6+ years of experience, focused on building clean, functional, and fun projects. I love creating tools that people enjoy using and exploring new ideas through design and code.

Check out my portfolio for more: [ethanlanting.dev](https://ethanlanting.dev/)

### Spotify indicator

Uses `@spotify/web-api-ts-sdk` to show the owner's currently playing song. Set
`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in
`.env.local` and Vercel's environment variables. The refresh token must have the
`user-read-currently-playing` scope. Keep all three server-only (no `NEXT_PUBLIC_`
prefix). Reauthorize if the refresh token is revoked.

The homepage resolves Spotify on the server before rendering. A playing track
replaces the achievements paragraph with a song link; paused playback and API
failures keep the original achievements text. Results are cached for 15 seconds.
The paragraph stays unchanged during the visit: there is no browser polling or
loading-text swap. No listening history is stored.

Run the API checks with `node --test tests/spotify.test.mjs`.
