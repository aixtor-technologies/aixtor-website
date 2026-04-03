import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { TeamMember } from "@/types/about";

type TeamProps = {
  members: TeamMember[];
};

export function Team({ members }: TeamProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Leadership
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        A small, senior group with deep experience across platform, product
        engineering, and regulated industries.
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <li key={m.name}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{m.name}</CardTitle>
                <p className="text-sm font-medium text-[var(--brand)]">
                  {m.role}
                </p>
              </CardHeader>
              <CardContent>{m.bio}</CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
