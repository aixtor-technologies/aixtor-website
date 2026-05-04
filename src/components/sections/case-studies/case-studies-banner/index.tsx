"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type BannerSection = {
  title: string;
  description: string;
  side_image: string;
};

type Counter = {
  name: string;
  number: string;
};

type AcfFields = {
  banner_section: BannerSection;
  case_study_file: string;
  counter_fields?: { counter: Counter[] };
};

type CaseStudyDetailData = {
  id: number;
  title: string;
  slug: string;
  acf_fields: AcfFields;
};

type CaseStudyBannerProps = {
  data: CaseStudyDetailData;
  tag?: string;
  cta_title?: string;
};

// ─── StatCard ─────────────────────────────────────────────────────────────────

const StatCard = ({ name, number }: Counter) => (
  <div className="bg-white px-5 py-5 h-full shadow-xl">
    <Typography variant="p" size="h3" className="font-bold text-info leading-none mb-2">
      {number}
    </Typography>
    <Typography variant="p" size="h6" className="text-dark">
      {name}
    </Typography>
  </div>
);

// ─── CaseStudyBanner ──────────────────────────────────────────────────────────

const CaseStudyBanner = ({
  data,
  tag = "Case Study",
  cta_title = "Download case study",
}: CaseStudyBannerProps) => {
  if (!data?.acf_fields?.banner_section) return null;

  const { acf_fields } = data;
  const { banner_section, case_study_file, counter_fields } = acf_fields;
  const { title, description, side_image } = banner_section;
  const counters = counter_fields?.counter ?? [];

  return (
    // Extra pb to make room for the overlapping stat cards
    <section className="large-section pt-20 lg:pt-24 pb-20 lg:pb-28 relative">
      <div className="container">
        {/* ── Hero row ── */}
        <Grid size="lg" className="items-center mb-0">
          {/* LEFT text */}
          <Grid.Col className="w-full md:w-7/12 flex flex-col gap-6 order-2 md:order-1 mt-10 md:mt-0">
            <span className="inline-flex items-center w-fit px-4 py-1.5 rounded-lg bg-info-200 text-info text-sm font-semibold">
              {tag}
            </span>

            <Typography variant="h1" size="h2" className="text-dark">
              {title}
            </Typography>

            <Typography variant="p" size="h6" className="text-dark-400">
              {description}
            </Typography>

            <div>
              {case_study_file ? (
                <a href={case_study_file} download className="inline-flex">
                  <Button>{cta_title}</Button>
                </a>
              ) : (
                <Button>{cta_title}</Button>
              )}
            </div>
          </Grid.Col>

          {/* RIGHT image */}
          <Grid.Col className="w-full md:w-5/12 order-1 md:order-2">
            <div className="w-full rounded-xl border-2 border-dark-300 p-3">
              <div className="w-full rounded-xl border-2 border-dark-300 p-3">
                <Image
                  src={side_image}
                  alt={title}
                  width={560}
                  height={420}
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="w-full h-auto object-contain rounded-lg shadow-card-xl"
                  priority
                />
              </div>
            </div>
          </Grid.Col>
        </Grid>

        {/* ── Stat cards — absolutely pulled down to overlap the next section ── */}
        {counters.length > 0 && (
          <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8">
            <div className="container">
              <Grid size="md">
                {counters.map(stat => (
                  <Grid.Col
                    key={stat.name}
                    className="w-1/2 md:w-1/4 mb-4 md:mb-0"
                  >
                    <StatCard {...stat} />
                  </Grid.Col>
                ))}
              </Grid>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudyBanner;
