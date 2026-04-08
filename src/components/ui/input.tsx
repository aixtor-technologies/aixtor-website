import * as React from "react";

type Variant = "default" | "white";
type Size = "default" | "small";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  inputSize?: Size;
  error?: string;
}

const baseClasses =
  "block w-full rounded-lg border-0 text-base transition-colors outline-none focus:ring-0";

const variantClasses: Record<Variant, string> = {
  default:
    "bg-body text-black border-slate-200 placeholder:text-slate-400 focus:border-primary",
  white:
    "bg-white text-black border-white placeholder:text-slate-400 focus:border-white",
};

const sizeClasses: Record<Size, string> = {
  default: "h-12 px-4",
  small: "h-10 px-3 text-sm",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      inputSize = "default",
      className = "",
      type = "text",
      error,
      ...props
    },
    ref
  ) => {
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[inputSize],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="mb-4 md:mb-5 lg:mb-6">
        <input ref={ref} type={type} className={classes} {...props} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
