"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

import { ProjectCard } from "@/components/marketing/project-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site-content";

type FilterableWorkGridProps = {
  projects: Project[];
};

type FilterValue = "All" | string;

export function FilterableWorkGrid({ projects }: FilterableWorkGridProps) {
  const [category, setCategory] = useState<FilterValue>("All");
  const [platform, setPlatform] = useState<FilterValue>("All");
  const [serviceType, setServiceType] = useState<FilterValue>("All");

  const categoryOptions = ["All", ...new Set(projects.map((project) => project.projectType))];
  const platformOptions = ["All", ...new Set(projects.map((project) => project.platform))];
  const serviceOptions = [
    "All",
    ...new Set(projects.flatMap((project) => project.serviceTags)),
  ];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = category === "All" || project.projectType === category;
    const platformMatch = platform === "All" || project.platform === platform;
    const serviceMatch =
      serviceType === "All" || project.serviceTags.includes(serviceType);

    return categoryMatch && platformMatch && serviceMatch;
  });

  const activeFilters = [
    category !== "All" ? { label: "Category", value: category } : null,
    platform !== "All" ? { label: "Platform", value: platform } : null,
    serviceType !== "All" ? { label: "Service type", value: serviceType } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  const hasActiveFilters = activeFilters.length > 0;
  const featuredFallback = projects.filter((project) => project.featured);
  const fallbackProjects = (featuredFallback.length > 0 ? featuredFallback : projects).slice(0, 2);
  const isEmpty = filteredProjects.length === 0;
  const visibleProjects = isEmpty ? fallbackProjects : filteredProjects;
  const resultsLabel = isEmpty ? "closest-fit case studies" : "matching case studies";

  function clearFilters() {
    setCategory("All");
    setPlatform("All");
    setServiceType("All");
    trackEvent("portfolio_filter_reset", { location: "work_grid" });
  }

  function renderChipRow(
    label: string,
    values: string[],
    active: FilterValue,
    setValue: (value: FilterValue) => void,
    eventLabel: string,
  ) {
    return (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fog-500)]">
          {label}
        </p>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => {
            const isActive = active === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                className={cn(
                  "chip min-h-11 text-sm transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive
                    ? "border-[var(--color-vol-blue)]/40 bg-[var(--color-vol-blue)]/10 text-white"
                    : "text-[var(--color-fog-300)] hover:border-[var(--color-border-accent)] hover:text-white",
                )}
                onClick={() => {
                  setValue(value);
                  trackEvent("portfolio_filter_usage", {
                    filter: eventLabel,
                    value,
                  });
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="section-shell rounded-[var(--radius-xl)] p-5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr] lg:items-end">
          <div className="grid gap-6">
            {renderChipRow("Category", categoryOptions, category, setCategory, "category")}
            {renderChipRow("Platform", platformOptions, platform, setPlatform, "platform")}
            {renderChipRow("Service type", serviceOptions, serviceType, setServiceType, "serviceType")}
          </div>
          <div className="signal-panel rounded-[var(--radius-lg)] p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
              Scan status
            </div>
            <div className="mt-4 space-y-4">
              <p
                className="text-sm leading-7 text-[var(--color-fog-300)]"
                aria-live="polite"
              >
                Showing <span className="font-semibold text-white">{visibleProjects.length}</span>{" "}
                {resultsLabel}.
              </p>
              <div className="flex flex-wrap gap-2">
                {hasActiveFilters ? (
                  activeFilters.map((filter) => (
                    <span key={`${filter.label}-${filter.value}`} className="chip text-xs text-white">
                      {filter.label}: {filter.value}
                    </span>
                  ))
                ) : (
                  <span className="chip text-xs text-[var(--color-fog-300)]">
                    All available proof is visible.
                  </span>
                )}
              </div>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                  onClick={clearFilters}
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear filters
                </Button>
              ) : (
                <p className="text-xs leading-6 text-[var(--color-fog-500)]">
                  Start with one filter for a quick skim. Stack them only when you need a tighter fit.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isEmpty ? (
        <div className="section-shell rounded-[var(--radius-xl)] px-6 py-8">
          <div className="grid gap-5 lg:grid-cols-[1fr,auto] lg:items-center">
            <div>
              <p className="text-lg font-semibold text-white">No exact match from this filter mix.</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-fog-300)]">
                The closest-fit projects are still visible below so buyers are not forced into an
                empty page. Reset filters to reopen the full portfolio or move straight into a brief.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
                onClick={clearFilters}
              >
                <RotateCcw className="h-4 w-4" />
                Show all work
              </Button>
              <ButtonLink
                href="/contact"
                eventName="cta_click"
                eventPayload={{ placement: "work_filters_empty_state", label: "Start a Project" }}
                className="w-full justify-center sm:w-auto"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
