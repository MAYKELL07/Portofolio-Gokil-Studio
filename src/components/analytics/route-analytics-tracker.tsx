"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { getPageType, trackPageView } from "@/lib/analytics";

export function RouteAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedRef.current === path) {
      return;
    }

    lastTrackedRef.current = path;

    trackPageView({
      path,
      pageType: getPageType(pathname),
      title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
