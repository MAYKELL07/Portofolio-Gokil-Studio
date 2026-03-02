import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/site-content";
import { createAbsoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...projects.map((project) => `/work/${project.slug}`),
  ].map((path) => ({
    url: createAbsoluteUrl(path),
    lastModified: new Date(),
    changeFrequency:
      path === ""
        ? "weekly"
        : path === "/work"
          ? "weekly"
          : path.includes("/work/")
            ? "monthly"
            : path === "/contact"
              ? "monthly"
              : "yearly",
    priority:
      path === ""
        ? 1
        : path === "/work"
          ? 0.95
          : path === "/contact"
            ? 0.9
            : path.includes("/work/")
              ? 0.85
              : 0.75,
  }));
}
