#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const cwd = process.cwd();
const sessionRoot = path.join(cwd, ".agent-browser");
const NAVIGATION_TIMEOUT = 20_000;

function printUsage() {
  console.log(`Usage:
  agent-browser open <url> [--session <name>] [--viewport <width>x<height>] [--headed]
  agent-browser wait [--load networkidle|load|domcontentloaded] [--session <name>]
  agent-browser get title|url [--session <name>]
  agent-browser screenshot [file] [--full] [--session <name>] [--viewport <width>x<height>]
  agent-browser snapshot -i [--session <name>]
  agent-browser click <@ref> [--session <name>]
  agent-browser fill <@ref> <text> [--session <name>]
  agent-browser press <key> [--session <name>]`);
}

function parseViewport(value) {
  if (!value) {
    return { width: 1280, height: 800 };
  }

  const match = /^(\d+)x(\d+)$/i.exec(value);
  if (!match) {
    throw new Error(`Invalid viewport "${value}". Use WIDTHxHEIGHT, for example 390x844.`);
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function parseArgs(argv) {
  const positionals = [];
  const options = {
    session: "default",
    headed: false,
    full: false,
    interactive: false,
    load: "networkidle",
    viewport: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--session") {
      options.session = argv[i + 1] || "default";
      i += 1;
      continue;
    }
    if (arg === "--viewport") {
      options.viewport = argv[i + 1] || null;
      i += 1;
      continue;
    }
    if (arg === "--headed") {
      options.headed = true;
      continue;
    }
    if (arg === "--full") {
      options.full = true;
      continue;
    }
    if (arg === "--load") {
      options.load = argv[i + 1] || "networkidle";
      i += 1;
      continue;
    }
    if (arg === "-i") {
      options.interactive = true;
      continue;
    }
    positionals.push(arg);
  }

  return { positionals, options };
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

function getSessionPaths(sessionName) {
  const safeName = sessionName.replace(/[^a-z0-9_-]/gi, "-");
  return {
    dir: path.join(sessionRoot, safeName),
    file: path.join(sessionRoot, safeName, "session.json"),
  };
}

async function loadSession(sessionName) {
  const { file } = getSessionPaths(sessionName);
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return {
      sessionName,
      url: null,
      refs: {},
      viewport: { width: 1280, height: 800 },
    };
  }
}

async function saveSession(sessionName, session) {
  const { dir, file } = getSessionPaths(sessionName);
  await ensureDir(dir);
  await fs.writeFile(file, JSON.stringify(session, null, 2));
}

async function withPage(session, options, callback) {
  const browser = await chromium.launch({
    headless: !options.headed,
    channel: "msedge",
  });

  const viewport = parseViewport(options.viewport || null);
  const context = await browser.newContext({
    viewport,
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    return await callback({ browser, context, page, viewport });
  } finally {
    await context.close();
    await browser.close();
  }
}

async function gotoWithFallback(page, url, waitUntil) {
  try {
    await page.goto(url, {
      waitUntil,
      timeout: NAVIGATION_TIMEOUT,
    });
  } catch (error) {
    if (waitUntil !== "networkidle") {
      throw error;
    }

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: NAVIGATION_TIMEOUT,
    });
  }
}

async function gotoSessionUrl(page, session, waitUntil) {
  if (!session.url) {
    throw new Error("No saved URL for this session. Run `agent-browser open <url>` first.");
  }

  await gotoWithFallback(page, session.url, waitUntil);
}

async function snapshotInteractive(page) {
  return page.evaluate(() => {
    function isVisible(element) {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        rect.width > 0 &&
        rect.height > 0
      );
    }

    function buildSelector(element) {
      if (element.id) {
        return `#${CSS.escape(element.id)}`;
      }

      const named = element.getAttribute("name");
      if (named) {
        return `${element.tagName.toLowerCase()}[name="${CSS.escape(named)}"]`;
      }

      const labelled = element.getAttribute("aria-label");
      if (labelled) {
        return `${element.tagName.toLowerCase()}[aria-label="${CSS.escape(labelled)}"]`;
      }

      const parts = [];
      let current = element;

      while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
        let selector = current.tagName.toLowerCase();
        let sibling = current;
        let index = 1;

        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.tagName === current.tagName) {
            index += 1;
          }
        }

        selector += `:nth-of-type(${index})`;
        parts.unshift(selector);

        const candidate = parts.join(" > ");
        if (document.querySelectorAll(candidate).length === 1) {
          return candidate;
        }

        current = current.parentElement;
      }

      return parts.join(" > ");
    }

    const candidates = Array.from(
      document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])',
      ),
    )
      .filter((element) => isVisible(element))
      .slice(0, 60)
      .map((element, index) => {
        const role =
          element.getAttribute("role") ||
          (element.tagName.toLowerCase() === "a" ? "link" : element.tagName.toLowerCase());
        const name =
          element.getAttribute("aria-label") ||
          element.textContent?.trim() ||
          element.getAttribute("name") ||
          element.getAttribute("placeholder") ||
          element.tagName.toLowerCase();

        return {
          ref: `@e${index + 1}`,
          role,
          name: name.replace(/\s+/g, " ").slice(0, 140),
          selector: buildSelector(element),
        };
      });

    return candidates;
  });
}

async function main() {
  const { positionals, options } = parseArgs(process.argv.slice(2));
  const command = positionals[0];

  if (!command) {
    printUsage();
    process.exit(1);
  }

  const session = await loadSession(options.session);

  if (options.viewport) {
    session.viewport = parseViewport(options.viewport);
  }

  switch (command) {
    case "open": {
      const url = positionals[1];
      if (!url) {
        throw new Error("Missing URL for `open`.");
      }

      await withPage(session, options, async ({ page, viewport }) => {
        await gotoWithFallback(page, url, "domcontentloaded");
        session.url = page.url();
        session.viewport = viewport;
      });

      await saveSession(options.session, session);
      console.log(session.url);
      return;
    }

    case "wait": {
      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, options.load);
        session.url = page.url();
      });

      await saveSession(options.session, session);
      console.log(`ready: ${session.url}`);
      return;
    }

    case "get": {
      const subject = positionals[1];
      if (!subject || !["title", "url"].includes(subject)) {
        throw new Error("Use `agent-browser get title` or `agent-browser get url`.");
      }

      let output = "";
      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        output = subject === "title" ? await page.title() : page.url();
      });

      console.log(output);
      return;
    }

    case "screenshot": {
      const maybeFile = positionals[1];
      const screenshotPath = maybeFile
        ? path.resolve(cwd, maybeFile)
        : path.join(sessionRoot, `${options.session}-screenshot.png`);

      await ensureDir(path.dirname(screenshotPath));

      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        await page.screenshot({
          path: screenshotPath,
          fullPage: options.full,
        });
      });

      console.log(screenshotPath);
      return;
    }

    case "snapshot": {
      if (!options.interactive) {
        throw new Error("Only `agent-browser snapshot -i` is implemented in this local shim.");
      }

      let refs = [];
      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        refs = await snapshotInteractive(page);
      });

      session.refs = Object.fromEntries(refs.map((entry) => [entry.ref, entry.selector]));
      await saveSession(options.session, session);
      refs.forEach((entry) => {
        console.log(`${entry.ref} ${entry.role} "${entry.name}"`);
      });
      return;
    }

    case "click": {
      const ref = positionals[1];
      const selector = session.refs?.[ref];
      if (!selector) {
        throw new Error(`Unknown ref ${ref}. Run \`agent-browser snapshot -i\` first.`);
      }

      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        await page.locator(selector).click();
        await page.waitForLoadState("networkidle").catch(() => undefined);
        session.url = page.url();
      });

      await saveSession(options.session, session);
      console.log(session.url);
      return;
    }

    case "fill": {
      const ref = positionals[1];
      const text = positionals.slice(2).join(" ");
      const selector = session.refs?.[ref];
      if (!selector || !text) {
        throw new Error("Use `agent-browser fill <@ref> <text>` after `snapshot -i`.");
      }

      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        await page.locator(selector).fill(text);
      });

      console.log(`filled ${ref}`);
      return;
    }

    case "press": {
      const key = positionals[1];
      if (!key) {
        throw new Error("Use `agent-browser press <key>`.");
      }

      await withPage(session, options, async ({ page }) => {
        await gotoSessionUrl(page, session, "networkidle");
        await page.keyboard.press(key);
        await page.waitForLoadState("networkidle").catch(() => undefined);
        session.url = page.url();
      });

      await saveSession(options.session, session);
      console.log(`pressed ${key}`);
      return;
    }

    default:
      throw new Error(`Unknown command "${command}".`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
