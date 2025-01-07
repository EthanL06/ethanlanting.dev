import Link from "next/link";
import React from "react";
import Blob from "../shared/Blob";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4">
      <Blob className="absolute !left-1/2 !top-1/2 !-translate-x-1/2 -translate-y-1/2 transform" />
      <div className="flex flex-col items-center gap-1.5">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          404 Not Found
        </h2>
        <p className="font-semibold">Could not find requested resource. 😢</p>
      </div>
      <Link
        className="font-semibold text-accent transition-colors ease-in-out hover:text-accent/80"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
