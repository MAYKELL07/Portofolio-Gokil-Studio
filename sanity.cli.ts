import { defineCliConfig } from "sanity/cli";

import "./src/sanity/load-env";
import {
  normalizeEnvValue,
  normalizeStudioHost,
  resolveSanityEnvironment,
} from "./src/sanity/env-shared";

const resolvedSanityEnv = resolveSanityEnvironment(process.env);
const projectId = resolvedSanityEnv.projectId;
const dataset = resolvedSanityEnv.dataset;
const studioHost = normalizeStudioHost(process.env.SANITY_STUDIO_HOSTNAME);
const studioAppId = normalizeEnvValue(process.env.SANITY_STUDIO_APP_ID);

if (!projectId || !dataset) {
  throw new Error(
    "[sanity_config_missing] Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET. Context: sanity.cli.ts.",
  );
}

if (resolvedSanityEnv.issues.length > 0) {
  throw new Error(
    `[sanity_config_mismatch] ${resolvedSanityEnv.issues.join(" ")} Context: sanity.cli.ts.`,
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  ...(studioHost ? { studioHost } : {}),
  ...(studioAppId ? { deployment: { appId: studioAppId } } : {}),
});
