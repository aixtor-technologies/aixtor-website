"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";
import Toast from "@/components/shared/toast";
import { RECAPTCHA_SITE_KEY } from "@/shared/constants";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <div className="h-19.5 w-76 bg-gray-100 rounded animate-pulse" />,
});

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
  const [errorToast, setErrorToast] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);

  // Mount reCAPTCHA only when the form scrolls into view — keeps Google
  // scripts off the page until the user actually reaches this section.
  useEffect(() => {
    const el = captchaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
        setShowCaptcha(false);
      } catch {
        setErrorToast(true);
      }
    },
    [captchaToken, reset]
  );

  return (
    <div className="p-6 pt-0 bg-white shadow-card rounded-xl lg:rounded-2xl">
      {submitted && <Toast onDismiss={() => setSubmitted(false)} />}
      {errorToast && (
        <Toast type="error" onDismiss={() => setErrorToast(false)} />
      )}

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
          {...register("your_enquiry", {
            required: "Please describe your enquiry",
          })}
        />

        <div ref={captchaRef} className="mb-4 min-h-19.5">
          {showCaptcha ? (
            <ReCAPTCHA
              key={captchaKey}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
              onExpired={() => setCaptchaToken(null)}
            />
          ) : (
            <div className="h-19.5 w-76 bg-gray-100 rounded animate-pulse" />
          )}
          {captchaError && (
            <p className="text-red-500 text-xs mt-1">{captchaError}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book your consultation"}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
