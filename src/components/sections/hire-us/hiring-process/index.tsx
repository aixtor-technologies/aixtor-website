"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type HiringStep = {
  step: number;
  title: string;
  description: string;
  circle_image: string; // individual circle image (dashed ring + icon)
};

type HiringProcessProps = {
  title?: string;
  steps?: HiringStep[];
  cta_title?: string;
  cta_href?: string;
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_STEPS: HiringStep[] = [
  {
    step: 1,
    title: "Share Your Requirements",
    description:
      "Tell us what you need. We'll listen carefully to your goals and understand exactly what you're looking for.",
    circle_image: "/images/icons/Share your requirements.png",
  },
  {
    step: 2,
    title: "Select the Best Profile from Our Talent Pool",
    description:
      "Choose from our in-house pool of skilled Liferay developers, handpicked for their expertise and experience.",
    circle_image: "/images/icons/Share your requirements.png",
  },
  {
    step: 3,
    title: "Conduct Developer Screening",
    description:
      "You can screen developers to ensure they meet your requirements for choosing the perfect fit.",
    circle_image: "/images/icons/Share your requirements.png",
  },
  {
    step: 4,
    title: "Choose the Engagement Model",
    description:
      "Pick the right engagement model that fits your project – whether it's dedicated, on-demand, or full-time.",
    circle_image: "/images/icons/Share your requirements.png",
  },
  {
    step: 5,
    title: "Sign Off and Onboard the Talent",
    description:
      "Once you are happy, sign the contract and get started with your expert Liferay developer onboard.",
    circle_image: "/images/icons/Share your requirements.png",
  },
];

// Vertical offset for each step to create the wave:
// steps 1,3,5 (index 0,2,4) sit LOW  → pushed down
// steps 2,4   (index 1,3)   sit HIGH → pushed up
const WAVE_OFFSET = [
  "mt-20", // step 1 — low
  "mt-0", // step 2 — high
  "mt-20", // step 3 — low
  "mt-0", // step 4 — high
  "mt-20", // step 5 — low
];

// ─── HiringProcess ────────────────────────────────────────────────────────────

const HiringProcess = ({
  title = "Our Simple and Effective Hiring Process",
  steps = DEFAULT_STEPS,
  cta_title = "Contact us today",
  cta_href = "/contact",
}: HiringProcessProps) => (
  <section className="common-section bg-white overflow-hidden">
    <div className="container">
      {/* Heading */}
      <div className="flex flex-col items-center mb-10 lg:mb-14">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
      </div>

      {/* ── Desktop wave layout ── */}
      <div className="hidden lg:flex items-start justify-between gap-0 relative">
        {steps.map((s, i) => {
          const isHigh = i % 2 !== 0; // steps 2,4 sit high → text above, circle lower
          return (
            <div
              key={s.step}
              className={`flex flex-col items-center text-center flex-1 ${WAVE_OFFSET[i]}`}
            >
              {/* Text ABOVE for high steps (2,4) */}
              {isHigh && (
                <div className="mb-3 px-2 min-h-[110px] flex flex-col justify-end">
                  <p className="text-sm font-bold text-dark-400 leading-snug mb-1.5">
                    {s.title}
                  </p>
                  <p className="text-xs text-dark-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              )}

              {/* Circle image */}
              <div className="relative w-36 h-36 xl:w-40 xl:h-40 shrink-0">
                <Image
                  src={s.circle_image}
                  alt={s.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text BELOW for low steps (1,3,5) */}
              {!isHigh && (
                <div className="mt-3 px-2 min-h-[110px]">
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

      {/* CTA */}
      <div className="flex justify-center mt-10 lg:mt-14">
        <Button href={cta_href} variant="outline">
          {cta_title}
        </Button>
      </div>
    </div>
  </section>
);

export default HiringProcess;
