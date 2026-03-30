import { ArrowRight } from "lucide-react";

import { ProjectCoverMedia } from "@/components/media/site-media";
import { ButtonLink } from "@/components/ui/button";
import type { Service } from "@/lib/site-content";
import { getMobileSummary } from "@/lib/utils";

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
  const visualSrc = service.featuredImageUrl || "/placeholders/studio-signal-texture.svg";
  const hasCompactVisual = compact && Boolean(service.featuredImageUrl);
  const mobileSummary = getMobileSummary(service.summary, 15);
  const mobileIdealFor = getMobileSummary(service.idealFor, 14);
  const mobileDetailPoints = [
    `Timeline: ${service.timeline}`,
    `Model: ${getMobileSummary(service.engagementModel, 8)}`,
    hasDeliverables ? `Includes: ${getMobileSummary(deliverables[0], 8)}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <article
      className={`section-shell interactive-card bento-card flex h-full flex-col ${
        compact ? "p-4 md:p-6 xl:p-6" : "p-5 md:p-6 xl:p-7"
      }`}
    >
      {hasCompactVisual ? (
        <div className="mb-4">
          <ProjectCoverMedia
            src={service.featuredImageUrl}
            alt={service.featuredImageAlt || service.title}
            ratio="landscape"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 40vw"
            quality={70}
            interactive={false}
            overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.06),rgba(17,19,21,0.38))]"
            className="min-h-[9rem] md:min-h-[10.5rem]"
          >
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="chip text-xs text-white">{service.category}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Service view
              </span>
            </div>
          </ProjectCoverMedia>
        </div>
      ) : null}
      {!compact ? (
        <div className="mb-4 md:mb-5">
          <ProjectCoverMedia
            src={visualSrc}
            alt={service.featuredImageAlt || service.title}
            ratio="landscape"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 40vw"
            quality={70}
            interactive={false}
            overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.04),rgba(17,19,21,0.42))]"
          >
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="chip text-xs text-white">{service.category}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Service
              </span>
            </div>
          </ProjectCoverMedia>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="chip text-xs text-[var(--color-fog-300)]">{service.category}</span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
          {service.timeline}
        </p>
      </div>
      <h3 className="mt-4 text-balance text-2xl font-semibold text-white md:text-[1.85rem]">
        {service.title}
      </h3>
      <div className="mt-4 flex flex-1 flex-col space-y-3">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
            What it is
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
            {mobileSummary}
          </p>
          <p className="mt-2 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
            {service.summary}
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
            When to hire us
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
            {mobileIdealFor}
          </p>
          <p className="mt-2 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
            {service.idealFor}
          </p>
        </div>
        {!compact ? (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
              Engagement
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
              <span className="font-semibold text-white">Typical timeline:</span> {service.timeline}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
              <span className="font-semibold text-white">How it is bought:</span> {service.engagementModel}
            </p>
          </div>
        ) : null}
      </div>
      {!compact ? (
        <div className="mt-5 grid gap-2 md:hidden">
          {mobileDetailPoints.map((point) => (
            <div
              key={point}
              className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3.5 py-3 text-sm text-[var(--color-fog-300)] md:px-4"
            >
              {point}
            </div>
          ))}
        </div>
      ) : null}
      {hasDeliverables ? (
        <div className="mt-5 hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4 md:block">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
            What is included
          </div>
          <div className="mt-3 grid gap-3">
            {deliverables.map((deliverable) => (
              <div
                key={deliverable}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 py-3 text-sm text-[var(--color-fog-300)] md:px-4"
              >
                {deliverable}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {hasOutcomes ? (
        <div className="mt-5 hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4 md:block">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
            Outcome this helps create
          </div>
          <div className="mt-3 grid gap-3">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 py-3 text-sm text-[var(--color-fog-300)] md:px-4"
              >
                {outcome}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {!compact ? (
        <ButtonLink
          href="/contact"
          variant="ghost"
          eventName="cta_click"
          eventPayload={{ placement: "service_card", service: service.slug, label: ctaLabel }}
          className="mt-auto pt-5 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      ) : null}
    </article>
  );
}
