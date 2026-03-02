import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

function buildMessage(payload: Record<string, unknown>) {
  return [
    "**New portfolio inquiry**",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company / project: ${payload.companyOrProject}`,
    `Budget: ${payload.budgetRange || "Not provided"}`,
    `Timeline: ${payload.timeline || "Not provided"}`,
    `Brief: ${payload.projectBrief}`,
  ].join("\n");
}

async function notifyDiscord(message: string) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) {
    return false;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  });

  if (!response.ok) {
    throw new Error("Discord webhook failed.");
  }

  return true;
}

async function notifySlack(message: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    return false;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  if (!response.ok) {
    throw new Error("Slack webhook failed.");
  }

  return true;
}

function logSubmission(message: string) {
  console.info("[contact_submission]\n" + message);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request payload.",
        errors: {},
      },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many attempts. Please wait a few minutes and try again.",
        errors: {},
      },
      { status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const mappedErrors = Object.fromEntries(
      Object.entries(errors).map(([key, value]) => [key, value?.[0] ?? "Invalid value."]),
    );

    return NextResponse.json(
      {
        success: false,
        message: "Please fix the highlighted fields and try again.",
        errors: mappedErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({
      success: true,
      message: "Thanks. Your inquiry was received.",
      errors: {},
    });
  }

  const message = buildMessage(parsed.data);
  const configuredChannels = [
    Boolean(process.env.DISCORD_WEBHOOK_URL),
    Boolean(process.env.SLACK_WEBHOOK_URL),
  ].filter(Boolean).length;

  try {
    const notificationResults = await Promise.allSettled([
      notifyDiscord(message),
      notifySlack(message),
    ]);
    const deliveredCount = notificationResults.filter(
      (result) => result.status === "fulfilled" && result.value,
    ).length;

    logSubmission(message);

    if (configuredChannels > 0 && deliveredCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Submission failed while notifying the studio. Please email us directly and try again.",
          errors: {},
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Submission failed while notifying the studio. Please email us directly and try again.",
        errors: {},
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Thanks. Your inquiry was received. If it looks like a fit, expect a reply within 24 hours.",
    errors: {},
  });
}
