import { BlogBody } from "@/components/sections/blog/BlogBody";
import { BlogHeader } from "@/components/sections/blog/BlogHeader";
import { RelatedPosts } from "@/components/sections/blog/RelatedPosts";
import {
  getBlogIndexCopy,
  getBlogPosts,
  getHighlightPosts,
} from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes on headless CMS, frontend platforms, and AI.",
};

export default async function BlogIndexPage() {
  const [copy, posts, highlights] = await Promise.all([
    getBlogIndexCopy(),
    getBlogPosts(),
    getHighlightPosts(2),
  ]);

  return (
    <>
      <BlogHeader
        variant="index"
        title={copy.title}
        subtitle={copy.subtitle}
      />
      <BlogBody variant="index" posts={posts} />
      <RelatedPosts posts={highlights} heading="Featured" />
    </>
  );
}
