import { cn } from "@/lib/utils";
import React from "react";

const Blob = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute -left-32 -top-32 size-[500px] -translate-y-1/2 translate-x-1/2 transform animate-blob select-none rounded-full bg-white/5 blur-3xl",
        className,
      )}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="animate-blob-color opacity-10"
        d="M68.2,-23.4C74.4,-3.3,55.5,23.6,32.1,39.5C8.7,55.4,-19.4,60.3,-36.8,48.2C-54.3,36.1,-61.3,7,-53.4,-15.5C-45.5,-38,-22.7,-53.8,4.2,-55.1C31.1,-56.5,62.1,-43.4,68.2,-23.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
};

export default Blob;
