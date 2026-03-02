import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { ProjectCard } from "@/components/marketing/project-card";
import { ButtonLink } from "@/components/ui/button";
import type { Project } from "@/lib/site-content";

export function FeaturedWorkStrip({
  projects,
  title = "Proof that gets to the point fast.",
}: {
  projects: Project[];
  title?: string;
}) {
  return (
    <section>
      <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Featured work</p>
          <h2 className="section-heading mt-3 text-4xl font-semibold text-white md:text-6xl">
            {title}
          </h2>
        </div>
        <ButtonLink
          href="/work"
          variant="ghost"
          eventName="cta_click"
          eventPayload={{ placement: "featured_work", label: "Browse all work" }}
          className="justify-start px-0 py-0 text-[var(--color-vol-blue)]"
        >
          Browse all work
          <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
      <div className="grid-responsive-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.07}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
