"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, memo } from "react";

import IconChevronDown from "@/components/shared/icons/chevron-down";
import type { NavLink, MenuItem, DropdownItem } from "./index";

// ─── Memoized Dropdown Components ─────────────────────────────────────────────
// Extracted so React.memo can skip re-renders when openIndex changes
// for items that aren't affected.

const MegaMenu = memo(function MegaMenu({
  groups,
  gridClass,
  useSplitMegaLayout,
}: {
  groups: MenuItem[];
  gridClass: string;
  useSplitMegaLayout: boolean;
}) {
  return (
    <>
      <div className={`grid ${gridClass} gap-4 xl:gap-6`}>
        {groups.map((group, groupIndex) => {
          const isWideGroup = useSplitMegaLayout && groupIndex === 1;
          const groupClass = isWideGroup ? "col-span-2" : "col-span-1";
          const listClass = isWideGroup
            ? "grid grid-cols-2 gap-x-8 gap-y-3"
            : "space-y-3";

          return (
            <div key={`${group.title}-${groupIndex}`} className={groupClass}>
              {group.title && (
                <h4 className="text-lg font-semibold mb-4 text-gray-900">
                  {group.title}
                </h4>
              )}
              <ul className={listClass}>
                {group.items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600 text-sm"
                    >
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="size-5"
                          //  Only the first few icons are eager — rest lazy load
                          loading={groupIndex === 0 ? "eager" : "lazy"}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-linear-to-r from-primary to-secondary px-5 py-3 flex items-center justify-between">
        <p className="text-white text-sm">
          Are you prepared to revolutionize your business? Let&apos;s embark on
          this journey together!
        </p>
        <Link
          href="/contact"
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
});

const NormalDropdown = memo(function NormalDropdown({
  items,
}: {
  items: DropdownItem[];
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map(item => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 text-sm"
          >
            {item.icon && (
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className="size-5"
                loading="lazy"
              />
            )}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
});

// ─── Nav Item ─────────────────────────────────────────────────────────────────
// Memoized per-item component so only the hovered item re-renders,
// not the entire nav list.

const NavItem = memo(function NavItem({
  link,
  index,
  isOpen,
  onEnter,
  onLeave,
  onToggle,
}: {
  link: NavLink;
  index: number;
  isOpen: boolean;
  onEnter: (i: number) => void;
  onLeave: () => void;
  onToggle: (i: number) => void;
}) {
  const hasDropdown = !!link.dropdown;

  return (
    <div
      className="relative group h-20 flex"
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
    >
      <div
        className={`navItem flex m-auto items-center gap-1 px-3 py-2 rounded-full border transition-all duration-100 ${
          isOpen ? "" : "border-transparent"
        }`}
      >
        <Link href={link.href} className="text-sm lg:text-base font-semibold">
          {link.label}
        </Link>

        {hasDropdown && (
          <button
            onClick={() => onToggle(index)}
            className="lg:hidden size-5"
            aria-label={`Toggle ${link.label} menu`}
          >
            <IconChevronDown />
          </button>
        )}

        {hasDropdown && (
          <span className="hidden lg:block size-5 -me-0.5" aria-hidden>
            <IconChevronDown />
          </span>
        )}
      </div>

      {hasDropdown && (
        <div
          className={`
            absolute left-0 top-full
            ${link.megamenu ? "w-3xl" : "w-54"}
            bg-white rounded-2xl shadow-xl p-6
            transition-all duration-200
            ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          {link.megamenu ? (
            <MegaMenu
              groups={link.dropdown as MenuItem[]}
              gridClass={link.megaMenuGridClass ?? "grid-cols-1"}
              useSplitMegaLayout={link.useSplitMegaLayout ?? false}
            />
          ) : (
            <NormalDropdown items={link.dropdown as DropdownItem[]} />
          )}
        </div>
      )}
    </div>
  );
});


export default function HeaderNavClient({ navLinks }: { navLinks: NavLink[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleEnter = useCallback((i: number) => setOpenIndex(i), []);
  const handleLeave = useCallback(() => setOpenIndex(null), []);
  const handleToggle = useCallback(
    (i: number) => setOpenIndex(prev => (prev === i ? null : i)),
    []
  );

  return (
    <nav className="hidden lg:flex items-center gap-2 font-medium">
      {navLinks.map((link, index) => (
        <NavItem
          key={link.label}
          link={link}
          index={index}
          isOpen={openIndex === index}
          onEnter={handleEnter}
          onLeave={handleLeave}
          onToggle={handleToggle}
        />
      ))}
    </nav>
  );
}
