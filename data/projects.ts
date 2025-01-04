import PinnaclesVideo from "@/videos/pinnacles-video.mp4";
import HelpMeBevoVideo from "@/videos/help-me-bevo-video.mp4";
import SharityVideo from "@/videos/sharity-video.mp4";
import EcoNestVideo from "@/videos/econest-video.mp4";
import GalaxyAdventuresVideo from "@/videos/galaxy-adventures-video.mp4";
import NuttletVideo from "@/videos/nuttlet-video.mp4";
import HealthGPTVideo from "@/videos/healthgpt-video.mp4";

export const projects = [
  {
    title: "pinnacles.",
    description:
      "A curated collection of peak resources for web developers and designers. I reached over 2,000+ unique visitors!",
    media: PinnaclesVideo,
    isVideo: true,
    url: "https://pinnacles.app",
  },
  {
    title: "Help Me Bevo",
    description:
      "A Chrome extension that plays UT Austin's iconic 3rd down animation every time you submit an assignment. I designed and built the UI. Has over 1,000+ downloads!",
    media: HelpMeBevoVideo,
    isVideo: true,
    url: "https://github.com/arjohnsonn/Help-Me-Bevo",
  },
  {
    title: "sharity",
    description:
      "A proof-of-concept that uses AI to identify donation items from medias and matches them with local charities. We placed 1st in the 2024 LaunchHacks hackathon.",
    media: SharityVideo,
    isVideo: true,
    url: "https://sharityy.vercel.app/",
  },
  {
    title: "ecoNest",
    description:
      "A platform that promotes sustainable living for eco-conscious individuals. I won 1st in Texas and 6th nationally for the 2024 Webmasters TSA competition.",
    media: EcoNestVideo,
    isVideo: true,
    url: "https://eco-nest.vercel.app/",
  },
  {
    title: "Galaxy Adventures",
    description:
      "A proof-of-concept space tourism agency with a comprehensive booking system to plan your next trip to space. I won 2nd in Texas and 4th nationally for the 2023 Webmasters TSA competition.",
    media: GalaxyAdventuresVideo,
    isVideo: true,
    url: "https://galaxy-adventures.vercel.app/",
  },
  {
    title: "Nuttlet",
    description:
      "A flashcard study tool that helps you memorize anything for free. I built it for my computer science teacher, Mr, Nutt!",
    media: NuttletVideo,
    isVideo: true,
    url: "https://nuttlet.vercel.app/",
  },
  {
    title: "HealthGPT",
    description:
      "An AI patient diagonsis system that uses GPT-3 to generate a diagnosis based on patient symptoms. I won 5th in the 2023 Computer Science Youth of America.",
    media: HealthGPTVideo,
    isVideo: true,
    url: "https://healthgpt-iota.vercel.app/",
  },
] as const;