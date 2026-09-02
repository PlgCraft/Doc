import type { ComponentType } from "react";
import type { IconName } from "lucide-react/dynamic";
import type { ProductStatusId } from "./data.type";

export const toolCategories = ["utility", "converter", "generator", "calculator"] as const;
export type ToolCategory = (typeof toolCategories)[number];
export type ToolListCategory = ToolCategory | "all";

export type ToolStep = {
  title: string;
  description: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type Tool = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ToolCategory;
  keywords: readonly string[];
  icon: IconName;
  accentColor: string;
  statusId: ProductStatusId;
  releaseDate: `${number}-${number}-${number}`;
  howItWorks: readonly ToolStep[];
  faqs: readonly ToolFaq[];
  featured: boolean;
};

export type ToolCategoryMeta = {
  id: ToolListCategory;
  name: string;
  icon: IconName;
};

/**
 * A tool's interactive UI, registered separately from its data so the data
 * files stay server-safe. Each entry is a client component ("use client")
 * keyed by Tool.id.
 */
export type ToolWidgetMap = Record<string, ComponentType>;
