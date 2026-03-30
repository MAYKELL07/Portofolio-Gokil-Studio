import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { getMobileSummary } from "@/lib/utils";

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
  const mobileIntro = getMobileSummary(intro, 16);
  const mobileSteps = steps.slice(0, 3);

  return (
    <section className="site-container">
      <div className="grid gap-8 md:hidden">
        <div className="scrollstory-panel section-shell p-6">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-heading mt-3 text-3xl font-semibold text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)]">
            {mobileIntro}
          </p>
          <div className="scrollstory-progress mt-5">
            {mobileSteps.map((step, index) => (
              <span
                key={step.id}
                className={`scrollstory-progress-segment ${
                  index === 0 ? "scrollstory-progress-segment-active" : ""
                }`}
              />
            ))}
          </div>
          <ButtonLink
            href={mobileSteps[0]?.ctaHref || "/services"}
            variant="ghost"
            className="mt-5 justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white"
          >
            {mobileSteps[0]?.ctaLabel || "Review services"}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="grid gap-4">
          {mobileSteps.map((step, index) => (
            <article key={step.id} className="scrollstory-card section-shell p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{step.eyebrow}</p>
                <span className="scrollstory-step-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                {getMobileSummary(step.body, 14)}
              </p>
              {step.points.length > 0 ? (
                <div className="mt-4 grid gap-2">
                  {step.points.slice(0, 2).map((point) => (
                    <div
                      key={point}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[rgba(10,16,24,0.52)] px-4 py-3 text-sm text-[var(--color-fog-300)]"
                    >
                      {getMobileSummary(point, 10)}
                    </div>
                  ))}
                </div>
              ) : null}
              <ButtonLink
                href={step.ctaHref}
                variant="ghost"
                className="mt-5 justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white"
              >
                {step.ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden gap-8 md:grid lg:grid-cols-[0.72fr,1.28fr] lg:items-start">
        <div className="scrollstory-panel section-shell p-6 md:p-8 lg:sticky lg:top-[6.8rem]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-heading type-display-lg mt-3 max-w-xl font-semibold text-white">
            {title}
          </h2>
          <p className="type-body mt-5 max-w-xl text-[var(--color-fog-300)]">
            {intro}
          </p>
          <div className="scrollstory-progress mt-7">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={`scrollstory-progress-segment ${
                  index === 0 ? "scrollstory-progress-segment-active" : ""
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
            Follow the timeline, then pick the service fit.
          </p>
        </div>

        <div className="space-y-5">
          {steps.map((step, index) => {
            return (
              <article
                key={step.id}
                className="scrollstory-card section-shell p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">{step.eyebrow}</p>
                  <span className="scrollstory-step-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="section-heading mt-4 max-w-[18ch] text-3xl font-semibold text-white md:text-[var(--font-size-h1)] md:leading-[1.04]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)] md:mt-5 md:text-[var(--font-size-body-lg)] md:leading-[var(--line-height-body)]">
                  {step.body}
                </p>
                {step.points.length > 0 ? (
                  <div className="mt-8 hidden gap-4 md:grid md:grid-cols-2">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[rgba(10,16,24,0.52)] px-4 py-4 text-sm leading-7 text-[var(--color-fog-300)]"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                ) : null}
                <ButtonLink
                  href={step.ctaHref}
                  variant="ghost"
                  className="mt-6 justify-start px-0 py-0 text-[var(--color-fog-300)] hover:text-white"
                >
                  {step.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
