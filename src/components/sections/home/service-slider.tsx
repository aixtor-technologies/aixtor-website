"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import IconRight from "@/components/shared/icons/right";
import IconLeft from "@/components/shared/icons/left";

type Service = {
  title: string;
  description: string;
  image: string;
};

type ServicesSliderProps = {
  services: Service[];
};

export default function ServicesSlider({ services }: ServicesSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const threshold = 2;

    setCanScrollPrev(container.scrollLeft > threshold);
    setCanScrollNext(container.scrollLeft < maxScrollLeft - threshold);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [services, updateScrollState]);

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "prev" | "next") => {
    const container = sliderRef.current;
    if (!container) return;

    const firstSlide = container.firstElementChild as HTMLElement | null;
    let scrollAmount = container.offsetWidth * 0.8;

    if (firstSlide) {
      scrollAmount = firstSlide.getBoundingClientRect().width + 16;
    }

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative">
      {/* Slider */}
      <div
        ref={sliderRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          scrollbar-hide [&::-webkit-scrollbar]:hidden
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="
              snap-start shrink-0
              w-[85%] sm:w-[60%] lg:w-[33.33%]
            "
          >
            <div className="gradient-card border px-4 md:px-6 py-6 md:py-8 rounded shadow-card h-full">
              <Image
                src={service.image}
                alt={service.title}
                width={60}
                height={60}
                className="mb-6"
              />

              <Typography
                variant="h3"
                size="h5"
                className="mb-2 font-semibold"
              >
                {service.title}
              </Typography>

              <Typography variant="p" size="p">
                {service.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="w-full absolute top-1/2 -transform-y-1/2 flex justify-between gap-4">
        <button
          onClick={() => scroll("prev")}
          disabled={!canScrollPrev}
          aria-label="Previous service"
          className="size-10 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconLeft />
        </button>

        <button
          onClick={() => scroll("next")}
          disabled={!canScrollNext}
          aria-label="Next service"
          className="size-10 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconRight />
        </button>
      </div>
    </div>
  );
}
