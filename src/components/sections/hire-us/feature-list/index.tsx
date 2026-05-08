"use client";

import Image from "next/image";
import { useState } from "react";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

type FeatureListProps = {
  title?: string;
  description?: string;
  cta_title?: string;
  cta_href?: string;
  features?: FeatureItem[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    title: "Headless APIs/Rest Web Services",
    description:
      "We craft flexible, scalable APIs for seamless integration across platforms.",
    icon: "/images/features/headless-api.svg",
  },
  {
    title: "OSGI",
    description:
      "Modular development at its finest. We harness OSGI for flexible and reusable Liferay solutions.",
    icon: "/images/features/osgi.svg",
  },
  {
    title: "Client Extension",
    description:
      "Add extra oomph to your Liferay portal with custom client extensions that elevate your user experience.",
    icon: "/images/features/client-extension.svg",
  },
];

// ─── FeatureRow ───────────────────────────────────────────────────────────────

const FeatureRow = ({
  item,
  isActive,
  onClick,
}: {
  item: FeatureItem;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-start gap-4 py-5 px-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 last:border-b-0 ${
      isActive ? "bg-white rounded-xl shadow-sm" : "hover:bg-white/60"
    }`}
  >
    {/* Icon */}
    <div className="w-14 h-14 shrink-0 flex items-center justify-center">
      <Image
        src={item.icon}
        alt={item.title}
        width={56}
        height={56}
        className="object-contain w-full h-full"
      />
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-dark-400 mb-1 leading-snug">
        {item.title}
      </p>
      <p className="text-xs text-dark-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  </div>
);

// ─── FeatureList ──────────────────────────────────────────────────────────────

const FeatureList = ({
  title = "Need Heading for this",
  description = "Design beautiful, dynamic content with Liferay's powerful templating features to deliver an engaging user experience.",
  cta_title = "Consult today!",
  cta_href = "/contact",
  features = DEFAULT_FEATURES,
}: FeatureListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="common-section bg-[#f4f4f6]">
      <div className="container">
        <Grid size="lg" className="items-center">
          {/* ── LEFT: heading + description + CTA ── */}
          <Grid.Col className="w-full md:w-5/12 lg:w-4/12">
            <Typography
              variant="h2"
              size="h3"
              isTitle
              className="text-dark-400 mb-4"
            >
              {title}
            </Typography>
            <Typography
              variant="p"
              size="p"
              className="text-dark-400 leading-relaxed mt-4 mb-6"
            >
              {description}
            </Typography>
            <Button href={cta_href} variant="outline">
              {cta_title}
            </Button>
          </Grid.Col>

          {/* ── RIGHT: feature rows + dot nav ── */}
          <Grid.Col className="w-full md:w-7/12 lg:w-8/12">
            <div className="flex gap-4 items-center">
              {/* Feature list */}
              <div className="flex-1 bg-transparent rounded-2xl overflow-hidden">
                {features.map((item, i) => (
                  <FeatureRow
                    key={item.title}
                    item={item}
                    isActive={activeIndex === i}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>

              {/* Dot navigation */}
              <div className="flex flex-col gap-2 shrink-0">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-3 h-3 bg-primary"
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default FeatureList;
