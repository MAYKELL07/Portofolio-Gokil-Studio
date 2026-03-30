import { ArrowUpRight, Clock3, Mail, MessageSquareMore } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { ProjectCoverMedia } from "@/components/media/site-media";
import { ContactForm } from "@/components/marketing/contact-form";
import { ButtonLink } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/seo";
import { getMobileSummary, getProjectPreviewImage } from "@/lib/utils";
import { getFeaturedProjects, getSiteSettings } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Contact | Maykell Interactive",
  description:
    "Contact form for Roblox outsourcing and co-development inquiries, with essential project fields and direct fallback channels.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
  ]);
  const hasPrimaryEmail = Boolean(settings.primaryEmail?.trim());
  const hasSocials = settings.socials.length > 0;
  const hasDirectChannels = hasPrimaryEmail || hasSocials;
  const responseDetails = [
    settings.responseSla?.trim() || "",
    settings.timezone?.trim() ? `Timezone: ${settings.timezone}` : "",
  ].filter(Boolean);
  const mobileIntro = getMobileSummary(
    "Share the essentials we need to qualify the lead: project type, goals, timing, budget if known, and how to reach you.",
    16,
  );
  const contactProofProject = featuredProjects[0];

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <p className="eyebrow">Contact</p>
          <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
            A minimal project inquiry form.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
            {mobileIntro}
          </p>
          <p className="type-body-lg mt-6 hidden max-w-4xl text-[var(--color-fog-300)] md:block">
            Share the essentials we need to qualify the lead: project type, goals, timing, budget if known, and how to reach you.
          </p>
          <div className="mt-6 hidden gap-3 md:grid-cols-2 md:grid">
            {[
              "Only the fields needed to qualify the project",
              "Immediate confirmation after submission",
              "Reply timing and next step explained up front",
              "Direct email fallback if the request is urgent",
            ].map((item) => (
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

      <section className="site-container">
        <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:gap-8 xl:items-start">
          <ContactForm />

          <div className="flex flex-col gap-6">
            {contactProofProject ? (
              <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-5 md:p-6">
                <p className="eyebrow">Recent delivery proof</p>
                <div className="mt-4">
                  <ProjectCoverMedia
                    src={getProjectPreviewImage(contactProofProject)}
                    alt={contactProofProject.title}
                    ratio="landscape"
                    sizes="(max-width: 1023px) 100vw, 30vw"
                    quality={72}
                    interactive={false}
                    className="min-h-[12rem]"
                    overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.08),rgba(17,19,21,0.5))]"
                  >
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <span className="chip text-xs text-white">{contactProofProject.projectType}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                        Example case
                      </span>
                    </div>
                  </ProjectCoverMedia>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-white">{contactProofProject.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
                    {getMobileSummary(contactProofProject.summary, 17)}
                  </p>
                </div>
                <ButtonLink
                  href={`/work/${contactProofProject.slug}`}
                  variant="ghost"
                  eventName="cta_click"
                  eventPayload={{ placement: "contact_proof", slug: contactProofProject.slug, label: "Review case study" }}
                  className="mt-4 justify-start px-0 py-0 text-[var(--color-vol-blue)]"
                >
                  Review case study
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </Reveal>
            ) : null}
            {hasDirectChannels ? (
              <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-5 md:p-6">
                <p className="eyebrow">Direct channels</p>
                <div className="mt-5 grid gap-4">
                  {hasPrimaryEmail ? (
                    <TrackedAnchor
                      href={`mailto:${settings.primaryEmail}`}
                      eventName={ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK}
                      eventPayload={{
                        page: "contact",
                        section: "direct_channels",
                        link_label: "contact_email",
                        link_type: "email",
                      }}
                      className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4 md:p-5 transition hover:border-[var(--color-border-accent)]"
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-white">
                        <Mail className="h-4 w-4 text-[var(--color-vol-blue)]" />
                        Email
                      </div>
                      <div className="mt-3 text-sm text-[var(--color-fog-300)]">
                        {settings.primaryEmail}
                      </div>
                    </TrackedAnchor>
                  ) : null}
                  {settings.socials.map((social) => (
                    <TrackedAnchor
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      eventName={ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK}
                      eventPayload={{
                        page: "contact",
                        section: "direct_channels",
                        link_label: `contact_${social.label.toLowerCase()}`,
                        link_type: "social",
                      }}
                      className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-4 md:p-5 transition hover:border-[var(--color-border-accent)]"
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-white">
                        <MessageSquareMore className="h-4 w-4 text-[var(--color-vol-blue)]" />
                        {social.label}
                      </div>
                      <div className="mt-3 text-sm text-[var(--color-fog-300)]">
                        Alternative contact channel if you prefer to reach out there.
                      </div>
                    </TrackedAnchor>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal className="section-shell rounded-[var(--radius-xl)] bento-card p-5 md:p-6" delay={0.05}>
              <p className="eyebrow">What happens next</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-fog-300)]">
                {responseDetails.map((detail, index) => {
                  const Icon = index === 0 ? Clock3 : ArrowUpRight;

                  return (
                    <div key={detail} className="flex items-start gap-3">
                      <Icon
                        className={`mt-1 h-4 w-4 ${
                          index === 0
                            ? "text-[var(--color-signal-lime)]"
                            : "text-[var(--color-vol-blue)]"
                        }`}
                      />
                      <span>{detail}</span>
                    </div>
                  );
                })}
                <p className="md:hidden">
                  You will see confirmation right away, then a human follow-up if the brief looks like a fit.
                </p>
                <p className="hidden md:block">
                  After submission, you will see an on-page confirmation immediately.
                  If the project looks like a fit, the next step is usually an email reply with follow-up questions,
                  a scope review, or a short call depending on complexity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
