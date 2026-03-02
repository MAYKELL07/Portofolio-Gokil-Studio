import { defineArrayMember, defineField, defineType } from "sanity";

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
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === "video",
    }),
    defineField({
      name: "poster",
      title: "Video Poster",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Optional hosted video URL for embeds or previews.",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Short accessibility label for image-based previews.",
      validation: (rule) =>
        rule.max(120).custom((value, context) => {
          const parent = context.parent as
            | {
                type?: "image" | "video";
                image?: unknown;
                poster?: unknown;
              }
            | undefined;
          const hasVisibleMedia =
            (parent?.type === "image" && Boolean(parent.image)) ||
            (parent?.type === "video" && Boolean(parent.poster));

          if (hasVisibleMedia && !String(value ?? "").trim()) {
            return "Add alt text when an image or video poster is shown.";
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "type",
      media: "image",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle === "video" ? "Video media" : "Image media",
        media: selection.media,
      };
    },
  },
});
