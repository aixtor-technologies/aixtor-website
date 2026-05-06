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
    return res?.data?.career_page || null;
  } catch (error) {
    console.error("Failed to fetch careers page:", error);
    return null;
  }
}

export default async function CareersPage() {
  const data = await fetchCareersPage();

  if (!data) return null;

  const {
    banner_section,
    what_aixtor_has,
    truly_believe_section,
    life_aixtor,
    grow_section,
    team_comments,
  } = data;

  return (
    <>
      <BannerDetails banner_section={banner_section} />
      <ReasonsSection
        reasons_section={{
          title: what_aixtor_has?.heading,
          reasons_list: (what_aixtor_has?.aixtor_list ?? []).map((item: { aixtor_has: string }) => ({
            reason: item.aixtor_has,
          })),
        }}
      />
      <WeTrulyBelieve truly_believe_section={truly_believe_section} />
      <LifeAtAixtor life_aixtor={life_aixtor} />
      <GrowWithUs grow_section={grow_section} />
      <TeamTestimonials team_comments={team_comments} />
      <StartConversation />
    </>
  );
}
