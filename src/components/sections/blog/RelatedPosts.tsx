import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { BlogPost } from "@/types/blog";

type RelatedPostsProps = {
  posts: BlogPost[];
  heading?: string;
};

export function RelatedPosts({ posts, heading = "Related posts" }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-zinc-200/80 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900/40 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{p.excerpt}</CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
