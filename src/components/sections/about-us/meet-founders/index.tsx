"use client";

import Image from "next/image";
import { useState } from "react";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type FounderSection = {
  name: string;
  designation: string;
  description: string;
  image: string;
  linkedin_profile: string | null;
};

type FounderItem = {
  founders_section: FounderSection;
};

type MeetFoundersProps = {
  founders: FounderItem[];
};

// ─── FounderCard ──────────────────────────────────────────────────────────────

const FounderCard = ({ founders_section }: FounderItem) => {
  const { name, designation, description, image, linkedin_profile } =
    founders_section;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="founder-card group relative overflow-hidden cursor-pointer w-full sm:w-56 md:w-64 lg:w-72 transition-shadow duration-700 hover:shadow-card-xl"
      onClick={() => setIsOpen((o: boolean) => !o)}
    >
      {/* Photo */}
      <div className="relative w-full aspect-3/4 overflow-hidden">
        <Image
          src={image || "/images/placeholder/placeholder.jpg"}
          alt={name || "founder-img"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          className={`object-cover object-top transition-transform duration-700 group-hover:scale-105 ${isOpen ? "scale-105" : ""}`}
        />

        {/* Default name tag — overlaps photo, hidden on hover/tap */}
        <div className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 group-hover:opacity-0 ${isOpen ? "opacity-0" : ""}`}>
          <div className="border border-white/70 rounded-xl px-4 py-3 bg-black/30 backdrop-blur-sm">
            <Typography
              variant="p"
              size="h6"
              className="text-white font-semibold leading-snug"
            >
              {name}
            </Typography>
            <Typography
              variant="p"
              size="p"
              className="text-white/80 text-xs mt-0.5"
            >
              {designation}
            </Typography>
          </div>
        </div>
      </div>

      {/* Info card — slides up on hover (desktop) or tap (mobile) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center bg-white px-3 py-4 sm:px-6 sm:py-8 overflow-y-auto transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <Typography
          variant="p"
          size="h6"
          className="text-dark-400 font-bold text-sm sm:text-lg leading-snug"
        >
          {name}
        </Typography>
        <Typography
          variant="p"
          size="p"
          className="text-dark-400 text-xs sm:text-sm mt-0.5 mb-2 sm:mb-4"
        >
          {designation}
        </Typography>
        <Typography
          variant="p"
          size="p"
          className="text-dark-400 text-xs sm:text-sm leading-relaxed line-clamp-5 sm:line-clamp-none"
        >
          {description}
        </Typography>

        {linkedin_profile && (
          <a href={linkedin_profile} target="_blank" rel="noopener noreferrer" className="mt-3 sm:mt-6">
            <Image
              src="/images/Linkedin.svg"
              alt="LinkedIn"
              width={35}
              height={35}
              className="opacity-80"
            />
          </a>
        )}
      </div>
    </div>
  );
};

// ─── MeetFounders ─────────────────────────────────────────────────────────────

const MeetFounders = ({ founders }: MeetFoundersProps) => (
  <section className="common-section">
    <div className="container">
      <div className="flex flex-col items-center mb-10">
        <Typography variant="h2" size="h3" isTitle isCenter>
          Meet the Founders
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:flex-wrap sm:gap-9 lg:gap-12 sm:justify-center sm:items-stretch">
        {founders.map((founder, i) => (
          <FounderCard key={i} {...founder} />
        ))}
      </div>
    </div>
  </section>
);

export default MeetFounders;
