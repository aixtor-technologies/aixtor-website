import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";

type BlogCardProps = {
  title: string;
  image: string;
  description: string;
  slug: string;
};

const BlogCard = ({ title, image, description, slug }: BlogCardProps) => {
  return (
    <div className="group min-h-full border border-dark-300 hover:shadow-card relative transition-all duration-200">
      <Image
        src={image}
        alt={title}
        width={480}
        height={256}
        className="w-full object-cover"
        style={{ aspectRatio: "480/256" }}
      />
      <div className="p-3 lg:p-4 xl:p-5">
        <Typography
          size="h5"
          className="font-semibold mb-1.5 lg:mb-2 text-dark group-hover:text-primary transition-all duration-200"
        >
          {title}
        </Typography>
        <Typography className="mb-1.5 lg:mb-2">{description}</Typography>
        <p className="text-sm">
          By <span className="text-primary font-semibold">Nikunj Malaviya</span>
        </p>
      </div>
      <Link href={slug} className="inset-0 absolute z-1" />
    </div>
  );
};

export default BlogCard;
