"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type GalleryImage = {
  src: string;
  alt: string;
  tall?: boolean; // if true, image spans full height (like the centre one)
};

type LifeAtAixtorProps = {
  title?: string;
  description?: string;
  images?: GalleryImage[];
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_IMAGES: GalleryImage[] = [
  { src: "/images/life/team-outing-1.jpg", alt: "Team outing" },
  { src: "/images/life/fun-friday.jpg", alt: "Fun Friday" },
  {
    src: "/images/life/rooftop-team.jpg",
    alt: "Rooftop team photo",
    tall: true,
  },
  { src: "/images/life/office-party.jpg", alt: "Office party" },
  { src: "/images/life/outdoor-lunch.jpg", alt: "Outdoor lunch" },
  { src: "/images/life/cricket-event.jpg", alt: "Cricket event" },
  { src: "/images/life/anniversary.jpg", alt: "Work anniversary" },
  { src: "/images/life/team-outing-2.jpg", alt: "Team outing 2" },
  { src: "/images/life/boardroom.jpg", alt: "Boardroom fun" },
  { src: "/images/life/casual-friday-2.jpg", alt: "Casual Friday" },
];

// ─── Column layout: 4 columns, each with 2 images stacked (except col 2 = tall single) ──

const COLUMNS: GalleryImage[][] = [
  // col 1 — two stacked
  [DEFAULT_IMAGES[0], DEFAULT_IMAGES[1]],
  // col 2 — one tall
  [{ ...DEFAULT_IMAGES[2], tall: true }],
  // col 3 — two stacked
  [DEFAULT_IMAGES[3], DEFAULT_IMAGES[4]],
  // col 4 — two stacked
  [DEFAULT_IMAGES[5], DEFAULT_IMAGES[6]],
];

// ─── Auto-sliding strip ───────────────────────────────────────────────────────

const SLIDE_SPEED = 40; // px per second

const SlidingGallery = ({ images }: { images: GalleryImage[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const uid = useRef(`sg-${Math.random().toString(36).slice(2, 7)}`).current;

  // Each "card" is ~280px wide + 12px gap
  const CARD_W = 280;
  const GAP = 12;
  const totalW = images.length * (CARD_W + GAP);
  const duration = totalW / SLIDE_SPEED;

  useEffect(() => {
    const style = document.createElement("style");
    style.id = uid;
    style.textContent = `
      @keyframes ${uid} {
        from { transform: translateX(0); }
        to   { transform: translateX(-${totalW}px); }
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
  }, [uid, totalW, duration]);

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className={`${uid}-track flex gap-3`}
        style={{ width: "max-content" }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="shrink-0 rounded-xl overflow-hidden"
            style={{ width: CARD_W }}
          >
            {img.tall ? (
              // Tall image spans ~2 row heights
              <Image
                src={img.src}
                alt={img.alt}
                width={CARD_W}
                height={420}
                className="w-full h-[420px] object-cover"
              />
            ) : (
              // Two stacked layout via a column wrapper
              <div className="flex flex-col gap-3 h-[420px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={CARD_W}
                  height={200}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
                {/* second image from pairs */}
                {doubled[i + 1] && !doubled[i + 1].tall && (
                  <Image
                    src={doubled[i + 1].src}
                    alt={doubled[i + 1].alt}
                    width={CARD_W}
                    height={200}
                    className="w-full h-[200px] object-cover rounded-xl"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Better approach: flat image strip with mixed heights ─────────────────────

const ImageStrip = ({ images }: { images: GalleryImage[] }) => {
  const uid = useRef(`strip-${Math.random().toString(36).slice(2, 7)}`).current;

  const TOTAL_W = images.length * 300; // approx
  const duration = TOTAL_W / SLIDE_SPEED;

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
  }, [uid, duration]);

  // Duplicate for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`${uid}-track flex gap-3 items-stretch`}
        style={{ width: "max-content" }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className={`shrink-0 rounded-xl overflow-hidden ${img.tall ? "w-56 md:w-72" : "w-44 md:w-56"}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.tall ? 288 : 224}
              height={img.tall ? 420 : 200}
              className={`w-full object-cover ${img.tall ? "h-[420px]" : "h-[200px]"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Column pair strip — exactly matches screenshot layout ────────────────────

const ColumnStrip = ({ images }: { images: GalleryImage[] }) => {
  const uid = useRef(`col-${Math.random().toString(36).slice(2, 7)}`).current;
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

  // Group images into columns: every odd-indexed = tall, even = paired
  const buildColumns = (imgs: GalleryImage[]) => {
    const cols: { tall: boolean; images: GalleryImage[] }[] = [];
    let i = 0;
    while (i < imgs.length) {
      if (imgs[i]?.tall) {
        cols.push({ tall: true, images: [imgs[i]] });
        i += 1;
      } else {
        cols.push({ tall: false, images: imgs.slice(i, i + 2) });
        i += 2;
      }
    }
    return cols;
  };

  const cols = [...buildColumns(images), ...buildColumns(images)];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`${uid}-track flex gap-3`}
        style={{ width: "max-content" }}
      >
        {cols.map((col, ci) => (
          <div key={ci} className="shrink-0 flex flex-col gap-3 h-[420px]">
            {col.tall ? (
              <div className="w-56 md:w-64 h-full rounded-xl overflow-hidden">
                <Image
                  src={col.images[0].src}
                  alt={col.images[0].alt}
                  width={256}
                  height={420}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-44 md:w-56 flex flex-col gap-3 h-full">
                {col.images.map((img, ii) => (
                  <div key={ii} className="flex-1 rounded-xl overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={224}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── LifeAtAixtor ─────────────────────────────────────────────────────────────

const DEFAULT_DESCRIPTION =
  "In our inspiring workspace, you will find not just desks and chairs, but a playground for ideas to flourish. From casual Fridays that turn into impromptu cricket tournaments to boardroom meetings that double as stand-up comedy shows, we believe in infusing every moment with joy and excitement. We celebrate diversity and embrace the unique talents of each team member, fostering an environment where everyone feels valued and empowered to shine. But it's not all about work at Aixtor– we know how to have fun too! Whether it is team outings to explore the vibrant city streets, fun Fridays, discussing life over lunches, or cheering up for cricket finales, we believe in striking the perfect balance between work and play.";

const LifeAtAixtor = ({
  title = "Life at AIXTOR",
  description = DEFAULT_DESCRIPTION,
  images = DEFAULT_IMAGES,
}: LifeAtAixtorProps) => (
  <section className="common-section bg-white overflow-hidden">
    <div className="container">
      {/* Heading + description */}
      <div className="flex flex-col items-center text-center mb-10 max-w-4xl mx-auto">
        <Typography variant="h2" size="h3" isTitle isCenter className="mb-6">
          {title}
        </Typography>
        <Typography
          variant="p"
          size="p"
          className="text-dark-300 leading-relaxed text-justify"
        >
          {description}
        </Typography>
      </div>
    </div>

    {/* Full-width sliding gallery — outside container so it bleeds edge to edge */}
    <ColumnStrip images={images} />

    <div className="container flex justify-center mt-10">
      <Button
        href="/contact"
        variant="default"
        size="default"
        rounded="default"
      >
        Join us
      </Button>
    </div>
  </section>
);

export default LifeAtAixtor;
