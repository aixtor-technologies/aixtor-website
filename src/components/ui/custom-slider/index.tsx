"use client";

import IconLeft from "@/components/shared/icons/left";
import IconRight from "@/components/shared/icons/right";
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  Children,
  useCallback,
} from "react";

type arrowBehavior = "hide" | "disable";

interface CustomSliderProps {
  children: ReactNode;
  arrow?: boolean;
  customArrow?: (handlers: { prev: () => void; next: () => void }) => ReactNode;
  infinite?: boolean;
  className?: string;
  itemClassName?: string;
  arrowBehavior?: arrowBehavior;
}

export default function CustomSlider({
  children,
  arrow = false,
  customArrow,
  infinite = false,
  className = "",
  itemClassName = "",
  arrowBehavior = "hide",
}: CustomSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollNextState, setCanScrollNextState] = useState(true);
  const [canScrollPrevState, setCanScrollPrevState] = useState(false);
  const [prevClicks, setPrevClicks] = useState(0);
  const [nextClicks, setNextClicks] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = Children.toArray(children);

  // Get item width dynamically from DOM
  const getItemWidth = (): number => {
    const firstItem = trackRef.current?.children[0] as HTMLElement;
    return firstItem?.offsetWidth || 0;
  };

  const nextSlide = useCallback(() => {
    if (!trackRef.current) return;
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    if (infinite) {
      const newScrollLeft = trackRef.current.scrollLeft + itemWidth;
      // If we've scrolled past the end, loop to start
      if (newScrollLeft >= trackRef.current.scrollWidth) {
        trackRef.current.scrollLeft = 0;
      } else {
        trackRef.current.scrollLeft += itemWidth;
      }
    } else {
      const maxScroll =
        trackRef.current.scrollWidth - trackRef.current.clientWidth;
      const newScrollLeft = Math.min(
        trackRef.current.scrollLeft + itemWidth,
        maxScroll
      );
      trackRef.current.scrollLeft = newScrollLeft;

      // Update scroll states immediately
      setCanScrollNextState(newScrollLeft < maxScroll - 1);
      setCanScrollPrevState(newScrollLeft > 1);
    }
  }, [infinite]);

  const prevSlide = useCallback(() => {
    if (!trackRef.current) return;
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    if (infinite) {
      const newScrollLeft = trackRef.current.scrollLeft - itemWidth;
      // If we've scrolled past the start, loop to end
      if (newScrollLeft < 0) {
        trackRef.current.scrollLeft = trackRef.current.scrollWidth;
      } else {
        trackRef.current.scrollLeft -= itemWidth;
      }
    } else {
      const newScrollLeft = Math.max(
        trackRef.current.scrollLeft - itemWidth,
        0
      );
      trackRef.current.scrollLeft = newScrollLeft;

      // Update scroll states immediately
      const maxScroll =
        trackRef.current.scrollWidth - trackRef.current.clientWidth;
      setCanScrollNextState(newScrollLeft < maxScroll - 1);
      setCanScrollPrevState(newScrollLeft > 1);
    }
  }, [infinite]);

  const handlePrev = useCallback(() => {
    setPrevClicks((count) => count + 1);
  }, []);

  const handleNext = useCallback(() => {
    setNextClicks((count) => count + 1);
  }, []);

  useEffect(() => {
    if (prevClicks === 0) return;
    prevSlide();
  }, [prevClicks, prevSlide]);

  useEffect(() => {
    if (nextClicks === 0) return;
    nextSlide();
  }, [nextClicks, nextSlide]);

  // Handle scroll event to update currentIndex and scroll states
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollStates = () => {
      if (infinite) {
        setCanScrollNextState(true);
        setCanScrollPrevState(true);
        return;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      setCanScrollNextState(track.scrollLeft < maxScroll - 1);
      setCanScrollPrevState(track.scrollLeft > 1);
    };

    const handleScroll = () => {
      const itemWidth = getItemWidth();
      if (itemWidth === 0) return;

      const scrollLeft = track.scrollLeft;
      // Calculate which item is currently visible based on scroll position
      const index = Math.round(scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex);
      }

      updateScrollStates();
    };

    // Initial state update
    updateScrollStates();

    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
  }, [items.length, infinite, currentIndex]);

  // Determine arrow visibility and disabled state based on arrowBehavior
  const isPrevDisabled = !canScrollPrevState;
  const isNextDisabled = !canScrollNextState;

  const shouldShowPrevArrow =
    arrowBehavior === "disable" ? true : infinite || canScrollPrevState;
  const shouldShowNextArrow =
    arrowBehavior === "disable" ? true : infinite || canScrollNextState;

  return (
    <div className='custom-slider relative'>
      <div ref={sliderRef} className='custom-slider-container'>
        <div
          ref={trackRef}
          className={`${className} custom-slider-track flex scroll-smooth`}
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            width: "100%",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`custom-slider-slide shrink-0 ${itemClassName}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {customArrow ? customArrow({ prev: handlePrev, next: handleNext }) : arrow && (
        <>
          {shouldShowPrevArrow && (
            <button
              type='button'
              onClick={() => {
                if (!isPrevDisabled) {
                  handlePrev();
                }
              }}
              disabled={
                arrowBehavior === "disable" ? isPrevDisabled : false
              }
              className={`custom-slider-arrow custom-slider-prev p-2 md:p-3 absolute top-1/2 -translate-y-1/2 left-4 lg:left-8 z-10 size-10 lg:size-12 xl:size-14 border border-primary rounded-full flex items-center justify-center shadow-card ${arrowBehavior === "disable" && isPrevDisabled ? "cursor-not-allowed bg-gray-300 text-black/50" : "cursor-pointer bg-white text-black hover:text-primary"}`}
              aria-label='Previous slide'
            >
              <IconLeft />
            </button>
          )}
          {shouldShowNextArrow && (
            <button
              type='button'
              onClick={() => {
                if (!isNextDisabled) {
                  handleNext();
                }
              }}
              disabled={
                arrowBehavior === "disable" ? isNextDisabled : false
              }
              className={`custom-slider-arrow custom-slider-next p-2 md:p-3 absolute top-1/2 -translate-y-1/2 right-4 lg:right-8 z-10 size-10 lg:size-12 xl:size-14 border border-primary rounded-full flex items-center justify-center shadow-card ${arrowBehavior === "disable" && isNextDisabled ? "cursor-not-allowed bg-gray-300 text-black/50" : "cursor-pointer bg-white text-black hover:text-primary"}`}
              aria-label='Next slide'
            >
              <IconRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
