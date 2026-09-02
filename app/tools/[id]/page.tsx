import { Logo } from "@/components/Logo";
import { getToolById, toolsData } from "@/lib/tools";
import { toolWidgets } from "@/lib/tools/widgets";
import { productStatuses } from "@/lib/data.type";
import { ArrowRight, HelpCircle } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { buildSoftwareApplicationJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import type { CSSProperties } from "react";

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) {
    notFound();
  }

  const status = productStatuses[tool.statusId];
  const Widget = toolWidgets[tool.id];
  const url = `${siteConfig.url}/tools/${tool.id}`;

  const jsonLd: Record<string, unknown>[] = [
    buildSoftwareApplicationJsonLd({
      name: tool.name,
      description: tool.shortDescription,
      url,
      category: tool.category,
      keywords: [...tool.keywords],
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", url: siteConfig.url },
      { name: "Tools", url: `${siteConfig.url}/tools` },
      { name: tool.name, url },
    ]),
  ];
  if (tool.faqs.length > 0) {
    jsonLd.push(buildFaqJsonLd([...tool.faqs]));
  }

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />

      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ backgroundColor: `${tool.accentColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 text-sm font-bold uppercase">
                Free
              </span>
              <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase">
                {tool.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color.bg} ${status.color.text} ${status.color.border}`}
              >
                <status.icon size={14} />
                {status.label}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className="brutalist-border p-3 bg-white flex items-center justify-center shrink-0"
                style={{ color: tool.accentColor }}
              >
                <DynamicIcon name={tool.icon} size={40} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black">{tool.name}</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">{tool.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-y-4 border-black" id="use-tool">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {Widget ? (
            <Widget />
          ) : (
            <div className="bg-white brutalist-border brutalist-shadow p-10 text-center">
              <h2 className="font-black text-2xl mb-2">This tool is being built</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                The interactive version of {tool.name} is on its way. Check back soon, it will
                run right here, free, with no signup required.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                ABOUT THIS <span className="text-stroke text-transparent">TOOL</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {tool.fullDescription}
              </p>
            </div>

            {tool.howItWorks.length > 0 && (
              <div className="reveal-up" style={{ ["--delay" as never]: "120ms" } as CSSProperties}>
                <div className="bg-gray-100 brutalist-border p-6">
                  <h3 className="font-black text-xl mb-4">HOW IT WORKS</h3>
                  <ol className="space-y-4">
                    {tool.howItWorks.map((step, index) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-black text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-bold">{step.title}</p>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {tool.faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
              <span className="inline-block bg-yellow-400 text-black px-4 py-2 text-sm font-bold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                COMMON <span className="text-stroke text-transparent">QUESTIONS</span>
              </h2>
            </div>

            <div className="space-y-4">
              {tool.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white brutalist-border p-5 open:brutalist-shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 font-bold text-lg cursor-pointer list-none">
                    <span className="flex items-center gap-3">
                      <HelpCircle size={20} className="flex-shrink-0" />
                      {faq.question}
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-3 pl-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="border-2 border-black bg-gray-50 p-6 md:p-8 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
                MORE TOOLS
              </span>
              <h2 className="text-2xl md:text-4xl font-black">
                Explore the rest of the <span className="text-stroke text-transparent">toolbox</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-xl">
              Every tool here is free and single-purpose. Browse the full list, or see the plugins
              and integrations PlgCraft builds for production use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/tools"
              className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
            >
              <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-black tracking-wider mb-3">
                ALL TOOLS
              </span>
              <h3 className="font-black text-xl mb-2">Browse the full tools list</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                Free calculators, converters, and generators, with more shipping regularly.
              </p>
            </Link>

            <Link
              href="/#projects"
              className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
            >
              <span className="inline-block bg-yellow-400 text-black px-2 py-1 text-xs font-black tracking-wider mb-3">
                PROJECTS
              </span>
              <h3 className="font-black text-xl mb-2">See the plugins and products</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                Plugins and integrations built for real production workflows, not just one-off use.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t-4 border-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="text-gray-600 font-mono text-sm">
              © {new Date().getFullYear()} PlgCraft. All rights reserved.
            </div>
            <Link
              href="/tools"
              className="flex items-center gap-2 font-bold hover:text-red-500 transition-colors"
            >
              VIEW ALL TOOLS <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export function generateStaticParams(): { id: string }[] {
  return toolsData.tools.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const tool = getToolById(id);

  if (!tool) {
    return { title: "Tool not found" };
  }

  const url = `${siteConfig.url}/tools/${tool.id}`;
  const title = `${tool.name} — Free Online Tool | PlgCraft`;

  return {
    title: { absolute: title },
    description: tool.shortDescription,
    keywords: [tool.name, tool.category, "free tool", "online tool", ...tool.keywords, siteConfig.name],
    authors: [{ name: siteConfig.name }],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      title,
      description: tool.shortDescription,
      type: "website",
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title,
      description: tool.shortDescription,
    },
  };
}
