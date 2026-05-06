"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type AboutSection = {
  title: string;
  description: string;
  image: string;
};

type CaseStudyAboutProps = {
  data: {
    acf_fields: {
      about_section: AboutSection;
    };
  };
};

// ─── CaseStudyAbout ───────────────────────────────────────────────────────────

const CaseStudyAbout = ({ data }: CaseStudyAboutProps) => {
  if (!data?.acf_fields?.about_section) return null;

  const { about_section } = data.acf_fields;
  const { title, description, image } = about_section;

  return (
    // pt accounts for the overlapping stat cards from the banner above
    <section className="large-section bg-white pt-28 lg:pt-32 pb-12 lg:pb-16">
      <div className="container">
        <Grid size="lg" className="items-center">
          {/* LEFT image — w-5/12 */}
          <Grid.Col className="w-full md:w-5/12 mb-6 md:mb-0">
            <div className="overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </Grid.Col>

          {/* RIGHT text — w-7/12 */}
          <Grid.Col className="w-full md:w-7/12">
            <Typography variant="h2" size="h3" isTitle className="mb-4">
              {title}
            </Typography>
            <Typography
              variant="p"
              size="p"
              className="text-dark-400 leading-relaxed text-justify mt-4"
            >
              {description}
            </Typography>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default CaseStudyAbout;
