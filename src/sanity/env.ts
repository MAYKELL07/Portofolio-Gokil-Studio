export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ?? "2026-03-02";
export const sanityStudioTitle =
  process.env.SANITY_STUDIO_TITLE?.trim() ?? "Game Studio Portfolio CMS";

export const sanityEnabled = Boolean(sanityProjectId && sanityDataset);
