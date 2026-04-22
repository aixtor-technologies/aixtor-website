import ServiceBanner from "@/components/sections/service/banner";
import ContinueSection from "@/components/sections/service/continue";
import EmpowerSection from "@/components/sections/service/empower-section";
import FaqSection from "@/components/sections/service/faq";
import MigrateToLiferaySection from "@/components/sections/service/migrate-to-liferay";
import WhyChooseAixtor from "@/components/sections/service/why-choose-aixtor";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";

import HttpService from "@/shared/services/http.service";

async function fetchService(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `services/${slug}`,
      {
        method: "GET",
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch service content:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await fetchService(slug);

  if (!service?.acf_fields) return null;

  const {
    service_type,
    banner_section,
    empower_section,
    migrate_to_liferay_section,
    continue_section,
    why_choose_aixtor_section,
    faq_section,
  } = service.acf_fields;

  return (
    <>
      <ServiceBanner
        service_type={service_type}
        banner_section={banner_section}
      />
      <EmpowerSection empower_section={empower_section} />
      <MigrateToLiferaySection
        migrate_to_liferay_section={migrate_to_liferay_section}
      />
      <ContinueSection continue_section={continue_section} />
      <WhyChooseAixtor why_choose_aixtor_section={why_choose_aixtor_section} />
      <FaqSection faq_section={faq_section} />
      <CaseStudies />
      <StartConversation />
      {/* other sections... */}
    </>
  );
}
