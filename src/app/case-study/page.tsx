import BlogSlider from "@/components/sections/resources/blogs-slider";
import SuccessStories from "@/components/sections/resources/success-stories";
import Banner from "@/components/shared/banner";
import StartConversation from "@/components/shared/start-conversation";
import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

async function getCaseStudiesData() {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "case-studies?page=1&per_page=20",
      {
        method: "GET",
      }
    );
    return res?.data || [];
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

export default async function ResourcesPage() {
  const caseStudies = await getCaseStudiesData();

  return (
    <>
      <Banner
        title={"Case Studies"}
        imgUrl={"/images/dummy/service_banner.png.webp"}
        description={
          "Read through our case studies to know how our solutions and services are driving growth in businesses like yours!"
        }
      />
      <SuccessStories caseStudies={caseStudies} />
      <BlogSlider />
      <StartConversation />
    </>
  );
}
