import type { Project } from "@/lib/site-content";

type SectionTextureDividerProps = {
  projects: Project[];
};

export function SectionTextureDivider({ projects }: SectionTextureDividerProps) {
  const segmentCount = Math.max(4, Math.min(6, projects.length + 2));

  return (
    <div aria-hidden className="site-container">
      <div className="texture-divider">
        <div
          className="texture-divider-track"
          style={{ gridTemplateColumns: `repeat(${segmentCount}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: segmentCount }, (_, index) => (
            <span
              key={index}
              className="texture-divider-segment"
              style={{ animationDelay: `${index * 0.22}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
