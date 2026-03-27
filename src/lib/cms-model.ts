export type FieldType =
  | "string"
  | "text"
  | "number"
  | "boolean"
  | "enum"
  | "image"
  | "video"
  | "richText"
  | "array"
  | "object"
  | "reference";

export type ContentField = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  description?: string;
  options?: string[];
};

export type ContentCollection = {
  name: string;
  slug: string;
  description: string;
  fields: ContentField[];
};

export const cmsCollections: ContentCollection[] = [
  {
    name: "Site Settings",
    slug: "siteSettings",
    description:
      "Global brand, contact, navigation, footer, response SLA, and analytics settings.",
    fields: [
      {
        key: "studioName",
        label: "Studio Name",
        type: "string",
        required: true,
        description: "Replace the visible [Studio Name] placeholder used across the site.",
      },
      {
        key: "tagline",
        label: "Tagline",
        type: "string",
        required: true,
        description: "Short positioning line. Keep it game-production specific.",
      },
      {
        key: "primaryEmail",
        label: "Primary Email",
        type: "string",
        required: true,
        description: "Replace the visible [Contact Email] placeholder used in CTAs and forms.",
      },
      { key: "timezone", label: "Timezone", type: "string", required: true },
      { key: "socialLinks", label: "Social Links", type: "array", required: true },
      {
        key: "heroMetrics",
        label: "Hero Metrics",
        type: "array",
        required: true,
        description: "Replace placeholder proof metrics shown in the hero.",
      },
    ],
  },
  {
    name: "Home Page",
    slug: "homePage",
    description:
      "Homepage section copy and layout-driven content blocks that can be updated without code changes.",
    fields: [
      {
        key: "heroBackgroundImage",
        label: "Hero Background Image",
        type: "image",
        description: "Homepage hero image. This is separate from the hero text fields stored in Site Settings.",
      },
      {
        key: "scrollStory",
        label: "Scroll Story",
        type: "object",
        description: "Dedicated homepage scroll-story section with managed chapter copy, proof points, CTAs, and optional media.",
      },
      {
        key: "outcomeCards",
        label: "Outcome Cards",
        type: "array",
        description: "The quick-path cards directly under the homepage hero.",
      },
      {
        key: "buyerTypes",
        label: "Buyer Types",
        type: "array",
        description: "Audience-fit cards for the homepage services / trust band.",
      },
      {
        key: "serviceOverview",
        label: "Service Overview",
        type: "object",
        description: "Intro copy and bullet points for the homepage services overview section.",
      },
      {
        key: "resultsSection",
        label: "Results Section",
        type: "object",
        description: "Homepage results heading and supporting metrics.",
      },
      {
        key: "processSteps",
        label: "Process Steps",
        type: "array",
        description: "Homepage process summary cards.",
      },
      {
        key: "studioSection",
        label: "Studio Section",
        type: "object",
        description: "Homepage studio credibility heading and supporting copy.",
      },
      {
        key: "faqSection",
        label: "FAQ Section",
        type: "object",
        description: "Homepage FAQ intro copy.",
      },
      {
        key: "finalCta",
        label: "Final CTA",
        type: "object",
        description: "Homepage closing CTA copy and button settings.",
      },
    ],
  },
  {
    name: "Projects",
    slug: "projects",
    description:
      "Portfolio case studies used for the home feature rail, work grid, and dynamic project detail pages.",
    fields: [
      { key: "slug", label: "Slug", type: "string", required: true },
      {
        key: "title",
        label: "Title",
        type: "string",
        required: true,
        description: "Project title placeholder. Replace with the real case study name.",
      },
      {
        key: "clientName",
        label: "Client Name",
        type: "string",
        description: "Replace the visible [Client Name] placeholder.",
      },
      {
        key: "projectType",
        label: "Project Type",
        type: "enum",
        required: true,
        options: [
          "Full Game",
          "UGC Experience",
          "Brand Activation",
          "System / Feature",
          "UI / UX",
          "Live Ops",
        ],
      },
      { key: "platform", label: "Platform", type: "enum", required: true, options: ["Roblox"] },
      { key: "genreTags", label: "Genre Tags", type: "array", required: true },
      { key: "serviceTags", label: "Service Tags", type: "array", required: true },
      { key: "year", label: "Year", type: "number", required: true },
      { key: "featured", label: "Featured", type: "boolean", required: true },
      { key: "summary", label: "Summary", type: "text", required: true },
      {
        key: "challenge",
        label: "Challenge",
        type: "richText",
        description: "Optional for confidential work. The template falls back cleanly when omitted.",
      },
      {
        key: "goals",
        label: "Goals",
        type: "array",
        description: "Short success criteria used in the project detail template.",
      },
      {
        key: "solution",
        label: "Solution",
        type: "richText",
        description: "Optional narrative block for what changed and what shipped.",
      },
      { key: "gameplayFeatures", label: "Gameplay Features", type: "array", required: true },
      {
        key: "productionProcess",
        label: "Production Process",
        type: "array",
        required: true,
      },
      {
        key: "resultsMetrics",
        label: "Results Metrics",
        type: "array",
        description:
          "Optional public outcomes. Leave empty for limited-disclosure projects and the template will show a fallback.",
      },
      {
        key: "galleryMedia",
        label: "Gallery Media",
        type: "array",
        description: "Supports image and video entries. Can be left empty for confidential work.",
      },
      {
        key: "confidentialityNote",
        label: "Confidentiality Note",
        type: "text",
        description: "Optional NDA-safe explanation shown when media or metrics are withheld.",
      },
      { key: "testimonial", label: "Testimonial", type: "reference" },
      {
        key: "cta",
        label: "CTA Settings",
        type: "object",
        description: "Optional custom CTA labels and hrefs for project detail pages.",
      },
      { key: "seo", label: "SEO", type: "object", required: true },
    ],
  },
  {
    name: "Services",
    slug: "services",
    description: "Offer packaging, deliverables, and timeline guidance for conversion pages.",
    fields: [
      { key: "slug", label: "Slug", type: "string", required: true },
      {
        key: "category",
        label: "Category",
        type: "enum",
        required: true,
        options: [
          "Game Development",
          "Live Ops / Content",
          "Branded Experiences",
          "Systems / UX",
          "Technical Support",
        ],
      },
      { key: "title", label: "Title", type: "string", required: true },
      { key: "summary", label: "Summary", type: "text", required: true },
      {
        key: "outcomes",
        label: "Outcomes",
        type: "array",
        required: true,
        description: "Short result-focused bullets that reduce buyer uncertainty.",
      },
      { key: "deliverables", label: "Deliverables", type: "array", required: true },
      { key: "timeline", label: "Timeline", type: "string", required: true },
      {
        key: "engagementModel",
        label: "Engagement Model",
        type: "text",
        required: true,
        description: "How this service is typically scoped and bought.",
      },
      { key: "idealFor", label: "Ideal For", type: "text", required: true },
      {
        key: "inquiryLabel",
        label: "Inquiry CTA Label",
        type: "string",
        description: "Optional per-service CTA label used on the Services page.",
      },
    ],
  },
  {
    name: "Team Members",
    slug: "teamMembers",
    description: "Profiles powering the about page and trust-building modules.",
    fields: [
      { key: "name", label: "Name", type: "string", required: true },
      { key: "role", label: "Role", type: "string", required: true },
      { key: "bio", label: "Bio", type: "text", required: true },
      { key: "skills", label: "Skills", type: "array", required: true },
      { key: "socialLinks", label: "Social Links", type: "array" },
    ],
  },
  {
    name: "Testimonials",
    slug: "testimonials",
    description: "Quote blocks reusable across home, project, and services pages.",
    fields: [
      {
        key: "quote",
        label: "Quote",
        type: "text",
        required: true,
        description: "Replace the visible [Testimonial Quote] placeholder.",
      },
      {
        key: "name",
        label: "Name",
        type: "string",
        required: true,
        description: "Replace the visible [Client Name] placeholder for the testimonial source.",
      },
      {
        key: "company",
        label: "Company",
        type: "string",
        required: true,
        description: "Replace the visible [Client Company] placeholder.",
      },
      { key: "role", label: "Role", type: "string", required: true },
      { key: "rating", label: "Rating", type: "number" },
    ],
  },
  {
    name: "FAQ",
    slug: "faqItems",
    description: "Reusable FAQ content for home, services, and contact surfaces.",
    fields: [
      { key: "question", label: "Question", type: "string", required: true },
      { key: "answer", label: "Answer", type: "text", required: true },
      { key: "category", label: "Category", type: "enum", options: ["General", "Process", "Contact"] },
    ],
  },
];
