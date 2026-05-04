import { memo } from "react";
import Image from "next/image";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import CustomSlider from "@/components/ui/custom-slider";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type CaseStudyItem = {
  id: number;
  slug: string;
  details: {
    title: string;
    description: string;
    image: string;
  };
};

type CaseStudySection = {
  heading_title?: string;
  description?: string;
  cta_button?: string;
  case_study_item?: CaseStudyItem[];
};

type Props = {
  case_study_section?: CaseStudySection;
};

async function fetchCaseStudies(): Promise<CaseStudySection> {
  try {
    const response = await HttpService.nativeFetch<TApiResponse<any>>("common-options/case_study", {
      method: "GET",
    });

    const caseStudyData = response?.data?.case_study;

    if (!caseStudyData) {
      return {};
    }

    // Map API response to component prop structure
    return {
      heading_title: caseStudyData.heading,
      description: caseStudyData.description,
      cta_button: caseStudyData.cta_button,
      case_study_item: caseStudyData.items || [],
    };
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return {};
  }
}

const CaseStudyCard = memo(({ item }: { item: CaseStudyItem }) => (
  <div className="p-2.5 bg-white w-80 md:w-96 lg:w-120 xl:w-140 rounded-xs transition-all duration-300 hover:shadow-card">
    <Image
      src={item.details.image}
      alt={item.details.title}
      width={600}
      height={400}
      className="w-full h-auto mb-3 md:mb-4 lg:mb-5"
      loading="lazy"
    />
    <div className="px-3 md:px-4">
      <Typography variant="h3" size="h5" className="mb-2 font-semibold">
        {item.details.title}
      </Typography>
      <Typography variant="p" size="p" className="mb-2.5">
        {item.details.description}
      </Typography>
    </div>
  </div>
));

CaseStudyCard.displayName = "CaseStudyCard";

const CaseStudies = async ({ case_study_section }: Props) => {
  // Fetch data from API if not provided via props
  const data = case_study_section || (await fetchCaseStudies());
  return (
    <section className="common-section">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>
                {data?.heading_title}
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                {data?.description}
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="/case-study">
                {data?.cta_button}
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </div>
      <CustomSlider arrow itemClassName="px-2 lg:px-3 py-10" className="-my-10">
        {data?.case_study_item?.map(item => (
          <CaseStudyCard key={item.slug} item={item} />
        ))}
      </CustomSlider>
    </section>
  );
};

export default CaseStudies;
