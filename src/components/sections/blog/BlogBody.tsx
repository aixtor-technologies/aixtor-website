import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { BlogPost } from "@/types/blog";

export type BlogBodyProps =
  | { variant: "post"; post: BlogPost }
  | { variant: "index"; posts: BlogPost[] };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(iso));
}

export function BlogBody(props: BlogBodyProps) {
  if (props.variant === "index") {
    const { posts } = props;
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {formatDate(post.publishedAt)} · {post.readingTimeMinutes}{" "}
                      min
                    </p>
                    <CardTitle className="mt-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{post.excerpt}</CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const { post } = props;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        className="space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:dark:text-zinc-50 [&_p]:text-zinc-600 [&_p]:dark:text-zinc-400"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
