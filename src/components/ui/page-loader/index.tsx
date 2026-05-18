"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const startLoading = useCallback(() => {
    clearTimers();
    setIsLoading(true);
  }, [clearTimers]);

  const finishLoading = useCallback(() => {
    clearTimers();
    fadeTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [clearTimers]);

  useEffect(() => {
    if (isLoading) {
      finishLoading();
    }
  }, [pathname, searchParams, isLoading, finishLoading]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const url = new URL(href, window.location.origin);
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [startLoading]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="loader-zoom-out flex items-center justify-center">
        <Image
          src="/images/icons/Main-Loader.webp"
          alt="Loading"
          width={200}
          height={200}
          className="w-32 md:w-40 h-auto"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
