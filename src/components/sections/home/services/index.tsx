import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import ServicesSlider from "./service-slider";

type ServiceItem = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
};

type ServicesSection = {
  heading_title?: string;
  description?: string;
  cta_button?: string;
  service_item?: ServiceItem[];
};

type Props = {
  services_section?: ServicesSection;
};

const Services = ({ services_section }: Props) => {
  const items = services_section?.service_item ?? [];

  return (
    <section className="large-section">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center justify-center">
            <Grid.Col className="md:w-8/12 mx-auto text-center">
              <Typography variant="h2" size="h3" isTitle isCenter>
                {services_section?.heading_title}
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                {services_section?.description}
              </Typography>
            </Grid.Col>
          </Grid>
        </div>
        {items.length > 0 && <ServicesSlider services={items} />}
      </div>
      <div className="flex justify-center mt-10">
        <Button href="/services">{services_section?.cta_button}</Button>
      </div>
    </section>
  );
};

export default Services;
