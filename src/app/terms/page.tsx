import { ArrowRight } from "lucide-react";

import { TrackedLink } from "@/components/ui/tracked-link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms | Maykell Interactive",
  description: "Basic portfolio website terms and usage expectations.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-6 md:px-8 md:pb-28">
      <div className="section-shell rounded-[2rem] p-6 md:p-8">
        <p className="eyebrow">Terms</p>
        <h1 className="section-heading mt-4 text-4xl font-semibold text-white md:text-5xl">
          Terms of use
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-[var(--color-fog-300)]">
          <p>
            Portfolio content is for evaluation and sales conversations. Case study numbers are
            representative and should be validated during formal project discussions.
          </p>
          <p>
            Submitting the contact form does not create a commercial agreement. Scope, timelines,
            pricing, and deliverables are finalized only after written confirmation.
          </p>
          <p>
            Linked third-party platforms are governed by their own policies and terms.
          </p>
        </div>
      </div>
      <div className="section-shell mt-8 rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Next step</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
              If you have project questions, move back into the main contact flow.
            </p>
          </div>
          <TrackedLink
            href="/contact"
            eventName="cta_click"
            eventPayload={{ placement: "terms_page", label: "Start inquiry" }}
            className="glass-button gap-2 bg-[var(--color-vol-blue)] text-[var(--color-ink-950)]"
          >
            Start inquiry
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
