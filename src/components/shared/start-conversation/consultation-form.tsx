"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";
import Toast from "@/components/shared/toast";

type FormValues = {
  name: string;
  email: string;
  your_enquiry: string;
  message: string;
  subject: string;
  phone_number: string;
};

const ConsultationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormValues>();

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!captchaToken) {
        setCaptchaError("Please complete the reCAPTCHA.");
        return;
      }
      setCaptchaError("");
      try {
        await HttpService.nativePost("contact-submission", {
          ...data,
          recaptcha_token: captchaToken,
          form_type: "consultation-enquiry",
        });
        setSubmitted(true);
        reset();
        setCaptchaToken(null);
        setCaptchaKey(k => k + 1);
      } catch {
        setError("root", { message: "Something went wrong. Please try again." });
      }
    },
    [captchaToken, reset, setError],
  );

  return (
    <div className="p-6 pt-0 bg-white shadow-card rounded-xl lg:rounded-2xl">
      {submitted && <Toast onDismiss={() => setSubmitted(false)} />}

      <Typography variant="h3" size="h4" className="mb-4 font-semibold">
        Let&apos;s Start Conversation!
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <Input
          type="tel"
          placeholder="Phone"
          error={errors.phone_number?.message}
          {...register("phone_number", {
            pattern: {
              value: /^[+]?[\d\s\-().]{7,15}$/,
              message: "Enter a valid phone number",
            },
          })}
        />
        <Textarea
          placeholder="Your Enquiry"
          error={errors.your_enquiry?.message}
          {...register("your_enquiry", { required: "Please describe your enquiry" })}
        />

        <div className="mb-4">
          <ReCAPTCHA
            key={captchaKey}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
          />
          {captchaError && (
            <p className="text-red-500 text-xs mt-1">{captchaError}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm mb-3">{errors.root.message}</p>
        )}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book your consultation"}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
