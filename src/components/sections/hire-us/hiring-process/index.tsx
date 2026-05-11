"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type HiringStep = {
  step: number;
  title: string;
  description: string;
  circle_image: string;
};

type HiringProcessProps = {
  title?: string;
  steps?: HiringStep[];
  cta_title?: string;
  cta_href?: string;
};

// Vertical offset for each step to create the wave:
// steps 1,3,5 (index 0,2,4) sit LOW  → pushed down
// steps 2,4   (index 1,3)   sit HIGH → pushed up
const WAVE_OFFSET = [
  "mt-20", // step 1 — low
  "mt-0",  // step 2 — high
  "mt-20", // step 3 — low
  "mt-0",  // step 4 — high
  "mt-20", // step 5 — low
];

// ─── HiringProcess ────────────────────────────────────────────────────────────

const HiringProcess = ({
  title,
  steps = [],
  cta_title,
  cta_href = "/contact",
}: HiringProcessProps) => (
  <section className="common-section bg-white overflow-hidden">
    <div className="container">
      <div className="flex flex-col items-center mb-10 lg:mb-14">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
      </div>

      {/* ── Desktop wave layout ── */}
      <div className="hidden lg:flex items-start justify-between gap-0 relative">
        {steps.map((s, i) => {
          const isHigh = i % 2 !== 0;
          return (
            <div
              key={s.step}
              className={`flex flex-col items-center text-center flex-1 ${WAVE_OFFSET[i] ?? "mt-20"}`}
            >
              {isHigh && (
                <div className="mb-3 px-2 min-h-27.5 flex flex-col justify-end">
                  <p className="text-sm font-bold text-dark-400 leading-snug mb-1.5">
                    {s.title}
                  </p>
                  <p className="text-xs text-dark-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              )}

              <div className="relative w-36 h-36 xl:w-40 xl:h-40 shrink-0">
                <Image
                  src={s.circle_image}
                  alt={s.title}
                  fill
                  className="object-contain"
                />
              </div>

              {!isHigh && (
                <div className="mt-3 px-2 min-h-27.5">
                  <p className="text-sm font-bold text-dark-400 leading-snug mb-1.5">
                    {s.title}
                  </p>
                  <p className="text-xs text-dark-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical list ── */}
      <ol className="lg:hidden flex flex-col gap-6">
        {steps.map(s => (
          <li key={s.step} className="flex gap-4 items-start">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={s.circle_image}
                alt={s.title}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-dark-400 mb-1">{s.title}</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                {s.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center mt-10 lg:mt-14">
        <Button href={cta_href} variant="outline">
          {cta_title}
        </Button>
      </div>
    </div>
  </section>
);

export default HiringProcess;
