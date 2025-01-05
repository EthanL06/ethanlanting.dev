import Link from "next/link";
import React, { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { IconType } from "@icons-pack/react-simple-icons";
import { Video } from "./Video";

type Props = {
  title: string;
  description: string;
  media: IconType | React.ElementType | string;
  isVideo?: boolean;
  iconColor?: string;
  url: string;
};

const GridItem = ({
  title,
  description,
  media,
  isVideo = false,
  iconColor,
  url,
}: Props) => {
  const urlText = url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");

  return (
    <div className="flex flex-col gap-3">
      {isVideo && typeof media === "string" ? (
        <Suspense
          fallback={<div className="h-16 w-16 animate-pulse bg-white/10" />}
        >
          <Video
            className="aspect-video w-full overflow-clip rounded-lg border border-white/10 object-cover object-top hover:cursor-pointer"
            src={media}
          />
        </Suspense>
      ) : (
        <div className="flex items-center">
          {React.createElement(media as IconType | React.ElementType, {
            size: 64,
            color: iconColor,
            className: "mb-2",
          })}
        </div>
      )}

      <h3 className="text-base font-extrabold text-white">{title}</h3>
      <div className="grow text-pretty text-sm font-medium leading-relaxed">
        {description}{" "}
      </div>

      <div>
        <Link
          className="flex items-center gap-1 text-sm font-bold text-accent hover:underline"
          href={url}
          target="_blank"
        >
          {urlText} <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default GridItem;
