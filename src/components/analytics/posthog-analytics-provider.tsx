"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
const posthogProxyPath = normalizeProxyPath(
  process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH,
);
const posthogEnabled = Boolean(posthogKey && posthogHost);
const posthogClient = posthog as typeof posthog & { __loaded?: boolean };

export function PostHogAnalyticsProvider({
  children,
}: PostHogAnalyticsProviderProps) {
  const [client] = useState(() => {
    if (!posthogEnabled || typeof window === "undefined") {
      return null;
    }

    if (!posthogClient.__loaded) {
      posthogClient.init(posthogKey as string, {
        api_host: posthogProxyPath ?? (posthogHost as string),
        capture_pageview: false,
        autocapture: false,
      });
    }

    return posthogClient;
  });

  if (!client) {
    return <>{children}</>;
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
}
