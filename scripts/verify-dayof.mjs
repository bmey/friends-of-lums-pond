#!/usr/bin/env node
// Checks the day-of build of /pondfest: structure, copy rules, and above all
// real browser behavior. A green `npm run build` only proves the markup
// parses; this proves the tabs switch, the clock names the right band, and
// the winners flag does what it says.
//
//   node scripts/verify-dayof.mjs                 everything
//   node scripts/verify-dayof.mjs --no-browser    the fast structure/copy tiers only
//   node scripts/verify-dayof.mjs --skip-build    reuse the dist/ that is there
//   node scripts/verify-dayof.mjs --shots DIR     where to put the screenshots
//
// The browser tiers need Chrome and puppeteer-core. Chrome is looked for at
// the usual Mac path (override with CHROME_PATH); puppeteer-core is loaded
// from node_modules if it is installed, or from the directory named by
// PUPPETEER_CORE, so it never has to live in this repo.
//
// Prints one line per check and exits non-zero if any fail.

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const NO_BROWSER = flag("--no-browser");
const SKIP_BUILD = flag("--skip-build");
const SHOTS = path.resolve(
  opt("--shots", path.join(os.tmpdir(), "pondfest-verify")),
);
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4173 + Math.floor(Math.random() * 500);
const DIST = path.join(ROOT, "dist");
const PAGE = path.join(DIST, "pondfest", "index.html");
const WINNERS = path.join(ROOT, "src", "data", "pondfest", "winners.ts");

// ── reporting ──────────────────────────────────────────────────────────
let failures = 0;
let n = 0;
function report(ok, name, detail = "") {
  n += 1;
  if (!ok) failures += 1;
  const tag = ok ? "PASS" : "FAIL";
  console.log(
    `${tag}  ${String(n).padStart(2)}. ${name}${detail ? `  (${detail})` : ""}`,
  );
  return ok;
}
function note(text) {
  console.log(`      ${text}`);
}

// ── helpers ────────────────────────────────────────────────────────────
function build() {
  const r = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    note(r.stdout.slice(-2000));
    note(r.stderr.slice(-2000));
  }
  return r.status === 0;
}

const readPage = () => fs.readFileSync(PAGE, "utf8");

// Reader-facing text of the built page: scripts, styles and tags stripped.
// Also strips the things we are not allowed to judge: the band blurbs (the
// artists' own words), vendor and sponsor names, and ad captions.
function readerText(html) {
  let h = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<p class="pf-act-blurb"[^>]*>[\s\S]*?<\/p>/gi, " ")
    .replace(/<ul class="pf-chiplist[^"]*"[^>]*>[\s\S]*?<\/ul>/gi, " ")
    .replace(/<div class="pf-sponsor-list"[^>]*>[\s\S]*?<\/div>/gi, " ")
    .replace(/<ul class="pf-ads-rail"[^>]*>[\s\S]*?<\/ul>/gi, " ")
    .replace(/<ul class="pf-people-list"[^>]*>[\s\S]*?<\/ul>/gi, " ")
    .replace(/<ul class="pf-sheet-list"[^>]*>[\s\S]*?<\/ul>/gi, " ");
  // alt text and titles are read aloud, so they count as copy
  h = h.replace(/\s(alt|title|aria-label)="([^"]*)"/gi, " $2 ");
  return h
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/\s+/g, " ");
}

function context(text, re, width = 40) {
  const out = [];
  let m;
  const r = new RegExp(
    re.source,
    re.flags.includes("g") ? re.flags : re.flags + "g",
  );
  while ((m = r.exec(text)) && out.length < 6) {
    out.push(
      "…" +
        text.slice(
          Math.max(0, m.index - width),
          m.index + m[0].length + width,
        ) +
        "…",
    );
  }
  return out;
}

async function loadConfig() {
  // Node strips the types for us (Node 22.6+); the config has no runtime
  // imports beyond its own types.
  const mod = await import(
    pathToFileURL(path.join(ROOT, "src", "data", "pondfest", "config.ts")).href
  );
  return mod;
}

// ── a tiny static server for dist/ ─────────────────────────────────────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
  ".ics": "text/calendar",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(DIST, p);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, {
      "content-type": MIME[path.extname(file)] || "application/octet-stream",
    });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function loadPuppeteer() {
  const candidates = [];
  if (process.env.PUPPETEER_CORE) candidates.push(process.env.PUPPETEER_CORE);
  candidates.push("puppeteer-core");
  const require = createRequire(import.meta.url);
  for (const c of candidates) {
    try {
      const resolved = require.resolve(c, { paths: [ROOT] });
      return (await import(pathToFileURL(resolved).href)).default;
    } catch {
      /* try the next */
    }
  }
  return null;
}

// Eastern-time instants on event day, for the clock tests
const T = (iso) => Date.parse(iso);

// ═══════════════════════════════════════════════════════════════════════
// Tier 1: structure
// ═══════════════════════════════════════════════════════════════════════
console.log("── Tier 1: structure ──");

if (!SKIP_BUILD) report(build(), "npm run build exits 0");
else
  report(
    fs.existsSync(PAGE),
    "dist/pondfest/index.html present (build skipped)",
  );

let html = readPage();
const cfg = await loadConfig();

const expectedIds = [
  "pf-schedule",
  "pf-now",
  "pf-plan",
  "pf-mapview",
  "pf-whos-here",
  "pf-expect",
  "pf-fundraising",
  "pf-merch",
  "pf-lineup",
  "pf-sponsors",
  "pf-ads",
  "pf-lightbox",
  "pf-thanks",
  "pf-faq",
  "pf-memories",
  "pf-next",
  "pf-thankyou",
  "pf-quicklinks",
  "pf-sectionnav",
  "pf-tabbar",
  "pf-jump-sheet",
];
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const missingIds = expectedIds.filter((id) => !ids.has(id));
report(
  missingIds.length === 0,
  "every expected section id is present",
  missingIds.join(", ") || `${expectedIds.length} ids`,
);

const count = (re) => (html.match(re) || []).length;
const counts = [
  ["acts in the schedule", /\sdata-pf-set="/g, cfg.LINEUP.length, 11],
  ["open mic slots", /\sdata-pf-openmic\b/g, cfg.OPEN_MIC_SLOTS.length, 13],
  ["food trucks", /\sdata-pf-truck\b/g, cfg.FOOD_TRUCKS.length, 15],
  ["craft vendors", /\sdata-pf-vendor\b/g, cfg.CRAFT_VENDORS.length, 38],
  ["agencies", /\sdata-pf-agency\b/g, cfg.FIRST_RESPONDERS.length, 11],
  ["key times", /\sdata-pf-moment="/g, cfg.KEY_TIMES.length, 13],
  ["sponsor ads", /\sdata-pf-ad(?=[\s>])/g, cfg.SPONSOR_ADS.length, 7],
  ["maps", /\sdata-pf-maptab="/g, cfg.EVENT_MAPS.length, 6],
  ["band cards with anchors", /\sid="act-[^"]+"/g, cfg.LINEUP.length, 11],
];
let countsOk = true;
const countDetail = [];
for (const [what, re, fromConfig, expected] of counts) {
  const got = count(re);
  const ok = got === fromConfig && got === expected;
  if (!ok) countsOk = false;
  countDetail.push(
    `${what}: ${got}${ok ? "" : ` ≠ ${fromConfig}/${expected}`}`,
  );
}
report(countsOk, "counts match the data", countDetail.join(", "));

const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
const deadAnchors = [...new Set(anchors.filter((a) => !ids.has(a)))];
report(
  deadAnchors.length === 0,
  "every in-page anchor resolves",
  deadAnchors.join(", ") || `${anchors.length} anchors`,
);

const assetRefs = new Set(
  [
    ...html.matchAll(/\s(?:src|data-src|href|poster)="(\/pondfest\/[^"]+)"/g),
    ...html.matchAll(/url\('(\/pondfest\/[^']+)'\)/g),
  ].map((m) => m[1].split("?")[0]),
);
const missingAssets = [...assetRefs].filter(
  (p) => path.extname(p) && !fs.existsSync(path.join(ROOT, "public", p)),
);
report(
  missingAssets.length === 0,
  "every referenced /pondfest/ asset exists",
  missingAssets.join(", ") || `${assetRefs.size} files`,
);

// ═══════════════════════════════════════════════════════════════════════
// Tier 2: copy and style gates
// ═══════════════════════════════════════════════════════════════════════
console.log("── Tier 2: copy and style gates ──");
let text = readerText(html);

const emDashes = context(text, /—/g);
report(
  emDashes.length === 0,
  "zero em-dashes in reader-facing output",
  emDashes.join(" | "),
);

const british =
  /\b(programme|organis(e|ation|ing)|colour|behaviour|optimis(e|ation)|judgement|cheque|neighbour|whilst|amongst|grey|favourite|centre|theatre|travelling|licence|car park|on the day|turn up|collect your)\b/gi;
const britishHits = context(text, british);
report(
  britishHits.length === 0,
  "zero British spellings or phrasings",
  britishHits.join(" | "),
);

report(!/pf-eyebrow/.test(html), "zero kicker labels (pf-eyebrow absent)");

const banned =
  /\b(crucial|vital|pivotal|testament|cherished|beloved|vibrant|unforgettable|nestled|boasts|showcas(e|es|ing)|foster(s|ing)?|tapestry|diverse array|premier|stands as|serves as|elevate|seamless|curated|dive in|more than just|not just a|something for everyone|whether you'?re a)\b/gi;
const bannedHits = context(text, banned);
report(
  bannedHits.length === 0,
  "zero banned vocabulary in reader-facing copy",
  bannedHits.join(" | "),
);

// En-dashes are fine, but only inside time or number ranges
const badEnDash = [];
for (const m of text.matchAll(/–/g)) {
  const left = text.slice(Math.max(0, m.index - 12), m.index);
  const right = text.slice(m.index + 1, m.index + 13);
  const timeLeft = /\d{1,2}(:\d{2})?( ?[AP]M)?\s*$/i.test(left);
  const timeRight = /^\s*\d{1,2}(:\d{2})?( ?[AP]M)?/i.test(right);
  if (!(timeLeft && timeRight))
    badEnDash.push(`${left.trim()} – ${right.trim()}`);
}
report(
  badEnDash.length === 0,
  "en-dashes only inside time ranges",
  badEnDash.join(" | "),
);

// ═══════════════════════════════════════════════════════════════════════
// Tier 1b / 3: the winners flow, end to end (rebuilds twice)
// ═══════════════════════════════════════════════════════════════════════
const winnersOriginal = fs.readFileSync(WINNERS);
const winnersState = (h) => ({
  banner:
    /class="pf-winners-banner[^"]*"[^>]*href="#pf-winners"/.test(h) ||
    /href="#pf-winners"[^>]*class="pf-winners-banner/.test(h),
  section: /\sid="pf-winners"/.test(h),
  nav: /data-pf-target="pf-winners"/.test(h),
  rows: (h.match(/class="pf-winners-row"/g) || []).length,
});

let liveHtml = null;
if (!SKIP_BUILD) {
  console.log("── Winners flow ──");
  try {
    let w = winnersOriginal.toString("utf8");
    w = w.replace(
      "export const WINNERS_LIVE = false;",
      "export const WINNERS_LIVE = true;",
    );
    w = w.replace(
      'export const FIFTY_FIFTY_TICKET = "";',
      'export const FIFTY_FIFTY_TICKET = "204518";',
    );
    w = w.replace(
      /export const RAFFLE_WINNERS = `[\s\S]*?`;/,
      "export const RAFFLE_WINNERS = `\nDogfish Head basket | 124578\nDeerfield foursome | Pat Smith\n`;",
    );
    w = w.replace(
      /export const AUCTION_WINNERS = `[\s\S]*?`;/,
      "export const AUCTION_WINNERS = `\nSigned heron print | Chris Jones\n`;",
    );
    fs.writeFileSync(WINNERS, w);
    const builtLive = build();
    liveHtml = builtLive ? readPage() : "";
    const on = winnersState(liveHtml);
    report(
      builtLive && on.banner && on.section && on.nav && on.rows === 3,
      "WINNERS_LIVE=true: banner, section and nav entry appear, banner links to section",
      `banner ${on.banner}, section ${on.section}, nav ${on.nav}, rows ${on.rows}`,
    );
  } finally {
    fs.writeFileSync(WINNERS, winnersOriginal);
  }
  const rebuilt = build();
  html = readPage();
  text = readerText(html);
  const off = winnersState(html);
  report(
    rebuilt && !off.banner && !off.section && !off.nav && off.rows === 0,
    "WINNERS_LIVE=false: banner, section and nav entry are gone; winners.ts restored",
    `restored ${
      Buffer.compare(fs.readFileSync(WINNERS), winnersOriginal) === 0
    }`,
  );
} else {
  note("winners flow skipped with --skip-build");
}

// ═══════════════════════════════════════════════════════════════════════
// Tier 3: behavior in a real browser
// ═══════════════════════════════════════════════════════════════════════
if (NO_BROWSER) {
  console.log(
    `\n${failures === 0 ? "OK" : "FAILED"}: ${
      n - failures
    }/${n} checks passed (browser tiers skipped)`,
  );
  process.exit(failures ? 1 : 0);
}

console.log("── Tier 3: browser ──");
const puppeteer = await loadPuppeteer();
if (!puppeteer || !fs.existsSync(CHROME)) {
  report(
    false,
    "puppeteer-core and Chrome available",
    `puppeteer ${!!puppeteer}, chrome ${fs.existsSync(CHROME)}`,
  );
  process.exit(1);
}
const server = await serve();
const base = `http://127.0.0.1:${PORT}/pondfest/`;
fs.mkdirSync(SHOTS, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars"],
});

const consoleErrors = [];
async function openPage({
  width = 390,
  height = 844,
  now,
  hash = "",
  fresh = false,
} = {}) {
  const ctx = fresh
    ? await browser.createBrowserContext()
    : browser.defaultBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 1,
    isMobile: width < 720,
    hasTouch: width < 720,
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  if (now) {
    await page.evaluateOnNewDocument((t) => {
      // freeze the clock: the page only ever asks Date.now()
      Date.now = () => t;
    }, now);
  }
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`console: ${m.text()}`);
  });
  await page.goto(base + hash, { waitUntil: "load" });
  return page;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ownError = (e) =>
  !/fontawesome|kit\.|fonts\.g|net::ERR|Failed to load resource/i.test(e);

// 11 + 12: map tabs
{
  const page = await openPage({ now: T("2026-10-10T13:00:00-04:00") });
  const srcCount = () =>
    page.$$eval("#pf-mapview img", (imgs) => ({
      withSrc: imgs.filter((i) => i.getAttribute("src")).length,
      deferred: imgs.filter((i) => i.getAttribute("data-src")).length,
      total: imgs.length,
    }));
  const first = await srcCount();
  const tabs = await page.$$("#pf-mapview [data-pf-maptab]");
  let tabsOk = tabs.length === cfg.EVENT_MAPS.length;
  const tabDetail = [];
  for (let i = 0; i < tabs.length; i++) {
    await page.evaluate(
      (el) => el.scrollIntoView({ block: "center" }),
      tabs[i],
    );
    await tabs[i].click();
    await sleep(150);
    const r = await page.evaluate((i) => {
      const tab = document.querySelectorAll("#pf-mapview [data-pf-maptab]")[i];
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      const img = panel && panel.querySelector("img");
      return {
        id: tab.dataset.pfMaptab,
        selected: tab.getAttribute("aria-selected") === "true",
        visible: !!panel && panel.offsetParent !== null && !panel.hidden,
        src: img ? img.getAttribute("src") : null,
      };
    }, i);
    // wait for the image to actually decode
    const decoded = await page.evaluate(async (i) => {
      const tab = document.querySelectorAll("#pf-mapview [data-pf-maptab]")[i];
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      const img = panel.querySelector("img");
      try {
        await img.decode();
      } catch {
        /* fall through to naturalWidth */
      }
      return img.naturalWidth;
    }, i);
    const ok = r.selected && r.visible && !!r.src && decoded > 0;
    if (!ok) tabsOk = false;
    tabDetail.push(
      `${r.id}:${
        ok
          ? "ok"
          : `sel=${r.selected} vis=${r.visible} src=${r.src} w=${decoded}`
      }`,
    );
    if (i === 2) {
      const after3 = await srcCount();
      report(
        first.withSrc === 1 &&
          first.deferred === first.total - 1 &&
          after3.withSrc === 3,
        "deferral actually defers: one map src on first paint, three after the third tab",
        `first ${first.withSrc}/${first.total} (deferred ${first.deferred}), after third tab ${after3.withSrc}`,
      );
    }
  }
  report(
    tabsOk,
    "map tabs switch, show their panel, and the image decodes",
    tabDetail.join(" "),
  );
  await page.screenshot({ path: path.join(SHOTS, "390-maps-tab6.png") });
  await page.close();
}

// 13: the clock
{
  const cases = [
    {
      at: "09:00",
      expect: { hidden: true, live: [] },
      text: /not started|opens? at 11|starts at 11|Gates open/i,
    },
    {
      at: "12:15",
      expect: {
        live: ["Scott & Tammy"],
        notLive: ["The Sarah Koon Band", "Brian Corcoran"],
        next: ["Camp", "Cher's Playground"],
      },
    },
    {
      at: "12:45",
      expect: { live: ["Camp", "Cher's Playground", "Scott & Tammy"] },
    },
    {
      at: "13:00",
      expect: { live: ["Camp", "Cher's Playground"], next: ["Dansino"] },
    },
    {
      at: "19:00",
      expect: { live: [] },
      text: /wrap|done for the day|ended|over/i,
    },
  ];
  for (const c of cases) {
    const page = await openPage({ now: T(`2026-10-10T${c.at}:00-04:00`) });
    const state = await page.evaluate(() => {
      const panel = document.getElementById("pf-now");
      const rows = [
        ...document.querySelectorAll("#pf-now [data-pf-state]"),
      ].map((r) => ({
        act: r.dataset.pfAct,
        state: r.dataset.pfState,
        stage: r.dataset.pfStage,
      }));
      return {
        hidden: !panel || panel.hidden || panel.offsetParent === null,
        text: panel ? panel.textContent.replace(/\s+/g, " ").trim() : "",
        live: rows.filter((r) => r.state === "live").map((r) => r.act),
        next: rows.filter((r) => r.state === "next").map((r) => r.act),
        liveRows: document.querySelectorAll(".pf-sched-set[data-pf-live]")
          .length,
      };
    });
    let ok = true;
    const why = [];
    if (c.expect.hidden !== undefined) {
      const hiddenOrSaysSo =
        state.hidden || (c.text && c.text.test(state.text));
      if (!hiddenOrSaysSo) {
        ok = false;
        why.push("panel shown and does not say the day has not started");
      }
    }
    for (const a of c.expect.live || [])
      if (!state.live.includes(a)) {
        ok = false;
        why.push(`${a} not live`);
      }
    if (c.expect.live && state.live.length !== c.expect.live.length) {
      ok = false;
      why.push(`live=${state.live.join("/")}`);
    }
    for (const a of c.expect.notLive || [])
      if (state.live.includes(a)) {
        ok = false;
        why.push(`${a} still live`);
      }
    for (const a of c.expect.next || [])
      if (!state.next.includes(a)) {
        ok = false;
        why.push(`${a} not next`);
      }
    if (
      c.at === "19:00" &&
      c.text &&
      !state.hidden &&
      !c.text.test(state.text)
    ) {
      ok = false;
      why.push("19:00 panel does not say the day is over");
    }
    if (c.expect.live && state.liveRows !== c.expect.live.length) {
      ok = false;
      why.push(`schedule rows flagged live: ${state.liveRows}`);
    }
    report(
      ok,
      `clock at ${c.at}: ${
        c.expect.hidden
          ? "hidden or not started"
          : c.expect.live.length
          ? `live = ${c.expect.live.join(", ")}${
              c.expect.next ? `, next = ${c.expect.next.join(", ")}` : ""
            }`
          : "nothing claimed live"
      }`,
      why.join("; ") ||
        `live=${state.live.join("/") || "none"}${
          state.next.length ? ` next=${state.next.join("/")}` : ""
        }`,
    );
    if (c.at === "13:00" || c.at === "09:00" || c.at === "19:00") {
      const el = await page.$("#pf-schedule");
      if (el) {
        await page.evaluate(() =>
          document
            .querySelectorAll(".pf-section--lazy")
            .forEach((s) => (s.style.contentVisibility = "visible")),
        );
        await el.screenshot({
          path: path.join(SHOTS, `390-schedule-${c.at.replace(":", "")}.png`),
        });
      }
    }
    await page.close();
  }
}

// 14 (browser half): the winners banner on the live build was checked by
// rebuild above; here we check the live HTML's banner href lands on the
// section when it exists in the current build (it does not, by design).
// Instead, verify the phase switch and that a #pf-winners link in the page
// (if any) resolves, which the anchor check covered.

// 15 + 16 + 17: the bottom tab bar, jump accuracy, no horizontal scroll (390px)
{
  const page = await openPage({ now: T("2026-10-10T13:00:00-04:00") });
  const bar = await page.evaluate(() => {
    const bar = document.getElementById("pf-tabbar");
    if (!bar) return null;
    const cs = getComputedStyle(bar);
    const r = bar.getBoundingClientRect();
    const top = document.querySelector(".pf-navbar");
    return {
      position: cs.position,
      visible: cs.visibility === "visible" && cs.display !== "none",
      bottomGap: Math.round(window.innerHeight - r.bottom),
      top: Math.round(r.top),
      height: Math.round(r.height),
      paddingBottom: cs.paddingBottom,
      tabs: [...bar.querySelectorAll("[data-pf-target]")]
        .filter((t) => t.offsetParent !== null)
        .map((t) => t.dataset.pfTarget),
      more: !!bar.querySelector("[data-pf-jump-open]"),
      topBarShown: top ? getComputedStyle(top).display !== "none" : false,
      bodyPadBottom: parseInt(
        getComputedStyle(document.body).paddingBottom,
        10,
      ),
    };
  });
  report(
    !!bar &&
      bar.position === "fixed" &&
      bar.visible &&
      bar.bottomGap === 0 &&
      bar.tabs.length >= 3 &&
      bar.more &&
      !bar.topBarShown &&
      bar.bodyPadBottom >= bar.height,
    "bottom tab bar at 390px: exists, fixed to the bottom, top bar hidden, page reserves its height",
    bar
      ? `tabs ${bar.tabs.join("/")}, height ${bar.height}, body pad ${
          bar.bodyPadBottom
        }`
      : "no #pf-tabbar",
  );
  // safe-area: the bar's padding-bottom is env(safe-area-inset-bottom) (0 in headless), so
  // assert the rule is there rather than a pixel value
  const cssFiles = [
    ...html.matchAll(/<link[^>]+href="(\/_astro\/[^"]+\.css)"/g),
  ].map((m) => path.join(DIST, m[1]));
  const allCss =
    html +
    cssFiles
      .map((f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : ""))
      .join("\n");
  const css = allCss.match(/\.pf-tabbar[^{]*\{[^}]*\}/g) || [];
  report(
    css.some((r) => /safe-area-inset-bottom/.test(r)),
    "tab bar pads for the safe-area inset",
    `${cssFiles.length} stylesheets read`,
  );

  // scroll deep so the back-to-top button appears, then compare
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight * 0.6),
  );
  await sleep(400);
  const overlap = await page.evaluate(() => {
    const bar = document.getElementById("pf-tabbar").getBoundingClientRect();
    const btn = document.querySelector(".pf-backtotop");
    const cs = getComputedStyle(btn);
    const r = btn.getBoundingClientRect();
    return {
      shown: cs.visibility === "visible",
      btnBottom: Math.round(r.bottom),
      barTop: Math.round(bar.top),
    };
  });
  report(
    overlap.shown && overlap.btnBottom <= overlap.barTop,
    "back-to-top button sits above the tab bar",
    `button bottom ${overlap.btnBottom}, bar top ${overlap.barTop}`,
  );
  await page.screenshot({
    path: path.join(SHOTS, "390-tabbar-and-backtotop.png"),
  });

  // each visible tab scrolls to its section
  const tabTargets = bar.tabs;
  let tabJumpOk = true;
  const tabJumpDetail = [];
  for (const id of tabTargets) {
    await page.evaluate(
      (id) =>
        document.querySelector(`#pf-tabbar [data-pf-target="${id}"]`).click(),
      id,
    );
    await sleep(500);
    const top = await page.evaluate(
      (id) =>
        Math.round(document.getElementById(id).getBoundingClientRect().top),
      id,
    );
    if (Math.abs(top - 60) > 2) tabJumpOk = false;
    tabJumpDetail.push(`${id}:${top}`);
  }
  report(
    tabJumpOk,
    "each tab scrolls its section to the 60px scroll margin",
    tabJumpDetail.join(" "),
  );

  // every nav destination in the sheet, on click
  const sheetTargets = await page.evaluate(() =>
    [...document.querySelectorAll("#pf-jump-sheet [data-pf-target]")]
      .filter(
        (a) =>
          a.closest("li")?.offsetParent !== null ||
          getComputedStyle(a.closest("li")).display !== "none",
      )
      .filter(
        (a) =>
          document.getElementById(a.dataset.pfTarget)?.offsetParent !== null ||
          getComputedStyle(document.getElementById(a.dataset.pfTarget))
            .display !== "none",
      )
      .map((a) => a.dataset.pfTarget),
  );
  let jumpOk = true;
  const jumpDetail = [];
  for (const id of sheetTargets) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(100);
    await page.evaluate(() =>
      document.querySelector("#pf-tabbar [data-pf-jump-open]").click(),
    );
    await sleep(150);
    await page.evaluate(
      (id) =>
        document
          .querySelector(`#pf-jump-sheet [data-pf-target="${id}"]`)
          .click(),
      id,
    );
    await sleep(600);
    const top = await page.evaluate(
      (id) =>
        Math.round(document.getElementById(id).getBoundingClientRect().top),
      id,
    );
    if (Math.abs(top - 60) > 2) jumpOk = false;
    jumpDetail.push(`${id}:${top}`);
  }
  report(
    jumpOk,
    "every jump-sheet destination lands at 60px on click",
    jumpDetail.join(" "),
  );

  const hscroll = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }));
  report(
    hscroll.sw <= hscroll.cw,
    "no horizontal scroll at 390px",
    `${hscroll.sw} <= ${hscroll.cw}`,
  );
  await page.close();

  // the same destinations on a #hash load
  let hashOk = true;
  const hashDetail = [];
  for (const id of sheetTargets) {
    const p = await openPage({
      now: T("2026-10-10T13:00:00-04:00"),
      hash: `#${id}`,
    });
    await sleep(1800);
    const top = await p.evaluate(
      (id) =>
        Math.round(document.getElementById(id).getBoundingClientRect().top),
      id,
    );
    if (Math.abs(top - 60) > 2) hashOk = false;
    hashDetail.push(`${id}:${top}`);
    await p.close();
  }
  report(
    hashOk,
    "every destination lands at 60px on a #hash load",
    hashDetail.join(" "),
  );
}

// 18: console errors (collected across everything above, plus the ad lightbox)
{
  const page = await openPage({ now: T("2026-10-10T13:00:00-04:00") });
  await page.evaluate(() =>
    document
      .querySelectorAll(".pf-section--lazy")
      .forEach((s) => (s.style.contentVisibility = "visible")),
  );
  const ad = await page.$("#pf-ads a[data-pf-ad]");
  if (ad) {
    await page.evaluate((el) => el.scrollIntoView({ block: "center" }), ad);
    await ad.click();
    await sleep(300);
    const lb = await page.evaluate(() => {
      const box = document.getElementById("pf-lightbox");
      const img = box && box.querySelector("img");
      return {
        open: !!box && !box.hidden,
        src: img && img.getAttribute("src"),
        w: img ? img.naturalWidth : 0,
      };
    });
    await page.screenshot({ path: path.join(SHOTS, "390-ad-lightbox.png") });
    await page.keyboard.press("Escape");
    await sleep(200);
    const closed = await page.evaluate(
      () => document.getElementById("pf-lightbox").hidden,
    );
    report(
      lb.open && !!lb.src && lb.w > 0 && closed,
      "sponsor ad opens full size in the lightbox and Escape closes it",
      `src ${lb.src}, width ${lb.w}, closed ${closed}`,
    );
  } else {
    report(false, "sponsor ad opens full size in the lightbox", "no ad found");
  }
  await page.close();
  const own = consoleErrors.filter(ownError);
  report(
    own.length === 0,
    "no console errors on load or after interacting",
    own.slice(0, 3).join(" | ") ||
      `${consoleErrors.length} external/network messages ignored`,
  );
  if (consoleErrors.length && own.length === 0)
    note(`ignored: ${[...new Set(consoleErrors)].slice(0, 3).join(" | ")}`);
}

// 19: weight on a cold load
{
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
  });
  const client = await page.createCDPSession();
  await client.send("Network.enable");
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  const urls = new Map();
  client.on("Network.responseReceived", (e) =>
    urls.set(e.requestId, e.response.url),
  );
  let total = 0;
  let own = 0;
  client.on("Network.loadingFinished", (e) => {
    total += e.encodedDataLength;
    const u = urls.get(e.requestId) || "";
    if (u.startsWith(base.replace("/pondfest/", "")))
      own += e.encodedDataLength;
  });
  await page.goto(base, { waitUntil: "networkidle0" });
  await sleep(500);
  const mb = (b) => (b / 1024 / 1024).toFixed(2);
  report(
    own <= 1.2 * 1024 * 1024,
    "first paint stays under 1.2 MB from this site",
    `${mb(own)} MB from this site, ${mb(
      total,
    )} MB total including Font Awesome`,
  );
  await page.close();
  await ctx.close();
}

// 20: screenshots for a person to look at
{
  const sections = [
    "pf-schedule",
    "pf-plan",
    "pf-whos-here",
    "pf-sponsors",
    "pf-thanks",
    "pf-next",
    "pf-expect",
    "pf-lineup",
    "pf-faq",
  ];
  for (const width of [390, 1440]) {
    const page = await openPage({
      width,
      height: width === 390 ? 844 : 900,
      now: T("2026-10-10T13:00:00-04:00"),
    });
    await page.addStyleTag({
      content: ".pf-section--lazy{content-visibility:visible!important}",
    });
    // scroll through once so lazy images load
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await sleep(800);
    await page.screenshot({ path: path.join(SHOTS, `${width}-event-top.png`) });
    for (const id of sections) {
      const el = await page.$(`#${id}`);
      if (el)
        await el.screenshot({ path: path.join(SHOTS, `${width}-${id}.png`) });
    }
    await page.screenshot({
      path: path.join(SHOTS, `${width}-event-full.png`),
      fullPage: true,
    });
    await page.close();
    // the other two phases, top of page only
    for (const [name, when] of [
      ["prep", "2026-09-20T12:00:00-04:00"],
      ["afterglow", "2026-10-11T12:00:00-04:00"],
    ]) {
      const p = await openPage({
        width,
        height: width === 390 ? 844 : 900,
        now: T(when),
      });
      await p.addStyleTag({
        content: ".pf-section--lazy{content-visibility:visible!important}",
      });
      await sleep(400);
      const phase = await p.evaluate(
        () => document.documentElement.dataset.pfPhase,
      );
      await p.screenshot({
        path: path.join(SHOTS, `${width}-${name}-top.png`),
      });
      if (name === "afterglow") {
        const el = await p.$("#pf-thankyou");
        if (el)
          await el.screenshot({
            path: path.join(SHOTS, `${width}-afterglow-thankyou.png`),
          });
      }
      if (name === "prep") {
        const el = await p.$("#pf-involved");
        if (el)
          await el.screenshot({
            path: path.join(SHOTS, `${width}-prep-involved.png`),
          });
      }
      if (width === 390)
        report(
          phase === name,
          `the page flips itself to "${name}" in the browser`,
          `data-pf-phase="${phase}"`,
        );
      await p.close();
    }
  }
  // phase gating at 13:00 on event day: the sign-up links and Get Involved are hidden
  const page = await openPage({ now: T("2026-10-10T13:00:00-04:00") });
  const gate = await page.evaluate(() => {
    const vis = (sel) =>
      [...document.querySelectorAll(sel)].some(
        (el) => getComputedStyle(el).display !== "none",
      );
    return {
      phase: document.documentElement.dataset.pfPhase,
      involved: vis("#pf-involved"),
      sponsorCta: vis(".pf-sponsor-cta"),
      prepLinks: vis('[data-phase="prep"]'),
      next: vis("#pf-next"),
      thankyou: vis("#pf-thankyou"),
      countdown: vis("#pf-countdown-display"),
    };
  });
  report(
    gate.phase === "event" &&
      !gate.involved &&
      !gate.sponsorCta &&
      !gate.prepLinks &&
      gate.next &&
      !gate.thankyou,
    "event phase hides the sign-up asks and shows the day-of sections",
    JSON.stringify(gate),
  );
  await page.close();
  note(`screenshots: ${SHOTS}`);
}

await browser.close();
server.close();

console.log(
  `\n${failures === 0 ? "OK" : "FAILED"}: ${n - failures}/${n} checks passed`,
);
process.exit(failures ? 1 : 0);
