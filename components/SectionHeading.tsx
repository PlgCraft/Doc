import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The centered "badge + big stroke-outline title" header repeated at the
 * top of most content sections (FEATURES, FROM THE BLOG, REVIEWS, FAQ...).
 * Title content stays a caller-supplied ReactNode since the exact wording,
 * casing, and which word gets the stroke-outline treatment differs per
 * section — this only standardizes the wrapper markup and spacing.
 */
export const SectionHeading = ({
  label,
  labelClassName = "bg-red-500 text-white",
  title,
  size = "md",
  delay = 0,
  className = "",
}: {
  label: string;
  labelClassName?: string;
  title: ReactNode;
  size?: "md" | "lg";
  delay?: number;
  className?: string;
}) => {
  const titleSize = size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl";

  return (
    <Reveal delay={delay} className={`text-center mb-12 ${className}`.trim()}>
      <span className={`inline-block px-4 py-2 text-sm font-bold mb-4 ${labelClassName}`}>
        {label}
      </span>
      <h2 className={`${titleSize} font-black`}>{title}</h2>
    </Reveal>
  );
};
