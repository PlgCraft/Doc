"use client";
import { getAppsByCategory, appData } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const AppsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredApps, setFilteredApps] = useState(appData.apps);

  useEffect(() => {
    setFilteredApps(getAppsByCategory(activeCategory));
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 bg-gray-50 grid-pattern">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-red-500 text-white px-4 py-2 text-sm font-bold mb-6">
            PRODUCTS
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Software <span className="text-stroke text-transparent">I Build</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each product here is built to solve a specific, real problem — designed, developed, and shipped from start to finish.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {appData.categories.map((category) => (
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
        </motion.div>

        {/* Apps Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredApps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const AppCard = ({ app, index }: { app: (typeof appData.apps)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/project/${app.id}`}>
        <div
          className="group bg-white brutalist-border brutalist-shadow brutalist-hover cursor-pointer h-full"
          style={{ accentColor: app.accentColor }}
        >
          {/* App Header */}
          <div
            className="p-6 border-b-4 border-black"
            style={{ backgroundColor: `${app.accentColor}20` }}
          >
            <div className="flex items-start justify-between">
              <div className="text-5xl">{app.icon}</div>
              <div className="flex gap-2">
                {app.platform.map(p => <span key={p} className="bg-black text-white px-2 py-1 text-xs font-bold">{p}</span>)}
              </div>
            </div>
          </div>

          {/* App Content */}
          <div className="p-6">
            <h3 className="font-black text-2xl mb-2 group-hover:text-red-500 transition-colors">
              {app.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{app.shortDescription}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-4">
              {/* <div className="flex items-center gap-1"> */}
              {/*   <Star className="fill-yellow-400 text-yellow-400" size={16} /> */}
              {/*   <span className="font-bold">{app.rating}</span> */}
              {/* </div> */}
              {/* <div className="flex items-center gap-1"> */}
              {/*   <Download size={16} /> */}
              {/*   <span className="text-sm">{app.downloads}</span> */}
              {/* </div> */}
            </div>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {app.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="bg-gray-100 px-2 py-1 text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
              <span className="font-bold text-sm" style={{ color: app.accentColor }}>
                {app.price}
              </span>
              <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
                VIEW DETAILS <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
