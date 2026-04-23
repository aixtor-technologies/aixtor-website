"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type Reason = {
  reason: string;
};

type WhyChooseAixtorSection = {
  heading: string;
  cta_title: string;
  reasons: Reason[];
};

type Props = {
  why_choose_aixtor_section?: WhyChooseAixtorSection;
};

// ✅ Reusable Pill Component
const Pill = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => (
  <div
    className={`bg-white px-4 py-3 rounded-full shadow-md text-sm font-medium text-dark text-center ${className}`}
  >
    {text}
  </div>
);

export default function WhyChooseAixtor({ why_choose_aixtor_section }: Props) {
  if (!why_choose_aixtor_section?.reasons?.length) return null;

  const { heading, cta_title, reasons } = why_choose_aixtor_section;

  const total = reasons.length;
  const itemsPerSide = Math.ceil(total / 2);

  const START_ANGLE = -70;
  const END_ANGLE = 70;

  const radiusX = 360;
  const radiusY = 220;

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container">
        {/* Heading */}
        {heading && (
          <Typography
            variant="h2"
            size="h3"
            className="font-bold text-dark-400 mb-14 md:mb-20"
            isTitle
            isCenter
          >
            {heading.trim()}
          </Typography>
        )}

        {/* ───────────── Desktop Layout ───────────── */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center h-130 xl:h-150">
            {/* Rings */}
            <div className="absolute w-130 h-130 xl:w-155 xl:h-155 rounded-full border border-gray-400 opacity-10" />
            <div className="absolute w-105 h-105 xl:w-125 xl:h-125 rounded-full border border-gray-400 opacity-20" />
            <div className="absolute w-[320px] h-80 xl:w-95 xl:h-95 rounded-full border border-gray-400 opacity-40" />
            <div className="absolute w-55 h-55 xl:w-65 xl:h-65 rounded-full border border-gray-500 opacity-70" />

            {/* Center Logo */}
            <div className="absolute z-10 size-28 xl:size-32 bg-white rounded-2xl shadow-card-xl flex items-center justify-center">
              <Image
                src="/images/AX-logo.svg"
                alt="Aixtor"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>

            {/* Pills */}
            {reasons.map((item, i) => {
              const isLeft = i < total / 2;
              const sideIndex = isLeft ? i : i - itemsPerSide;

              const angle =
                START_ANGLE +
                (sideIndex / Math.max(itemsPerSide - 1, 1)) *
                  (END_ANGLE - START_ANGLE);

              const rad = (angle * Math.PI) / 180;

              const x = (isLeft ? -1 : 1) * radiusX * Math.cos(rad);
              const y = radiusY * Math.sin(rad);

              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <Pill
                    text={item.reason}
                    className="xl:text-base min-w-45 xl:min-w-55"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────── Tablet Layout ───────────── */}
        <div className="hidden sm:flex lg:hidden flex-col items-center gap-10">
          <div className="size-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Image
              src="/images/AX-logo.svg"
              alt="Aixtor"
              width={40}
              height={40}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {reasons.map((item, i) => (
              <Pill key={i} text={item.reason} />
            ))}
          </div>
        </div>

        {/* ───────────── Mobile Layout ───────────── */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          <div className="size-20 bg-white rounded-2xl shadow-card-lg flex items-center justify-center">
            <Image
              src="/images/AX-logo.svg"
              alt="Aixtor"
              width={48}
              height={48}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
            {reasons.map((item, i) => (
              <Pill key={i} text={item.reason} />
            ))}
          </div>
        </div>

        {/* CTA */}
        {cta_title && (
          <div className="flex justify-center mt-12 md:mt-16">
            <Button href="/contact">{cta_title}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
