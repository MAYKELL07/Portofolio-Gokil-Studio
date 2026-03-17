import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { SANITY_CACHE_TAGS, getProjectCacheTag } from "@/sanity/lib/tags";

type WebhookPayload = {
  _id?: string;
  _type?: string;
  slug?: string | { current?: string };
  previousSlug?: string | { current?: string };
  path?: string;
  previousPath?: string;
  operation?: "create" | "update" | "delete";
};

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET?.trim() || "";

function readSlug(value: WebhookPayload["slug"]) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object" && typeof value.current === "string") {
    return value.current.trim();
  }

  return "";
}

function addPath(paths: Set<string>, path?: string) {
  const normalizedPath = typeof path === "string" ? path.trim() : "";

  if (normalizedPath) {
    paths.add(normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`);
  }
}

function addProjectPath(paths: Set<string>, slug?: string) {
  if (slug) {
    paths.add(`/work/${slug}`);
  }
}

function addTag(tags: Set<string>, tag?: string) {
  if (tag) {
    tags.add(tag);
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET environment variable." },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature.", body },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Missing `_type` in webhook payload.", body },
        { status: 400 },
      );
    }

    const slug = readSlug(body.slug);
    const previousSlug = readSlug(body.previousSlug);
    const tags = new Set<string>();
    const paths = new Set<string>();

    switch (body._type) {
      case "siteSettings":
        addTag(tags, SANITY_CACHE_TAGS.siteSettings);
        addPath(paths, "/");
        addPath(paths, "/about");
        addPath(paths, "/contact");
        addPath(paths, "/services");
        addPath(paths, "/work");
        revalidatePath("/", "layout");
        break;
      case "homePage":
        addTag(tags, SANITY_CACHE_TAGS.homePage);
        addPath(paths, "/");
        break;
      case "project":
        addTag(tags, SANITY_CACHE_TAGS.projects);
        addTag(tags, slug ? getProjectCacheTag(slug) : undefined);
        addTag(tags, previousSlug ? getProjectCacheTag(previousSlug) : undefined);
        addPath(paths, "/");
        addPath(paths, "/about");
        addPath(paths, "/work");
        addPath(paths, "/work/[slug]");
        addProjectPath(paths, slug);
        addProjectPath(paths, previousSlug);
        break;
      case "service":
        addTag(tags, SANITY_CACHE_TAGS.services);
        addPath(paths, "/");
        addPath(paths, "/about");
        addPath(paths, "/services");
        break;
      case "teamMember":
        addTag(tags, SANITY_CACHE_TAGS.team);
        addPath(paths, "/");
        addPath(paths, "/about");
        break;
      case "testimonial":
        addTag(tags, SANITY_CACHE_TAGS.testimonials);
        addPath(paths, "/");
        addPath(paths, "/work/[slug]");
        break;
      case "faqItem":
        addTag(tags, SANITY_CACHE_TAGS.faq);
        addPath(paths, "/");
        addPath(paths, "/contact");
        addPath(paths, "/services");
        break;
      default:
        return NextResponse.json(
          {
            message: `No revalidation mapping defined for document type "${body._type}".`,
            body,
          },
          { status: 202 },
        );
    }

    addPath(paths, body.path);
    addPath(paths, body.previousPath);

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    for (const path of paths) {
      if (path === "/work/[slug]") {
        revalidatePath(path, "page");
      } else {
        revalidatePath(path);
      }
    }

    return NextResponse.json({
      revalidated: true,
      operation: body.operation ?? null,
      type: body._type,
      tags: Array.from(tags),
      paths: Array.from(paths),
    });
  } catch (error) {
    console.error("[sanity_revalidate_failed]", error);

    const message =
      error instanceof Error ? error.message : "Unknown Sanity revalidation error.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
