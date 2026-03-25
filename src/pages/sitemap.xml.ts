import type { APIRoute } from "astro";

import { getBlogPosts } from "~/lib/blog";
import { getCanonicalUrl } from "~/lib/utils";

interface SitemapEntry {
  url: string;
  priority: number;
}

export const GET: APIRoute = async () => {
  const blogPosts = getBlogPosts();
  const sitemap: SitemapEntry[] = [
    { url: getCanonicalUrl(), priority: 1 },
    { url: getCanonicalUrl("blog"), priority: 0.9 },
    { url: getCanonicalUrl("projects"), priority: 0.9 },
    { url: getCanonicalUrl("time"), priority: 0.8 },
    { url: getCanonicalUrl("speechify"), priority: 0.8 },
    ...blogPosts.map((page) => ({
      url: getCanonicalUrl("blog", page.slug),
      priority: 0.8,
    })),
  ];

  let text = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  text += sitemap
    .map((site) => `\n<url>\n<loc>${site.url}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<changefreq>daily</changefreq>\n<priority>${site.priority}</priority>\n</url>`)
    .join("");
  text += "\n</urlset>";

  return new Response(text, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
