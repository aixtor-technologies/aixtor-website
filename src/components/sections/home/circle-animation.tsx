"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const data = [
  { name: "Banking", id: 1, img: "/images/case-study-1.jpg" },
  { name: "Healthcare", id: 2, img: "/images/cta-banner.jpg" },
  { name: "Transportation", id: 3, img: "/images/intranet.jpg" }
];

const slotOffsets = [
  { x: 24, y: 0 },
  { x: 52, y: 30 },
  { x: 82, y: 58 }
];

const CircleAnimation = () => {
  const [order, setOrder] = useState(data.map((_, index) => index));
  const rotationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = order[0];

  const rotateClockwiseOnce = (prevOrder: number[]) => [
    prevOrder[1],
    prevOrder[2],
    prevOrder[0]
  ];

  const handleItemClick = (clickedIndex: number) => {
    if (clickedIndex === activeIndex) return;

    const clickedSlot = order.indexOf(clickedIndex);
    if (clickedSlot < 0) return;

    if (rotationTimer.current) {
      clearTimeout(rotationTimer.current);
      rotationTimer.current = null;
    }

    if (clickedSlot === 1) {
      setOrder((prevOrder) => rotateClockwiseOnce(prevOrder));
      return;
    }

    setOrder((prevOrder) => rotateClockwiseOnce(prevOrder));
    rotationTimer.current = setTimeout(() => {
      setOrder((prevOrder) => rotateClockwiseOnce(prevOrder));
      rotationTimer.current = null;
    }, 260);
  };

  useEffect(() => () => {
    if (rotationTimer.current) clearTimeout(rotationTimer.current);
  }, []);

  return (
    <section className="common-section bg-white">
      <div className="container flex justify-center">

        <div className="relative w-[420px] h-[420px] rounded-full border-4 overflow-hidden">

          {/* IMAGE LAYER */}
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-1/2 bottom-0 h-3/4 left-1/2 -translate-x-1/2 transition-all duration-500
                ${index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"}`}
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover size-full"
              />
            </div>
          ))}

          {/* TEXT LAYER */}
          <div className="absolute inset-0 z-30">
            {data.map((item, index) => {
              const slotIndex = order.indexOf(index);
              const { x, y } = slotOffsets[slotIndex];
              const isActive = slotIndex === 0;
              let itemClassName = "text-white/70 hover:text-white text-base";
              if (isActive) itemClassName = "text-white font-bold text-xl";

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(index)}
                  className={`absolute -translate-y-1/2 text-left transition-all duration-500 ${itemClassName}`}
                  style={{
                    left: `${x}px`,
                    top: `calc(50% + ${y}px)`
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CircleAnimation;
