import { z } from "zod";

export const budgetOptions = [
  "< $5k",
  "$5k - $15k",
  "$15k - $35k",
  "$35k+",
] as const;

export const timelineOptions = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "3+ months",
] as const;

export const projectTypeOptions = [
  "Full game development",
  "Co-development",
  "Gameplay systems / features",
  "UI / UX implementation",
  "Live ops / updates",
  "Technical support",
] as const;

function optionalEnumFromSelect<T extends readonly [string, ...string[]]>(options: T) {
  return z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.enum(options).optional(),
  );
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  projectType: z.enum(projectTypeOptions, "Please choose the type of project support you need."),
  budgetRange: optionalEnumFromSelect(budgetOptions),
  timeline: optionalEnumFromSelect(timelineOptions),
  projectGoals: z
    .string()
    .trim()
    .min(20, "Share enough detail for us to qualify the brief.")
    .max(2000, "Please keep the brief under 2000 characters."),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
