export interface Project {
  title: string;
  slug: string;
  description: string;
  media: string;
  url: string;
  repo?: string;
  techStack: string[];
}

export const projects = [
  {
    title: "UT Dining",
    slug: "ut-dining",
    description:
      "A mobile app that tracks UT Austin real-time dining hall menus, nutrition info, and hours. Has over 600+ daily users with 5-star reviews on the App Store!",
    media: "/images/ut-dining.png",
    url: "https://apps.apple.com/us/app/ut-dining/id6743042002",
    repo: "https://github.com/EthanL06/UT-Dining",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "NativeWind",
      "Zustand",
      "Supabase",
      "Puppeteer",
      "SQLite",
      "RNMMKV",
      "Drizzle ORM",
      "Render",
      "GitHub Actions",
      "Husky",
    ],
  },
  {
    title: "pinnacles.",
    slug: "pinnacles",
    description:
      "A curated collection of peak resources for web developers and designers. I gained over 2,000+ unique visitors!",
    media: "/images/pinnacles.png",
    url: "https://pinnacles.app",
    repo: "https://github.com/EthanL06/pinnacles",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Zustand",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "OpenAI",
      "Cheerio",
    ],
  },
  {
    title: "UT Registration Plus",
    slug: "ut-registration-plus",
    description:
      "A Chrome extension that streamlines the UT Austin class registration process. I help with designing and implementing the UI. Has over 60,000+ downloads!",
    media: "/images/ut-registration-plus.png",
    url: "https://github.com/Longhorn-Developers/UT-Registration-Plus",
    techStack: ["React", "TypeScript", "UnoCSS", "Storybook", "Figma"],
  },
  {
    title: "sharity",
    slug: "sharity",
    description:
      "A proof-of-concept that uses AI to identify donation items from images and matches them with local charities. We won 1st in the 2024 LaunchHacks hackathon.",
    media: "/images/sharity.png",
    url: "https://sharityy.vercel.app/",
    repo: "https://github.com/EthanL06/sharity",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "Firebase",
      "Mapbox",
      "Google Vision API",
    ],
  },
  {
    title: "Help Me Bevo",
    slug: "help-me-bevo",
    description:
      "A Chrome extension that plays UT Austin's iconic 3rd down animation every time you submit an assignment. I designed and built the UI. Has over 1,000+ downloads!",
    media: "/images/help-me-bevo.png",
    url: "https://github.com/arjohnsonn/Help-Me-Bevo",
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Figma"],
  },
  {
    title: "HealthGPT",
    slug: "healthgpt",
    description:
      "An AI patient diagonsis system that uses GPT-3 to generate a diagnosis based on patient symptoms. I won 5th in the 2023 Computer Science Youth of America.",
    media: "/images/healthgpt.png",
    url: "https://healthgpt-iota.vercel.app/",
    repo: "https://github.com/EthanL06/healthgpt",
    techStack: ["Next.js", "Tailwind CSS", "Daisy UI", "OpenAI"],
  },
  {
    title: "Galaxy Adventures",
    slug: "galaxy-adventures",
    description:
      "A proof-of-concept space tourism agency with a comprehensive booking system to plan your next trip to space. I won 2nd in Texas and 4th nationally for the 2023 Webmasters TSA competition.",
    media: "/images/galaxy-adventures.png",
    url: "https://galaxyadventures.vercel.app/",
    repo: "https://github.com/EthanL06/galaxy-adventures",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Figma",
    ],
  },

  {
    title: "ecoNest",
    slug: "econest",
    description:
      "A platform that promotes sustainable living for eco-conscious individuals. I won 1st in Texas and 6th nationally for the 2024 Webmasters TSA competition.",
    media: "/images/econest.png",
    url: "https://eco-nest.vercel.app/",
    repo: "https://github.com/EthanL06/econest",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Three.js",
      "Firebase",
      "Google Places API",
      "Figma",
    ],
  },
  {
    title: "Nuttlet",
    slug: "nuttlet",
    description:
      "A flashcard study tool that helps you memorize anything for free. I built it for my computer science teacher, Mr, Nutt!",
    media: "/images/nuttlet.png",
    url: "https://nuttlet.vercel.app/",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "React Hook Form",
      "Firebase",
    ],
  },
  // {
  //   title: "say.so (work in progress)",
  //   slug: "say-so",
  //   description:
  //     "A productivity tool that creates your daily to-do list with just your voice. Simply speak about your day and the tool will generate a list of daily tasks and events for you!",
  //   media: "/images/say-so.png",
  //   url: "",
  //   techStack: [
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Supabase",
  //     "OpenAI",
  //     "Zustand",
  //     "shadcn/ui",
  //     "Framer Motion",
  //   ],
  // },
] as Project[];

export const getProjectBySlug = (slug: string) => {
  return projects.find((project) => project.slug === slug);
};
