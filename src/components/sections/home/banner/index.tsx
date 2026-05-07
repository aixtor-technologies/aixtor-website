import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import RatingSection from "./rating";
import BannerCircle from "./banner-circle";

type BannerSection = {
  heading_title?: string;
  description?: string;
  cta_title?: string;
  background_video?: string | null;
  rotating_items?: {
    href: string;
    label: string;
    mainImage: string;
    icon: string;
    className: string;
  }[];
  review_highlight?: {
    review_items?: {
      review_image: string | null;
      review_rating: string | null;
      review_description: string | null;
      review_label?: string | null;
    }[];
  };
};

type Props = {
  banner_section?: BannerSection;
};

const Banner = ({ banner_section }: Props) => {
  // console.log("Banner section data:", banner_section);
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
              {banner_section?.heading_title}
            </Typography>
            <Typography variant="p" size="h5" className="mt-4">
              {banner_section?.description}
            </Typography>
            <Button href="/" variant="light" className="mt-6 md:mt-8 lg:mt-10">
              {banner_section?.cta_title}
            </Button>
          </Grid.Col>
          <Grid.Col className="md:w-5/12 hidden md:block">
            <BannerCircle items={banner_section?.rotating_items} />
          </Grid.Col>
        </Grid>
        <RatingSection review_highlight={banner_section?.review_highlight} />
      </div>
      {banner_section?.background_video && (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={banner_section.background_video} type="video/mp4" />
        </video>
      )}
    </section>
  );
};

export default Banner;
