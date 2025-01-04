import Link from "next/link";
import React from "react";

import { navLinks } from "@/data/nav-links";
import { socialLinks } from "@/data/social-links";

const Navbar = () => {
  return (
    <>
      <div className="flex h-12 w-full justify-between">
        <div className="flex items-center justify-start">
          <Link className="text-4xl font-bold text-white" href={"/"}>
            EL®
          </Link>
        </div>

        <div className="flex items-center justify-end gap-8">
          {socialLinks.map((link) => (
            <Link key={link.href} href={link.href} target="_blank">
              <link.icon className="size-6 text-white transition-opacity hover:opacity-75" />
            </Link>
          ))}
        </div>
      </div>

      <nav className="fixed top-8 z-10 hidden items-center justify-center sm:flex">
        <div className="bg-background/75 flex items-center gap-8 rounded-full border border-white/10 px-5 py-3 backdrop-blur-lg backdrop-filter">
          {navLinks.map((link) => (
            <Link
              className="text-sm font-medium transition-colors hover:text-white"
              key={link.href}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
