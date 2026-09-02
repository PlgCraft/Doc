import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The hero banner shared by every listing page (/blog, /tools, ...): a back
 * link, decorative corner squares, a black badge, a giant stroke-outline
 * title, and a subtitle paragraph.
 */
export const ListingHero = ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: ReactNode;
  subtitle: string;
}) => {
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
              {badge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">{title}</h1>
          </div>
          <p className="text-lg text-gray-600 font-medium max-w-md">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
