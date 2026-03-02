import { ArrowRight } from "lucide-react";

import { TrackedLink } from "@/components/ui/tracked-link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-5 py-16 md:px-8">
      <div className="section-shell w-full rounded-[2rem] p-6 text-center md:p-10">
        <p className="eyebrow">404</p>
        <h1 className="section-heading mt-4 text-4xl font-semibold text-white md:text-6xl">
          That route does not exist.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-fog-300)]">
          The recovery path stays obvious: go back to the work, services, or contact flow.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedLink
            href="/work"
            eventName="cta_click"
            eventPayload={{ placement: "404", label: "View work" }}
            className="glass-button gap-2 bg-[var(--color-vol-blue)] text-[var(--color-ink-950)]"
          >
            View work
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
          <TrackedLink
            href="/contact"
            eventName="cta_click"
            eventPayload={{ placement: "404", label: "Contact" }}
            className="glass-button border border-white/8 bg-white/[0.03] text-white"
          >
            Contact
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
