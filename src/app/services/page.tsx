import Banner from "@/components/shared/banner";
import ListSection from "@/components/shared/list-section";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";

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
        title="Unlock Your Digital Potential with Aixtor's Comprehensive Services"
        description="Transform your operations, enhance customer experiences, and drive growth with our tailored services."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <ListSection
        title="Your Partner in Digital Transformation"
        description="Whether you are looking to optimize operations, enhance customer experiences, or open new revenue streams, Aixtor has got you covered! With our team of certified experts, we offer several end-to-end services like web portal development, Liferay consulting, AI and IoT integrations, Liferay migration and upgradation, and DevOps automation tailored to meet your unique business needs."
        items={services.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
