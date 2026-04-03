import type { BlogPost } from "@/types/blog";

const posts: BlogPost[] = [
  {
    slug: "scaling-headless-wordpress",
    title: "Scaling Headless WordPress for Enterprise Teams",
    excerpt:
      "Patterns for caching, preview workflows, and GraphQL field selection when your marketing stack stays on WordPress.",
    publishedAt: "2026-03-12",
    readingTimeMinutes: 6,
    author: { name: "Priya Nair", role: "Principal Engineer" },
    contentHtml: `
      <p>Headless WordPress unlocks editorial velocity while your product team ships on a modern frontend. The hard part is operational discipline: schema stability, CDN caching, and safe previews.</p>
      <h2>Start with the contract</h2>
      <p>Define the minimum viable post shape in GraphQL or REST and version it explicitly. Treat breaking field renames like API migrations.</p>
      <h2>Cache in layers</h2>
      <p>Use stale-while-revalidate at the edge for public content and short TTLs for personalized or authenticated views.</p>
    `,
  },
  {
    slug: "design-systems-that-survive",
    title: "Design Systems That Survive Production",
    excerpt:
      "How we keep tokens, components, and documentation aligned when multiple squads contribute at different speeds.",
    publishedAt: "2026-02-28",
    readingTimeMinutes: 5,
    author: { name: "Marcus Chen", role: "Design Lead" },
    contentHtml: `
      <p>A design system is only as good as its adoption loop. We bias toward small, composable primitives and automated visual checks in CI.</p>
      <h2>Tokens first</h2>
      <p>Semantic tokens map to product meaning; raw palettes stay an implementation detail.</p>
    `,
  },
  {
    slug: "secure-sdks-for-ai-products",
    title: "Building Secure SDKs for AI-Powered Products",
    excerpt:
      "Key management, rate limits, and observability patterns we use when shipping customer-facing AI features.",
    publishedAt: "2026-01-15",
    readingTimeMinutes: 7,
    author: { name: "Elena Rossi", role: "Security Architect" },
    contentHtml: `
      <p>Customer trust hinges on predictable behavior: clear quotas, transparent logging, and graceful degradation when models or providers fail.</p>
    `,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  return posts.find((p) => p.slug === slug);
}

export async function getRelatedPosts(
  slug: string,
  limit = 2,
): Promise<BlogPost[]> {
  const current = await getPostBySlug(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export async function getAllPostSlugs(): Promise<string[]> {
  return posts.map((p) => p.slug);
}

export async function getBlogIndexCopy(): Promise<{
  title: string;
  subtitle: string;
}> {
  return {
    title: "Insights",
    subtitle:
      "Notes on headless CMS, frontend architecture, and shipping reliable AI features.",
  };
}

export async function getHighlightPosts(limit = 2): Promise<BlogPost[]> {
  const all = await getBlogPosts();
  return all.slice(0, limit);
}
