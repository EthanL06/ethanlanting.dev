import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ConfettiButton } from "../shared/ConfettiComponent";

const About = () => {
  return (
    <section
      id="about"
      className="flex w-full max-w-[31.25rem] flex-col gap-6 font-medium"
    >
      <div className="flex flex-col gap-1">
        <ConfettiButton
          options={{
            spread: 360,
            ticks: 50,
            gravity: 0.7,
            decay: 0.94,
            startVelocity: 15,
            particleCount: 50,
            scalar: 0.8,
            shapes: ["circle", "square"],
            colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"],
            origin: {
              x: 0.5,
              y: 0.5,
            },
            zIndex: 10,
          }}
          className="w-fit transition-transform duration-300 ease-in-out hover:scale-125 active:scale-90"
        >
          <p className="inline-block animate-wave select-none text-3xl">👋</p>
        </ConfettiButton>
        <h1>
          Hi, I&apos;m <span className="font-semibold text-white">Ethan</span>—a
          developer, designer, and creator.
        </h1>
      </div>

      <p>
        I&apos;m currently a Software Engineer Intern @{" "}
        <Link
          href={"https://www.cloudflare.com/"}
          className="relative font-semibold text-white transition-colors duration-300 after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white/80 hover:after:left-0 hover:after:w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare
        </Link>
        , a Software Engineer @{" "}
        <Link
          className="relative font-semibold text-white transition-colors duration-300 after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white/80 hover:after:left-0 hover:after:w-full"
          href={
            "https://chromewebstore.google.com/detail/bettercampus-prev-betterc/cndibmoanboadcifjkjbdpjgfedanolh"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          BetterCampus
        </Link>
        , a Web Developer @{" "}
        <Link
          className="relative font-semibold text-white transition-colors duration-300 after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white/80 hover:after:left-0 hover:after:w-full"
          href={"https://mediaengagement.org/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          UT Austin
        </Link>
        , and a former Software Engineer @{" "}
        <Link
          href={"https://www.planview.com/"}
          className="relative font-semibold text-white transition-colors duration-300 ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:text-white/80 hover:after:left-0 hover:after:w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          Planview
        </Link>
        .
      </p>

      <p>
        I&apos;ve been recognized as a 1x state finalist, 1x{" "}
        <span className="font-semibold text-white">state winner</span>, 2x
        national finalist, and 2x{" "}
        <span className="font-semibold text-white">hackathon winner</span>. ✌
      </p>

      <div className="flex items-center gap-4">
        <Link
          href={"/#contact"}
          className="flex items-center gap-1 font-semibold text-accent transition-colors hover:text-accent/80"
        >
          Contact Me <ArrowUpRight size={14} />
        </Link>

        <Link
          href={"/files/resume.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-semibold text-white transition-colors hover:text-white/80"
        >
          View Resume <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default About;
