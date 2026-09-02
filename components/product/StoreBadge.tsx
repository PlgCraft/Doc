import type { Badge } from "@/lib/platformBadges";

/** One store/marketplace CTA button (Chrome Web Store, WordPress.org, ...), linked or disabled. */
export const StoreBadge = ({ badge }: { badge: Badge }) => {
  const commonClasses = `${badge.bg} text-white px-6 py-4 flex items-center gap-4 brutalist-hover`;
  const content = (
    <>
      {badge.icon}
      <div className="text-left">
        <div className="text-xs uppercase">{badge.text}</div>
        <div className="font-bold text-lg">{badge.store}</div>
      </div>
    </>
  );

  return badge.href ? (
    <a href={badge.href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
      {content}
    </a>
  ) : (
    <div aria-disabled="true" className={`${commonClasses} opacity-50 cursor-not-allowed select-none`}>
      {content}
    </div>
  );
};
