import MeetFounders from "@/components/sections/about-us/meet-founders";
import OurValues from "@/components/sections/about-us/our-values";
import Technologies from "@/components/sections/about-us/technologies";
import VisionMission from "@/components/sections/about-us/vision-mision";
import BannerDetails from "@/components/shared/banner-details";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchAboutUsPage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>("page/about-us", {
      method: "GET",
    });
    return res?.data?.about_page || null;
  } catch (error) {
    console.error("Failed to fetch about us page:", error);
    return null;
  }
}

export default async function AboutUsPage() {
  const data = await fetchAboutUsPage();

  if (!data) return null;

  const {
    banner_section,
    our_values_section,
    vision_section,
    mission_section,
    technologies_we_use,
    founders,
  } = data;

  return (
    <>
      <BannerDetails banner_section={banner_section} />
      <OurValues our_values_section={our_values_section} />
      <VisionMission
        vision_section={vision_section}
        mission_section={mission_section}
      />
      <Technologies technologies_we_use={technologies_we_use} />
      <MeetFounders founders={founders ?? []} />
    </>
  );
}
