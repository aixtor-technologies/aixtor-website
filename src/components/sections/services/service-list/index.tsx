import Grid from "@/components/ui/grid";
import Card from "@/components/shared/card";
import Typography from "@/components/ui/typography";

const services = [
  {
    title: "Enterprise Portal Development",
    description:
      "We craft robust enterprise portals to enhance communication and collaboration, and drive business and transactional productivity journeys within your organization.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
  {
    title: "Liferay Consulting and Development",
    description:
      "As a certified partner of Liferay, we ensure to uncover the full potential of your projects. Our certified experts deliver exceptional results, driving satisfied user experiences.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
  {
    title: "Liferay Upgrade Service",
    description:
      "Seamlessly transit your businesses to the latest versions of Liferay platform for advanced features and performance enhancement in minimum downtime with maximum benefits.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
  {
    title: "Liferay Migration Service",
    description:
      "Effortlessly transition your legacy platforms to Liferay to harness the full potential of your digital infrastructure—enhancing functionality, strengthening security, and enabling greater operational efficiency.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
  {
    title: "Web Portal Development",
    description:
      "Our expert team ensures seamless integration, user-friendly interfaces, and scalable platforms, enabling clients to enhance engagement and streamline operations.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
  {
    title: "Liferay Performance Tuning",
    description:
      "By fine-tuning Liferay, businesses experience enhanced user satisfaction, increased productivity, and higher conversion rates, translating into improved ROI and competitiveness.",
    imgUrl: "/images/dummy/services_listing_Enterprise-portal-Development.webp",
  },
];

const ServiceList = () => {
  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="common-heading">
          <Typography size="h2" isCenter isTitle className="font-semibold mb-4">
            Your Partner in Digital Transformation
          </Typography>
          <Typography size="h6" className="text-center">
            Whether you are looking to optimize operations, enhance customer
            experiences, or open new revenue streams, Aixtor has got you
            covered! With our team of certified experts, we offer several
            end-to-end services like web portal development, Liferay consulting,
            AI and IoT integrations, Liferay migration and upgradation, and
            DevOps automation tailored to meet your unique business needs.
          </Typography>
        </div>
        <Grid className="gap-y-4 md:gap-y-5 lg:gap-y-6">
          {services.map(service => (
            <Grid.Col key={service.title} className="md:w-6/12 lg:w-4/12">
              <Card
                title={service.title}
                description={service.description}
                imgUrl={service.imgUrl}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default ServiceList;
