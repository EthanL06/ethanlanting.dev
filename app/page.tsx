import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Content from "@/components/sections/Content";
import Footer from "@/components/sections/Footer";
import Aurora from "@/components/shared/Aurora";
import Navbar from "@/components/shared/Navbar";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

export default function Home() {
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
      <Aurora
        colorStops={[
          "#264653", // deep desaturated teal
          "#3a86ff", // cool electric blue
          "#8ecae6", // frosty light blue
          "#b5ead7", // soft mint green
          "#cdb4db", // pale lavender
        ]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="absolute inset-0 h-48 blur-2xl"
      />

      <Navbar />

      <main className="container mx-auto flex w-full flex-col gap-y-12">
        <About />
        <Content />
        <div>
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
