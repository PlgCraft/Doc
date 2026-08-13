import type { MetadataRoute } from "next";
import { appData } from "@/lib/data";
import { blog } from "@/lib/source";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectUrls = appData.apps.map((app) => ({
    url: `${siteConfig.url}/project/${app.id}`,
    lastModified: new Date(app.releaseDate),
  }));

  const blogUrls = blog.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(page.data.date),
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
    ...projectUrls,
    ...blogUrls,
  ];
}
