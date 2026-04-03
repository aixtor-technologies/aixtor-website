import type { ContactDetails } from "@/types/contact";

export async function getContactDetails(): Promise<ContactDetails> {
  return {
    email: "hello@aixtor.tech",
    phone: "+1 (555) 010-2048",
    addressLines: ["1200 Market Street", "Suite 400", "San Francisco, CA 94102"],
    hoursLabel: "Monday–Friday, 9:00–18:00 PT",
  };
}

export async function getContactPageCopy(): Promise<{
  title: string;
  subtitle: string;
}> {
  return {
    title: "Let's work together",
    subtitle:
      "Share a few details—we'll follow up with next steps and a clear engagement outline.",
  };
}
