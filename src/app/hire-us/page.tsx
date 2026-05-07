import type { Metadata } from "next";

import FaqSection from "@/components/shared/faq";
import HireExperts from "@/components/sections/hire-us/hire-experts";
import ServicesWeOffer from "@/components/sections/hire-us/services-we-offer";
import WhyHire from "@/components/sections/hire-us/why-hire";
import BannerDetails from "@/components/shared/banner-details";

import { mapSeoToMetadata } from "@/lib/seo";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function fetchHireUsPage(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `hire-developers/${slug}`,
      { method: "GET" }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch hire us page:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchHireUsPage(slug);
  return mapSeoToMetadata(data?.data?.seo);
}

export default async function HireUsPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchHireUsPage(slug);

  const acf = data?.acf_fields;

  const bannerSection = acf?.banner_section;
  const hireExperts = acf?.hire_experts_section;
  const servicesSection = acf?.services_section;
  const whyHireSection = acf?.why_hire_section;

  return (
    <>
      <BannerDetails
        banner_section={{
          title: bannerSection?.title ?? "",
          description_list: bannerSection?.description_list ?? [],
          side_image: bannerSection?.side_image?.url ?? bannerSection?.side_image ?? "",
        }}
      />
      <HireExperts
        title={hireExperts?.title ?? ""}
        description={hireExperts?.description ?? ""}
        imgUrl={hireExperts?.image?.url ?? hireExperts?.image ?? ""}
      />
      <ServicesWeOffer
        title={servicesSection?.title ?? ""}
        description={servicesSection?.description ?? ""}
      />
      <WhyHire title={whyHireSection?.title ?? ""} />
      <FaqSection />
    </>
  );
}
