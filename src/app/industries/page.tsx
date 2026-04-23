import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import ListSection from "@/components/shared/list-section";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

async function fetchIndustries(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "industry?page=1&per_page=20",
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Industries content:", error);
    return null; // Return fallback so UI can handle it
  }
}

export default async function IndustriesPage() {
  const industries = await fetchIndustries();
  return (
    <>
      <Banner
        title={industries?.page_header?.banner_section?.title}
        description={industries?.page_header?.banner_section?.description}
        imgUrl={industries?.page_header?.banner_section?.side_image}
      />
      <ListSection
        title={industries?.page_header?.list_section?.title}
        description={industries?.page_header?.list_section?.description}
        items={industries.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
