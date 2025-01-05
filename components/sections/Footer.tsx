"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "America/Chicago",
        }),
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <footer className="hidden items-center justify-between gap-6 py-6 sm:flex sm:flex-row">
        <div className="relative block grow basis-0">
          <p className="text-sm font-medium">
            Ethan Lanting &copy; {new Date().getFullYear()}
          </p>

          <Link
            href="https://v1.ethanlanting.dev"
            className="absolute left-0 transform whitespace-nowrap text-[.625rem] transition-colors hover:text-white"
            target="_blank"
          >
            view old site
          </Link>
        </div>

        <button className="block animate-wave text-2xl">🤘</button>

        <div className="flex grow basis-0 flex-wrap items-center justify-end gap-6">
          <p className="flex items-center gap-1 text-sm font-semibold text-accent">
            <MapPin size={14} /> Austin, TX
          </p>
          {isMounted && (
            <p className="text-sm font-semibold text-white">
              {currentTime} CST
            </p>
          )}
        </div>
      </footer>

      <MobileFooter currentTime={currentTime} isMounted={isMounted} />
    </>
  );
};

const MobileFooter = ({
  currentTime,
  isMounted,
}: {
  currentTime: string;
  isMounted: boolean;
}) => {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 py-6 sm:hidden">
      <button className="block animate-wave text-2xl">🤘</button>

      <div className="flex w-full flex-wrap items-center justify-center gap-2 min-[420px]:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <p className="flex items-center gap-1 text-sm font-semibold text-accent">
            <MapPin size={14} /> Austin, TX
          </p>
          {isMounted && (
            <p className="w-[7.5rem] whitespace-nowrap text-center text-sm font-semibold text-white">
              {currentTime} CST
            </p>
          )}
        </div>

        <div className="relative">
          <p className="text-sm font-medium">
            Ethan Lanting &copy; {new Date().getFullYear()}
          </p>
          <Link
            href="https://v1.ethanlanting.dev"
            className="absolute right-1/2 translate-x-1/2 transform whitespace-nowrap text-[.625rem] transition-colors hover:text-white min-[405px]:right-0 min-[405px]:translate-x-0"
            target="_blank"
          >
            view old site
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
