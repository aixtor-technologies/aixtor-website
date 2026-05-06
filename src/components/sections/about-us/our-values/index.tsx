"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type OurValueItem = {
  image: string;
  title: string; // API key (typo in source)
  description: string;
};

type OurValuesSection = {
  title: string;
  our_values_items: OurValueItem[];
};

type OurValuesProps = {
  our_values_section: OurValuesSection;
};

// ─── ValueCard ────────────────────────────────────────────────────────────────

const ValueCard = ({ image, title, description }: OurValueItem) => (
  <div className="h-full border border-gray-200 shadow-card-lg p-6 flex flex-col gap-6">
    <div className="w-16 h-16 flex items-start justify-start">
      <Image
        src={image}
        alt={title}
        width={64}
        height={64}
        className="object-contain"
      />
    </div>
    <div className="flex flex-col gap-2">
      <Typography variant="h4" size="h5" className="font-semibold text-dark-400">
        {title}
      </Typography>
      <Typography variant="p" size="p" className="text-dark-400 text-justify leading-relaxed">
        {description}
      </Typography>
    </div>
  </div>
);

// ─── OurValues ────────────────────────────────────────────────────────────────

const OurValues = ({ our_values_section }: OurValuesProps) => {
  const { title, our_values_items } = our_values_section;

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="mb-10 flex flex-col items-center">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {title}
          </Typography>
        </div>

        <Grid size="lg">
          {our_values_items.map((item, i) => (
            <Grid.Col key={i} className="md:w-6/12 lg:w-3/12 mb-6 lg:mb-0">
              <ValueCard {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default OurValues;
