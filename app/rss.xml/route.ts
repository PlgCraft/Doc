import { appData } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { blog } from "@/lib/source";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: string | Date) {
  return new Date(date).toUTCString();
}

export async function GET() {
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const posts = blog.getPages().slice().sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  const items = posts
    .map((post) => {
      const link = `${siteUrl}${post.url}`;
      const title = escapeXml(post.data.title);
      const description = escapeXml(post.data.description ?? "");
      const category = escapeXml(post.data.category ?? "Blog");
      const tag = escapeXml(post.data.tags.join(", ") ?? category);
      return `
    <item>
      <title>${title}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${formatDate(post.data.date)}</pubDate>
      <category>${category}</category>
      <description>${description}</description>
      <author>${escapeXml(appData.info.name)} (${escapeXml(tag)})</author>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(appData.info.name)} Blog</title>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
