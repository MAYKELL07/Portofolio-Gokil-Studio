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
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border text-sm font-semibold transform-gpu transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-0 hover:translate-y-[-1px] active:translate-y-[-1px] active:scale-[0.992] disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 disabled:opacity-55";
  const sizeClass =
    size === "lg" ? "min-h-13 px-6 py-4" : "min-h-12 px-5 py-3";

  const toneMap = {
    default: {
      primary:
        "border-[var(--color-vol-blue)]/40 bg-[var(--color-vol-blue)] text-[var(--color-ink-950)] shadow-[0_10px_26px_rgba(76,201,255,0.14)] hover:border-[var(--color-vol-blue)] hover:bg-[#76d8ff] hover:shadow-[0_14px_34px_rgba(76,201,255,0.22)] focus-visible:shadow-[0_0_0_4px_rgba(76,201,255,0.18)]",
      secondary:
        "border-[var(--color-border-strong)] bg-white/[0.03] text-white hover:border-[var(--color-border-accent)] hover:bg-white/[0.06] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] focus-visible:shadow-[0_0_0_4px_rgba(76,201,255,0.14)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-fog-300)] hover:text-white focus-visible:shadow-[0_0_0_4px_rgba(76,201,255,0.1)]",
    },
    success: {
      primary:
        "border-[var(--color-signal-lime)]/40 bg-[var(--color-signal-lime)] text-[var(--color-ink-950)] shadow-[0_10px_26px_rgba(183,255,74,0.12)] hover:border-[var(--color-signal-lime)] hover:bg-[#c7ff74] hover:shadow-[0_14px_34px_rgba(183,255,74,0.2)] focus-visible:shadow-[0_0_0_4px_rgba(183,255,74,0.16)]",
      secondary:
        "border-[var(--color-signal-lime)]/28 bg-[rgba(183,255,74,0.08)] text-white hover:bg-[rgba(183,255,74,0.14)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] focus-visible:shadow-[0_0_0_4px_rgba(183,255,74,0.14)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-signal-lime)] hover:text-[#d5ff93] focus-visible:shadow-[0_0_0_4px_rgba(183,255,74,0.1)]",
    },
    danger: {
      primary:
        "border-[var(--color-coral)]/40 bg-[var(--color-coral)] text-[var(--color-ink-950)] shadow-[0_10px_26px_rgba(255,107,107,0.14)] hover:border-[var(--color-coral)] hover:bg-[#ff8787] hover:shadow-[0_14px_34px_rgba(255,107,107,0.22)] focus-visible:shadow-[0_0_0_4px_rgba(255,107,107,0.18)]",
      secondary:
        "border-[var(--color-coral)]/28 bg-[rgba(255,107,107,0.08)] text-white hover:bg-[rgba(255,107,107,0.14)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] focus-visible:shadow-[0_0_0_4px_rgba(255,107,107,0.14)]",
      ghost:
        "border-transparent bg-transparent text-[var(--color-coral)] hover:text-[#ff9b9b] focus-visible:shadow-[0_0_0_4px_rgba(255,107,107,0.1)]",
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
