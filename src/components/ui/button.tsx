"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { TrackedLink } from "@/components/ui/tracked-link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonTone = "default" | "success" | "danger";
type ButtonSize = "md" | "lg";

type ButtonClassOptions = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
};

export function buttonClasses({
  variant = "primary",
  tone = "default",
  size = "md",
  disabled = false,
}: ButtonClassOptions = {}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[999px] border text-sm font-semibold tracking-[-0.01em] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-55";
  const sizeClass =
    size === "lg" ? "min-h-13 px-6 py-4 text-[0.95rem]" : "min-h-12 px-5 py-3";

  const toneMap = {
    default: {
      primary:
        "border-[var(--color-vol-blue)]/55 bg-[linear-gradient(135deg,var(--color-vol-blue),#8fdaff)] text-[var(--color-ink-950)] shadow-[0_16px_36px_rgba(86,191,244,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(86,191,244,0.36)] focus-visible:shadow-[0_0_0_4px_rgba(86,191,244,0.24)]",
      secondary:
        "border-[var(--color-border-strong)] bg-[rgba(9,14,22,0.62)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:border-[var(--color-border-accent)] hover:bg-[rgba(13,22,34,0.9)] hover:shadow-[0_14px_34px_rgba(1,7,17,0.35)] focus-visible:shadow-[0_0_0_4px_rgba(86,191,244,0.18)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-fog-300)] hover:-translate-y-0.5 hover:text-white focus-visible:shadow-[0_0_0_4px_rgba(86,191,244,0.12)]",
    },
    success: {
      primary:
        "border-[var(--color-signal-lime)]/52 bg-[linear-gradient(135deg,var(--color-signal-lime),#e3ec99)] text-[var(--color-ink-950)] shadow-[0_12px_30px_rgba(202,221,111,0.26)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(202,221,111,0.34)] focus-visible:shadow-[0_0_0_4px_rgba(202,221,111,0.2)]",
      secondary:
        "border-[var(--color-signal-lime)]/32 bg-[rgba(202,221,111,0.12)] text-white hover:-translate-y-0.5 hover:bg-[rgba(202,221,111,0.18)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.22)] focus-visible:shadow-[0_0_0_4px_rgba(202,221,111,0.16)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-signal-lime)] hover:-translate-y-0.5 hover:text-[#e6f2a1] focus-visible:shadow-[0_0_0_4px_rgba(202,221,111,0.12)]",
    },
    danger: {
      primary:
        "border-[var(--color-coral)]/52 bg-[linear-gradient(135deg,var(--color-coral),#ffae8b)] text-[var(--color-ink-950)] shadow-[0_12px_30px_rgba(255,127,107,0.24)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(255,127,107,0.32)] focus-visible:shadow-[0_0_0_4px_rgba(255,127,107,0.2)]",
      secondary:
        "border-[var(--color-coral)]/34 bg-[rgba(255,127,107,0.1)] text-white hover:-translate-y-0.5 hover:bg-[rgba(255,127,107,0.16)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.22)] focus-visible:shadow-[0_0_0_4px_rgba(255,127,107,0.16)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-coral)] hover:-translate-y-0.5 hover:text-[#ffb2a3] focus-visible:shadow-[0_0_0_4px_rgba(255,127,107,0.12)]",
    },
  } as const;

  return cn(base, sizeClass, toneMap[tone][variant], disabled && "cursor-not-allowed");
}

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  variant = "primary",
  tone = "default",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonClasses({ variant, tone, size, disabled }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean>;
  prefetch?: boolean | null;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  tone = "default",
  size = "md",
  eventName,
  eventPayload,
  prefetch,
  onClick,
}: ButtonLinkProps) {
  if (eventName) {
    return (
      <TrackedLink
        href={href}
        eventName={eventName}
        eventPayload={eventPayload}
        className={cn(buttonClasses({ variant, tone, size }), className)}
        prefetch={prefetch}
        onClick={onClick}
      >
        {children}
      </TrackedLink>
    );
  }

  return (
    <Link
      href={href}
      className={cn(buttonClasses({ variant, tone, size }), className)}
      prefetch={prefetch}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
