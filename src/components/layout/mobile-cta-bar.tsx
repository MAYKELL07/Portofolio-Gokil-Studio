"use client";

import { ArrowRight, Clock3 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

type MobileCtaBarProps = {
  responseSla: string;
};

export function MobileCtaBar({ responseSla }: MobileCtaBarProps) {
  const hasResponseSla = Boolean(responseSla?.trim());

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[rgba(9,10,13,0.94)] px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="site-container flex items-center gap-3 px-0">
        {hasResponseSla ? (
          <div className="min-w-0 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fog-500)]">
              <Clock3 className="h-3.5 w-3.5 text-[var(--color-signal-lime)]" />
              Fast reply
            </div>
            <div className="truncate text-xs text-[var(--color-fog-300)]">{responseSla}</div>
          </div>
        ) : null}
        <ButtonLink
          href="/contact"
          eventName="cta_click"
          eventPayload={{ placement: "mobile_sticky_bar", label: "Start a Project" }}
          className="shrink-0 px-4"
        >
          Start a Project
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
}
