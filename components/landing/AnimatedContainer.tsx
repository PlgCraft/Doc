import type { CSSProperties, ReactNode } from "react";

export const BlogListCardContainer = ({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) => {
  const style = {
    ["--delay" as never]: `${Math.min(index * 60, 400)}ms`,
  } as CSSProperties;

  return (
    <article className="reveal-up" style={style}>
      {children}
    </article>
  );
};

export const HeroContainer = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">{children}</div>;
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
  const style = {
    ["--delay" as never]: `${Math.min(index * 90, 600)}ms`,
  } as CSSProperties;

  return (
    <article
      className={`reveal-up ${featured ? "md:col-span-2 lg:col-span-2 md:row-span-2" : ""}`}
      style={style}
    >
      {children}
    </article>
  );
};
