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

const splitChallenge = (text: string): { title: string; description: string } => {
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
    <section className="common-section bg-white">
      <div className="container">
        <div className="common-heading text-center">
          <Typography variant="h2" size="h2" isTitle isCenter className="text-dark font-bold">
            {title}
          </Typography>
        </div>

        <Grid size="lg" className="gap-y-8 lg:gap-y-10">
          {challenges.map((item, index) => {
            const { title: challengeTitle, description } = splitChallenge(item.challenge);

            return (
              <Grid.Col key={index} className="w-full md:w-1/2">
                <div className="flex items-start gap-4 md:gap-5">
                  <Image
                    src="/images/icons/icon-park.svg"
                    alt="Challenge icon"
                    width={48}
                    height={48}
                    className="shrink-0 mt-0.5"
                  />
                  <Typography variant="p" size="h6" className="text-dark-400 leading-relaxed">
                    {challengeTitle && (
                      <span className="font-semibold text-dark">{challengeTitle}: </span>
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
