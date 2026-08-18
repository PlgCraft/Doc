import "./global.css";
import { Chivo, JetBrains_Mono, Manrope } from "next/font/google";
import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { mainNavLinks, siteConfig } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const chivo = Chivo({ subsets: ["latin"], variable: "--font-heading" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      {
        url: "/plgLogo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/plgLogo.svg",
        type: "image/svg+xml",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${chivo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="PlgCraft" />
      </head>
      <body className="font-sans-brutal antialiased text-black">
        <RootProvider
          search={{
            links: [["Home", "/"], ...mainNavLinks.map((link): [string, string] => [link.label, link.href])],
          }}
          theme={{
            defaultTheme: "dark",
          }}
        >
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
