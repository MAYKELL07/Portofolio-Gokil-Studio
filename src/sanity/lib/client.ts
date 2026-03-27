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

type SafeSanityFetchOptions = {
  tags?: string[];
  revalidate?: number;
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
const sanityServerClient = createSanityClient({ useCdn: false });

export async function safeSanityFetch<T>(
  query: string,
  params?: QueryParams,
  options?: SafeSanityFetchOptions,
): Promise<T | null> {
  if (!sanityServerClient) {
    logSanityConfigWarning("safeSanityFetch");
    return null;
  }

  const tags = Array.from(
    new Set(
      (options?.tags ?? [])
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
  const revalidate = options?.revalidate ?? 60;

  try {
    return await sanityServerClient.fetch<T>(
      query,
      params ?? {},
      {
        next: {
          revalidate,
          ...(tags.length > 0 ? { tags } : {}),
        },
      },
    );
  } catch (error) {
    console.error("[sanity_fetch_failed]", error);
    return null;
  }
}
