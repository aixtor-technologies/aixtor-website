"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, memo } from "react";

import IconMenu from "@/components/shared/icons/menu";
import type { NavLink, MenuItem, DropdownItem } from "./index";
import IconChevronDown from "@/components/shared/icons/chevron-down";

// ─── Memoized Dropdown Components ─────────────────────────────────────────────
// Extracted so React.memo can skip re-renders when openIndex changes
// for items that aren't affected.

const MegaMenu = memo(function MegaMenu({
  groups,
  gridClass,
  className,
  useSplitMegaLayout,
}: {
  groups: MenuItem[];
  gridClass: string;
  className?: string;
  useSplitMegaLayout: boolean;
}) {
  return (
    <div>
      <div className={`grid ${gridClass} ${className} md:gap-4 xl:gap-6`}>
        {groups.map((group, groupIndex) => {
          const isWideGroup = useSplitMegaLayout && groupIndex === 1;
          const groupClass = isWideGroup ? "col-span-2" : "col-span-1";
          const listClass = isWideGroup
            ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-y-3"
            : "md:space-y-3";

          return (
            <div key={`${group.title}-${groupIndex}`} className={groupClass}>
              {group.title && (
                <h4 className="text-lg font-semibold mb-2 md:mb-4 text-dark">
                  {group.title}
                </h4>
              )}
              <ul className={listClass}>
                {group.items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex p-3 md:p-0 items-center gap-3 border-b border-dark-300 md:border-0 text-dark hover:text-primary text-sm"
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

      <div className="hidden md:flex mt-8 rounded-xl bg-linear-to-r from-primary to-secondary px-5 py-3 items-center justify-between">
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
    </div>
  );
});

const NormalDropdown = memo(function NormalDropdown({
  items,
}: {
  items: DropdownItem[];
}) {
  return (
    <ul className="flex flex-col md:gap-2">
      {items.map(item => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="flex p-3 md:p-0 items-center gap-3 border-b border-dark-300 md:border-0 text-dark hover:text-primary text-sm"
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
      className="relative group md:h-20 flex flex-col md:flex-row"
      onPointerEnter={e => e.pointerType === "mouse" && onEnter(index)}
      onPointerLeave={e => e.pointerType === "mouse" && onLeave()}
    >
      <div
        className={`navItem w-full md:w-auto flex m-auto items-center gap-1 px-4 py-3 md:px-3 md:py-2 md:rounded-full border-b md:border transition-all duration-100 justify-between ${
          isOpen ? "border-dark-300" : "border-dark-300 md:border-transparent"
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
            md:absolute left-0 top-full bg-white rounded-2xl md:shadow-xl p-4 md:p-6 transition-all duration-200 w-full 
            ${link.megamenu ? "md:w-3xl" : "md:w-54"}
            ${isOpen ? "opacity-100 visible block" : "hidden md:block md:opacity-0 md:invisible"}
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
  const [openMenu, setOpenMenu] = useState(false);

  const handleEnter = useCallback((i: number) => setOpenIndex(i), []);
  const handleLeave = useCallback(() => setOpenIndex(null), []);
  const handleToggle = useCallback(
    (i: number) => setOpenIndex(prev => (prev === i ? null : i)),
    []
  );

  return (
    <div className="order-1 md:order-0">
      <button
        className="size-8 block lg:hidden"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <IconMenu />
      </button>
      <nav
        className={`${openMenu ? "block" : "hidden md:block"} max-h-96 md:max-h-fit absolute inset-s-0 top-full md:static bg-white md:bg-transparent w-full md:w-auto p-4 md:p-0 md:flex items-center gap-2 font-medium overflow-auto md:overflow-visible`}
      >
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
    </div>
  );
}
