import { ContactPage } from "@/components/sections/contact/ContactPage";
import { getContactDetails, getContactPageCopy } from "@/lib/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the AIxtor team about your next platform or product build.",
};

export default async function ContactRoutePage() {
  const [copy, details] = await Promise.all([
    getContactPageCopy(),
    getContactDetails(),
  ]);

  return (
    <ContactPage
      title={copy.title}
      subtitle={copy.subtitle}
      details={details}
    />
  );
}
