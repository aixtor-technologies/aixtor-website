"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type PortalFeatureSection = {
  title: string;
  description: string;
  cta_title?: string;

  center_image?: string | false;
  left_top_image?: string | false;
  left_bottom_image?: string | false;
  right_top_image?: string | false;
  right_bottom_image?: string | false;
};

type PortalFeatureProps = {
  customizable_section?: PortalFeatureSection;
};

// ─── Static fallback ──────────────────────────────────────────────────────────

const DEFAULT_DATA: PortalFeatureSection = {
  title: "Customizable Portal Development",
  description:
    "Whether you are looking to build a robust intranet, a dynamic e-commerce platform, or a feature-rich communication portal, our experts have you covered.",
  cta_title: "Contact Us",

  center_image: "/images/portal/laptop.svg",
  left_top_image: "/images/portal/mobile.svg",
  left_bottom_image: "/images/portal/ecommerce.svg",
  right_top_image: "/images/portal/network.svg",
  right_bottom_image: "/images/portal/team.svg",
};

// ─── Circle config ────────────────────────────────────────────────────────────

const CIRCLES = [
  {
    key: "center_image",
    size: 180,
    top: "50%",
    left: "45%",
    tx: "-50%",
    ty: "-50%",
    icon: 80,
    z: 2,
  },
  {
    key: "left_top_image",
    size: 110,
    top: "5%",
    left: "8%",
    tx: "0",
    ty: "0",
    icon: 44,
    z: 1,
  },
  {
    key: "left_bottom_image",
    size: 110,
    top: "62%",
    left: "5%",
    tx: "0",
    ty: "0",
    icon: 44,
    z: 1,
  },
  {
    key: "right_top_image",
    size: 90,
    top: "4%",
    left: "58%",
    tx: "0",
    ty: "0",
    icon: 36,
    z: 1,
  },
  {
    key: "right_bottom_image",
    size: 90,
    top: "65%",
    left: "60%",
    tx: "0",
    ty: "0",
    icon: 36,
    z: 1,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const PortalFeature = ({ customizable_section }: PortalFeatureProps) => {
  const data = customizable_section ?? DEFAULT_DATA;

  const { title, description, cta_title } = data;

  return (
    <section className="common-section overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ── LEFT: circles ── */}
          <div className="w-full lg:w-1/2 shrink-0 relative h-72 sm:h-80 md:h-96">
            {CIRCLES.map((c, i) => {
              const imgSrc = data[c.key as keyof PortalFeatureSection];

              if (!imgSrc) return null; // 🔥 skip if false

              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center rounded-full shadow-card-xl bg-white"
                  style={{
                    width: c.size,
                    height: c.size,
                    top: c.top,
                    left: c.left,
                    transform: `translateX(${c.tx}) translateY(${c.ty})`,
                    zIndex: c.z,
                  }}
                >
                  <Image
                    src={imgSrc as string}
                    alt="portal-icon"
                    width={c.icon}
                    height={c.icon}
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: content ── */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <Typography
              variant="h2"
              size="h3"
              isTitle
              className="text-dark-400"
            >
              {title}
            </Typography>

            <Typography
              variant="p"
              size="p"
              className="text-dark-400 text-justify leading-relaxed mt-2"
            >
              {description}
            </Typography>

            {cta_title && (
              <div className="mt-2">
                <Button href="/contact" variant="default">
                  {cta_title}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalFeature;
