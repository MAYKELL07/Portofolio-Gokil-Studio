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
  timelineOptions,
  type ContactFormValues,
} from "@/lib/contact-schema";

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
      className="section-shell rounded-[var(--radius-xl)] p-5 md:p-6"
      action={onSubmit}
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

      <div className="grid-responsive-3 mb-6">
        {[
          ["Friction", "Only the essentials are required"],
          ["Time", "Usually under 2 minutes"],
          ["Next step", "Confirmation now, human reply next"],
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

      <div className="mb-5">
        <p className="eyebrow">Inquiry form</p>
        <p className="mt-2 text-sm leading-7 text-[var(--color-fog-300)]">
          Share just enough detail to confirm fit. Budget and timeline help when available, but they are optional.
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
          fieldId="contact-company-project"
          label="Company / Project"
          required
          error={state.errors.companyOrProject}
          className="md:col-span-2"
        >
          <TextField
            name="companyOrProject"
            required
            minLength={2}
            maxLength={160}
            disabled={isPending}
            state={state.errors.companyOrProject ? "error" : "default"}
            placeholder="Company, studio, or project name"
          />
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
          fieldId="contact-project-brief"
          label="Brief project description"
          required
          error={state.errors.projectBrief}
          description="Summarize the outcome you want, target platform, and any constraints that affect scope."
        >
          <TextAreaField
            name="projectBrief"
            rows={6}
            required
            minLength={20}
            maxLength={2000}
            disabled={isPending}
            state={state.errors.projectBrief ? "error" : "default"}
            placeholder="What you need, what the goal is, and any key constraints..."
          />
        </FieldShell>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[var(--color-fog-300)]">
          You&apos;ll see an immediate confirmation here, and if the project looks like a fit you can expect a reply within 24 hours.
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
