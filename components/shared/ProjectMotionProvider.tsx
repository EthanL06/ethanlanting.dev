"use client";

import {
  motion,
  LayoutGroup,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  isProjectImageBackTransitionPending,
  isProjectImageForwardTransitionPending,
} from "./ProjectImage";

const ProjectMotionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const shouldRevealAurora =
    isProjectImageForwardTransitionPending() ||
    isProjectImageBackTransitionPending();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-background"
        initial={shouldRevealAurora ? { opacity: 1 } : false}
        animate={{ opacity: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.14 : 0.4,
          ease: shouldReduceMotion ? [0.23, 1, 0.32, 1] : [0.77, 0, 0.175, 1],
        }}
      />
      <LayoutGroup id="project-navigation">{children}</LayoutGroup>
    </MotionConfig>
  );
};

export default ProjectMotionProvider;
