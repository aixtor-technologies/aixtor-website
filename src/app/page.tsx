import type { Metadata } from "next";

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
import { TApiResponse } from "@/shared/types";

import { mapSeoToMetadata } from "@/lib/seo";

async function fetchHomePage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>("page/home", {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch home page:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomePage();
  return mapSeoToMetadata(data?.data?.seo);
}

export default async function Home() {
  const data = await fetchHomePage();

  return (
    <>
      <Banner banner_section={data?.data?.banner_section} />
      <Services services_section={data?.data?.services_section} />
      <Solutions solutions_section={data?.data?.solutions_section} />
      <div className="large-section">
        <CTASection cta_banner_section={data?.data?.cta_banner_section} />
      </div>
      <WhyChoose />
      <Benefits key_benefits_section={data?.data?.key_benefits_section} />
      <Industries industries_section={data?.data?.industries_section} />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
