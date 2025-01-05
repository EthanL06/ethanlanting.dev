import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Content from "@/components/sections/Content";
import Footer from "@/components/sections/Footer";
import Blob from "@/components/shared/Blob";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center gap-y-16 overflow-clip px-5 pt-8 sm:px-16"
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
