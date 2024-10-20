import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getBlogPosts, getPost } from "../../../lib/blog";
import config from "~/config";
import { formatDate } from "~/lib/utils";
import BackUp from "~/components/backup";

export async function generateStaticPaths() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? `${config.meta.site}${image}` : `${config.meta.site}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime,
      url: `${config.meta.site}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
  let post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <section id="blog" className={"relative min-h-[75dvh] items-center justify-center bg-transparent px-8 pt-8"}>
      <h1 className="title text-2xl font-medium tracking-tighter">{post.metadata.title}</h1>
      <div className={"mb-8 mt-2 flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400"}>
        <p>Jake McQuade</p>
        <span>•</span>
        <Suspense fallback={<p className="h-5" />}>
          <p>{formatDate(post.metadata.publishedAt)}</p>
        </Suspense>
      </div>
      <article className={"prose dark:prose-invert"} dangerouslySetInnerHTML={{ __html: post.source }} />
      <BackUp />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image ? `${config.meta.site}${post.metadata.image}` : `${config.meta.site}/og?title=${post.metadata.title}`,
            url: `${config.meta.site}/blog/${post.slug}`,
            author: { "@type": "Person", name: config.name },
          }),
        }}
      />
    </section>
  );
}
