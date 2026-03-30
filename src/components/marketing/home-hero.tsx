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
    <section className="site-container pb-10 pt-4 md:pb-20 md:pt-7">
      <div className="hero-shell section-shell p-5 sm:p-7 md:p-9 xl:p-10">
        <div className="grid gap-7 md:gap-9 xl:gap-11 lg:grid-cols-[minmax(0,1.16fr)_minmax(23rem,0.84fr)] lg:items-start">
          <Reveal className="relative z-10 min-w-0 w-full p-0" distance={12}>
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
              <p className="hero-kicker">Client delivery partner</p>
              <h1 className="section-heading type-display-xl text-balance mt-4 max-w-[16ch] font-semibold text-white">
                {settings.heroHeadline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-fog-300)] md:hidden">
                {mobileHeroDescription}
              </p>
              <p className="type-body-lg mt-6 hidden max-w-3xl text-[var(--color-fog-300)] md:block">
                {settings.heroDescription}
              </p>
              <div className="mt-6 grid gap-3 md:hidden">
                {mobileOfferPoints.map((point, index) => (
                  <div
                    key={point}
                    className="hero-offer-card"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-fog-300)]">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 hidden gap-3 sm:grid-cols-2 xl:grid-cols-3 md:grid">
                {offerPoints.map((point, index) => (
                  <div
                    key={point}
                    className="hero-offer-card"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-fog-300)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
              className="mt-5 hidden justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white md:inline-flex"
            >
              Explore services
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <Reveal className="relative z-10 min-w-0 w-full space-y-4" delay={0.04} distance={12}>
            {heroModelSrc ? (
              <SafeModelHighlight
                modelSrc={heroModelSrc}
                posterSrc={heroModelPoster}
                alt="Project highlight model"
                ratio="free"
                className="h-[13.5rem] sm:h-[17rem] xl:h-[19rem]"
                overlayClassName="bg-[linear-gradient(180deg,rgba(8,12,20,0.03),rgba(8,12,20,0.42))]"
              />
            ) : (
              <DecorativeBackgroundMedia
                src={visualImageUrl}
                ratio="free"
                sizes="(max-width: 1023px) 100vw, 36vw"
                quality={68}
                className="h-[13.5rem] sm:h-[17rem] xl:h-[19rem]"
                overlayClassName="bg-[linear-gradient(180deg,rgba(8,12,20,0.03),rgba(8,12,20,0.42))]"
                imageClassName="opacity-100"
              />
            )}
            <div className="hero-note-card p-5">
              <p className="eyebrow">How we help</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
                {mobileTagline}
              </p>
              <p className="mt-3 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
                {settings.tagline}
              </p>
              {proofMeta.length > 0 ? (
                <div className="mt-4 hidden flex-wrap gap-2 md:flex">
                  {proofMeta.map((item) => (
                    <span key={item} className="chip text-[11px] text-[var(--color-fog-300)]">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {settings.heroMetrics.length > 0 ? (
              <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
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
