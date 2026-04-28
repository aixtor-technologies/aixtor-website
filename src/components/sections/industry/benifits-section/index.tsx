import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ── Types ──────────────────────────────────────────────────────────────────
type BenefitIcon = {
  url: string;
  alt?: string;
};

type BenefitItem = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

type MaximizingSection = {
  heading: string;
  maximize_list: BenefitItem[];
};

interface BenefitsSectionProps {
  data: MaximizingSection;
}

export default function BenifitsSection({ data }: BenefitsSectionProps) {
  const { heading, maximize_list } = data;

  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* Heading */}
        <Typography
          variant="h2"
          size="h3"
          className="text-dark mb-14"
          isCenter
          isTitle
        >
          {heading}
        </Typography>

        {/* Benefits grid — 2 columns on lg+ */}
        <Grid size="lg">
          {maximize_list.map((item, index) => (
            <Grid.Col key={index} className="w-full lg:w-1/2 mb-10">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="shrink-0 w-14 h-14 flex items-center justify-center">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || item.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Typography
                    variant="h3"
                    size="h6"
                    className="text-dark font-semibold"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    size="p"
                    className="text-dark-400 leading-relaxed"
                  >
                    {item.description.trim()}
                  </Typography>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
}
