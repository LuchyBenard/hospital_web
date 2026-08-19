import { cn } from "@/lib/utils";

// 1px border + soft shadow. Border and background blend rather than pop.
export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface px-6 py-5 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
