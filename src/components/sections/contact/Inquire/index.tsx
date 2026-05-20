"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { RECAPTCHA_SITE_KEY } from "@/shared/constants";

import Button from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";
import Toast from "@/components/shared/toast";

const ReCAPTCHAWidget = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <div className="h-19.5 w-76 bg-gray-100 rounded animate-pulse" />,
});

export default function InquireNow() {
  const [form, setForm] = useState({ fullName: "", company: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [apiError, setApiError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) { setCaptchaError("Please complete the reCAPTCHA."); return; }
    setLoading(true);
    setCaptchaError("");
    try {
      await HttpService.nativePost("contact-submission", {
        full_name: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
        recaptcha_token: captchaToken,
        form_type: "contact-enquiry",
      });
      setSubmitted(true);
      setForm({ fullName: "", company: "", email: "", phone: "", message: "" });
      setCaptchaToken(null);
      setCaptchaKey(k => k + 1);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-8 lg:py-16 lg:px-12">
      {submitted && <Toast onDismiss={() => setSubmitted(false)} />}
      {apiError && <Toast type="error" message={apiError} onDismiss={() => setApiError("")} />}

      {/* Header */}
      <div className="text-center mb-10">
        <Typography variant="h2" size="h2" isTitle isCenter>
          Inquire Now
        </Typography>
        <Typography variant="p" size="p" className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Thank you for showing an interest. Please fill in the form below we will get in touch with you soon.
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-275 mx-auto">
        <Grid>
          <Grid.Col className="lg:w-1/2">
            <Input name="fullName" placeholder="Full name *" value={form.fullName} onChange={handleChange} required />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input name="company" placeholder="Company/organization*" value={form.company} onChange={handleChange} required />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input name="email" type="email" placeholder="Email*" value={form.email} onChange={handleChange} required />
          </Grid.Col>
          <Grid.Col className="lg:w-1/2">
            <Input name="phone" type="tel" placeholder="Phone number*" value={form.phone} onChange={handleChange} required />
          </Grid.Col>
          <Grid.Col className="w-full">
            <Textarea name="message" placeholder="What you are looking for" value={form.message} onChange={handleChange} />
          </Grid.Col>
        </Grid>

        <div className="mt-4">
          <ReCAPTCHAWidget
            key={captchaKey}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        {captchaError && <p className="text-red-500 text-sm mt-3">{captchaError}</p>}

        <div className="flex justify-end mt-4">
          <Button variant="default" size="default" rounded="default" disabled={loading}>
            {loading ? "Sending..." : "Send Inquiry"}
          </Button>
        </div>
      </form>
    </section>
  );
}
