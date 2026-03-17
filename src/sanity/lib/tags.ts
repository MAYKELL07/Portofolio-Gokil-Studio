export const SANITY_CACHE_TAGS = {
  siteSettings: "sanity:siteSettings",
  homePage: "sanity:homePage",
  projects: "sanity:projects",
  services: "sanity:services",
  team: "sanity:team",
  testimonials: "sanity:testimonials",
  faq: "sanity:faq",
} as const;

export function getProjectCacheTag(slug: string) {
  return `sanity:project:${slug}`;
}
