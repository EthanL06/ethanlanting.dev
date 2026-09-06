// Run with: node --test tests/spotify.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

test("listening copy renders a song or the complete original fallback on the server", async () => {
  const source = readFileSync(
    new URL("../components/shared/NowPlaying.tsx", import.meta.url),
    "utf8",
  );
  const compiled = ts
    .transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
      },
    })
    .outputText.replace(
      "@icons-pack/react-simple-icons",
      import.meta.resolve("@icons-pack/react-simple-icons"),
    )
    .replace("react/jsx-runtime", import.meta.resolve("react/jsx-runtime"));
  const { default: NowPlaying } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
  );
  const render = (track) =>
    renderToStaticMarkup(createElement(NowPlaying, { track }));
  const fallback = render(null);
  assert.equal(
    fallback.replace(/<[^>]+>/g, "").replaceAll("&#x27;", "'"),
    "I've been recognized as a 1x state finalist, 1x state winner, 2x national finalist, and 2x hackathon winner. ✌",
  );
  const playing = render({
    title: "Song & title",
    artist: "Artist",
    url: "https://open.spotify.com/track/test",
  });
  assert.match(playing, /currently listening to/);
  assert.match(playing, /href="https:\/\/open.spotify.com\/track\/test"/);
  assert.match(playing, /Song &amp; title/);
  assert(!playing.includes("recognized"));
});

test("Spotify lookup handles playback, authorization, privacy, and rate limits", async () => {
  const source = readFileSync(
    new URL("../lib/spotify.ts", import.meta.url),
    "utf8",
  );
  const compiled = ts
    .transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    })
    .outputText.replace(
      "@spotify/web-api-ts-sdk",
      import.meta.resolve("@spotify/web-api-ts-sdk"),
    );
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  Object.assign(process.env, {
    SPOTIFY_CLIENT_ID: "test-id",
    SPOTIFY_CLIENT_SECRET: "secret",
    SPOTIFY_REFRESH_TOKEN: "refresh",
  });
  const track = {
    type: "track",
    name: "Song",
    artists: [{ name: "Artist" }],
    album: { images: [] },
    external_urls: { spotify: "https://open.spotify.com/track/test" },
  };
  try {
    for (const [index, playback] of [
      { is_playing: true, item: track },
      { is_playing: false, item: track },
      null,
      { is_playing: true, item: null },
      { is_playing: true, item: { type: "episode" } },
      { is_playing: true, item: track, device: { is_private_session: true } },
    ].entries()) {
      let refreshes = 0;
      globalThis.fetch = async (url) => {
        if (String(url).includes("/api/token")) {
          refreshes++;
          return Response.json({
            access_token: "private-token",
            token_type: "Bearer",
            expires_in: 3600,
          });
        }
        return playback
          ? Response.json(playback)
          : new Response(null, { status: 204 });
      };
      const { getNowPlaying } = await import(
        `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#${index}`
      );
      const body = await getNowPlaying();
      assert.equal(body !== null, index === 0);
      if (index === 0)
        assert.deepEqual(body, {
          title: "Song",
          artist: "Artist",
          url: track.external_urls.spotify,
        });
      await getNowPlaying();
      assert.equal(refreshes, 1, "reuse access token across requests");
    }
    for (const status of [401, 429, 500]) {
      let calls = 0;
      globalThis.fetch = async () => {
        calls++;
        return Response.json({}, { status, headers: { "Retry-After": "120" } });
      };
      const { getNowPlaying } = await import(
        `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#error-${status}`
      );
      assert.equal(await getNowPlaying(), null);
      if (status === 429) {
        await getNowPlaying();
        assert.equal(
          calls,
          1,
          "do not call Spotify during rate-limit cooldown",
        );
      }
    }
    delete process.env.SPOTIFY_CLIENT_SECRET;
    globalThis.fetch = async () => {
      throw new Error("Must not fetch without credentials");
    };
    const { getNowPlaying } = await import(
      `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#missing`
    );
    assert.equal(await getNowPlaying(), null);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  }
});
