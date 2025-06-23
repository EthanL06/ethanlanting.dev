import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Content from "@/components/sections/Content";
import Footer from "@/components/sections/Footer";
import Aurora from "@/components/shared/Aurora";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center gap-y-16 overflow-clip px-5 pt-8 sm:px-16"
    >
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
