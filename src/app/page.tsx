import Typography from "@/components/ui/typography";

import DesignSystem from "@/components/ui/design-system";
import Services from "@/components/sections/home/services";
import Solutions from "@/components/sections/home/solutions";
import WhyChoose from "@/components/sections/home/why-choose";
import Industries from "@/components/sections/home/industries";
import CaseStudies from "@/components/sections/home/case-studies";
import StartConversation from "@/components/sections/home/start-conversation";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <Typography variant="h1" size="h1">Home Page</Typography>
      </div>
      <Services />
      <Solutions />
      <WhyChoose />
      <Industries />
      <CaseStudies />
      <StartConversation />
      <DesignSystem />
    </>
  );
}
