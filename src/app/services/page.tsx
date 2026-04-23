import Banner from "@/components/shared/banner";
import ListSection from "@/components/shared/list-section";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";

import { TApiResponse } from "@/shared/types";
import HttpService from "@/shared/services/http.service";

async function fetchServices(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "services?page=1&per_page=20",
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Menu content:", error);
    return null; // Return fallback so UI can handle it
  }
}

export default async function ServicePage() {
  const services = await fetchServices();
  return (
    <>
      <Banner
        title={services?.page_header?.banner_section?.title}
        description={services?.page_header?.banner_section?.description}
        imgUrl={services?.page_header?.banner_section?.side_image}
      />
      <ListSection
        title={services?.page_header?.list_section?.title}
        description={services?.page_header?.list_section?.description}
        items={services?.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
