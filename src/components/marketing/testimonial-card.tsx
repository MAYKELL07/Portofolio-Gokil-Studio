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
  const attribution = [testimonial.role, testimonial.company].filter(Boolean).join(", ");

  return (
    <article className="section-shell interactive-card p-6 md:p-7">
      <div className="mb-5 flex items-center gap-4">
        <ProjectCoverMedia
          src={portraitSrc}
          alt={testimonial.portraitAlt || testimonial.name}
          ratio="square"
          sizes="56px"
          quality={68}
          className="h-14 w-14 shrink-0"
          interactive={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.02),rgba(17,19,21,0.12))]"
        />
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <p className={compact ? "text-lg leading-8 text-white" : "text-2xl leading-10 text-white md:text-3xl"}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 text-sm text-[var(--color-fog-300)]">
        <div className="font-semibold text-white">{testimonial.name}</div>
        {attribution ? <div>{attribution}</div> : null}
      </div>
    </article>
  );
}
