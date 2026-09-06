import { SpotifyApi, type AccessToken } from "@spotify/web-api-ts-sdk";

let token: AccessToken | undefined;
let retryAt = 0;

async function spotifyFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(2000),
  });
  if (response.status === 401) token = undefined;
  if (response.status === 429) {
    const seconds = Number(response.headers.get("Retry-After"));
    retryAt =
      Date.now() +
      (Number.isFinite(seconds) && seconds > 0 ? seconds : 60) * 1000;
  }
  return response;
}

export type ListeningTrack = { title: string; artist: string; url: string };

export async function getNowPlaying(): Promise<ListeningTrack | null> {
  const {
    SPOTIFY_CLIENT_ID: clientId,
    SPOTIFY_CLIENT_SECRET: secret,
    SPOTIFY_REFRESH_TOKEN: refreshToken,
  } = process.env;
  try {
    if (!clientId || !secret || !refreshToken || Date.now() < retryAt) {
      throw new Error("Spotify unavailable");
    }
    if (!token || (token.expires ?? 0) < Date.now() + 30000) {
      const response = await spotifyFetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        },
      );
      if (!response.ok) throw new Error("Spotify authorization failed");
      const data = await response.json();
      if (
        typeof data.access_token !== "string" ||
        !data.access_token ||
        !Number.isFinite(data.expires_in) ||
        data.expires_in <= 30
      ) {
        throw new Error("Invalid Spotify token response");
      }
      token = {
        ...data,
        refresh_token: refreshToken,
        expires: Date.now() + data.expires_in * 1000,
      };
    }
    const spotify = SpotifyApi.withAccessToken(clientId, token!, {
      fetch: spotifyFetch,
    });
    const playback = await spotify.player.getCurrentlyPlayingTrack();
    const track = playback?.item;
    const playing =
      playback?.is_playing &&
      !playback?.device?.is_private_session &&
      track?.type === "track" &&
      "album" in track &&
      !track.is_local;
    return playing
      ? {
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          url: track.external_urls.spotify,
        }
      : null;
  } catch {
    return null;
  }
}
