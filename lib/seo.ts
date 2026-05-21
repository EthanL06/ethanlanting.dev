import type { Project } from "@/data/projects";

export const siteUrl = "https://ethanlanting.dev";
export const siteName = "Ethan Lanting";
export const siteTitle = "Ethan Lanting | Software Engineer & Product Builder";
export const siteDescription =
  "Hi, I'm Ethan Lanting, a software engineer building polished products people actually use, from full-stack apps to real-world tools used by millions.";
export const siteLastModified = new Date("2026-05-21T00:00:00.000Z");

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

export const projectTitle = (project: Project) =>
  `${project.title} | Ethan Lanting`;

const truncateDescription = (description: string, maxLength = 158) => {
  if (description.length <= maxLength) {
    return description;
  }

  const trimmed = description.slice(0, maxLength - 3);
  return `${trimmed.slice(0, trimmed.lastIndexOf(" "))}...`;
};

export const projectDescription = (project: Project) =>
  truncateDescription(project.description);
