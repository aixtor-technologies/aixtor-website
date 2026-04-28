import Image from "next/image";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type ChallengeImage = {
  url: string;
  alt?: string;
};

type Challenge = {
  title: string;
  description: string;
  image: ChallengeImage;
};

type ChallengesSectionData = {
  challenges_heading: string;
  challenges: Challenge[];
  cta_title: string;
};

type Props = {
  challenges_section: ChallengesSectionData;
};

const ChallengesSection = ({ challenges_section }: Props) => {
  const { challenges_heading, challenges, cta_title } = challenges_section;

  if (!challenges?.length) return null;

  return (
    <section className="bg-white py-12 lg:py-10 px-12">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-15">
          <Typography
            variant="h2"
            size="h3"
            isTitle
            isCenter
            className="text-dark"
          >
            {challenges_heading}
          </Typography>
        </div>

        {/* Cards Grid — two equal columns with gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {challenges.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="w-full h-75 overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title}
                  width={300}
                  height={282}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>

              {/* Title */}
              <Typography
                variant="h3"
                size="h4"
                className="text-dark-400 font-semibold mt-2"
              >
                {item.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="p"
                size="h6"
                className="text-dark-400 text-justify"
              >
                {item.description}
              </Typography>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mt-10">
          <Button
            href="/contact"
            variant="default"
            size="default"
            rounded="default"
          >
            {cta_title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
