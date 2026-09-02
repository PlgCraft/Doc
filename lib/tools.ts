import type { Tool, ToolCategoryMeta, ToolListCategory } from "./tools.type";
import { tools } from "./tools/index";

export const toolsData = {
  tools,
  categories: [
    { id: "all", name: "All Tools", icon: "wrench" },
  ] satisfies ToolCategoryMeta[],
};

export const getToolById = (id: string): Tool | undefined => {
  return tools.find((tool) => tool.id === id);
};

export const getToolsByCategory = (category: ToolListCategory): readonly Tool[] => {
  if (category === "all") return tools;
  return tools.filter((tool) => tool.category === category);
};

export const getFeaturedTools = (): readonly Tool[] => {
  return tools.filter((tool) => tool.featured);
};
