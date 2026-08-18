"use client";
import type { CSSProperties } from "react";
import { getAppsByCategory, appData } from "@/lib/data";
import { toolsData } from "@/lib/tools";
import type { Tool } from "@/lib/tools.type";
import type { ProductListCategory } from "@/lib/data.type";
import { productStatuses } from "@/lib/data.type";
import { useState } from "react";
import { ArrowUpRight, Wrench } from "lucide-react";
import Link from "next/link";

type SectionCategory = ProductListCategory | "tools";

const TOOLS_TAB = { id: "tools" as const, name: "Free Tools", icon: "🧰" };

export const AppsSection = () => {
  const [activeCategory, setActiveCategory] = useState<SectionCategory>("all");
  const tabs = [...appData.categories, TOOLS_TAB];
  const showProducts = activeCategory !== "tools";
  const showTools = activeCategory === "all" || activeCategory === "tools";
  const filteredApps = showProducts ? getAppsByCategory(activeCategory as ProductListCategory) : [];
  const tools = showTools ? toolsData.tools : [];

  return (
    <section id="projects" className="py-20 bg-gray-50 grid-pattern">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
          <span className="inline-block bg-red-500 text-white px-4 py-2 text-sm font-bold mb-6">
            PRODUCTS
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Software <span className="text-stroke text-transparent">I Build</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every product here is designed, developed, and shipped from start to finish, built to solve one real problem well.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-up" style={{ ["--delay" as never]: "120ms" } as CSSProperties}>
          {tabs.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 font-bold transition-all ${activeCategory === category.id
                ? "bg-black text-white brutalist-shadow-sm"
                : "bg-white text-black brutalist-border hover:bg-gray-100"
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {activeCategory === "tools" && tools.length === 0 ? (
          <div
            className="reveal-up bg-white brutalist-border p-8 md:p-12 text-center"
            style={{ ["--delay" as never]: "180ms" } as CSSProperties}
          >
            <Wrench size={40} className="mx-auto mb-4" />
            <h3 className="font-black text-2xl mb-2">First tool is on the way</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Free, single-purpose utilities are launching soon. Check the{" "}
              <Link href="/tools" className="underline hover:text-red-500">
                tools page
              </Link>{" "}
              for what ships first.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={filteredApps.length + index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AppCard = ({ app, index }: { app: (typeof appData.apps)[number]; index: number }) => {
  const status = productStatuses[app.statusId];

  return (
    <div className="reveal-up" style={{ ["--delay" as never]: `${180 + index * 90}ms` } as CSSProperties}>
      <Link href={`/project/${app.id}`}>
        <div
          className="group bg-white brutalist-border brutalist-shadow brutalist-hover cursor-pointer h-full"
          style={{ accentColor: app.accentColor }}
        >
          <div
            className="p-6 border-b-4 border-black"
            style={{ backgroundColor: `${app.accentColor}20` }}
          >
            <div className="flex items-start justify-between">
              <div className="text-5xl">{app.icon}</div>
              <div className="flex gap-2">
                {app.platform.map((p) => (
                  <span key={p} className="bg-black text-white px-2 py-1 text-xs font-bold">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-black text-2xl mb-2 group-hover:text-red-500 transition-colors">
              {app.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{app.shortDescription}</p>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color.bg} ${status.color.text} ${status.color.border}`}
              >
                <status.icon size={14} />
                {status.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {app.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="bg-gray-100 px-2 py-1 text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
              <span className="font-bold text-sm" style={{ color: app.accentColor }}>
                {app.pricing.label}
              </span>
              <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
                VIEW DETAILS <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const status = productStatuses[tool.statusId];

  return (
    <div className="reveal-up" style={{ ["--delay" as never]: `${180 + index * 90}ms` } as CSSProperties}>
      <Link href={`/tools/${tool.id}`}>
        <div className="group bg-white brutalist-border brutalist-shadow brutalist-hover cursor-pointer h-full">
          <div
            className="p-6 border-b-4 border-black flex items-start justify-between"
            style={{ backgroundColor: `${tool.accentColor}20` }}
          >
            <div className="text-5xl">{tool.icon}</div>
            <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">FREE</span>
          </div>

          <div className="p-6">
            <h3 className="font-black text-2xl mb-2 group-hover:text-red-500 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{tool.shortDescription}</p>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color.bg} ${status.color.text} ${status.color.border}`}
              >
                <status.icon size={14} />
                {status.label}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
              <span className="font-bold text-sm capitalize" style={{ color: tool.accentColor }}>
                {tool.category}
              </span>
              <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
                USE TOOL <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
