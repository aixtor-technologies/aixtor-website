import Image from "next/image";

import Typography from "@/components/ui/typography";
import CustomSlider from "@/components/ui/custom-slider";
// import ServicesSlider from "./service-slider";

const services = [
  {
    title: "Liferay Consulting & Development Service",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg",
  },
  {
    title: "Liferay migration services",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg",
  },
  {
    title: "Mobile app Development",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg",
  },
  {
    title: "Enterprise portal development",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg",
  },
  {
    title: "Web portal development",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg",
  },
  {
    title: "Ecommerce Development",
    description: "Empower your business by creating tailored digital experience through expert guidance and implementation of Liferay’s robust platform and capabilities.",
    image: "/images/liferay.svg"
  }
];

const Services = () => {
  return (
    <section className="large-section">
      <div className="container">
        <div className="common-heading text-center">
          <Typography variant="h2" size="h3" isTitle isCenter>
            Innovative Services for Your Enterprise
          </Typography>
          <Typography variant="p" size="h5" className="mt-4">
            Unlock the full potential of your business with our comprehensive
            range of expert services.
          </Typography>
        </div>
      </div>
      {/* <ServicesSlider services={services} /> */}
      <CustomSlider arrow itemClassName="px-2 lg:px-3 py-10" className="-my-10">
        {services.map((service) => (
          <div
            key={service.title}
            className="w-80 md:w-96 gap-8 h-full"
          >
            <div className="gradient-card h-full border px-4 md:px-6 xl:px-8 py-6 md:py-8 xl:py-10 rounded hover:shadow-card">
              <Image
                src={service.image}
                alt={service.title}
                width={60}
                height={60}
                className="mb-6"
              />

              <Typography
                variant="h3"
                size="h5"
                className="mb-2 font-semibold"
              >
                {service.title}
              </Typography>

              <Typography variant="p" size="p">
                {service.description}
              </Typography>
            </div>
          </div>
        ))}
      </CustomSlider>
    </section>
  );
};

export default Services;
