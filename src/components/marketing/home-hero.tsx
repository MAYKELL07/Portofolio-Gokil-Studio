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
              <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                <Gauge className="h-3.5 w-3.5 text-[var(--color-signal-lime)]" />
                {settings.responseSla}
              </span>
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

            <div className="mt-8 flex flex-wrap gap-2">
              {settings.proofChips.map((chip) => (
                <span key={chip} className="chip text-sm text-[var(--color-fog-300)]">
                  {chip}
                </span>
              ))}
            </div>
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
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                    <span>Story-led hero board</span>
                    <span>Image-backed at first glance</span>
                  </div>
                  <div className="mt-5 rounded-[1.4rem] border border-white/6 bg-[linear-gradient(135deg,#24140d,#110907)] p-6">
                    <DecorativeBackgroundMedia
                      src={visualImageUrl}
                      ratio="landscape"
                      sizes="(max-width: 1023px) 100vw, 36vw"
                      quality={64}
                      className="mb-4"
                      overlayClassName="bg-[linear-gradient(90deg,rgba(17,9,7,0.82),rgba(17,9,7,0.34),rgba(17,9,7,0.82))]"
                      imageClassName="opacity-70"
                    />
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="signal-panel rounded-3xl p-4">
                          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                            Story beat one
                          </div>
                          <div className="mt-4 text-sm font-semibold text-white">
                            Put the offer and the visual world in the same frame.
                          </div>
                          <div className="mt-4 h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(242,166,90,0.35),transparent)]" />
                        </div>
                        <div className="signal-panel rounded-3xl p-4">
                          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                            Story beat two
                          </div>
                          <div className="mt-4 text-sm font-semibold text-white">
                            Let the long scroll explain fit, proof, and delivery.
                          </div>
                          <div className="mt-4 h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(207,111,73,0.35),transparent)]" />
                        </div>
                      </div>
                      <div className="signal-panel rounded-3xl p-4">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                          Launch packet
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-[1.15fr,0.85fr]">
                          <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-4 text-sm text-[var(--color-fog-300)]">
                            Warm surfaces, stronger imagery, and a guided scroll sequence now establish the studio before the visitor reaches the work grid.
                          </div>
                          <div className="grid gap-3">
                            {["Offer clarity", "Proof pacing", "Contact intent"].map((item) => (
                              <div
                                key={item}
                                className="rounded-2xl border border-white/5 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {settings.heroMetrics.map((metric) => (
                    <HeroMetric key={metric.label} metric={metric} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
