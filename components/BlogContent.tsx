"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ReactNode } from "react";

export const BlogContent = ({
  query,
  categories,
  activeCategory,
  filteredCount,
  children,
}: {
  query?: string;
  categories: string[];
  activeCategory?: string;
  filteredCount: number;
  children: ReactNode;
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const update = (key: "query" | "category", value: string) => {
    const current = new URLSearchParams(params);
    if (value) current.set(key, value);
    else current.delete(key);
    router.push(`/blog?${current.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="bg-gray-50 border-y-4 border-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Search */}
          <div className="mb-6 flex items-center gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={query ?? ""}
                onChange={(e) => update("query", e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-white brutalist-border pl-10 pr-4 py-3 font-bold focus:outline-none focus:ring-0"
              />
            </div>
            {query && (
              <button
                onClick={() => update("query", "")}
                className="bg-white brutalist-border px-3 py-3 font-bold hover:bg-gray-100"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => update("category", isActive ? "" : category)}
                  className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 font-bold transition-all text-sm md:text-base ${
                    isActive
                      ? "bg-black text-white brutalist-shadow-sm"
                      : "bg-white text-black brutalist-border hover:bg-gray-100"
                  }`}
                >
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Result count */}
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-black">
              {activeCategory && activeCategory !== "all" ? (
                <>
                  <span className="text-gray-400">SHOWING:</span> {activeCategory.toUpperCase()}
                </>
              ) : (
                "ALL POSTS"
              )}
            </h2>
            <p className="text-sm font-mono-brutal text-gray-500 uppercase tracking-wider">
              {filteredCount} {filteredCount === 1 ? "post" : "posts"} found
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-50 brutalist-border p-12 md:p-20 text-center"
              >
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl font-black mb-2">No posts found</h3>
                <p className="text-gray-600 mb-6">Try a different category or clear the search.</p>
                <button
                  onClick={() => {
                    update("category", "");
                    update("query", "");
                  }}
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold brutalist-shadow-sm brutalist-hover"
                >
                  RESET FILTERS
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${activeCategory}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};
