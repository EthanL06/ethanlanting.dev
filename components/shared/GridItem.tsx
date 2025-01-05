import Link from "next/link";
import React, { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { IconType } from "@icons-pack/react-simple-icons";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  media: IconType | React.ElementType | string;
  iconColor?: string;
  url: string;
};

const GridItem = ({ title, description, media, iconColor, url }: Props) => {
  const urlText = url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");

  return (
    <div className="flex flex-col gap-3">
      {typeof media === "string" ? (
        <Suspense
          fallback={<div className="h-16 w-16 animate-pulse bg-white/10" />}
        >
          <Image
            className="object-fit aspect-video w-full overflow-clip rounded-lg border border-white/10 object-center hover:cursor-pointer"
            width={480}
            height={270}
            src={media}
            alt={title}
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
          className="flex items-center gap-1 hover:underline"
          href={url}
          target="_blank"
        >
          <span className="line-clamp-1 break-all text-sm font-bold text-accent">
            {urlText}
          </span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default GridItem;
