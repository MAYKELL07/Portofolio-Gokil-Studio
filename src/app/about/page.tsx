import { ArrowRight, ArrowUpRight, Check, ShieldCheck, TimerReset } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { MetricChip } from "@/components/marketing/metric-chip";
import { TeamCard } from "@/components/marketing/team-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getProjects, getServices, getSiteSettings, getTeam } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "About | Maykell Interactive",
  description:
    "Studio story, game-specific team roles, toolchain, and working principles for client delivery.",
  path: "/about",
});

const principles = [
  "Show value before spectacle.",
  "Motion supports hierarchy, never blocks reading.",
  "Keep every page within two clicks of the contact flow.",
  "Ship the smallest version that still feels sharp and credible.",
];

const capabilities = [
  {
    title: "Build",
    items: ["Roblox Studio", "Luau scripting", "Gameplay systems", "UI implementation"],
  },
  {
    title: "Design",
    items: ["Figma", "Interaction prototypes", "Flow mapping", "Component thinking"],
  },
  {
    title: "Production",
    items: ["Milestone scoping", "Review checkpoints", "QA passes", "Launch coordination"],
  },
  {
    title: "Optimization",
    items: ["Performance checks", "UX friction audits", "Live update planning", "Technical cleanup"],
  },
];

export default async function AboutPage() {
  const [settings, projects, services, team] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getServices(),
    getTeam(),
  ]);
  const featuredProjects = projects.filter((project) => project.featured);
  const projectTypes = new Set(projects.map((project) => project.projectType));
  const serviceCategories = new Set(services.map((service) => service.category));
  const teamCount = team.length;
  const hasResponseSla = Boolean(settings.responseSla?.trim());
  const trustSignals = [
    "Brand clients and campaign work",
    "Agencies needing execution support",
    "Game teams needing Roblox production help",
    "Direct delivery or partner-led pipelines",
  ];
  const productionStandards = [
    "Clear owner on every milestone",
    "Visible review points before costly build changes",
    "QA and performance checks before handoff",
    "Fast response and direct contact throughout delivery",
  ];
  const workingStyle = [
    {
      title: "Small team, direct accountability",
      body: "Buyers are not passed through layers of account management. The people shaping the work stay close to the brief, the milestones, and the decisions.",
      icon: ShieldCheck,
    },
    {
      title: "Production-first decisions",
      body: "Scope, handoff, and review rhythm are treated as part of the product. The goal is fewer surprises, clearer tradeoffs, and better shipping discipline.",
      icon: TimerReset,
    },
  ];
  const studioSnapshotMetrics = [
    { label: "Projects tracked", value: `${projects.length}`, accent: "blue" as const },
    { label: "Featured proof", value: `${featuredProjects.length}`, accent: "purple" as const },
    { label: "Service groups", value: `${serviceCategories.size}`, accent: "lime" as const },
    ...(hasResponseSla
      ? [{ label: "Response speed", value: settings.responseSla, accent: "default" as const }]
      : []),
  ];
  const trustMetricItems = [
    { label: "Project types", value: `${projectTypes.size} tracked`, accent: "blue" as const },
    { label: "Client paths", value: "Direct + partner-led", accent: "purple" as const },
    { label: "Team visibility", value: teamCount > 0 ? `${teamCount} roles shown` : "Lean / private", accent: "lime" as const },
    ...(hasResponseSla
      ? [{ label: "Response speed", value: settings.responseSla, accent: "default" as const }]
      : []),
  ];

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div>
              <p className="eyebrow">About / Studio</p>
              <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
                A production partner built for teams that need Roblox work shipped well.
              </h1>
              <p className="type-body-lg mt-6 max-w-3xl text-[var(--color-fog-300)]">
                {settings.tagline} The studio keeps roles, working style, and production standards
                visible so buyers can assess fit before the brief.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/work"
                  variant="secondary"
                  eventName="cta_click"
                  eventPayload={{ placement: "about_hero", label: "View work" }}
                >
                  View work
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  eventName="cta_click"
                  eventPayload={{ placement: "about_hero", label: "Start a project brief" }}
                >
                  Start a project brief
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
            <div className="signal-panel rounded-[var(--radius-xl)] p-5 md:p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                Studio snapshot
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {studioSnapshotMetrics.map((metric) => (
                  <MetricChip
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    accent={metric.accent}
                  />
                ))}
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  "Direct communication from brief to handoff",
                  "Structured for client, agency, or embedded support",
                  "Production discipline kept visible, not hidden behind pitch language",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-black/15 px-4 py-3 text-sm text-[var(--color-fog-300)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Positioning</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              Professional enough for real production, lean enough to stay responsive.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--color-fog-300)]">
              The studio is positioned as a specialist execution partner for Roblox work:
              useful for brands launching experiences, agencies needing a reliable builder,
              and teams that need game production support without a bulky vendor layer.
            </p>
            <div className="mt-6 space-y-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-4 text-sm text-[var(--color-fog-300)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-signal-lime)]" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-6">
            {workingStyle.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8"
                  delay={0.04 + index * 0.04}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white/[0.03]">
                      <Icon className="h-5 w-5 text-[var(--color-vol-blue)]" />
                    </div>
                    <div>
                      <p className="eyebrow">Working style</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-fog-300)]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Process philosophy</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              The process is meant to be felt in the work, not buried in jargon.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[var(--color-fog-300)]"
                >
                  {principle}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">Production standards</p>
            <div className="mt-6 space-y-4">
              {productionStandards.map((standard) => (
                <div
                  key={standard}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[var(--color-fog-300)]"
                >
                  {standard}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="eyebrow">Tools and capabilities</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              Capabilities that support both craft and delivery.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {capabilities.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5"
                >
                  <div className="text-sm font-semibold text-white">{group.title}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip text-xs text-[var(--color-fog-300)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8" delay={0.05}>
            <p className="eyebrow">Trust signals</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {trustMetricItems.map((metric) => (
                <MetricChip
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  accent={metric.accent}
                />
              ))}
            </div>
            <div className="mt-6 text-sm leading-7 text-[var(--color-fog-300)]">
              Proof is not just past work. It is also how clearly the studio shows scope,
              review rhythm, ownership, and the kind of buyers it is built to support.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">Team</p>
          <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
            Visible roles when the buyer needs to assess who is actually doing the work.
          </h2>
        </Reveal>
        {teamCount > 0 ? (
          <div className="grid-responsive-3">
            {team.map((member, index) => (
              <Reveal key={`${member.name}-${index}`} delay={index * 0.08}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="text-sm leading-7 text-[var(--color-fog-300)]">
              Team details can stay minimal for a lean studio. The page still keeps the process,
              standards, and proof signals visible so credibility does not depend on a large roster.
            </p>
          </Reveal>
        )}
      </section>

      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr,auto] lg:items-end">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="type-h2 mt-3 font-semibold text-white">
                If the standards and delivery style look right, review the work or move straight to the brief.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)]">
                Review the work or move into a brief while the context is still fresh.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/work"
                variant="secondary"
                eventName="cta_click"
                eventPayload={{ placement: "about_page_footer", label: "View work" }}
              >
                View work
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                eventName="cta_click"
                eventPayload={{ placement: "about_page_footer", label: "Start a project brief" }}
              >
                Start a project brief
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
