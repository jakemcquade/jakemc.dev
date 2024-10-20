import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function markdownToHTML(markdown: string) {
  const p = await unified()
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
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const { content: rawContent, data: metadata } = matter(fs.readFileSync(path.join("posts", `${slug}.mdx`), "utf-8"));
  const content = await markdownToHTML(rawContent);

  return { source: content, metadata, slug };
}

export async function getBlogPosts() {
  let mdxFiles = fs.readdirSync(path.join(process.cwd(), "posts")).filter((file) => path.extname(file) === ".mdx");
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);

      return { metadata, slug, source };
    }),
  );
}
