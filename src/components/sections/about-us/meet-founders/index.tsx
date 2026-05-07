"use client";

import Image from "next/image";
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
  const { name, designation, description, image, linkedin_profile } = founders_section;

  return (
    <div className="founder-card group relative overflow-hidden cursor-pointer w-full sm:w-56 md:w-64 lg:w-72 transition-shadow duration-700 group-hover:shadow-card-xl">
      {/* Photo */}
      <div className="relative w-full aspect-3/4">
        <Image
          src={image || "/images/placeholder/placeholder.jpg"}
          alt={name || "founder-img"}
          width={336}
          height={387}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Default name tag — visible at rest, hidden on hover */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            px-4 py-3
            bg-white/20 backdrop-blur-sm
            transition-opacity duration-300
            group-hover:opacity-0
          "
        >
          <Typography variant="p" size="h6" className="text-dark-400 font-semibold">
            {name}
          </Typography>
          <Typography variant="p" size="p" className="text-dark-400 text-xs mt-0.5">
            {designation}
          </Typography>
        </div>
      </div>

      {/* Hover info card — slides up from bottom */}
      <div
        className="
          absolute inset-0
          flex flex-col justify-center
          bg-white
          px-6 py-8
          translate-y-full
          group-hover:translate-y-0
          transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]
        "
      >
        <Typography variant="p" size="h6" className="text-dark-400 font-bold text-lg leading-snug">
          {name}
        </Typography>
        <Typography variant="p" size="p" className="text-dark-400 text-sm mt-1 mb-4">
          {designation}
        </Typography>
        <Typography variant="p" size="p" className="text-dark-400 text-sm leading-relaxed">
          {description}
        </Typography>

        {linkedin_profile && (
          <a
            href={linkedin_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#0A66C2] hover:bg-[#004182] transition-colors duration-200"
            aria-label={`${name} on LinkedIn`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
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

      <div className="flex flex-col sm:flex-row gap-9 lg:gap-12 justify-center items-center sm:items-stretch">
        {founders.map((founder, i) => (
          <FounderCard key={i} {...founder} />
        ))}
      </div>
    </div>
  </section>
);

export default MeetFounders;
