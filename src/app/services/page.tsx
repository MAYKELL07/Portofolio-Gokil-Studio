import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { ServiceCard } from "@/components/marketing/service-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getMobileSummary } from "@/lib/utils";
import { getFaqItems, getServices } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Services | Maykell Interactive",
  description:
    "Clear Roblox outsourcing and co-development services, delivery models, and inquiry paths for teams hiring production support.",
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
  const intakeChecklist = [
    "Target outcome or business goal",
    "Current build status or production stage",
    "Desired timeline or launch window",
    "Where execution support is needed most",
  ];
  const mobileIntro = getMobileSummary(
    "Each service below explains what it is, when to hire us, what is included, the typical timeline, and the kind of outcome it is meant to create.",
    16,
  );

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <p className="eyebrow">Services</p>
          <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
            Services built to answer the buying questions fast.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
            {mobileIntro}
          </p>
          <p className="type-body-lg mt-6 hidden max-w-3xl text-[var(--color-fog-300)] md:block">
            Each service below explains what it is, when to hire us, what is included, the typical timeline, and the kind of outcome it is meant to create.
          </p>
        </Reveal>
      </section>

      <section className="site-container hidden md:block">
        <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
          <p className="eyebrow">Before you reach out</p>
          <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
            A strong first brief covers the basics.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {intakeChecklist.map((item) => (
              <div
                key={item}
                className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-3 text-sm text-[var(--color-fog-300)]"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {sortedCategories.map((category) => {
        return (
          <section key={category} className="site-container">
            <Reveal className="mb-6">
              <p className="eyebrow">Service category</p>
              <h2 className="section-heading type-h2 mt-3 font-semibold text-white">
                {category}
              </h2>
            </Reveal>
            <div className="grid gap-6">
              {groupedServices[category].map((service, serviceIndex) => (
                <Reveal key={service.slug} delay={serviceIndex * 0.05}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">How engagements work</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              Simple structure, clear scope, and visible milestones.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-fog-300)]">
              <p>Discovery and scope alignment happen first so timeline and budget mean something.</p>
              <p className="md:hidden">Most work is scoped in a direct brief, then delivered against visible milestones.</p>
              <p className="hidden md:block">Work can be delivered directly, through an agency, or as embedded production support inside an existing pipeline.</p>
              <p className="hidden md:block">The goal is to make each service easy to understand and easy to scope before the first call.</p>
            </div>
          </Reveal>
          <Reveal className="hidden rounded-[var(--radius-xl)] p-6 md:block md:p-8" delay={0.05}>
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
