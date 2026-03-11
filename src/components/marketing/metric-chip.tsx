import { cn } from "@/lib/utils";

type MetricChipProps = {
  label: string;
  value: string;
  accent?: "default" | "blue" | "purple" | "lime";
  className?: string;
};

const accentClasses = {
  default: "border-[var(--color-border-strong)] bg-white/[0.03]",
  blue: "border-[var(--color-vol-blue)]/20 bg-[rgba(242,166,90,0.08)]",
  purple: "border-[var(--color-arc-purple)]/20 bg-[rgba(207,111,73,0.08)]",
  lime: "border-[var(--color-signal-lime)]/20 bg-[rgba(232,200,108,0.08)]",
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
