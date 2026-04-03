import type { HomeFeature, HomeTestimonial } from "@/types/home";

export async function getHomeHeroCopy(): Promise<{
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}> {
  return {
    eyebrow: "AIxtor Technologies",
    title: "IT services built for product velocity",
    subtitle:
      "From cloud platforms to Next.js frontends and AI-enabled workflows—we embed with your team and ship outcomes, not slide decks.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "View capabilities", href: "/about" },
  };
}

export async function getHomeFeatures(): Promise<HomeFeature[]> {
  return [
    {
      title: "Cloud & platform engineering",
      description:
        "Reliable foundations on AWS, Azure, and GCP with infrastructure-as-code and observability baked in.",
    },
    {
      title: "Product-grade frontends",
      description:
        "Next.js and React experiences optimized for performance, accessibility, and editorial workflows.",
    },
    {
      title: "AI enablement",
      description:
        "Practical integrations—RAG, agents, and internal copilots—with governance and cost controls.",
    },
  ];
}

export async function getHomeTestimonials(): Promise<HomeTestimonial[]> {
  return [
    {
      quote:
        "AIxtor shipped a headless stack our marketing team could own without slowing product delivery.",
      author: "Jordan Lee",
      role: "VP Engineering",
      company: "Northline Analytics",
    },
    {
      quote:
        "Clear communication, strong TypeScript discipline, and documentation that actually matched production.",
      author: "Samira Okonkwo",
      role: "CTO",
      company: "Helio Fleet",
    },
  ];
}
