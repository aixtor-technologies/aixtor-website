"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type BulletItem = {
  title: string;
  description: string;
};

type DetailSection = {
  id: string;
  label: string;
  heading: string;
  items: BulletItem[];
};

type CaseStudyDetailProps = {
  data: {
    acf_fields: {
      detail_sections: DetailSection[];
    };
  };
};

// ─── BulletItem ───────────────────────────────────────────────────────────────

const BulletPoint = ({ title, description }: BulletItem) => (
  <li className="flex gap-3 mb-5 last:mb-0">
    {/* bullet dot */}
    <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary" />
    <div>
      <Typography
        variant="p"
        size="h6"
        className="font-semibold text-dark-400 leading-snug mb-1"
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        size="p"
        className="text-dark-400 leading-relaxed"
      >
        {description}
      </Typography>
    </div>
  </li>
);

// ─── CaseStudyDetail ──────────────────────────────────────────────────────────

const CaseStudyDetail = ({ data }: CaseStudyDetailProps) => {
  const sections = useMemo(
    () => data?.acf_fields?.detail_sections ?? [],
    [data?.acf_fields?.detail_sections]
  );
  const [activeId, setActiveId] = useState(() => sections[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Update active nav item based on scroll position
  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container">
        <div className="flex gap-8 lg:gap-16 relative">
          {/* ── Sticky left nav ── */}
          <aside className="hidden md:block w-44 lg:w-52 shrink-0">
            <div className="sticky top-24 flex flex-col border-l-2 border-gray-200">
              {sections.map(section => {
                const isActive = activeId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      relative text-left text-sm pl-5 pr-2 py-3
                      transition-colors duration-200
                      ${isActive ? "text-dark-400 font-bold" : "text-dark-300 font-normal hover:text-dark-400"}
                    `}
                  >
                    {/* Active indicator — overlaps the left border */}
                    {isActive && (
                      <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-primary" />
                    )}
                    <span className="flex items-center gap-2">
                      {section.label}
                      {isActive && <span className="text-dark-400">→</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Scrollable right content ── */}
          <div className="flex-1 min-w-0">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                ref={el => {
                  sectionRefs.current[section.id] = el;
                }}
                className={index < sections.length - 1 ? "mb-12 lg:mb-16" : ""}
              >
                {/* Section heading with gradient underline */}
                <Typography variant="h2" size="h3" isTitle className="mb-6">
                  {section.heading}
                </Typography>

                {/* Bullet list */}
                <ul className="mt-6">
                  {section.items.map(item => (
                    <BulletPoint key={item.title} {...item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetail;
