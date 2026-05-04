"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type VisionSection = {
  title: string;
  description: string;
  image: string;
};

type MissionSection = {
  title: string;
  description: string;
  image: string;
};

type VisionMissionProps = {
  vision_section: VisionSection;
  mission_section: MissionSection;
};

// ─── VisionMission ────────────────────────────────────────────────────────────

const VisionMission = ({
  vision_section,
  mission_section,
}: VisionMissionProps) => {
  return (
    <section className="common-section">
      <div className="container">
        {/* ── Row 1: Image left · Vision text right ── */}
        <Grid size="lg" className="items-center mb-10 lg:mb-16">
          {/* Image */}
          <Grid.Col className="md:w-5/12 mb-6 md:mb-0">
            <div className=" overflow-hidden w-full shadow-card-xl ">
              <Image
                src={vision_section.image}
                alt={vision_section.title}
                width={540}
                height={380}
                className="w-full h-auto object-cover"
              />
            </div>
          </Grid.Col>

          {/* Text */}
          <Grid.Col className="md:w-7/12">
            <div className="pl-0 md:pl-6 lg:pl-10">
              <Typography variant="h2" size="h3" isTitle className="mb-4">
                {vision_section.title}
              </Typography>
              <Typography
                variant="p"
                size="h6"
                className="text-dark-400 text-justify leading-relaxed mt-4"
              >
                {vision_section.description}
              </Typography>
            </div>
          </Grid.Col>
        </Grid>

        {/* ── Row 2: Mission text left · Image right ── */}
        <Grid size="lg" className="items-center">
          {/* Text */}
          <Grid.Col className="md:w-7/12 mb-6 md:mb-0 order-2 md:order-1">
            <div className="pr-0 md:pr-6 lg:pr-10">
              <Typography variant="h2" size="h3" isTitle className="mb-4">
                {mission_section.title}
              </Typography>
              <Typography
                variant="p"
                size="h6"
                className="text-dark-400 text-justify leading-relaxed mt-4"
              >
                {mission_section.description}
              </Typography>
            </div>
          </Grid.Col>

          {/* Image */}
          <Grid.Col className="md:w-5/12 order-1 md:order-2">
            <div className=" overflow-hidden w-full shadow-card-xl">
              <Image
                src={mission_section.image}
                alt={mission_section.title}
                width={540}
                height={380}
                className="w-full h-auto object-cover"
              />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default VisionMission;
