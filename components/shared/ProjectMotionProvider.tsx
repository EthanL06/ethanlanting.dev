"use client";

import { LayoutGroup, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const ProjectMotionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="project-navigation">{children}</LayoutGroup>
    </MotionConfig>
  );
};

export default ProjectMotionProvider;
