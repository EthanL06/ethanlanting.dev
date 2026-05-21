import { projects } from "@/data/projects";
import { absoluteUrl, siteLastModified } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ] as MetadataRoute.Sitemap;

  sitemap.push(
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return sitemap;
}
