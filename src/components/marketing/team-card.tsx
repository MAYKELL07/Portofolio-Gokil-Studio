import type { TeamMember } from "@/lib/site-content";
import { ProjectCoverMedia } from "@/components/media/site-media";

export function TeamCard({ member }: { member: TeamMember }) {
  const displayName = member.name || "Studio team";
  const hasSkills = member.skills.length > 0;
  const hasPortrait = Boolean(member.portraitUrl);

  return (
    <article className="section-shell interactive-card p-6">
      {hasPortrait ? (
        <ProjectCoverMedia
          src={member.portraitUrl}
          alt={member.portraitAlt || displayName}
          ratio="square"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 22vw"
          quality={72}
          interactive={false}
          className="mb-5 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)]"
          overlayClassName="bg-transparent"
        />
      ) : null}
      <h3 className="text-2xl font-semibold text-white">{displayName}</h3>
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
