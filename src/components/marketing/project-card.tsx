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
  const [accentA, , accentC] = project.palette;
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
  const serviceTags = project.serviceTags.slice(0, 3);
  const supportingTags = project.genreTags.slice(0, 2);
  const clientLabel = project.clientName || "Confidential partner";
  const previewLabel = previewMedia?.label ?? (previewImageUrl ? "Cover image" : "Media held back");
  const previewDescription =
    previewMedia?.description ??
    (previewImageUrl ? "" : undefined) ??
    project.confidentialityNote ??
    "Public media is limited for this engagement, but the case study still outlines scope, delivery role, and outcomes.";

  return (
    <article className="section-shell rounded-[var(--radius-xl)] p-4 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/12 hover:shadow-[0_26px_68px_rgba(0,0,0,0.34)] focus-within:border-[var(--color-vol-blue)]/35 md:p-6">
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
          className="rounded-[1.6rem]"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at top right, ${accentA}28, transparent 30%), linear-gradient(135deg, transparent, ${accentC}22)`,
            }}
          />
          <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 md:inset-x-6 md:top-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-black/15 px-3 py-1">
                {project.projectType}
              </span>
              <span className="rounded-full border border-white/12 bg-black/15 px-3 py-1">
                {project.platform}
              </span>
            </div>
            <span>{project.year}</span>
          </div>
          <div className="absolute inset-x-5 bottom-5 z-10 md:inset-x-6 md:bottom-6">
            <p className="max-w-lg text-2xl font-semibold text-white transition-colors duration-200 group-hover:text-[var(--color-fog-100)] md:text-3xl">
              {project.headline}
            </p>
            <div className="mt-4 rounded-[var(--radius-md)] border border-white/10 bg-black/22 p-4 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {previewMedia?.type === "video" ? "Video preview" : previewMedia ? "Media preview" : "Cover image"}
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
              className="backdrop-blur-sm"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {serviceTags.map((tag) => (
            <span key={tag} className="chip text-xs text-white">
              {tag}
            </span>
          ))}
          {supportingTags.map((tag) => (
            <span key={tag} className="chip text-xs text-[var(--color-fog-300)]">
              {tag}
            </span>
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
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-fog-500)]">
            {clientLabel}
          </p>
          <p className="text-sm leading-7 text-[var(--color-fog-300)]">{project.summary}</p>
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
