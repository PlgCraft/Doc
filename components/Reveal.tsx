import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Wraps children in the site's scroll-reveal entrance animation
 * (`.reveal-up` / `.reveal-fade` in global.css), which reads its stagger
 * delay from the `--delay` CSS custom property. Centralizes the
 * `style={{ ["--delay" as never]: "...ms" } as CSSProperties}` boilerplate
 * that was previously repeated at nearly every call site.
 */
export const Reveal = ({
  children,
  delay = 0,
  as: Tag = "div",
  variant = "up",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  variant?: "up" | "fade";
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <Tag
      className={`reveal-${variant} ${className}`.trim()}
      style={{ ["--delay" as never]: `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
};
