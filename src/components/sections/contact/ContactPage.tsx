import type { ContactDetails } from "@/types/contact";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactIntro } from "@/components/sections/contact/ContactIntro";

type ContactPageProps = {
  title: string;
  subtitle: string;
  details: ContactDetails;
};

export function ContactPage({ title, subtitle, details }: ContactPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <ContactIntro title={title} subtitle={subtitle} />
      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <ContactForm />
        <ContactInfo details={details} />
      </div>
    </section>
  );
}
