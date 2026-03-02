import type { QueryParams } from "next-sanity";
import { createClient } from "next-sanity";

import {
  sanityApiVersion,
  sanityDataset,
  sanityEnabled,
  sanityProjectId,
} from "@/sanity/env";

const fallbackProjectId = sanityProjectId || "replace-me";
const fallbackDataset = sanityDataset || "production";

export const sanityClient = createClient({
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
});

export async function safeSanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T | null> {
  if (!sanityEnabled) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params ?? {}, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("[sanity_fetch_failed]", error);
    return null;
  }
}
