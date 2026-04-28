import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

type BenefitIcon = {
  url: string;
  alt?: string;
};

type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

type BenefitsSectionData = {
  benefits_heading: string;
  benefits: Benefit[];
};

type Props = {
  benefits_section: BenefitsSectionData;
};

const BenefitCard = ({ title, icon, description }: Benefit) => (
  <div className="border border-dark-300 rounded-xl p-9 flex flex-col gap-5 h-full shadow-card-lg">
    <div className="flex items-center gap-4">
      <div className="w-17 h-17 rounded-full flex items-center justify-center shrink-0 shadow-sm">
        <Image
          src={icon.url}
          alt={icon.alt || title}
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
      <Typography variant="h3" size="h5" className="text-dark font-semibold">
        {title}
      </Typography>
    </div>

    <Typography variant="p" size="p" className="text-dark-400 text-justify">
      {description}
    </Typography>
  </div>
);

const BenefitsSection = ({ benefits_section }: Props) => {
  const { benefits_heading, benefits } = benefits_section;

  if (!Array.isArray(benefits) || benefits.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 lg:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-14">
          <Typography
            variant="h2"
            size="h3"
            isTitle
            isCenter
            className="text-dark-500"
          >
            {benefits_heading}
          </Typography>
        </div>

        {/* Grid */}
        <Grid size="lg">
          {benefits.map((benefit, index) => (
            <Grid.Col key={index} className="w-full md:w-1/2 lg:w-1/3 mb-6">
              <BenefitCard {...benefit} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default BenefitsSection;
