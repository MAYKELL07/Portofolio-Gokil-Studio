import { ArrowRight } from "lucide-react";

import { TrackedLink } from "@/components/ui/tracked-link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy | Maykell Interactive",
  description:
    "Privacy notice for the portfolio site, contact submissions, and analytics instrumentation.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-6 md:px-8 md:pb-28">
      <div className="section-shell rounded-[2rem] p-6 md:p-8">
        <p className="eyebrow">Privacy</p>
        <h1 className="section-heading mt-4 text-4xl font-semibold text-white md:text-5xl">
          Privacy notice
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-[var(--color-fog-300)]">
          <p>
            Contact submissions are used only to review, respond to, and manage project inquiries.
            Form payloads may be stored in operational systems used for delivery follow-up.
          </p>
          <p>
            Analytics events measure CTA clicks, portfolio usage, scroll depth, and form completion
            so the site can improve conversion quality and reduce friction.
          </p>
          <p>
            If you need your submitted information removed, contact the studio directly using the
            email address shown on the contact page.
          </p>
        </div>
      </div>
      <div className="section-shell mt-8 rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Need a direct answer?</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
              Policy pages should not block the conversion path.
            </p>
          </div>
          <TrackedLink
            href="/contact"
            eventName="cta_click"
            eventPayload={{ placement: "privacy_page", label: "Contact studio" }}
            className="glass-button gap-2 bg-[var(--color-vol-blue)] text-[var(--color-ink-950)]"
          >
            Contact studio
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
