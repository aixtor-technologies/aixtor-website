"use client";

import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Job = {
  title: string;
  skills: string;
  experience: string;
  location: string;
  positions: number;
  qualification: string;
  detail_url: string;
  apply_url: string;
};

type GrowWithUsProps = {
  title?: string;
  description?: string;
  jobs?: Job[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_JOBS: Job[] = [
  {
    title: "Liferay Developer",
    skills: "Liferay DXP 7.x, Java, J2EE, Spring and Hibernate",
    experience: "1 - 5 Years",
    location: "Ahmedabad",
    positions: 3,
    qualification: "Graduate/B.E/B.Tech/MCA",
    detail_url: "/careers/liferay-developer",
    apply_url: "/careers/liferay-developer/apply",
  },
  {
    title: "Full Stack Developer",
    skills: "NodeJS, ReactJS, JQuery or JavaScript, Java or Spring",
    experience: "4+ years",
    location: "Ahmedabad",
    positions: 1,
    qualification: "Graduate/B.E/B.Tech/BCA/MCA",
    detail_url: "/careers/full-stack-developer",
    apply_url: "/careers/full-stack-developer/apply",
  },
];

// ─── Meta item ────────────────────────────────────────────────────────────────

const Meta = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-0.5 min-w-[80px]">
    <span className="text-xs text-dark-200">{label}</span>
    <span className="text-sm font-semibold text-dark-400">{value}</span>
  </div>
);

// ─── JobCard ──────────────────────────────────────────────────────────────────

const JobCard = ({ job }: { job: Job }) => (
  <div className="border border-gray-200 rounded-2xl bg-white px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
    {/* ── Left: job info ── */}
    <div className="flex-1 min-w-0">
      {/* Title + skills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Typography variant="h3" size="h4" className="font-bold text-dark-400">
          {job.title}
        </Typography>
        <span className="hidden sm:block text-gray-300 text-lg">|</span>
        <span className="text-sm text-dark-300">{job.skills}</span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-6">
        <Meta label="Experience" value={job.experience} />
        <Meta label="Location" value={job.location} />
        <Meta label="Positions" value={job.positions} />
        <Meta label="Qualification" value={job.qualification} />
      </div>
    </div>

    {/* ── Right: actions ── */}
    <div className="flex sm:flex-col gap-3 shrink-0">
      <Button
        href={job.detail_url}
        className="!bg-pink-100 !text-primary !border-transparent hover:!bg-pink-200 text-sm"
      >
        View details
      </Button>
      <Button href={job.apply_url} variant="outline" className="text-sm">
        Apply Now
      </Button>
    </div>
  </div>
);

// ─── GrowWithUs ───────────────────────────────────────────────────────────────

const GrowWithUs = ({
  title = "Grow With Us",
  description = "Join Aixtor, where innovation meets opportunity. Embark on a journey of growth, collaboration, and endless possibilities.",
  jobs = DEFAULT_JOBS,
}: GrowWithUsProps) => (
  <section className="common-section bg-white">
    <div className="container">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
        <Typography
          variant="p"
          size="p"
          className="text-dark-300 mt-4 max-w-2xl"
        >
          {description}
        </Typography>
      </div>

      {/* Job listings */}
      <div className="flex flex-col gap-4">
        {jobs.map(job => (
          <JobCard key={job.title} job={job} />
        ))}
      </div>
    </div>
  </section>
);

export default GrowWithUs;
