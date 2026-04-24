"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import IconChevronDown from "@/components/shared/icons/chevron-down";
import HeaderClassHandler from "../header-class-handler";

type HireOption = {
  label: string;
  href: string;
};

const hireOptions: HireOption[] = [
  { label: "Hire Liferay Developer", href: "/hire/liferay-developer" },
  { label: "Hire WordPress Developer", href: "/hire/wordpress-developer" },
  { label: "Hire UI/UX Designer", href: "/hire/ui-ux-designer" },
  { label: "Hire UI Developer", href: "/hire/ui-developer" },
];

export default function HireDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Detect mobile
  const isMobile = () => window.innerWidth < 1024;

  // Click toggle (mobile only)
  const handleClick = () => {
    if (isMobile()) {
      setOpen(prev => !prev);
    }
  };

  // Close on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (isMobile()) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        className="relative inline-block group"
        onMouseEnter={() => !isMobile() && setOpen(true)}
        onMouseLeave={() => !isMobile() && setOpen(false)}
      >
        {/* Button */}
        <button
          onClick={handleClick}
          className="hidden lg:flex hireBtn text-dark gap-2 px-6 h-10 md:h-12 border items-center rounded-full font-semibold"
        >
          Hire us
          <span
            className={`size-5 -me-1 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <IconChevronDown />
          </span>
        </button>

        {/* Dropdown */}
        <div
          className={`
          absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg overflow-hidden
          transition-all duration-300 origin-top

          ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
        `}
        >
          <ul className="py-2">
            {hireOptions.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeaderClassHandler />
    </>
  );
}
