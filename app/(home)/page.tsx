import { AboutSection } from "@/components/landing/AboutSection";
import { AppsSection } from "@/components/landing/AppsSection";
import { BlogsSection } from "@/components/landing/BlogSection";
import { ContactSection } from "@/components/landing/ContactSection";
import Hero from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AppsSection />
      <AboutSection />
      <BlogsSection />
      <ContactSection />
    </div>
  );
}
