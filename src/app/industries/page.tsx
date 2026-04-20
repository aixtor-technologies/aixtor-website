import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import ListSection from "@/components/shared/list-section";
import StartConversation from "@/components/shared/start-conversation";

import HttpService from "@/shared/services/http.service";

async function fetchIndustries(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "services?page=1&per_page=20",
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
        title="Industries We Empower Through Digital Transformation"
        description="Business goals evolve. So should technology behind them. We help industries stay relevant with digital strategies that deliver measurable change."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <ListSection
        title="Crafting Industry-Specific Solutions That Deliver Impact"
        description="At Aixtor, we understand that every industry faces unique challenges, be it complex compliance in insurance, monitoring the telecom networks in telecom, workflow inefficiencies in manufacturing, or evolving regulatory frameworks in NBFCs. That’s why we build purpose-driven digital solutions tailored to industry-specific needs. From automating policy and claims management, optimizing production pipelines, to enabling self-service telecom portals with real-time support and digitizing loan origination and streamlining KYC for NBFCs our platforms deliver measurable business outcomes. With deep domain expertise and agile technology, we help enterprises boost operational efficiency, enhance user experiences, and stay future-ready."
        items={industries.data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
