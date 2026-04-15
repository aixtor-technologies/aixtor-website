import Image from "next/image";

import Typography from "@/components/ui/typography";

type CardProps = {
  title: string,
  imgUrl: string,
  description: string
}

const Card = ({ title, imgUrl, description }: CardProps) => {
  return (

    <div className="gradient-card body-border py-3 lg:py-4 px-4 lg:px-6 border-2 rounded-xl">
      <Image
        src={imgUrl}
        alt="title"
        width={60}
        height={60}
        className="mb-4 size-15 p-2"
      />
      <Typography size="h5" className="font-semibold mb-1">
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </div>

  );
};

export default Card;
