"use client";
import { useEffect, useRef, useState } from "react";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

type SolutionItem = {
  title: string;
  description: string;
};

type Props = {
  items?: SolutionItem[];
};

const ListAnimation = ({ items = [] }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleIndex = targetIndex;

        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleIndex = index;
          }
        });

        setTargetIndex(visibleIndex);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    itemRefs.current.forEach((el, index) => {
      if (el) {
        el.setAttribute("data-index", index.toString());
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [targetIndex]);

  useEffect(() => {
    if (activeIndex === targetIndex) return;
    const step = targetIndex > activeIndex ? 1 : -1;
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => prev + step);
    }, 120);
    return () => clearTimeout(timeout);
  }, [targetIndex, activeIndex]);

  if (!items.length) return null;

  return (
    <section className="common-section">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-6/12">
            {items.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`p-4 mb-6 border-2 rounded-xl transition-all duration-300 bg-white
                  ${activeIndex === index ? "border-primary scale-105 shadow-lg opacity-100" : "border-transparent opacity-50 scale-95"}`}
              >
                <Typography size="h5" className="font-semibold mb-1">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </div>
            ))}
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default ListAnimation;
