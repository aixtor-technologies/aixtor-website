import Banner from "@/components/sections/home/banner";
import CTASection from "@/components/shared/cta-section";
import DesignSystem from "@/components/ui/design-system";
import Services from "@/components/sections/home/services";
import Solutions from "@/components/sections/home/solutions";
import WhyChoose from "@/components/sections/home/why-choose";
import Industries from "@/components/sections/home/industries";
import CaseStudies from "@/components/sections/home/case-studies";
import StartConversation from "@/components/sections/home/start-conversation";
import ListAnimation from "@/components/sections/home/list-animation";
import SectionAnimation from "@/components/sections/home/section-animation";
import ListAnimation2 from "@/components/sections/home/list-animation2";
import Benefits from "@/components/sections/home/benefits";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <Solutions />
      <div className="large-section">
        <CTASection />
      </div>
      <SectionAnimation />
      <WhyChoose />
      <Benefits />
      <ListAnimation />
      <Industries />
      <ListAnimation2 />
      <CaseStudies />
      <StartConversation />
      <DesignSystem />
    </>
  );
}
