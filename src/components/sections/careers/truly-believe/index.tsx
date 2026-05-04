"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type BelieveItem = {
  image: string;
  name: string;
};

type TrulyBelieveSection = {
  heading: string;
  believe_list: BelieveItem[];
};

type WeTrulyBelieveProps = {
  truly_believe_section?: TrulyBelieveSection;
};

// ─── BeliefCard ───────────────────────────────────────────────────────────────

const BeliefCard = ({ name, image }: BelieveItem) => (
  <div className="h-full border border-gray-200 bg-white flex flex-col items-center shadow-card-xl justify-between px-6 pt-10 pb-8 gap-8">
    <div className="w-full flex items-center justify-center h-48">
      <Image
        src={image}
        alt={name}
        width={220}
        height={180}
        className="object-contain w-full h-full"
      />
    </div>
    <Typography
      variant="p"
      size="h6"
      className="text-dark-400 text-center leading-snug font-normal"
    >
      {name}
    </Typography>
  </div>
);

// ─── WeTrulyBelieve ───────────────────────────────────────────────────────────

const WeTrulyBelieve = ({ truly_believe_section }: WeTrulyBelieveProps) => {
  if (!truly_believe_section) return null;

  const { heading, believe_list } = truly_believe_section;

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="flex flex-col items-center mb-10 lg:mb-14">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {heading}
          </Typography>
        </div>

        <Grid size="lg">
          {believe_list.map(item => (
            <Grid.Col key={item.name} className="w-1/2 lg:w-3/12 mb-6 lg:mb-0">
              <BeliefCard {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default WeTrulyBelieve;
