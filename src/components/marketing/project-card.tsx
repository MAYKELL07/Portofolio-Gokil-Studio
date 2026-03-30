import { ArrowRight } from "lucide-react";

import { ProjectCoverMedia } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Project } from "@/lib/site-content";
import { getMobileSummary } from "@/lib/utils";
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
  const mobilePreviewDescription = getMobileSummary(previewDescription, 10);
  const mobileProjectSummary = getMobileSummary(project.summary, 15);
  const mobileRoleTags = roleTags.slice(0, 1);
  const mobileDeliverableTags = deliverableTags.slice(0, 1);

  return (
    <article className="section-shell bento-card flex h-full flex-col p-3.5 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--color-border-accent)] focus-within:border-[var(--color-vol-blue)]/35 md:p-5 xl:p-6">
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
          ratio="free"
          className="h-[15rem] rounded-[var(--radius-md)] sm:h-[16rem] md:h-[17.25rem] xl:h-[18.5rem]"
        >
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 md:p-6">
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
            <div className="pt-6 md:pt-7">
              <p className="max-w-[13ch] text-balance text-[1.85rem] font-semibold leading-[1.02] text-white transition-colors duration-200 group-hover:text-[var(--color-fog-100)] sm:max-w-[14ch] md:max-w-md md:text-[2rem]">
                {project.headline}
              </p>
            </div>
            <div className="mt-4 rounded-[var(--radius-md)] border border-white/10 bg-[rgba(17,19,21,0.82)] p-3.5 md:mt-5 md:p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {previewMedia?.type === "video" ? "Project context" : previewMedia ? "Project context" : "Project context"}
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{previewLabel}</p>
              {previewDescription ? (
                <>
                  <p className="mt-2 text-xs leading-6 text-white/75 md:hidden">
                    {mobilePreviewDescription}
                  </p>
                  <p className="mt-2 hidden text-xs leading-6 text-white/75 md:block">
                    {previewDescription}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </ProjectCoverMedia>
      </TrackedLink>
      <div className="mt-4 flex flex-1 flex-col space-y-3 md:space-y-4">
        <div className="hidden gap-3 sm:grid-cols-3 md:grid">
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
            <p className="text-xl font-semibold text-white md:text-[1.6rem]">{project.title}</p>
          </TrackedLink>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Client
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{clientLabel}</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                Scope
              </div>
              <p className="mt-2 text-sm font-semibold text-white">
                {project.projectType} for {project.platform}
              </p>
            </div>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-3.5 md:hidden">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
              Client goal
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
              {mobileProjectSummary}
            </p>
            {(mobileRoleTags.length > 0 || mobileDeliverableTags.length > 0) ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {mobileRoleTags.map((tag) => (
                  <span key={tag} className="chip text-xs text-[var(--color-fog-300)]">
                    {tag}
                  </span>
                ))}
                {mobileDeliverableTags.map((tag) => (
                  <span key={tag} className="chip text-xs text-[var(--color-fog-300)]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="hidden rounded-[var(--radius-md)] border border-[var(--color-border-strong)] p-4 md:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
              Client goal
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">{project.summary}</p>
          </div>
          <div className="hidden gap-3 md:grid md:grid-cols-2">
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
        <div className="mt-auto pt-1">
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
      </div>
    </article>
  );
}
