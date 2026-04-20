"use client";
import { useEffect, useRef, useState, useMemo } from "react";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";

/* ------------------ Hook: Count Animation ------------------ */
function useCountUp(end: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frameId: number;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * end);

      setCount((prev) => (prev !== value ? value : prev));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration]);

  return count;
}

/* ------------------ Hook: Intersection ------------------ */
function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------ Types (API Based) ------------------ */
type Stat = {
  counter_number: string;
  counter_title: string;
};

type Props = {
  stats: Stat[];
};

/* ------------------ Card ------------------ */
function StatCard({ counter_number, counter_title }: Stat) {
  const { ref, inView } = useInView();

  // parse number + suffix (e.g., "45+" → 45 + "+")
  const { number, suffix } = useMemo(() => {
    const num = parseInt(counter_number);
    return {
      number: isNaN(num) ? 0 : num,
      suffix: counter_number.replace(num.toString(), ""),
    };
  }, [counter_number]);

  const count = useCountUp(number, inView);

  return (
    <div
      ref={ref}
      className="p-4 md:p-5 lg:p-6 shadow-card text-center"
    >
      <Typography
        variant="h3"
        size="h3"
        className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-bold"
      >
        {inView ? `${count}${suffix}` : "0"}
      </Typography>

      <Typography variant="p" size="p" className="mt-2 font-medium">
        {counter_title}
      </Typography>
    </div>
  );
}

/* ------------------ Section ------------------ */
export default function StatsSection({ stats }: Props) {
  return (
    <section className="py-10 lg:py-16">
      <Grid className="justify-center">
        <Grid.Col className="md:w-11/12">
          <Grid className="gap-y-4">
            {stats.map((stat) => (
              <Grid.Col
                key={stat.counter_title}
                className="w-6/12! md:w-3/12!"
              >
                <StatCard
                  counter_number={stat.counter_number}
                  counter_title={stat.counter_title}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </section>
  );
}
