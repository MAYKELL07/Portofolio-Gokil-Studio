import { ArrowRight, ArrowUpRight, Gauge, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
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

export function HomeHero({ settings }: { settings: SiteSettings }) {
  const offerPoints = [
    "Full Roblox MVPs for new launches",
    "Feature and systems sprints for live games",
    "UI / UX polish and post-launch support",
  ];

  return (
    <section className="site-container pb-10 pt-6 md:pb-16">
      <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <Reveal className="section-shell rounded-[2.2rem] p-6 md:p-8" distance={12}>
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
              eventName="cta_click"
              eventPayload={{ placement: "hero", label: "Start a Project" }}
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="#featured-work"
              variant="secondary"
              size="lg"
              eventName="cta_click"
              eventPayload={{ placement: "hero", label: "See proof now" }}
            >
              See proof now
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ButtonLink
            href="/services"
            variant="ghost"
            eventName="cta_click"
            eventPayload={{ placement: "hero", label: "Explore services" }}
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
          className="section-shell relative overflow-hidden rounded-[2.2rem] p-5 md:p-6"
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
                  <span>Studio signal board</span>
                  <span>Readable in one glance</span>
                </div>
                <div className="mt-5 rounded-[1.4rem] border border-white/6 bg-[linear-gradient(135deg,#101726,#090a0d)] p-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="signal-panel rounded-3xl p-4">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                          Core loop
                        </div>
                        <div className="mt-4 text-sm font-semibold text-white">
                          Build the repeatable player action first.
                        </div>
                        <div className="mt-4 h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(76,201,255,0.35),transparent)]" />
                      </div>
                      <div className="signal-panel rounded-3xl p-4">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                          Scope lock
                        </div>
                        <div className="mt-4 text-sm font-semibold text-white">
                          Keep milestones, risk, and handoff visible.
                        </div>
                        <div className="mt-4 h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(139,92,246,0.35),transparent)]" />
                      </div>
                    </div>
                    <div className="signal-panel rounded-3xl p-4">
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                        Launch packet
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-[1.15fr,0.85fr]">
                        <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-4 text-sm text-[var(--color-fog-300)]">
                          Fast onboarding, clear UI hierarchy, and mobile-safe performance tuning.
                        </div>
                        <div className="grid gap-3">
                          {["Retention hooks", "UI clarity", "Post-launch support"].map((item) => (
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
    </section>
  );
}
