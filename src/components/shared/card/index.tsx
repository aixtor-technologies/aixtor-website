import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";

type CardProps = {
  title: string;
  image: string;
  description: string;
  slug: string;
};

const Card = ({ title, image, description, slug }: CardProps) => {
  return (
    <div className="group gradient-card min-h-full body-border p-3 lg:p-4 xl:p-5 border rounded-md relative">
      <Typography
        size="h5"
        className="font-semibold mb-1.5 lg:mb-2 text-dark group-hover:text-primary"
      >
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Image
        src={image}
        alt={title}
        width={654}
        height={442}
        className="mt-4 md:mt-6 lg:mt-8 w-full"
        style={{ aspectRatio: "654/442" }}
      />
      <Link href={slug} className="inset-0 absolute z-1" />
    </div>
  );
};

export default Card;
