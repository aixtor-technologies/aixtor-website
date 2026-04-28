"use client";

import { useState } from "react";
import Typography from "@/components/ui/typography";
import IconChevronDown from "@/components/shared/icons/chevron-down";

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqItem = {
  title: string;
  description: string;
};

type FaqSectionData = {
  faq: FaqItem[];
};

type FaqSectionProps = {
  faq_section?: FaqSectionData;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqSection({ faq_section }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq_section?.faq?.length) return null;

  const { faq } = faq_section;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-10 lg:py-14 xl:py-16 bg-white">
      <div className="container">
        {/* ── Heading ── */}
        <div className="mb-10 lg:mb-14">
          <Typography
            variant="h2"
            size="h3"
            className="font-bold text-dark"
            isCenter
            isTitle
          >
            Frequently Asked Questions
          </Typography>
        </div>

        {/* ── Accordion ── */}
        <div className="max-w-3xl mx-auto border border-dark-300 rounded-xl overflow-hidden">
          {faq.map((item, i) => (
            <div key={i} className="border-b border-dark-300 last:border-b-0">
              {/* Question row */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <Typography size="p" className="font-medium text-dark">
                  {item.title.trim()}
                </Typography>

                {/* Chevron icon — rotates when open */}
                <span
                  className={`shrink-0 size-7 rounded-full border border-dark-300 flex items-center justify-center transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <span className="size-3.5">
                    <IconChevronDown />
                  </span>
                </span>
              </button>

              {/* Answer — expands on open */}
              {openIndex === i && (
                <div className="px-5 pb-4">
                  <div
                    className="text-sm text-dark-400 leading-relaxed [&_a]:text-primary [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
