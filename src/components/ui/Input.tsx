import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", id, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 ${className}`}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
