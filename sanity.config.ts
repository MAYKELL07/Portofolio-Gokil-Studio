import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityDataset, sanityEnabled, sanityProjectId, sanityStudioTitle } from "./src/sanity/env";
import { schemaTypes, singletonSchemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: sanityEnabled ? sanityStudioTitle : `${sanityStudioTitle} (Configure Env)`,
  projectId: sanityProjectId || "replace-me",
  dataset: sanityDataset || "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonSchemaTypes.has(schemaType)),
  },
});
