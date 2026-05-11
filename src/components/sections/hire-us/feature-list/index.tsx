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

const VISIBLE = 3;

// ─── FeatureRow ───────────────────────────────────────────────────────────────

const FeatureRow = ({ item }: { item: FeatureItem }) => (
  <div className="flex items-start gap-4 py-5 px-4 border-b border-gray-100 transition-colors duration-200 last:border-b-0 hover:bg-white/60 hover:rounded-xl">
    <div className="w-14 h-14 shrink-0 flex items-center justify-center">
      <Image
        src={item.icon}
        alt={item.title}
        width={56}
        height={56}
        className="object-contain w-full h-full"
      />
    </div>
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
  title,
  description,
  cta_title,
  cta_href = "/contact",
  features = [],
}: FeatureListProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState<1 | -1>(1);

  const hasSlider = features.length > VISIBLE;
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + VISIBLE < features.length;

  const navigate = (d: 1 | -1) => {
    setDir(d);
    setVisible(false);
    setTimeout(() => {
      setStartIndex(i => i + d);
      setVisible(true);
    }, 160);
  };

  const visibleFeatures = features.slice(startIndex, startIndex + VISIBLE);

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

          {/* ── RIGHT: feature rows + vertical nav ── */}
          <Grid.Col className="w-full md:w-7/12 lg:w-8/12">
            <div className="flex items-center gap-3">
              {/* Rows */}
              <div
                className="flex-1 bg-transparent rounded-2xl overflow-hidden"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateY(0)"
                    : `translateY(${dir * 10}px)`,
                  transition: "opacity 160ms ease, transform 160ms ease",
                }}
              >
                {visibleFeatures.map(item => (
                  <FeatureRow key={item.title} item={item} />
                ))}
              </div>

              {/* Vertical nav */}
              {hasSlider && (
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate(-1)}
                    disabled={!canGoUp}
                    aria-label="Previous"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200"
                  >
                    <Image
                      src="/images/icons/Chevron down.svg"
                      alt="Up"
                      width={100}
                      height={100}
                      className="rotate-180 w-3 h-auto"
                    />
                  </button>

                  {/* Dot indicators — one per row beyond the first 3 */}
                  <div className="flex flex-col gap-1.5">
                    {features.map((_, i) => (
                      <span
                        key={i}
                        className={`block rounded-full transition-all duration-300 ${
                          i >= startIndex && i < startIndex + VISIBLE
                            ? "w-2.5 h-2.5 from-primary to-secondary bg-linear-to-r"
                            : "w-2 h-2 bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    disabled={!canGoDown}
                    aria-label="Next"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200"
                  >
                    <Image
                      src="/images/icons/Chevron down.svg"
                      alt="Down"
                      width={12}
                      height={6}
                      className="w-3 h-auto"
                    />
                  </button>
                </div>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default FeatureList;
