import BlogSlider from "@/components/shared/blogs-slider";
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
    return res;
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return null;
  }
}

async function fetchBlogs(): Promise<any[]> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "blogs?page=1&per_page=6",
      { method: "GET" }
    );
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export default async function CaseStudyPage() {
  const [data, blogs] = await Promise.all([
    fetchCaseStudiesPage(),
    fetchBlogs(),
  ]);

  return (
    <>
      <Banner
        title={data?.page_header?.banner_section?.title}
        imgUrl={data?.page_header?.banner_section?.side_image}
        description={data?.page_header?.banner_section?.description}
      />
      <SuccessStories
        caseStudies={data?.data}
        list_section={
          Array.isArray(data?.page_header?.list_section)
            ? data?.page_header?.list_section
            : []
        }
      />
      <BlogSlider blogs={blogs} />
      <StartConversation />
    </>
  );
}
