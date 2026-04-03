import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { HomeFeature } from "@/types/home";

type HomeFeaturesProps = {
  features: HomeFeature[];
};

export function HomeFeatures({ features }: HomeFeaturesProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          What we deliver
        </h2>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Modular squads that align with your roadmap—from discovery through
          production operations.
        </p>
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li key={feature.title}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>{feature.description}</CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
