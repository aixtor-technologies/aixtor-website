import Typography from "@/components/ui/typography";

type ServicesSection = {
  heading_title?: string;
  description?: string;
  cta_button?: string;
};

type Props = {
  services_section?: ServicesSection;
};

const Services = ({ services_section }: Props) => {
  return (
    <section className="large-section">
      <div className="container">
        <div className="common-heading text-center">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {services_section?.heading_title}
          </Typography>
          <Typography variant="p" size="h5" className="mt-4">
            {services_section?.description}
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default Services;
