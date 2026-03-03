import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes, singletonSchemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

function normalizeEnvValue(value?: string) {
  return value?.trim() || "";
}

const projectId =
  normalizeEnvValue(process.env.SANITY_STUDIO_PROJECT_ID) ||
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
const dataset =
  normalizeEnvValue(process.env.SANITY_STUDIO_DATASET) ||
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET);
const title =
  normalizeEnvValue(process.env.SANITY_STUDIO_TITLE) || "Game Studio Portfolio CMS";

if (!projectId || !dataset) {
  throw new Error(
    "[sanity_config_missing] Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET. Context: sanity.config.ts.",
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
