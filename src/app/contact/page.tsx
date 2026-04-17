import ContactBanner from "@/components/sections/contact/banner";
import InquireNow from "@/components/sections/contact/Inquire";
import WhyChoose from "@/components/sections/home/why-choose";
import StartConversation from "@/components/shared/start-conversation";

export default function ContactPage() {
  return (
    <>
      <ContactBanner />
      <InquireNow />
      <StartConversation />
      <WhyChoose />
    </>
  );
}
