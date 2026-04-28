"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import Grid from "@/components/ui/grid";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

// ── Types ───────────────────────────────────────────
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

const AUTOPLAY_INTERVAL = 3000;
const WHEEL_THROTTLE = 600;

// ── Component ───────────────────────────────────────
export default function MigrateToLiferaySection({
  migrate_to_liferay_section,
}: {
  migrate_to_liferay_section?: Section;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const sectionRef = useRef<HTMLElement>(null);
  const throttleRef = useRef(false);
  const activeIndexRef = useRef(0);

  const items = migrate_to_liferay_section?.migrate_to_liferay ?? [];
  const lastIndex = items.length - 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goTo = (next: number, dir: "up" | "down") => {
    setDirection(dir);
    setActiveIndex(next);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !items.length) return;

    const isSectionFullyInView = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom >= window.innerHeight;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isSectionFullyInView()) return;

      const current = activeIndexRef.current;
      const isDown = e.deltaY > 0;

      if (isDown && current === lastIndex) return;
      if (!isDown && current === 0) return;

      e.preventDefault();

      if (throttleRef.current) return;
      throttleRef.current = true;

      setTimeout(() => {
        throttleRef.current = false;
      }, WHEEL_THROTTLE);

      goTo(isDown ? current + 1 : current - 1, isDown ? "up" : "down");
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [items.length, lastIndex]);

  if (!migrate_to_liferay_section || !items.length) return null;

  const { heading, cta_title } = migrate_to_liferay_section;
  const activeItem = items[activeIndex];

  return (
    <section ref={sectionRef} className="common-section bg-dark-200">
      <div className="container">
        <Typography
          variant="h2"
          size="h2"
          className="text-dark mb-14"
          isCenter
          isTitle
        >
          {heading}
        </Typography>

        <div className="relative">
          {/* Dots */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > activeIndex ? "up" : "down")}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                }`}
              />
            ))}
          </div>

          {/* Slide */}
          <div className="overflow-hidden">
            <div
              key={`${activeIndex}-${direction}`}
              className={
                direction === "up" ? "animate-slide-up" : "animate-slide-down"
              }
            >
              <Grid className="items-center">
                <Grid.Col className="w-full lg:w-1/2 flex justify-center">
                  <div className="max-w-100 w-full">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      width={434}
                      height={285}
                      className="w-full h-auto object-contain shadow-card-xl"
                    />
                  </div>
                </Grid.Col>

                <Grid.Col className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                  <div className="max-w-xl text-center lg:text-left">
                    <Typography
                      variant="h3"
                      size="h3"
                      className="text-dark mb-4"
                    >
                      {activeItem.title}
                    </Typography>
                    <Typography
                      size="p"
                      className="text-dark-400 leading-relaxed"
                    >
                      {activeItem.description.trim()}
                    </Typography>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </div>
        </div>

        {cta_title && (
          <div className="flex justify-center mt-14">
            <Button href="/contact">{cta_title}</Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-48px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        .animate-slide-up   { animation: slideInUp   0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
        .animate-slide-down { animation: slideInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
      `}</style>
    </section>
  );
}
