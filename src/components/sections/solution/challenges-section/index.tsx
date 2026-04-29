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
    <section className="common-section bg-white">
      <div className="container">
        <div className="text-center common-heading">
          <Typography variant="h2" size="h3" isTitle isCenter className="text-dark">
            {challenges_heading}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {challenges.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="w-full h-48 md:h-60 lg:h-75 overflow-hidden rounded-lg">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <Typography
                variant="h3"
                size="h4"
                className="text-dark-400 font-semibold mt-2"
              >
                {item.title}
              </Typography>

              <Typography variant="p" size="h6" className="text-dark-400 text-justify">
                {item.description}
              </Typography>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-10">
          <Button href="/contact" variant="default" size="default" rounded="default">
            {cta_title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
