"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const cleanHtml = useMemo(() => {
    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
