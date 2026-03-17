import { normalizeEnvValue, resolveSanityEnvironment } from "@/sanity/env-shared";

const DEFAULT_SANITY_API_VERSION = "2026-03-03";
const DEFAULT_SANITY_STUDIO_TITLE = "Game Studio Portfolio CMS";

const resolvedSanityEnv = resolveSanityEnvironment(process.env);
const sanityConfigMismatchError =
  resolvedSanityEnv.issues.length > 0
    ? `[sanity_config_mismatch] ${resolvedSanityEnv.issues.join(" ")} Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_STUDIO_PROJECT_ID, and SANITY_STUDIO_DATASET to the same Sanity project and dataset.`
    : "";

if (sanityConfigMismatchError) {
  throw new Error(sanityConfigMismatchError);
}

export const sanityProjectId = resolvedSanityEnv.projectId;
export const sanityDataset = resolvedSanityEnv.dataset;
export const sanityApiVersion =
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) ||
  DEFAULT_SANITY_API_VERSION;
export const sanityApiReadToken = normalizeEnvValue(process.env.SANITY_API_READ_TOKEN);
export const sanityStudioTitle =
  normalizeEnvValue(process.env.SANITY_STUDIO_TITLE) || DEFAULT_SANITY_STUDIO_TITLE;

export const sanityEnabled = Boolean(sanityProjectId && sanityDataset);

const SANITY_CONFIG_REQUIREMENTS =
  "Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_STUDIO_PROJECT_ID, and SANITY_STUDIO_DATASET to the same Sanity project and dataset.";
const warnedSanityContexts = new Set<string>();

export function getSanityConfigError() {
  const missingKeys: string[] = [];

  if (!sanityProjectId) {
    missingKeys.push("SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  if (!sanityDataset) {
    missingKeys.push("SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET");
  }

  if (!missingKeys.length) {
    return "";
  }

  return `[sanity_config_missing] Missing ${missingKeys.join(
    " and ",
  )}. ${SANITY_CONFIG_REQUIREMENTS}`;
}

export const sanityConfigError = getSanityConfigError();

export function logSanityConfigWarning(context: string) {
  if (!sanityConfigError || warnedSanityContexts.has(context)) {
    return;
  }

  warnedSanityContexts.add(context);
  console.warn(`${sanityConfigError} Context: ${context}.`);
}

export function requireSanityConfig(context: string) {
  if (sanityConfigError) {
    throw new Error(`${sanityConfigError} Context: ${context}.`);
  }

  return {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
  };
}
