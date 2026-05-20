"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import HttpService from "@/shared/services/http.service";
import Toast from "@/components/shared/toast";

type CaseStudyDownloadProps = {
  data: {
    acf_fields: {
      case_study_file?: string;
    };
  };
};

const CaseStudyDownload = ({ data }: CaseStudyDownloadProps) => {
  const [form, setForm] = useState({ fullName: "", company: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [apiError, setApiError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setCaptchaError("reCAPTCHA not ready. Please try again.");
      return;
    }
    setLoading(true);
    setCaptchaError("");
    try {
      const recaptchaToken = await executeRecaptcha("case_study_download");
      await HttpService.nativePost("contact-submission", {
        full_name: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
        recaptcha_token: recaptchaToken,
        form_type: "case-study-enquiry",
      });
      setSubmitted(true);
      setForm({ fullName: "", company: "", email: "", phone: "", message: "" });
      const file = data?.acf_fields?.case_study_file;
      if (file) window.open(file, "_blank");
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative banner-case-studies-wrapper">
      <div className="banner-case-studies-shape" />
      <section
        className="banner-case-studies bg-[#f4f4f6] pb-16 lg:pb-20 overflow-hidden"
        style={{
          clipPath: "polygon(0 60px, 100% 0, 100% 100%, 0 100%)",
          marginTop: "-60px",
          paddingTop: "calc(60px + 4rem)",
        }}
      >
        <div className="container relative z-10">
          {submitted && <Toast onDismiss={() => setSubmitted(false)} />}
          {apiError && <Toast type="error" message={apiError} onDismiss={() => setApiError("")} />}

          <div className="flex flex-col items-center mb-10">
            <Typography variant="h2" size="h3" isTitle isCenter>
              Download Full Case Study
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input type="text" name="fullName" placeholder="Full name *" value={form.fullName} variant="white" onChange={handleChange} className="w-full" required />
              </div>
              <div className="flex-1">
                <Input type="text" name="company" placeholder="Company/organization*" value={form.company} variant="white" onChange={handleChange} className="w-full" required />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input type="email" name="email" placeholder="Email*" value={form.email} variant="white" onChange={handleChange} className="w-full" required />
              </div>
              <div className="flex-1">
                <Input type="tel" name="phone" placeholder="Phone number*" value={form.phone} variant="white" onChange={handleChange} className="w-full" required />
              </div>
            </div>

            <div className="mb-4">
              <Textarea
                name="message"
                placeholder="What you are looking for"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark-400 placeholder:text-dark-200 resize-y focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
              />
            </div>

            {captchaError && <p className="text-red-500 text-sm mb-4 text-center">{captchaError}</p>}

            <div className="flex justify-center">
              <Button variant="default" size="default" rounded="default" disabled={loading}>
                {loading ? "Submitting..." : "Download full case-study"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default CaseStudyDownload;
