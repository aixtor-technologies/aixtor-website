"use client";

import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const [cleanHtml, setCleanHtml] = useState(html);

  useEffect(() => {
    setCleanHtml(createDOMPurify(window).sanitize(html));
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
