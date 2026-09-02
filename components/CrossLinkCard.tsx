import Link from "next/link";

/** One tagged link card ("ALL PROJECTS" / "BLOG" / ...) used inside MoreLinksSection. */
export const CrossLinkCard = ({
  href,
  badge,
  badgeClassName = "bg-black text-white",
  title,
  description,
}: {
  href: string;
  badge: string;
  badgeClassName?: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={href}
      className="bg-white brutalist-border p-5 hover:-translate-y-1 transition-transform"
    >
      <span
        className={`inline-block px-2 py-1 text-xs font-black tracking-wider mb-3 ${badgeClassName}`}
      >
        {badge}
      </span>
      <h3 className="font-black text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
    </Link>
  );
};
