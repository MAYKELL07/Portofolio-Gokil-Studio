"use client";

import { ArrowRight } from "lucide-react";

import { TrackedLink } from "@/components/ui/tracked-link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-5 py-16 md:px-8">
      <div className="section-shell w-full rounded-[2rem] p-6 text-center md:p-10">
        <p className="eyebrow">Unexpected error</p>
        <h1 className="section-heading mt-4 text-4xl font-semibold text-white md:text-6xl">
          Something broke in this route.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-fog-300)]">
          Try reloading the route. If it persists, use the contact path so the issue can be reviewed.
        </p>
        <p className="mt-4 text-xs text-[var(--color-fog-500)]">
          {error.digest ? `Error digest: ${error.digest}` : "No digest available."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="glass-button bg-[var(--color-vol-blue)] text-[var(--color-ink-950)]"
          >
            Try again
          </button>
          <TrackedLink
            href="/contact"
            eventName="cta_click"
            eventPayload={{ placement: "error_boundary", label: "Contact studio" }}
            className="glass-button gap-2 border border-white/8 bg-white/[0.03] text-white"
          >
            Contact studio
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
