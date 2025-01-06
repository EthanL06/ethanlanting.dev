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
        I&apos;m currently a{" "}
        <span className="font-semibold text-white">Web Developer</span> @{" "}
        <Link
          className="transition-colors hover:text-accent hover:underline"
          href={"https://mediaengagement.org/"}
          target="_blank"
        >
          UT Austin
        </Link>
        , a <span className="font-semibold text-white">Software Developer</span>{" "}
        @{" "}
        <Link
          href={"https://github.com/Longhorn-Developers"}
          className="transition-colors hover:text-accent hover:underline"
          target="_blank"
        >
          Longhorn Developers
        </Link>
        , an incoming{" "}
        <span className="font-semibold text-white">
          Software Engineering Intern
        </span>{" "}
        @{" "}
        <Link
          href={"https://www.planview.com/"}
          className="transition-colors hover:text-accent hover:underline"
          target="_blank"
        >
          Planview
        </Link>
        , and building{" "}
        <Link
          href={"https://www.instagram.com/adventurefy.app/"}
          className="font-semibold text-accent hover:underline"
          target="_blank"
        >
          adventurefy.app
        </Link>{" "}
        with friends.
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
          className="flex items-center gap-1 font-semibold text-accent hover:underline"
        >
          Contact Me <ArrowUpRight size={14} />
        </Link>

        <Link
          href={"/files/resume.pdf"}
          className="flex items-center gap-1 font-semibold text-white hover:underline"
        >
          View Resume <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default About;
