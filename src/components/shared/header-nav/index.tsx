"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import IconChevronDown from "@/components/shared/icons/chevron-down";

type MenuItem = {
  title: string;
  items: DropdownItem[];
};

type DropdownItem = {
  label: string;
  href: string;
  icon?: string;
};

type NavLink = {
  label: string;
  href: string;
  megamenu?: boolean;
  dropdown?: MenuItem[] | DropdownItem[];
};

const navLinks: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    megamenu: true,
    dropdown: [
      {
        title: "Liferay Services",
        items: [
          { label: "Liferay Migration Services", href: "#", icon: "./images/home/liferay_Upgradation.svg" },
          { label: "Liferay Upgrade Services", href: "#", icon: "./images/home/Web_Portal_Devlopment.svg" },
          { label: "Liferay Consulting", href: "#", icon: "./images/home/Enterprise_Portal_Development.svg" },
          { label: "Hire Liferay Developer Services", href: "#", icon: "./images/home/Liferay_Consulting.svg" },
        ],
      },
      {
        title: "Website Services",
        items: [
          { label: "Web Portal Development", href: "#", icon: "./images/home/Supplier_and_vendor_portal.svg" },
          { label: "UI and UX", href: "#", icon: "./images/home/Customer_Self_Service_Portal.svg" },
          { label: "Drupal Development", href: "#", icon: "./images/home/Liferay_Migration.svg" },
          { label: "RPA Development Services", href: "#", icon: "./images/home/Partner_Management.svg" },
          { label: "QA Automation Testing", href: "#", icon: "./images/home/Intranet_Portal.svg" },
          { label: "DevOps", href: "#", icon: "./images/home/liferay_Upgradation.svg" },
          { label: "QA Manual Testing", href: "#", icon: "./images/home/Web_Portal_Devlopment.svg" },
          { label: "AI and ML Services", href: "#", icon: "./images/home/Enterprise_Portal_Development.svg" },
          { label: "B.I. and Data Analytics Services", href: "#", icon: "./images/home/Liferay_Consulting.svg" },
          { label: "DevOps Solution", href: "#", icon: "./images/home/Liferay_Consulting.svg" },
          { label: "Performance Tuning", href: "#", icon: "./images/home/Liferay_Consulting.svg" },
        ],
      },
    ],
  },
  {
    label: "Solution",
    href: "/solution",
    megamenu: true,
    dropdown: [
      {
        title: "Portals",
        items: [
          {
            label: "Intranet Portal",
            href: "#",
            icon: "./images/home/Intranet_Portal.svg",
          },
          {
            label: "Customer Self-Service Portal",
            href: "#",
            icon: "./images/home/Customer_Self_Service_Portal.svg",
          },
          {
            label: "Partner Management Portal",
            href: "#",
            icon: "./images/home/Partner_Management.svg",
          },
          {
            label: "Supplier & Vendor Portal",
            href: "#",
            icon: "./images/home/Supplier_and_vendor_portal.svg",
          },
        ],
      },
      {
        title: "Platforms",
        items: [
          {
            label: "E-commerce Portal",
            href: "#",
            icon: "./images/home/Web_Portal_Devlopment.svg",
          },
          {
            label: "Enterprise Website",
            href: "#",
            icon: "./images/home/Enterprise_Portal_Development.svg",
          },
          {
            label: "Enterprise Content Management",
            href: "#",
            icon: "./images/home/Liferay_Consulting.svg",
          },
        ],
      },
    ]
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: [
      { label: "Telecom", href: "#" },
      { label: "Manufacturing", href: "#" },
      { label: "Logistics and Transport", href: "#" },
      { label: "Insurance", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "FMCG", href: "#" },
      { label: "Education", href: "#" },
      { label: "Banking and Finance", href: "#" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    dropdown: [
      { label: "About Us", href: "#" },
      { label: "Career", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function HeaderNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <nav className="hidden lg:flex items-center gap-2 font-medium">
      {navLinks.map((link, index) => {
        const hasDropdown = !!link.dropdown;
        const megaMenuGroups = link.megamenu ? (link.dropdown as MenuItem[]) : [];
        const hasLargeMegaMenuGroup = megaMenuGroups.some(
          (group) => group.items.length > 6
        );
        const useSplitMegaLayout =
          megaMenuGroups.length === 2 && hasLargeMegaMenuGroup;
        let megaMenuGridClass = "grid-cols-1";
        if (useSplitMegaLayout) {
          megaMenuGridClass = "grid-cols-3";
        } else if (megaMenuGroups.length === 2) {
          megaMenuGridClass = "grid-cols-2";
        }

        return (
          <div
            key={link.label}
            className="relative group h-20 flex"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {/* Main Link */}
            <div className={`flex m-auto items-center gap-1 px-3 py-2 rounded-full ${index === openIndex ? "bg-white/20" : ""}`}>
              <Link
                href={link.href}
                className="text-white text-sm lg:text-base font-semibold"
              >
                {link.label}
              </Link>

              {hasDropdown && (
                <button
                  onClick={() => toggleDropdown(index)}
                  className="lg:hidden size-5"
                >
                  <IconChevronDown />
                </button>
              )}

              {hasDropdown && (
                <span className="hidden lg:block size-5 -me-0.5">
                  <IconChevronDown />
                </span>
              )}
            </div>

            {/* Dropdown */}
            {hasDropdown && (
              <div
                className={`
                  absolute left-0 top-full
                  ${link.megamenu ? "w-3xl" : "w-54"}
                  bg-white rounded-2xl shadow-xl p-6
                  transition-all duration-200
                  ${openIndex === index ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
              >
                {/* ✅ Mega Menu */}
                {link.megamenu ? (
                  <>
                    <div className={`grid ${megaMenuGridClass} gap-4 xl:gap-6`}>
                      {megaMenuGroups.map((group, groupIndex) => {
                        const isWideGroup = useSplitMegaLayout && groupIndex === 1;
                        const groupClass = isWideGroup ? "col-span-2" : "col-span-1";
                        const listClass = isWideGroup ? "grid grid-cols-2 gap-x-8 gap-y-3" : "space-y-3";

                        return (
                          <div key={group.title} className={groupClass}>
                            <h4 className="text-lg font-semibold mb-4 text-gray-900">
                              {group.title}
                            </h4>

                            <ul className={listClass}>
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-3 text-gray-700 hover:text-purple-600 text-sm"
                                  >
                                    <Image
                                      src={item?.icon || "./images/banking.svg"}
                                      alt={item.label}
                                      width={20}
                                      height={20}
                                      className="size-5 invert"
                                    />
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 rounded-xl bg-linear-to-r from-primary to-secondary px-5 py-3 flex items-center justify-between">
                      <p className="text-white text-sm">
                        Are you prepared to revolutionize your business? Let&apos;s
                        embark on this journey together!
                      </p>

                      <Link
                        href="/contact"
                        className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </>
                ) : (
                  /* ✅ Normal Dropdown */
                  <ul className="flex flex-col gap-2">
                    {(link.dropdown as DropdownItem[]).map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block text-gray-700 hover:text-purple-600 text-sm"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
