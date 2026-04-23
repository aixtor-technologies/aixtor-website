"use client";

import Image from "next/image";
import Slider from "react-slick";

import Typography from "@/components/ui/typography";
import Button from "@/components/ui/button";

type EmpowerSection = {
  title: string;
  description: string;
  cta_title: string;
  move_up_image_list: { move_up_image: string }[];
  move_down_image_list: { move_down_image: string }[];
};

type EmpowerSectionProps = {
  empower_section?: EmpowerSection;
};

const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  vertical: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 3000,
  cssEase: "linear",
  pauseOnHover: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 640, settings: { slidesToShow: 2 } },
  ],
};

export default function EmpowerSection({
  empower_section,
}: EmpowerSectionProps) {
  if (!empower_section) return null;

  const {
    title,
    description,
    cta_title,
    move_up_image_list,
    move_down_image_list,
  } = empower_section;

  return (
    <section className=" bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* ── LEFT ──   */}
          <div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-4">
            <Typography variant="h1" size="h3" className="text-dark-400" isTitle>
              {title}
            </Typography>

            <Typography className="text-dark-400 leading-relaxed">
              {description}
            </Typography>

            {cta_title && (
              <Button href="/contact" className="mt-2 w-fit">
                {cta_title}
              </Button>
            )}
          </div>

          <div className="w-full lg:w-1/2 min-w-0 flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
            <div className="w-20 md:w-25 lg:w-30 h-70 md:h-85 lg:h-95 overflow-hidden shrink-0">
              <Slider {...sliderSettings}>
                {move_up_image_list.map((item, i) => (
                  <div key={i} className="flex justify-center py-3">
                    <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-dark-200 flex items-center justify-center shadow-sm mx-auto">
                      <Image
                        src={item.move_up_image}
                        alt=""
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* DOWN slider */}
            <div className="w-20 md:w-25 lg:w-30 h-70 md:h-85 lg:h-95 overflow-hidden shrink-0">
              <Slider {...sliderSettings} rtl={true}>
                {move_down_image_list.map((item, i) => (
                  <div key={i} className="flex justify-center py-3">
                    <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-dark-200 flex items-center justify-center shadow-sm mx-auto">
                      <Image
                        src={item.move_down_image}
                        alt=""
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
