import { notFound } from "next/navigation";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { getAppById } from "@/lib/data";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  const formattedDate = page.data.date
    ? new Date(page.data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  const url = `${siteConfig.url}/blog/${params.slug}`;
  const relatedProject = page.data.product ? getAppById(page.data.product) : undefined;
  const relatedPosts = blog.getPages().filter((entry) => entry.url !== page.url).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildBlogPostingJsonLd({
            title: page.data.title,
            description: page.data.description,
            url,
            datePublished: new Date(page.data.date).toISOString(),
            author: page.data.author,
            keywords: [page.data.category, page.data.tags.join(",")].filter(Boolean),
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
            { name: page.data.title, url },
          ]),
        ]}
      />
      <article className="pt-28 px-6 md:px-12 lg:px-24">
        {/* Article Header – brutalist style */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors group"
            >
              <span className="font-black text-sm uppercase tracking-wider">← Back to Blog</span>
            </Link>
          </div>

          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
            {page.data.title}
          </h1>

          {/* Meta info – brutalist card */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
            {page.data.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center font-black">
                  {page.data.author.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-sm">{page.data.author}</div>
                  <div className="text-xs text-gray-500">Author</div>
                </div>
              </div>
            )}

            <div className="h-8 w-0.5 bg-gray-300" />

            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="font-mono text-sm">{formattedDate}</span>
              </div>
            )}

            <div className="h-8 w-0.5 bg-gray-300" />

            <div className="flex items-center gap-2">
              <span className="inline-block bg-black text-white px-2 py-1 text-[10px] font-black tracking-wider">
                {page.data.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="border-2 border-black bg-gray-50 p-6 mb-8 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-lg text-gray-700 font-medium">{page.data.description}</p>
          </div>
        </div>

        {/* Content Layout with Sidebar TOC */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sticky Sidebar - TOC (brutalist card) */}
            <div className="lg:col-span-3">
              <div className="sticky top-28 space-y-4">
                <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-red-500" />
                    <h3 className="font-black text-lg uppercase">Contents</h3>
                  </div>
                  <div className="h-0.5 bg-black mb-4" />
                  <InlineTOC
                    items={page.data.toc}
                    className="space-y-3 [&_a]:font-bold [&_a:hover]:text-red-500 [&_a]:no-underline"
                  />
                </div>

                {relatedProject && (
                  <Link
                    href={`/project/${relatedProject.id}`}
                    className="group block border-2 border-black p-6 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 transition-transform"
                    style={{ backgroundColor: `${relatedProject.accentColor}15` }}
                  >
                    <span
                      className="inline-block text-white px-2 py-1 text-[10px] font-black tracking-wider mb-3"
                      style={{ backgroundColor: relatedProject.accentColor }}
                    >
                      BUILT FOR THIS ARTICLE
                    </span>
                    <h3 className="font-black text-lg mb-2 group-hover:text-red-500 transition-colors">
                      {relatedProject.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {relatedProject.shortDescription}
                    </p>
                    <span className="flex items-center gap-2 font-bold text-sm">
                      VIEW PRODUCT <ArrowRight size={14} />
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Main Content – brutalist card */}
            <div className="lg:col-span-9">
              <div className="border-2 border-black bg-white p-8 md:p-12 shadow-[4px_4px_0px_0px_#000]">
                <div
                  className="
    prose prose-xl max-w-none

    prose-headings:font-black
    prose-headings:text-black
    prose-headings:tracking-tight

    prose-h1:text-5xl
    prose-h1:mb-8
    prose-h1:border-b-2
    prose-h1:border-black
    prose-h1:pb-4

    prose-h2:text-4xl
    prose-h2:mt-12
    prose-h2:mb-6

    prose-h3:text-3xl
    prose-h3:mt-8
    prose-h3:mb-4

    prose-p:text-xl
    prose-p:leading-9
    prose-p:text-gray-800

    prose-li:text-lg
    prose-li:leading-8
    prose-li:text-gray-800

    prose-strong:text-black
    prose-strong:font-bold

    prose-a:text-red-600
    prose-a:font-semibold
    prose-a:no-underline
    hover:prose-a:underline

    prose-blockquote:border-l-4
    prose-blockquote:border-red-500
    prose-blockquote:bg-gray-50
    prose-blockquote:px-6
    prose-blockquote:py-2
    prose-blockquote:text-xl

    prose-code:text-sm
    prose-code:bg-gray-100
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:rounded

    prose-pre:border-2
    prose-pre:border-black
    prose-pre:overflow-x-auto

    prose-img:border-2
    prose-img:border-black

    prose-hr:border-black

    prose-table:w-full
    prose-table:border-collapse
    prose-table:bg-white

    prose-th:bg-gray-100
    prose-th:text-black
    prose-th:font-semibold
    prose-th:px-4
    prose-th:py-3
    prose-th:border
    prose-th:border-gray-300

    prose-td:bg-white
    prose-td:text-gray-800
    prose-td:px-4
    prose-td:py-3
    prose-td:border
    prose-td:border-gray-200

    prose-tr:hover:bg-gray-50
  "
                >
                  <Mdx components={defaultMdxComponents} />
                </div>

                {/* Footer inside content card */}
                <div className="mt-12 pt-8 border-t-2 border-black">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors group"
                    >
                      <span className="font-black text-sm uppercase tracking-wider">
                        ← All Articles
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Posts – brutalist cards */}
              <div className="mt-8">
                <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-black text-2xl uppercase mb-2">More to Read</h3>
                      <p className="text-gray-600">
                        Discover related articles about no-code database sync
                      </p>
                    </div>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors group"
                    >
                      <span className="font-black text-sm uppercase tracking-wider">All Posts</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {blog
                      .getPages()
                      .filter((b) => b.data.category === page.data.category && b.url !== page.url)
                      .slice(0, 2)
                      .map((post) => (
                        <Link
                          key={post.url}
                          href={post.url}
                          className="border-2 border-black bg-white p-4 hover:shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-0.5"
                        >
                          <div className="flex gap-2">
                            {post.data.tags.map(tag =>
                              <p key={tag} className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">
                                {tag},
                              </p>)}
                          </div>
                          <h4 className="font-black text-lg uppercase mb-2 hover:text-red-500 transition-colors">
                            {post.data.title}
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.data.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-8">
        <div className="border-2 border-black bg-gray-50 p-6 md:p-8 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
                RELATED LINKS
              </span>
              <h2 className="text-2xl md:text-4xl font-black">
                Keep exploring this <span className="text-stroke text-transparent">topic</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-xl">
              Read the product behind the writing, or jump to another post if you want more context on how I build and ship software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {relatedProject && (
              <Link
                href={`/project/${relatedProject.id}`}
                className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
              >
                <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-black tracking-wider mb-3">
                  FEATURED PRODUCT
                </span>
                <h3 className="font-black text-xl mb-2">{relatedProject.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{relatedProject.shortDescription}</p>
              </Link>
            )}

            {relatedPosts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
              >
                <span className="inline-block bg-black text-white px-2 py-1 text-xs font-black tracking-wider mb-3">
                  MORE READING
                </span>
                <h3 className="font-black text-xl mb-2">{post.data.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.data.description}</p>
              </Link>
            ))}

            <Link
              href="/blog"
              className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
            >
              <span className="inline-block bg-yellow-400 text-black px-2 py-1 text-xs font-black tracking-wider mb-3">
                ALL POSTS
              </span>
              <h3 className="font-black text-xl mb-2">Browse the blog archive</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                Explore all articles, releases, and longer notes about plugins, integrations, and building small software.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer – brutalist */}
      <footer className="bg-white border-t-4 border-black py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-black text-xl">
              PlgCraft<span className="text-red-500">.</span>
            </div>
            <div className="text-gray-600 font-mono text-sm">
              © {new Date().getFullYear()} PlgCraft. All rights reserved.
            </div>
            <Link href="/blog" className="text-sm font-black hover:text-red-500 transition-colors">
              ← BACK TO BLOG
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  const url = `${siteConfig.url}/blog/${params.slug}`;

  return {
    title: {
      absolute: `${page.data.title} | PlgCraft Blog`,
    },
    description: page.data.description,
    keywords: [page.data.category, ...page.data.tags, "PlgCraft"].filter(Boolean),
    authors: [{ name: page.data.author }],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      title: `${page.data.title} | PlgCraft Blog`,
      description: page.data.description,
      type: "article",
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | PlgCraft Blog`,
      description: page.data.description,
    },
  };
}
