import { ArrowRight, ArrowUpRight, Check, Layers3, ShieldCheck, TimerReset } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { FeaturedWorkStrip } from "@/components/marketing/featured-work-strip";
import { HomeHero } from "@/components/marketing/home-hero";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ProcessStepCard } from "@/components/marketing/process-step-card";
import { SectionTextureDivider } from "@/components/marketing/section-texture-divider";
import { ServiceCard } from "@/components/marketing/service-card";
import { TeamCard } from "@/components/marketing/team-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { createAbsoluteUrl } from "@/lib/utils";
import {
  getFaqItems,
  getFeaturedProjects,
  getHomePageContent,
  getServices,
  getSiteSettings,
  getTeam,
  getTestimonials,
} from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Maykell Interactive | Roblox Game Studio Portfolio",
  description:
    "Premium Roblox game studio portfolio built for fast trust, rich case studies, and qualified lead generation.",
  path: "/",
});

const processSteps = [
  Layers3,
  ShieldCheck,
  TimerReset,
];

export default async function Home() {
  const [settings, homePage, featuredProjects, services, team, testimonials, faqItems] =
    await Promise.all([
      getSiteSettings(),
      getHomePageContent(),
      getFeaturedProjects(),
      getServices(),
      getTeam(),
      getTestimonials(),
      getFaqItems(),
    ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: settings.studioName,
        description: settings.tagline,
        email: settings.primaryEmail,
        sameAs: settings.socials.map((social) => social.href),
        url: createAbsoluteUrl(),
        logo: createAbsoluteUrl("/icon"),
      },
      {
        "@type": "WebSite",
        name: settings.studioName,
        url: createAbsoluteUrl(),
        description: settings.tagline,
      },
    ],
  };

  return (
    <div className="page-stack pb-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeHero
        settings={settings}
        heroImageUrl={homePage.heroBackgroundImageUrl}
        heroImageAlt={homePage.heroBackgroundImageAlt}
      />

      <section className="site-container">
        <div className="grid-responsive-3">
          {homePage.outcomeCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <article className="section-shell rounded-[var(--radius-xl)] p-5 md:p-6">
                <p className="eyebrow">{card.eyebrow}</p>
                <h2 className="type-h3 mt-3 font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                  {card.body}
                </p>
                <ButtonLink
                  href={card.href}
                  variant="ghost"
                  eventName="cta_click"
                  eventPayload={{ placement: "home_outcome_strip", label: card.label }}
                  className="mt-5 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
                >
                  {card.label}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">{homePage.serviceOverview.eyebrow}</p>
            <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
              {homePage.serviceOverview.title}
            </h2>
            <p className="type-body mt-5 text-[var(--color-fog-300)]">
              {homePage.serviceOverview.body}
            </p>
            <div className="mt-8 space-y-3">
              {homePage.serviceOverview.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 text-sm text-[var(--color-fog-300)]"
                >
                  <Check className="mt-0.5 h-4 w-4 text-[var(--color-signal-lime)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid-responsive-3">
            {homePage.buyerTypes.map((buyer, index) => (
              <Reveal key={buyer.title} delay={index * 0.05}>
                <article className="section-shell rounded-[var(--radius-xl)] p-5 md:p-6">
                  <p className="eyebrow">Fit</p>
                  <h3 className="type-h3 mt-3 font-semibold text-white">{buyer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                    {buyer.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06}>
              <ServiceCard service={service} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <SectionTextureDivider projects={featuredProjects} />

      <section id="featured-work" className="site-container scroll-mt-28">
        <FeaturedWorkStrip projects={featuredProjects} />
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">{homePage.resultsSection.eyebrow}</p>
            <h2 className="section-heading type-h2 mt-3 font-semibold text-white">
              {homePage.resultsSection.title}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {homePage.resultsSection.metrics.map((metric, index) => (
                <MetricChip
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  accent={index === 0 ? "blue" : index === 1 ? "purple" : "lime"}
                />
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.08}>
                <TestimonialCard testimonial={testimonial} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTextureDivider projects={featuredProjects.slice().reverse()} />

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">Process</p>
          <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
            How we work stays clear, fast, and visible.
          </h2>
        </Reveal>
        <div className="grid-responsive-3">
          {homePage.processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <ProcessStepCard
                title={step.title}
                body={step.body}
                icon={processSteps[index] ?? TimerReset}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">{homePage.studioSection.eyebrow}</p>
            <h2 className="section-heading type-h2 mt-3 font-semibold text-white">
              {homePage.studioSection.title}
            </h2>
            <p className="type-body mt-5 text-[var(--color-fog-300)]">
              {homePage.studioSection.body}
            </p>
          </Reveal>

          <div className="grid-responsive-3">
            {team.map((member, index) => (
              <Reveal key={`${member.name}-${index}`} delay={index * 0.07}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">{homePage.faqSection.eyebrow}</p>
          <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
            {homePage.faqSection.title}
          </h2>
        </Reveal>
        <FaqAccordion items={faqItems} />
      </section>

      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div>
              <p className="eyebrow">{homePage.finalCta.eyebrow}</p>
              <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
                {homePage.finalCta.title}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink
                href={homePage.finalCta.primaryHref}
                eventName="cta_click"
                eventPayload={{ placement: "footer_band", label: homePage.finalCta.primaryLabel }}
              >
                {homePage.finalCta.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={homePage.finalCta.secondaryHref}
                variant="secondary"
                eventName="cta_click"
                eventPayload={{
                  placement: "footer_band",
                  label: homePage.finalCta.secondaryLabel,
                }}
              >
                {homePage.finalCta.secondaryLabel}
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
