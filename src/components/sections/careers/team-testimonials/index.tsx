"use client";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type TeamTestimonialsProps = {
  title?: string;
  testimonials?: Testimonial[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Empowering, inspiring, and full of opportunities for growth - Aixtor is more than just a workplace; it's a community where your ideas matter and your voice are heard. Aixtor feels like a family where everyone is empowering each other with their best, where people genuinely care about you, and where everyone is treated respectfully. With global client presence, I have had the opportunity to widen my horizons and learn something new everyday.",
    name: "Divyang Patel",
    role: "Senior Lead Consultant",
  },
  {
    quote:
      "I've been with this company for the past five years, and it's incredible how swiftly they've passed. The company culture here is exceptional, with every employee being incredibly supportive. No matter the situation, you never feel stuck because there's always someone willing to lend a hand.",
    name: "Aneri Modi",
    role: "Automation QA Engineer",
  },
  {
    quote:
      "Aixtor embodies the perfect balance of work and fun. From challenging projects to team outings, every day brings something new and exciting. It's truly a fantastic place to work. The co-founders are really encouraging and understanding whether it is anything professionally or personally. We truly have an employee-first policy. Here, we believe in leadership rather than managing people.",
    name: "Rajdip Vekariya",
    role: "Senior Java Developer",
  },
  {
    quote:
      "The growth opportunities here are massive! The co-workers and founders are very supportive and are always ready to lend a hand for help. We have many learning sessions together which really helps in upskilling. I have had many opportunities to represent the company at several Liferay tech meetups and it has helped me to widen my circle and boost my knowledge.",
    name: "Ravi Shah",
    role: "Liferay Developer",
  },
  {
    quote:
      "Working at Aixtor has been an incredible journey filled with opportunities for personal and professional development. The team culture is inclusive, and everyone is genuinely passionate about what they do. The co-founders are very supportive and are always leading the team for excellence. I have also had the opportunity to participate and represent Aixtor at many events where I get to meet like-minded people and grow my network.",
    name: "Priya Sharma",
    role: "Frontend Developer",
  },
  {
    quote:
      "Joined this company about a month ago. Grateful for the opportunity given, the support provided, and the time given to ease back into work. I appreciate the trust and flexibility offered to help me get up to speed and ready to contribute.",
    name: "Shradha Bafna",
    role: "Liferay Developer/JAVA Developer",
  },
];

// ─── TestimonialCard ──────────────────────────────────────────────────────────

const TestimonialCard = ({ quote, name, role }: Testimonial) => (
  <div className="border border-gray-200 bg-white shadow-card-lg p-6 flex flex-col justify-between gap-6 h-full">
    <Typography
      variant="p"
      size="p"
      className="text-dark-400 leading-relaxed text-justify"
    >
      {quote}
    </Typography>
    <div>
      <Typography variant="p" size="p" className="text-base font-bold text-dark-400">
        {name}
      </Typography>
      <Typography variant="p" size="p" className="text-sm text-dark-400 mt-0.5">
        {role}
      </Typography>
    </div>
  </div>
);

// ─── TeamTestimonials ─────────────────────────────────────────────────────────

const TeamTestimonials = ({
  title = "Hear What Our Team has to Share!",
  testimonials = DEFAULT_TESTIMONIALS,
}: TeamTestimonialsProps) => (
  <section className="common-section">
    <div className="container">
      {/* Heading */}
      <div className="flex flex-col items-center mb-10 lg:mb-14">
        <Typography variant="h2" size="h3" isTitle isCenter>
          {title}
        </Typography>
      </div>

      {/* 3-column grid */}
      <Grid size="lg">
        {testimonials.map(t => (
          <Grid.Col key={t.name} className="w-full md:w-1/3 mb-6 lg:mb-8">
            <TestimonialCard {...t} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  </section>
);

export default TeamTestimonials;
