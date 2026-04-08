import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section>
      <div className="container">
        <div
          className="px-4 md:px-10 lg:px-12 xl:px-16 py-4 md:py-8 lg:py-10 xl:py-12 bg-linear-to-r from-primary to-secondary p-8 rounded text-white rounded-2xl"
          style={{
            background:
              "url('/images/cta-banner.jpg') no-repeat center center / cover",
          }}
        >
          <div className="md:w-6/12">
            <Typography
              variant="h2"
              size="h4"
              className="mb-4 md:mb-6 lg:mb-8 !font-bold"
            >
              Delivering scalable digital solutions with precision, expertise,
              and purpose to drive measurable business growth.
            </Typography>
            <Button variant="light">Contact us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
