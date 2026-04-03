"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Spinner } from "@/components/ui/Spinner";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { values, setField, submit, status } = useContactForm();

  return (
    <div className="lg:col-span-2">
      <form
        className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tell us about your project
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          We typically respond within one business day. This demo form simulates
          submission only.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Input
            id="contact-name"
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
          />
          <Input
            id="contact-email"
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
          />
          <div className="sm:col-span-2">
            <Input
              id="contact-company"
              label="Company"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              id="contact-message"
              label="How can we help?"
              name="message"
              required
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="size-4 border-2" />
                Sending…
              </span>
            ) : (
              "Send message"
            )}
          </Button>
          {status === "success" ? (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Thanks—your message has been recorded (demo).
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
