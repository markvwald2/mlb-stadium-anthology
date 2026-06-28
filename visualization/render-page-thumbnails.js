#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawnSync } = require("child_process");

process.env.NODE_PATH = "/Users/markvahrenwald/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
require("module").Module._initPaths();

const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(__dirname, "assets", "page-thumbnails");
const TMP_DIR = path.join(ROOT, "exports", ".thumb-tmp");
const ORDER_FILE = path.join(__dirname, "book-order.json");
const PORT = 8788;

function thumbSlug(page) {
  return page.toLowerCase()
    .replace(/\.html$/, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function outputName(item) {
  if (item.out) return item.out;
  if (item.thumb) return path.basename(item.thumb);
  return `${thumbSlug(item.page)}.jpg`;
}

function urlFor(page) {
  return `http://127.0.0.1:${PORT}/${encodeURIComponent(page).replace(/%2F/g, "/")}`;
}

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  return {
    ".css": "text/css",
    ".csv": "text/csv",
    ".html": "text/html",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jsx": "text/babel",
    ".otf": "font/otf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2"
  }[ext] || "application/octet-stream";
}

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, `http://127.0.0.1:${PORT}`).pathname);
    const file = path.normalize(path.join(ROOT, pathname));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType(file) });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(PORT, "127.0.0.1", () => resolve(server)));
}

async function findArtboard(page) {
  const handle = await page.evaluateHandle(() => {
    const candidates = [...document.querySelectorAll("body *")]
      .map((el, index) => {
        const r = el.getBoundingClientRect();
        return { el, index, x: r.x, y: r.y, width: r.width, height: r.height, className: String(el.className || "") };
      })
      .filter((item) => item.width > 1200 && item.height > 900 && item.x > -1 && item.y > -1);

    function near(value, target) {
      return Math.abs(value - target) <= 3;
    }

    const exactSpread = candidates
      .filter((item) => near(item.width, 2550) && near(item.height, 1088) && !item.className.includes("dc-card"))
      .pop();
    if (exactSpread) return exactSpread.el;

    const exactJacket = candidates
      .filter((item) => near(item.width, 2668.1) && near(item.height, 1162.5) && !item.className.includes("dc-card"))
      .pop();
    if (exactJacket) return exactJacket.el;

    const exactPage = candidates
      .filter((item) => near(item.width, 1275) && near(item.height, 1088) && !item.className.includes("dc-card"))
      .pop();
    if (exactPage) return exactPage.el;

    return candidates
      .filter((item) =>
        ((near(item.width, 2550) || near(item.width, 1275)) && near(item.height, 1088)) ||
        (near(item.width, 2668.1) && near(item.height, 1162.5)))
      .pop()?.el || null;
  });

  const element = handle.asElement();
  if (!element) {
    await handle.dispose();
    return null;
  }
  return element;
}

async function renderOne(browser, item) {
  const page = await browser.newPage({ viewport: { width: 2800, height: 1400 }, deviceScaleFactor: 1 });
  const tmp = path.join(TMP_DIR, item.out);
  const out = path.join(OUT_DIR, item.out);
  try {
    await page.goto(urlFor(item.page), { waitUntil: "load", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
    await page.waitForTimeout(500);
    const artboard = await findArtboard(page);
    if (!artboard) throw new Error("No 2550x1088, 1275x1088, or jacket artboard found");
    await artboard.screenshot({ path: tmp, type: "jpeg", quality: 88 });
    await artboard.dispose();
    const result = spawnSync("sips", ["-Z", "640", tmp, "--out", out], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(result.stderr || result.stdout || "sips failed");
    return { ok: true, title: item.title, out };
  } finally {
    await page.close();
    fs.rmSync(tmp, { force: true });
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const filters = process.argv.slice(2).map((arg) => arg.toLowerCase());
  const seen = new Set();
  const items = [];
  const manifest = JSON.parse(fs.readFileSync(ORDER_FILE, "utf8"));
  function addItem(entry) {
    if (!entry || entry.include === false || !entry.page || seen.has(entry.page)) return;
    seen.add(entry.page);
    items.push({ ...entry, out: outputName(entry) });
  }
  for (const entry of manifest) {
    if (entry.include === false) continue;
    addItem(entry);
    addItem(entry.left);
    addItem(entry.right);
  }

  const selected = filters.length
    ? items.filter((item) => filters.some((filter) =>
        item.page.toLowerCase().includes(filter) ||
        item.title.toLowerCase().includes(filter) ||
        outputName(item).toLowerCase().includes(filter)))
    : items;
  const existing = selected.filter((item) => fs.existsSync(path.join(ROOT, item.page)));
  const skipped = selected.filter((item) => !fs.existsSync(path.join(ROOT, item.page)));
  if (filters.length && !selected.length) {
    console.error(`No thumbnail entries matched: ${filters.join(", ")}`);
    process.exit(1);
  }
  const server = await startServer();
  const browser = await chromium.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });

  const failures = [];
  try {
    for (let i = 0; i < existing.length; i++) {
      const item = existing[i];
      process.stdout.write(`[${i + 1}/${existing.length}] ${item.page} -> ${item.out} ... `);
      try {
        await renderOne(browser, item);
        process.stdout.write("ok\n");
      } catch (error) {
        failures.push({ item, error });
        process.stdout.write(`failed: ${error.message}\n`);
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }

  if (skipped.length) {
    console.log("\nSkipped missing HTML pages:");
    skipped.forEach((item) => console.log(`- ${item.page}`));
  }
  if (failures.length) {
    console.log("\nFailures:");
    failures.forEach(({ item, error }) => console.log(`- ${item.page}: ${error.message}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
