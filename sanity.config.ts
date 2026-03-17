import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { resolveSanityEnvironment, normalizeEnvValue } from "./src/sanity/env-shared";
import { schemaTypes, singletonSchemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const resolvedSanityEnv = resolveSanityEnvironment(process.env);
const projectId = resolvedSanityEnv.projectId;
const dataset = resolvedSanityEnv.dataset;
const title =
  normalizeEnvValue(process.env.SANITY_STUDIO_TITLE) || "Game Studio Portfolio CMS";

if (!projectId || !dataset) {
  throw new Error(
    "[sanity_config_missing] Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET. Context: sanity.config.ts.",
  );
}

if (resolvedSanityEnv.issues.length > 0) {
  throw new Error(
    `[sanity_config_mismatch] ${resolvedSanityEnv.issues.join(" ")} Context: sanity.config.ts.`,
  );
}

export default defineConfig({
  name: "default",
  title,
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonSchemaTypes.has(schemaType)),
  },
});
