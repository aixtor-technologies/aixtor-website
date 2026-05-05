import type { Metadata } from "next";

import FaqSection from "@/components/shared/faq";
import HireExperts from "@/components/sections/hire-us/hire-experts";
import ServicesWeOffer from "@/components/sections/hire-us/services-we-offer";

import { mapSeoToMetadata } from "@/lib/seo";
import HttpService from "@/shared/services/http.service";
import WhyHire from "@/components/sections/hire-us/why-hire";
import BannerDetails from "@/components/shared/banner-details";

async function fetchHomePage(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<any>("page/home", {
      method: "GET",
    });
    return res?.data ?? {};
  } catch (error) {
    console.error("Failed to fetch home page:", error);
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomePage();
  return mapSeoToMetadata(data.seo);
}

export default async function HireUsPage() {
  const data = await fetchHomePage();

  return (
    <>
      <BannerDetails
        banner_section={{
          title:
            "Hire Liferay Developers Who Bring Experience to Every Project ",
          description_list: [
            { description: "Certified Liferay Developers" },
            { description: "Enhanced communication and collaboration" },
          ],
          side_image: "/images/dummy/services_banner.webp",
        }}
      />
      <HireExperts
        title="Hire Our Experts: We Know Liferay Inside and Out"
        description="Being Liferay solution partners, we take pride in our Liferay developers unparalleled expertise. We have a team of certified developers who are skilled, experienced, and passionate about delivering tailored solutions to meet your needs. Hire our Liferay consultants who are up to date with Liferay's latest version and work on each project following the Liferay best practices, ensuring that no details are missed."
        imgUrl="/images/dummy/blog1.webp"
      />
      <ServicesWeOffer
        title="Liferay Development Services We Offer"
        description="We offer end-to-end Liferay development - from custom modules to integrations, built to fit your business needs and scale with ease. "
      />
      <WhyHire title="Why Hire Liferay Developers from Aixtor?" />
      <FaqSection />
    </>
  );
}
