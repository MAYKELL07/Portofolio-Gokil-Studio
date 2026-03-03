import {
  faqItemType,
  homePageType,
  projectType,
  serviceType,
  siteSettingsType,
  teamMemberType,
  testimonialType,
} from "./documents";
import {
  buyerTypeType,
  ctaSettingsType,
  linkItemType,
  metricItemType,
  outcomeCardType,
  processStepType,
  projectMediaType,
  projectMetricType,
  richImageType,
  sectionIntroType,
  serviceOverviewType,
  socialLinkType,
} from "./objects";

export const singletonSchemaTypes = new Set(["siteSettings", "homePage"]);

export const schemaTypes = [
  richImageType,
  linkItemType,
  socialLinkType,
  metricItemType,
  ctaSettingsType,
  outcomeCardType,
  buyerTypeType,
  processStepType,
  serviceOverviewType,
  sectionIntroType,
  projectMetricType,
  projectMediaType,
  siteSettingsType,
  homePageType,
  projectType,
  serviceType,
  faqItemType,
  testimonialType,
  teamMemberType,
];
