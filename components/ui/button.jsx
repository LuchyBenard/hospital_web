import { cn } from "@/lib/utils";

// Solid primary, neutral secondary, minimal ghost. One radius, consistent height.
const variants = {
  primary:
    "bg-accent text-accent-fg hover:opacity-90 focus-visible:outline-accent",
  secondary:
    "bg-surface text-fg border border-line hover:bg-bg focus-visible:outline-accent",
  ghost:
    "bg-transparent text-fg hover:bg-bg focus-visible:outline-accent",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
