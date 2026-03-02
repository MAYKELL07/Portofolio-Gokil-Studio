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
  sectionIntroType,
  serviceOverviewType,
  socialLinkType,
} from "./objects";

export const singletonSchemaTypes = new Set(["siteSettings", "homePage"]);

export const schemaTypes = [
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
