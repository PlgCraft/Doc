import Link from "next/link";
import { blog } from "@/lib/source";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogFilters } from "@/components/BlogFilters";
import { BlogListCardContainer } from "@/components/landing/AnimatedContainer";
import { ACCENTCOLOR } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildBlogIndexJsonLd } from "@/lib/seo";
import { ListingHero } from "@/components/ListingHero";
import { BlogPostCard } from "@/components/BlogPostCard";
import { SiteFooter } from "@/components/SiteFooter";

type Parms = {
  searchParams: Promise<{
    query?: string;
    category?: string;
  }>;
};

export default async function Home({ searchParams }: Parms) {
  const { query: rawQuery, category: rawCategory } = await searchParams;
  const query = rawQuery?.trim().toLowerCase() ?? "";
  const category = rawCategory?.trim().toLowerCase() ?? "";
  const blogs = blog.getPages();
  const categories = [...new Set(blogs.map((b) => b.data.category))];

  const filtered = blogs.filter((post) => {
    const title = post.data.title?.toLowerCase() || "";
    const description = post.data.description?.toLowerCase() || "";
    const postCategory = post.data.category?.toLowerCase() || "";

    const matchesSearch = !query || title.includes(query) || description.includes(query);
    const matchesCategory = !category || postCategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={buildBlogIndexJsonLd({
          url: `${siteConfig.url}/blog`,
          name: "PlgCraft Blog",
          description: "Articles, release notes, tutorials, and product updates from PlgCraft.",
          items: blogs.map((post, index) => ({
            position: index + 1,
            url: `${siteConfig.url}${post.url}`,
            name: post.data.title,
            description: post.data.description,
            datePublished: new Date(post.data.date).toISOString(),
          })),
        })}
      />
      <ListingHero
        badge={`THE JOURNAL — ${blogs.length} POSTS`}
        title={
          <>
            ALL <span className="text-stroke text-transparent">POSTS</span>
            <br />& WRITINGS
          </>
        }
        subtitle="Long-form notes on the apps I build, the design decisions behind them, and the messy reality of shipping software."
      />
      <BlogFilters query={query} categories={categories} activeCategory={category} />
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-black">
              {category ? (
                <>
                  <span className="text-gray-400">SHOWING:</span> {category.toUpperCase()}
                </>
              ) : (
                "ALL POSTS"
              )}
            </h2>
            <p className="text-sm font-mono-brutal text-gray-500 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-gray-50 brutalist-border p-12 md:p-20 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-black mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">Try a different category or clear the search.</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold brutalist-shadow-sm brutalist-hover"
              >
                RESET FILTERS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
              {filtered.map((b, i) => (
                <BlogListCardContainer key={b.url} index={i}>
                  <BlogPostCard
                    post={{ ...b.data, url: b.url }}
                    accentColor={getAccentColor(b.url)}
                    fillHeight
                    extraMeta={
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> 5m
                      </span>
                    }
                    footer={
                      <div className="pt-4 border-t-2 border-gray-200 flex items-center justify-between gap-3">
                        <span
                          className="inline-block px-2 py-1 text-[10px] font-black tracking-wider bg-black text-white truncate max-w-[60%]"
                          title={b.data.category}
                        >
                          {b.data.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all whitespace-nowrap">
                          READ <ArrowUpRight size={16} />
                        </span>
                      </div>
                    }
                  />
                </BlogListCardContainer>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter linkHref="/" linkLabel="← BACK TO HOME" />
    </main>
  );
}

function getAccentColor(slug: string) {
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ACCENTCOLOR[hash % ACCENTCOLOR.length];
}

export const metadata: Metadata = {
  title: {
    absolute: "PlgCraft Blog | Plugins, Integrations & Software Notes",
  },
  description:
    "Practical articles on plugins, integrations, automation, WooCommerce, and software products by PlgCraft.",
  keywords: [
    "PlgCraft blog",
    "plugins",
    "integrations",
    "automation",
    "WooCommerce",
    "software products",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    languages: {
      "en-US": `${siteConfig.url}/blog`,
    },
  },
  openGraph: {
    title: "PlgCraft Blog | Plugins, Integrations & Software Notes",
    description:
      "Practical articles on plugins, integrations, automation, WooCommerce, and software products by PlgCraft.",
    type: "website",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: "PlgCraft Blog | Plugins, Integrations & Software Notes",
    description:
      "Practical articles on plugins, integrations, automation, WooCommerce, and software products by PlgCraft.",
  },
};
