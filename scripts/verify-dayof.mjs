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

// The outer HTML of the element with this id, by counting open and close
// tags of its own name. Not a DOM parser, but it survives attribute order
// and nested blocks of the same tag, which is all "is X inside Y" needs.
function elementHtml(h, id) {
  const open = h.match(
    new RegExp(`<([a-z0-9]+)\\b[^>]*\\sid="${id}"[^>]*>`, "i"),
  );
  if (!open) return "";
  const tag = open[1].toLowerCase();
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
  re.lastIndex = open.index + open[0].length;
  let depth = 1;
  let m;
  while ((m = re.exec(h))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return h.slice(open.index, m.index + m[0].length);
  }
  return h.slice(open.index);
}

// One attribute of one opening tag, whatever order the attributes come in
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
}

const stripTags = (h) =>
  h
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

// Every text file under dist/, for the whole-site copy and email gates.
// Images, video and fonts are skipped: nothing we are looking for can be
// in them, and the video alone is bigger than everything else combined.
const TEXT_EXT = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".xml",
  ".txt",
  ".vtt",
  ".ics",
  ".svg",
  ".webmanifest",
  ".map",
]);
function distTextFiles(dir = DIST) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    const ext = path.extname(e.name).toLowerCase();
    if (e.isDirectory()) out.push(...distTextFiles(p));
    else if (TEXT_EXT.has(ext) || ext === "") out.push(p);
  }
  return out;
}

function git(argv) {
  const r = spawnSync("git", argv, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
  });
  return r.status === 0 ? r.stdout : null;
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

// item 6: every area chip names a real map and links to that map's tab. At
// least one chip has to exist, or "Areas 1 & 2" mapping to nothing would
// pass by having no chips at all.
const mapIds = cfg.EVENT_MAPS.map((m) => m.id);
const mapVals = [...html.matchAll(/\sdata-pf-map="([^"]*)"/g)].map((m) => m[1]);
const badMapVals = [...new Set(mapVals.filter((v) => !mapIds.includes(v)))];
const badMapHrefs = [...html.matchAll(/<a\b[^>]*\sdata-pf-map="[^"]*"[^>]*>/g)]
  .map((m) => m[0])
  .filter((t) => attr(t, "href") !== `#pf-maptab-${attr(t, "data-pf-map")}`)
  .map((t) => `${attr(t, "data-pf-map")} → ${attr(t, "href")}`);
report(
  mapVals.length > 0 && badMapVals.length === 0 && badMapHrefs.length === 0,
  "every area chip names a real map and links to its tab",
  mapVals.length === 0
    ? "no data-pf-map in the page"
    : [...badMapVals, ...badMapHrefs].slice(0, 6).join(", ") ||
        `${mapVals.length} chips over ${new Set(mapVals).size} maps`,
);

// item 11: seven ads in the rail, in tier order, each carrying its tier and
// size class. Tier sizing is optional, so a rail with no data-tier at all
// passes as long as the count holds.
const TIER_ORDER = [
  "diamond",
  "platinum",
  "gold",
  "silver",
  "bronze",
  "family",
  "special",
];
const adRail =
  html.match(/<ul class="pf-ads-rail"[^>]*>[\s\S]*?<\/ul>/i)?.[0] || "";
const adLis = [...adRail.matchAll(/<li\b[^>]*>/g)].map((m) => m[0]);
const adTiers = adLis.map((li) => attr(li, "data-tier"));
const adSized = adLis.map((li) =>
  /\bpf-ad--(full|half|quarter)\b/.test(attr(li, "class") || ""),
);
const tiersShipped = adTiers.some((t) => t !== null);
const tierIdx = adTiers.map((t) => TIER_ORDER.indexOf(t));
const tierOrdered = tierIdx.every(
  (t, i) => t >= 0 && (i === 0 || t >= tierIdx[i - 1]),
);
report(
  adLis.length === 7 &&
    adLis.length === cfg.SPONSOR_ADS.length &&
    (!tiersShipped || (tierOrdered && adSized.every(Boolean))),
  "seven sponsor ads in the rail, in tier order, each sized by tier",
  !tiersShipped
    ? `${adLis.length} ads, tier sizing not shipped`
    : `${adLis.length} ads: ${adTiers
        .map((t, i) => `${t}${adSized[i] ? "" : "(no size class)"}`)
        .join(" > ")}`,
);

// item 4: the tap list in the config and in the page
const TAP_GROUPS = ["ale", "ipa", "lager", "other"];
const taps = Array.isArray(cfg.TAP_LIST) ? cfg.TAP_LIST : null;
const tapGroupsUsed = new Set((taps || []).map((t) => t.group));
report(
  !!taps &&
    taps.length === 13 &&
    taps.every((t) => t.brewery && t.beer && TAP_GROUPS.includes(t.group)) &&
    TAP_GROUPS.every((g) => tapGroupsUsed.has(g)),
  "TAP_LIST: 13 taps, every one in one of the four board groups, all four used",
  taps
    ? `${taps.length} taps, groups ${[...tapGroupsUsed].join("/")}`
    : "config does not export TAP_LIST",
);
const whosHere = elementHtml(html, "pf-whos-here");
const ontap = elementHtml(whosHere, "pf-ontap");
const tapRows = (ontap.match(/<li\b[^>]*\sdata-tap-group="/g) || []).length;
const tapPercents = context(stripTags(ontap), /%/g);
report(
  !!ontap && tapRows === 13 && tapPercents.length === 0,
  "On Tap renders inside Who's Here with 13 taps and no ABV percentages",
  !ontap
    ? "no #pf-ontap inside #pf-whos-here"
    : `${tapRows} rows${
        tapPercents.length ? `; % at ${tapPercents.join(" | ")}` : ""
      }`,
);
const quickLinks = [
  ...elementHtml(html, "pf-quicklinks").matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g),
].map((m) => ({
  href: attr(m[0].match(/^<a\b[^>]*>/)[0], "href"),
  label: stripTags(m[0]),
}));
const foodLink = quickLinks.find((l) => l.href === "#pf-whos-here");
report(
  !!foodLink && /Food & Drink/.test(foodLink.label),
  'the quick link to Who\'s Here reads "Food & Drink"',
  foodLink ? `"${foodLink.label}"` : "no quick link to #pf-whos-here",
);

// item 3: Bell's is pouring, so Bell's is a partner and on the beer garden card
const beerPartners = cfg.PARTNERS.filter((p) => p.group === "beer");
const beerGarden = cfg.AMENITIES.find((a) => a.id === "beer-garden");
report(
  beerPartners.length === 6 &&
    beerPartners.some((p) => p.name === "Bell's Brewery") &&
    !!beerGarden &&
    beerGarden.desc.includes("Bell's Brewery"),
  "six breweries in the beer partner group, Bell's among them and on the beer garden card",
  `${beerPartners.length} partners: ${beerPartners
    .map((p) => p.name)
    .join(", ")}`,
);

// item 9: the planning committee is its own group, and all of it volunteered
const volunteers = cfg.THANKS_GROUPS.find((g) => g.title === "Volunteers");
const committee = cfg.THANKS_GROUPS.find((g) =>
  /planning committee/i.test(g.title),
);
const volunteerNames = new Set(volunteers ? volunteers.names : []);
const committeeNotVols = (committee ? committee.names : []).filter(
  (nm) => !volunteerNames.has(nm),
);
report(
  !!committee && committee.names.length === 22 && committeeNotVols.length === 0,
  "planning committee: 22 names, every one also on the volunteer list",
  !committee
    ? "no THANKS_GROUPS entry titled planning committee"
    : `${committee.names.length} names${
        committeeNotVols.length
          ? `; not volunteers: ${committeeNotVols.join(", ")}`
          : ""
      }`,
);
report(
  !!volunteers &&
    volunteers.names.length === 88 &&
    volunteerNames.has("Chriss Funcheon") &&
    !volunteerNames.has("Chris Funcheon") &&
    volunteers.intro.includes(String(volunteers.names.length)),
  "volunteers: 88 names, Chriss Funcheon spelled right, intro count comes from the list",
  volunteers
    ? `${volunteers.names.length} names, Chriss ${volunteerNames.has(
        "Chriss Funcheon",
      )}, Chris ${volunteerNames.has("Chris Funcheon")}, intro has "${
        volunteers.names.length
      }" ${volunteers.intro.includes(String(volunteers.names.length))}`
    : "no Volunteers group",
);

// item 10: Follow & share has a section, a quick link, the Instagram profile
// and a Facebook sharer link
const followOk = {
  section: ids.has("pf-follow"),
  quickLink: quickLinks.some((l) => l.href === "#pf-follow"),
  instagram: html.includes(`href="${cfg.INSTAGRAM_URL}"`),
  sharer: /href="https?:\/\/(www\.)?facebook\.com\/sharer[^"]*"/.test(html),
};
report(
  Object.values(followOk).every(Boolean),
  "Follow & share: section, quick link, Instagram profile and Facebook sharer link",
  Object.entries(followOk)
    .filter(([, v]) => !v)
    .map(([k]) => `no ${k}`)
    .join(", ") ||
    `quick link "${quickLinks.find((l) => l.href === "#pf-follow").label}"`,
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

// item 1: the welcome team is at the fee booth, on every page of the site
const distHtml = distTextFiles().filter((f) => f.endsWith(".html"));
const splitHits = distHtml.filter((f) =>
  /welcome (team|tent) at the area split/i.test(fs.readFileSync(f, "utf8")),
);
report(
  splitHits.length === 0,
  '"welcome team/tent at the area split" appears nowhere in dist/',
  splitHits.map((f) => path.relative(DIST, f)).join(", ") ||
    `${distHtml.length} pages`,
);

// item 2: half the sponsor list is not a business
report(
  /these\s+businesses\s+and\s+organizations/i.test(html),
  'the sponsor line says "these businesses and organizations"',
);

// item 9, hard gate: the committee addresses are personal addresses and
// this is a public repository. Nothing but FOLP and state addresses on the
// page, and no personal-domain address anywhere in dist/, in the working
// diff, or in the commits that have not been pushed.
const PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "aol.com",
  "comcast.net",
  "hotmail.com",
  "outlook.com",
  "verizon.net",
  "icloud.com",
];
const personalEmail = new RegExp(
  `[A-Za-z0-9._%+-]+@(?:${PERSONAL_DOMAINS.map((d) =>
    d.replace(".", "\\."),
  ).join("|")})\\b`,
  "gi",
);
const anyEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const strangeEmails = [
  ...new Set(
    [...html.matchAll(anyEmail)]
      .map((m) => m[0])
      .filter((e) => !/@(friendsoflumspond\.org|delaware\.gov)$/i.test(e)),
  ),
];
report(
  strangeEmails.length === 0,
  "no email address on the page outside friendsoflumspond.org and delaware.gov",
  strangeEmails.join(", ") || "only FOLP addresses",
);
const hits = (s) => (s ? (s.match(personalEmail) || []).length : 0);
let distEmailHits = 0;
for (const f of distTextFiles())
  distEmailHits += hits(fs.readFileSync(f, "utf8"));
const diffEmailHits = hits(git(["diff", "HEAD"]));
const hasOrigin = git(["rev-parse", "--verify", "--quiet", "origin/main"]);
const logRange = hasOrigin ? ["origin/main..HEAD"] : ["-15"];
// %B keeps every commit message and patch and drops the Author: header,
// which is git metadata, not something a commit can scrub
const logEmailHits = hits(
  git(["log", "-p", "--no-color", "--format=%B", ...logRange]),
);
const logCount = (git(["log", "--oneline", ...logRange]) || "")
  .trim()
  .split("\n")
  .filter(Boolean).length;
report(
  distEmailHits + diffEmailHits + logEmailHits === 0,
  "no personal email address in dist/, the working diff, or the unpushed commits",
  `${distEmailHits} in dist, ${diffEmailHits} in the diff, ${logEmailHits} in ${logCount} commits${
    hasOrigin ? " since origin/main" : " (origin/main missing, last 15)"
  }`,
);

// item 3: the brewery is three words
report(
  !html.includes("JAKL Beerworks") && html.includes("JAKL Beer Works"),
  '"JAKL Beer Works", three words, and never "JAKL Beerworks"',
);

// item 3: the pumpkin donors and WSFS are thanked, with links. The ads rail
// is stripped first so Mr. Mulch's ad alt text cannot stand in for a credit.
const htmlNoAds = html.replace(
  /<ul class="pf-ads-rail"[^>]*>[\s\S]*?<\/ul>/gi,
  " ",
);
const missingThanks = ["Mr. Mulch", "Filasky", "The Local Buzz", "WSFS"].filter(
  (s) => !htmlNoAds.includes(s),
);
const missingPumpkinLinks = [
  "https://www.filaskyspumpkinpatch.com/",
  "https://www.thelocalbuzzde.com/",
].filter((u) => !html.includes(`href="${u}"`));
report(
  missingThanks.length === 0 && missingPumpkinLinks.length === 0,
  "Mr. Mulch, Filasky's, The Local Buzz and WSFS are thanked, and the pumpkin donors are linked",
  [...missingThanks, ...missingPumpkinLinks]
    .map((s) => `missing ${s}`)
    .join(", "),
);

// item 1: the accessibility answer names the enforcement team, not the split
const accessFaq = cfg.FAQ.find((f) => /wheelchair/i.test(f.question));
const accessAnswer = accessFaq ? accessFaq.answer : "";
report(
  !!accessFaq &&
    /enforcement team/i.test(accessAnswer) &&
    !/area split/i.test(accessAnswer) &&
    /enforcement team/i.test(text),
  "the accessibility FAQ sends people to the enforcement team, not the area split",
  accessFaq
    ? `enforcement team ${/enforcement team/i.test(
        accessAnswer,
      )}, area split ${/area split/i.test(
        accessAnswer,
      )}, on page ${/enforcement team/i.test(text)}`
    : "no FAQ question mentions wheelchair",
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
  js = true, // false: the no-JavaScript reader
  init, // runs before any page script, for stubbing navigator
  requests, // an array to collect every request URL into
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
  if (!js) await page.setJavaScriptEnabled(false);
  if (now) {
    await page.evaluateOnNewDocument((t) => {
      // freeze the clock: the page only ever asks Date.now()
      Date.now = () => t;
    }, now);
  }
  if (init) await page.evaluateOnNewDocument(init);
  if (requests) page.on("request", (r) => requests.push(r.url()));
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
      // only the stage sets here; the open mic and key time rows the panel
      // grew in item 7 have their own check below
      const rows = [...document.querySelectorAll("#pf-now [data-pf-state]")]
        .filter((r) => !r.dataset.pfKind || r.dataset.pfKind === "set")
        .map((r) => ({
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

const EVENT_NOW = T("2026-10-10T13:00:00-04:00");
const PREP_NOW = T("2026-09-01T12:00:00-04:00");
const showLazy = (page) =>
  page.addStyleTag({
    content: ".pf-section--lazy{content-visibility:visible!important}",
  });

// item 5: the hero collapses in event phase. The quick links fit in the
// first screen at 390×844 and the hero photo is never requested; in prep
// the photo and the hero buttons are still there. Fresh contexts so the
// cache cannot hide a request.
{
  const eventReqs = [];
  const page = await openPage({
    now: EVENT_NOW,
    fresh: true,
    requests: eventReqs,
  });
  await sleep(300);
  const quick = await page.evaluate(() => {
    const el = document.getElementById("pf-quicklinks");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top: Math.round(r.top),
      bottom: Math.round(r.top + r.height),
      vh: window.innerHeight,
      scrollY: window.scrollY,
    };
  });
  report(
    !!quick &&
      quick.scrollY === 0 &&
      quick.top >= 0 &&
      quick.bottom <= quick.vh,
    "event phase at 390×844: the quick links are on the first screen",
    quick
      ? `quick links ${quick.top}–${quick.bottom} of ${quick.vh}`
      : "no #pf-quicklinks",
  );
  const heroHits = eventReqs.filter((u) => u.includes("/pondfest/hero"));
  report(
    heroHits.length === 0,
    "event phase does not fetch the hero photo",
    heroHits.map((u) => u.replace(base, "/pondfest/")).join(", ") ||
      `${eventReqs.length} requests, none for /pondfest/hero`,
  );
  await page.browserContext().close();

  const prepReqs = [];
  const prep = await openPage({
    now: PREP_NOW,
    fresh: true,
    requests: prepReqs,
  });
  await sleep(300);
  const ctas = await prep.evaluate(() => {
    const el = document.querySelector(".pf-hero-ctas");
    return (
      !!el &&
      el.offsetParent !== null &&
      getComputedStyle(el).display !== "none"
    );
  });
  const prepHero = prepReqs.filter((u) => u.includes("/pondfest/hero"));
  report(
    prepHero.length > 0 && ctas,
    "prep phase still fetches the hero photo and shows the hero buttons",
    `hero requests ${prepHero.length}, buttons visible ${ctas}`,
  );
  await prep.browserContext().close();
}

// item 6: an area chip opens its map tab, the map decodes, the viewer lands
// at the 60px scroll margin, and the back gesture returns to the card
const chipSel = (id) => `a.pf-area-chip[data-pf-map="${id}"]`;
{
  const page = await openPage({ now: EVENT_NOW, fresh: true });
  const chip = await page.$(chipSel("area-2"));
  if (!chip) {
    report(false, "area chip opens its map tab", `no ${chipSel("area-2")}`);
    report(
      false,
      "browser back after a chip tap returns to the card",
      "no chip",
    );
  } else {
    await page.evaluate((el) => el.scrollIntoView({ block: "center" }), chip);
    await sleep(300);
    const before = await page.evaluate(() => window.scrollY);
    await chip.click();
    await sleep(600);
    const r = await page.evaluate(async () => {
      const tab = document.getElementById("pf-maptab-area-2");
      const panel = document.getElementById("pf-mappanel-area-2");
      const img = panel && panel.querySelector("img");
      let width = 0;
      // the map is fetched on demand, so give it up to 3s to decode
      for (let i = 0; i < 30 && !(width = img ? img.naturalWidth : 0); i++)
        await new Promise((r) => setTimeout(r, 100));
      const view = document.getElementById("pf-mapview");
      return {
        selected: !!tab && tab.getAttribute("aria-selected") === "true",
        shown: !!panel && !panel.hidden,
        width,
        top: view ? Math.round(view.getBoundingClientRect().top) : null,
      };
    });
    report(
      r.selected && r.shown && r.width > 0 && Math.abs(r.top - 60) <= 2,
      "area chip opens its map tab, the map decodes, and the viewer lands at 60px",
      `selected ${r.selected}, shown ${r.shown}, width ${r.width}, top ${r.top}`,
    );
    await page.evaluate(() => history.back());
    await sleep(600);
    const after = await page.evaluate(() => window.scrollY);
    report(
      Math.abs(after - before) <= 100,
      "browser back after a chip tap returns to the card",
      `scrollY ${before} → ${after}`,
    );
  }
  await page.browserContext().close();

  // deferral through the chip path: one src on first paint, one more per
  // distinct area opened (unless that area is the map that ships first)
  const p2 = await openPage({ now: EVENT_NOW, fresh: true });
  const withSrc = () =>
    p2.$$eval(
      "#pf-mapview img",
      (imgs) => imgs.filter((i) => i.getAttribute("src")).length,
    );
  const tapChip = async (id) => {
    const c = await p2.$(chipSel(id));
    if (!c) return false;
    await p2.evaluate((el) => el.scrollIntoView({ block: "center" }), c);
    await sleep(200);
    await c.click();
    await sleep(400);
    return true;
  };
  const firstMap = cfg.EVENT_MAPS[0].id;
  const c0 = await withSrc();
  const had1 = await tapChip("area-1");
  const c1 = await withSrc();
  const had3 = await tapChip("area-3");
  const c3 = await withSrc();
  const want1 = firstMap === "area-1" ? 1 : 2;
  const want3 = want1 + (firstMap === "area-3" ? 0 : 1);
  report(
    had1 && had3 && c0 === 1 && c1 === want1 && c3 === want3,
    "deferral holds through the chip path: one map src on first paint, one more per area opened",
    `first ${c0}, after area-1 ${c1} (want ${want1}), after area-3 ${c3} (want ${want3})${
      had1 && had3 ? "" : "; a chip is missing"
    }`,
  );
  await p2.browserContext().close();
}

// item 7: "on right now" covers the open mic and the key times, not just
// the stages. Rows carry data-pf-kind = set | openmic | keytime.
{
  const k9 = cfg.KEY_TIMES.find((k) => /K9/.test(k.title));
  const k9At = k9 ? k9.start : "12:00";
  if (k9At !== "12:00")
    note(
      `the K9 demonstration starts at ${k9At} in KEY_TIMES, so checking there`,
    );
  const slot1130 = cfg.OPEN_MIC_SLOTS.find((s) => s.time === "11:30 AM");
  const rowsAt = async (at) => {
    const page = await openPage({ now: T(`2026-10-10T${at}:00-04:00`) });
    const rows = await page.$$eval("#pf-now [data-pf-state]", (els) =>
      els.map((r) => ({
        act: r.dataset.pfAct,
        state: r.dataset.pfState,
        kind: r.dataset.pfKind,
      })),
    );
    await page.close();
    return rows;
  };
  const liveList = (rows) =>
    rows
      .filter((r) => r.state === "live")
      .map((r) => `${r.kind || "?"}:${r.act}`)
      .join("/") || "none";
  const atK9 = await rowsAt(k9At);
  const k9Row = atK9.find(
    (r) => r.kind === "keytime" && r.state === "live" && /K9/.test(r.act || ""),
  );
  report(
    !!k9Row,
    `clock at ${k9At}: the K9 demonstration is live as a key time`,
    k9Row ? `"${k9Row.act}"` : `live=${liveList(atK9)}`,
  );
  const at1135 = await rowsAt("11:35");
  const micRow = at1135.find((r) => r.kind === "openmic" && r.state === "live");
  report(
    !!slot1130 && !!micRow && micRow.act === slot1130.name,
    `clock at 11:35: the open mic row names ${
      slot1130 ? slot1130.name : "the 11:30 slot"
    }`,
    micRow ? `"${micRow.act}"` : `live=${liveList(at1135)}`,
  );
  const at1900 = await rowsAt("19:00");
  report(
    !at1900.some((r) => r.state === "live"),
    "clock at 19:00: no row of any kind is live",
    `live=${liveList(at1900)}`,
  );
}

// item 7, if it shipped: the two schedule views. event opens by time, prep
// by stage, the toggle switches, and with JavaScript off both are visible.
{
  const views = (page) =>
    page.evaluate(() => {
      const vis = (sel) => {
        const el = document.querySelector(sel);
        return !!el && !el.hidden && getComputedStyle(el).display !== "none";
      };
      return {
        time: vis('[data-pf-view="time"]'),
        stage: vis('[data-pf-view="stage"]'),
      };
    });
  const fmt = (v) => `time ${v.time}, stage ${v.stage}`;
  if (!/class="[^"]*\bpf-sched-views\b/.test(html)) {
    report(true, "schedule two-view toggle", "two-view toggle not shipped");
  } else {
    const inHtml =
      /\sdata-pf-view="time"/.test(html) && /\sdata-pf-view="stage"/.test(html);
    const ev = await openPage({ now: EVENT_NOW });
    const evViews = await views(ev);
    const toggle = await ev.$('button[data-pf-view-for="stage"]');
    if (toggle) {
      await ev.evaluate((el) => el.scrollIntoView({ block: "center" }), toggle);
      await toggle.click();
      await sleep(200);
    }
    const evAfter = await views(ev);
    await ev.close();
    const pr = await openPage({ now: PREP_NOW });
    const prViews = await views(pr);
    await pr.close();
    const nojs = await openPage({ now: EVENT_NOW, js: false });
    const nojsViews = await views(nojs);
    await nojs.close();
    report(
      inHtml &&
        evViews.time &&
        !evViews.stage &&
        prViews.stage &&
        !prViews.time,
      "both schedule views are in the HTML: event opens by time, prep by stage",
      `in html ${inHtml}; event ${fmt(evViews)}; prep ${fmt(prViews)}`,
    );
    report(
      !!toggle && evAfter.stage && !evAfter.time,
      "the schedule toggle switches to the stage view",
      toggle ? fmt(evAfter) : "no button[data-pf-view-for=stage]",
    );
    report(
      nojsViews.time && nojsViews.stage,
      "with JavaScript off both schedule views are visible",
      fmt(nojsViews),
    );
  }
}

// item 8: Show more only where the description overflows, and no clamp at
// all for the no-JavaScript reader
{
  const page = await openPage({ now: EVENT_NOW });
  await showLazy(page);
  await page.evaluate(() =>
    document.getElementById("pf-expect")?.scrollIntoView(),
  );
  await sleep(600);
  const clamp = await page.evaluate(() => {
    // the card's Show more: a button.pf-amen-more after the description
    const btnFor = (d) =>
      [...d.parentElement.querySelectorAll("button.pf-amen-more")].find(
        (b) => d.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    const wrong = [];
    let clamped = 0;
    let plain = 0;
    document.querySelectorAll(".pf-amen-desc").forEach((d, i) => {
      const b = btnFor(d);
      if (d.hasAttribute("data-pf-clamp")) {
        clamped += 1;
        if (
          !b ||
          b.getAttribute("aria-expanded") !== "false" ||
          !b.getAttribute("aria-controls")
        )
          wrong.push(`card ${i + 1} clamped without a proper button`);
      } else {
        plain += 1;
        if (b) wrong.push(`card ${i + 1} has a button but no clamp`);
      }
    });
    return { clamped, plain, wrong };
  });
  report(
    clamp.clamped > 0 && clamp.plain > 0 && clamp.wrong.length === 0,
    "Show more appears only on amenity cards whose description overflows",
    `${clamp.clamped} clamped, ${clamp.plain} plain${
      clamp.wrong.length ? `; ${clamp.wrong.slice(0, 3).join("; ")}` : ""
    }`,
  );
  const opened = await page.evaluate(async () => {
    const d = document.querySelector(".pf-amen-desc[data-pf-clamp]");
    const b =
      d &&
      [...d.parentElement.querySelectorAll("button.pf-amen-more")].find(
        (b) => d.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    if (!b) return null;
    b.scrollIntoView({ block: "center" });
    b.click();
    await new Promise((r) => setTimeout(r, 200));
    return {
      expanded: b.getAttribute("aria-expanded"),
      scrollHeight: d.scrollHeight,
      clientHeight: d.clientHeight,
    };
  });
  report(
    !!opened &&
      opened.expanded === "true" &&
      opened.scrollHeight <= opened.clientHeight + 2,
    "Show more reveals the full text and flips aria-expanded",
    opened
      ? `aria-expanded ${opened.expanded}, ${opened.scrollHeight} <= ${opened.clientHeight} + 2`
      : "no clamped card to open",
  );
  const shots = await page.$$(".pf-amen-card");
  for (let i = 0; i < Math.min(3, shots.length); i++)
    await shots[i].screenshot({
      path: path.join(SHOTS, `390-event-amenity-${i + 1}-open.png`),
    });
  await page.close();

  const nojs = await openPage({ now: EVENT_NOW, js: false });
  await showLazy(nojs);
  await sleep(300);
  const plain = await nojs.evaluate(() => {
    const descs = [...document.querySelectorAll(".pf-amen-desc")];
    return {
      total: descs.length,
      clamped: descs.filter((d) => d.hasAttribute("data-pf-clamp")).length,
      cut: descs.filter((d) => d.scrollHeight > d.clientHeight + 2).length,
    };
  });
  report(
    plain.total > 0 && plain.clamped === 0 && plain.cut === 0,
    "with JavaScript off no amenity description is clamped",
    `${plain.total} cards, ${plain.clamped} clamped, ${plain.cut} cut off`,
  );
  await nojs.close();
}

// item 10: Share and Copy caption, with the share sheet and the clipboard
// stubbed so we can read what they were handed; then the page as a browser
// without navigator.share sees it
{
  const stub = () => {
    navigator.share = (d) => {
      window.__shared = d;
      return Promise.resolve();
    };
    navigator.canShare = () => true;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: (s) => {
          window.__copied = s;
          return Promise.resolve();
        },
      },
    });
  };
  const page = await openPage({ now: EVENT_NOW, init: stub });
  await showLazy(page);
  const press = (sel) =>
    page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      el.scrollIntoView({ block: "center" });
      el.click();
      return true;
    }, sel);
  const hadShare = await press("#pf-follow button[data-pf-share]");
  await sleep(300);
  const hadCopy = await press("#pf-follow button[data-pf-copy]");
  await sleep(300);
  const got = await page.evaluate(() => ({
    shared: window.__shared || null,
    copied: typeof window.__copied === "string" ? window.__copied : null,
  }));
  const hasTags = (s) => cfg.HASHTAGS.every((t) => (s || "").includes(t));
  report(
    hadShare &&
      !!got.shared &&
      hasTags(got.shared.text) &&
      /\/pondfest/.test(got.shared.url || ""),
    "Share hands navigator.share both hashtags and the page URL",
    !hadShare
      ? "no #pf-follow button[data-pf-share]"
      : got.shared
      ? JSON.stringify(got.shared).slice(0, 160)
      : "navigator.share was not called",
  );
  report(
    hadCopy &&
      got.copied !== null &&
      hasTags(got.copied) &&
      got.copied.includes("/pondfest"),
    "Copy caption puts both hashtags and the page URL on the clipboard",
    !hadCopy
      ? "no #pf-follow button[data-pf-copy]"
      : got.copied !== null
      ? `"${got.copied.slice(0, 120)}"`
      : "writeText was not called",
  );
  await page.close();

  const noShare = await openPage({
    now: EVENT_NOW,
    init: () => {
      delete Navigator.prototype.share;
      delete Navigator.prototype.canShare;
      delete navigator.share;
    },
  });
  await showLazy(noShare);
  await sleep(200);
  const controls = await noShare.evaluate(() => {
    const vis = (el) =>
      !!el &&
      !el.hidden &&
      el.offsetParent !== null &&
      getComputedStyle(el).display !== "none";
    return {
      share: vis(document.querySelector("#pf-follow button[data-pf-share]")),
      facebook: !!document.querySelector(
        '#pf-follow a[href*="facebook.com/sharer"]',
      ),
      copy: !!document.querySelector("#pf-follow button[data-pf-copy]"),
    };
  });
  report(
    !controls.share && controls.facebook && controls.copy,
    "without navigator.share the Share button is gone and Facebook and Copy remain",
    `share shown ${controls.share}, facebook ${controls.facebook}, copy ${controls.copy}`,
  );
  await noShare.close();
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

// 19: weight on a cold load, in both phases: the hero photo should only be
// in the prep number, and the difference says what dropping it bought
{
  const weigh = async (now) => {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
    });
    await page.evaluateOnNewDocument((t) => {
      Date.now = () => t;
    }, now);
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
    await page.close();
    await ctx.close();
    return { own, total };
  };
  const mb = (b) => (b / 1024 / 1024).toFixed(2);
  const event = await weigh(EVENT_NOW);
  const prep = await weigh(PREP_NOW);
  report(
    event.own <= 1.2 * 1024 * 1024,
    "first paint stays under 1.2 MB from this site",
    `event ${mb(event.own)} MB from this site, ${mb(
      event.total,
    )} MB total including Font Awesome`,
  );
  note(
    `prep-phase first paint ${mb(prep.own)} MB from this site; event is ${mb(
      prep.own - event.own,
    )} MB lighter`,
  );
}

// 20: screenshots for a person to look at
{
  // the sections this round changed, in both phases: prep matters because
  // these have to still be right when EVENT_DATE moves and nobody is watching
  const shootChanged = async (page, width, phase) => {
    const targets = [
      ["hero", ".pf-hero"],
      ["whos-here", "#pf-whos-here"],
      ["thanks", "#pf-thanks"],
      ["follow", "#pf-follow"],
    ];
    for (const [name, sel] of targets) {
      const el = await page.$(sel);
      if (el)
        await el.screenshot({
          path: path.join(SHOTS, `${width}-${phase}-${name}.png`),
        });
    }
    const cards = await page.$$(".pf-amen-card");
    for (let i = 0; i < Math.min(3, cards.length); i++)
      await cards[i].screenshot({
        path: path.join(SHOTS, `${width}-${phase}-amenity-${i + 1}.png`),
      });
  };
  const scrollThrough = (page) =>
    page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
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
    await scrollThrough(page);
    await sleep(800);
    await page.screenshot({ path: path.join(SHOTS, `${width}-event-top.png`) });
    for (const id of sections) {
      const el = await page.$(`#${id}`);
      if (el)
        await el.screenshot({ path: path.join(SHOTS, `${width}-${id}.png`) });
    }
    await shootChanged(page, width, "event");
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
      await scrollThrough(p);
      await sleep(400);
      const phase = await p.evaluate(
        () => document.documentElement.dataset.pfPhase,
      );
      await p.screenshot({
        path: path.join(SHOTS, `${width}-${name}-top.png`),
      });
      if (name === "prep") await shootChanged(p, width, "prep");
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
