"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { FAQItem } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FAQItem[];
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const accordionId = useId();

  return (
    <div className="grid gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={`${item.question}-${index}`}
            className={cn(
              "section-shell rounded-[var(--radius-xl)] p-5 transition-colors",
              isOpen && "border-[var(--color-border-accent)]",
            )}
          >
            <h3>
              <button
                type="button"
                id={`${accordionId}-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`${accordionId}-panel-${index}`}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              >
                <span className="text-lg font-semibold text-white">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[var(--color-fog-500)] transition-transform duration-200",
                    isOpen && "rotate-180 text-[var(--color-vol-blue)]",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${accordionId}-panel-${index}`}
              role="region"
              aria-labelledby={`${accordionId}-trigger-${index}`}
              hidden={!isOpen}
              className={cn(
                "mt-4 grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-7 text-[var(--color-fog-300)]">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
