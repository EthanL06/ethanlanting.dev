import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="flex w-full max-w-[31.25rem] flex-col gap-6 font-medium"
    >
      <div className="flex flex-col gap-1">
        <div>
          <button className="inline-block animate-wave select-none text-3xl">
            👋
          </button>
        </div>
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
