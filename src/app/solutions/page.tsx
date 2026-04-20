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
        title="Maximize Business Efficiency with Aixtor’s Digital Solutions"
        description="Benefit your business with a range of transformative solutions to streamline operations and boost productivity."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <ListSection
        title="Innovative Solutions Tailored to Your Business Needs"
        description="Aixtor offers a diverse range of solutions customized to meet your unique business needs. We provide transformative solutions to empower your business digitally. Our primary focus is on providing innovative solutions with a team of experts while partnering with you to unlock new opportunities for your business in the digital world."
        items={data}
      />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
