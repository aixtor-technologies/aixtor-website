"use client";

import { useState } from "react";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

type CaseStudyDownloadProps = {
  data: {
    acf_fields: {
      case_study_file?: string;
    };
  };
};

const CaseStudyDownload = ({ data }: CaseStudyDownloadProps) => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const file = data?.acf_fields?.case_study_file;
    if (file) window.open(file, "_blank");
  };

  return (
    // 🔥 NEW: wrapper (VERY IMPORTANT - outside clip-path)
    <section className="relative">
      {/* 🔥 NEW: shape moved OUTSIDE clipped section */}
      <div className="banner-case-studies-shape" />

      {/* ORIGINAL SECTION (unchanged clip-path) */}
      <section
        className="banner-case-studies bg-[#f4f4f6] pb-16 lg:pb-20 overflow-hidden"
        style={{
          clipPath: "polygon(0 60px, 100% 0, 100% 100%, 0 100%)",
          marginTop: "-60px",
          paddingTop: "calc(60px + 4rem)",
        }}
      >
        <div className="container relative z-10">
          <div className="flex flex-col items-center mb-10">
            <Typography variant="h2" size="h3" isTitle isCenter>
              Download Full Case Study
            </Typography>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full name *"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  name="company"
                  placeholder="Company/organization*"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone number*"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-8">
              <Textarea
                name="message"
                placeholder="What you are looking for"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark-400 placeholder:text-dark-200 resize-y focus:outline-none focus:ring-1 focus:ring-primary transition"
              />
            </div>

            <div className="flex justify-center">
              <Button variant="default" size="default" rounded="default">
                Download full case-study
              </Button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CaseStudyDownload;
