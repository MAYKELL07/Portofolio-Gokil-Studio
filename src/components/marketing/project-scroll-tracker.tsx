"use client";

import { useEffect, useRef } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type ProjectScrollTrackerProps = {
  slug: string;
};

export function ProjectScrollTracker({ slug }: ProjectScrollTrackerProps) {
  const milestones = useRef(new Set<number>());
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const measure = () => {
      frame.current = null;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) {
        return;
      }

      const progress = Math.round((window.scrollY / height) * 100);

      thresholds.forEach((threshold) => {
        if (progress >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          trackEvent(ANALYTICS_EVENTS.PROJECT_SCROLL_DEPTH, {
            slug,
            depth: threshold,
          });
        }
      });
    };

    const onScroll = () => {
      if (frame.current !== null) {
        return;
      }

      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, [slug]);

  return null;
}
