import { ArrowRight, ArrowUpRight, Check, ShieldCheck, TimerReset } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { ProjectCoverMedia } from "@/components/media/site-media";
import { MetricChip } from "@/components/marketing/metric-chip";
import { TeamCard } from "@/components/marketing/team-card";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getMobileSummary, getProjectPreviewImage } from "@/lib/utils";
import { getProjects, getServices, getSiteSettings, getTeam } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "About | Maykell Interactive",
  description:
    "How the team works as a Roblox outsourcing and co-development partner for client delivery.",
  path: "/about",
});

const principles = [
  "Keep communication direct from brief to handoff.",
  "Make ownership and milestone status visible.",
  "Reduce delivery risk before adding more scope.",
  "Work in a way client teams can follow and trust.",
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
    "Direct communication with the people doing the work",
    "Clear ownership across milestones and handoff points",
    "Structured for client teams, agencies, and embedded support",
    "Production discipline kept visible throughout delivery",
  ];
  const productionStandards = [
    "Clear owner on every milestone",
    "Visible review points before costly build changes",
    "QA and performance checks before handoff",
    "Fast response and direct contact throughout delivery",
  ];
  const workingStyle = [
    {
      title: "Direct communication",
      body: "Clients work with the people responsible for delivery. That keeps context intact, decisions faster, and feedback loops shorter throughout the project.",
      icon: ShieldCheck,
    },
    {
      title: "Clear ownership and milestone visibility",
      body: "Scope, review points, and handoff expectations stay visible so client teams know what is in progress, what is owned, and what is coming next.",
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
  const mobileHeroSummary = getMobileSummary(
    `${settings.tagline} The focus here is delivery style: direct communication, clear ownership, visible milestones, production discipline, and the ability to work smoothly with client teams.`,
    18,
  );
  const mobilePositioningSummary = getMobileSummary(
    "The company is positioned as a specialist execution partner for Roblox work. The emphasis is not on studio backstory. It is on how the team communicates, owns work, manages milestones, and supports client teams inside real production.",
    17,
  );
  const visualProjects = featuredProjects.slice(0, 2);

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <div className="bento-split gap-6 xl:gap-8 lg:items-end">
            <div>
              <p className="eyebrow">About / Studio</p>
              <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
                Trust is built through how the work is run, not through studio mythology.
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
                {mobileHeroSummary}
              </p>
              <p className="type-body-lg mt-6 hidden max-w-4xl text-[var(--color-fog-300)] md:block">
                {settings.tagline} The focus here is delivery style: direct communication, clear ownership,
                visible milestones, production discipline, and the ability to work smoothly with client teams.
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
            <div className="signal-panel hidden rounded-[var(--radius-xl)] p-5 md:block md:p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                Delivery snapshot
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
                  "Structured to work with client teams and existing pipelines",
                  "Production discipline kept visible instead of hidden behind sales language",
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
        <div className="bento-rail gap-6 xl:gap-8">
          <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8">
            <p className="eyebrow">Positioning</p>
            <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
              A delivery partner clients can work with in a clear, low-friction way.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
              {mobilePositioningSummary}
            </p>
            <p className="mt-5 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
              The company is positioned as a specialist execution partner for Roblox work.
              The emphasis is not on studio backstory. It is on how the team communicates,
              owns work, manages milestones, and supports client teams inside real production.
            </p>
            <div className="mt-6 hidden space-y-3 md:block">
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
          <div className="bento-stack gap-6">
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
                        <span className="md:hidden">{getMobileSummary(item.body, 15)}</span>
                        <span className="hidden md:inline">{item.body}</span>
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
        <div className="hidden lg:block">
          <div className="bento-split gap-6 xl:gap-8">
            <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8">
              <p className="eyebrow">Process philosophy</p>
              <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
                The working style is meant to reduce ambiguity for client teams.
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
            <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8" delay={0.05}>
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
        </div>
      </section>

      {visualProjects.length > 0 ? (
        <section className="site-container">
          <Reveal className="mb-8">
            <p className="eyebrow">Selected visuals</p>
            <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
              Screens and project views that support the delivery story.
            </h2>
          </Reveal>
          <div className="bento-grid gap-6">
            {visualProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 0.06}
                className={index > 0 ? "hidden md:block" : undefined}
              >
                <div className="section-shell bento-card p-4 md:p-5">
                  <ProjectCoverMedia
                    src={getProjectPreviewImage(project)}
                    alt={project.title}
                    ratio="free"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={72}
                    interactive={false}
                    className="h-[12rem] md:h-[13rem]"
                    overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.08),rgba(17,19,21,0.5))]"
                  >
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <span className="chip text-xs text-white">{project.projectType}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                        Case study visual
                      </span>
                    </div>
                  </ProjectCoverMedia>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-white">{project.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                      {getMobileSummary(project.headline || project.summary, 18)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="site-container">
        <div className="hidden lg:block">
          <div className="bento-rail gap-6 xl:gap-8">
            <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8">
              <p className="eyebrow">Tools and capabilities</p>
              <h2 className="section-heading type-h2 mt-4 font-semibold text-white">
                Compact capability detail, focused on delivery usefulness.
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
            <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-6 md:p-8" delay={0.05}>
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
                Trust comes from visible scope, ownership, review rhythm, and delivery discipline,
                not from a long founder story or a decorative studio narrative.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="site-container">
        <Reveal className="mb-8">
          <p className="eyebrow">Team</p>
          <h2 className="section-heading type-display-lg mt-3 font-semibold text-white">
            Team details stay compact and useful.
          </h2>
        </Reveal>
        {teamCount > 0 ? (
          <div className="bento-grid bento-grid-3 gap-6">
            {team.map((member, index) => (
              <Reveal
                key={`${member.name}-${index}`}
                delay={index * 0.08}
                className={index > 1 ? "hidden md:block" : undefined}
              >
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-8">
            <p className="text-sm leading-7 text-[var(--color-fog-300)]">
              A lean delivery team does not need a large roster page. Clear ownership, process,
              standards, and delivery proof do more to build trust than decorative team storytelling.
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
                If the delivery style looks right, review the work or move straight to the brief.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
                Review the work, then move into a brief while the context is still fresh.
              </p>
              <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-[var(--color-fog-300)] md:block">
                Review the work or move into a brief while the context is still fresh.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/work"
                variant="secondary"
                eventName="cta_click"
                eventPayload={{ placement: "about_page_footer", label: "View work" }}
                className="hidden sm:inline-flex"
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
