"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import Typography from "@/components/ui/typography";

type Props = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: Props) {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const number = parseInt(value);
  const suffix = value.replace(number.toString(), "");

  return (
    <div ref={ref} className="p-4 md:p-5 lg:p-6 shadow-card">
      <Typography
        variant="h3"
        size="h3"
        className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-bold"
      >
        {start ? <CountUp end={number} duration={2} suffix={suffix} /> : "0"}
      </Typography>

      <Typography variant="p" size="p" className="mt-2 font-medium">
        {label}
      </Typography>
    </div>
  );
}
