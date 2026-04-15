"use client";
import React, { useState } from "react";
import Image from "next/image";

const data = [
  { name: "Banking", id: 1, img: "/images/case-study-1.jpg" },
  { name: "Healthcare", id: 2, img: "/images/cta-banner.jpg" },
  { name: "Transportation", id: 3, img: "/images/intranet.jpg" },
];

const CircleAnimation = () => {
  const [activeItem, setActiveItem] = useState(data[0]);

  return (
    <section className="common-section bg-blue-900">
      <div className="container flex justify-center">
        <div className="relative w-[420px] h-[420px] rounded-full border-4">
          {/* IMAGE LAYER */}
          {data.map(item => (
            <div
              key={item.id}
              className={`absolute w-1/2 bottom-0 h-3/4 left-1/2 -translate-x-1/2 transition-all duration-500
                ${item.id === activeItem.id ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"}`}
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
          <div className="">
            {data.map(item => {
              return (
                <div
                  key={item.id}
                  className="absolute size-full rounded-full border-4 border-white/20"
                >
                  <button
                    type="button"
                    className={`absolute text-left top-1/2 transition-all duration-500 text-white
                      ${item.id === 1 ? "translate-y-1/2 -translate-x-1/2" : ""}
                      ${item.id === 2 ? "translate-y-[calc(50%+40px)] -translate-x-[calc(50%-20px)]" : ""}
                      ${item.id === 3 ? "translate-y-[calc(50%+80px)] -translate-x-[calc(50%-40px)]" : ""}
                      `}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleAnimation;
