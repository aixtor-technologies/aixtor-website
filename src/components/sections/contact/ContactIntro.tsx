type ContactIntroProps = {
  title: string;
  subtitle: string;
};

export function ContactIntro({ title, subtitle }: ContactIntroProps) {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {subtitle}
      </p>
    </div>
  );
}
