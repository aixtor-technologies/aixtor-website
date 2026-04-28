import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";


interface Challenge {
  challenge: string;
}

interface ChallengesSection {
  title: string;
  challenges: Challenge[];
}

interface TelecomChallengesProps {
  data: ChallengesSection;
}


const splitChallenge = (
  text: string
): { title: string; description: string } => {
  const colonIndex = text.indexOf(":");
  if (colonIndex === -1) return { title: "", description: text.trim() };
  return {
    title: text.slice(0, colonIndex).trim(),
    description: text.slice(colonIndex + 1).trim(),
  };
};

const TelecomChallenges: React.FC<TelecomChallengesProps> = ({ data }) => {
  const { title, challenges } = data;

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
        {/* Section heading */}
        <div className="mb-14 lg:mb-20 text-center">
          <Typography
            variant="h2"
            size="h2"
            isTitle
            isCenter
            className="text-dark font-bold"
          >
            {title}
          </Typography>
        </div>

        {/* Challenges grid — 2 columns on md+ */}
        <Grid size="lg">
          {challenges.map((item, index) => {
            const { title: challengeTitle, description } = splitChallenge(
              item.challenge
            );

            return (
              <Grid.Col key={index} className="w-full md:w-1/2 mb-10 lg:mb-14">
                <div className="flex items-start gap-5">
                  <Image
                    src="/images/icons/icon-park.svg"
                    alt="Challenge icon"
                    width={50}
                    height={50}
                  />
                  <Typography
                    variant="p"
                    size="h6"
                    className="text-dark-400 leading-relaxed"
                  >
                    {challengeTitle && (
                      <span className="font-semibold text-dark">
                        {challengeTitle}:{" "}
                      </span>
                    )}
                    {description}
                  </Typography>
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default TelecomChallenges;
