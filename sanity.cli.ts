import { defineCliConfig } from "sanity/cli";

import { requireSanityConfig } from "./src/sanity/env";

const sanityConfig = requireSanityConfig("sanity.cli.ts");

export default defineCliConfig({
  api: {
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  },
});
