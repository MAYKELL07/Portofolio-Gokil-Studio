"use client";

import { useRef, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  FieldShell,
  FormStatus,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/form-fields";
import {
  budgetOptions,
  projectTypeOptions,
  timelineOptions,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { getMobileSummary } from "@/lib/utils";

type ContactFormState = {
  success: boolean;
  message: string;
  errors: Partial<Record<keyof ContactFormValues, string>>;
};

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

function normalizePayload(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => {
      if (typeof value !== "string") {
        return [key, value];
      }

      return [key, value.trim()];
    }),
  );
}

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [isPending, setIsPending] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setState(initialState);

    const payload = normalizePayload(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactFormState;

      setState(result);

      if (response.ok) {
        formRef.current?.reset();
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_SUCCESS, {
          page: "contact",
          section: "contact_form",
        });
      } else {
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_FAILED, {
          page: "contact",
          section: "contact_form",
          failure_type: "validation_or_delivery",
          error_count: Object.keys(result.errors ?? {}).length,
        });
      }
    } catch {
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_FAILED, {
        page: "contact",
        section: "contact_form",
        failure_type: "network",
      });
      setState({
        success: false,
        message: "Network error. Please try again or use email below.",
        errors: {},
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="section-shell rounded-[var(--radius-xl)] bento-card w-full min-w-0 p-4 md:p-6"
      action={onSubmit}
      noValidate
      aria-busy={isPending}
      onFocus={() => {
        if (hasStarted) {
          return;
        }

        setHasStarted(true);
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_STARTED, {
          page: "contact",
          section: "contact_form",
        });
      }}
    >
      <input
        type="text"
        name="website"
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-fog-300)] md:hidden">
        Share the basics. Most inquiries take about two minutes.
      </div>
      <div className="mb-6 hidden md:block">
        <div className="grid-responsive-3">
          {[
            ["Fields", "Contact, project type, goals, timeline, budget"],
            ["Time", "Usually under 2 minutes"],
            ["Reply", "Confirmation now, human follow-up next"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03] px-4 py-3"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
                {label}
              </div>
              <div className="mt-2 text-sm text-[var(--color-fog-300)]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="eyebrow">Inquiry form</p>
        <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">
          {getMobileSummary(
            "Share only the details needed to qualify the lead. Budget and timeline help when known, but both can stay flexible.",
            14,
          )}
        </p>
        <p className="mt-2 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">
          Share only the details needed to qualify the lead. Budget and timeline help when known, but both can stay flexible.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FieldShell fieldId="contact-name" label="Name" required error={state.errors.name}>
          <TextField
            name="name"
            required
            minLength={2}
            disabled={isPending}
            state={state.errors.name ? "error" : "default"}
            placeholder="Your name"
          />
        </FieldShell>

        <FieldShell fieldId="contact-email" label="Email" required error={state.errors.email}>
          <TextField
            name="email"
            type="email"
            required
            disabled={isPending}
            state={state.errors.email ? "error" : "default"}
            placeholder="you@company.com"
          />
        </FieldShell>

        <FieldShell
          fieldId="contact-project-type"
          label="Project type"
          required
          error={state.errors.projectType}
        >
          <SelectField
            name="projectType"
            required
            disabled={isPending}
            state={state.errors.projectType ? "error" : "default"}
            defaultValue=""
          >
            <option value="">Select project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </FieldShell>

        <FieldShell
          fieldId="contact-budget-range"
          label="Budget range (optional)"
          error={state.errors.budgetRange}
        >
          <SelectField
            name="budgetRange"
            disabled={isPending}
            state={state.errors.budgetRange ? "error" : "default"}
            defaultValue=""
          >
            <option value="">
              Prefer not to say
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </FieldShell>

        <FieldShell
          fieldId="contact-timeline"
          label="Timeline (optional)"
          error={state.errors.timeline}
        >
          <SelectField
            name="timeline"
            disabled={isPending}
            state={state.errors.timeline ? "error" : "default"}
            defaultValue=""
          >
            <option value="">
              Flexible / not set yet
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </FieldShell>
      </div>

      <div className="mt-5 grid gap-5">
        <FieldShell
          fieldId="contact-project-goals"
          label="Project goals"
          required
          error={state.errors.projectGoals}
          description="Summarize what you are trying to ship, improve, or unblock."
        >
          <TextAreaField
            name="projectGoals"
            rows={5}
            required
            minLength={20}
            maxLength={2000}
            disabled={isPending}
            state={state.errors.projectGoals ? "error" : "default"}
            placeholder="What you need help building, what the goal is, and any important constraints..."
          />
        </FieldShell>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[var(--color-fog-300)]">
          <span className="md:hidden">
            Immediate confirmation here. If it looks like a fit, expect a reply within 24 hours.
          </span>
          <span className="hidden md:inline">
            You&apos;ll see an immediate confirmation here, and if the brief looks like a fit you can expect a reply within 24 hours.
          </span>
          <FormStatus
            state={state.message ? (state.success ? "success" : "error") : "idle"}
            message={state.message}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          Send inquiry
        </Button>
      </div>
    </form>
  );
}
