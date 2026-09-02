import { getToolById, toolsData } from "@/lib/tools";
import { toolWidgets } from "@/lib/tools/widgets";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { buildSoftwareApplicationJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { FaqAccordion } from "@/components/FaqAccordion";
import { MoreLinksSection } from "@/components/MoreLinksSection";
import { CrossLinkCard } from "@/components/CrossLinkCard";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getToolById(id);
  if (!tool) {
    notFound();
  }

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
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 text-sm font-bold uppercase">
                Free
              </span>
              <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase">
                {tool.category}
              </span>
              <StatusBadge statusId={tool.statusId} />
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
          </Reveal>
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
            <Reveal className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                ABOUT THIS <span className="text-stroke text-transparent">TOOL</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {tool.fullDescription}
              </p>
            </Reveal>

            {tool.howItWorks.length > 0 && (
              <Reveal delay={120}>
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
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <FaqAccordion faqs={tool.faqs} />

      <MoreLinksSection
        className="py-16"
        badge="MORE TOOLS"
        title={
          <>
            Explore the rest of the <span className="text-stroke text-transparent">toolbox</span>
          </>
        }
        description="Every tool here is free and single-purpose. Browse the full list, or see the plugins and integrations PlgCraft builds for production use."
      >
        <CrossLinkCard
          href="/tools"
          badge="ALL TOOLS"
          badgeClassName="bg-red-500 text-white"
          title="Browse the full tools list"
          description="Free calculators, converters, and generators, with more shipping regularly."
        />
        <CrossLinkCard
          href="/#projects"
          badge="PROJECTS"
          badgeClassName="bg-yellow-400 text-black"
          title="See the plugins and products"
          description="Plugins and integrations built for real production workflows, not just one-off use."
        />
      </MoreLinksSection>

      <SiteFooter linkHref="/tools" linkLabel="VIEW ALL TOOLS" linkIcon={<ArrowRight size={20} />} />
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
