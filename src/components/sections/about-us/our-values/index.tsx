"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type ValueItem = {
  icon: string;
  title: string;
  description: string;
};

type OurValuesProps = {
  values: ValueItem[];
};

// ─── ValueCard ────────────────────────────────────────────────────────────────

const ValueCard = ({ icon, title, description }: ValueItem) => (
  <div className="h-full border border-gray-200 shadow-card-lg p-6 flex flex-col gap-6">
    <div className="w-16 h-16 flex items-start justify-start">
      <Image
        src={icon}
        alt={title}
        width={64}
        height={64}
        className="object-contain"
      />
    </div>
    <div className="flex flex-col gap-2">
      <Typography
        variant="h4"
        size="h5"
        className="font-semibold text-dark-400"
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        size="p"
        className="text-dark-400 text-justify leading-relaxed"
      >
        {description}
      </Typography>
    </div>
  </div>
);

// ─── OurValues ────────────────────────────────────────────────────────────────

const OurValues = ({ values }: OurValuesProps) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* Heading */}
        <div className="mb-10 flex flex-col items-center">
          <Typography variant="h2" size="h3" isTitle isCenter>
            Our Values
          </Typography>
        </div>

        {/* Cards */}
        <Grid size="lg">
          {values.map(item => (
            <Grid.Col
              key={item.title}
              className="md:w-6/12 lg:w-3/12 mb-6 lg:mb-0"
            >
              <ValueCard {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default OurValues;
