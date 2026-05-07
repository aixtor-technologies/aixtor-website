"use client";
import { useState } from "react";
import Image from "next/image";

type IndustryItem = {
  name: string;
  id: number;
  img: string;
};

type Props = {
  items?: IndustryItem[];
};

const CircleAnimation = ({ items = [] }: Props) => {
  const [activeItem] = useState(items[0]);

  if (!items.length) return null;

  return (
    <section className="common-section bg-blue-900">
      <div className="container flex justify-center">
        <div className="relative w-108 h-10w-108 rounded-full border-4">
          {/* IMAGE LAYER */}
          {items.map(item => (
            <div
              key={item.id}
              className={`absolute w-1/2 bottom-0 h-3/4 left-1/2 -translate-x-1/2 transition-all duration-500
                ${item.id === activeItem?.id ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"}`}
            >
              <Image src={item.img || "/images/placeholder/placeholder.jpg"} alt={item.name || "industry-img"} fill className="object-cover size-full" />
            </div>
          ))}

          {/* TEXT LAYER */}
          <div>
            {items.map((item, index) => (
              <div key={item.id} className="absolute size-full rounded-full border-4 border-white/20">
                <button
                  type="button"
                  className={`absolute text-left top-1/2 transition-all duration-500 text-white
                    ${index === 0 ? "translate-y-1/2 -translate-x-1/2" : ""}
                    ${index === 1 ? "translate-y-[calc(50%+40px)] -translate-x-[calc(50%-20px)]" : ""}
                    ${index === 2 ? "translate-y-[calc(50%+80px)] -translate-x-[calc(50%-40px)]" : ""}
                  `}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleAnimation;
