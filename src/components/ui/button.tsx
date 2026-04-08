import Link from "next/link";
import * as React from "react";

type Variant = "default" | "danger" | "white" | "light" | "outline";

type Size = "default";
type Rounded = "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  rounded?: Rounded;
  isLoading?: boolean;
  href?: string; // if present → renders <a>
}

const baseClasses =
  "inline-flex font-semibold border gap-1 xl:gap-2 items-center justify-center whitespace-nowrap relative shrink-0 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  default: "bg-linear-to-r from-primary to-secondary text-white border-white",
  danger: "bg-danger text-danger-800 hover:bg-danger/90 border-transparent",
  white:
    "bg-white text-secondary hover:bg-secondary hover:text-white border-transparent",
  light:
    "bg-white/10 text-white hover:bg-white/20 hover:text-white border-transparent",
  outline:
    "border-primary text-primary bg-white hover:bg-primary hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  default: "h-10 md:h-12 px-4 text-base px-8",
  // sm: "h-9 md:h-11 px-3 text-sm",
};

const roundedClasses: Record<Rounded, string> = {
  default: "rounded-full",
};

const Spinner = () => (
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
);

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      rounded = "default",
      isLoading,
      className = "",
      children,
      href,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      roundedClasses[rounded],
      className,
    ].join(" ");

    const content = (
      <>
        {isLoading && <Spinner />}
        <span className={isLoading ? "opacity-0" : "flex items-center gap-2"}>
          {children}
        </span>
      </>
    );

    // 👉 Render as <a> if href exists
    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={isLoading || disabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    // 👉 Default button
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isLoading || disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
