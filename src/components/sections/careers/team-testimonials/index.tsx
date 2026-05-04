"use client";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type TeamComment = {
  employee_name: string;
  employee_designation: string;
  comment: string;
};

type TeamCommentsData = {
  heading: string;
  team_comment: TeamComment[];
};

type TeamTestimonialsProps = {
  team_comments?: TeamCommentsData;
};

// ─── TestimonialCard ──────────────────────────────────────────────────────────

const TestimonialCard = ({ comment, employee_name, employee_designation }: TeamComment) => (
  <div className="border border-gray-200 bg-white shadow-card-lg p-6 flex flex-col justify-between gap-6 h-full">
    <Typography
      variant="p"
      size="p"
      className="text-dark-400 leading-relaxed text-justify"
    >
      {comment}
    </Typography>
    <div>
      <Typography variant="p" size="p" className="text-base font-bold text-dark-400">
        {employee_name}
      </Typography>
      <Typography variant="p" size="p" className="text-sm text-dark-400 mt-0.5">
        {employee_designation}
      </Typography>
    </div>
  </div>
);

// ─── TeamTestimonials ─────────────────────────────────────────────────────────

const TeamTestimonials = ({ team_comments }: TeamTestimonialsProps) => {
  if (!team_comments) return null;

  const { heading, team_comment } = team_comments;

  return (
    <section className="common-section">
      <div className="container">
        <div className="flex flex-col items-center mb-10 lg:mb-14">
          <Typography variant="h2" size="h3" isTitle isCenter>
            {heading}
          </Typography>
        </div>

        <Grid size="lg">
          {team_comment.map((t, i) => (
            <Grid.Col key={i} className="w-full md:w-1/3 mb-6 lg:mb-8">
              <TestimonialCard {...t} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default TeamTestimonials;
