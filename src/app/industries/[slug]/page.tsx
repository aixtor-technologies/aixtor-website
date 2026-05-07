import BenifitsSection from "@/components/sections/industry/benifits-section";
import TelecomChallenges from "@/components/sections/industry/challenges";
import BlogSlider from "@/components/shared/blogs-slider";
import MigrateToLiferaySection from "@/components/sections/service/migrate-to-liferay";

import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

async function fetchIndustries(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      `industry/${slug}`,
      { method: "GET" }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch Industries content:", error);
    return null;
  }
}

async function fetchBlogs(): Promise<any[]> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "blogs?page=1&per_page=6",
      { method: "GET" }
    );
    return res?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [industry, blogs] = await Promise.all([
    fetchIndustries(slug),
    fetchBlogs(),
  ]);

  if (!industry?.acf_fields) return null;

  const {
    banner_section,
    challenges_section,
    aixtor_help,
    maximizing_manufacturing,
  } = industry.acf_fields;

  const imageSrc =
    typeof banner_section?.side_image === "string"
      ? banner_section.side_image
      : banner_section?.side_image?.url || "";

  const description = banner_section?.description || "";

  const migrateData = aixtor_help
    ? {
        heading: aixtor_help.heading || "",
        cta_title: "",
        migrate_to_liferay:
          aixtor_help.help?.map((item: any) => ({
            title: item?.title || "",
            description: item?.description || "",
            image:
              typeof item?.side_image === "string"
                ? item.side_image
                : item?.side_image?.url || "",
            read_more_link: item?.read_more?.url || "#",
          })) || [],
      }
    : undefined;

  return (
    <>
      <Banner
        title={banner_section?.title || industry.title}
        description={description}
        imgUrl={imageSrc}
      />

      {challenges_section && <TelecomChallenges data={challenges_section} />}

      {migrateData && migrateData.migrate_to_liferay.length > 0 && (
        <MigrateToLiferaySection migrate_to_liferay_section={migrateData} />
      )}

      {maximizing_manufacturing && (
        <BenifitsSection data={maximizing_manufacturing} />
      )}
      <CaseStudies />
      <BlogSlider blogs={blogs} />
      <StartConversation />
    </>
  );
}
