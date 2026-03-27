import { ArrowRight, ArrowUpRight, Gauge } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { DecorativeBackgroundMedia } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Metric, SiteSettings } from "@/lib/site-content";

function HeroMetric({ metric }: { metric: Metric }) {
  return (
    <MetricChip
      label={metric.label}
      value={metric.value}
      accent="blue"
      className="signal-panel p-4"
    />
  );
}

export function HomeHero({
  settings,
  heroImageUrl,
}: {
  settings: SiteSettings;
  heroImageUrl?: string;
}) {
  const offerPoints = [
    "Full game builds and vertical slices",
    "Feature, systems, and live game support",
    "Milestones, handoff, and production support",
  ];
  const visualImageUrl = heroImageUrl || "/placeholders/studio-signal-texture.svg";
  const hasResponseSla = Boolean(settings.responseSla?.trim());
  const hasTimezone = Boolean(settings.timezone?.trim());
  const hasPrimaryEmail = Boolean(settings.primaryEmail?.trim());
  const proofMeta = [
    hasResponseSla ? settings.responseSla : null,
    hasTimezone ? `Timezone: ${settings.timezone}` : null,
    hasPrimaryEmail ? `Contact: ${settings.primaryEmail}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <section className="site-container pb-10 pt-6 md:pb-16">
      <div className="section-shell p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
          <Reveal className="p-0" distance={12}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                {settings.heroEyebrow}
              </span>
              {hasResponseSla ? (
                <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                  <Gauge className="h-3.5 w-3.5 text-[var(--color-vol-blue)]" />
                  {settings.responseSla}
                </span>
              ) : null}
            </div>

            <div className="mt-8">
              <p className="eyebrow">Client delivery partner</p>
              <h1 className="section-heading type-display-xl text-balance mt-4 font-semibold text-white">
                {settings.heroHeadline}
              </h1>
              <p className="type-body-lg mt-6 max-w-2xl text-[var(--color-fog-300)]">
                {settings.heroDescription}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {offerPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-3 text-sm text-[var(--color-fog-300)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                size="lg"
                eventName={ANALYTICS_EVENTS.HERO_CTA_CLICK}
                eventPayload={{
                  page: "home",
                  section: "hero_primary",
                  cta_label: "Start a Project",
                  destination: "/contact",
                }}
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="#featured-work"
                variant="secondary"
                size="lg"
                eventName={ANALYTICS_EVENTS.HERO_CTA_CLICK}
                eventPayload={{
                  page: "home",
                  section: "hero_secondary",
                  cta_label: "See work",
                  destination: "#featured-work",
                }}
              >
                See work
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <ButtonLink
              href="/services"
              variant="ghost"
              eventName={ANALYTICS_EVENTS.HERO_CTA_CLICK}
              eventPayload={{
                page: "home",
                section: "hero_tertiary",
                cta_label: "Explore services",
                destination: "/services",
              }}
              className="mt-4 justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white"
            >
              Explore services
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <Reveal className="space-y-4" delay={0.04} distance={12}>
            <DecorativeBackgroundMedia
              src={visualImageUrl}
              ratio="landscape"
              sizes="(max-width: 1023px) 100vw, 36vw"
              quality={68}
              className="min-h-[18rem]"
              overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.04),rgba(17,19,21,0.32))]"
              imageClassName="opacity-100"
            />
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-5">
              <p className="eyebrow">How we help</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                {settings.tagline}
              </p>
              {proofMeta.length > 0 ? (
                <p className="mt-4 text-sm leading-7 text-[var(--color-fog-500)]">
                  {proofMeta.join(" • ")}
                </p>
              ) : null}
            </div>
            {settings.heroMetrics.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                {settings.heroMetrics.map((metric) => (
                  <HeroMetric key={metric.label} metric={metric} />
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
