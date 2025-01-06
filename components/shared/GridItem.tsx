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
    <div
      onClick={() => {
        if (typeof media === "string") {
          window.open(url, "_blank");
        }
      }}
      className="group flex flex-col gap-3 hover:cursor-pointer"
    >
      {typeof media === "string" ? (
        <Suspense
          fallback={<div className="h-16 w-16 animate-pulse bg-white/10" />}
        >
          <Link
            className="overflow-clip rounded-lg border border-white/10 hover:cursor-pointer"
            href={url}
            target="_blank"
          >
            <Image
              className="ease-in-out-quint aspect-video w-full overflow-clip object-cover object-center transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
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
          className="group flex items-center gap-1"
          href={url}
          target="_blank"
        >
          <span className="line-clamp-1 break-all text-sm font-bold text-accent transition-colors group-hover:text-accent/80">
            {urlText}
          </span>
          <ArrowUpRight
            className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={14}
          />
        </Link>
      </div>
    </div>
  );
};

export default GridItem;
