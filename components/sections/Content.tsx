"use client";

import { cn, easterEgg } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import GridItem from "../shared/GridItem";
import { techStack } from "@/data/tech-stack";
import { projects } from "@/data/projects";

const Content = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "tech stack">(
    "projects",
  );

  useEffect(() => {
    easterEgg();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-white/10 bg-background pb-4 pt-3 sm:relative sm:z-0 sm:pt-0">
        <button
          onClick={() => setActiveTab("projects")}
          className={cn(
            "text-sm font-semibold",
            activeTab === "projects"
              ? "!font-extrabold text-white"
              : "transition-colors hover:text-white/80",
          )}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("tech stack")}
          className={cn(
            "relative text-sm font-semibold",
            activeTab === "tech stack"
              ? "!font-extrabold text-white"
              : "transition-colors hover:text-white/80",
          )}
        >
          Tech Stack
          <span className="absolute -right-1.5 -top-[1px] flex size-2 translate-x-1/2 transform">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-accent"></span>
          </span>
        </button>
      </div>

      {activeTab === "projects" && <Projects />}
      {activeTab === "tech stack" && <TechStack />}
    </div>
  );
};

const Projects = () => {
  return (
    <div className="grid grid-cols-1 gap-10 pt-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <GridItem key={project.title} {...project} />
      ))}
    </div>
  );
};

const TechStack = () => {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 pt-6 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {techStack.map((tech, i) => (
        <GridItem key={i} {...tech} />
      ))}
    </div>
  );
};

export default Content;
