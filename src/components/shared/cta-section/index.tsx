import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type CtaBannerSection = {
  heading_title?: string;
  cta_button?: string;
  background_image?: string | null;
};

type Props = {
  cta_banner_section?: CtaBannerSection;
};

const CTASection = ({ cta_banner_section }: Props) => {
  const bgStyle = cta_banner_section?.background_image
    ? { background: `url('${cta_banner_section.background_image}') no-repeat center center / cover` }
    : undefined;

  return (
    <section>
      <div className="container">
        <div
          className="px-4 md:px-10 lg:px-12 xl:px-16 py-4 md:py-8 lg:py-10 xl:py-12 bg-linear-to-r from-primary to-secondary p-8 rounded text-white rounded-2xl"
          style={bgStyle}
        >
          <div className="md:w-6/12">
            <Typography
              variant="h2"
              size="h4"
              className="mb-4 md:mb-6 lg:mb-8 !font-bold"
            >
              {cta_banner_section?.heading_title}
            </Typography>
            <Button variant="light">{cta_banner_section?.cta_button}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
