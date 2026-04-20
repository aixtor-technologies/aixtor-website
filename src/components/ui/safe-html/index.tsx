"use client";

import DOMPurify from "dompurify";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
