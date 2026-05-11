"use client";

import Image from "next/image";
import { useEffect, useId } from "react";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type SliderImageGroup = {
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
};

type SliderSection = {
  slider_images: SliderImageGroup[] | null;
};

type LifeAixtor = {
  heading: string;
  description: string;
  top_slider_images: SliderSection;
  bottom_slider_images: SliderSection;
  cta_title: string;
  cta_link: string | null;
};

type LifeAtAixtorProps = {
  life_aixtor?: LifeAixtor;
};

// ─── Flatten nested slider groups into a flat image URL array ─────────────────

function flattenSliderImages(section: SliderSection | null | undefined): string[] {
  if (!section?.slider_images) return [];
  return section.slider_images.flatMap(group =>
    [group.image_1, group.image_2, group.image_3].filter((src): src is string => !!src)
  );
}

// ─── Column strip ─────────────────────────────────────────────────────────────

const ColumnStrip = ({ images }: { images: string[] }) => {
  const rawId = useId();
  const uid = `col${rawId.replace(/:/g, "")}`;
  const duration = 30;

  useEffect(() => {
    const style = document.createElement("style");
    style.id = uid;
    style.textContent = `
      @keyframes ${uid} {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .${uid}-track {
        animation: ${uid} ${duration}s linear infinite;
        will-change: transform;
      }
      .${uid}-track:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById(uid)?.remove();
  }, [uid]);

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`${uid}-track flex gap-3 items-stretch`}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div key={i} className="shrink-0 rounded-xl overflow-hidden w-36 sm:w-44 md:w-52 lg:w-56">
            <Image
              src={src || "/images/placeholder/placeholder.jpg"}
              alt=""
              width={224}
              height={200}
              className="w-full h-[200px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── LifeAtAixtor ─────────────────────────────────────────────────────────────

const LifeAtAixtor = ({ life_aixtor }: LifeAtAixtorProps) => {
  if (!life_aixtor) return null;

  const { heading, description, top_slider_images, bottom_slider_images, cta_title, cta_link } = life_aixtor;

  const topImages = flattenSliderImages(top_slider_images);
  const bottomImages = flattenSliderImages(bottom_slider_images);
  const allImages = [...topImages, ...bottomImages];

  return (
    <section className="common-section bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-10 max-w-4xl mx-auto">
          <Typography variant="h2" size="h3" isTitle isCenter className="mb-6">
            {heading}
          </Typography>
          <Typography
            variant="p"
            size="p"
            className="text-dark-400 leading-relaxed text-justify"
          >
            {description}
          </Typography>
        </div>
      </div>

      {allImages.length > 0 && <ColumnStrip images={allImages} />}

      <div className="container flex justify-center mt-10">
        <Button
          href={cta_link || "/contact"}
          variant="default"
          size="default"
          rounded="default"
        >
          {cta_title}
        </Button>
      </div>
    </section>
  );
};

export default LifeAtAixtor;
