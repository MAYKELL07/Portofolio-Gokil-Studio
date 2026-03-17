import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { GalleryMediaCard } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ProjectCard } from "@/components/marketing/project-card";
import { SectionTextureDivider } from "@/components/marketing/section-texture-divider";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { ButtonLink } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Project, Testimonial } from "@/lib/site-content";

type ProjectDetailTemplateProps = {
  project: Project;
  relatedProjects: Project[];
  testimonial?: Testimonial;
};

function cleanText(value?: string) {
  return value?.trim();
}

function cleanList(items?: string[]) {
  return (items ?? []).map((item) => item.trim()).filter(Boolean);
}

function getGalleryItemClass(item: Project["galleryMedia"][number], index: number) {
  if (item.imageRole === "cover" || index === 0) {
    return "md:col-span-2";
  }

  if (item.imageRole === "portrait") {
    return "md:row-span-2 md:self-start";
  }

  if (item.imageRole === "background" || item.imageRole === "texture") {
    return "md:col-span-2 lg:col-span-1";
  }

  return "";
}

function getGalleryMediaRatio(item: Project["galleryMedia"][number], index: number) {
  if (item.imageRole === "portrait") {
    return "portrait" as const;
  }

  if (item.imageRole === "cover" || item.imageRole === "background" || index === 0) {
    return "landscape" as const;
  }

  if (item.imageRole === "texture") {
    return "square" as const;
  }

  return "standard" as const;
}

export function ProjectDetailTemplate({
  project,
  relatedProjects,
  testimonial,
}: ProjectDetailTemplateProps) {
  const clientLabel = cleanText(project.clientName) ?? "Confidential partner";
  const challenge = cleanText(project.challenge);
  const solution = cleanText(project.solution);
  const confidentialityNote = cleanText(project.confidentialityNote);
  const goals = cleanList(project.goals);
  const roles = cleanList(project.serviceTags);
  const features = cleanList(project.gameplayFeatures);
  const processSteps = cleanList(project.productionProcess);
  const metrics = project.resultsMetrics.filter(
    (metric) => cleanText(metric.label) && cleanText(metric.value),
  );
  const mediaItems = project.galleryMedia.filter(
    (item) => cleanText(item.label) || cleanText(item.description),
  );
  const effectiveMediaItems =
    mediaItems.length > 0
      ? mediaItems
      : project.coverImageUrl
        ? [
            {
              label: "Cover image",
              description: "",
              type: "image" as const,
              alt: project.title,
              imageUrl: project.coverImageUrl,
            },
          ]
        : [];
  const primaryCtaLabel = cleanText(project.cta?.primaryLabel) ?? "Start a similar project";
  const primaryCtaHref = cleanText(project.cta?.primaryHref) ?? "/contact";
  const secondaryCtaLabel = cleanText(project.cta?.secondaryLabel) ?? "Review services";
  const secondaryCtaHref = cleanText(project.cta?.secondaryHref) ?? "/services";

  return (
    <>
      <section className="site-container">
        <section className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                  {project.projectType}
                </span>
                <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                  {project.platform}
                </span>
                <span className="chip text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-300)]">
                  {project.year}
                </span>
              </div>
              <h1 className="section-heading type-display-xl mt-6 font-semibold text-white">
                {project.title}
              </h1>
              <p className="type-body-lg mt-5 max-w-3xl text-[var(--color-fog-300)]">
                {project.summary}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                    Client
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{clientLabel}</div>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                    Delivery role
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {roles.length > 0 ? roles.slice(0, 2).join(" + ") : "Scope shared during briefing"}
                  </div>
                </div>
              </div>
              {confidentialityNote ? (
                <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-black/20">
                      <LockKeyhole className="h-4 w-4 text-[var(--color-vol-blue)]" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                        Confidentiality note
                      </div>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                        {confidentialityNote}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={primaryCtaHref}
                  eventName={ANALYTICS_EVENTS.PROJECT_PAGE_CTA_CLICK}
                  eventPayload={{
                    page: "project_detail",
                    section: "hero",
                    slug: project.slug,
                    cta_label: primaryCtaLabel,
                  }}
                >
                  {primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/work"
                  variant="secondary"
                  eventName={ANALYTICS_EVENTS.PROJECT_PAGE_CTA_CLICK}
                  eventPayload={{
                    page: "project_detail",
                    section: "hero",
                    slug: project.slug,
                    cta_label: "Back to work",
                  }}
                >
                  Back to work
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] p-5 md:p-6"
              style={{
                background: `radial-gradient(circle at top right, ${project.palette[0]}40, transparent 32%), linear-gradient(135deg, ${project.palette[1]}, ${project.palette[2]})`,
              }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/65">
                Outcome snapshot
              </div>
              {metrics.length > 0 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {metrics.map((metric) => (
                    <MetricChip
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      accent={
                        metric.accent === "blue"
                          ? "blue"
                          : metric.accent === "lime"
                            ? "lime"
                            : "purple"
                      }
                      className="backdrop-blur-sm"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-[var(--radius-lg)] border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Public metrics
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {confidentialityNote ??
                      "Public metrics are limited for this project."}
                  </p>
                </div>
              )}
              <div className="mt-5 grid gap-3">
                <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Project overview
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/80">{project.headline}</p>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Services provided
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roles.length > 0 ? (
                      roles.map((role) => (
                        <span key={role} className="chip text-xs text-white">
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="chip text-xs text-white">Scope available on request</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="site-container">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Media gallery</p>
            <h2 className="type-h2 mt-4 font-semibold text-white">Visual proof first.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {effectiveMediaItems.length > 0 ? (
                effectiveMediaItems.map((item, index) => {
                  const isVideo = item.type === "video";

                  return (
                    <GalleryMediaCard
                      key={`${item.label}-${index}`}
                      src={item.imageUrl || item.posterUrl}
                      alt={item.alt || item.label}
                      title={item.label}
                      description={item.description}
                      caption={item.caption}
                      type={isVideo ? "video" : "image"}
                      ratio={getGalleryMediaRatio(item, index)}
                      className={getGalleryItemClass(item, index)}
                      featured={index === 0}
                    />
                  );
                })
              ) : (
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-6 md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white/[0.03]">
                      <LockKeyhole className="h-4 w-4 text-[var(--color-vol-blue)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Media is limited for this case study.</div>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                        {confidentialityNote ??
                          "Public media is limited for this project."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">Goals</p>
            <h2 className="type-h2 mt-4 font-semibold text-white">What success needed to look like.</h2>
            <div className="mt-6 space-y-4">
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <div
                    key={`${goal}-${index}`}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                      Goal {index + 1}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">{goal}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5 text-sm leading-7 text-[var(--color-fog-300)]">
                  Goals for this project are shared during briefing.
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionTextureDivider projects={[project, ...relatedProjects].slice(0, 3)} />

      <section className="site-container">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Project overview</p>
            <div className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">{project.summary}</div>
          </Reveal>

          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.04}>
            <p className="eyebrow">Challenge</p>
            <div className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
              {challenge ??
                "Challenge details are limited for this engagement."}
            </div>
          </Reveal>

          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.08}>
            <p className="eyebrow">Role / services provided</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <span key={role} className="chip text-xs text-white">
                    {role}
                  </span>
                ))
              ) : (
                <span className="chip text-xs text-white">Scope shared during discovery</span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Solution</p>
            <h2 className="type-h2 mt-4 font-semibold text-white">{project.headline}</h2>
            <p className="mt-5 text-sm leading-8 text-[var(--color-fog-300)]">
              {solution ??
                "Implementation details are shared during project briefing."}
            </p>
            {features.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4 text-sm leading-7 text-[var(--color-fog-300)]"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">Process</p>
            <h2 className="type-h2 mt-4 font-semibold text-white">How the work moved from brief to ship.</h2>
            <div className="mt-6 space-y-4">
              {processSteps.length > 0 ? (
                processSteps.map((step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                      Step {index + 1}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">{step}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5 text-sm leading-7 text-[var(--color-fog-300)]">
                  Process details are available during briefing.
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {testimonial ? (
        <section className="site-container">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">Client signal</p>
              <TestimonialCard testimonial={testimonial} />
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="type-h2 mt-3 font-semibold text-white">
                If this delivery shape is close, move into a brief while the context is fresh.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)]">
                Share the scope, target platform, and where you need support. The contact path stays
                direct whether this project is fully public or partially confidential.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={primaryCtaHref}
                eventName={ANALYTICS_EVENTS.PROJECT_PAGE_CTA_CLICK}
                eventPayload={{
                  page: "project_detail",
                  section: "final_cta",
                  slug: project.slug,
                  cta_label: primaryCtaLabel,
                }}
              >
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={secondaryCtaHref}
                variant="secondary"
                eventName={ANALYTICS_EVENTS.PROJECT_PAGE_CTA_CLICK}
                eventPayload={{
                  page: "project_detail",
                  section: "final_cta",
                  slug: project.slug,
                  cta_label: secondaryCtaLabel,
                }}
              >
                {secondaryCtaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="site-container">
        <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Related projects</p>
            <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
              More proof in adjacent categories.
            </h2>
          </div>
          <ButtonLink
            href="/contact"
            variant="ghost"
            eventName={ANALYTICS_EVENTS.PROJECT_PAGE_CTA_CLICK}
            eventPayload={{
              page: "project_detail",
              section: "related_projects",
              slug: project.slug,
              cta_label: "Discuss your brief",
            }}
            className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
          >
            Discuss your brief
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {relatedProjects.slice(0, 2).map((relatedProject) => (
            <ProjectCard key={relatedProject.slug} project={relatedProject} />
          ))}
        </div>
      </section>
    </>
  );
}
