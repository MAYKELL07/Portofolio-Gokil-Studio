import { defineArrayMember, defineField, defineType } from "sanity";

const imageRoleOptions = [
  { title: "Cover", value: "cover" },
  { title: "Gallery", value: "gallery" },
  { title: "Background", value: "background" },
  { title: "Texture", value: "texture" },
  { title: "Portrait", value: "portrait" },
  { title: "Poster", value: "poster" },
  { title: "Logo", value: "logo" },
];

export const richImageType = defineType({
  name: "richImage",
  title: "Rich Image",
  type: "image",
  description:
    "Upload high-quality source imagery only. Prefer clean, well-lit assets with clear subject focus so responsive crops stay premium across desktop and mobile.",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        "Required. Describe what matters in the image in plain language. Mention the visible subject or proof shown, not styling alone. For decorative textures, use a short label such as 'Abstract blue signal texture' only if the image is still exposed to assistive tech.",
      validation: (rule) => rule.required().min(4).max(160),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional. Add only when the image needs context, attribution, or a short proof note. Keep it concise.",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "imageRole",
      title: "Image Role / Type",
      type: "string",
      description:
        "Choose the intended visual job for this asset. Use landscape roles like Cover, Gallery, or Background for wide compositions. Use Portrait when the subject is vertically framed. Use Texture only for decorative atmosphere, not proof.",
      options: {
        list: imageRoleOptions,
      },
      initialValue: "gallery",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focalIntent",
      title: "Focal Intent",
      type: "string",
      description:
        "Optional editor note describing what must stay in frame, such as 'keep character face centered' or 'UI stats top-right'. This helps future editors set hotspot correctly for responsive crops.",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "credit",
      title: "Credit / Source",
      type: "string",
      description:
        "Optional source, photographer, renderer, stock source, or internal asset note.",
      validation: (rule) => rule.max(180),
    }),
  ],
});

export const linkItemType = defineType({
  name: "linkItem",
  title: "Link Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      description: "Use internal paths like /contact or full external URLs.",
      validation: (rule) => rule.required().min(1).max(240),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});

export const socialLinkType = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: "href",
      title: "Profile URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});

export const metricItemType = defineType({
  name: "metricItem",
  title: "Metric Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required().min(1).max(120),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});

export const ctaSettingsType = defineType({
  name: "ctaSettings",
  title: "CTA Settings",
  type: "object",
  fields: [
    defineField({
      name: "primaryLabel",
      title: "Primary Label",
      type: "string",
      initialValue: "Start a similar project",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "primaryHref",
      title: "Primary Href",
      type: "string",
      initialValue: "/contact",
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary Label",
      type: "string",
      initialValue: "Review services",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "secondaryHref",
      title: "Secondary Href",
      type: "string",
      initialValue: "/services",
      validation: (rule) => rule.max(240),
    }),
  ],
});

export const outcomeCardType = defineType({
  name: "outcomeCard",
  title: "Outcome Card",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.required().min(2).max(30),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(8).max(100),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(220),
    }),
    defineField({
      name: "label",
      title: "CTA Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: "href",
      title: "CTA Href",
      type: "string",
      description: "Use an internal path or anchor target.",
      validation: (rule) => rule.required().min(1).max(240),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
  },
});

export const buyerTypeType = defineType({
  name: "buyerType",
  title: "Buyer Type",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(240),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
  },
});

export const processStepType = defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(16).max(240),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
  },
});

export const serviceOverviewType = defineType({
  name: "serviceOverview",
  title: "Service Overview",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
  ],
});

export const sectionIntroType = defineType({
  name: "sectionIntro",
  title: "Section Intro",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(320),
    }),
  ],
});

export const projectMetricType = defineType({
  name: "projectMetric",
  title: "Project Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required().min(1).max(120),
    }),
    defineField({
      name: "accent",
      title: "Accent",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Lime", value: "lime" },
          { title: "Amber", value: "amber" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});

export const projectMediaType = defineType({
  name: "projectMedia",
  title: "Project Media",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "richImage",
      description:
        "Use for stills, UI captures, renders, or gallery frames. Recommended: 1600 to 2400px wide, under 800 KB when possible. Use landscape for environments and UI walkthroughs, portrait only when the subject is vertically composed.",
      hidden: ({ parent }) => parent?.type === "video",
    }),
    defineField({
      name: "poster",
      title: "Video Poster",
      type: "richImage",
      description:
        "Optional poster used for video previews and thumbnails. Recommended: 1600px+ wide, under 500 KB. Set hotspot on the key visual area because this image may crop differently in cards and gallery layouts.",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Optional hosted video URL for embeds or previews.",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "type",
      media: "image",
    },
  },
});
