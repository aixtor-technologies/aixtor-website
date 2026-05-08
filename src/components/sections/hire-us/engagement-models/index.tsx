"use client";

import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type EngagementModel = {
  title: string;
  icon: string;
  features: string[];
  cta_title?: string;
  cta_href?: string;
};

type EngagementModelsProps = {
  title?: string;
  models?: EngagementModel[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_MODELS: EngagementModel[] = [
  {
    title: "Dedicated Engagaement",
    icon: "/images/engagement/dedicated.svg",
    features: [
      "Full-time availability",
      "8 hours a day, 5 days a week",
      "160 hours/month",
      "Flexible 30-day billing cycle",
      "Fast and seamless onboarding",
    ],
    cta_title: "Hire Now",
    cta_href: "/contact",
  },
  {
    title: "Flexible Collaboration",
    icon: "/images/engagement/flexible.svg",
    features: [
      "Part-time availability",
      "4 hours a day, 5 days a week",
      "80 hours/month",
      "Flexible 30-day billing cycle",
      "Smooth onboarding in just one week",
    ],
    cta_title: "Hire Now",
    cta_href: "/contact",
  },
  {
    title: "Ad-Hoc Expertise",
    icon: "/images/engagement/adhoc.svg",
    features: [
      "On-demand, tailored availability",
      "Flexible hours based on project needs",
      "Total hours vary by scope",
      "30-day billing cycle",
      "Quick onboarding as needed",
    ],
    cta_title: "Hire Now",
    cta_href: "/contact",
  },
];
// ─── ModelCard ────────────────────────────────────────────────────────────────

const ModelCard = ({
  title,
  icon,
  features,
  cta_title,
  cta_href,
}: EngagementModel) => (
  <div className="h-full border border-gray-200 rounded-2xl bg-white flex flex-col px-6 pt-6 pb-7 gap-6">
    {/* Title with gradient underline — underline matches text width */}
    <div className="flex flex-col items-center">
      <div className="inline-block">
        <Typography
          variant="h3"
          size="h5"
          className="font-bold text-dark-400 text-center"
        >
          {title}
        </Typography>
        <div className="h-0.5 w-full bg-linear-to-r from-primary to-secondary mt-2" />
      </div>
    </div>

    {/* Icon */}
    <div className="flex justify-center">
      <Image
        src={icon}
        alt={title}
        width={80}
        height={80}
        className="object-contain w-16 h-16 md:w-20 md:h-20"
      />
    </div>

    {/* Feature list */}
    <ul className="flex flex-col gap-3 flex-1">
      {features.map(f => (
        <li key={f} className="flex items-start gap-2.5">
          <Image
            src="/images/icons/Group.svg"
            alt="Check"
            width={18}
            height={18}
            className="w-5 h-5 shrink-0 text-primary mt-0.5"
          />
          <Typography className=" text-dark-400 leading-snug">{f}</Typography>
        </li>
      ))}
    </ul>

    {/* CTA */}
    {cta_title && (
      <div className="flex justify-center pt-2">
        <Button href={cta_href ?? "/contact"} variant="default">
          {cta_title}
        </Button>
      </div>
    )}
  </div>
);

// ─── EngagementModels ─────────────────────────────────────────────────────────

const EngagementModels = ({
  title = "Engagement Models That Fit Your Needs",
  models = DEFAULT_MODELS,
}: EngagementModelsProps) => (
  <section className="common-section bg-[#f4f4f6]">
    <div className="container">
      {/* Heading */}
      <div className="flex flex-col items-center mb-10 lg:mb-14">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
      </div>

      {/* Cards */}
      <Grid size="lg">
        {models.map(model => (
          <Grid.Col key={model.title} className="w-full md:w-1/3 mb-6 md:mb-0">
            <ModelCard {...model} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  </section>
);

export default EngagementModels;
