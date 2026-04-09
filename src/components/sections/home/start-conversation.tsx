import Image from "next/image";

import Grid from "@/components/ui/grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

const StartConversation = () => {
  return (
    <section className="common-section bg-white !pb-0">
      <div className="container relative">
        <Grid size="lg">
          <Grid.Col className="md:w-6/12">
            <Typography variant="h2" size="h3" isTitle>
              Ready to Transform
              <br />
              Your Business?
            </Typography>
            <Typography variant="p" size="h5" className="my-4">
              Connect with us to explore how AIXTOR empowers your business to
              achieve its objectives and navigate challenges through smart,
              innovative solutions.
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
                Let’s Start Conversation!
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
        src="./images/contact-art.svg"
        width={1526}
        height={298}
        alt="contact"
        className="md:-mt-24 lg:-mt-28 xl:-mt-32"
      />
    </section>
  );
};

export default StartConversation;
