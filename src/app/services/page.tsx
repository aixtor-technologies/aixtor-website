import Banner from "@/components/shared/banner";
import CaseStudies from "@/components/shared/case-studies";
import ServiceList from "@/components/sections/services/service-list";
import StartConversation from "@/components/shared/start-conversation";

export default function Home() {
  return (
    <>
      <Banner
        title="Unlock Your Digital Potential with Aixtor's Comprehensive Services"
        description="Transform your operations, enhance customer experiences, and drive growth with our tailored services."
        imgUrl="/images/dummy/services_banner.webp"
      />
      <ServiceList />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
