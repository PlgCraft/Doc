import { ProductIcon } from "@/components/ProductIcon";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { getAppById, appData } from "@/lib/data";
import { blog } from "@/lib/source";
import { ArrowRight, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { buildProductJsonLd, buildOffersFromPricing, buildBreadcrumbJsonLd } from "@/lib/seo";
import { FeedbackDrawer } from "@/components/feedback/FeedbackDrawer";
import { HowItWorks } from "@/components/product/HowItWorks";
import { KeyConcepts } from "@/components/product/KeyConcepts";
import { StoreBadge } from "@/components/product/StoreBadge";
import { FeatureCard } from "@/components/product/FeatureCard";
import { TestimonialCard } from "@/components/product/TestimonialCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogPostCard } from "@/components/BlogPostCard";
import { MoreLinksSection } from "@/components/MoreLinksSection";
import { CrossLinkCard } from "@/components/CrossLinkCard";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(id);
  if (!app) {
    notFound();
  }

  const relatedPosts = blog.getPages().filter((post) => post.data.product === app.id);
  const projectUrl = `${siteConfig.url}/project/${app.id}`;

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildProductJsonLd({
            name: app.name,
            description: app.shortDescription,
            url: projectUrl,
            image: app.screenshots[0] ? `${siteConfig.url}${app.screenshots[0]}` : undefined,
            category: app.category,
            brand: siteConfig.name,
            offers: buildOffersFromPricing(app.pricing, projectUrl),
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Projects", url: `${siteConfig.url}/#projects` },
            { name: app.name, url: projectUrl },
          ]),
        ]}
      />
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ backgroundColor: `${app.accentColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <Reveal className="md:w-2/5 md:shrink-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {app.platform.map((p) => (
                  <span
                    key={p}
                    className="bg-black text-white px-3 py-1 text-sm font-bold uppercase"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-4">{app.name}</h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">{app.shortDescription}</p>

              <div className="flex flex-wrap gap-4">
                {Object.values(app.storeLinks).map((badget) => (
                  <StoreBadge key={badget.text} badge={badget} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={180} className="w-full md:flex-1 min-w-0">
              <ScreenshotGallery
                screenshots={app.screenshots}
                appName={app.name}
                videoUrl={app.videoDemo}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Released: {app.releaseDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={20} />
              <span>Version: {app.version}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">{app.pricing.label}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <Reveal className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                ABOUT THIS <span className="text-stroke text-transparent">APP</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{app.fullDescription}</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-gray-100 brutalist-border p-6">
                <h3 className="font-black text-xl mb-4">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {app.techStack.map((tech) => (
                    <span key={tech} className="bg-black text-white px-3 py-2 font-mono text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            label="FEATURES"
            title={
              <>
                WHAT{"'"}S <span className="text-stroke text-transparent">INSIDE</span>
              </>
            }
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {app.glossary && <KeyConcepts data={app.glossary} />}

      {app.howItWorks && <HowItWorks data={app.howItWorks} accentColor={app.accentColor} />}

      {app.testimonials && app.testimonials.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              label="REVIEWS"
              labelClassName="bg-white text-black"
              title={
                <>
                  WHAT USERS <span className="text-stroke-white text-transparent">SAY</span>
                </>
              }
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {app.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeading
              label="FROM THE BLOG"
              title={
                <>
                  WRITING ABOUT{" "}
                  <span className="text-stroke text-transparent">{app.name.toUpperCase()}</span>
                </>
              }
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <Reveal key={post.url} delay={index * 90}>
                  <BlogPostCard
                    post={{ ...post.data, url: post.url }}
                    accentColor={app.accentColor}
                    footer={
                      <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
                        READ ARTICLE <ArrowUpRight size={16} />
                      </span>
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-15" style={{ backgroundColor: app.accentColor }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Reveal className="flex flex-col justify-center items-center gap-3">
            <ProductIcon icon={app.icon} name={app.name} textSizeClass="text-8xl" pixelSize={200} />
            <h2 className="text-4xl md:text-6xl font-black text-white">
              READY TO TRY {app.name.toUpperCase()}?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.values(app.storeLinks).map((badget) => (
                <StoreBadge key={badget.text} badge={badget} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <MoreLinksSection
        className="pb-8"
        badge="MORE PROJECTS"
        title={
          <>
            See more of the <span className="text-stroke text-transparent">studio</span>
          </>
        }
        description="Explore the rest of the products, then compare how each one solves a different workflow with the same practical approach."
      >
        <CrossLinkCard
          href="/#projects"
          badge="ALL PROJECTS"
          badgeClassName="bg-red-500 text-white"
          title="Browse the full product list"
          description="Jump back to the main projects section to compare plugins, integrations, and tools."
        />
        <CrossLinkCard
          href="/blog"
          badge="BLOG"
          badgeClassName="bg-yellow-400 text-black"
          title="Read the reasoning behind the builds"
          description="Go deeper on the engineering tradeoffs, workflows, and product ideas that shape these products."
        />
      </MoreLinksSection>

      <SiteFooter
        linkHref="/#projects"
        linkLabel="VIEW ALL PROJECTS"
        linkIcon={<ArrowRight size={20} />}
      />
      <FeedbackDrawer productId={app.id} productName={app.name} accentColor={app.accentColor} />
    </main>
  );
}

export function generateStaticParams(): { id: string }[] {
  return appData.apps.map((app) => ({ id: app.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const app = getAppById(id);

  if (!app) {
    return { title: "Project not found" };
  }

  const url = `${siteConfig.url}/project/${app.id}`;
  const image = app.screenshots[0] ? `${siteConfig.url}${app.screenshots[0]}` : undefined;
  const kicker = app.category === "plugin" ? "plugin" : "app";
  const title = `${app.name} ${kicker} | PlgCraft`;

  return {
    title: {
      absolute: title,
    },
    description: app.shortDescription,
    keywords: [app.name, app.category, ...app.platform, siteConfig.name],
    authors: [{ name: siteConfig.name }],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      title,
      description: app.shortDescription,
      type: "website",
      url,
      siteName: siteConfig.name,
      images: image ? [{ url: image, width: 1200, height: 630, alt: app.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: app.shortDescription,
      images: image ? [image] : undefined,
    },
  };
}
