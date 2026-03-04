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

const metadataCache = new Map<string, Record<string, any>>();
const postCache = new Map<string, Promise<{ source: string; metadata: Record<string, any>; slug: string }>>();
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getPostMetadata(slug: string) {
  const cached = metadataCache.get(slug);
  if (cached) return cached;

  const raw = findRawBySlug(slug);
  if (!raw) throw new Error(`Post not found: ${slug}`);

  const { data: metadata } = matter(raw);
  metadataCache.set(slug, metadata as Record<string, any>);

  return metadata as Record<string, any>;
}

export async function getPost(slug: string) {
  const cached = postCache.get(slug);
  if (cached) return cached;

  const postPromise = (async () => {
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
        getHighlighter: (options) => {
          if (!highlighterPromise) {
            highlighterPromise = createHighlighter({
              ...options,
              engine: createJavaScriptRegexEngine({ forgiving: true }),
            });
          }

          return highlighterPromise;
        },
      })
      .use(rehypeStringify)
      .process(rawContent);

    return { source: content.toString(), metadata, slug };
  })();

  postCache.set(slug, postPromise);
  return postPromise;
}

export function getBlogPosts() {
  const slugs = Object.keys(rawPosts).map((filePath) =>
    filePath.split("/").pop()!.replace(/\.mdx?$/, ""),
  );

  return slugs.map((slug) => ({ metadata: getPostMetadata(slug), slug }));
}
