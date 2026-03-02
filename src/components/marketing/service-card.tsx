import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import type { Service } from "@/lib/site-content";

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const outcomes = compact ? service.outcomes.slice(0, 2) : service.outcomes;
  const deliverables = compact ? service.deliverables.slice(0, 2) : service.deliverables;
  const ctaLabel = service.inquiryLabel || "Start this conversation";
  const hasOutcomes = outcomes.length > 0;
  const hasDeliverables = deliverables.length > 0;

  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="chip text-xs text-white">{service.category}</span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
          {service.timeline}
        </p>
        {!compact ? (
          <span className="chip text-xs text-[var(--color-fog-300)]">Engagement ready</span>
        ) : null}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white md:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
        {service.summary}
      </p>
      <div className="mt-6 grid gap-3">
        {hasOutcomes ? (
          outcomes.map((outcome) => (
            <div
              key={outcome}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]"
            >
              {outcome}
            </div>
          ))
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]">
            Add short outcome bullets here so buyers can see what this service should improve.
          </div>
        )}
      </div>
      {!compact ? (
        <div className="mt-5 space-y-4">
          <p className="text-sm leading-7 text-[var(--color-fog-300)]">
            <span className="font-semibold text-white">Ideal for:</span> {service.idealFor}
          </p>
          <p className="text-sm leading-7 text-[var(--color-fog-300)]">
            <span className="font-semibold text-white">Engagement model:</span>{" "}
            {service.engagementModel}
          </p>
        </div>
      ) : null}
      <div className="mt-6 grid gap-3">
        {hasDeliverables ? (
          deliverables.map((deliverable) => (
            <div
              key={deliverable}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]"
            >
              {deliverable}
            </div>
          ))
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]">
            Add example deliverables here so the engagement scope stays easy to understand.
          </div>
        )}
      </div>
      {!compact ? (
        <ButtonLink
          href="/contact"
          variant="ghost"
          eventName="cta_click"
          eventPayload={{ placement: "service_card", service: service.slug, label: ctaLabel }}
          className="mt-6 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      ) : null}
    </article>
  );
}
