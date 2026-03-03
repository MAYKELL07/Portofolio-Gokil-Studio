import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { requireSanityConfig, sanityStudioTitle } from "./src/sanity/env";
import { schemaTypes, singletonSchemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const sanityConfig = requireSanityConfig("sanity.config.ts");

export default defineConfig({
  name: "default",
  title: sanityStudioTitle,
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonSchemaTypes.has(schemaType)),
  },
});
