import BlogSlider from "@/components/sections/resources/blogs-slider";
import SuccessStories from "@/components/sections/resources/success-stories";
import Banner from "@/components/shared/banner";
import StartConversation from "@/components/shared/start-conversation";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchCaseStudiesPage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "case-studies?page=1&per_page=20",
      { method: "GET" }
    );
    return res || null;
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return null;
  }
}

export default async function CaseStudyPage() {
  const res = await fetchCaseStudiesPage();

  if (!res) return null;

  const { data: caseStudies, page_header } = res;
  const { banner_section, list_section } = page_header;

  return (
    <>
      <Banner title={banner_section.title} imgUrl={banner_section.side_image} description={banner_section.description} />
      <SuccessStories caseStudies={caseStudies} list_section={list_section} />
      <BlogSlider />
      <StartConversation />
    </>
  );
}
