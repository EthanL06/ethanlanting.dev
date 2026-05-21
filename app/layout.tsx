import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { TailwindIndicator } from "@/components/shared/TailwindIndicator";
import {
  absoluteUrl,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethanlanting.dev"),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "Ethan Lanting",
    "software engineer",
    "Austin software engineer",
    "Next.js developer",
    "React developer",
    "product builder",
    "Chrome extension developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@EthanL06",
    images: [absoluteUrl("/opengraph-image.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
