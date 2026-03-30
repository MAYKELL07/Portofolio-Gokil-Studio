"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Clock3 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

type MobileCtaBarProps = {
  responseSla: string;
};

export function MobileCtaBar({ responseSla }: MobileCtaBarProps) {
  const pathname = usePathname();
  const hasResponseSla = Boolean(responseSla?.trim());
  const hideBar =
    pathname === "/contact" || pathname === "/privacy" || pathname === "/terms";

  if (hideBar) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[rgba(17,19,21,0.98)] px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 md:hidden">
      <div className="site-container px-0">
        {hasResponseSla ? (
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fog-500)]">
              <Clock3 className="h-3.5 w-3.5 text-[var(--color-signal-lime)]" />
              Fast reply
            <span className="truncate text-[11px] font-medium tracking-normal text-[var(--color-fog-300)]">
              {responseSla}
            </span>
          </div>
        ) : null}
        <ButtonLink
          href="/contact"
          size="lg"
          eventName="cta_click"
          eventPayload={{ placement: "mobile_sticky_bar", label: "Start a Project" }}
          className="w-full justify-center"
        >
          Start a Project
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
}
