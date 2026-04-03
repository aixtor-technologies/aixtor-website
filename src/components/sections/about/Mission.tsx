type MissionProps = {
  heading: string;
  body: string;
};

export function Mission({ heading, body }: MissionProps) {
  return (
    <section className="border-t border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl rounded-2xl border border-zinc-200/80 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50 lg:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
