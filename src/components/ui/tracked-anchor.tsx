"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedAnchorProps = {
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean>;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function TrackedAnchor({
  eventName,
  eventPayload,
  children,
  className,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
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
    </a>
  );
}
