"use client";

import {
  cloneElement,
  isValidElement,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type FieldState = "default" | "error" | "success";

function controlClasses(state: FieldState = "default") {
  return cn(
    "mt-2 w-full rounded-[var(--radius-lg)] border px-4 py-3.5 text-sm transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[var(--color-fog-500)] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-60",
    state === "error"
      ? "border-[var(--color-coral)]/50 bg-[rgba(255,107,107,0.06)] text-white hover:border-[var(--color-coral)]/70 focus-visible:border-[var(--color-coral)]"
      : state === "success"
        ? "border-[var(--color-signal-lime)]/40 bg-[rgba(183,255,74,0.05)] text-white hover:border-[var(--color-signal-lime)]/60 focus-visible:border-[var(--color-signal-lime)]"
        : "border-[var(--color-border-strong)] bg-white/[0.03] text-white hover:border-[var(--color-border-accent)] hover:bg-white/[0.045] focus-visible:border-[var(--color-border-accent)]",
  );
}

export function FieldShell({
  fieldId,
  label,
  required,
  error,
  success,
  description,
  children,
  className,
}: {
  fieldId: string;
  label?: string;
  required?: boolean;
  error?: string;
  success?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const describedByIds = [
    description ? `${fieldId}-description` : null,
    error ? `${fieldId}-error` : null,
    !error && success ? `${fieldId}-success` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const control = isValidElement<{
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
  }>(children)
    ? cloneElement(children, {
        id: fieldId,
        "aria-describedby": describedByIds || undefined,
        "aria-invalid": error ? true : undefined,
        "aria-required": required || undefined,
      })
    : children;

  return (
    <div className={cn("block text-sm text-[var(--color-fog-300)]", className)}>
      {label ? (
        <label htmlFor={fieldId} className="inline-block">
          {label}
          {required ? (
            <>
              <span aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </>
          ) : null}
        </label>
      ) : null}
      {description ? (
        <p id={`${fieldId}-description`} className="mt-2 text-xs leading-6 text-[var(--color-fog-500)]">
          {description}
        </p>
      ) : null}
      {control}
      {error ? (
        <FieldMessage id={`${fieldId}-error`} tone="error">
          {error}
        </FieldMessage>
      ) : null}
      {!error && success ? (
        <FieldMessage id={`${fieldId}-success`} tone="success">
          {success}
        </FieldMessage>
      ) : null}
    </div>
  );
}

export function FieldMessage({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: "error" | "success";
  children: ReactNode;
}) {
  return (
    <span
      id={id}
      className={cn(
        "mt-2 block text-xs",
        tone === "error"
          ? "text-[var(--color-coral)]"
          : "text-[var(--color-signal-lime)]",
      )}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      {children}
    </span>
  );
}

export function TextField({
  state = "default",
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  state?: FieldState;
}) {
  return <input className={cn(controlClasses(state), className)} {...props} />;
}

export function SelectField({
  state = "default",
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  state?: FieldState;
  children: ReactNode;
}) {
  return (
    <select className={cn(controlClasses(state), className)} {...props}>
      {children}
    </select>
  );
}

export function TextAreaField({
  state = "default",
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  state?: FieldState;
}) {
  return <textarea className={cn(controlClasses(state), className)} {...props} />;
}

export function CheckboxField({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  error?: string;
}) {
  return (
    <label className="inline-flex items-start gap-3 text-sm text-[var(--color-fog-300)]">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-white/15 bg-white/5 accent-[var(--color-vol-blue)] transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--color-border-accent)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        {...props}
      />
      <span>
        {label}
        {error ? <FieldMessage tone="error">{error}</FieldMessage> : null}
      </span>
    </label>
  );
}

export function FormStatus({
  state,
  message,
}: {
  state: "idle" | "error" | "success";
  message?: string;
}) {
  if (state === "idle" || !message) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-2 rounded-[var(--radius-md)] border px-3 py-2 text-sm",
        state === "success"
          ? "border-[var(--color-signal-lime)]/28 bg-[rgba(183,255,74,0.08)] text-[var(--color-signal-lime)]"
          : "border-[var(--color-coral)]/28 bg-[rgba(255,107,107,0.08)] text-[var(--color-coral)]",
      )}
      role={state === "success" ? "status" : "alert"}
      aria-live={state === "success" ? "polite" : "assertive"}
    >
      {message}
    </div>
  );
}
