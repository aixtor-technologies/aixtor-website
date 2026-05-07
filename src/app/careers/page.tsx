import GrowWithUs from "@/components/sections/careers/grow-with-us";
import LifeAtAixtor from "@/components/sections/careers/life-at-aixtor";
import TeamTestimonials from "@/components/sections/careers/team-testimonials";
import WeTrulyBelieve from "@/components/sections/careers/truly-believe";
import ReasonsSection from "@/components/sections/solution/reason-section";
import BannerDetails from "@/components/shared/banner-details";
import StartConversation from "@/components/shared/start-conversation";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchCareersPage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>("page/careers", {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch careers page:", error);
    return null;
  }
}

export default async function CareersPage() {
  const data = await fetchCareersPage();
  const careerPage = data?.data?.career_page;

  return (
    <>
      <BannerDetails banner_section={careerPage?.banner_section} />
      <ReasonsSection
        reasons_section={{
          title: careerPage?.what_aixtor_has?.heading,
          reasons_list: (careerPage?.what_aixtor_has?.aixtor_list ?? []).map(
            (item: { aixtor_has: string }) => ({ reason: item.aixtor_has })
          ),
        }}
      />
      <WeTrulyBelieve truly_believe_section={careerPage?.truly_believe_section} />
      <LifeAtAixtor life_aixtor={careerPage?.life_aixtor} />
      <GrowWithUs grow_section={careerPage?.grow_section} />
      <TeamTestimonials team_comments={careerPage?.team_comments} />
      <StartConversation />
    </>
  );
}
