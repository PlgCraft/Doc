import type { MetadataRoute } from "next";
import { appData } from "@/lib/data";
import { toolsData } from "@/lib/tools";
import { blog } from "@/lib/source";
import { siteConfig } from "@/lib/site";

const toValidDate = (value: string | Date, fallback: Date): Date => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectUrls = appData.apps.map((app) => ({
    url: `${siteConfig.url}/project/${app.id}`,
    lastModified: toValidDate(app.releaseDate, now),
  }));

  const toolUrls = toolsData.tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.id}`,
    lastModified: toValidDate(tool.releaseDate, now),
  }));

  const blogUrls = blog.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: toValidDate(page.data.date, now),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: now,
    },
    ...projectUrls,
    ...toolUrls,
    ...blogUrls,
  ];
}
