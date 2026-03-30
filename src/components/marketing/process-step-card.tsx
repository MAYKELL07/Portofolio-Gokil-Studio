import type { LucideIcon } from "lucide-react";
import { getMobileSummary } from "@/lib/utils";

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
  const mobileBody = getMobileSummary(body, 14);

  return (
    <article className="section-shell interactive-card bento-card flex h-full flex-col p-5 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-transparent">
          <Icon className="h-5 w-5 text-[var(--color-vol-blue)]" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
          Step {index + 1}
        </span>
      </div>
      <h3 className="mt-5 text-balance text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">{mobileBody}</p>
      <p className="mt-3 hidden flex-1 text-sm leading-7 text-[var(--color-fog-300)] md:block">{body}</p>
    </article>
  );
}
