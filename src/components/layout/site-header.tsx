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
};

export function SiteHeader({ studioName, navLinks }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
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

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[rgba(9,10,13,0.72)] backdrop-blur-xl transition-colors duration-200"
    >
      <div className="site-container flex items-center justify-between py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-white"
          aria-label={`Go to ${studioName} homepage`}
          onClick={() => {
            setIsOpen(false);
            trackEvent("nav_logo_click", { location: "header" });
          }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[11px] font-bold text-[var(--color-vol-blue)]">
            MI
          </span>
          <span className="hidden md:block">{studioName}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPath(item.href) ? "page" : undefined}
              className="text-sm text-[var(--color-fog-300)] transition hover:text-white aria-[current=page]:text-white"
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
            variant="secondary"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-primary-navigation"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-primary-navigation"
          className="border-t border-white/5 bg-[rgba(9,10,13,0.96)] px-5 py-5 md:hidden"
        >
          <nav aria-label="Mobile primary" className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentPath(item.href) ? "page" : undefined}
                className="rounded-2xl border border-white/5 px-4 py-4 text-base font-medium text-white aria-[current=page]:border-[var(--color-border-accent)]"
                onClick={() => {
                  setIsOpen(false);
                  trackEvent("nav_click", { label: item.label, menu: "mobile" });
                }}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact"
              className="mt-2"
              eventName="cta_click"
              eventPayload={{ placement: "mobile_nav", label: "Start a Project" }}
              onClick={() => setIsOpen(false)}
            >
              Start a Project
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
