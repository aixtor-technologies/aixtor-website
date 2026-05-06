"use client";

import { useForm } from "react-hook-form";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import HttpService from "@/shared/services/http.service";

type FormValues = {
  name: string;
  email: string;
  your_enquiry: string;
  message: string;
  subject: string;
  phone_number: string;
};

const ConsultationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Handle form submission
    const res = await HttpService.nativePost("contact-submission", {
      ...data,
      form_type: "consultation-enquiry",
    });
    console.log(res);
    reset();
  };

  return (
    <div className="p-6 pt-0 bg-white shadow-card rounded-xl lg:rounded-2xl">
      <Typography variant="h3" size="h4" className="mb-4 font-semibold">
        Let&apos;s Start Conversation!
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required",
          })}
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
        />{" "}
        <Textarea
          placeholder="Your Enquiry"
          error={errors.your_enquiry?.message}
          {...register("your_enquiry", {
            required: "Please describe your enquiry",
          })}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : " Book your consultation"}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
