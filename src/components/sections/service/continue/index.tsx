"use client";

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

export default function ContinueSection({
  continue_section,
}: ContinueSectionProps) {
  if (!continue_section) return null;

  const { title, description, cta_title, continue_list } = continue_section;

  if (!continue_list?.length) return null;

  return (
    <section className="py-10 lg:py-14 xl:py-16 bg-white">
      <div className="container">
        <div>
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
              className="text-center text-dark-400 mt-4"
            >
              {description.trim()}
            </Typography>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-10">
          {continue_list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-6 rounded-xl border border-dark-300 bg-white shadow-card hover:shadow-card-lg transition-all duration-300"
            >
              <Typography
                variant="h2"
                size="h2"
                className="bg-linear-to-b from-secondary to-primary bg-clip-text text-transparent leading-(--text-56--line-height)"
              >
                {index + 1}
              </Typography>

              <Typography
                variant="h2"
                size="h5"
                className="font-bold text-shadow-dark-400 leading-(--text-lg--line-height)"
              >
                {item.title}
              </Typography>

              <Typography className="text-dark-400 text-justify leading-(--text-base--line-height)">
                {item.description.trim()}
              </Typography>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          {cta_title && (
            <Button
              href="/contact"
              variant="default"
              size="default"
              rounded="default"
              className="mt-2"
            >
              {cta_title}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
