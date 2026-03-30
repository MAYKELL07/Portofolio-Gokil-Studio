import type { TeamMember } from "@/lib/site-content";
import { ProjectCoverMedia } from "@/components/media/site-media";
import { getMobileSummary } from "@/lib/utils";

export function TeamCard({ member }: { member: TeamMember }) {
  const displayName = member.name || "Studio team";
  const hasSkills = member.skills.length > 0;
  const hasPortrait = Boolean(member.portraitUrl);
  const initials = displayName
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const compactBio = getMobileSummary(
    [member.bio, member.focus].filter(Boolean).join(" "),
    16,
  );

  return (
    <article className="section-shell interactive-card bento-card flex h-full flex-col p-5 md:p-6">
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
      ) : (
        <div className="mb-5 flex aspect-square items-end overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-fog-500)]">
              Team
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white/86">
              {initials || "MI"}
            </p>
            {member.role ? (
              <p className="mt-2 text-sm text-[var(--color-fog-300)]">{member.role}</p>
            ) : null}
          </div>
        </div>
      )}
      <h3 className="text-balance text-2xl font-semibold text-white">{displayName}</h3>
      {member.role ? (
        <p className="mt-1 text-sm text-[var(--color-vol-blue)]">{member.role}</p>
      ) : null}
      {compactBio ? (
        <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)] md:hidden">{compactBio}</p>
      ) : null}
      {member.bio ? (
        <p className="mt-4 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">{member.bio}</p>
      ) : null}
      {member.focus ? (
        <p className="mt-4 hidden text-sm leading-7 text-[var(--color-fog-300)] md:block">{member.focus}</p>
      ) : null}
      {hasSkills ? (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
