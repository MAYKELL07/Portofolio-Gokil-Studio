import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  FolderKanban,
  Hammer,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { FeaturedWorkStrip } from "@/components/marketing/featured-work-strip";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeScrollStory } from "@/components/marketing/home-scrollstory";
import { ProjectCoverMedia } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ProcessStepCard } from "@/components/marketing/process-step-card";
import { SectionTextureDivider } from "@/components/marketing/section-texture-divider";
import { ServiceCard } from "@/components/marketing/service-card";
import { TeamCard } from "@/components/marketing/team-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { createAbsoluteUrl, getMobileSummary, getProjectPreviewImage } from "@/lib/utils";
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
  title: "Maykell Interactive | Roblox Outsourcing Partner",
  description:
    "Roblox outsourcing and co-development partner for shipped features, systems, updates, and production support.",
  path: "/",
});

const processSteps = [
  ClipboardList,
  FolderKanban,
  Hammer,
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
  const mobileStudioSummary = getMobileSummary(homePage.studioSection.body, 16);
  const mobileServiceSummary = getMobileSummary(homePage.serviceOverview.body, 16);
  const proofProjects = featuredProjects.slice(0, 2);

  return (
    <div className="page-stack pb-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeHero
        settings={settings}
        heroImageUrl={homePage.heroBackgroundImageUrl}
      />

      <HomeScrollStory
        eyebrow={homePage.scrollStory.eyebrow}
        title={homePage.scrollStory.title}
        intro={homePage.scrollStory.intro}
        steps={homePage.scrollStory.chapters}
      />

      <section className="site-container">
        <Reveal className="mb-6 md:mb-8">
          <p className="eyebrow">{homePage.serviceOverview.eyebrow}</p>
          <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:[font-family:var(--font-display),sans-serif] md:text-[var(--font-size-display-lg)] md:leading-[var(--line-height-tight)] md:tracking-[-0.04em]">
            {homePage.serviceOverview.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
            {mobileServiceSummary}
          </p>
          <p className="type-body mt-5 hidden max-w-2xl text-[var(--color-fog-300)] md:block">
            {homePage.serviceOverview.body}
          </p>
        </Reveal>
        <div className="bento-grid gap-6">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 0.06}
              className={index > 1 ? "hidden md:block" : undefined}
            >
              <ServiceCard service={service} compact />
            </Reveal>
          ))}
        </div>
        <div className="mt-5 md:hidden">
          <ButtonLink
            href="/services"
            variant="ghost"
            eventName="cta_click"
            eventPayload={{ placement: "home_services_mobile", label: "Review services" }}
            className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
          >
            Review services
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>

      <SectionTextureDivider projects={featuredProjects} />

      <section id="featured-work" className="site-container scroll-mt-28">
        <FeaturedWorkStrip projects={featuredProjects} />
      </section>

      <section className="site-container">
        <div className="bento-split gap-6">
          <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8">
            <p className="eyebrow">{homePage.resultsSection.eyebrow}</p>
            <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:text-[var(--font-size-h2)] md:leading-[1.12]">
              {homePage.resultsSection.title}
            </h2>
            <div className="mt-6 grid gap-4 grid-cols-2 md:mt-8 md:grid-cols-3">
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

          {proofProjects.length > 0 ? (
            <div className="bento-stack gap-6">
              {proofProjects.map((project, index) => {
                const previewImage = getProjectPreviewImage(project);

                return (
                  <Reveal
                    key={project.slug}
                    delay={index * 0.08}
                    className={index > 0 ? "hidden xl:block" : undefined}
                  >
                    <div className="section-shell bento-card p-4 md:p-5">
                      <ProjectCoverMedia
                        src={previewImage}
                        alt={project.title}
                        ratio="landscape"
                        sizes="(max-width: 1023px) 100vw, 32vw"
                        quality={72}
                        interactive={false}
                        className="min-h-[12rem]"
                        overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.08),rgba(17,19,21,0.48))]"
                      >
                        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                          <span className="chip text-xs text-white">{project.projectType}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                            Delivery proof
                          </span>
                        </div>
                      </ProjectCoverMedia>
                      <div className="mt-4">
                        <p className="text-lg font-semibold text-white">{project.title}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                          {getMobileSummary(project.summary, 16)}
                        </p>
                        <ButtonLink
                          href={`/work/${project.slug}`}
                          variant="ghost"
                          eventName="cta_click"
                          eventPayload={{ placement: "home_results_proof", slug: project.slug, label: "View case study" }}
                          className="mt-3 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
                        >
                          View case study
                          <ArrowUpRight className="h-4 w-4" />
                        </ButtonLink>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="hidden lg:block">
              <div className="bento-stack gap-6">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={index * 0.08}>
                    <TestimonialCard testimonial={testimonial} compact />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <SectionTextureDivider projects={featuredProjects.slice().reverse()} />

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">Process</p>
          <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:[font-family:var(--font-display),sans-serif] md:text-[var(--font-size-display-lg)] md:leading-[var(--line-height-tight)] md:tracking-[-0.04em]">
            A structured outsourcing workflow clients can follow without confusion.
          </h2>
        </Reveal>
        <div className="grid-responsive-3">
          {homePage.processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.08}
              className={index > 2 ? "hidden md:block" : undefined}
            >
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
        <div className="bento-rail gap-6">
          <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8">
            <p className="eyebrow">{homePage.studioSection.eyebrow}</p>
            <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:text-[var(--font-size-h2)] md:leading-[1.12]">
              {homePage.studioSection.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
              {mobileStudioSummary}
            </p>
            <p className="type-body mt-5 hidden text-[var(--color-fog-300)] md:block">
              {homePage.studioSection.body}
            </p>
            <ButtonLink
              href="/about"
              variant="ghost"
              eventName="cta_click"
              eventPayload={{ placement: "home_about_mobile", label: "About the team" }}
              className="mt-5 justify-start px-0 py-0 text-[var(--color-vol-blue)] md:hidden"
            >
              About the team
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <div className="bento-grid bento-grid-3 gap-6">
            {team.map((member, index) => (
              <Reveal
                key={`${member.name}-${index}`}
                delay={index * 0.07}
                className={index > 0 ? "hidden md:block" : undefined}
              >
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">{homePage.faqSection.eyebrow}</p>
          <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:[font-family:var(--font-display),sans-serif] md:text-[var(--font-size-display-lg)] md:leading-[var(--line-height-tight)] md:tracking-[-0.04em]">
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
              <h2 className="section-heading mt-3 text-3xl font-semibold text-white md:[font-family:var(--font-display),sans-serif] md:text-[var(--font-size-display-lg)] md:leading-[var(--line-height-tight)] md:tracking-[-0.04em]">
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
                className="hidden sm:inline-flex"
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
