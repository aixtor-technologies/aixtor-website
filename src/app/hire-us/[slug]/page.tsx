import type { Metadata } from "next";

import FaqSection from "@/components/shared/faq";
import HireExperts from "@/components/sections/hire-us/hire-experts";
import ServicesWeOffer from "@/components/sections/hire-us/services-we-offer";
import WhyHire from "@/components/sections/hire-us/why-hire";
import BannerDetails from "@/components/shared/banner-details";
import EngagementModels from "@/components/sections/hire-us/engagement-models";
import TechnologiesTabs from "@/components/sections/hire-us/technologies";
import HiringProcess from "@/components/sections/hire-us/hiring-process";
import CTASection from "@/components/shared/cta-section";
import FeatureList from "@/components/sections/hire-us/feature-list";

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

// Extracts plain-text items from an HTML list string (<li> tags)
function parseHtmlList(html: string): string[] {
  return [...(html ?? "").matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .map(m => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchHireUsPage(slug);
  return mapSeoToMetadata(data?.seo);
}

export default async function HireUsPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchHireUsPage(slug);

  const acf = data?.acf_fields;

  // ── Section data ──────────────────────────────────────────────────────────

  const bannerSection    = acf?.banner_section;
  const hireExperts      = acf?.hire_our_experts_section;
  const servicesSection  = acf?.services_we_offer_section;
  const ctaSection       = acf?.contact_us_cta_section;
  const featureSection   = acf?.need_heading_section_slider;
  const whyHireSection   = acf?.why_hire_section;
  const engagementSection = acf?.engagement_models_section;
  const techSection      = acf?.technology_logos;
  const hiringSection    = acf?.hiring_process_section;
  const faqSection       = acf?.faq_section;

  // ── Transforms ────────────────────────────────────────────────────────────

  const engagementModels = (engagementSection?.engagement_models ?? []).map(
    (m: any) => ({
      title: m.title,
      icon: m.image ?? "/images/placeholder/placeholder.jpg",
      features: parseHtmlList(m.description ?? ""),
      cta_title: m.cta_title,
      cta_href: "/contact",
    })
  );

  const techTabs = (techSection?.technology_module ?? []).map((mod: any) => ({
    label: mod.section_sidebar_title,
    items: (mod.technologies_sections?.logos ?? []).flatMap((group: any) =>
      (group.icon ?? []).map((url: string, i: number) => ({
        name: `${group.title}-${i + 1}`,
        logo: url,
      }))
    ),
  }));

  const hiringSteps = (hiringSection?.hiring_process_models ?? []).map(
    (m: any, i: number) => ({
      step: i + 1,
      title: m.title,
      description: m.description,
      circle_image: m.image ?? "/images/placeholder/placeholder.jpg",
    })
  );

  const featureItems = (featureSection?.slider_section ?? []).map((s: any) => ({
    title: s.title,
    description: s.description,
    icon: s.side_image ?? "/images/placeholder/placeholder.jpg",
  }));

  return (
    <>
      <BannerDetails
        banner_section={{
          title: bannerSection?.title ?? "",
          side_image: bannerSection?.side_image ?? "",
          description_list: bannerSection?.description_list ?? [],
          cta_title: bannerSection?.cta_title ?? "",
        }}
      />

      <HireExperts
        title={hireExperts?.title ?? ""}
        description={hireExperts?.description ?? ""}
        imgUrl={hireExperts?.image_collection ?? ""}
      />

      <ServicesWeOffer
        title={servicesSection?.title ?? ""}
        description={servicesSection?.description ?? ""}
        items={servicesSection?.continue_list ?? []}
        cta_title={servicesSection?.cta_title}
      />

      <CTASection
        cta_banner_section={{
          heading_title: ctaSection?.title,
          cta_button: ctaSection?.cta_title,
        }}
      />

      <FeatureList
        title={featureSection?.heading ?? ""}
        description={featureSection?.heading_description ?? ""}
        cta_title={featureSection?.consult_today_cta_title}
        features={featureItems}
      />

      <WhyHire
        title={whyHireSection?.title ?? ""}
        items={whyHireSection?.continue_list ?? []}
        cta_title={whyHireSection?.cta_title}
      />

      <EngagementModels
        title={engagementSection?.engagement_models_heading}
        models={engagementModels}
      />

      <TechnologiesTabs
        title={techSection?.technology_title}
        tabs={techTabs}
      />

      <HiringProcess
        title={hiringSection?.hiring_process_heading}
        steps={hiringSteps}
        cta_title={hiringSection?.hiring_process_cta_title}
      />

      <FaqSection faq_section={faqSection} />
    </>
  );
}
