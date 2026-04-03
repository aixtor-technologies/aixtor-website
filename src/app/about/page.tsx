import { AboutHero } from "@/components/sections/about/AboutHero";
import { Mission } from "@/components/sections/about/Mission";
import { Team } from "@/components/sections/about/Team";
import {
  getAboutHeroCopy,
  getMissionCopy,
  getTeamMembers,
} from "@/lib/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, how we work, and the mission behind our engineering practice.",
};

export default async function AboutPage() {
  const [hero, members, mission] = await Promise.all([
    getAboutHeroCopy(),
    getTeamMembers(),
    getMissionCopy(),
  ]);

  return (
    <>
      <AboutHero title={hero.title} subtitle={hero.subtitle} />
      <Team members={members} />
      <Mission heading={mission.heading} body={mission.body} />
    </>
  );
}
