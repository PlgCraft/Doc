import type { ReactNode } from "react";

/**
 * The bordered "MORE PROJECTS" / "MORE TOOLS" / "RELATED LINKS" callout box
 * that closes out every detail page: a badge + heading + description, then
 * a grid of CrossLinkCard children.
 */
export const MoreLinksSection = ({
  badge,
  title,
  description,
  children,
  className = "",
  gridClassName = "md:grid-cols-2",
}: {
  badge: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
  className?: string;
  gridClassName?: string;
}) => {
  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-24 ${className}`.trim()}>
      <div className="border-2 border-black bg-gray-50 p-6 md:p-8 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
              {badge}
            </span>
            <h2 className="text-2xl md:text-4xl font-black">{title}</h2>
          </div>
          <p className="text-gray-600 max-w-xl">{description}</p>
        </div>

        <div className={`grid ${gridClassName} gap-4`}>{children}</div>
      </div>
    </section>
  );
};
