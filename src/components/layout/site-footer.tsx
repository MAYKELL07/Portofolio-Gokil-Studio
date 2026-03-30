"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type SiteFooterProps = {
  studioName: string;
  email: string;
  socials: { label: string; href: string }[];
};

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "inline-flex min-h-11 items-center rounded-full border border-white/8 px-4 py-2 text-sm text-[var(--color-fog-300)] transition hover:border-[var(--color-border-accent)] hover:text-white";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK, {
            page: "global",
            section: "footer",
            link_label: label,
            link_type: "external",
          })}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter({ studioName, email, socials }: SiteFooterProps) {
  const hasEmail = Boolean(email?.trim());
  const navigationLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const utilityLinks = [
    ...socials.map((social) => ({ ...social, external: true })),
    { href: "/privacy", label: "Privacy", external: false },
    { href: "/terms", label: "Terms", external: false },
  ];

  return (
    <footer className="border-t border-white/5 bg-[rgba(17,19,21,0.98)]">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-fog-500)]">
            Contact
          </p>
          <h2 className="max-w-md text-2xl font-semibold text-white md:text-3xl">
            Start a project conversation.
          </h2>
          {hasEmail ? (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-[var(--color-vol-blue)]"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.OUTBOUND_LINK_CLICK, {
                  page: "global",
                  section: "footer",
                  link_label: "footer_email",
                  link_type: "email",
                })}
            >
              {email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-fog-500)]">
            Navigate
          </p>
          <div className="flex flex-wrap gap-3">
            {navigationLinks.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-fog-500)]">
            Company
          </p>
          <div className="flex flex-wrap gap-3">
            {utilityLinks.map((item) => (
              <FooterLink
                key={`${item.label}-${item.href}`}
                href={item.href}
                label={item.label}
                external={item.external}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-xs text-[var(--color-fog-500)]">
        <div className="site-container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>{studioName}</span>
          <span>Roblox outsourcing and co-development.</span>
        </div>
      </div>
    </footer>
  );
}
