import type { LucideIcon } from "lucide-react";

type ProcessStepCardProps = {
  title: string;
  body: string;
  icon: LucideIcon;
  index: number;
};

export function ProcessStepCard({
  title,
  body,
  icon: Icon,
  index,
}: ProcessStepCardProps) {
  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white/[0.03]">
          <Icon className="h-5 w-5 text-[var(--color-vol-blue)]" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
          Step {index + 1}
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">{body}</p>
    </article>
  );
}
