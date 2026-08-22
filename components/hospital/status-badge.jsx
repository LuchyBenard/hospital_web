import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }) {
  if (!status) return null;
  const s = status.toLowerCase();

  let variant = "badge";
  if (s === "upcoming" || s === "active" || s === "normal") {
    variant = "badge badge-success";
  } else if (s === "emergency" || s === "urgent" || s === "cancelled") {
    variant = "badge badge-emergency";
  } else if (s === "completed" || s === "reviewed") {
    variant = "badge badge-info";
  } else if (s === "pending" || s === "warning") {
    variant = "badge badge-warning";
  } else {
    variant = "badge badge-accent";
  }

  return (
    <span className={cn(variant, className)}>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "currentColor" }}
      />
      {status}
    </span>
  );
}
