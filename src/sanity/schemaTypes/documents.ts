import { defineArrayMember, defineField, defineType } from "sanity";

const heroImageGuidance =
  "Use a premium, atmospheric landscape image for the homepage hero. Recommended: 2400x1350 or larger (16:9), ideally under 1.2 MB. Use this for mood and brand tone, not dense proof details. Keep the main focal area off the edges and set hotspot around the subject that must survive mobile crops.";

const projectCoverGuidance =
  "Primary project proof image for cards and case-study hero fallback. Recommended: 1600x900 to 2400x1350 (16:9), ideally under 900 KB. Use a landscape asset that communicates outcome fast. Prefer gameplay, UI, or a strong branded scene over decorative artwork.";

const serviceImageGuidance =
  "Optional supporting image for service cards or section accents. Recommended: 1200x900 (4:3) or 1600x900 (16:9), ideally under 700 KB. Use clean proof or directional mood imagery, not noisy backgrounds that compete with copy.";

const portraitGuidance =
  "Use a clean portrait or logo lockup with strong subject separation. Recommended: 1200x1500 (4:5) or 1080x1350, ideally under 500 KB. Use portrait orientation when the subject is a person, speaker, or brand mark that reads best vertically.";

const shareImageGuidance =
  "Used for metadata and link previews. Recommended: 1200x630 (social share ratio), ideally under 500 KB. Keep text minimal, high contrast, and safely inset from edges.";

const scrollStoryMediaGuidance =
  "Optional chapter media shown in the homepage scroll-story. Use one strong proof image per chapter when it adds context; leave empty to fall back to the default story visual. Recommended: 1600x900 or larger, ideally under 900 KB.";

function validateSingleParagraph(value: unknown) {
  if (typeof value !== "string") {
    return true;
  }

  const segments = value
    .split(/\r?\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  return segments.length <= 1
    ? true
    : "Keep this to one paragraph. Move extra detail into proof points.";
}

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      description: "Primary brand label shown in the header, footer, and metadata.",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Concise positioning line used for trust and SEO surfaces.",
      validation: (rule) => rule.required().min(12).max(180),
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (rule) => rule.required().min(12).max(160),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(30).max(320),
    }),
    defineField({
      name: "primaryEmail",
      title: "Primary Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "studioLogo",
      title: "Studio Logo",
      type: "richImage",
      description:
        "Optional brand mark for future header, share image, or presentation use. Recommended: square or transparent PNG/SVG-friendly artwork at 800x800 minimum. Keep file size lean and use a clean silhouette that reads on dark backgrounds.",
    }),
    defineField({
      name: "defaultShareImage",
      title: "Default Share Image",
      type: "richImage",
      description: shareImageGuidance,
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      initialValue: "UTC+8",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "responseSla",
      title: "Response SLA",
      type: "string",
      initialValue: "Replies within 24 hours",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "proofChips",
      title: "Hero Proof Chips",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "heroMetrics",
      title: "Hero Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metricItem" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "navLinks",
      title: "Primary Navigation",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
      validation: (rule) => rule.max(6),
      initialValue: [
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "richImage",
      description: heroImageGuidance,
    }),
    defineField({
      name: "scrollStory",
      title: "Scroll Story",
      type: "object",
      description:
        "Dedicated long-scroll chapter content for the homepage. Keep each chapter focused on one message with optional proof bullets.",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Section Eyebrow",
          type: "string",
          validation: (rule) => rule.required().min(2).max(60),
        }),
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          validation: (rule) => rule.required().min(12).max(160),
        }),
        defineField({
          name: "intro",
          title: "Section Intro",
          type: "text",
          rows: 3,
          description: "One short paragraph that introduces the chapter sequence.",
          validation: (rule) =>
            rule.required().min(20).max(240).custom((value) => validateSingleParagraph(value)),
        }),
        defineField({
          name: "chapters",
          title: "Chapters",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "eyebrow",
                  title: "Eyebrow",
                  type: "string",
                  validation: (rule) => rule.required().min(2).max(40),
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().min(8).max(140),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 4,
                  description:
                    "Keep this to one paragraph or one clear step. Put supporting proof into the optional proof points field.",
                  validation: (rule) =>
                    rule.required().min(20).max(320).custom((value) => validateSingleParagraph(value)),
                }),
                defineField({
                  name: "proofPoints",
                  title: "Proof Points",
                  type: "array",
                  description: "Optional supporting bullets for metrics, examples, or proof.",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (rule) => rule.max(4),
                }),
                defineField({
                  name: "ctaLabel",
                  title: "CTA Label",
                  type: "string",
                  validation: (rule) => rule.required().min(2).max(40),
                }),
                defineField({
                  name: "ctaHref",
                  title: "CTA Href",
                  type: "string",
                  description: "Use an internal path, anchor target, or full URL.",
                  validation: (rule) => rule.required().min(1).max(240),
                }),
                defineField({
                  name: "media",
                  title: "Chapter Media",
                  type: "richImage",
                  description: scrollStoryMediaGuidance,
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "eyebrow",
                  media: "media",
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "outcomeCards",
      title: "Outcome Cards",
      type: "array",
      description: "The three quick-path cards directly below the homepage hero.",
      of: [defineArrayMember({ type: "outcomeCard" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "buyerTypes",
      title: "Buyer Types",
      type: "array",
      description: "Short cards describing who the studio is built for.",
      of: [defineArrayMember({ type: "buyerType" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "serviceOverview",
      title: "Service Overview Section",
      type: "serviceOverview",
    }),
    defineField({
      name: "resultsSection",
      title: "Results Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [defineArrayMember({ type: "metricItem" })],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "studioSection",
      title: "Studio Credibility Section",
      type: "sectionIntro",
    }),
    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "sectionIntro",
    }),
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "primaryLabel",
          title: "Primary Label",
          type: "string",
          initialValue: "Send Brief",
        }),
        defineField({
          name: "primaryHref",
          title: "Primary Href",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "secondaryLabel",
          title: "Secondary Label",
          type: "string",
          initialValue: "View Services",
        }),
        defineField({
          name: "secondaryHref",
          title: "Secondary Href",
          type: "string",
          initialValue: "/services",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(4).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Optional. Leave blank if the client should stay confidential.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          "Full Game",
          "UGC Experience",
          "Brand Activation",
          "System / Feature",
          "UI / UX",
          "Live Ops",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: ["Roblox"] },
      initialValue: "Roblox",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "genreTags",
      title: "Genre Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "serviceTags",
      title: "Service Tags",
      type: "array",
      description: "Used for portfolio filters and delivery role context.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      initialValue: new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "richImage",
      description: projectCoverGuidance,
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Short top-line result or capability statement.",
      validation: (rule) => rule.required().min(12).max(140),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20).max(320),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
      description: "Optional for confidential work.",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "goals",
      title: "Goals",
      type: "array",
      description: "Short success criteria the project was built around.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      description: "Short buyer-facing result statements. Keep concise and proof-oriented.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 5,
      description: "What changed, what was built, and why it mattered.",
      validation: (rule) => rule.max(800),
    }),
    defineField({
      name: "gameplayFeatures",
      title: "Feature Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "productionProcess",
      title: "Production Process",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "resultsMetrics",
      title: "Results Metrics",
      type: "array",
      description: "Leave empty if public metrics should stay private.",
      of: [defineArrayMember({ type: "projectMetric" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "galleryMedia",
      title: "Gallery Images and Video",
      type: "array",
      description:
        "Add image entries for gallery stills and optional video entries with a hosted URL plus poster image. Mix wide proof images with occasional portrait frames for visual rhythm. Recommended stills: 1600 to 2400px on the long edge, usually under 800 KB. Leave empty for confidential work.",
      of: [defineArrayMember({ type: "projectMedia" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "confidentialityNote",
      title: "Confidentiality Note",
      type: "text",
      rows: 3,
      description: "Shown when metrics or media are intentionally limited.",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "palette",
      title: "Palette",
      type: "array",
      description: "Three hex colors used for card and case-study gradients.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) =>
        rule
          .length(3)
          .custom((value) =>
            Array.isArray(value) && value.every((entry) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(entry)))
              ? true
              : "Add exactly three hex colors.",
          ),
      initialValue: ["#4cc9ff", "#101726", "#0b0f16"],
    }),
    defineField({
      name: "testimonial",
      title: "Linked Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      description: "Optional quote shown on the project detail page.",
    }),
    defineField({
      name: "cta",
      title: "CTA Settings",
      type: "ctaSettings",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
          validation: (rule) => rule.required().max(70),
        }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "projectType",
      media: "coverImage",
    },
  },
});

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(4).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Game Development",
          "Live Ops / Content",
          "Branded Experiences",
          "Systems / UX",
          "Technical Support",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20).max(320),
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      description: "Short buyer-facing results this service is meant to support.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "timeline",
      title: "Typical Timeline",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "engagementModel",
      title: "Engagement Model",
      type: "text",
      rows: 3,
      description: "How buyers usually engage this service.",
      validation: (rule) => rule.required().min(16).max(320),
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(16).max(320),
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "inquiryLabel",
      title: "Inquiry CTA Label",
      type: "string",
      initialValue: "Start this conversation",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "richImage",
      description: serviceImageGuidance,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "featuredImage",
    },
  },
});

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required().min(8).max(140),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(16).max(500),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["General", "Process", "Contact"],
      },
      validation: (rule) => rule.required(),
      initialValue: "General",
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.integer().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(12).max(500),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "richImage",
      description:
        "Optional headshot or logo lockup for quote presentation. Use a portrait asset when featuring a person; use a clean square or vertical logo lockup when the brand should carry the trust signal. " +
        portraitGuidance,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "portrait",
    },
  },
});

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20).max(500),
    }),
    defineField({
      name: "focus",
      title: "Trust Signal",
      type: "text",
      rows: 3,
      description: "Short line describing the delivery value this person adds.",
      validation: (rule) => rule.required().min(12).max(240),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "richImage",
      description:
        "Optional profile image. Leave empty if the team profile is text-only. " +
        portraitGuidance +
        " Set hotspot on the eyes or face so tight crops still feel intentional on smaller cards.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "portrait",
    },
  },
});
