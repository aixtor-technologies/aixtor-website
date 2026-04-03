import type { TeamMember } from "@/types/about";

export async function getAboutHeroCopy(): Promise<{
  title: string;
  subtitle: string;
}> {
  return {
    title: "Engineering partners for ambitious product teams",
    subtitle:
      "We design, build, and operate software that has to work in the real world—under load, across time zones, and with evolving compliance needs.",
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return [
    {
      name: "Anika Desai",
      role: "Founder & CEO",
      bio: "Former director of platform engineering; focuses on delivery governance and long-term maintainability.",
    },
    {
      name: "Thomas Weber",
      role: "Head of Delivery",
      bio: "Leads cross-functional pods across cloud migration, greenfield builds, and modernization programs.",
    },
    {
      name: "Yuki Tanaka",
      role: "Lead Architect",
      bio: "Specializes in event-driven systems, API design, and performance profiling for customer-facing workloads.",
    },
  ];
}

export async function getMissionCopy(): Promise<{
  heading: string;
  body: string;
}> {
  return {
    heading: "Our mission",
    body: "Help organizations ship dependable digital products by pairing pragmatic architecture with hands-on execution—so teams move faster without trading away quality or security.",
  };
}
