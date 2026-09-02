import { productStatuses, type ProductStatusId } from "@/lib/data.type";

/** The rounded status pill (Live / In Development / ...), shared by product and tool cards. */
export const StatusBadge = ({
  statusId,
  size = "sm",
}: {
  statusId: ProductStatusId;
  size?: "xs" | "sm";
}) => {
  const status = productStatuses[statusId];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-medium border ${size === "xs" ? "text-xs" : "text-sm"} ${status.color.bg} ${status.color.text} ${status.color.border}`}
    >
      <status.icon size={14} />
      {status.label}
    </span>
  );
};
