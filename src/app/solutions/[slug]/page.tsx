import ServiceBanner from "@/components/shared/banner-details";
import FaqSection from "@/components/shared/faq";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";
import UltimateSection from "@/components/sections/solution/ultimate-section";
import ChallengesSection from "@/components/sections/solution/challenges-section";
import ReasonsSection from "@/components/sections/solution/reason-section";
import BenefitsSection from "@/components/sections/solution/benefits-section";


async function fetchSolution(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `solutions/${slug}`,
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch solution content:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = await fetchSolution(slug);

  if (!solution?.acf_fields) return null;

  const {
    banner_section,
    ultimate_section,
    challenges_section,
    reasons_section,
    benefits_section,
    faq_section,
  } = solution.acf_fields;

  return (
    <>
      <ServiceBanner
        badge={solution.title}
        banner_section={banner_section}
      />
      <UltimateSection ultimate_section={ultimate_section} />
      <ChallengesSection challenges_section={challenges_section} />
      <ReasonsSection reasons_section={reasons_section} />
      <BenefitsSection benefits_section={benefits_section} />
      <FaqSection faq_section={faq_section} />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
