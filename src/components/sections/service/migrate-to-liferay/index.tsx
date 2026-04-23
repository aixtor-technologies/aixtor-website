"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";



type MigrateItem = {
  image: string;
  title: string;
  description: string;
  read_more_link: string;
};

type Section = {
  heading: string;
  cta_title: string;
  migrate_to_liferay: MigrateItem[];
};

export default function MigrateToLiferaySection({
  migrate_to_liferay_section,
}: {
  migrate_to_liferay_section?: Section;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!migrate_to_liferay_section?.migrate_to_liferay?.length) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const length = migrate_to_liferay_section.migrate_to_liferay.length;
        return prev === length - 1 ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [migrate_to_liferay_section]);

  if (!migrate_to_liferay_section) return null;

  const { heading, cta_title, migrate_to_liferay } = migrate_to_liferay_section;

  if (!migrate_to_liferay?.length) return null;

  const activeItem = migrate_to_liferay[activeIndex];

  return (
    <section className="common-section bg-dark-200">
      <div className="container">
        <Typography variant="h1" size="h2" className="text-dark-400 mb-14" isCenter isTitle>
          {heading}
        </Typography>

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {migrate_to_liferay.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                }`}
              />
            ))}
          </div>

          <Grid className="items-center">
            <Grid.Col className="lg:w-1/2 flex justify-center">
              <div className="max-w-120 w-full">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain rounded-lg shadow-card-xl"
                />
              </div>
            </Grid.Col>

            <Grid.Col className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
              <div className="max-w-xl text-center lg:text-left">
                <Typography variant="h2" size="h3" className="mb-4">
                  {activeItem.title}
                </Typography>

                <Typography variant="h2" size="h6" className="text-dark-400 leading-relaxed">
                  {activeItem.description.trim()}
                </Typography>
              </div>
            </Grid.Col>
          </Grid>
        </div>

        {cta_title && (
          <div className="flex justify-center mt-14">
            <Button href="/contact">{cta_title}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
