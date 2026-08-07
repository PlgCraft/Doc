"use client";
import { appData } from "@/lib/data";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../AnimatedCounter";

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {appData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-6xl font-black mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={
                    stat.value.includes("+")
                      ? "+"
                      : stat.value.includes("K")
                        ? "K+"
                        : ""
                  }
                />
              </div>
              <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
