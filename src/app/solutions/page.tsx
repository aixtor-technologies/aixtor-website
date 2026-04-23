import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";
import ListSection from "@/components/shared/list-section";

import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchSolutions(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "solutions?page=1&per_page=20",
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Solutions content:", error);
    return null; // Return fallback so UI can handle it
  }
}

export default async function SolutionsPage() {
  const solutions = await fetchSolutions();
  return (
    <>
      <Banner
        title={solutions?.page_header?.banner_section?.title}
        description={solutions?.page_header?.banner_section?.description}
        imgUrl={solutions?.page_header?.banner_section?.side_image}
      />
      <ListSection
        title={solutions?.page_header?.list_section?.title}
        description={solutions?.page_header?.list_section?.description}
        items={solutions?.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
