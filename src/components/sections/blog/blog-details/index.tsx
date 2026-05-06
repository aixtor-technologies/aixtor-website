"use client";

import Image from "next/image";
import { useState } from "react";
import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";

// ─── Types ────────────────────────────────────────────────────────────────────

type RecentBlog = {
  id: number;
  title: string;
  image: string;
  slug: string;
};

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "heading4"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: { title: string; description: string }[] }
  | { type: "bold_bullets"; items: { title: string; description?: string }[] };

type BlogDetailData = {
  content_blocks: ContentBlock[];
  recent_blogs: RecentBlog[];
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const BLOG_DATA: BlogDetailData = {
  recent_blogs: [
    {
      id: 1,
      title:
        "Digital DSA Onboarding for NBFCs: Streamlining Agent KYC, Verification, and Activation",
      image: "/images/blogs/blog1.jpg",
      slug: "digital-dsa-onboarding-nbfcs",
    },
    {
      id: 2,
      title:
        "Overcoming Dealer and Vendor Management Challenges in Manufacturing with Digital Portals",
      image: "/images/blogs/blog2.jpg",
      slug: "dealer-vendor-management",
    },
    {
      id: 3,
      title:
        "Top 10 Challenges Companies Face in Liferay Upgrades And How to Solve Them",
      image: "/images/blogs/blog3.jpg",
      slug: "liferay-upgrade-challenges",
    },
    {
      id: 4,
      title:
        "Benefits of Liferay Headless CMS: 7 Reasons Enterprises Are Going Headless",
      image: "/images/blogs/blog4.jpg",
      slug: "liferay-headless-cms",
    },
    {
      id: 5,
      title:
        "Liferay 7.4 DXP Upgrade: Key Risks and Best Practices for Enterprises",
      image: "/images/blogs/blog5.jpg",
      slug: "liferay-dxp-upgrade",
    },
  ],
  content_blocks: [
    {
      type: "paragraph",
      text: "Imagine this: your NBFC just partnered with a high-potential DSA who can bring in multiple quality leads every month. But onboarding them takes 9 days. Stacks of photocopied documents, a WhatsApp message with a blurry PAN card image, an email chain that spans three departments, forms go back and forth, and by the time your firm is done with all the paperwork, the DSA has already started working with your competitor.",
    },
    { type: "paragraph", text: "That's the reality many NBFCs still face." },
    {
      type: "paragraph",
      text: "That's where digital DSA onboarding changes everything. A purpose-built digital onboarding portal for NBFCs transforms the entire agent lifecycle, from registration to activation, with built-in KYC compliance automation, intelligent workflows, and real-time tracking. The result? Faster agent activation, fewer compliance gaps, and a significantly better experience for everyone involved.",
    },
    {
      type: "paragraph",
      text: "This blog walks you through everything you need to know about digital DSA onboarding, the challenges, the step-by-step process, the technology stack, and the business point of view for making the shift.",
    },
    { type: "heading2", text: "Challenges in Traditional Agent Onboarding" },
    {
      type: "paragraph",
      text: "Before diving into solutions, let's look at what can be fixed.",
    },
    {
      type: "image",
      src: "/images/blogs/challenges-infographic.png",
      alt: "Challenges of Manually Onboarding an Agent",
    },
    {
      type: "numbered",
      items: [{ title: "Paper-Based Documentation Delays", description: "" }],
    },
    {
      type: "bullets",
      items: [
        "Physical forms, scanned copies, courier dependencies",
        "Missing or incorrect documents lead to repeated follow-ups",
        "No standardization across agents",
      ],
    },
    {
      type: "numbered",
      items: [{ title: "Manual KYC Verification Risks", description: "" }],
    },
    {
      type: "bullets",
      items: [
        "Human errors in verifying PAN, Aadhaar, or bank details",
        "Increased chances of fraud or compliance gaps",
        "No real-time validation",
      ],
    },
    {
      type: "numbered",
      items: [{ title: "Lack of Transparency and Tracking", description: "" }],
    },
    {
      type: "bullets",
      items: [
        "Agents have no visibility into their application status",
        "Internal teams rely on emails or spreadsheets",
        "No centralized tracking system",
      ],
    },
    {
      type: "numbered",
      items: [{ title: "Compliance and Audit Challenges", description: "" }],
    },
    {
      type: "bullets",
      items: [
        "Difficulty maintaining audit trails",
        "Regulatory risks due to incomplete or inconsistent data",
        "Time-consuming audits",
      ],
    },
    { type: "heading2", text: "What is a Digital DSA Onboarding Portal?" },
    {
      type: "paragraph",
      text: "A digital onboarding portal is a centralized, web-based platform that manages the entire lifecycle of agent onboarding, from initial registration and document collection to KYC for verification, agreement signing, and final activation.",
    },
    {
      type: "paragraph",
      text: "Think of it as the operational backbone for your agent network. Instead of scattered spreadsheets, email threads, and manual checklists, everything lives in one place, structured, trackable, and auditable.",
    },
    {
      type: "image",
      src: "/images/blogs/dsa-portal-infographic.png",
      alt: "What is a Digital DSA Onboarding Portal?",
    },
    {
      type: "bold_bullets",
      items: [
        {
          title: "What it does:",
          description:
            "Automates manual processes with guided digital workflows; Automates KYC compliance using APIs; Enables real-time tracking for both agents and internal teams; Ensures document handling and audit readiness",
        },
        {
          title: "Why it matters:",
          description:
            "Instead of chasing documents and approvals, your internal team focuses on onboarding more agents, faster and smarter.",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Key capabilities of a modern enterprise NBFC onboarding solution include:",
    },
    {
      type: "bullets",
      items: [
        "Structured digital application forms for individual and business agents",
        "Automated agreement generation and Aadhaar-based eSigning",
        "Multi-level internal approval workflows",
        "Real-time dashboards and status tracking",
        "Secure document storage with complete audit trails",
        "CRM and backend system integration for seamless business activation",
        "API-based identity and document verification (Aadhaar eKYC, PAN, bank account, GST)",
        "AI-powered analysis and onboarding recommendations",
      ],
    },
    {
      type: "paragraph",
      text: "When agents experience a smooth, professional onboarding process, it signals that the NBFC is organized, trustworthy, and worth working with. First impressions matter.",
    },
    {
      type: "heading2",
      text: "End-to-End DSA Onboarding Process Flow (Step-by-Step)",
    },
    {
      type: "paragraph",
      text: "Let's break down how a modern digital onboarding platform works in practice.",
    },
    {
      type: "image",
      src: "/images/blogs/process-flow-infographic.png",
      alt: "End-to-End DSA Onboarding Process Flow",
    },
    {
      type: "numbered",
      items: [
        {
          title: "Registration & Authentication",
          description:
            "Agent submits basic details like name, number, email, and agent type (Individual or business). OTP sent to registered mobile/email for verification. Unique Application ID generated upon successful authentication; this becomes the tracking reference for the entire journey.",
        },
        {
          title: "AI-Powered Conversation Analysis & Onboarding Recommendation",
          description:
            "During or after your call with a DSA, you need to upload the notes or transcriptions of the call and the AI will summarize the conversation and extract key insights like experience, product knowledge, geographic focus, communication quality, contacts they have in the industry, and maps them against your onboarding criteria. It then combines this with the document verification status to give you a consolidated recommendation on whether the DSA is the right fit.",
        },
        {
          title: "Profile & KYC Document Upload",
          description:
            "Moving ahead, agents complete their profile and upload all required documents in one go. The system validates everything in real time, so nothing slips through the cracks.",
        },
        {
          title: "Verification & Validation (API-Based)",
          description:
            "This is where a digital onboarding platform truly earns its value. Rather than manual cross-checking, the platform uses live API integrations (India Stack) to verify every critical data point.",
        },
        {
          title: "Agreement Generation & eSign",
          description:
            "DSA agreement auto generated using pre-configured templates, populated with verified agent details. Agent completes Aadhaar-based eSigning, legally valid under the IT Act. No printing, courier, or physical signatures required.",
        },
        {
          title: "Internal Review & Approval Workflow",
          description:
            "Application routed to the right reviewers: operations, compliance, business teams, via configurable multi-level workflow. Reviewers can approve, reject, or request additional information. Every action is logged and timestamped for a complete audit trail.",
        },
        {
          title: "Agent Activation",
          description:
            "Once approved, the platform takes care of the rest automatically: Unique Agent ID generated. Agent profile synced to CRM / Loan Origination System. Portal access provisioned with login credentials. Activation confirmation sent via SMS and email.",
        },
      ],
    },
    {
      type: "heading2",
      text: "Key Features of a Digital DSA Onboarding Platform",
    },
    {
      type: "paragraph",
      text: "A strong digital onboarding compliance automation solution typically includes:",
    },
    {
      type: "bullets",
      items: [
        "Role-based workflows for internal teams",
        "AI-powered document analysis, and onboarding recommendations",
        "API-Based Verification Integrations",
        "Document Management System (DMS) for secure storage",
        "Real-time dashboards for tracking onboarding status",
        "Audit trails & compliance logs for regulatory needs",
      ],
    },
    { type: "heading2", text: "Benefits of Digital Onboarding for NBFCs" },
    { type: "heading3", text: "Faster Agent Activation" },
    { type: "heading2", text: "How to Build a Scalable DSA Onboarding Portal" },
    {
      type: "image",
      src: "/images/blogs/scalable-portal-infographic.png",
      alt: "How to Build a Scalable DSA Onboarding Portal",
    },
    { type: "heading3", text: "Choose the Right Platform" },
    {
      type: "paragraph",
      text: "Enterprise Digital Experience Platforms (DXPs) like Liferay provide the foundational infrastructure, user management, workflow engines, document handling, and integration frameworks, that reduce development time significantly. Building on a proven platform also ensures scalability and long-term maintainability.",
    },
    { type: "heading3", text: "Ensure Security & Compliance" },
    {
      type: "paragraph",
      text: "Data privacy is non-negotiable. The platform must comply with RBI's data localization requirements, implement end-to-end encryption, and maintain role-based access controls. All PII like Aadhaar numbers, PAN, bank details — must be stored and transmitted securely.",
    },
    { type: "heading3", text: "Design User-Friendly Workflows" },
    {
      type: "paragraph",
      text: "The best compliance tool is one that agents complete. Invest in UX design, clear progress indicators, contextual help text, mobile responsiveness, and minimal friction at every step. Dropout rates drop dramatically when the experience is intuitive.",
    },
    { type: "heading3", text: "Enable Integration with CRM & Backend Systems" },
    {
      type: "paragraph",
      text: "The onboarding portal should not be a standalone island. Deep integration with your CRM, Loan Origination System, and internal ERP ensures that agent data flows automatically, eliminating duplicate data entry and enabling faster activation.",
    },
    {
      type: "paragraph",
      text: "Ready to modernize your DSA onboarding process? Book a Free Consultation with our NBFC digital transformation experts and see how a custom onboarding portal can reduce your agent activation time by up to 80%.",
    },
    {
      type: "heading2",
      text: "Conclusion: The Future of Agent Onboarding in NBFCs",
    },
    {
      type: "paragraph",
      text: "Agents choose partners that make their lives easier. Regulators expect digital compliance trails. And growth demands scalability that manual processes simply cannot support. All these make digital DSA onboarding an operational imperative. The combination of NBFC KYC compliance automation, intelligent approval workflows, and seamless eSigning creates an onboarding experience that is faster, more accurate, and fully audit ready.",
    },
    {
      type: "paragraph",
      text: "And the future is even more exciting. The non-negotiable feature is going to be AI-powered agent onboarding, systems that verify identity along with assessing agent quality, predict performance based on geo and experience data, and personalize the onboarding journey accordingly.",
    },
    {
      type: "paragraph",
      text: "Speed and compliance are no longer a tradeoff. With the right digital onboarding platform, you get both.",
    },
    {
      type: "paragraph",
      text: "Stop losing valuable partners due to slow onboarding.",
    },
    {
      type: "paragraph",
      text: "Contact us today and let's build a smarter, faster onboarding experience for your NBFC.",
    },
  ],
};

// ─── Content Renderers ────────────────────────────────────────────────────────

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case "paragraph":
      return (
        <Typography
          key={index}
          className="text-sm text-dark-400 leading-relaxed mb-4"
        >
          {block.text}
        </Typography>
      );
    case "heading2":
      return (
        <h2
          key={index}
          className="text-xl md:text-2xl font-bold text-dark-400 mt-8 mb-3"
        >
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 key={index} className="text-lg font-bold text-dark-400 mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "heading4":
      return (
        <h4
          key={index}
          className="text-base font-semibold text-dark-400 mt-4 mb-1"
        >
          {block.text}
        </h4>
      );
    case "image":
      return (
        <div
          key={index}
          className="my-6 rounded-xl overflow-hidden border border-gray-100"
        >
          <Image
            src={block.src}
            alt={block.alt}
            width={800}
            height={450}
            className="w-full h-auto object-contain"
          />
          {block.caption && (
            <Typography className="text-xs text-dark-400 text-center py-2">
              {block.caption}
            </Typography>
          )}
        </div>
      );
    case "bullets":
      return (
        <ul key={index} className="mb-4 space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-dark-400">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-dark-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <div key={index} className="mb-2">
          {block.items.map((item, i) => (
            <div key={i}>
              <h3 className="text-base font-bold text-dark-400 mb-1">
                {item.title}
              </h3>
              {item.description && (
                <Typography className="text-sm text-dark-400 leading-relaxed mb-3">
                  {item.description}
                </Typography>
              )}
            </div>
          ))}
        </div>
      );
    case "bold_bullets":
      return (
        <ul key={index} className="mb-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-dark-400">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-dark-400" />
              <span>
                <strong className="text-dark-400">{item.title}</strong>
                {item.description && ` ${item.description}`}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-dark-400 placeholder:text-dark-200 focus:outline-none focus:ring-1 focus:ring-primary bg-white transition mb-3";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <Typography
        variant="h3"
        size="h5"
        className="font-semibold text-dark-400 mb-4"
      >
        Contact us
      </Typography>
      <input
        name="fullName"
        type="text"
        placeholder="Full name *"
        value={form.fullName}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="company"
        type="text"
        placeholder="Company/organization*"
        value={form.company}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Email*"
        value={form.email}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone number*"
        value={form.phone}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="What you are looking for"
        value={form.message}
        onChange={handleChange}
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button className="w-full bg-primary text-white rounded-md py-2.5 text-sm font-semibold hover:opacity-90 transition mt-1">
        Submit
      </button>
    </div>
  );
};

// ─── BlogDetail ───────────────────────────────────────────────────────────────

type BlogDetailProps = {
  content?: string;
  content_blocks?: ContentBlock[];
  recent_blogs?: RecentBlog[];
};

const BlogDetail = ({
  content,
  content_blocks = [],
  recent_blogs = [],
}: BlogDetailProps = {}) => {
  const [email, setEmail] = useState("");

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* ── LEFT: Main content ── */}
          <div className="flex-1 min-w-0">
            {content_blocks.map((block, i) => renderBlock(block, i))}
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Recent blogs */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <Typography
                    variant="h3"
                    size="h6"
                    className="font-semibold text-dark-400"
                  >
                    Recent blogs
                  </Typography>
                  <a
                    href="/blogs"
                    className="text-xs text-primary hover:underline"
                  >
                    View all
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  {recent_blogs.map(blog => (
                    <a
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-16 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          width={64}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Typography className="text-xs text-dark-400 leading-relaxed group-hover:text-primary transition-colors line-clamp-3">
                        {blog.title}
                      </Typography>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter subscribe */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <Typography
                  variant="h3"
                  size="h6"
                  className="font-semibold text-dark-400 mb-3"
                >
                  Subscribe to our newsletter
                </Typography>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-dark-200 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button className="bg-primary text-white px-3 py-2 rounded-md text-sm hover:opacity-90 transition">
                    →
                  </button>
                </div>
              </div>

              {/* Contact form */}
              <ContactForm />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
