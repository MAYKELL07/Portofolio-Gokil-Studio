import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ServiceCard } from "@/components/marketing/service-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getFaqItems, getServices } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Services | Maykell Interactive",
  description:
    "Clear Roblox service categories, engagement models, deliverables, and inquiry paths for qualified buyers.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, faqItems] = await Promise.all([getServices(), getFaqItems()]);
  const categoryOrder = [
    "Game Development",
    "Branded Experiences",
    "Systems / UX",
    "Live Ops / Content",
    "Technical Support",
  ];
  const categoryGuides: Record<string, { summary: string; fit: string }> = {
    "Game Development": {
      summary: "For teams that need a real build path, not just direction.",
      fit: "Best when the goal is a playable release with clear scope, milestones, and launch readiness.",
    },
    "Branded Experiences": {
      summary: "For campaign work that still needs production discipline.",
      fit: "Best when brands or agencies need reliable execution on a deadline with stakeholder visibility.",
    },
    "Systems / UX": {
      summary: "For high-leverage improvements inside an existing build.",
      fit: "Best when retention, clarity, conversion, or player flow needs a focused sprint.",
    },
    "Live Ops / Content": {
      summary: "For post-launch teams that need consistent shipping support.",
      fit: "Best when updates, events, and tuning have to keep moving without overloading the core team.",
    },
    "Technical Support": {
      summary: "For production blockers that are slowing delivery.",
      fit: "Best when a team needs senior debugging, optimization, cleanup, or technical visibility.",
    },
  };
  const groupedServices = services.reduce<Record<string, typeof services>>((groups, service) => {
    if (!groups[service.category]) {
      groups[service.category] = [];
    }

    groups[service.category].push(service);
    return groups;
  }, {});
  const sortedCategories = Object.keys(groupedServices).sort((left, right) => {
    const leftIndex = categoryOrder.indexOf(left);
    const rightIndex = categoryOrder.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
  const buyerAnswers = [
    {
      title: "What you can hire us for",
      body: "Game builds, branded experiences, systems sprints, live ops support, and technical unblockers.",
    },
    {
      title: "How engagements are scoped",
      body: "Each service spells out deliverables, timeline shape, buyer fit, and the most common way it is bought.",
    },
    {
      title: "What happens before contact",
      body: "The service groups narrow fit, scope, and delivery shape before the first conversation starts.",
    },
  ];
  const intakeChecklist = [
    "Target outcome or business goal",
    "Current build status or production stage",
    "Desired timeline or launch window",
    "Where execution support is needed most",
  ];

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <p className="eyebrow">Services</p>
          <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
            Clear ways to hire the studio, with enough detail to qualify the fit before you reach out.
          </h1>
          <p className="type-body-lg mt-6 max-w-3xl text-[var(--color-fog-300)]">
            Fast answers to the main buying questions: what we build, where we fit,
            how work is scoped, and which engagement model makes sense for your team.
          </p>
          <div className="grid-responsive-3 mt-6">
            {buyerAnswers.map((answer) => (
              <div
                key={answer.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5"
              >
                <div className="text-sm font-semibold text-white">{answer.title}</div>
                <div className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                  {answer.body}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">How to engage</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              A good first inquiry already answers the basics.
            </h2>
            <div className="mt-6 space-y-3">
              {intakeChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">Buying clarity</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-fog-300)]">
              <p>Use the service groups below to match your need to the closest delivery shape.</p>
              <p>Each card explains what the service is for, what it should help improve, and what is typically delivered.</p>
              <p>If your need crosses categories, that is normal. The first inquiry is still the place to narrow scope and confirm fit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {sortedCategories.map((category, index) => {
        const guide = categoryGuides[category] ?? {
          summary: "Services grouped by this category.",
          fit: "Use the card details below to confirm if this is the closest match for your project.",
        };

        return (
          <section key={category} className="site-container">
            <div className="grid gap-6 lg:grid-cols-[0.78fr,1.22fr]">
              <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={index * 0.03}>
                <p className="eyebrow">Service category</p>
                <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
                  {category}
                </h2>
                <p className="mt-5 text-sm leading-7 text-[var(--color-fog-300)]">
                  {guide.summary}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
                  <span className="font-semibold text-white">Best fit:</span> {guide.fit}
                </p>
              </Reveal>
              <div className="grid gap-6">
                {groupedServices[category].map((service, serviceIndex) => (
                  <Reveal key={service.slug} delay={serviceIndex * 0.06 + 0.04}>
                    <ServiceCard service={service} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Engagement model</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              Flexible enough for agencies and product teams, firm enough for reliable delivery.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-fog-300)]">
              <p>Discovery and scope alignment come first so budget and timeline mean something.</p>
              <p>Milestones stay visible, with clear review points and decision gates.</p>
              <p>Work can be delivered directly, through an agency, or as production support inside an existing team.</p>
              <p>The goal is to remove ambiguity before the first call, not add more sales language around it.</p>
            </div>
          </Reveal>
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">FAQ</p>
            <div className="mt-6">
              <FaqAccordion items={faqItems.slice(0, 3)} defaultOpen={0} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">CTA</p>
              <h2 className="type-h2 mt-3 font-semibold text-white">
                Need the right service narrowed into a scoped brief?
              </h2>
            </div>
            <ButtonLink
              href="/contact"
              eventName="cta_click"
              eventPayload={{ placement: "services_page", label: "Start a scoped brief" }}
            >
              Start a scoped brief
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
