import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { Tool } from "@/lib/tools.type";
import { StatusBadge } from "./StatusBadge";

/** A free-tool preview card, shared by the /tools listing and the homepage tools tab. */
export const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block bg-white brutalist-border brutalist-shadow brutalist-hover h-full"
    >
      <div
        className="p-6 border-b-4 border-black flex items-start justify-between"
        style={{ backgroundColor: `${tool.accentColor}20` }}
      >
        <DynamicIcon name={tool.icon} size={44} className="text-black" />
        <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">FREE</span>
      </div>
      <div className="p-6">
        <h3 className="font-black text-2xl mb-2 group-hover:text-red-500 transition-colors">
          {tool.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tool.shortDescription}</p>
        <div className="flex items-center gap-2 mb-4">
          <StatusBadge statusId={tool.statusId} size="xs" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
          <span className="font-bold text-sm capitalize" style={{ color: tool.accentColor }}>
            {tool.category}
          </span>
          <span className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all">
            USE TOOL <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};
