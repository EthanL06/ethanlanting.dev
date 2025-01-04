"use client";

import { MapPin } from "lucide-react";
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
        <div className="block grow basis-0">
          <p className="text-sm font-medium">
            Ethan Lanting &copy; {new Date().getFullYear()}
          </p>
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

        <p className="text-sm font-medium">
          Ethan Lanting &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
