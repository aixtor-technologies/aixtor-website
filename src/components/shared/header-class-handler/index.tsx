"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HeaderClassHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.getElementById("site-header");

    if (!header) return;

    if (pathname === "/") {
      header.classList.add("transparent-header");
    } else {
      header.classList.remove("transparent-header");
    }
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add("stickyHeader");
      } else {
        header.classList.remove("stickyHeader");
      }
    };

    // Run once on mount (in case page is already scrolled)
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
