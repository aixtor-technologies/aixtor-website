import { HomeFeatures } from "@/components/sections/home/HomeFeatures";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeTestimonials } from "@/components/sections/home/HomeTestimonials";
import {
  getHomeFeatures,
  getHomeHeroCopy,
  getHomeTestimonials,
} from "@/lib/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Cloud platforms, Next.js product engineering, and AI enablement for teams that ship.",
};

export default async function HomePage() {
  const [hero, features, testimonials] = await Promise.all([
    getHomeHeroCopy(),
    getHomeFeatures(),
    getHomeTestimonials(),
  ]);

  return (
    <>
      <HomeHero {...hero} />
      <HomeFeatures features={features} />
      <HomeTestimonials testimonials={testimonials} />
    </>
  );
}
