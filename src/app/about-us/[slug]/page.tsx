import GrowWithUs from "@/components/sections/careers/grow-with-us";
import LifeAtAixtor from "@/components/sections/careers/life-at-aixtor";
import TeamTestimonials from "@/components/sections/careers/team-testimonials";
import WeTrulyBelieve from "@/components/sections/careers/truly-believe";
import ReasonsSection from "@/components/sections/solution/reason-section";
import BannerDetails from "@/components/shared/banner-details";
import StartConversation from "@/components/shared/start-conversation";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchAboutUsDetail(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `about-us/${slug}`,
      { method: "GET" }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch about-us detail:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AboutUsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchAboutUsDetail(slug);

  if (!data?.acf_fields) return null;

  const {
    banner_section,
    reasons_section,
    we_truly_believe_section,
    life_at_aixtor_section,
    grow_with_us_section,
    team_testimonials_section,
  } = data.acf_fields;

  return (
    <>
      <BannerDetails banner_section={banner_section} />
      <ReasonsSection reasons_section={reasons_section} />
      <WeTrulyBelieve
        title={we_truly_believe_section?.title}
        items={we_truly_believe_section?.items}
      />
      <LifeAtAixtor
        title={life_at_aixtor_section?.title}
        description={life_at_aixtor_section?.description}
        images={life_at_aixtor_section?.images}
      />
      <GrowWithUs
        title={grow_with_us_section?.title}
        description={grow_with_us_section?.description}
        jobs={grow_with_us_section?.jobs}
      />
      <TeamTestimonials
        title={team_testimonials_section?.title}
        testimonials={team_testimonials_section?.testimonials}
      />
      <StartConversation />
    </>
  );
}
