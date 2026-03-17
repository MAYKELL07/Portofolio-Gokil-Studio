import { ProjectCoverMedia } from "@/components/media/site-media";
import type { TeamMember } from "@/lib/site-content";

export function TeamCard({ member }: { member: TeamMember }) {
  const displayName = member.name || "Studio team";
  const initials = displayName
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2);
  const hasSkills = member.skills.length > 0;
  const portraitSrc = member.portraitUrl || "/placeholders/portrait-signal.svg";

  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6">
      <div>
        <ProjectCoverMedia
          src={portraitSrc}
          alt={member.portraitAlt || displayName}
          ratio="standard"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 20vw"
          quality={72}
          interactive={false}
          overlayClassName="bg-[linear-gradient(180deg,rgba(9,10,13,0.08),rgba(9,10,13,0.72))]"
        >
          <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] border border-white/10 bg-black/25 text-xl font-semibold text-white backdrop-blur-sm">
            {initials}
          </div>
        </ProjectCoverMedia>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{displayName}</h3>
      {member.role ? (
        <p className="mt-1 text-sm text-[var(--color-vol-blue)]">{member.role}</p>
      ) : null}
      {member.bio ? (
        <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">{member.bio}</p>
      ) : null}
      {member.focus ? (
        <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">{member.focus}</p>
      ) : null}
      {hasSkills ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span key={skill} className="chip text-xs text-[var(--color-fog-300)]">
              {skill}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
