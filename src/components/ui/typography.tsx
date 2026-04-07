import React from "react";

type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
// | "base" | "small" | "xs";

interface TypographyProps<T extends React.ElementType = "p"> {
  variant?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  isTitle?: boolean;
  isCenter?: boolean;
}

const sizeClasses: Record<Size, string> = {
  h1: "text-3xl md:text-3.5xl lg:text-4xl xl:text-56 ", // 56
  h2: "text-2xl md:text-3xl lg:text-3.5xl xl:text-40 font-semibold", // 40
  h3: "text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold", // 36
  h4: "text-large md:text-xl lg:text-2xl xl:text-2xl", // 24
  h5: "text-lg md:text-lg lg:text-xl xl:text-xl ", // 20
  h6: "text-base md:text-lg lg:text-xl xl:text-lg", // 18
  p: "text-sm md:text-base lg:text-base xl:text-base", // 16
  // base: "text-xs md:text-small lg:text-small xl:text-base", // 16
  // small: "text-xs md:text-xSmall lg:text-xSmall xl:text-xSmall 2xl:text-xSmall 3xl:text-sm 4xl:text-sm", // 14
  // xs: "text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs 3xl:text-xs 4xl:text-xs" // 12
};

const Typography = <T extends React.ElementType = "p">({
  variant,
  size = "p",
  className = "",
  children,
  isTitle = false,
  isCenter = false,
  ...props
}: TypographyProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = variant || "p";
  return (
    <Component className={`${sizeClasses[size]}  ${isTitle ? "after:content-[''] after:block after:w-44 after:h-px after:bg-linear-to-r after:from-primary after:to-secondary after:mt-2" : ""}  ${isCenter ? "text-center after:mx-auto" : ""}  ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
