import type { QueryParams } from "next-sanity";
import { createClient } from "next-sanity";

import {
  logSanityConfigWarning,
  sanityApiVersion,
  sanityApiReadToken,
  sanityDataset,
  sanityEnabled,
  sanityProjectId,
  requireSanityConfig,
} from "@/sanity/env";

type CreateSanityClientOptions = {
  requireConfig?: boolean;
  useCdn?: boolean;
  withReadToken?: boolean;
};

export function createSanityClient(options?: CreateSanityClientOptions) {
  const config = options?.requireConfig
    ? requireSanityConfig("createSanityClient")
    : sanityEnabled
      ? {
          projectId: sanityProjectId,
          dataset: sanityDataset,
          apiVersion: sanityApiVersion,
        }
      : null;

  if (!config) {
    return null;
  }

  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: options?.useCdn ?? true,
    perspective: "published",
    stega: false,
    token: options?.withReadToken ? sanityApiReadToken || undefined : undefined,
  });
}

export const sanityClient = createSanityClient();

export async function safeSanityFetch<T>(
  query: string,
  params?: QueryParams,
): Promise<T | null> {
  if (!sanityClient) {
    logSanityConfigWarning("safeSanityFetch");
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
