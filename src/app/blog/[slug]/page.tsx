import { BlogBody } from "@/components/sections/blog/BlogBody";
import { BlogHeader } from "@/components/sections/blog/BlogHeader";
import { RelatedPosts } from "@/components/sections/blog/RelatedPosts";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 2);

  return (
    <>
      <BlogHeader variant="post" post={post} />
      <BlogBody variant="post" post={post} />
      <RelatedPosts posts={related} />
    </>
  );
}
