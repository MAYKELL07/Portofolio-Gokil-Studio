import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

export type HomeScrollStoryStep = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
  mediaSrc?: string;
  mediaAlt?: string;
};

export function HomeScrollStory({
  eyebrow,
  title,
  intro,
  steps,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: HomeScrollStoryStep[];
}) {
  return (
    <section className="site-container">
      <div className="grid gap-8 lg:grid-cols-[0.78fr,1.22fr] lg:items-start">
        <div className="section-shell p-6 md:p-8">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-heading type-display-lg mt-3 max-w-xl font-semibold text-white">
            {title}
          </h2>
          <p className="type-body mt-5 max-w-2xl text-[var(--color-fog-300)]">{intro}</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="scrollstory-card section-shell p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">{step.eyebrow}</p>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-fog-500)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="section-heading type-h1 mt-4 max-w-2xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="type-body-lg mt-5 max-w-2xl text-[var(--color-fog-300)]">{step.body}</p>
              {step.points.length > 0 ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {step.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-4 text-sm leading-7 text-[var(--color-fog-300)]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              ) : null}
              <ButtonLink
                href={step.ctaHref}
                variant="ghost"
                className="mt-6 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
              >
                {step.ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
