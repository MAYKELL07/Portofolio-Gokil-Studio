"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { HeroMedia } from "@/components/media/site-media";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  mediaSrc,
  mediaAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: HomeScrollStoryStep[];
  mediaSrc?: string;
  mediaAlt?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-scrollstory-step]"));
    if (!cards.length || typeof window === "undefined") {
      return;
    }

    let frameId = 0;

    const updateActiveStep = () => {
      frameId = 0;

      const viewportFocusLine = window.innerHeight * 0.42;
      const rankedCards = cards
        .map((card) => {
          const index = Number(card.getAttribute("data-story-index"));
          const rect = card.getBoundingClientRect();

          return {
            index,
            distance: Math.abs(rect.top + rect.height / 2 - viewportFocusLine),
            isVisible: rect.bottom > 0 && rect.top < window.innerHeight,
          };
        })
        .filter((card) => !Number.isNaN(card.index));

      const visibleCards = rankedCards.filter((card) => card.isVisible);
      const nextCard = (visibleCards.length > 0 ? visibleCards : rankedCards).sort(
        (cardA, cardB) => cardA.distance - cardB.distance,
      )[0];

      if (!nextCard) {
        return;
      }

      startTransition(() => {
        setActiveStep(nextCard.index);
      });
    };

    const queueUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  const currentStep = steps[activeStep] ?? steps[0];
  const activeMediaSrc = currentStep?.mediaSrc || mediaSrc;
  const activeMediaAlt = currentStep?.mediaAlt || mediaAlt || currentStep?.title;

  return (
    <section className="site-container">
      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="scrollstory-stage section-shell min-h-[32rem] rounded-[2.2rem] p-5 md:p-6 lg:min-h-[calc(100vh-8rem)]">
            <HeroMedia src={activeMediaSrc} alt={activeMediaAlt} priority />
            <div className="relative z-[1] flex h-full flex-col justify-between gap-6">
              <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="section-heading type-display-lg mt-3 max-w-xl font-semibold text-white">
                  {title}
                </h2>
                <p className="type-body mt-5 max-w-2xl text-[var(--color-fog-300)]">{intro}</p>
              </div>

              <div className="space-y-5">
                <div className="scrollstory-progress">
                  {steps.map((step, index) => (
                    <span
                      key={step.id}
                      className={cn(
                        "scrollstory-progress-segment",
                        index === activeStep && "scrollstory-progress-segment-active",
                      )}
                    />
                  ))}
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(22,12,7,0.58)] p-5 backdrop-blur-md md:p-6">
                  <p className="eyebrow">{currentStep.eyebrow}</p>
                  <h3 className="type-h2 mt-3 font-semibold text-white">{currentStep.title}</h3>
                  <p className="type-body mt-4 text-[var(--color-fog-300)]">{currentStep.body}</p>
                  {currentStep.points.length > 0 ? (
                    <ul className="mt-5 space-y-3">
                      {currentStep.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-[1.4rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-7 text-[var(--color-fog-300)]"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <ButtonLink
                    href={currentStep.ctaHref}
                    variant="secondary"
                    className="mt-5 w-full justify-center md:w-auto"
                  >
                    {currentStep.ctaLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="space-y-6">
          {steps.map((step, index) => (
            <article
              key={step.id}
              data-scrollstory-step
              data-story-index={index}
              className={cn(
                "scrollstory-card section-shell rounded-[2rem] p-6 md:p-8 lg:min-h-[72vh]",
                index === activeStep && "scrollstory-card-active",
              )}
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
                      className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[var(--color-fog-300)]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
