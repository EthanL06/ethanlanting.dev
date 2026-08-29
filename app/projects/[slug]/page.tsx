import Footer from "@/components/sections/Footer";
import NotFound from "@/components/sections/NotFound";
import BackLink from "@/components/shared/BackLink";
import Blob from "@/components/shared/Blob";
import Navbar from "@/components/shared/Navbar";
import ProjectImage from "@/components/shared/ProjectImage";
import ProjectItem from "@/components/shared/ProjectItem";
import { getProjectBySlug, projects } from "@/data/projects";
import {
  absoluteUrl,
  projectDescription,
  projectTitle,
  siteName,
} from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      metadataBase: new URL("https://ethanlanting.dev"),
      title: "404 Not Found",
      description: "The page you're looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = projectTitle(project);
  const description = projectDescription(project);
  const url = absoluteUrl(`/projects/${project.slug}`);

  return {
    metadataBase: new URL("https://ethanlanting.dev"),
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: absoluteUrl(project.media),
          width: 1440,
          height: 810,
          alt: `${project.title} project screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(project.media)],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: projectDescription(project),
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.media),
    creator: {
      "@type": "Person",
      name: siteName,
      url: absoluteUrl("/"),
    },
    sameAs: project.url ? [project.url] : undefined,
    programmingLanguage: project.techStack,
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-y-16 overflow-clip px-5 pt-8 sm:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Navbar />
      <Blob />

      <main className="container mx-auto flex w-full flex-col">
        <div>
          <BackLink />
        </div>

        <ProjectItem {...project} />

        <ProjectImage {...project} variant="detail" />

        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
