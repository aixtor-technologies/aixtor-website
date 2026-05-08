"use client";

import { useState } from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type TechItem = {
  name: string;
  logo: string;
};

type TechTab = {
  label: string;
  items: TechItem[];
};

type TechnologiesTabsProps = {
  title?: string;
  tabs?: TechTab[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_TABS: TechTab[] = [
  {
    label: "UI",
    items: [
      { name: "HTML5", logo: "/images/AX-logo.svg" },
      { name: "CSS3", logo: "/images/AX-logo.svg" },
      { name: "React", logo: "/images/AX-logo.svg" },
      { name: "Bootstrap", logo: "/images/AX-logo.svg" },
    ],
  },
  {
    label: "Framework",
    items: [
      { name: "Next.js", logo: "/images/AX-logo.svg" },
      { name: "Spring Boot", logo: "/images/AX-logo.svg" },
      { name: "Node.js", logo: "/images/AX-logo.svg" },
      { name: "Angular", logo: "/images/AX-logo.svg" },
    ],
  },
  {
    label: "Hosting",
    items: [
      { name: "AWS", logo: "/images/AX-logo.svg" },
      { name: "Azure", logo: "/images/AX-logo.svg" },
      { name: "GCP", logo: "/images/AX-logo.svg" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MySQL", logo: "/images/AX-logo.svg" },
      { name: "PostgreSQL", logo: "/images/AX-logo.svg" },
      { name: "MongoDB", logo: "/images/AX-logo.svg" },
    ],
  },
  {
    label: "Search",
    items: [
      { name: "Elasticsearch", logo: "/images/AX-logo.svg" },
      { name: "Solr", logo: "/images/AX-logo.svg" },
    ],
  },
];

// ─── TechnologiesTabs ─────────────────────────────────────────────────────────

const TechnologiesTabs = ({
  title = "Technologies",
  tabs = DEFAULT_TABS,
}: TechnologiesTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  return (
    <section className="common-section bg-white">
      <div className="container">
        {/* Heading */}
        <div className="flex flex-col items-center mb-8 lg:mb-10">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {title}
          </Typography>
        </div>

        {/* Tab bar */}
        <div className="border-b border-gray-200 mb-8 overflow-x-auto">
          <div className="flex gap-0 justify-center">
            {tabs.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveIndex(i)}
                  className={`
                    relative px-5 py-3 text-sm font-medium transition-colors duration-200
                    ${isActive ? "text-dark-400" : "text-dark-300 hover:text-dark-400"}
                  `}
                >
                  {tab.label}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo grid */}
        <div className="flex flex-wrap gap-8 lg:gap-12 items-center justify-center">
          {activeTab.items.map(item => (
            <div key={item.name} className="flex items-center justify-center">
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={80}
                className="object-contain h-14 w-auto max-w-30"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesTabs;
