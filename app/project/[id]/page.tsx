import { Logo } from "@/components/Logo";
import { ProductIcon } from "@/components/ProductIcon";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { getAppById, appData } from "@/lib/data";
import { Testimonial } from "@/lib/data.type";
import { Badge } from "@/lib/platformBadges";
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { ArrowRight, Calendar, Quote, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { buildProductJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import type { CSSProperties } from "react";
import { FeedbackDrawer } from "@/components/feedback/FeedbackDrawer";
import { HowItWorks } from "@/components/product/HowItWorks";
import { KeyConcepts } from "@/components/product/KeyConcepts";

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(id);
  if (!app) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildProductJsonLd({
            name: app.name,
            description: app.shortDescription,
            url: `${siteConfig.url}/project/${app.id}`,
            image: app.screenshots[0] ? `${siteConfig.url}${app.screenshots[0]}` : undefined,
            category: app.category,
            brand: siteConfig.name,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Projects", url: `${siteConfig.url}/#projects` },
            { name: app.name, url: `${siteConfig.url}/project/${app.id}` },
          ]),
        ]}
      />
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ backgroundColor: `${app.accentColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="reveal-up md:w-2/5 md:shrink-0" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
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
            </div>

            <div className="reveal-up w-full md:flex-1 min-w-0" style={{ ["--delay" as never]: "180ms" } as CSSProperties}>
              <ScreenshotGallery
                screenshots={app.screenshots}
                appName={app.name}
                videoUrl={app.videoDemo}
              />
            </div>
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
            <div className="md:col-span-2 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                ABOUT THIS <span className="text-stroke text-transparent">APP</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{app.fullDescription}</p>
            </div>

            <div className="reveal-up" style={{ ["--delay" as never]: "120ms" } as CSSProperties}>
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
            <span className="inline-block bg-red-500 text-white px-4 py-2 text-sm font-bold mb-4">
              FEATURES
            </span>
            <h2 className="text-3xl md:text-5xl font-black">
              WHAT{"'"}S <span className="text-stroke text-transparent">INSIDE</span>
            </h2>
          </div>

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
            <div className="text-center mb-12 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
              <span className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-4">
                REVIEWS
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                WHAT USERS <span className="text-stroke-white text-transparent">SAY</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {app.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20" style={{ backgroundColor: app.accentColor }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
            <ProductIcon
              icon={app.icon}
              name={app.name}
              textSizeClass="text-8xl"
              pixelSize={200}
              className="mb-6 mx-auto"
            />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              READY TO TRY {app.name.toUpperCase()}?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.values(app.storeLinks).map((badget) => (
                <StoreBadge key={badget.text} badge={badget} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-8">
        <div className="border-2 border-black bg-gray-50 p-6 md:p-8 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
                MORE PROJECTS
              </span>
              <h2 className="text-2xl md:text-4xl font-black">
                See more of the <span className="text-stroke text-transparent">studio</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-xl">
              Explore the rest of the products, then compare how each one solves a different workflow with the same practical approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/#projects"
              className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
            >
              <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs font-black tracking-wider mb-3">
                ALL PROJECTS
              </span>
              <h3 className="font-black text-xl mb-2">Browse the full product list</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                Jump back to the main projects section to compare plugins, integrations, and tools.
              </p>
            </Link>

            <Link
              href="/blog"
              className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
            >
              <span className="inline-block bg-yellow-400 text-black px-2 py-1 text-xs font-black tracking-wider mb-3">
                BLOG
              </span>
              <h3 className="font-black text-xl mb-2">Read the reasoning behind the builds</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                Go deeper on the engineering tradeoffs, workflows, and product ideas that shape these products.
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
              href="/#projects"
              className="flex items-center gap-2 font-bold hover:text-red-500 transition-colors"
            >
              VIEW ALL PROJECTS <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </footer>
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

const StoreBadge = ({ badge }: { badge: Badge }) => {
  const commonClasses = `${badge.bg} text-white px-6 py-4 flex items-center gap-4 brutalist-hover`;
  const content = (
    <>
      {badge.icon}
      <div className="text-left">
        <div className="text-xs uppercase">{badge.text}</div>
        <div className="font-bold text-lg">{badge.store}</div>
      </div>
    </>
  );

  return badge.href ? (
    <a
      href={badge.href}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      {content}
    </a>
  ) : (
    <div aria-disabled="true" className={`${commonClasses} opacity-50 cursor-not-allowed select-none`}>
      {content}
    </div>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: { icon: IconName; title: string; description: string };
  index: number;
}) => {
  return (
    <div
      className="reveal-up bg-white brutalist-border brutalist-shadow-sm p-6 brutalist-hover"
      style={{ ["--delay" as never]: `${index * 90}ms` } as CSSProperties}
    >
      <div className="flex items-start gap-2">
        <DynamicIcon name={feature.icon} className="text-4xl mb-4" />
        <h3 className="font-black text-xl mb-2">{feature.title}</h3>
      </div>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <div
      className="reveal-up bg-gray-100 brutalist-border p-6 relative"
      style={{ ["--delay" as never]: `${index * 120}ms` } as CSSProperties}
    >
      <Quote className="absolute top-4 right-4 text-gray-300" size={40} />
      <p className="text-lg mb-4 italic">{testimonial.message}</p>
      <div>
        <p className="font-bold">{testimonial.name}</p>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </div>
  );
};
