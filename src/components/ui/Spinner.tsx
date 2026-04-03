import type { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
};

export function Spinner({
  className = "",
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block size-5 animate-spin rounded-full border-2 border-zinc-200 border-t-[var(--brand)] dark:border-zinc-700 ${className}`}
      {...props}
    />
  );
}
