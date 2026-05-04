import type { Metadata } from "next";

interface SeoData {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string | null;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_image_url?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_card?: string;
  twitter_image_url?: string;
  robots?: string[];
}

export function mapSeoToMetadata(
  seo: SeoData,
  siteName = "AIXTOR Technologies"
): Metadata {
  return {
    title: seo.meta_title || siteName,
    description: seo.meta_description,
    keywords: seo.meta_keywords ?? undefined,
    alternates: {
      canonical: seo.canonical_url || undefined,
    },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      type: seo.og_type === "default" ? "website" : (seo.og_type as any),
      images: seo.og_image_url ? [{ url: seo.og_image_url }] : undefined,
      siteName,
    },
    twitter: {
      card:
        seo.twitter_card === "default" ? "summary" : (seo.twitter_card as any),
      title: seo.twitter_title,
      description: seo.twitter_description,
      images: seo.twitter_image_url ? [seo.twitter_image_url] : undefined,
    },
    robots: seo.robots?.length ? seo.robots.join(", ") : "index, follow",
  };
}
