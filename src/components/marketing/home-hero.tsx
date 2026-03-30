import { ArrowRight, ArrowUpRight, Gauge } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { DecorativeBackgroundMedia } from "@/components/media/site-media";
import { SafeModelHighlight } from "@/components/media/safe-model-highlight";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Metric, SiteSettings } from "@/lib/site-content";
import { getMobileSummary } from "@/lib/utils";

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
  const mobileOfferPoints = offerPoints.slice(0, 2);
  const heroModelSrc = process.env.NEXT_PUBLIC_HERO_MODEL_SRC?.trim();
  const heroModelPoster = process.env.NEXT_PUBLIC_HERO_MODEL_POSTER?.trim() || heroImageUrl;
  const visualImageUrl = heroImageUrl || "/placeholders/studio-signal-texture.svg";
  const hasResponseSla = Boolean(settings.responseSla?.trim());
  const hasTimezone = Boolean(settings.timezone?.trim());
  const hasPrimaryEmail = Boolean(settings.primaryEmail?.trim());
  const mobileHeroDescription = getMobileSummary(settings.heroDescription, 18);
  const mobileTagline = getMobileSummary(settings.tagline, 14);
  const proofMeta = [
    hasResponseSla ? settings.responseSla : null,
    hasTimezone ? `Timezone: ${settings.timezone}` : null,
    hasPrimaryEmail ? `Contact: ${settings.primaryEmail}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <section className="site-container pb-8 pt-5 md:pb-16 md:pt-6">
      <div className="section-shell p-5 sm:p-6 md:p-8 xl:p-9">
        <div className="grid gap-6 md:gap-8 xl:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)] lg:items-start">
          <Reveal className="min-w-0 w-full p-0" distance={12}>
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
              <h1 className="section-heading type-display-xl text-balance mt-4 max-w-4xl font-semibold text-white">
                {settings.heroHeadline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-fog-300)] md:hidden">
                {mobileHeroDescription}
              </p>
              <p className="type-body-lg mt-6 hidden max-w-3xl text-[var(--color-fog-300)] md:block">
                {settings.heroDescription}
              </p>
              <div className="mt-5 grid gap-2 md:hidden">
                {mobileOfferPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-3 text-sm text-[var(--color-fog-300)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden gap-3 sm:grid-cols-3 md:grid">
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
                className="w-full justify-center sm:w-auto"
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
                className="w-full justify-center sm:w-auto"
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
              className="mt-4 hidden justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white md:inline-flex"
            >
              Explore services
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <Reveal className="min-w-0 w-full space-y-4" delay={0.04} distance={12}>
            {heroModelSrc ? (
              <SafeModelHighlight
                modelSrc={heroModelSrc}
                posterSrc={heroModelPoster}
                alt="Project highlight model"
                ratio="free"
                className="h-[13.5rem] sm:h-[17rem] xl:h-[19rem]"
                overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.04),rgba(17,19,21,0.32))]"
              />
            ) : (
              <DecorativeBackgroundMedia
                src={visualImageUrl}
                ratio="free"
                sizes="(max-width: 1023px) 100vw, 36vw"
                quality={68}
                className="h-[13.5rem] sm:h-[17rem] xl:h-[19rem]"
                overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.04),rgba(17,19,21,0.32))]"
                imageClassName="opacity-100"
              />
            )}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-5">
              <p className="eyebrow">How we help</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
                {mobileTagline}
              </p>
              <p className="mt-3 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
                {settings.tagline}
              </p>
              {proofMeta.length > 0 ? (
                <p className="mt-4 hidden text-sm leading-7 text-[var(--color-fog-500)] md:block">
                  {proofMeta.join(" · ")}
                </p>
              ) : null}
            </div>
            {settings.heroMetrics.length > 0 ? (
              <div className="hidden gap-4 md:grid md:grid-cols-3">
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
