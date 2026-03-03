import { defineCliConfig } from "sanity/cli";

function normalizeEnvValue(value?: string) {
  return value?.trim() || "";
}

const projectId =
  normalizeEnvValue(process.env.SANITY_STUDIO_PROJECT_ID) ||
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
const dataset =
  normalizeEnvValue(process.env.SANITY_STUDIO_DATASET) ||
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET);

if (!projectId || !dataset) {
  throw new Error(
    "[sanity_config_missing] Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET. Context: sanity.cli.ts.",
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
