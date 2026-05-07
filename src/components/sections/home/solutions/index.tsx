"use client";
import { useState } from "react";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import IconUp from "@/components/shared/icons/up";

type SolutionsSection = {
  heading_title?: string;
  description?: string;
  cta_button?: string;
  solution_items?: { title: string; description: string; image?: string }[];
};

type Props = {
  solutions_section?: SolutionsSection;
};

const Solutions = ({ solutions_section }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = solutions_section?.solution_items ?? [];

  return (
    <section className="">
      <div className="container">
        <div className="common-heading">
          <Grid className="items-center">
            <Grid.Col className="md:w-8/12">
              <Typography variant="h2" size="h3" isTitle>
                {solutions_section?.heading_title}
              </Typography>
              <Typography variant="p" size="h5" className="mt-4">
                {solutions_section?.description}
              </Typography>
            </Grid.Col>
            <Grid.Col className="md:w-4/12 md:text-end">
              <Button href="">{solutions_section?.cta_button}</Button>
            </Grid.Col>
          </Grid>
        </div>
        {items.length > 0 && (
          <Grid className="justify-between">
            <Grid.Col className="md:w-5/12">
              <div className="space-y-0 border-x border-t border-black/10 rounded">
                {items.map((solution, index) => (
                  <div
                    key={solution.title}
                    className={`transition-all duration-300 border rounded
                      ${activeIndex === index ? " gradient-card active" : "border-t-dark-300 border-x-dark-300 border-b-dark-300"}`}
                  >
                    <button
                      className="w-full font-semibold flex items-center justify-between px-6 py-4 text-left"
                      onClick={() => setActiveIndex(index)}
                    >
                      <Typography variant="span" size="h6">
                        {solution.title}
                      </Typography>
                      <span
                        className={`flex size-8 shrink-0 rounded-full border ${activeIndex === index ? "border-primary" : "border-black/10 rotate-180"} transition-transform duration-300`}
                      >
                        <span className="w-1/2 aspect-square m-auto">
                          <IconUp />
                        </span>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${activeIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5">
                          <Typography size="p">
                            {solution.description}
                          </Typography>
                          <button className="mt-3 text-sm text-primary border-b hover:text-secondary">
                            Know more
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Grid.Col>
          </Grid>
        )}
      </div>
    </section>
  );
};

export default Solutions;
