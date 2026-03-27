import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

const NOTIFICATION_TIMEOUT_MS = 8000;

function buildMessage(payload: Record<string, unknown>) {
  return [
    "**New portfolio inquiry**",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Project type: ${payload.projectType}`,
    `Budget: ${payload.budgetRange || "Not provided"}`,
    `Timeline: ${payload.timeline || "Not provided"}`,
    `Goals: ${payload.projectGoals}`,
  ].join("\n");
}

async function notifyDiscord(message: string) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) {
    return false;
  }

  const response = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(NOTIFICATION_TIMEOUT_MS),
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed with ${response.status} ${response.statusText}.`);
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
    signal: AbortSignal.timeout(NOTIFICATION_TIMEOUT_MS),
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed with ${response.status} ${response.statusText}.`);
  }

  return true;
}

function logSubmission(message: string) {
  console.info("[contact_submission]\n" + message);
}

function logNotificationFailure(channel: string, error: unknown) {
  console.error(`[contact_submission] ${channel} notification failed`, error);
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
    {
      name: "discord",
      send: () => notifyDiscord(message),
      enabled: Boolean(process.env.DISCORD_WEBHOOK_URL),
    },
    {
      name: "slack",
      send: () => notifySlack(message),
      enabled: Boolean(process.env.SLACK_WEBHOOK_URL),
    },
  ].filter((channel) => channel.enabled);

  logSubmission(message);

  const notificationResults = await Promise.allSettled(
    configuredChannels.map((channel) => channel.send()),
  );
  const deliveredCount = notificationResults.filter(
    (result) => result.status === "fulfilled" && result.value,
  ).length;

  notificationResults.forEach((result, index) => {
    if (result.status === "rejected") {
      logNotificationFailure(configuredChannels[index]?.name ?? "unknown", result.reason);
    }
  });

  if (configuredChannels.length > 0 && deliveredCount === 0) {
    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks. Your inquiry was received. Notification delivery is delayed, so if your request is urgent please also email us directly.",
        errors: {},
      },
      { status: 202 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Thanks. Your inquiry was received. If it looks like a fit, expect a reply within 24 hours.",
    errors: {},
  });
}
