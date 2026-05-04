import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/sections/case-studies/case-stdudies-details";
import CaseStudyBanner from "@/components/sections/case-studies/case-studies-banner";
import CaseStudyAbout from "@/components/sections/case-studies/case-study-about";
import CaseStudyDownload from "@/components/sections/case-studies/case-study-download";
import CaseStudies from "@/components/shared/case-studies";
import HttpService from "@/shared/services/http.service";

// ─── Types ───────────────────────────────────────────────────────────────────

type Counter = { name: string; number: string };
type BulletItem = { title: string; description: string };

type CaseStudyData = {
  id: number;
  title: string;
  slug: string;
  acf_fields: {
    banner_section: { title: string; description: string; side_image: string };
    about_section: { title: string; description: string; image: string };
    counter_fields?: { counter: Counter[] };
    case_study_file: string;
    detail_sections: {
      id: string;
      label: string;
      heading: string;
      items: BulletItem[];
    }[];
  };
};

// ─── Helper Functions ────────────────────────────────────────────────────────

function parseHtmlString(htmlString: string): BulletItem[] {
  // Parse HTML string containing list items with details
  // Expected format: <ul><li><div class="details"><h5>Title</h5><p>Description</p></div></li>...

  const bulletItems: BulletItem[] = [];

  if (!htmlString) return bulletItems;

  // Use regex to extract h5 and p tags content
  const liRegex =
    /<li>[\s\S]*?<h5[^>]*>(.*?)<\/h5>[\s\S]*?<p[^>]*>(.*?)<\/p>[\s\S]*?<\/li>/g;

  let match;
  while ((match = liRegex.exec(htmlString)) !== null) {
    // Remove any HTML tags from the captured content
    const title = match[1].replace(/<[^>]*>/g, "").trim();
    const description = match[2].replace(/<[^>]*>/g, "").trim();

    if (title && description) {
      bulletItems.push({ title, description });
    }
  }

  return bulletItems;
}

function transformApiResponse(apiData: any): CaseStudyData | null {
  if (!apiData || !apiData.acf_fields) {
    return null;
  }

  const acf = apiData.acf_fields;

  // Parse business_needs and solution sections from HTML
  const challengesItems = parseHtmlString(
    acf.business_needs?.description || ""
  );
  const solutionItems = parseHtmlString(acf.solution?.description || "");
  const technologiesItems = parseHtmlString(
    acf.technologies?.description || ""
  );

  return {
    id: apiData.id,
    title: apiData.title,
    slug: apiData.slug,
    acf_fields: {
      banner_section: {
        title: acf.banner_section?.title || "",
        description: acf.banner_section?.description || "",
        side_image: acf.banner_section?.side_image || "",
      },
      about_section: {
        title: acf.about_section?.title || "About project",
        description: acf.about_section?.description || "",
        image: acf.about_section?.image || "",
      },
      counter_fields: acf.counter_fields || undefined,
      case_study_file: acf.case_study_file || "",
      detail_sections: [
        {
          id: "challenges",
          label: acf.business_needs?.title || "The Challenges",
          heading: acf.business_needs?.title || "The Challenges",
          items: challengesItems,
        },
        {
          id: "solution",
          label: acf.solution?.title || "The Solution",
          heading: acf.solution?.title || "The Solution",
          items: solutionItems,
        },
        {
          id: "technology-stack",
          label: acf.technologies?.title || "Technology Stack",
          heading: acf.technologies?.title || "Technology Stack",
          items: technologiesItems,
        },
      ],
    },
  };
}

async function fetchCaseStudyDetails(slug: string): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<any>(`case-studies/${slug}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error(`Failed to fetch case study details for ${slug}:`, error);
    return null;
  }
}

async function fetchAllCaseStudies(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<any>(
      "case-studies?page=1&per_page=20",
      {
        method: "GET",
      }
    );
    return res?.data || [];
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  // Parallelize API calls for better performance
  const [apiData, allCaseStudies] = await Promise.all([
    fetchCaseStudyDetails(slug),
    fetchAllCaseStudies(),
  ]);

  const caseStudyData = transformApiResponse(apiData);

  if (!caseStudyData) notFound();

  // Filter out current case study and transform for the slider component
  const relatedCaseStudies = allCaseStudies
    .filter((study: any) => study.slug !== slug)
    .slice(0, 10)
    .map((study: any) => ({
      id: study.id,
      slug: study.slug,
      details: {
        title: study.title,
        description: study.description,
        image: study.image,
      },
    }));

  const caseStudiesSliderData = {
    heading_title: "More Case Studies",
    description: "Explore our other successful client projects",
    cta_button: "View All Case Studies",
    case_study_item: relatedCaseStudies,
  };

  return (
    <>
      <CaseStudyBanner data={caseStudyData} />
      <CaseStudyAbout data={caseStudyData} />
      <CaseStudyDetail data={caseStudyData} />
      <CaseStudyDownload data={caseStudyData} />
      <CaseStudies/>
    </>
  );
}
