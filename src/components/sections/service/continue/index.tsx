"use client";

import { memo } from "react";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type ContinueItem = {
  icon: string;
  title: string;
  description: string;
};

type ContinueSectionData = {
  title: string;
  description: string;
  cta_title: string;
  continue_list: ContinueItem[];
};

type ContinueSectionProps = {
  continue_section?: ContinueSectionData;
};

const ContinueCard = memo(
  ({ item, index }: { item: ContinueItem; index: number }) => (
    <div
      key={`continue-${index}`}
      className="flex flex-col gap-3 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-dark-300 bg-white shadow-card hover:shadow-card-lg transition-all duration-300 h-full"
    >
      <Typography
        variant="h2"
        size="h2"
        className="bg-linear-to-b from-secondary to-primary bg-clip-text text-transparent leading-(--text-56--line-height)"
        aria-label={`Step ${index + 1}`}
      >
        {index + 1}
      </Typography>

      <Typography
        variant="h2"
        size="h5"
        className="font-bold text-dark-400 leading-(--text-lg--line-height)"
      >
        {item.title}
      </Typography>

      <Typography className="text-dark-400 text-left leading-(--text-base--line-height) flex-grow">
        {item.description.trim()}
      </Typography>
    </div>
  )
);

ContinueCard.displayName = "ContinueCard";

export default function ContinueSection({
  continue_section,
}: ContinueSectionProps) {
  if (!continue_section) return null;

  const { title, description, cta_title, continue_list } = continue_section;

  if (!continue_list?.length) return null;

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="common-heading">
          {title && (
            <Typography
              variant="h2"
              size="h3"
              className="font-bold text-dark-400 leading-(--text-40--line-height)"
              isCenter
              isTitle
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="h2"
              size="h5"
              className="text-center text-dark-400 mt-3 sm:mt-4"
            >
              {description.trim()}
            </Typography>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 md:mb-12">
          {continue_list.map((item, index) => (
            <ContinueCard
              key={`continue-card-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          {cta_title && (
            <Button
              href="/contact"
              variant="default"
              size="default"
              rounded="default"
              aria-label={cta_title}
            >
              {cta_title}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
