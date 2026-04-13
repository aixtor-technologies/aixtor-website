import Image from "next/image";

import Typography from "@/components/ui/typography";

import IconStarFill from "@/components/shared/icons/star-fill";

const ratings = [
  {
    imgUrl: "/images/google-logo.svg",
    title: "Google",
    rating: "4.9",
    description: "Excellence Recognized on Google",
  },
  {
    imgUrl: "/images/clutch-logo.svg",
    title: "Clutch",
    rating: "4.5",
    description: "Ranked #1 on Clutch for Web Development Services",
  },
  {
    imgUrl: "/images/google-logo.svg",
    title: "Trustpilot",
    rating: "4.3",
    description: "Building Trust with a TrustScore on TrustPilot",
  },
  {
    imgUrl: "/images/clutch-logo.svg",
    title: "AWS Partner Network",
    rating: "4.3",
    description: "Building Trust with a AWS Network.",
  },
];

const RatingSection = () => {
  return (
    <div className="w-full pt-6 lg:pt-16 xl:pt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-white">
        {ratings.map((item, index) => (
          <div key={index}
            className={"flex flex-col items-center text-center px-6 xl:px-10 border-s-2 border-white first:border-0 }"}
          >
            <Image src={item.imgUrl} alt={item.title} width={200} height={40} className="h-10 w-auto" />
            <div className="flex gap-px my-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="size-5">
                  <IconStarFill />
                </span>
              ))}
            </div>
            <Typography size="h5" className="font-bold">{item.rating}</Typography>
            <p className="mt-3 md:mt-4 xl:mt-5 font-medium">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSection;
