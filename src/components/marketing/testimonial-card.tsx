import type { Testimonial } from "@/lib/site-content";

export function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6 md:p-7">
      <p className={compact ? "text-lg leading-8 text-white" : "text-2xl leading-10 text-white md:text-3xl"}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 text-sm text-[var(--color-fog-300)]">
        <div className="font-semibold text-white">{testimonial.name}</div>
        <div>
          {testimonial.role}, {testimonial.company}
        </div>
      </div>
    </article>
  );
}
