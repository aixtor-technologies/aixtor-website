"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Grid from "@/components/ui/grid";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

type ContactForm = {
  heading: string;
  description: string;
  form_details: unknown[];
};

async function fetchContactForm(): Promise<ContactForm | null> {
  try {
    const res = await HttpService.nativeFetch<
      TApiResponse<{ contact_form: ContactForm }>
    >("common-options/contact_form", { method: "GET" });
    return res?.data?.contact_form ?? null;
  } catch (error) {
    console.error("Failed to fetch contact form:", error);
    return null;
  }
}

const StartConversation = () => {
  const [data, setData] = useState<ContactForm | null>(null);

  useEffect(() => {
    fetchContactForm().then(setData);
  }, []);

  const heading = data?.heading ?? "Ready to Transform Your Business?";
  const description =
    data?.description ??
    "Connect with us to explore how AIXTOR empowers your business to achieve its objectives and navigate challenges through smart, innovative solutions.";

  return (
    <section className="common-section bg-white pb-0!">
      <div className="container relative">
        <Grid size="lg">
          <Grid.Col className="md:w-6/12">
            <Typography variant="h2" size="h3" isTitle>
              {heading}
            </Typography>
            <Typography variant="p" size="h5" className="my-4">
              {description}
            </Typography>
            <Image
              src="/images/logo-round-art.svg"
              alt="Start Conversation"
              width={200}
              height={200}
              className="size-52"
            />
          </Grid.Col>

          <Grid.Col className="md:w-6/12">
            <div className="p-6 pt-0 bg-white shadow-card rounded-xl lg:rounded-2xl">
              <Typography variant="h3" size="h4" className="mb-4 font-semibold">
                Let&apos;s Start Conversation!
              </Typography>
              <form>
                <Input type="text" placeholder="Name" />
                <Input type="email" placeholder="Email" />
                <Input type="tel" placeholder="Phone" />
                <Button className="w-full">Book your consultation</Button>
              </form>
            </div>
          </Grid.Col>
        </Grid>
      </div>

      <Image
        src="/images/contact-art.svg"
        width={1526}
        height={298}
        alt="contact"
        className="md:-mt-24 lg:-mt-28 xl:-mt-32"
      />
    </section>
  );
};

export default StartConversation;
