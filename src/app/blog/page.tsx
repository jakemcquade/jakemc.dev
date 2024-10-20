import NextLink from "next/link";
import BlurFade from "~/components/effects/blur-fade";
import BlurFadeText from "~/components/effects/blur-fade-text";
import config from "~/config";
import { getBlogPosts } from "~/lib/blog";

export const metadata = {
  title: "Blog",
  description: "A collection of insightful tutorials, guides, and various topics of interest by Jake McQuade.",
};

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main className="relative min-h-[100dvh] items-center justify-center bg-transparent px-8 pt-8">
      <BlurFadeText className={"my-4 mt-2.5 text-4xl font-bold"} delay={config.initialAnimationDelay} yOffset={8} text="Blog" />
      <div className={"flex flex-col space-y-4"}>
        {posts
          .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
          .map((post, i) => (
            <BlurFade key={post.slug} delay={config.initialAnimationDelay * 2 + i * 0.05}>
              <NextLink className={"hover:no-underline"} href={`/blog/${post.slug}`} passHref>
                <article className={"group rounded bg-transparent p-4 shadow"}>
                  <h2 className="text-2xl font-semibold">{post.metadata.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{post.metadata.summary}</p>
                </article>
              </NextLink>
            </BlurFade>
          ))}
      </div>
    </main>
  );
}
