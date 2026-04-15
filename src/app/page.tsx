import Banner from "@/components/sections/home/banner";
import CTASection from "@/components/shared/cta-section";
import Benefits from "@/components/sections/home/benefits";
import CaseStudies from "@/components/shared/case-studies";
import Services from "@/components/sections/home/services";
import Solutions from "@/components/sections/home/solutions";
import WhyChoose from "@/components/sections/home/why-choose";
import Industries from "@/components/sections/home/industries";
import StartConversation from "@/components/shared/start-conversation";

// import DesignSystem from "@/components/ui/design-system";
// import ListAnimation from "@/components/sections/home/list-animation";
// import ListAnimation2 from "@/components/sections/home/list-animation2";
// import CircleAnimation from "@/components/sections/home/circle-animation";
// import SectionAnimation from "@/components/sections/home/section-animation";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <Solutions />
      <div className="large-section">
        <CTASection />
      </div>
      {/* <SectionAnimation /> */}
      <WhyChoose />
      <Benefits />
      {/* <ListAnimation /> */}
      <Industries />
      {/* <ListAnimation2 /> */}
      <CaseStudies />
      <StartConversation />
      {/* <DesignSystem /> */}
    </>
  );
}
