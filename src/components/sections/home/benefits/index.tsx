import Image from "next/image";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type BenefitItem = {
  title: string;
  description: string;
  icon?: string;
};

type KeyBenefitsSection = {
  heading_title?: string | null;
  description?: string | null;
  benefits_item?: BenefitItem[] | null;
  cta_button?: string | null;
};

type Props = {
  key_benefits_section?: KeyBenefitsSection;
};

const Benefits = ({ key_benefits_section }: Props) => {
  const items = key_benefits_section?.benefits_item ?? [];

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="md:w-10/12 lg:w-9/12 mx-auto text-center mb-6 md:mb-8 lg:mb-10">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            {key_benefits_section?.heading_title}
          </Typography>
          <Typography size="h6">
            {key_benefits_section?.description}
          </Typography>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 lg-gap-12 xl:gap-15 relative">
          <Image
            src="/images/logo-wave.svg"
            alt="Benefits Left"
            width={812}
            height={672}
            className="absolute left-0 hidden md:block object-contain w-full h-full "
            style={{ aspectRatio: "812/672" }}
          />
          {[0, 2, 4].map(start => (
            <Grid
              className={`relative z-2 gap-y-4 ${start === 2 ? "justify-between" : "justify-evenly"}`}
              key={start}
            >
              {items.slice(start, start + 2).map(item => (
                <Grid.Col key={item.title} className="md:w-4/12">
                  <div className="gradient-card body-border py-3 lg:py-4 px-4 lg:px-6 border-2 rounded-xl">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="mb-4 size-15 p-2"
                      />
                    )}
                    <Typography size="h5" className="font-semibold mb-1">
                      {item.title}
                    </Typography>
                    <Typography>{item.description}</Typography>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          ))}
        </div>
        {key_benefits_section?.cta_button && (
          <div className="text-center mt-8">
            <Button href="/contact">{key_benefits_section.cta_button}</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Benefits;
