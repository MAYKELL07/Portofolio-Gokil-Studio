import { cn } from "@/lib/utils";

type MetricChipProps = {
  label: string;
  value: string;
  accent?: "default" | "blue" | "purple" | "lime";
  className?: string;
};

const accentClasses = {
  default: "border-[var(--color-border-strong)] bg-transparent",
  blue: "border-[var(--color-vol-blue)]/30 bg-[rgba(91,141,239,0.06)]",
  purple: "border-[var(--color-vol-blue)]/30 bg-[rgba(91,141,239,0.06)]",
  lime: "border-[var(--color-vol-blue)]/30 bg-[rgba(91,141,239,0.06)]",
} as const;

export function MetricChip({
  label,
  value,
  accent = "default",
  className,
}: MetricChipProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border px-3.5 py-3 md:px-4",
        accentClasses[accent],
        className,
      )}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
