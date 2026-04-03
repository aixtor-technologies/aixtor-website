import type { BlogPost } from "@/types/blog";

export type BlogHeaderProps =
  | {
      variant: "post";
      post: BlogPost;
    }
  | {
      variant: "index";
      title: string;
      subtitle: string;
    };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(iso));
}

export function BlogHeader(props: BlogHeaderProps) {
  if (props.variant === "index") {
    return (
      <header className="border-b border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {props.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {props.subtitle}
          </p>
        </div>
      </header>
    );
  }

  const { post } = props;
  return (
    <header className="border-b border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
        <p className="mt-8 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {post.author.name}
          {post.author.role ? (
            <span className="font-normal text-zinc-500 dark:text-zinc-400">
              {" "}
              · {post.author.role}
            </span>
          ) : null}
        </p>
      </div>
    </header>
  );
}
