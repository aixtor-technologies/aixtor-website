import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import StartConversation from "@/components/shared/start-conversation";
import ListSection from "@/components/shared/list-section";

const data = [
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

export default function SolutionsPage() {
  return (
    <>
      <Banner
        title="Industries We Empower Through Digital Transformation"
        description="Business goals evolve. So should technology behind them. We help industries stay relevant with digital strategies that deliver measurable change."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <ListSection
        title="Crafting Industry-Specific Solutions That Deliver Impact"
        description="At Aixtor, we understand that every industry faces unique challenges, be it complex compliance in insurance, monitoring the telecom networks in telecom, workflow inefficiencies in manufacturing, or evolving regulatory frameworks in NBFCs. That’s why we build purpose-driven digital solutions tailored to industry-specific needs. From automating policy and claims management, optimizing production pipelines, to enabling self-service telecom portals with real-time support and digitizing loan origination and streamlining KYC for NBFCs our platforms deliver measurable business outcomes. With deep domain expertise and agile technology, we help enterprises boost operational efficiency, enhance user experiences, and stay future-ready."
        items={data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
