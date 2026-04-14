"use client";
import { useEffect, useRef, useState } from "react";

import Grid from "@/components/ui/grid";
// import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

const solutions = [
  { title: "Intranet Portal", description: "Enhance internal communication..." },
  { title: "Self-Service Portal", description: "Empower your users..." },
  { title: "Customer Portal", description: "Build deeper relationships..." },
  { title: "Partner Management Portal", description: "Streamline partners..." },
  { title: "Enterprise Website", description: "Create powerful websites..." },
  { title: "Supplier And Vendor Portal", description: "Optimize supply chain..." },
  { title: "B2B & B2C E-Commerce Portal Development Services", description: "Launch platforms..." },
];

const ListAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // 🔹 Detect most visible item
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

  // 🔥 Smooth step-by-step animation (prevents skipping)
  useEffect(() => {
    if (activeIndex === targetIndex) return;

    const step = targetIndex > activeIndex ? 1 : -1;

    const timeout = setTimeout(() => {
      setActiveIndex((prev) => prev + step);
    }, 120); // control animation speed here

    return () => clearTimeout(timeout);
  }, [targetIndex, activeIndex]);

  return (
    <section className="common-section">
      <div className="container">
        <Grid className="justify-center">
          <Grid.Col className="md:w-6/12">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`p-4 mb-6 border-2 rounded-xl transition-all duration-300 bg-white
                ${activeIndex === index ? "border-primary scale-105 shadow-lg opacity-100" : "border-transparent opacity-50 scale-95"
                  }`}
              >
                <Typography size="h5" className="font-semibold mb-1">
                  {solution.title}
                </Typography>
                <Typography>{solution.description}</Typography>
              </div>
            ))}
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default ListAnimation;
