import { DecorativeBackgroundMedia } from "@/components/media/site-media";
import type { Project } from "@/lib/site-content";

type SectionTextureDividerProps = {
  projects: Project[];
};

export function SectionTextureDivider({ projects }: SectionTextureDividerProps) {
  const frames = projects
    .slice(0, 3)
    .map((project) => ({
      key: project.slug,
      imageUrl:
        project.coverImageUrl || project.galleryMedia[0]?.imageUrl || project.galleryMedia[0]?.posterUrl,
    }));

  if (frames.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="site-container py-2 md:py-4">
      <div className="grid gap-3 md:grid-cols-3">
        {frames.map((frame, index) => (
          <DecorativeBackgroundMedia
            key={frame.key}
            src={frame.imageUrl}
            ratio="free"
            sizes="(max-width: 767px) 100vw, 33vw"
            quality={58}
            className="h-[4.5rem] bg-white/[0.02]"
            imageClassName="opacity-50"
            overlayClassName={
              index % 2 === 0
                ? "bg-[linear-gradient(120deg,rgba(76,201,255,0.14),rgba(9,10,13,0.36),rgba(139,92,246,0.16))]"
                : "bg-[linear-gradient(120deg,rgba(139,92,246,0.18),rgba(9,10,13,0.36),rgba(76,201,255,0.12))]"
            }
          >
            <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,rgba(9,10,13,0.7),transparent)]" />
            <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,rgba(9,10,13,0.7),transparent)]" />
          </DecorativeBackgroundMedia>
        ))}
      </div>
    </div>
  );
}
