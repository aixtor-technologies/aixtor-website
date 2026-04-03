"use client";

import { useCallback, useState } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initial: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const setField = useCallback(
    <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
      setValues((v) => ({ ...v, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setStatus("idle");
  }, []);

  const submit = useCallback(async () => {
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setValues(initial);
  }, []);

  return { values, setField, submit, status, reset };
}
