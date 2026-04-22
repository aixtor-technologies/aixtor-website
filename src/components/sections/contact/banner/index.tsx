import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

const CONTENT = {
  heading: "Contact Us",
  description:
    "We have been committed to delivering custom business-oriented solutions to our clients. We follow the best practices; as a result, we are being recommended and making a mark in the industry.",
  image: {
    src: "/images/dummy/service_banner.png.webp",
    alt: "contact us",
    width: 350,
    height: 350,
  },
};

export default function ContactBanner() {
  return (
    <section className="bg-dark-200 py-20 lg:py-35">
      <div className="container">
        <Grid className="items-center">
          <Grid.Col className="lg:w-5/12">
            <Typography
              variant="h1"
              size="h2"
              className="text-black mb-4 lg:mb-6"
            >
              {CONTENT.heading}
            </Typography>
            <Typography
              variant="p"
              size="h6"
              className="text-gray-500 max-w-md"
            >
              {CONTENT.description}
            </Typography>
          </Grid.Col>

          <Grid.Col className="lg:w-7/12 flex justify-end">
            <ContactImage {...CONTENT.image} />
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
}

function ContactImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="p-2.5 border-2 border-gray-500/20 rounded-md w-full max-w-125">
      <div className="p-2.5 border-2 border-gray-500/20 rounded">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-sm shadow-card-xl"
        />
      </div>
    </div>
  );
}
