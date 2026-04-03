import React from "react";

type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "base" | "small" | "xs";

interface TypographyProps<T extends React.ElementType = "p"> {
  variant?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  isTitle?: boolean;
}

const sizeClasses: Record<Size, string> = {
  h1: "text-3xl md:text-3.5xl lg:text-4xl xl:text-4xl 2xl:text-4.5xl 3xl:text-6xl 4xl:text-7xl !leading-[1.1]", // 72
  h2: "text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl 2xl:text-4.5xl 3xl:text-5.5xl 4xl:text-6.5xl !leading-[1.15]", // 66
  h3: "text-xl md:text-2xl lg:text-3xl xl:text-3.5xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl !leading-[1.2] lg:!leading-[1.15]", // 60
  h4: "text-large md:text-xl lg:text-2xl xl:text-3xl 2xl:3.5xl 3xl:text-4xl 4xl:text-5xl !leading-[1.2] lg:!leading-[1.15]", // 48
  h5: "text-lg md:text-lg lg:text-xl xl:text-1.5xl 2xl:text-1.5xl 3xl:text-3xl 4xl:text-3.5xl !leading-[1.2]", // 32
  h6: "text-base md:text-lg lg:text-xl xl:text-1.5xl 2xl:text-2xl 3xl:text-2.5xl 4xl:text-3xl !leading-[1.2]", // 24
  p: "text-sm md:text-base lg:text-base xl:text-base 2xl:text-lg 3xl:text-lg 4xl:text-lg !leading-[1.4]", // 18
  base: "text-xs md:text-small lg:text-small xl:text-small 2xl:text-base 3xl:text-base 4xl:text-base !leading-[1.36]", // 16
  small: "text-xs md:text-xSmall lg:text-xSmall xl:text-xSmall 2xl:text-xSmall 3xl:text-sm 4xl:text-sm !leading-[1.36]", // 14
  xs: "text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs 3xl:text-xs 4xl:text-xs !leading-[1.4]" // 12
};

const Typography = <T extends React.ElementType = "p">({
  variant,
  size = "p",
  className,
  children,
  isTitle = false,
  ...props
}: TypographyProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = variant || "p";
  return (
    <Component className={`${sizeClasses[size]} ${isTitle ? "uppercase" : ""} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
