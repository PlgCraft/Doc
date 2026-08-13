"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const BlogFilters = ({
  query,
  categories,
  activeCategory,
}: {
  query?: string;
  categories: string[];
  activeCategory?: string;
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const update = (key: "query" | "category", value: string) => {
    const current = new URLSearchParams(params);

    if (value) current.set(key, value);
    else current.delete(key);

    router.push(`/blog?${current.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push("/blog", { scroll: false });
  };

  return (
    <section className="bg-gray-50 border-y-4 border-black py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-6 flex items-center gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
              type="button"
              onClick={() => update("query", "")}
              className="bg-white brutalist-border px-3 py-3 font-bold hover:bg-gray-100"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                type="button"
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
          {(query || activeCategory) && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 font-bold transition-all text-sm md:text-base bg-white text-black brutalist-border hover:bg-gray-100"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
