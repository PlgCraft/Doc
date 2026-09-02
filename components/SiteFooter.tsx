import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

/**
 * The site footer repeated at the bottom of every non-home page: logo,
 * copyright, and one page-specific link back into the site. `linkIcon` is
 * optional so a plain "← BACK TO X" label can skip it.
 */
export const SiteFooter = ({
  linkHref,
  linkLabel,
  linkIcon,
  className = "",
  containerClassName = "max-w-7xl mx-auto px-4 md:px-8",
}: {
  linkHref: string;
  linkLabel: string;
  linkIcon?: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <footer className={`bg-white border-t-4 border-black py-8 ${className}`.trim()}>
      <div className={containerClassName}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="text-gray-600 font-mono-brutal text-sm">
            © {new Date().getFullYear()} PlgCraft. All rights reserved.
          </div>
          <Link
            href={linkHref}
            className="flex items-center gap-2 font-bold hover:text-red-500 transition-colors"
          >
            {linkLabel} {linkIcon}
          </Link>
        </div>
      </div>
    </footer>
  );
};
