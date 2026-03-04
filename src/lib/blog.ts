import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import { unified } from "unified";
import matter from "gray-matter";
import { createHighlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Bundle posts at build time (Workers-safe, no fs).
const rawPosts = import.meta.glob("../../posts/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function findRawBySlug(slug: string): string | null {
  for (const [filePath, raw] of Object.entries(rawPosts)) {
    if (filePath.endsWith(`/${slug}.mdx`) || filePath.endsWith(`/${slug}.md`)) {
      return raw;
    }
  }
  return null;
}

export async function getPost(slug: string) {
  const raw = findRawBySlug(slug);
  if (!raw) throw new Error(`Post not found: ${slug}`);

  const { content: rawContent, data: metadata } = matter(raw);

  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      keepBackground: false,
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      // IMPORTANT: avoid Shiki's default WASM Oniguruma engine on Cloudflare Workers
      getHighlighter: (options) =>
        createHighlighter({
          ...options,
          engine: createJavaScriptRegexEngine({ forgiving: true }),
        }),
    })
    .use(rehypeStringify)
    .process(rawContent);

  return { source: content.toString(), metadata, slug };
}

export function getBlogPosts() {
  const slugs = Object.keys(rawPosts).map((filePath) =>
    filePath.split("/").pop()!.replace(/\.mdx?$/, ""),
  );

  return Promise.all(
    slugs.map(async (slug) => {
      const { metadata, source } = await getPost(slug);
      return { metadata, slug, source };
    }),
  );
}
