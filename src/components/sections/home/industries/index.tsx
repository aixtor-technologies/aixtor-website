import Link from "next/link";
import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

type IndustryItem = {
  industry_icon: string;
  industry_title: string;
  industry_slug: string | null;
};

type IndustriesSection = {
  heading_title?: string;
  description?: string;
  industries_item?: IndustryItem[];
};

type Props = {
  industries_section?: IndustriesSection;
};

const Industries = ({ industries_section }: Props) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-10/12">
            <div className="common-heading text-center">
              <Typography variant="h2" size="h3" isTitle isCenter>
                {industries_section?.heading_title}
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                {industries_section?.description}
              </Typography>
            </div>
          </Grid.Col>
        </Grid>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 xl:gap-10">
          {industries_section?.industries_item?.map(industry => (
            <Link
              href={industry.industry_slug ? `/industries/${industry.industry_slug}` : "#"}
              key={industry.industry_title}
              className="flex items-center gap-x-4 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 border border-dark-300 rounded-full hover:shadow-card"
            >
              <Image
                src={industry.industry_icon || "/images/placeholder/placeholder.jpg"}
                alt={industry.industry_title || "industry-icon"}
                width={32}
                height={32}
              />
              <Typography variant="span" size="h6" className="font-medium">
                {industry.industry_title}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
