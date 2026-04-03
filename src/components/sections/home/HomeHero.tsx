import { Button } from "@/components/ui/Button";

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--brand)]/15 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--brand)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={primaryCta.href} className="px-5">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" className="px-5">
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
