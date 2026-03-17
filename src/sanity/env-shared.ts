export function normalizeEnvValue(value?: string) {
  return value?.trim() || "";
}

export function normalizeStudioHost(value?: string) {
  return normalizeEnvValue(value)
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .replace(/\.sanity\.studio$/i, "")
    .toLowerCase();
}

export type ResolvedSanityEnv = {
  publicProjectId: string;
  publicDataset: string;
  studioProjectId: string;
  studioDataset: string;
  projectId: string;
  dataset: string;
  issues: string[];
};

export function resolveSanityEnvironment(env: NodeJS.ProcessEnv): ResolvedSanityEnv {
  const publicProjectId = normalizeEnvValue(env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const publicDataset = normalizeEnvValue(env.NEXT_PUBLIC_SANITY_DATASET);
  const studioProjectId = normalizeEnvValue(env.SANITY_STUDIO_PROJECT_ID);
  const studioDataset = normalizeEnvValue(env.SANITY_STUDIO_DATASET);
  const issues: string[] = [];

  if (!studioProjectId && publicProjectId) {
    issues.push("Missing SANITY_STUDIO_PROJECT_ID.");
  }

  if (!studioDataset && publicDataset) {
    issues.push("Missing SANITY_STUDIO_DATASET.");
  }

  if (!publicProjectId && studioProjectId) {
    issues.push("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  }

  if (!publicDataset && studioDataset) {
    issues.push("Missing NEXT_PUBLIC_SANITY_DATASET.");
  }

  if (studioProjectId && publicProjectId && studioProjectId !== publicProjectId) {
    issues.push(
      `SANITY_STUDIO_PROJECT_ID (${studioProjectId}) does not match NEXT_PUBLIC_SANITY_PROJECT_ID (${publicProjectId}).`,
    );
  }

  if (studioDataset && publicDataset && studioDataset !== publicDataset) {
    issues.push(
      `SANITY_STUDIO_DATASET (${studioDataset}) does not match NEXT_PUBLIC_SANITY_DATASET (${publicDataset}).`,
    );
  }

  return {
    publicProjectId,
    publicDataset,
    studioProjectId,
    studioDataset,
    projectId: studioProjectId || publicProjectId,
    dataset: studioDataset || publicDataset,
    issues,
  };
}
