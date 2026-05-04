import Banner from "@/components/sections/home/banner";
import CTASection from "@/components/shared/cta-section";
import Benefits from "@/components/sections/home/benefits";
import CaseStudies from "@/components/shared/case-studies";
import Services from "@/components/sections/home/services";
import Solutions from "@/components/sections/home/solutions";
import WhyChoose from "@/components/sections/home/why-choose";
import Industries from "@/components/sections/home/industries";
import StartConversation from "@/components/shared/start-conversation";
import HttpService from "@/shared/services/http.service";

async function fetchHomePage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<any>("page/home", { method: "GET" });
    return res?.data ?? {};
  } catch (error) {
    console.error("Failed to fetch home page:", error);
    return {};
  }
}

export default async function Home() {
  const data = await fetchHomePage();

  return (
    <>
      <Banner banner_section={data.banner_section} />
      <Services services_section={data.services_section} />
      <Solutions solutions_section={data.solutions_section} />
      <div className="large-section">
        <CTASection cta_banner_section={data.cta_banner_section} />
      </div>
      <WhyChoose />
      <Benefits key_benefits_section={data.key_benefits_section} />
      <Industries industries_section={data.industries_section} />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
