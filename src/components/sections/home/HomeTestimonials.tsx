import { Card, CardContent } from "@/components/ui/Card";
import type { HomeTestimonial } from "@/types/home";

type HomeTestimonialsProps = {
  testimonials: HomeTestimonial[];
};

export function HomeTestimonials({ testimonials }: HomeTestimonialsProps) {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Trusted by technical leaders
        </h2>
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.author}>
              <Card>
                <CardContent className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <blockquote className="font-medium text-zinc-900 dark:text-zinc-100">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {t.author}
                    </span>
                    <span> · {t.role}, {t.company}</span>
                  </footer>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
