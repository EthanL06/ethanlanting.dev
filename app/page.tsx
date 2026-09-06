import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Content from "@/components/sections/Content";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/shared/Navbar";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

import { unstable_cache } from "next/cache";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";
const getListeningTrack = unstable_cache(
  getNowPlaying,
  ["spotify-now-playing"],
  { revalidate: 15 },
);

export default async function Home() {
  const track = await getListeningTrack();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    jobTitle: "Software Engineer",
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: [
      "https://github.com/EthanL06",
      "https://www.linkedin.com/in/ethanlanting",
      "https://www.buymeacoffee.com/ethanlanting",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "React Native",
      "Chrome extensions",
      "AI tools",
      "Product design",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en-US",
  };

  return (
    <div
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center gap-y-16 overflow-clip px-5 pt-8 sm:px-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />

      <main className="container mx-auto flex w-full flex-col gap-y-12">
        <About track={track} />
        <Content />
        <div>
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
