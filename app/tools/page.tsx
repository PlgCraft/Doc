import Link from "next/link";
import { Wrench } from "lucide-react";
import { toolsData } from "@/lib/tools";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildCollectionPageJsonLd } from "@/lib/seo";
import { ListingHero } from "@/components/ListingHero";
import { ToolCard } from "@/components/ToolCard";
import { SiteFooter } from "@/components/SiteFooter";

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
      <ListingHero
        badge={`FREE TOOLS — ${tools.length} AVAILABLE`}
        title={
          <>
            FREE <span className="text-stroke text-transparent">TOOLS</span>
            <br />NO SIGNUP
          </>
        }
        subtitle="Small, focused, browser-based utilities built with the same practical mindset as every PlgCraft plugin: solve one problem well, then get out of the way."
      />

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
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter linkHref="/" linkLabel="← BACK TO HOME" />
    </main>
  );
}

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
