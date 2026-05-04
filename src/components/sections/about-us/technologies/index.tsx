"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type Technology = {
  name: string;
  logo: string;
};

type TechnologiesProps = {
  title: string;
  description: string;
  technologies: Technology[];
};

// ─── TechCard ─────────────────────────────────────────────────────────────────

const TechCard = ({ name, logo }: Technology) => (
  <div className="flex items-center justify-center py-6 px-4">
    <Image
      src={logo}
      alt={name}
      width={160}
      height={60}
      className="object-contain max-h-14 w-auto"
    />
  </div>
);

// ─── Technologies ─────────────────────────────────────────────────────────────

const Technologies = ({
  title,
  description,
  technologies,
}: TechnologiesProps) => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* ── Heading ── */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {title}
          </Typography>
          <Typography
            variant="p"
            size="h6"
            className="text-dark-400 mt-4 max-w-2xl"
          >
            {description}
          </Typography>
        </div>

        {/* ── Logo grid ── */}
        <Grid size="zero">
          {technologies.map(tech => (
            <Grid.Col key={tech.name} className="w-1/2 sm:w-1/3 md:w-1/4">
              <TechCard {...tech} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Technologies;
