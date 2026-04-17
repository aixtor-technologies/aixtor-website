import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";

type BannerProps = {
  title: string;
  imgUrl: string;
  description: string;
};

const Banner = ({ title, imgUrl, description }: BannerProps) => {
  return (
    <section className="banner py-24 md:py-32 lg:py-35 relative">
      <div className="container">
        <Grid className="gap-y-8 items-center justify-between">
          <Grid.Col className="md:w-6/12">
            <Typography
              variant="h1"
              size="h2"
              className="font-semibold mb-1.5 lg:mb-2 text-dark"
            >
              {title}
            </Typography>
            <Typography size="h6">{description}</Typography>
          </Grid.Col>
          <Grid.Col className="md:w-6/12 lg:w-5/12">
            <div className="imgbox rounded-lg shadow-card mx-auto w-10/12 md:w-full">
              <Image
                src={imgUrl}
                alt="title"
                width={654}
                height={442}
                className="rounded-lg w-full"
                style={{ aspectRatio: "654/442" }}
              />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default Banner;
