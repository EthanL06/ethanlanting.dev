interface Project {
  title: string;
  description: string;
  media: string;
  url: string;
}

export const projects = [
  {
    title: "pinnacles.",
    description:
      "A curated collection of peak resources for web developers and designers. I gained over 2,000+ unique visitors!",
    media: "/images/pinnacles.png",
    url: "https://pinnacles.app",
  },
  {
    title: "UT Registration Plus",
    description:
      "A Chrome extension that streamlines the UT Austin class registration process. I help with designing and implementing the UI. Has over 40,000+ downloads!",
    media: "/images/ut-registration-plus.png",
    url: "https://github.com/Longhorn-Developers/UT-Registration-Plus",
  },

  {
    title: "sharity",
    description:
      "A proof-of-concept that uses AI to identify donation items from medias and matches them with local charities. We won 1st in the 2024 LaunchHacks hackathon.",
    media: "/images/sharity.png",
    url: "https://sharityy.vercel.app/",
  },
  {
    title: "Help Me Bevo",
    description:
      "A Chrome extension that plays UT Austin's iconic 3rd down animation every time you submit an assignment. I designed and built the UI. Has over 1,000+ downloads!",
    media: "/images/help-me-bevo.png",
    url: "https://github.com/arjohnsonn/Help-Me-Bevo",
  },
  {
    title: "HealthGPT",
    description:
      "An AI patient diagonsis system that uses GPT-3 to generate a diagnosis based on patient symptoms. I won 5th in the 2023 Computer Science Youth of America.",
    media: "/images/healthgpt.png",
    url: "https://healthgpt-iota.vercel.app/",
  },
  {
    title: "Galaxy Adventures",
    description:
      "A proof-of-concept space tourism agency with a comprehensive booking system to plan your next trip to space. I won 2nd in Texas and 4th nationally for the 2023 Webmasters TSA competition.",
    media: "/images/galaxy-adventures.png",
    url: "https://galaxy-adventures.vercel.app/",
  },

  {
    title: "ecoNest",
    description:
      "A platform that promotes sustainable living for eco-conscious individuals. I won 1st in Texas and 6th nationally for the 2024 Webmasters TSA competition.",
    media: "/images/econest.png",
    url: "https://eco-nest.vercel.app/",
  },
  {
    title: "Nuttlet",
    description:
      "A flashcard study tool that helps you memorize anything for free. I built it for my computer science teacher, Mr, Nutt!",
    media: "/images/nuttlet.png",
    url: "https://nuttlet.vercel.app/",
  },
] as Project[];
