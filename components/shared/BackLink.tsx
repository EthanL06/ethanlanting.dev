"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { prepareProjectImageBackTransition } from "./ProjectImage";

const BackLink = () => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (event.detail !== 0) {
      prepareProjectImageBackTransition();
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Link
      className="group text-sm font-medium transition-colors duration-500 ease-in-out hover:text-white"
      href="/"
      onClick={handleClick}
    >
      <ArrowLeft
        className="inline-block transition-transform duration-500 ease-in-out group-hover:-translate-x-0.5"
        size={14}
      />{" "}
      Go Back
    </Link>
  );
};

export default BackLink;
