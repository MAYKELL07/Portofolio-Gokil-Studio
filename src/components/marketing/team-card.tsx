import type { TeamMember } from "@/lib/site-content";

export function TeamCard({ member }: { member: TeamMember }) {
  const displayName = member.name || "Team role";
  const initials = displayName
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2);
  const hasSkills = member.skills.length > 0;

  return (
    <article className="section-shell interactive-card rounded-[var(--radius-xl)] p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[linear-gradient(135deg,rgba(76,201,255,0.2),rgba(255,255,255,0.03))] text-xl font-semibold text-white">
        {initials}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{displayName}</h3>
      <p className="mt-1 text-sm text-[var(--color-vol-blue)]">{member.role || "Studio role"}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
        {member.bio || "Add a short credibility note here so buyers understand this role quickly."}
      </p>
      <p className="mt-4 text-sm leading-7 text-[var(--color-fog-300)]">
        {member.focus || "Use this line for the delivery trust signal this role adds."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {hasSkills ? (
          member.skills.map((skill) => (
            <span key={skill} className="chip text-xs text-[var(--color-fog-300)]">
              {skill}
            </span>
          ))
        ) : (
          <span className="chip text-xs text-[var(--color-fog-300)]">Skill set in progress</span>
        )}
      </div>
    </article>
  );
}
