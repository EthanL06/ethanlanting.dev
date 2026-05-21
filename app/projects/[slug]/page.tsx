import Footer from "@/components/sections/Footer";
import NotFound from "@/components/sections/NotFound";
import Blob from "@/components/shared/Blob";
import Navbar from "@/components/shared/Navbar";
import ProjectItem from "@/components/shared/ProjectItem";
import { getProjectBySlug, projects } from "@/data/projects";
import {
  absoluteUrl,
  projectDescription,
  projectTitle,
  siteName,
} from "@/lib/seo";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <Link
            className="group text-sm font-medium transition-colors duration-500 ease-in-out hover:text-white"
            href={"/"}
          >
            <ArrowLeft
              className="inline-block transition-transform duration-500 ease-in-out group-hover:-translate-x-0.5"
              size={14}
            />{" "}
            Go Back
          </Link>
        </div>

        <ProjectItem {...project} />

        {project.url ? (
          <Link
            className="group overflow-clip rounded-2xl border border-white/10 shadow-2xl shadow-accent/10 hover:cursor-pointer"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="aspect-video w-full overflow-clip object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-80"
              width={480 * 3}
              height={270 * 3}
              src={project.media}
              alt={`${project.title} project screenshot`}
            />
          </Link>
        ) : (
          <div className="group overflow-clip rounded-2xl border border-white/10 shadow-2xl shadow-accent/10">
            <Image
              className="aspect-video w-full overflow-clip object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-80"
              width={480 * 3}
              height={270 * 3}
              src={project.media}
              alt={`${project.title} project screenshot`}
            />
          </div>
        )}

        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
