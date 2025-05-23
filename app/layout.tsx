import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { TailwindIndicator } from "@/components/shared/TailwindIndicator";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethan Lanting",
  description:
    "Hi, I'm Ethan—a developer, designer, and creator. I build websites and applications that are fast, accessible, and responsive.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ethanlanting.dev/",
    title: "Ethan Lanting",
    description:
      "Hi, I'm Ethan—a developer, designer, and creator. I build websites and applications that are fast, accessible, and responsive.",
    siteName: "Ethan Lanting",
    images: [
      {
        url: "https://ethanlanting.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ethan Lanting",
      },
    ],
  },
  twitter: {
    card: "summary",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0E10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        {children}
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
}
