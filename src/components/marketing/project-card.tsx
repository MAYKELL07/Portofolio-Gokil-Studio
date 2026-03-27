import { ArrowRight } from "lucide-react";

import { ProjectCoverMedia } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Project } from "@/lib/site-content";
import { resolveSanityImageUrl } from "@/sanity/lib/image";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const previewMedia = project.galleryMedia[0];
  const previewImageUrlFromSource =
    resolveSanityImageUrl(previewMedia?.image, { width: 1200, quality: 72 }) ||
    resolveSanityImageUrl(previewMedia?.poster, { width: 1200, quality: 72 }) ||
    resolveSanityImageUrl(project.coverImage, { width: 1200, quality: 72 });
  const previewImageUrl =
    previewImageUrlFromSource ||
    previewMedia?.imageUrl ||
    previewMedia?.posterUrl ||
    project.coverImageUrl;
  const visualPreviewUrl = previewImageUrl || "/placeholders/studio-signal-texture.svg";
  const roleTags = project.serviceTags.slice(0, 2);
  const deliverableTags = project.gameplayFeatures.slice(0, 3);
  const clientLabel = project.clientName || "Confidential partner";
  const previewLabel = previewMedia?.label ?? (previewImageUrl ? "Cover image" : "Media held back");
  const previewDescription =
    previewMedia?.description ??
    (previewImageUrl ? "" : undefined) ??
    project.confidentialityNote ??
    "Public media is limited for this engagement, but the case study still outlines scope, delivery role, and outcomes.";

  return (
    <article className="section-shell p-4 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--color-border-accent)] focus-within:border-[var(--color-vol-blue)]/35 md:p-6">
      <TrackedLink
        href={`/work/${project.slug}`}
        eventName={ANALYTICS_EVENTS.PROJECT_CARD_CLICK}
        eventPayload={{
          section: "project_card_media",
          slug: project.slug,
          interaction_target: "media",
        }}
        className="group block"
      >
        <ProjectCoverMedia
          src={visualPreviewUrl}
          alt={previewMedia?.alt || previewLabel}
          className="min-h-[20rem] rounded-[var(--radius-md)] md:min-h-[22rem]"
        >
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-[rgba(17,19,21,0.72)] px-3 py-1">
                  {project.projectType}
                </span>
                <span className="rounded-full border border-white/10 bg-[rgba(17,19,21,0.72)] px-3 py-1">
                  {project.platform}
                </span>
              </div>
              <span className="shrink-0">{project.year}</span>
            </div>
            <div className="pt-8">
              <p className="max-w-md text-xl font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-[var(--color-fog-100)] md:text-[2rem]">
                {project.headline}
              </p>
            </div>
            <div className="mt-5 rounded-[var(--radius-md)] border border-white/10 bg-[rgba(17,19,21,0.82)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {previewMedia?.type === "video" ? "Project context" : previewMedia ? "Project context" : "Project context"}
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{previewLabel}</p>
              {previewDescription ? (
                <p className="mt-2 text-xs leading-6 text-white/75">{previewDescription}</p>
              ) : null}
            </div>
          </div>
        </ProjectCoverMedia>
      </TrackedLink>
      <div className="mt-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {project.resultsMetrics.map((metric) => (
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
            />
          ))}
        </div>
        <div className="space-y-3">
          <TrackedLink
            href={`/work/${project.slug}`}
            eventName={ANALYTICS_EVENTS.PROJECT_CARD_CLICK}
            eventPayload={{
              section: "project_card_title",
              slug: project.slug,
              interaction_target: "title",
            }}
            className="block transition-colors duration-200 hover:text-[var(--color-vol-blue)] focus-visible:rounded-[var(--radius-sm)]"
          >
            <p className="text-xl font-semibold text-white">{project.title}</p>
          </TrackedLink>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Client
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{clientLabel}</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Scope
              </div>
              <p className="mt-2 text-sm font-semibold text-white">
                {project.projectType} for {project.platform}
              </p>
            </div>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
              Client goal
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">{project.summary}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Role
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(roleTags.length > 0 ? roleTags : ["Delivery support"]).map((tag) => (
                  <span key={tag} className="chip text-xs text-[var(--color-fog-300)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Deliverables
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(deliverableTags.length > 0 ? deliverableTags : ["Scope shared in case study"]).map((tag) => (
                  <span key={tag} className="chip text-xs text-[var(--color-fog-300)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ButtonLink
          href={`/work/${project.slug}`}
          variant="ghost"
          eventName={ANALYTICS_EVENTS.PROJECT_CARD_CLICK}
          eventPayload={{
            section: "project_card_cta",
            slug: project.slug,
            interaction_target: "cta",
            cta_label: "View case study",
          }}
          className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
        >
          View case study
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}
