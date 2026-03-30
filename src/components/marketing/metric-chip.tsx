import { cn } from "@/lib/utils";

type MetricChipProps = {
  label: string;
  value: string;
  accent?: "default" | "blue" | "purple" | "lime";
  className?: string;
};

const accentClasses = {
  default: "border-[var(--color-border-strong)] bg-[rgba(9,14,22,0.38)]",
  blue: "border-[var(--color-vol-blue)]/44 bg-[rgba(86,191,244,0.1)]",
  purple: "border-[var(--color-arc-purple)]/44 bg-[rgba(131,168,255,0.12)]",
  lime: "border-[var(--color-signal-lime)]/44 bg-[rgba(202,221,111,0.12)]",
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
