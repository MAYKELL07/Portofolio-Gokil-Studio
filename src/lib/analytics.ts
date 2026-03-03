"use client";

type AnalyticsValue = string | number | boolean;
type AnalyticsPayload = Record<string, AnalyticsValue>;

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  HERO_CTA_CLICK: "hero_cta_click",
  CTA_CLICK: "cta_click",
  PROJECT_CARD_CLICK: "project_card_click",
  PROJECT_PAGE_CTA_CLICK: "project_page_cta_click",
  CONTACT_FORM_STARTED: "contact_form_started",
  CONTACT_FORM_SUBMIT_SUCCESS: "contact_form_submit_success",
  CONTACT_FORM_SUBMIT_FAILED: "contact_form_submit_failed",
  WORK_FILTER_USED: "work_filter_used",
  WORK_FILTER_RESET: "work_filter_reset",
  PROJECT_SCROLL_DEPTH: "project_scroll_depth",
  NAV_CLICK: "nav_click",
  NAV_LOGO_CLICK: "nav_logo_click",
  OUTBOUND_LINK_CLICK: "outbound_link_click",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: Record<string, unknown>) => void;
    posthog?: { capture: (eventName: string, properties?: Record<string, unknown>) => void };
  }
}

const REDACTED_KEYS = new Set([
  "email",
  "name",
  "company",
  "companyOrProject",
  "projectBrief",
  "message",
]);

function sanitizeString(value: string) {
  const normalized = value.trim();

  if (!normalized || normalized.includes("@")) {
    return null;
  }

  return normalized.slice(0, 120);
}

function sanitizePayload(payload: AnalyticsPayload) {
  return Object.entries(payload).reduce<AnalyticsPayload>((result, [key, value]) => {
    if (REDACTED_KEYS.has(key)) {
      return result;
    }

    if (typeof value === "string") {
      const sanitized = sanitizeString(value);

      if (sanitized) {
        result[key] = sanitized;
      }

      return result;
    }

    if (typeof value === "number") {
      if (Number.isFinite(value)) {
        result[key] = Number(value.toFixed(2));
      }

      return result;
    }

    result[key] = value;
    return result;
  }, {});
}

export function getPageType(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  if (pathname.startsWith("/work/")) {
    return "project_detail";
  }

  if (pathname.startsWith("/work")) {
    return "work_index";
  }

  if (pathname.startsWith("/services")) {
    return "services";
  }

  if (pathname.startsWith("/about")) {
    return "about";
  }

  if (pathname.startsWith("/contact")) {
    return "contact";
  }

  if (pathname.startsWith("/privacy") || pathname.startsWith("/terms")) {
    return "legal";
  }

  return "other";
}

export function trackEvent(
  eventName: AnalyticsEventName | string,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const sanitizedPayload = sanitizePayload(payload);

  window.gtag?.("event", eventName, sanitizedPayload);
  window.plausible?.(eventName, { props: sanitizedPayload });
  window.posthog?.capture(eventName, sanitizedPayload);
}

export function trackPageView(payload: {
  path: string;
  pageType: string;
  title?: string;
}) {
  trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page: payload.path,
    page_type: payload.pageType,
    title: payload.title ?? "",
  });
}
