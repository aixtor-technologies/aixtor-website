import CaseStudies from "@/components/shared/case-studies";
import ServiceList from "@/components/sections/services/service-list";
import StartConversation from "@/components/shared/start-conversation";

export default function Home() {
  return (
    <>
      <ServiceList />
      <CaseStudies />
      <StartConversation />
    </>
  );
}
