import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type SolutionItem = {
  title: string;
  description: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  cta_label?: string;
  cta_href?: string;
  items?: SolutionItem[];
};

const SectionAnimation = ({
  heading = "",
  subheading = "",
  cta_label = "View all solutions",
  cta_href = "",
  items = [],
}: Props) => {
  if (!items.length) return null;

  return (
    <section
      className="common-section text-white"
      style={{
        background:
          "radial-gradient(76.97% 91.99% at 50% 105.22%, #0150FF 0%, #0E4ACD 13.9%, #0E3997 49.16%, #092971 69.05%, #010F2E 100%)",
      }}
    >
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-6/12">
            <div className="sticky top-12">
              <Typography variant="h2" size="h3" isTitle>
                {heading}
              </Typography>
              <Typography variant="p" size="h5" className="my-6">
                {subheading}
              </Typography>
              <Button href={cta_href}>{cta_label}</Button>
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 transition-all duration-300 border-2 border-white rounded-xl mb-6"
                >
                  <Typography size="h5" className="font-semibold mb-1">{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </div>
              ))}
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default SectionAnimation;
