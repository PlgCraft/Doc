import { blog } from "@/lib/source";
import { ACCENTCOLOR } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { BlogCardContainer } from "./AnimatedContainer";
import { Reveal } from "@/components/Reveal";

export const BlogsSection = () => {
  const blogs = blog.getPages()?.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured)
  );
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rotate-12 hidden md:block" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500 -rotate-12 hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
              INSIGHTS
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none">
              LATEST <span className="text-stroke text-transparent">Articles</span>
              <br />& Updates
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-md font-medium">
            Stay up to date with new products, feature releases, technical tutorials, integration guides, and engineering articles from PlgCraft. Learn how our software is built, what&apos;s shipping next, and the ideas behind every product.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
          {blogs.map((blog, i) => (
            <BlogCard
              key={blog.data.title}
              blog={{
                ...blog.data,
                accentColor: ACCENTCOLOR[i],
                url: blog.url,

              }}
              index={i + 5}
              featured={blog.data.featured}
            />
          ))}
        </div>

        <Reveal delay={320} className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-lg brutalist-shadow brutalist-hover"
          >
            READ ALL POSTS <ArrowRight size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

type Blog = {
  title: string;
  author: string;
  date: string | Date;
  description?: string | undefined;
  more?: string,
  accentColor: string;
  tags: string[];
  category: string;
  url: string;
};

const BlogCard = ({
  blog,
  index,
  featured = false,
}: {
  blog: Blog;
  index: number;
  featured: boolean;
}) => {

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <BlogCardContainer index={index} featured={featured}>
      <Link
        href={blog.url}
        className="group block bg-white brutalist-border brutalist-shadow brutalist-hover h-full"
      >
        <div
          className="border-b-4 border-black p-6 flex items-center justify-between"
          style={{ backgroundColor: `${blog.accentColor}20` }}
        >
          <div className="flex gap-2">
            {blog.tags.map(tag => <span
              key={tag}
              className="inline-block text-white px-3 py-1 text-xs font-black tracking-wider"
              style={{ backgroundColor: blog.accentColor }}
            >
              {tag}
            </span>)}
          </div>
          <BookOpen size={featured ? 28 : 22} className="text-black" />
        </div>

        <div className={`p-6 ${featured ? "md:p-10" : ""} flex flex-col h-[calc(100%-72px)]`}>
          <div className="flex items-center gap-3 text-xs font-mono-brutal text-gray-500 mb-4 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formattedDate}
            </span>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="flex items-center gap-1">
              <Clock size={12} /> {"5"} min
            </span>
            {featured && (
              <>
                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="font-black text-black">FEATURED POST</span>
              </>
            )}
          </div>

          <h3
            className={`font-black leading-tight mb-3 group-hover:text-red-500 transition-colors ${featured ? "text-3xl md:text-5xl lg:text-6xl" : "text-xl md:text-2xl"}`}
          >
            {blog.title}
          </h3>

          <p
            className={`text-gray-600 ${featured ? "text-base md:text-xl line-clamp-5 my-3" : "text-sm line-clamp-3 mb-6"}`}
          >
            {blog.description}
          </p>
          {blog.more &&
            <p
              className={`text-gray-600 mb-6 border-t border-gray-200 text-base md:text-xl line-clamp-9`}
            >
              {blog.more}
            </p>
          }

          <div className="mt-auto pt-4 border-t-2 border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`brutalist-border flex items-center justify-center font-black ${featured ? "w-10 h-10 text-base" : "w-8 h-8 text-xs"
                  }`}
                style={{ backgroundColor: blog.accentColor, color: "#fff" }}
              >
                {blog.author?.charAt(0) || "A"}
              </div>
              <div className={featured ? "text-sm" : "text-xs"}>
                <div className="font-bold leading-tight">{blog.author}</div>
                <div className="text-gray-500 font-mono-brutal">{blog.category}</div>
              </div>
            </div>
            <span
              className={`flex items-center gap-2 font-bold group-hover:gap-4 transition-all whitespace-nowrap ${featured ? "text-base md:text-lg" : "text-sm"
                }`}
            >
              READ {featured ? "POST" : ""} <ArrowUpRight size={featured ? 20 : 16} />
            </span>
          </div>
        </div>
      </Link>
    </BlogCardContainer>
  );
};
