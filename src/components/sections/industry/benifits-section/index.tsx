import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

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
        <Typography
          variant="h2"
          size="h3"
          className="text-dark common-heading"
          isCenter
          isTitle
        >
          {heading}
        </Typography>

        <Grid size="lg" className="gap-y-8 lg:gap-y-10">
          {maximize_list.map((item, index) => (
            <Grid.Col key={index} className="w-full lg:w-1/2">
              <div className="flex items-start gap-4 md:gap-5">
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || item.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Typography variant="h3" size="h6" className="text-dark font-semibold">
                    {item.title}
                  </Typography>
                  <Typography size="p" className="text-dark-400 leading-relaxed">
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
