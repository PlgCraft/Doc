import { AppData } from "./data.type";
import { bookFlow } from "./products/bookflow";

export const appData: AppData = {
  info: {
    name: "PlgCraft",
    title: "Plugins, Integrations & Software Products",
    email: "aliamer19ali@gmail.com",
    tagline: "Crafting reliable plugins and software tools that solve real business problems.",
    sub: "PlgCraft is a small software studio building plugins, integrations, and tools that solve one problem really well. No bloated feature lists, no dashboards you'll never open — just software that connects your platforms, automates the boring parts, and stays out of your way.",
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
      name: "All Products",
      icon: "🎯"
    },
    // {
    //   id: "tool",
    //   name: "Tools",
    //   icon: "🛠️",
    // },
    {
      id: "plugin",
      name: "Plugins",
      icon: "🔌",
    },
    // {
    //   id: "extension",
    //   name: "Extensions",
    //   icon: "🧩",
    // },
    // {
    //   id: "integration",
    //   name: "Integrations",
    //   icon: "🔗",
    // },
    // {
    //   id: "saas",
    //   name: "SaaS",
    //   icon: "☁️",
    // },
  ],
};

export const getAppById = (id: string) => {
  return appData.apps.find((app) => app.id === id);
};

export const getFeaturedApps = () => {
  return appData.apps.filter((app) => app.featured);
};

export const getAppsByCategory = (category: string) => {
  if (category === "all") return appData.apps;
  return appData.apps.filter((app) => app.category.toLowerCase() === category);
};
