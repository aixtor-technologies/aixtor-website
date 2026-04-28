import Button from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

type UltimateSectionData = {
  title: string;
  description: string;
  cta_title?: string;
};

type Props = {
  ultimate_section: UltimateSectionData;
};

const UltimateSection = ({ ultimate_section }: Props) => {
  const { title, description, cta_title } = ultimate_section;

  return (
    <section className="bg-white py-10 md:py-12 lg:py-16 px-12">
      <div className="container mx-auto">
        {/* Bordered Card */}
        <div className="border border-dark-300  p-6 md:p-10 lg:p-16 min-h-55 md:min-h-70 lg:min-h-100 flex items-center">
          <Grid className="w-full gap-y-6 md:gap-y-0">
            {/* Left: Heading */}
            <Grid.Col className="w-full md:w-2/5 flex items-center pr-0 md:pr-8">
              <Typography
                variant="h2"
                size="h3"
                isTitle
                className="text-dark text-2xl md:text-3xl lg:text-4xl"
              >
                {title}
              </Typography>
            </Grid.Col>

            {/* Right: Description + CTA */}
            <Grid.Col className="w-full md:w-3/5 flex flex-col gap-6 md:gap-8">
              <Typography
                variant="p"
                size="h6"
                className="text-dark-400 text-justify text-sm md:text-base"
              >
                {description}
              </Typography>

              {cta_title && (
                <div>
                  <Button
                    href="/contact"
                    variant="default"
                    size="default"
                    rounded="default"
                    className="mt-2"
                  >
                    {cta_title}
                  </Button>
                </div>
              )}
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default UltimateSection;
