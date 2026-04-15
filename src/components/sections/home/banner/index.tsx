import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import RatingSection from "./rating";
import BannerCircle from "./banner-circle";

const Banner = () => {
  return (
    <section className="common-section min-h-dvh flex items-center relative text-white bg-linear-to-br from-[#2D1B69] via-[#5B2D8E] to-[#8B3FA0] overflow-hidden">
      <div className="container relative z-2 pt-10 lg:pt-16">
        <Grid className="relative">
          <Grid.Col className="md:w-7/12">
            <Typography
              variant="h1"
              size="h1"
              className="font-semibold tracking-[-0.04em] opacity-80 pe-1"
            >
              Empowering Enterprise with Innovative
              <br />
              Services. Solution. Support.
            </Typography>
            <Typography variant="p" size="h5" className="mt-4">
              Delivering end-to-end enterprise solutions designed to streamline
              operations, enhance performance, and drive sustainable growth.
              With AIXTOR, innovation meets reliability at every step.
            </Typography>
            <Button href="/" variant="light" className="mt-6 md:mt-8 lg:mt-10">Talk to us</Button>
          </Grid.Col>
          <Grid.Col className="md:w-5/12 hidden md:block">
            <BannerCircle />
          </Grid.Col>
        </Grid>
        <RatingSection />
      </div>
      <video src="/images/banner-video.mp4" autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover" >
        <source src="/images/banner-video.mp4" type="video/mp4" />
      </video>
    </section >
  );
};

export default Banner;
