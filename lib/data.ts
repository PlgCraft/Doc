import type { AppData, ProductListCategory, Product } from "./data.type";
import { bookFlow } from "./products";

export const appData = {
  info: {
    name: "PlgCraft",
    title: "Plugins, Integrations & Software Products",
    email: "aliamer19ali@gmail.com",
    tagline: "Crafting reliable plugins and software tools that solve real business problems.",
    sub: "PlgCraft builds plugins, integrations, and tools that solve one problem really well. No bloated feature lists, no dashboards you'll never open. Just software that connects your platforms, automates the boring parts, and stays out of your way.",
    social: {
      github: "https://github.com/aliamerj",
      twitter: "https://x.com/AliAmer12748774",
      linkedin: "https://linkedin.com/in/ali-amer22",
    },
  },
  apps: [bookFlow],
  categories: [
    {
      id: "all",
      name: "All",
      icon: "🎯",
    },
    {
      id: "plugin",
      name: "Plugins",
      icon: "🔌",
    },
  ],
} satisfies AppData;

export const getAppById = (id: string): Product | undefined => {
  return appData.apps.find((app) => app.id === id);
};

export const getFeaturedApps = () => {
  return appData.apps.filter((app) => app.featured);
};

export const getAppsByCategory = (category: ProductListCategory) => {
  if (category === "all") return appData.apps;
  return appData.apps.filter((app) => app.category.toLowerCase() === category);
};
