type AboutHeroProps = {
  title: string;
  subtitle: string;
};

export function AboutHero({ title, subtitle }: AboutHeroProps) {
  return (
    <section className="border-b border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
