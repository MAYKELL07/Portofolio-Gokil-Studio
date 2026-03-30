"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type SiteHeaderProps = {
  studioName: string;
  navLinks: { label: string; href: string }[];
  responseSla?: string;
};

export function SiteHeader({ studioName, navLinks, responseSla }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const primaryNav = navLinks.filter((item) =>
    ["/work", "/services", "/about", "/contact"].includes(item.href),
  );
  const isContactPage = pathname === "/contact";
  const hasResponseSla = Boolean(responseSla?.trim());
  const isCurrentPath = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="site-container pt-3 md:pt-4">
        <div className="pointer-events-auto overflow-hidden rounded-[1.45rem] border border-[var(--color-border-strong)] bg-[rgba(7,12,18,0.72)] shadow-[var(--shadow-md)] backdrop-blur-xl transition-colors duration-200">
          <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-5 md:py-4">
            <Link
              href="/"
              className="min-w-0 inline-flex items-center gap-3 text-sm font-semibold text-white"
              aria-label={`Go to ${studioName} homepage`}
              onClick={() => {
                setIsOpen(false);
                trackEvent("nav_logo_click", { location: "header" });
              }}
            >
              <span className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-[var(--color-border-strong)] bg-[linear-gradient(145deg,rgba(86,191,244,0.18),rgba(131,168,255,0.12))] px-2 text-[11px] font-bold text-[var(--color-vol-blue)]">
                MI
              </span>
              <span className="hidden md:block text-base tracking-[-0.02em]">{studioName}</span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrentPath(item.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-medium text-[var(--color-fog-300)] transition hover:bg-white/[0.04] hover:text-white aria-[current=page]:bg-[rgba(86,191,244,0.14)] aria-[current=page]:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    trackEvent("nav_click", { label: item.label });
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <ButtonLink
                href="/contact"
                eventName="cta_click"
                eventPayload={{ placement: "header", label: "Start a Project" }}
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {!isContactPage ? (
                <ButtonLink
                  href="/contact"
                  size="md"
                  className="min-h-12 px-4 text-[13px] whitespace-nowrap"
                  eventName="cta_click"
                  eventPayload={{ placement: "mobile_header", label: "Start a Project" }}
                >
                  Start a Project
                </ButtonLink>
              ) : null}
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-border-strong)] bg-[rgba(9,14,22,0.68)] text-white"
                aria-expanded={isOpen}
                aria-controls="mobile-primary-navigation"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                onClick={() => setIsOpen((current) => !current)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isOpen ? (
            <div
              id="mobile-primary-navigation"
              className="border-t border-[var(--color-border-soft)] bg-[rgba(6,10,16,0.74)] px-3 pb-5 pt-3 md:hidden"
            >
              <div className="space-y-3">
                {!isContactPage ? (
                  <div className="rounded-[1.35rem] border border-[var(--color-border-strong)] bg-[rgba(12,19,29,0.72)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
                      Start here
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      Share the brief, goals, and timeline.
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-fog-300)]">
                      {hasResponseSla
                        ? `Usually replies ${responseSla}.`
                        : "We will review the project and reply with the next step."}
                    </p>
                    <ButtonLink
                      href="/contact"
                      size="lg"
                      className="mt-4 w-full justify-center"
                      eventName="cta_click"
                      eventPayload={{ placement: "mobile_nav", label: "Start a Project" }}
                      onClick={() => setIsOpen(false)}
                    >
                      Start a Project
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                ) : null}

                <nav aria-label="Mobile primary" className="grid grid-cols-2 gap-3">
                  {primaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isCurrentPath(item.href) ? "page" : undefined}
                      className="flex min-h-13 items-center rounded-[1.15rem] border border-[var(--color-border-soft)] bg-[rgba(11,18,27,0.64)] px-4 text-base font-medium text-white transition hover:border-[var(--color-border-accent)] aria-[current=page]:border-[var(--color-border-accent)] aria-[current=page]:bg-[rgba(86,191,244,0.12)]"
                      onClick={() => {
                        setIsOpen(false);
                        trackEvent("nav_click", { label: item.label, menu: "mobile" });
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
