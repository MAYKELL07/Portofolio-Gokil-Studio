import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { MetricChip } from "@/components/marketing/metric-chip";
import { ButtonLink } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Project } from "@/lib/site-content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [accentA, accentB, accentC] = project.palette;
  const previewMedia = project.galleryMedia[0];
  const serviceTags = project.serviceTags.slice(0, 3);
  const supportingTags = project.genreTags.slice(0, 2);
  const clientLabel = project.clientName || "Confidential partner";
  const previewLabel = previewMedia?.label ?? "Media held back";
  const previewDescription =
    previewMedia?.description ??
    project.confidentialityNote ??
    "Public media is limited for this engagement, but the case study still outlines scope, delivery role, and outcomes.";

  return (
    <article className="section-shell rounded-[var(--radius-xl)] p-4 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/12 hover:shadow-[0_26px_68px_rgba(0,0,0,0.34)] focus-within:border-[var(--color-vol-blue)]/35 md:p-6">
      <TrackedLink
        href={`/work/${project.slug}`}
        eventName={ANALYTICS_EVENTS.PROJECT_CARD_CLICK}
        eventPayload={{ slug: project.slug, placement: "work_grid_preview" }}
        className="group block"
      >
        <div
          className="relative overflow-hidden rounded-[1.6rem] border border-white/6 p-5 md:p-6"
          style={{
            background: `radial-gradient(circle at top right, ${accentA}40, transparent 30%), linear-gradient(135deg, ${accentB}, ${accentC})`,
          }}
        >
          {previewMedia?.imageUrl ? (
            <>
              <Image
                src={previewMedia.imageUrl}
                alt={previewMedia.alt || previewLabel}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                quality={72}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,13,0.2),rgba(9,10,13,0.68))]" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/20 px-4 py-3 text-center backdrop-blur-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Media placeholder
                </div>
                <div className="mt-2 text-xs leading-6 text-white/75">
                  Replace with the strongest project still, UI capture, or short gameplay clip.
                </div>
              </div>
            </div>
          )}
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
          <div className="relative z-10 pt-16">
            <p className="max-w-lg text-2xl font-semibold text-white transition-colors duration-200 group-hover:text-[var(--color-fog-100)] md:text-3xl">
              {project.headline}
            </p>
            <div className="mt-6 rounded-[var(--radius-md)] border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {previewMedia?.type === "video" ? "Video preview" : "Media preview"}
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{previewLabel}</p>
              <p className="mt-2 text-xs leading-6 text-white/75">{previewDescription}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
          </div>
        </div>
      </TrackedLink>
      <div className="mt-5 space-y-4">
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
            eventPayload={{ slug: project.slug, placement: "work_grid_title" }}
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
          eventPayload={{ slug: project.slug, placement: "work_grid_cta" }}
          className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
        >
          View case study
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}
