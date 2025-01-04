"use client";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Content from "@/components/sections/Content";
import Footer from "@/components/sections/Footer";
import Blob from "@/components/shared/Blob";
import Navbar from "@/components/shared/Navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <div
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center gap-y-16 px-5 pt-8 sm:px-16"
    >
      <Blob />
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
