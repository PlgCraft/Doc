import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Wrench } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { toolsData } from "@/lib/tools";
import { productStatuses } from "@/lib/data.type";
import { Logo } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildCollectionPageJsonLd } from "@/lib/seo";

export default function ToolsPage() {
  const tools = toolsData.tools;

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={buildCollectionPageJsonLd({
          url: `${siteConfig.url}/tools`,
          name: "PlgCraft Free Tools",
          description: "Free, browser-based utilities built by PlgCraft. No signup required.",
          items: tools.map((tool, index) => ({
            position: index + 1,
            url: `${siteConfig.url}/tools/${tool.id}`,
            name: tool.name,
            description: tool.shortDescription,
            datePublished: new Date(tool.releaseDate).toISOString(),
          })),
        })}
      />
      <ToolsHero totalCount={tools.length} />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {tools.length === 0 ? (
            <div className="bg-gray-50 brutalist-border p-12 md:p-20 text-center">
              <Wrench size={48} className="mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">First tool is on the way</h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                This page will fill up with free, single-purpose utilities, calculators,
                converters, and generators built the same way as every PlgCraft product: fast,
                focused, and free to use without an account. Check back soon, or follow along on
                the blog for launch announcements.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold brutalist-shadow-sm brutalist-hover"
              >
                READ THE BLOG
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tools.map((tool) => {
                const status = productStatuses[tool.statusId];
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="group block bg-white brutalist-border brutalist-shadow brutalist-hover h-full"
                  >
                    <div
                      className="p-6 border-b-4 border-black flex items-start justify-between"
                      style={{ backgroundColor: `${tool.accentColor}20` }}
                    >
                      <DynamicIcon name={tool.icon} size={44} className="text-black" />
                      <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">FREE</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-2xl mb-2 group-hover:text-red-500 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{tool.shortDescription}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color.bg} ${status.color.text} ${status.color.border}`}
                        >
                          <status.icon size={14} />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                        <span className="font-bold text-sm capitalize" style={{ color: tool.accentColor }}>
                          {tool.category}
                        </span>
                        <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
                          USE TOOL <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t-4 border-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="text-gray-600 font-mono-brutal text-sm">
              © {new Date().getFullYear()} PlgCraft. All rights reserved.
            </div>
            <Link href="/" className="text-sm font-bold hover:text-red-500 transition-colors">
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

const ToolsHero = ({ totalCount }: { totalCount: number }) => {
  return (
    <section className="pt-32 pb-12 md:pb-20 bg-white grid-pattern relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rotate-12 hidden md:block" />
      <div className="absolute top-40 -left-10 w-32 h-32 bg-red-500 -rotate-12 hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 font-bold text-sm hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>

        <div className="grid md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
              FREE TOOLS — {totalCount} AVAILABLE
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
              FREE <span className="text-stroke text-transparent">TOOLS</span>
              <br />NO SIGNUP
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium max-w-md">
            Small, focused, browser-based utilities built with the same practical mindset as every
            PlgCraft plugin: solve one problem well, then get out of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export const metadata: Metadata = {
  title: {
    absolute: "Free Online Tools | PlgCraft",
  },
  description:
    "Free, browser-based tools and utilities from PlgCraft. No signup, no bloat, one job done well.",
  keywords: ["free tools", "online tools", "PlgCraft tools", "free utilities", "web tools"],
  alternates: {
    canonical: `${siteConfig.url}/tools`,
    languages: {
      "en-US": `${siteConfig.url}/tools`,
    },
  },
  openGraph: {
    title: "Free Online Tools | PlgCraft",
    description:
      "Free, browser-based tools and utilities from PlgCraft. No signup, no bloat, one job done well.",
    type: "website",
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: "Free Online Tools | PlgCraft",
    description:
      "Free, browser-based tools and utilities from PlgCraft. No signup, no bloat, one job done well.",
  },
};
