import type { ListeningTrack } from "@/lib/spotify";
import { SiSpotify } from "@icons-pack/react-simple-icons";

export default function NowPlaying({
  track,
}: {
  track: ListeningTrack | null;
}) {
  if (!track)
    return (
      <p>
        I&apos;ve been recognized as a 1x state finalist, 1x{" "}
        <span className="font-semibold text-white">state winner</span>, 2x
        national finalist, and 2x{" "}
        <span className="font-semibold text-white">hackathon winner</span>. ✌
      </p>
    );

  return (
    <p>
      I&apos;m currently listening to{" "}
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Listen to ${track.title} by ${track.artist} on Spotify`}
        className="relative ml-1 font-semibold text-white transition-colors duration-300 after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white/80 hover:after:left-0 hover:after:w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:after:transition-none"
      >
        <SiSpotify
          aria-hidden="true"
          className="mr-1 inline-block size-3.5 align-[-0.125em] text-[#1DB954]"
        />
        {track.title} — {track.artist}
      </a>
      .
    </p>
  );
}
