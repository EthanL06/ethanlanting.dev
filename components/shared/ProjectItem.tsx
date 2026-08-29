"use client";

import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { motion, stagger, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import React from "react";
import { isProjectImageForwardTransitionPending } from "./ProjectImage";

const projectCopySelector = "[data-project-copy]";
const projectDetailsSelector = "[data-project-details]";

export const prepareProjectDetailsBackTransition = () => {
  const source = document.querySelector<HTMLElement>(projectDetailsSelector);

  if (!source) return;

  const rect = source.getBoundingClientRect();
  const clone = source.cloneNode(true) as HTMLElement;
  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  clone.removeAttribute("data-project-details");
  clone.setAttribute("aria-hidden", "true");
  clone.inert = true;
  Object.assign(clone.style, {
    boxSizing: "border-box",
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    margin: "0",
    pointerEvents: "none",
    position: "fixed",
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    zIndex: "40",
  });
  document.body.appendChild(clone);

  const copy = Array.from(
    clone.querySelectorAll<HTMLElement>(projectCopySelector),
  ).reverse();
  const animations = copy.map((element, index) => {
    element.style.willChange = "opacity, transform";

    return element.animate(
      [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        {
          opacity: 0,
          transform: shouldReduceMotion
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 4px, 0)",
        },
      ],
      {
        delay: shouldReduceMotion ? 0 : index * 20,
        duration: 140,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "forwards",
      },
    );
  });
  let isRemoved = false;
  const removeClone = () => {
    if (isRemoved) return;

    isRemoved = true;
    animations.forEach((animation) => animation.cancel());
    clone.remove();
    window.removeEventListener("pointerdown", removeClone);
    window.removeEventListener("wheel", removeClone);
    window.removeEventListener("touchmove", removeClone);
    window.removeEventListener("keydown", removeClone);
  };

  window.addEventListener("pointerdown", removeClone, { once: true });
  window.addEventListener("wheel", removeClone, { once: true, passive: true });
  window.addEventListener("touchmove", removeClone, {
    once: true,
    passive: true,
  });
  window.addEventListener("keydown", removeClone, { once: true });
  void Promise.allSettled(
    animations.map((animation) => animation.finished),
  ).then(removeClone);
};

const ProjectItem = (project: Project) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimateEntry = isProjectImageForwardTransitionPending();
  const copyVariants: Variants = {
    hidden: {
      opacity: 0,
      transform: shouldReduceMotion
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 4px, 0)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: {
        duration: shouldReduceMotion ? 0.14 : 0.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      className="mb-12 mt-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-6"
      data-project-details
      initial={shouldAnimateEntry ? "hidden" : false}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: shouldReduceMotion
              ? 0
              : stagger(0.035, { startDelay: 0.07 }),
          },
        },
      }}
    >
      <div className="flex w-full max-w-[31.25rem] flex-col gap-4">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-white"
          data-project-copy
          variants={copyVariants}
        >
          {project.title}
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-2"
          data-project-copy
          variants={copyVariants}
        >
          {project.techStack.map((tech) => (
            <div
              key={tech}
              className="rounded border border-white/10 px-2 py-1 text-[.625rem] font-semibold uppercase text-white/50 transition-colors hover:cursor-default hover:border-white/25 hover:text-white sm:text-xs"
            >
              {tech}
            </div>
          ))}
        </motion.div>
        <motion.p data-project-copy variants={copyVariants}>
          {project.description}
        </motion.p>
      </div>

      <motion.div
        className="flex items-center justify-end gap-4"
        data-project-copy
        variants={copyVariants}
      >
        {project.url && (
          <Link
            className="group text-sm font-medium text-accent transition-colors duration-300 ease-in-out hover:text-accent/80"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
          >
            View Code
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectItem;
