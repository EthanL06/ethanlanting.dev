import Link from "next/link";
import React, { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { IconType } from "@icons-pack/react-simple-icons";
import Image from "next/image";

type Props = {
  title: string;
  slug?: string;
  description: string;
  media: IconType | React.ElementType | string;
  iconColor?: string;
  url: string;
};

const GridItem = ({
  title,
  slug,
  description,
  media,
  iconColor,
  url,
}: Props) => {
  const urlText = url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");

  return (
    <div className="group/item flex flex-col gap-3">
      {typeof media === "string" ? (
        <Suspense
          fallback={<div className="h-16 w-16 animate-pulse bg-white/10" />}
        >
          <Link
            className="overflow-clip rounded-lg border border-white/10 hover:cursor-pointer"
            href={`/projects/${slug}`}
          >
            <Image
              className="aspect-video w-full overflow-clip object-cover object-center transition-all duration-500 ease-in-out group-hover/item:scale-110 group-hover/item:opacity-80"
              width={480}
              height={270}
              src={media}
              alt={title}
            />
          </Link>
        </Suspense>
      ) : (
        <div className="flex items-center">
          {React.createElement(media as IconType | React.ElementType, {
            size: 64,
            color: iconColor,
            className:
              "mb-2 group-hover:opacity-80 transition-opacity ease-in-out duration-500",
          })}
        </div>
      )}

      <h3 className="text-base font-extrabold text-white transition-colors hover:text-white/80">
        <Link href={`/projects/${slug}`}>{title}</Link>
      </h3>
      <div className="grow text-pretty text-sm font-medium leading-relaxed">
        {description}{" "}
      </div>

      <div className="flex items-end justify-between gap-6">
        <Link
          className="group flex items-center gap-1"
          href={url}
          target="_blank"
        >
          <span className="line-clamp-1 break-all text-sm font-bold text-accent transition-colors hover:text-accent/80">
            {urlText}
          </span>
          <ArrowUpRight
            className="shrink-0 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={14}
          />
        </Link>

        {typeof media === "string" && (
          <Link
            className="w-fit whitespace-nowrap text-xs font-semibold transition-all duration-300 ease-in-out hover:text-white/80"
            href={`/projects/${slug}`}
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};

export default GridItem;
