import Link from "next/link";
import { blog } from "@/lib/source";
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";
import { BlogFilters } from "@/components/BlogFilters";
import { BlogListCardContainer } from "@/components/landing/AnimatedContainer";
import { ACCENTCOLOR } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildBlogIndexJsonLd } from "@/lib/seo";

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
      <BlogHero totalCount={blogs.length} />
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
              {filtered.map((b, i) => {
                const accentColor = getAccentColor(b.url);
                const formattedDate = new Date(b.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <BlogListCardContainer key={b.url} index={i}>
                    <Link
                      href={b.url}
                      className="group block bg-white brutalist-border brutalist-shadow brutalist-hover h-full"
                    >
                      <div
                        className="border-b-4 border-black p-5 flex items-center justify-between"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <div className="flex gap-2">
                          {b.data.tags.map(tag => <span
                            key={tag}
                            className="inline-block text-white px-3 py-1 text-xs font-black tracking-wider"
                            style={{ backgroundColor: accentColor }}
                          >
                            {tag}
                          </span>)}
                        </div>
                        <BookOpen size={20} className="text-black" />
                      </div>

                      <div className="p-6 flex flex-col h-[calc(100%-64px)]">
                        <div className="flex items-center gap-3 text-xs font-mono-brutal text-gray-500 mb-3 uppercase tracking-wider flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {formattedDate}
                          </span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> 5m
                          </span>
                        </div>

                        <h3 className="font-black text-xl md:text-2xl mb-3 leading-tight group-hover:text-red-500 transition-colors">
                          {b.data.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{b.data.description}</p>

                        <div className="mt-auto pt-4 border-t-2 border-gray-200 flex items-center justify-between gap-3">
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
                      </div>
                    </Link>
                  </BlogListCardContainer>
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
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm font-bold hover:text-red-500 transition-colors">
                ← BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function getAccentColor(slug: string) {
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ACCENTCOLOR[hash % ACCENTCOLOR.length];
}

const BlogHero = ({ totalCount }: { totalCount: number }) => {
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
              THE JOURNAL — {totalCount} POSTS
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
              ALL <span className="text-stroke text-transparent">POSTS</span>
              <br />& WRITINGS
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium max-w-md">
            Long-form notes on the apps I build, the design decisions behind them, and the messy
            reality of shipping software.
          </p>
        </div>
      </div>
    </section>
  );
};

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
