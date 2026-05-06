import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";
import ConsultationForm from "./consultation-form";

async function fetchContactForm(): Promise<any> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<any>>(
      "common-options/contact_form",
      { method: "GET" }
    );
    return res?.data?.contact_form;
  } catch (error) {
    console.error("Failed to fetch contact form:", error);
    return null;
  }
}

const StartConversation = async () => {
  const data = await fetchContactForm();

  return (
    <section className="common-section bg-white pb-0!">
      <div className="container relative">
        <Grid size="lg">
          <Grid.Col className="md:w-6/12">
            <Typography variant="h2" size="h3" isTitle>
              {data?.heading}
            </Typography>
            <Typography variant="p" size="h5" className="my-4">
              {data?.description}
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
            <ConsultationForm />
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
