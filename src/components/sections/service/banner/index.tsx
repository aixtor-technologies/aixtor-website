"use client";

import Image from "next/image";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type DescriptionItem = {
  description: string;
};

type BannerSection = {
  title: string;
  side_image: string;
  cta_title: string;
  description_list: DescriptionItem[];
};

type ServiceBannerProps = {
  service_type?: string;
  banner_section?: BannerSection;
};

export default function ServiceBanner({
  service_type,
  banner_section,
}: ServiceBannerProps) {
  if (!banner_section) return null;

  const { title, side_image, cta_title, description_list } = banner_section;

  return (
    <section className="bg-dark-200 pt-20 pb-15 lg:pt-24 lg:pb-18">
      <div className="container">
        <Grid className="items-center">
          {/* LEFT */}
          <Grid.Col className="md:w-5/12 flex flex-col gap-6">
            {/* Badge */}
            {service_type && (
              <span className="inline-flex items-center w-fit px-4 py-1.5 rounded-lg bg-purple-100 text-purple-500 text-sm font-semibold">
                {service_type}
              </span>
            )}

            {/* Title */}
            <Typography variant="h1" size="h2">
              {title}
            </Typography>

            {/* Description */}
            {description_list?.length > 0 && (
              <ul className="flex flex-col gap-3">
                {description_list.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-dark-400"
                  >
                    <Image
                      src="/images/icons/Group.svg"
                      alt="icon"
                      width={18}
                      height={18}
                      className="mt-1 shrink-0"
                    />
                    <span>{item.description.trim()}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            {cta_title && (
              <div>
                <Button href="/contact" className="mt-2">
                  {cta_title}
                </Button>
              </div>
            )}
          </Grid.Col>

          {/* RIGHT */}
          <Grid.Col className="md:w-7/12 flex justify-center md:justify-end mt-10 md:mt-0">
            <div className="w-full max-w-140 rounded-xl border-2 border-dark-300 p-3">
              <div className="w-full max-w-140 rounded-xl border-2 border-dark-300 p-3">
                <Image
                  src={side_image}
                  alt={title}
                  width={560}
                  height={420}
                  className="w-full h-auto object-contain rounded-lg shadow-card-xl"
                  priority
                />
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
}
