import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { FilterableWorkGrid } from "@/components/marketing/filterable-work-grid";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Work | Maykell Interactive",
  description:
    "Filterable Roblox portfolio showcasing shipped work, production scope, and measurable outcomes.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();
  const relatedProjects = projects.slice(0, 2);

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
            <div>
              <p className="eyebrow">Work / Portfolio</p>
              <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
                Filter proof by category, platform, and service type.
              </h1>
              <p className="type-body-lg mt-6 max-w-3xl text-[var(--color-fog-300)]">
                This page is built for buyers who need fast evidence: what was built, what changed,
                and whether the team can handle their delivery model without forcing a long read.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                  Hiring shortcuts
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-fog-300)]">
                  <p>Scan the cards first, then open a case study only when the fit looks close.</p>
                  <p>Use filters to narrow by delivery fit, not to hide all of the proof.</p>
                  <p>Jump to contact from here or from any project without losing context.</p>
                </div>
              </div>
              <ButtonLink
                href="/contact"
                variant="ghost"
                eventName="cta_click"
                eventPayload={{ placement: "work_page", label: "Start a project" }}
                className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="site-container">
        <FilterableWorkGrid projects={projects} />
      </section>

      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="type-h2 mt-3 font-semibold text-white">
                Found work that looks close? Move into the brief or review a related case study.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink
                href="/contact"
                eventName="cta_click"
                eventPayload={{ placement: "work_page_footer", label: "Start a Project" }}
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="secondary"
                eventName="cta_click"
                eventPayload={{ placement: "work_page_footer", label: "Review services" }}
              >
                Review services
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <ButtonLink
                key={project.slug}
                href={`/work/${project.slug}`}
                variant="secondary"
                eventName="project_card_click"
                eventPayload={{ slug: project.slug, placement: "work_page_related" }}
                className="h-auto min-h-0 flex-col items-start rounded-[var(--radius-lg)] px-5 py-4 text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                  Related proof
                </span>
                <span className="mt-3 text-lg font-semibold text-white">{project.title}</span>
                <span className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                  {project.summary}
                </span>
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
