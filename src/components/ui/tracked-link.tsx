"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = {
  href: string;
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean>;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export function TrackedLink({
  href,
  eventName,
  eventPayload,
  children,
  className,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);

        if (eventName) {
          trackEvent(eventName, eventPayload);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
