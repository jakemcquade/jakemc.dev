import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import { unified } from "unified";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

export async function getPost(slug: string) {
  const { content: rawContent, data: metadata } = matter(fs.readFileSync(path.join("posts", `${slug}.mdx`), "utf-8"));
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
    })
    .use(rehypeStringify)
    .process(rawContent)

  return { source: content.toString(), metadata, slug };
}

export function getBlogPosts() {
  const mdxFiles = fs.readdirSync(path.join(process.cwd(), "posts")).filter((file) => path.extname(file) === ".mdx");
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);

      return { metadata, slug, source };
    }),
  );
}
