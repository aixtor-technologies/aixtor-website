import MeetFounders from "@/components/sections/about-us/meet-founders";
import OurValues from "@/components/sections/about-us/our-values";
import Technologies from "@/components/sections/about-us/technologies";
import VisionMission from "@/components/sections/about-us/vision-mision";
import BannerDetails from "@/components/shared/banner-details";
import HttpService from "@/shared/services/http.service";

// ─── Types ────────────────────────────────────────────────────────────────────

type ValueItem = {
  icon: string;
  title: string;
  description: string;
};

type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
};

type VisionSection = {
  title: string;
  description: string;
  image: string;
};

type MissionSection = {
  title: string;
  description: string;
  image: string;
};

type TechnologyItem = {
  image: string;
};

type TechnologiesSection = {
  title: string;
  description: string;
  technologies: TechnologyItem[];
};

type BannerSectionData = {
  title: string;
  description: string;
  side_image: string;
};

type AboutPageData = {
  banner_section: BannerSectionData;
  vision_section: VisionSection;
  mission_section: MissionSection;
  technologies_we_use: TechnologiesSection;
  values: ValueItem[];
  founders: Founder[] | null;
};

// ─── Fetch function ───────────────────────────────────────────────────────────

async function fetchAboutUsPage(): Promise<AboutPageData | null> {
  try {
    const response = await HttpService.nativeFetch<any>("page/about-us", {
      method: "GET",
    });

    return response?.data?.about_page || null;
  } catch (error) {
    console.error("Failed to fetch about us page:", error);
    return null;
  }
}

export default async function AboutUsPage() {
  const data = await fetchAboutUsPage();

  if (!data) {
    return <div>Failed to load page</div>;
  }

  const {
    banner_section,
    vision_section,
    mission_section,
    technologies_we_use,
    values,
    founders,
  } = data;

  return (
    <>
      <BannerDetails
        banner_section={{
          title: banner_section.title,
          description: banner_section.description,
          side_image: banner_section.side_image,
        }}
      />
      <OurValues values={values} />
      <VisionMission
        vision_section={vision_section}
        mission_section={mission_section}
      />
      <Technologies
        title={technologies_we_use.title}
        description={technologies_we_use.description}
        technologies={technologies_we_use.technologies.map(tech => ({
          name: tech.image.split("/").pop()?.split(".")[0] || "Technology",
          logo: tech.image,
        }))}
      />
      <MeetFounders founders={founders || []} />
    </>
  );
}
