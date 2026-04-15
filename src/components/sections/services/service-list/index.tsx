import Image from "next/image";

import Grid from "@/components/ui/grid";
import Card from "@/components/shared/card";
import Typography from "@/components/ui/typography";

const services = [
  { title: "Intranet Portal", description: "Enhance internal communication...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
  { title: "Self-Service Portal", description: "Empower your users...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
  { title: "Customer Portal", description: "Build deeper relationships...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
  { title: "Partner Management Portal", description: "Streamline partners...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
  { title: "Enterprise Website", description: "Create powerful websites...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
  { title: "Supplier And Vendor Portal", description: "Optimize supply chain...", imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp" },
];

const ServiceList = () => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
          Your Partner in Digital Transformation
        </Typography>
        <Typography size="h6">
          Whether you are looking to optimize operations, enhance customer experiences, or open new revenue streams, Aixtor has got you covered! With our team of certified experts, we offer several end-to-end services like web portal development, Liferay consulting, AI and IoT integrations, Liferay migration and upgradation, and DevOps automation tailored to meet your unique business needs.
        </Typography>
        <div className="flex flex-col gap-4 md:gap-8 lg-gap-12 xl:gap-15 relative">
          <Image
            src="/images/logo-wave.svg"
            alt="ServiceList Left"
            width={812}
            height={672}
            className="absolute left-0 hidden md:block object-contain w-full h-full "
            style={{ aspectRatio: "812/672" }}
          />

          <Grid className="md:w-4/12">
            {services.map((service) => (
              <Grid.Col key={service.title}>
                <Card title={service.title} description={service.description} imgUrl={service.imgUrl} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
