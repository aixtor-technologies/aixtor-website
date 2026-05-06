"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type TechnologyItem = {
  image: string;
};

type TechnologiesWeUse = {
  title: string;
  description: string;
  technologies: TechnologyItem[];
};

type TechnologiesProps = {
  technologies_we_use: TechnologiesWeUse;
};

// ─── TechCard ─────────────────────────────────────────────────────────────────

const TechCard = ({ image }: TechnologyItem) => (
  <div className="flex items-center justify-center py-6 px-4">
    <Image
      src={image}
      alt=""
      width={160}
      height={60}
      className="object-contain max-h-14 w-auto"
    />
  </div>
);

// ─── Technologies ─────────────────────────────────────────────────────────────

const Technologies = ({ technologies_we_use }: TechnologiesProps) => {
  const { title, description, technologies } = technologies_we_use;

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {title}
          </Typography>
          <Typography variant="p" size="h6" className="text-dark-400 mt-4 max-w-2xl">
            {description}
          </Typography>
        </div>

        <Grid size="zero">
          {technologies.map((tech, i) => (
            <Grid.Col key={i} className="w-1/2 sm:w-1/3 md:w-1/4">
              <TechCard {...tech} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Technologies;
