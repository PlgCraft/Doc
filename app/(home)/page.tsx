import { AboutSection } from "@/components/landing/AboutSection";
import { AppsSection } from "@/components/landing/AppsSection";
import { BlogsSection } from "@/components/landing/BlogSection";
import { ContactSection } from "@/components/landing/ContactSection";
import Hero from "@/components/landing/Hero";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { appData } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { buildHomeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={buildHomeJsonLd({
          sameAs: Object.values(appData.info.social).filter(Boolean) as string[],
        })}
      />
      <Hero />
      <AppsSection />
      <AboutSection />
      <BlogsSection />
      <ContactSection />
    </div>
  );
}
