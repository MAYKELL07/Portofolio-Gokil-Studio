"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type PostHogAnalyticsProviderProps = {
  children: ReactNode;
};

function normalizeProxyPath(path?: string) {
  const trimmed = path?.trim();

  if (!trimmed) {
    return null;
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

const DEFAULT_POSTHOG_PROXY_PATH = "/ingest/pulse-telemetry";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
const posthogEnabled = Boolean(posthogKey && posthogHost);
const posthogProxyPath =
  normalizeProxyPath(process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH) ??
  (posthogEnabled ? DEFAULT_POSTHOG_PROXY_PATH : null);
const posthogClient = posthog as typeof posthog & { __loaded?: boolean };

export function PostHogAnalyticsProvider({
  children,
}: PostHogAnalyticsProviderProps) {
  const [client, setClient] = useState<(typeof posthogClient) | null>(null);

  useEffect(() => {
    if (!posthogEnabled) {
      return;
    }

    if (!posthogClient.__loaded) {
      posthogClient.init(posthogKey as string, {
        api_host: posthogProxyPath ?? (posthogHost as string),
        capture_pageview: false,
        autocapture: false,
      });
    }

    const frame = window.setTimeout(() => {
      setClient(posthogClient);
    }, 0);

    return () => {
      window.clearTimeout(frame);
    };
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
}
