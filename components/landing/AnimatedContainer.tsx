"use client";
import { useInView, motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export const BlogListCardContainer = ({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      {children}
    </motion.article>
  );
};

export const HeroContainer = ({ children }: { children: ReactNode }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
      {children}
    </motion.div>
  );
};

export const BlogCardContainer = ({
  index,
  featured,
  children,
}: {
  index: number;
  featured: boolean;
  children: ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? "md:col-span-2 lg:col-span-2 md:row-span-2" : ""}
    >
      {children}
    </motion.article>
  );
};
