"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type MigrateItem = {
  image: string;
  title: string;
  description: string;
  read_more_link: string;
};

type Section = {
  heading: string;
  cta_title: string;
  migrate_to_liferay: MigrateItem[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ANIM_DURATION = 500; // ms — must match CSS
const WHEEL_THROTTLE = ANIM_DURATION + 100;

// ─── MigrateToLiferaySection ──────────────────────────────────────────────────

export default function MigrateToLiferaySection({
  migrate_to_liferay_section,
}: {
  migrate_to_liferay_section?: Section;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  const sectionRef = useRef<HTMLElement>(null);
  const throttleRef = useRef(false);
  const activeIndexRef = useRef(0);

  const items = migrate_to_liferay_section?.migrate_to_liferay ?? [];
  const lastIndex = items.length - 1;

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Resize listener
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Navigate ────────────────────────────────────────────────────────────────

  const goTo = useCallback(
    (next: number, dir: "up" | "down") => {
      if (isAnimating) return;
      setPrevIndex(activeIndexRef.current);
      setDirection(dir);
      setActiveIndex(next);
      setIsAnimating(true);
      setTimeout(() => {
        setPrevIndex(null);
        setIsAnimating(false);
      }, ANIM_DURATION);
    },
    [isAnimating]
  );

  // ── Wheel handler ───────────────────────────────────────────────────────────

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !items.length) return;

    const onWheel = (e: WheelEvent) => {
      if (throttleRef.current) return;
      const current = activeIndexRef.current;
      const isDown = e.deltaY > 0;
      if ((isDown && current === lastIndex) || (!isDown && current === 0))
        return;

      e.preventDefault();
      throttleRef.current = true;
      goTo(isDown ? current + 1 : current - 1, isDown ? "up" : "down");
      setTimeout(() => {
        throttleRef.current = false;
      }, WHEEL_THROTTLE);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [items.length, lastIndex, goTo]);

  if (!migrate_to_liferay_section || !items.length) return null;

  const { heading, cta_title } = migrate_to_liferay_section;

  const enterClass = isMobile
    ? (direction === "up" ? "slide-enter-right" : "slide-enter-left")
    : (direction === "up" ? "slide-enter-up"    : "slide-enter-down");
  const exitClass = isMobile
    ? (direction === "up" ? "slide-exit-left"  : "slide-exit-right")
    : (direction === "up" ? "slide-exit-up"    : "slide-exit-down");

  return (
    <div className="relative" style={{ overflowX: "clip" }}>
      <section
        ref={sectionRef}
        className="large-section bg-dark-200 relative pt-8! md:pt-10! lg:pt-16! pb-35! md:pb-44!"
      >
        <div className="container">
          {/* Heading */}
          <Typography
            variant="h2"
            size="h2"
            className="text-dark common-heading"
            isCenter
            isTitle
          >
            {heading}
          </Typography>

          <div className="relative">
            {/* Desktop dots */}
            {!isMobile && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 w-12">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      !isAnimating && goTo(i, i > activeIndex ? "up" : "down")
                    }
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === activeIndex}
                  />
                ))}
              </div>
            )}

            {/* Slide container — clips overflow */}
            <div className="overflow-hidden relative">
              {/* Exiting slide — absolute overlay during transition */}
              {prevIndex !== null && (
                <div
                  key={`exit-${prevIndex}`}
                  className={`slide-item-exit ${exitClass}`}
                >
                  <SlideContent item={items[prevIndex]} ml={!isMobile} />
                </div>
              )}

              {/* Entering slide — in normal flow so container expands to content height */}
              <div
                key={`enter-${activeIndex}`}
                className={`${enterClass}`}
              >
                <SlideContent
                  item={items[activeIndex]}
                  ml={!isMobile}
                  priority={activeIndex === 0}
                />
              </div>
            </div>
          </div>

          {/* Mobile dots */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    !isAnimating && goTo(i, i > activeIndex ? "up" : "down")
                  }
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-secondary scale-110" : "bg-dark-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {cta_title && (
            <div className="flex justify-center mt-10 sm:mt-12 md:mt-14">
              <Button href="/contact">{cta_title}</Button>
            </div>
          )}
        </div>

        <style>{`
          .slide-item-exit {
            position: absolute;
            inset: 0;
            width: 100%;
          }

          /* ── Enter animations: new slide comes IN ── */
          @keyframes enterFromBottom {
            from { opacity: 0; transform: translateY(60px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          @keyframes enterFromTop {
            from { opacity: 0; transform: translateY(-60px); }
            to   { opacity: 1; transform: translateY(0);     }
          }

          /* ── Exit animations: old slide goes OUT ── */
          @keyframes exitToTop {
            from { opacity: 1; transform: translateY(0);    }
            to   { opacity: 0; transform: translateY(-60px); }
          }
          @keyframes exitToBottom {
            from { opacity: 1; transform: translateY(0);   }
            to   { opacity: 0; transform: translateY(60px); }
          }

          .slide-enter-up   { animation: enterFromBottom ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-enter-down { animation: enterFromTop    ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-exit-up    { animation: exitToTop       ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-exit-down  { animation: exitToBottom    ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }

          /* ── Mobile: horizontal enter ── */
          @keyframes enterFromRight {
            from { opacity: 0; transform: translateX(60px); }
            to   { opacity: 1; transform: translateX(0);    }
          }
          @keyframes enterFromLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to   { opacity: 1; transform: translateX(0);     }
          }

          /* ── Mobile: horizontal exit ── */
          @keyframes exitToLeft {
            from { opacity: 1; transform: translateX(0);     }
            to   { opacity: 0; transform: translateX(-60px); }
          }
          @keyframes exitToRight {
            from { opacity: 1; transform: translateX(0);    }
            to   { opacity: 0; transform: translateX(60px); }
          }

          .slide-enter-right { animation: enterFromRight ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-enter-left  { animation: enterFromLeft  ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-exit-left   { animation: exitToLeft     ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
          .slide-exit-right  { animation: exitToRight    ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1) both; }
        `}</style>

        {/* Bottom slope — right high, left low */}
        <div
          className="absolute bottom-0 left-0 w-full h-20 md:h-44 bg-white pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
        />
      </section>

      {/* Strip at bottom-right — mirrors the case-study download top-right strip */}
      <div className="migrate-liferay-strip" />
    </div>
  );
}

function SlideContent({
  item,
  ml = false,
  priority = false,
}: {
  item: MigrateItem;
  ml?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 ${ml ? "lg:ml-16" : ""}`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <Image
            src={item.image || "/images/placeholder/placeholder.jpg"}
            alt={item.title || "slide-img"}
            width={453}
            height={296}
            className="w-full h-auto object-contain shadow-card-xl"
            priority={priority}
          />
        </div>
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4 justify-center">
        <Typography variant="h3" size="h4" className="font-semibold">
          {item.title}
        </Typography>
        <Typography
          size="p"
          className="text-dark-400 leading-relaxed text-sm sm:text-base"
        >
          {item.description.trim()}
        </Typography>
      </div>
    </div>
  );
}
