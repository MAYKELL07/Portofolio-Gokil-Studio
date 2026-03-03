import { ProjectCoverMedia } from "@/components/media/site-media";
import type { Testimonial } from "@/lib/site-content";

export function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  const portraitSrc = testimonial.portraitUrl || "/placeholders/portrait-signal.svg";

  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6 md:p-7">
      <div className="mb-5 flex items-center gap-4">
        <ProjectCoverMedia
          src={portraitSrc}
          alt={testimonial.portraitAlt || testimonial.name}
          ratio="square"
          sizes="56px"
          quality={68}
          className="h-14 w-14 shrink-0"
          interactive={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(9,10,13,0.02),rgba(9,10,13,0.18))]"
        />
        <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(76,201,255,0.24),rgba(139,92,246,0.14),transparent)]" />
      </div>
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
