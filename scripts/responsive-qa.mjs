#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const outputRoot = path.join(process.cwd(), ".qa-screenshots");
const NAVIGATION_TIMEOUT = 8_000;

const routes = [
  { slug: "home", path: "/" },
  { slug: "services", path: "/services" },
  { slug: "work", path: "/work" },
  { slug: "about", path: "/about" },
  { slug: "contact", path: "/contact" },
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 900 },
  { name: "wide", width: 1600, height: 900 },
];

function sanitizePathname(value) {
  return value === "/" ? "home" : value.replace(/[\/\\]+/g, "-").replace(/^-+|-+$/g, "");
}

async function ensureBaseUrl() {
  const response = await fetch(baseUrl, { redirect: "manual" }).catch(() => null);
  if (!response) {
    throw new Error(`Could not reach ${baseUrl}. Start the app first or set QA_BASE_URL.`);
  }
}

async function collectPageSignals(page) {
  return page.evaluate(() => {
    function isVisible(element) {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const isScreenReaderOnly =
        element.classList.contains("sr-only") ||
        ((style.clip !== "auto" || style.clipPath !== "none") &&
          rect.width <= 1 &&
          rect.height <= 1);
      return (
        !isScreenReaderOnly &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    }

    function shortText(element) {
      return (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
    }

    const pageHasHorizontalOverflow = Array.from(document.querySelectorAll("body *")).some(
      (element) => {
        if (!isVisible(element)) {
          return false;
        }

        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.position !== "fixed" &&
          (rect.right - window.innerWidth > 6 || rect.left < -6)
        );
      },
    );

    const overflow = pageHasHorizontalOverflow
      ? Array.from(document.querySelectorAll("body *"))
          .filter((element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              isVisible(element) &&
              style.position !== "fixed" &&
              (rect.right - window.innerWidth > 6 || rect.left < -6)
            );
          })
          .slice(0, 8)
          .map((element) => ({
            tag: element.tagName.toLowerCase(),
            text: shortText(element),
          }))
      : [];

    const brokenImages = Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .slice(0, 8)
      .map((image) => image.currentSrc || image.src || image.alt || "image");

    const visibleCtas = Array.from(document.querySelectorAll("a, button"))
      .filter((element) => isVisible(element))
      .map((element) => shortText(element))
      .filter((text) =>
        /start a project|scope a brief|book a call|send inquiry/i.test(text),
      );

    const stickyElements = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const style = window.getComputedStyle(element);
        return isVisible(element) && (style.position === "sticky" || style.position === "fixed");
      })
      .length;

    return {
      title: document.title,
      overflow,
      brokenImages,
      visibleCtas,
      stickyElements,
      hasModelViewer: Boolean(document.querySelector("model-viewer")),
    };
  });
}

async function gotoWithFallback(page, url) {
  try {
    await page.goto(url, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAVIGATION_TIMEOUT });
  }

  await page.waitForTimeout(400);
}

async function main() {
  await ensureBaseUrl();
  await fs.mkdir(outputRoot, { recursive: true });

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const report = [];

  try {
    for (const viewport of viewports) {
      for (const route of routes) {
        const context = await browser.newContext({
          viewport,
          ignoreHTTPSErrors: true,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on("console", (message) => {
          if (message.type() === "error") {
            consoleErrors.push(message.text());
          }
        });
        page.on("pageerror", (error) => {
          pageErrors.push(error.message);
        });

        const url = new URL(route.path, baseUrl).toString();
        await gotoWithFallback(page, url);

        const signals = await collectPageSignals(page);
        const screenshotPath = path.join(
          outputRoot,
          `${sanitizePathname(route.path)}-${viewport.name}.png`,
        );

        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        report.push({
          route: route.path,
          viewport,
          title: signals.title,
          screenshotPath,
          consoleErrors,
          pageErrors,
          overflow: signals.overflow,
          brokenImages: signals.brokenImages,
          visibleCtas: signals.visibleCtas,
          stickyElements: signals.stickyElements,
          hasModelViewer: signals.hasModelViewer,
        });

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outputRoot, "report.json");
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  const criticalFindings = report.filter(
    (entry) =>
      entry.consoleErrors.length > 0 ||
      entry.pageErrors.length > 0 ||
      entry.brokenImages.length > 0 ||
      entry.overflow.length > 0 ||
      entry.visibleCtas.length === 0,
  );

  console.log(`Saved responsive QA report to ${reportPath}`);
  console.log(`Generated ${report.length} screenshots in ${outputRoot}`);

  if (criticalFindings.length > 0) {
    console.log("Responsive QA findings:");
    criticalFindings.forEach((entry) => {
      console.log(
        `- ${entry.route} @ ${entry.viewport.name}: console=${entry.consoleErrors.length}, page=${entry.pageErrors.length}, overflow=${entry.overflow.length}, brokenImages=${entry.brokenImages.length}, ctas=${entry.visibleCtas.length}`,
      );
    });
    process.exitCode = 1;
    return;
  }

  console.log("Responsive QA passed without critical findings.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
