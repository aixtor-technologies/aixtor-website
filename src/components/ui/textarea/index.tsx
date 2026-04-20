import * as React from "react";

type Variant = "default" | "white";
type Size = "default" | "small";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: Variant;
  inputSize?: Size;
  error?: string;
}

const baseClasses =
  "block w-full rounded-lg border-0 text-base transition-colors outline-none focus:ring-0 resize-none overflow-auto";

const variantClasses: Record<Variant, string> = {
  default:
    "bg-dark-200 text-black border-slate-200 placeholder:text-slate-400 focus:border-primary",
  white:
    "bg-white text-black border-white placeholder:text-slate-400 focus:border-white",
};

const sizeClasses: Record<Size, string> = {
  default: "h-28 md:h-32 px-4 py-3",
  small: "h-28 px-3 py-2",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      inputSize = "default",
      className = "",
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
        <textarea ref={ref} className={classes} {...props} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
