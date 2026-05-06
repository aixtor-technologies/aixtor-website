import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoryCard {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
}

interface ListSection {
  title: string;
  description: string;
}

interface SuccessStoriesProps {
  caseStudies: StoryCard[];
  list_section: ListSection;
}

// ─── StoryCard ────────────────────────────────────────────────────────────────

const StoryCardComponent = memo(
  ({ image, title, description, slug }: StoryCard) => (
    <Link href={`/case-study/${slug}`} className="group block h-full">
      <div className="flex flex-col h-full rounded-2xl p-4 transition-all duration-700 ease-in-out group-hover:-translate-y-1 group-hover:shadow-card-xl">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-dark-200">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-3 pt-5 px-2 pb-2">
          <Typography
            variant="h3"
            size="h6"
            className="font-semibold leading-snug text-dark transition-all duration-200
                     group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-secondary
                     group-hover:bg-clip-text group-hover:text-transparent"
          >
            {title}
          </Typography>

          <Typography variant="p" size="p" className="text-dark-400">
            {description}
          </Typography>
        </div>
      </div>
    </Link>
  ),
  (prevProps, nextProps) =>
    prevProps.id === nextProps.id &&
    prevProps.title === nextProps.title &&
    prevProps.slug === nextProps.slug
);

StoryCardComponent.displayName = "StoryCard";

// ─── SuccessStories ───────────────────────────────────────────────────────────

const SuccessStories = memo(
  ({ caseStudies, list_section }: SuccessStoriesProps) => {
    const { title, description } = list_section;

    return (
      <section className="bg-white common-section">
        <div className="container">
          <div className="text-center common-heading">
            <Typography
              variant="h2"
              size="h3"
              isTitle
              isCenter
              className="text-dark mb-5"
            >
              {title}
            </Typography>
            <Typography
              variant="p"
              size="p"
              className="text-dark-400 max-w-4xl mx-auto text-center"
            >
              {description}
            </Typography>
          </div>

          <Grid size="lg" className="gap-y-6 lg:gap-y-8">
            {caseStudies?.map(story => (
              <Grid.Col key={story.slug} className="w-full md:w-1/2">
                <StoryCardComponent {...story} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </section>
    );
  }
);

SuccessStories.displayName = "SuccessStories";
export default SuccessStories;
