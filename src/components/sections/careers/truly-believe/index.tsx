"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type BeliefItem = {
  title: string;
  image: string;
};

type WeTrulyBelieveProps = {
  title?: string;
  items?: BeliefItem[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_ITEMS: BeliefItem[] = [
  {
    title: "Result Oriented Objectives",
    image: "/images/beliefs/result-oriented.svg",
  },
  {
    title: "Collaborative Learning",
    image: "/images/beliefs/collaborative.svg",
  },
  {
    title: "High Ethical Standards",
    image: "/images/beliefs/ethical-standards.svg",
  },
  {
    title: "Equal Opportunity and Gender Diversity",
    image: "/images/beliefs/gender-diversity.svg",
  },
];

// ─── BeliefCard ───────────────────────────────────────────────────────────────

const BeliefCard = ({ title, image }: BeliefItem) => (
  <div className="h-full border border-gray-200 bg-white flex flex-col items-center shadow-card-xl justify-between px-6 pt-10 pb-8 gap-8">
    {/* Illustration */}
    <div className="w-full flex items-center justify-center h-48">
      <Image
        src={image}
        alt={title}
        width={220}
        height={180}
        className="object-contain w-full h-full"
      />
    </div>

    {/* Title */}
    <Typography
      variant="p"
      size="h6"
      className="text-dark-400 text-center leading-snug font-normal"
    >
      {title}
    </Typography>
  </div>
);

// ─── WeTrulyBelieve ───────────────────────────────────────────────────────────

const WeTrulyBelieve = ({
  title = "We Truly Believe in",
  items = DEFAULT_ITEMS,
}: WeTrulyBelieveProps) => (
  <section className="common-section bg-white">
    <div className="container">
      {/* Heading */}
      <div className="flex flex-col items-center mb-10 lg:mb-14">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
      </div>

      {/* Cards */}
      <Grid size="lg">
        {items.map(item => (
          <Grid.Col key={item.title} className="w-1/2 lg:w-3/12 mb-6 lg:mb-0">
            <BeliefCard {...item} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  </section>
);

export default WeTrulyBelieve;
