"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import IconChevronDown from "./icons/chevron-down";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    megamenu: true,
    dropdown: [
      "Enterprise Portal Development",
      "Liferay Consulting",
      "Liferay Migration Service",
      "Liferay Upgrade Services",
      "Web Portal Development",
      "UI UX Design",
      "Drupal Development",
      "RPA Development",
      "QA Automation Testing",
      "QA Manual Testing",
    ],
  },
  {
    label: "Solution",
    href: "/solution",
    megamenu: true,
    dropdown: [
      "Intranet Portal",
      "Customer Self-Service Portal",
      "Partner Portal Solution",
      "Supplier and Vendor Portal",
      "E-Commerce Portal",
      "Enterprise Websites",
      "Enterprise Content Management",
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    megamenu: true,
    dropdown: [
      "Telecom",
      "Manufacturing",
      "Logistics and Transport",
      "Insurance",
      "Healthcare",
      "FMCG",
      "Education",
      "Banking and Finance",
    ],
  },
  {
    label: "Company", href: "/company",
    dropdown: [
      "About Us",
      "Career",
      "Blog",
      "Case Studies",
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function HeaderNav() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <nav className="hidden lg:flex items-center gap-8 font-medium">
      {navLinks.map((link, index) => {
        const hasDropdown = !!link.dropdown;

        return (
          <div
            key={link.label}
            className="relative group"
          >
            {/* Main Link */}
            <div className="flex items-center gap-1 px-2 h-20">
              <Link
                href={link.href}
                className="text-white text-sm lg:text-base font-semibold hover:text-white/80"
              >
                {link.label}
              </Link>

              {/* Mobile Click Icon */}
              {hasDropdown && (
                <button
                  onClick={() => toggleDropdown(index)}
                  className="lg:hidden size-5"
                >
                  <IconChevronDown />
                </button>
              )}

              {/* Desktop Hover Icon */}
              {hasDropdown && (
                <span className="hidden lg:block size-5">
                  <IconChevronDown />
                </span>
              )}
            </div>

            {/* Dropdown */}
            {hasDropdown && (
              <div
                className={`
                  absolute right-1/2 translate-x-1/2 top-full ${link.megamenu ? "w-120" : "w-64"} bg-white rounded-xl shadow-lg p-4
                  
                  /* Desktop hover */
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200

                  /* Mobile click */
                  ${openIndex === index ? "block lg:opacity-100! lg:visible!" : "hidden lg:block"}
                `}
              >
                <ul className={`grid gap-4 ${link.megamenu ? "grid-cols-2" : ""}`}>
                  {link.dropdown.map((item) => (
                    <li key={item} >
                      <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 text-sm">
                        <Image src={"/images/banking.svg"} alt={item} width={20} height={20} className="size-5 object-contain" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
