import { ArrowRight, ArrowUpRight, Gauge, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { DecorativeBackgroundMedia, HeroMedia } from "@/components/media/site-media";
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
  heroImageAlt,
}: {
  settings: SiteSettings;
  heroImageUrl?: string;
  heroImageAlt?: string;
}) {
  const offerPoints = [
    "Full Roblox MVPs for new launches",
    "Feature and systems sprints for live games",
    "UI / UX polish and post-launch support",
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
      <div className="section-shell relative overflow-hidden rounded-[2.5rem] p-4 md:p-6">
        <HeroMedia
          src={visualImageUrl}
          alt={heroImageUrl ? heroImageAlt || settings.heroHeadline : settings.heroHeadline}
          priority
        />

        <div className="relative z-[1] grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <Reveal
            className="rounded-[2.2rem] border border-white/10 bg-[rgba(29,16,9,0.52)] p-6 backdrop-blur-md md:p-8"
            distance={12}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-vol-blue)]" />
                {settings.heroEyebrow}
              </span>
              {hasResponseSla ? (
                <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                  <Gauge className="h-3.5 w-3.5 text-[var(--color-signal-lime)]" />
                  {settings.responseSla}
                </span>
              ) : null}
            </div>

            <div className="mt-8">
              <p className="eyebrow">What we build and why it performs</p>
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
                    className="rounded-3xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]"
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
                  cta_label: "See proof now",
                  destination: "#featured-work",
                }}
              >
                See proof now
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

            {settings.proofChips.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {settings.proofChips.map((chip) => (
                  <span key={chip} className="chip text-sm text-[var(--color-fog-300)]">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal
            className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[rgba(20,10,6,0.56)] p-5 backdrop-blur-md md:p-6"
            delay={0.04}
            distance={12}
          >
            <div className="hero-orb right-12 top-10 h-24 w-24 bg-[var(--color-vol-blue)]" />
            <div className="hero-orb bottom-20 left-10 h-28 w-28 bg-[var(--color-arc-purple)]" />
            <div className="hero-orb bottom-8 right-16 h-24 w-24 bg-[var(--color-signal-lime)]" />
            <div className="signal-panel signal-outline relative rounded-[1.8rem] p-5">
              <div className="grid gap-4">
                <div className="signal-panel rounded-[1.4rem] p-5">
                  <DecorativeBackgroundMedia
                    src={visualImageUrl}
                    ratio="landscape"
                    sizes="(max-width: 1023px) 100vw, 36vw"
                    quality={64}
                    className="rounded-[1.5rem]"
                    overlayClassName="bg-[linear-gradient(180deg,rgba(17,9,7,0.18),rgba(17,9,7,0.3),rgba(17,9,7,0.82))]"
                    imageClassName="opacity-72"
                  />
                  <div className="mt-5 grid gap-4">
                    <div className="rounded-[1.4rem] border border-white/6 bg-black/20 p-5">
                      <p className="eyebrow">Proof</p>
                      <h2 className="mt-3 text-xl font-semibold text-white">{settings.tagline}</h2>
                      {proofMeta.length > 0 ? (
                        <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
                          {proofMeta.join(" • ")}
                        </p>
                      ) : null}
                    </div>

                    {settings.proofChips.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {settings.proofChips.map((chip) => (
                          <span key={chip} className="chip text-sm text-[var(--color-fog-300)]">
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                {settings.heroMetrics.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {settings.heroMetrics.map((metric) => (
                      <HeroMetric key={metric.label} metric={metric} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
