import { ArrowUpRight, Clock3, Mail, MessageSquareMore } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { ContactForm } from "@/components/marketing/contact-form";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { TrackedAnchor } from "@/components/ui/tracked-anchor";
import { buildMetadata } from "@/lib/seo";
import { getFaqItems, getSiteSettings } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Contact | Maykell Interactive",
  description:
    "Simple conversion-first contact form with essential project fields, validation, and direct fallback channels.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, faqItems] = await Promise.all([getSiteSettings(), getFaqItems()]);

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <section className="site-container">
        <Reveal className="section-shell rounded-[var(--radius-2xl)] p-6 md:p-8">
          <p className="eyebrow">Contact</p>
          <h1 className="section-heading type-display-xl mt-4 font-semibold text-white">
            A simple inquiry path with clear next steps.
          </h1>
          <p className="type-body-lg mt-6 max-w-3xl text-[var(--color-fog-300)]">
            This page keeps conversion friction low: only the essential form fields,
            direct fallback contact options, and clear expectations after submission.
          </p>
          <div className="grid-responsive-3 mt-6">
            {[
              "Name, email, company or project",
              "Budget and timeline if known",
              "Immediate confirmation + clear reply expectations",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)]"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <ContactForm />

          <div className="grid gap-6">
            <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-7">
              <p className="eyebrow">Direct channels</p>
              <div className="mt-5 grid gap-4">
                <TrackedAnchor
                  href={`mailto:${settings.primaryEmail}`}
                  eventName="external_contact_click"
                  eventPayload={{ label: "contact_email" }}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5 transition hover:border-[var(--color-border-accent)]"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-white">
                    <Mail className="h-4 w-4 text-[var(--color-vol-blue)]" />
                    Email
                  </div>
                  <div className="mt-3 text-sm text-[var(--color-fog-300)]">
                    {settings.primaryEmail}
                  </div>
                </TrackedAnchor>
                {settings.socials.map((social) => (
                  <TrackedAnchor
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    eventName="external_contact_click"
                    eventPayload={{ label: `contact_${social.label.toLowerCase()}` }}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] p-5 transition hover:border-[var(--color-border-accent)]"
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

            <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-7" delay={0.05}>
              <p className="eyebrow">Response expectations</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-fog-300)]">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-1 h-4 w-4 text-[var(--color-signal-lime)]" />
                  <span>{settings.responseSla}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--color-vol-blue)]" />
                  <span>Timezone: {settings.timezone}</span>
                </div>
                <p>
                  After you submit, you will see an on-page confirmation immediately.
                  If the project looks like a fit, the next step is usually a reply,
                  scope review, or a short call based on complexity.
                </p>
              </div>
            </Reveal>

            <Reveal className="section-shell rounded-[var(--radius-xl)] p-6 md:p-7" delay={0.1}>
              <p className="eyebrow">FAQ</p>
              <div className="mt-5">
                <FaqAccordion items={faqItems.slice(1)} defaultOpen={0} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
