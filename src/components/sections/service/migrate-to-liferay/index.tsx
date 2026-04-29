"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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

const WHEEL_THROTTLE = 600;

export default function MigrateToLiferaySection({
  migrate_to_liferay_section,
}: {
  migrate_to_liferay_section?: Section;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  const sectionRef = useRef<HTMLElement>(null);
  const throttleRef = useRef(false);
  const activeIndexRef = useRef(0);

  const items = migrate_to_liferay_section?.migrate_to_liferay ?? [];
  const lastIndex = items.length - 1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const handleWheel = (e: WheelEvent) => {
      if (throttleRef.current) return;

      const current = activeIndexRef.current;
      const isDown = e.deltaY > 0;

      // Check boundaries first
      if ((isDown && current === lastIndex) || (!isDown && current === 0)) {
        return;
      }

      throttleRef.current = true;
      e.preventDefault();

      // Update immediately for better UX
      goTo(isDown ? current + 1 : current - 1, isDown ? "down" : "up");

      // Reset throttle
      setTimeout(() => {
        throttleRef.current = false;
      }, WHEEL_THROTTLE);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, [items.length, lastIndex]);

  if (!migrate_to_liferay_section || !items.length) return null;

  const { heading, cta_title } = migrate_to_liferay_section;
  const activeItem = items[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="common-section bg-dark-200"
    >
      <div className="container">
        <Typography
          variant="h2"
          size="h2"
          className="text-dark common-heading"
          isCenter
          isTitle
        >
          {heading}
        </Typography>

        <div className="relative">
          {/* Dots - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 w-12">
              {items.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => goTo(i, i > activeIndex ? "up" : "down")}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activeIndex}
                />
              ))}
            </div>
          )}

          {/* Slide */}
          <div className="overflow-visible">
            <div
              key={`${activeIndex}-${direction}`}
              className={
                direction === "up" ? "animate-slide-up" : "animate-slide-down"
              }
            >
              <div className="flex flex-col lg:flex-row items-center justify-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 lg:ml-16">
                {/* Image - Left side */}
                <div className="w-full lg:w-1/2 min-w-0 flex justify-center lg:justify-start">
                  <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      width={453}
                      height={296}
                      className="w-full h-auto object-contain shadow-card-xl"
                      priority={activeIndex === 0}
                    />
                  </div>
                </div>

                {/* Content - Right side */}
                <div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-3 sm:gap-4 justify-center">
                  <Typography variant="h3" size="h4" className="text-dark">
                    {activeItem.title}
                  </Typography>
                  <Typography
                    size="p"
                    className="text-dark-400 leading-relaxed text-sm sm:text-base"
                  >
                    {activeItem.description.trim()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={`mobile-dot-${i}`}
                onClick={() => goTo(i, i > activeIndex ? "up" : "down")}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex}
              />
            ))}
          </div>
        )}

        {cta_title && (
          <div className="flex justify-center mt-10 sm:mt-12 md:mt-14">
            <Button href="/contact">{cta_title}</Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideInUp 0.8s ease-out both; }
        .animate-slide-down { animation: slideInDown 0.8s ease-out both; }
      `}</style>
    </section>
  );
}
