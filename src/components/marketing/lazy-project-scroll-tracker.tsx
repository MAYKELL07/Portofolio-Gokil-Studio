"use client";

import dynamic from "next/dynamic";

type LazyProjectScrollTrackerProps = {
  slug: string;
};

const ProjectScrollTracker = dynamic(
  () =>
    import("@/components/marketing/project-scroll-tracker").then(
      (module) => module.ProjectScrollTracker,
    ),
  { ssr: false },
);

export function LazyProjectScrollTracker(props: LazyProjectScrollTrackerProps) {
  return <ProjectScrollTracker {...props} />;
}
