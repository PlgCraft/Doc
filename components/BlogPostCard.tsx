import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import type { ReactNode } from "react";

export type BlogPostCardData = {
  title: string;
  description?: string;
  tags: readonly string[];
  date: string | Date;
  url: string;
};

/**
 * A blog post preview card: accent-tinted tag header, date (+ optional
 * extra meta like reading time), title, excerpt, and a caller-supplied
 * footer slot (a category pill, an author byline, a plain "read" link —
 * whatever fits the context this card is shown in).
 */
export const BlogPostCard = ({
  post,
  accentColor,
  footer,
  extraMeta,
  fillHeight = false,
}: {
  post: BlogPostCardData;
  accentColor: string;
  footer: ReactNode;
  extraMeta?: ReactNode;
  fillHeight?: boolean;
}) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={post.url}
      className={`group block bg-white brutalist-border brutalist-shadow brutalist-hover ${fillHeight ? "h-full" : ""}`}
    >
      <div
        className="border-b-4 border-black p-5 flex items-center justify-between gap-3"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block text-white px-3 py-1 text-xs font-black tracking-wider"
              style={{ backgroundColor: accentColor }}
            >
              {tag}
            </span>
          ))}
        </div>
        <BookOpen size={20} className="text-black shrink-0" />
      </div>

      <div className={`p-6 flex flex-col ${fillHeight ? "h-[calc(100%-64px)]" : ""}`}>
        <div className="flex items-center gap-3 text-xs font-mono-brutal text-gray-500 mb-3 uppercase tracking-wider flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {formattedDate}
          </span>
          {extraMeta && (
            <>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              {extraMeta}
            </>
          )}
        </div>

        <h3 className="font-black text-xl md:text-2xl mb-3 leading-tight group-hover:text-red-500 transition-colors">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.description}</p>
        )}

        <div className="mt-auto">{footer}</div>
      </div>
    </Link>
  );
};
