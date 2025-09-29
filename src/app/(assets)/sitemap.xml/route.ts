import { getCanonicalUrl } from "~/lib/utils";
import { getBlogPosts } from "~/lib/blog";

export const revalidate = 604800;
export interface Sitemap {
	url: string;
	priority: number;
}

export async function GET() {
	const blogPosts = await getBlogPosts();
	const sitemap = [
		{
			url: getCanonicalUrl(),
			priority: 1,
		},
		...(blogPosts.map(page => ({
			url: getCanonicalUrl("blog", page.slug),
			priority: 0.8
		}))),
	] satisfies Sitemap[];

	let text = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
	text += sitemap
		.map(site => `\n<url>\n<loc>${site.url}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<changefreq>daily</changefreq>\n<priority>${site.priority}</priority>\n</url>`)
		.join("")
		.replaceAll(",", "");
	text += `\n</urlset>`;

	return new Response(text, { headers: { "Content-Type": "text/xml" } });
}
