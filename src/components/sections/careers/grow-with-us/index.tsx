"use client";

import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type JobOpening = {
  job_title: string;
  skills: string;
  experience: string;
  location: string;
  positions: string;
  qualifications: string;
  job_descriptions?: string | null;
};

type GrowSection = {
  heading: string;
  description: string;
  job_openings: JobOpening[];
};

type GrowWithUsProps = {
  grow_section?: GrowSection;
};

// ─── Meta item ────────────────────────────────────────────────────────────────

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 min-w-[80px]">
    <span className="text-xs text-dark-200">{label}</span>
    <span className="text-sm font-semibold text-dark-400">{value}</span>
  </div>
);

// ─── JobCard ──────────────────────────────────────────────────────────────────

const JobCard = ({ job }: { job: JobOpening }) => (
  <div className="border border-gray-200 rounded-2xl bg-white px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Typography variant="h3" size="h4" className="font-bold text-dark-400">
          {job.job_title}
        </Typography>
        <span className="hidden sm:block text-gray-300 text-lg">|</span>
        <span className="text-sm text-dark-400">{job.skills}</span>
      </div>

      <div className="flex flex-wrap gap-6">
        <Meta label="Experience" value={job.experience} />
        <Meta label="Location" value={job.location} />
        <Meta label="Positions" value={job.positions} />
        <Meta label="Qualification" value={job.qualifications} />
      </div>
    </div>
  </div>
);

// ─── GrowWithUs ───────────────────────────────────────────────────────────────

const GrowWithUs = ({ grow_section }: GrowWithUsProps) => {
  if (!grow_section) return null;

  const { heading, description, job_openings } = grow_section;

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-10">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {heading}
          </Typography>
          <Typography variant="p" size="p" className="text-dark-400 mt-4 max-w-2xl">
            {description}
          </Typography>
        </div>

        <div className="flex flex-col gap-4">
          {job_openings.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowWithUs;
