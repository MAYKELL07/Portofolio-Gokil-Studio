import { cn } from "@/lib/utils";

type MetricChipProps = {
  label: string;
  value: string;
  accent?: "default" | "blue" | "purple" | "lime";
  className?: string;
};

const accentClasses = {
  default: "border-[var(--color-border-strong)] bg-white/[0.03]",
  blue: "border-[var(--color-vol-blue)]/18 bg-[rgba(76,201,255,0.06)]",
  purple: "border-[var(--color-arc-purple)]/18 bg-[rgba(139,92,246,0.06)]",
  lime: "border-[var(--color-signal-lime)]/18 bg-[rgba(183,255,74,0.06)]",
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
        "rounded-[var(--radius-lg)] border px-4 py-3",
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
