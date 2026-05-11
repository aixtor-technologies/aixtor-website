"use client";

import Image from "next/image";
import Link from "next/link";

import Typography from "@/components/ui/typography";
import CustomSlider from "@/components/ui/custom-slider";

type Service = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
};

type ServicesSliderProps = {
  services: Service[];
};

export default function ServicesSlider({ services }: ServicesSliderProps) {
  return (
    <CustomSlider
      arrow
      arrowBehavior="disable"
      className="gap-4"
      itemClassName="w-[85%] sm:w-[60%] md:w-[45%] lg:w-[33.33%]"
    >
      {services.map((service) => (
        <div
          key={service.id}
          className="gradient-card border px-4 md:px-6 py-6 md:py-8 rounded shadow-card h-full"
        >
          <Image
            src={service.image ?? "/images/placeholder/placeholder.jpg"}
            alt={service.title}
            width={60}
            height={60}
            className="mb-6"
          />
          <Typography variant="h3" size="h5" className="mb-2 font-semibold">
            {service.title}
          </Typography>
          {service.description && (
            <Typography variant="p" size="p">
              {service.description}
            </Typography>
          )}
          <Link
            href={`/services/${service.slug}`}
            className="mt-3 inline-block text-sm text-primary border-b hover:text-secondary"
          >
            Know more
          </Link>
        </div>
      ))}
    </CustomSlider>
  );
}
