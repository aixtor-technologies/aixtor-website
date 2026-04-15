import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";

type BannerProps = {
  title: string;
  imgUrl: string;
  description: string;
};

const Banner = ({ title, imgUrl, description }: BannerProps) => {
  return (
    <section>
      <div className="container">
        <Typography
          size="h5"
          className="font-semibold mb-1.5 lg:mb-2 text-dark group-hover:text-primary"
        >
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Image
          src={imgUrl}
          alt="title"
          width={654}
          height={442}
          className="mt-4 md:mt-6 lg:mt-8 w-full"
          style={{ aspectRatio: "654/442" }}
        />
        <Link href="/#" className="inset-0 absolute z-1" />
      </div>
    </section>
  );
};

export default Banner;
