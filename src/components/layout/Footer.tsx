import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            AIxtor Technologies
          </p>
          <p className="mt-1 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Cloud, modern web, and AI services for teams that need dependable
            delivery.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200/80 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        © {new Date().getFullYear()} AIxtor Technologies. All rights reserved.
      </div>
    </footer>
  );
}
