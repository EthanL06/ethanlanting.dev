import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProjectItem = (project: Project) => {
  return (
    <div className="mb-12 mt-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-6">
      <div className="flex w-full max-w-[31.25rem] flex-col gap-4">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          {project.title}
        </h2>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <div
              key={tech}
              className="rounded border border-white/10 px-2 py-1 text-[.625rem] font-semibold uppercase text-white/50 transition-colors hover:cursor-default hover:border-white/25 hover:text-white sm:text-xs"
            >
              {tech}
            </div>
          ))}
        </div>
        <p>{project.description}</p>
      </div>

      <div className="flex items-center justify-end gap-4">
        {project.url && (
          <Link
            className="group text-sm font-medium text-accent transition-colors duration-300 ease-in-out hover:text-accent/80"
            href={project.url}
            target="_blank"
          >
            Open Project{" "}
            <ArrowUpRight
              className="inline-block shrink-0 transform transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              size={14}
            />
          </Link>
        )}

        {project.repo && (
          <Link
            className="group text-sm font-medium opacity-100 transition-all duration-300 ease-in-out hover:opacity-80"
            href={project.repo}
            target="_blank"
          >
            View Code
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
