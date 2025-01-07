import Footer from "@/components/sections/Footer";
import NotFound from "@/components/sections/NotFound";
import Blob from "@/components/shared/Blob";
import Navbar from "@/components/shared/Navbar";
import ProjectItem from "@/components/shared/ProjectItem";
import { getProjectBySlug } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "404 Not Found",
      description: "The page you're looking for does not exist.",
    };
  }

  return {
    title: project.title + " | Ethan Lanting",
    description: project.description,
    image: project.media,
  };
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

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-y-16 overflow-clip px-5 pt-8 sm:px-16">
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

        <Link
          className="group overflow-clip rounded-2xl border border-white/10 shadow-2xl shadow-accent/10 hover:cursor-pointer"
          href={project.url}
          target="_blank"
        >
          <Image
            className="aspect-video w-full overflow-clip object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-80"
            width={480 * 3}
            height={270 * 3}
            src={project.media}
            alt={project.title}
          />
        </Link>

        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
