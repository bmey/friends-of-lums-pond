# Pond Fest 2026 — Day-Of Build Brief

**Written 9 Oct 2026, ~23:00 ET. The festival opens at 11:00 AM on 10 Oct 2026.**

This is the execution brief for the day-of update to `/pondfest`. It exists because
a first attempt went straight to building without a plan, got most of the way, and
was parked. Everything that attempt learned is written down here so none of it has
to be rediscovered under time pressure.

---

## How to start the session

**This is a one-shot brief.** It is written to be completed in a single session,
start to finish, not split into phases across sessions. Open a session in this
repo and paste the block below. Everything it needs is in this file; it should not
need to re-read the original request or come back for more instructions.

> I'm shipping the day-of update to the Pond Fest page. The festival opens at
> 11 AM tomorrow and the page is the event program — there are no printed
> programs this year, and the QR code on every flyer and yard sign points at
> `friendsoflumspond.org/pondfest`. A few thousand people will read it on phones,
> on park cell data, while standing in a field.
>
> Read `src/data/pondfest/DAY-OF-BRIEF-2026.md` first. It has the full scope, the
> constraints, the decisions already made, every piece of source data already
> transcribed, and what to salvage from the `pondfest-dayof-wip` branch.
>
> Do the whole thing in this one session, end to end. Don't stage it across
> sessions, don't stop to hand off, and don't end a turn with a plan or a promise
> about work you haven't done. Plan your approach, then execute it.
>
> Build each section's markup, styles and behavior together and check it in a
> real browser before starting the next one. A section that compiles but has no
> working JavaScript is not done.
>
> Delegate independent subtasks to subagents and keep working while they run. The
> page and the config are single shared files, so keep every edit to `src/` in your
> own hands and fan out only genuinely separable work.
>
> This page is read by a small community who know each other, and they are quick
> to spot work that reads as machine-written. §10 covers what that means for the
> copy, the styling, the commits and the assets. Treat it as a requirement, not a
> style note.
>
> §11 is the exit condition. Write its verification script early, run it as you
> go, and do not tell me the work is done until it exits clean on a fresh build.
> A subagent reporting success is a claim; re-run the check yourself before you
> believe it.
>
> Before reporting progress, audit each claim against a tool result from this
> session. Only report work you can point to evidence for; if something is not yet
> verified, say so. Pause for me only when the work genuinely requires it: a
> destructive action, a real scope change, or something only I can answer. If you
> hit one of those, ask and end the turn rather than ending on a promise.
>
> Commit as you go. Do not push — I'll review and push once at the end.

---

## 1. Why this matters, in one paragraph

Friends of Lums Pond is an all-volunteer 501(c)(3). Pond Fest is its signature
fundraiser, this year aiming at $30,000 for youth scholarships and an adaptive
kayak launch. 2026 is the biggest one yet: ~2,500 people expected across three
separate park areas for the first time. Printed programs were deliberately
dropped — the welcome team hands out QR flyers instead — so if someone cannot
find the map, the set times, or where to eat on this page, there is no fallback.
That is the whole job.

## 2. Constraints that are not up for debate

**One URL.** Everything day-of goes on `/pondfest`. The press kit at
`/pondfest/press` tells media the QR "doubles as the day-of program", and the
code is already printed on signs. Do not create a separate day-of page. (There is
an old `/resources/pf-live2025` from last year — it is a historical record, not a
model to follow.)

**Page weight.** Previous work got `/pondfest` to roughly 0.95 MB on first paint
and 3.69 MB fully scrolled, on purpose, because of the cell-data problem above.
The six display maps alone are 994 KB and the seven ad thumbnails another 290 KB.
**Only the first map may load with the page.** The rest must be fetched on first
tab-open (a `data-src` swap works; do not rely on `loading="lazy"` inside a hidden
container, which is not guaranteed to defer).

**Mobile is the real design.** Phone layout first, desktop as the special case.
Navigation and findability matter far more than looking good.

**Existing conventions.** Astro 5, Tailwind v4, deployed to GitHub Pages. Content
lives in `src/data/pondfest/config.ts`; `UPDATING.md` beside it is written for
non-technical volunteers and should be updated for anything new they will edit.
`publicImageSize()` in `imageSize.ts` reads real pixel dimensions at build time —
use it so images reserve their space and the page does not jump under a thumb.

## 3. Decisions Bryan already made — do not reopen these

| Question | Decision |
|---|---|
| Mobile navigation | **Convert the existing sticky top bar into a bottom tab bar on phones.** Do not add a second bar. The page already has a fixed top bar, a "Jump to" bottom sheet and a back-to-top button; a new bottom bar collides with all three. Desktop unchanged. |
| Sponsor ads | **Swipeable thumbnail rail that opens full size on tap**, plus a link to the Out & About feature. Not a separate page, not links-only. |
| Deploying | **Commit freely, push once at the very end.** Bryan reviews first. |
| Food trucks | List supplied, by area. It is in §6 below. |

## 4. What is already done

**On `main` (commit `d26571f`), assets only — nothing references them yet:**

- `public/pondfest/maps/` — `full`, `area-1`, `area-2`, `area-3`, `shuttle-park`,
  `shuttle-campground`, each as `<name>.webp` (display, ≤1800px wide) and
  `<name>-lg.webp` (tap-to-enlarge, ≤2600px). All verified legible at 1:1.
- `public/pondfest/ads/` — seven sponsors, each `<slug>-thumb.webp` (≤600px) and
  `<slug>.webp` (≤1400px). Slugs: `christiana-care`, `union-park`, `mr-mulch`,
  `premier-paws`, `little-bear`, `rainbow-records`, `eric-morrison`.
- `public/pondfest/pond-fest-2027.ics` — save-the-date, Sat 9 Oct 2027, 11–6 ET.

Raw source art is in `to-process/` and is deliberately **not** in git (32 MB).

**On branch `pondfest-dayof-wip` (commit `7a10393`) — a partial build that
compiles.** Salvage from it freely; it is there to be mined, not merged as-is.

| Worth taking almost verbatim | Needs judgment | Missing entirely |
|---|---|---|
| `src/data/pondfest/winners.ts` — self-contained, see §5 | The schedule / map / vendor section markup and CSS | Mobile bottom tab bar |
| The day-of type definitions in `types.ts` | Section placement and ordering | The "on right now" clock script |
| All the config data in §6, already keyed and formatted | | Map tab switching script |
| The build-time set-time parser (`"12:45 – 2:00 PM"` → `12:45`/`14:00`, verified correct on all 11 sets) | | Ad lightbox script |

The gap is the obvious one: that attempt wrote all the markup and none of the
JavaScript, so the schedule has no live state and the map tabs do not switch.

## 5. The winners mechanism — treat this as a first-class requirement

Bryan needs to publish raffle, 50/50 and silent auction winners **from his phone,
in a field, under time pressure**, and have them appear prominently within minutes.

The timing that drives it: entries close at **3:00 PM**, winners are announced at
**4:00 PM** online and on a yard sign at the raffle table in Area 1, and winners
have until **5:00 PM** to collect before unclaimed prizes are redrawn among people
still at the fest.

`winners.ts` on the branch solves this and should be reused. Its design rationale:

- **Plain text, not TypeScript literals.** One line per winner, `Prize | Winner`.
  No quotes, no commas, no brackets. A stray comma in an object literal fails the
  build and takes the live site's next deploy with it; a malformed text line just
  renders oddly. On event day that difference is the whole point.
- Winner may be a name *or* a ticket number — raffle winners can be either, 50/50
  is always a number, auction is always a name. A line with no `|` is treated as a
  bare winner with no prize name.
- `WINNERS_LIVE` is a single boolean gate: flipping it reveals the winners section,
  adds a banner at the very top of the page linking down to it, and puts "Winners"
  first in the day-of menu. One edit, not four.
- Blank lines ignored, `#` lines are private notes.

Give him the direct phone-editable link in `UPDATING.md`:
`https://github.com/bmey/friends-of-lums-pond/edit/main/src/data/pondfest/winners.ts`

**The rebuild delay is fine — Bryan confirmed it.** A GitHub Pages rebuild takes a
few minutes, and he will be working nearby and posting ahead of the 4:00
announcement rather than at it. Build the simple commit-and-rebuild version. Do
not reach for a client-fetched JSON file or a published Google Sheet to shave
minutes off; it is more moving parts for no benefit he needs.

## 6. Source data — all transcribed and verified

Everything below was read off the supplied graphics and is in the branch's
`config.ts` already formatted. The graphics themselves are in `to-process/`.

### Music schedule

Three stages. Already applied to `LINEUP` as `stage` and `time` fields — the
existing `Performer` type supports both and renders them as badges, so this needs
no new rendering code. Acts are reordered by set time.

| Time | Wingspan (Area 1) | Monarch (Area 1) | Nest Box (Area 2) |
|---|---|---|---|
| 11:00–12:15 | The Sarah Koon Band | Brian Corcoran | — |
| 12:00–1:00 | — | — | Scott & Tammy |
| 12:45–2:00 | Camp | Cher's Playground | — |
| 1:30–2:30 | — | — | Dansino |
| 2:30–3:45 | Guilt 45 Band | Benny Preston | — |
| 3:00–4:00 | — | — | Mauka & Makai |
| 4:15–5:30 | Hippocampus | Billy Pierce Band | — |

Bryan asked for this to be interactive — tap a band for photos, blurb and socials
— replacing the static lineup. All 11 acts already have photos and blurbs in
`config.ts`; the branch links schedule rows to per-act anchors on the existing
cards, which is a cheap way to get there.

### Open mic — Area 1, hosted by OMAD, all day

11:30 Adam Molden · 12:00 James McCloskey · 12:30 Marco Arcana · 1:00 Jaid ·
1:30 Tim Hynson · 2:00 Darren Michener · 2:30 Pete Richardson · 3:00 Lynne Gong ·
3:30 Joe X Brand · 4:00 Strays & Misfits · 4:30 Khristian Chesney · 5:00 Landfall ·
5:30 Orlando Duran

### Food trucks, by area

- **Area 1** — DeMex Street Foods · Carl's Gourmet Hots & Sandwiches · Dixie's Down
  Home Cooking · Kona Ice · Backyard Squeeze · Two Friends Coffee · Savage Delight
  Food Truck
- **Area 2** — We Aim to Cheese · Sippin on Sunshine · Woody's on Wheels · Bruster's
  Ice Cream Truck · Angel's Kitchen
- **Area 3** — Donut NV · UDairy Creamery Truck · Koi on the Go

### First responders — Area 3, 11 agencies

Delaware Capitol Police · Delaware Department of Correction · Delaware River & Bay
Authority Police · Delaware State Police · Division of Alcohol & Tobacco
Enforcement · Marshalls · New Castle County Police · Newark Police Department ·
Townsend Police Department · Volunteer Hose Company · Wilmington Police Department

### Craft vendors and nonprofits — Area 1, 38 of them

3D Layer Foundry · Art By M. Johnston · Backyard Squeeze · Beaded Expressions ·
Becca Roberts Studio · Bright Ideas Graphics · Buds Bait & Tackle · Cakepops by
Tori · Cherished Crystal Treasures · Cheyla's Rescue Foundation · DiLi Creations ·
Dying to Impress · Elayne James Salon · GIFTMOOR LLC · Kails Craft Co · Krafty
Khaos · Little Garden Inkwell · Love Lee Boutique · MadeByMissTish · Megan's
Creations · MJMBOOKS · NCC Libraries (Bear Library) · Not Broken, Just Custom ·
Ohana Bonded Forever LinkSmith · One Creation International · PAWS for People ·
PraPari and Co · Russ's Angels · Sasnspice Sweets · Scentsy · Shilpifinearts · The
Bewitching Beetle · The Healing Garden Botanical Apothecary · The Witches of the
Eastt · Thorin's Promise · ToodleBug Design · William Francis · Woodhill Hives, LLC

### Key times

11:00 gates and first sets · 11:30 open mic starts · 12:00 **K9 demonstration,
Area 3** · 12:00 Kids Entrepreneur Market opens (to 4:00) · 12:00 pickleball ladder
beginner/intermediate (to 2:00) · 12:00 horseshoes (to 5:00) · 2:30 pickleball
advanced (to 4:30) · **3:00 raffle, 50/50 and auction close** · **4:00 winners
announced** · **4:00 Eagle Scout bench dedication, Area 2** · **5:00 last call to
claim prizes** · 5:30 final sets end · 6:00 festival ends

### Eagle Scout acknowledgement

Thomas Carpenter built and installed benches at the pickleball courts as his Eagle
Scout service project; they are dedicated at 4:00 PM in Area 2. Bryan wasn't sure
how to word it.

**Get the funding right.** Thomas did his own fundraising for the majority of the
project. Friends of Lums Pond partly sponsored and funded it, but it is his
project and his money that built it — do not write anything that reads as though
FOLP paid for the benches, and do not write that he funded all of it either. The
branch uses:

> The benches at the pickleball courts are new this year, and they are Thomas
> Carpenter's Eagle Scout service project. He designed them, raised most of the
> money for them himself, and built and installed them, with Friends of Lums Pond
> covering part of the cost. They are here for good. We are dedicating them at
> 4:00 in Area 2 — come and sit down.

Offer Bryan a shorter alternative; he may want his own words.

### Thank-yous

- **Volunteers** — around 100 people. Bryan will supply the full list later, so
  render the group with its thank-you text and an empty name list that fills in
  when the array is populated. Keep the footprint small.
- **Sound engineers** — Dave Muddiman (Starground Audio), Ernie Bouey (PawPrint
  Productions), Keith Thompson (Vice Squad)
- **Emcees and DJs** — DJ DLyte, Tom the Spokesman
- **Partner organizations, Delaware State Parks staff, Natural Resources Police** —
  already in `PARTNERS` in `config.ts` under the `agency` group. Do not duplicate
  them; check before adding.

### Links

- Feedback survey — `https://forms.gle/WiB4UH4xDt9XQbjh8`
- Membership — `https://donorbox.org/friends-of-lums-pond`, $10/year, info page at
  `/resources/membership`
- Out & About feature — **"Park People" by David Ferguson**, pages 29–30 of the
  October 2026 issue: `https://outandaboutnow.com/park-people/` (plain web page,
  much better on cell data than the flipbook). Flipbook deep link, if wanted:
  `https://issuu.com/outandabout/docs/live_local/29` — note issuu needs the page as
  a path segment, `?page=29` is ignored. **This was verified by OCR of the whole
  issue**, so "we were featured" is accurate. Two cautions: the issue's cover story
  "Live & Local: Hear Here" is a *different* article that does not mention Pond
  Fest, and the print version of "Park People" has a typo in its closing line
  giving the hours as 11am–2pm. Don't quote that line.
- 2027 save-the-date — Saturday 9 October 2027 (confirmed a Saturday), 11–6. `.ics`
  is already committed; a Google Calendar template URL is in the branch config.

## 7. Things to flag to Bryan — do not silently decide these

**Already settled, do not reopen:** the first-responder list reads **"Marshalls"**
because that is the name Bryan was given for the agency. It is not a typo for
U.S. Marshals. Leave it exactly as it is.


1. **"Delaware capital police"** was corrected to **Delaware Capitol Police**, the
   agency's actual name.
2. **"Volunteer hose co."** was rendered as **Volunteer Hose Company**. There is a
   Volunteer Hose Company in Middletown; confirm it is that one.
3. **Backyard Squeeze appears twice** — as an Area 1 food truck and in the craft
   vendor graphic. Currently listed in both. Ask which he wants.
4. **"Nestbox" vs "Nest Box"** — the printed map says `Stage: Nestbox`, existing
   site copy says "the Nest Box pavilion". The branch uses "Nest Box". Trivial, but
   people will be comparing the page against the printed map.
5. **Vendor names are transcribed verbatim** from the graphic, including
   "Sasnspice Sweets", "The Witches of the Eastt", and "Ohana Bonded Forever
   LinkSmith" — that last one may be two separate vendors on one line.
6. **The open mic graphic has a typo**, "Original Music Association **OD**
   Delaware". Transposing it to HTML fixes it silently, which is correct, but worth
   telling OMAD.

## 8. Deploying

**`git push` over SSH currently fails** — `ssh-add -l` reports no identities. The
`gh` CLI is authenticated over HTTPS with `repo` scope, so this works without
touching the saved remote:

```
git -c credential.helper='!gh auth git-credential' push https://github.com/bmey/friends-of-lums-pond.git main
```

Bryan can also just run `ssh-add` first. Either way: **he pushes, not you.**

**The live site is two commits behind.** `a9961dd` and `0c0a52b` — the open mic,
special thanks and masonry amenity grid work — are on local `main` but not
deployed; "Open Mic" does not appear on the live page today. Whatever ships
tomorrow carries those along with it. Worth telling him before he pushes.

GitHub Actions rebuilds and deploys on push to `main`, taking roughly 3 minutes.

## 9. Driving a browser in this repo

The mechanics. **What** to check is §11, which is the exit condition for the job.

Do not trust the built HTML alone — Bryan reviews rendered output closely and has
previously caught things that only show up in a real browser (a `mailto:` opening
in a dead new tab; an icon inside a text link).

The documented method for this repo: there is no Playwright or Puppeteer, but
Chrome is at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Install
`puppeteer-core` **in the session scratchpad, not the repo**, and launch with that
`executablePath`. Serve the build with
`python3 -m http.server 4173 --directory dist` and busy-wait on `curl` rather than
sleeping.

Two gotchas that will waste your time otherwise:

- Sections use `content-visibility: auto` (`.pf-section--lazy`). A full-page
  screenshot shows them **blank** unless you first inject
  `.pf-section--lazy{content-visibility:visible!important}` and scroll the page once.
- Plain `chrome --headless --screenshot` with a tall window is useless here: the
  hero is `min-height: max(85vh, 780px)` and expands to fill it. Use puppeteer
  `setViewport` at 390×844 and 1440×900 with `fullPage: true`.

Check at minimum: the bottom tab bar does not cover content or collide with the
back-to-top button; map tabs switch and deferred maps actually load on first open;
the clock script shows the right set when you override `Date.now` via
`page.evaluateOnNewDocument`; and the winners section and banner appear when
`WINNERS_LIVE` is flipped and vanish when it is not.

## 10. Don't let it read as machine-made

Pond Fest's audience is a few thousand neighbors in one corner of Delaware. Many
of them know the board personally. This is also a public repo for a volunteer
nonprofit, so the commit history is part of the public face. People are primed to
notice work that looks generated, and noticing it costs trust that is slow to earn
back. Treat this as a requirement of the job.

The reliable way through is not a list of banned words — it is to **match what is
already there**. The page has a voice and a visual vocabulary built over three
years. Read a few existing sections of `index.astro` and `config.ts` before
writing anything, and sound like them.

**Copy.** The house voice is plain, concrete and a bit dry. It names specific
things, trusts the reader, and occasionally has a joke in it. Look at the existing
amenity descriptions: *"a stage sized for people who are three feet tall"*,
*"Handy when someone has had enough of standing in lines."* That is the register.

Things that break it: promotional throat-clearing (*"Get ready for an
unforgettable day!"*), the rule of three applied to everything, *"whether you're a
X or a Y, there's something for everyone"*, *"more than just a festival"*, *"dive
in"*, *"vibrant"*, *"seamless"*, *"nestled"*, *"curated"*, *"elevate"*, and
exclamation marks used as enthusiasm rather than punctuation. Also: every heading
in Title Case, bulleted lists where a sentence would do, and sentences that
restate the heading they sit under. Write the shortest true thing and stop.

**Dialect.** American English, as spoken on the East Coast — Delaware, Maryland,
southeastern Pennsylvania. This is a Delaware nonprofit writing to its own
neighbors, so British spellings and constructions read as imported text and are a
giveaway. Watch for: *programme* (program), *organisation* (organization),
*colour* (color), *behaviour* (behavior), *optimise* (optimize), *judgement*
(judgment), *cheque* (check), *neighbour* (neighbor), *whilst* (while), *amongst*
(among), *grey* (gray). Phrasing matters as much as spelling: *"on the day"* is
British — write *"on event day"* or *"that day"*; *"just turn up"* should be
*"just show up"*; *"collect your prize"* should be *"pick up your prize"*. Local
usage to get right: it is **DelMarVa**, the park is in **Bear**, and *Route 896*
and *Red Lion Road* are how people say them.

A pass over the repo on 9 Oct 2026 fixed a dozen of these in live copy, code
comments and `UPDATING.md`. **The `pondfest-dayof-wip` branch predates that pass**,
so anything lifted from it needs re-checking — `cheque` in particular survives in
its `config.ts` and `types.ts` comments.

**No kicker labels above headings.** The small uppercase line that used to sit
above every section heading ("The Experience", "Thank You", "Questions") is a
stock template pattern people recognize on sight, and it was removed from all
four Pond Fest pages on 9 Oct 2026 — the `.pf-eyebrow` class no longer exists.
Do not reintroduce it under a new name. A section heading should say what the
section is and stand on its own; if it needs a kicker to make sense, rewrite the
heading. The sponsor tier labels ("Diamond Sponsors") are a different thing and
stay — they label the list underneath rather than decorating a heading.

**Facts.** Never invent one to fill a gap — not a food truck, not a time, not a
sponsor's web address, not a photo credit. The existing config comments say this
repeatedly because it has bitten before. A missing detail is fine; a wrong one is
not, and on a day-of page a wrong time sends someone to the far side of a park for
nothing. If something is unknown, leave it out and flag it.

**Styling.** Use the palette and components already defined — `--pf-purple`,
`--pf-teal`, `.pf-section--dark/light/purple`, the existing card and chip patterns.
Do not introduce a new visual idiom for a new section. Specifically avoid the
generic AI-product look: glassmorphism, oversized border radii, multi-stop
gradients on everything, heavy drop shadows, emoji used as icons (the page uses
Font Awesome — stay with it), and animated gradient headers. The page is already
on-brand; new sections should be invisible as additions.

**Assets.** No generated or stock-looking imagery. Every photo on this page is a
real one from a real Pond Fest or a credited source, and the credit rules in
`UPDATING.md` are strict for a reason. Alt text describes what the picture
actually shows, in a sentence a person would say out loud — not keyword soup, and
not a restatement of the caption.

**Commits.** Write them the way a maintainer would: a short subject line saying
what changed, and a body explaining why, only where the why isn't obvious. No
emoji, no "Generated with" footers, no exhaustive bullet inventory of every file
touched, no marketing tone. Match the existing log — `git log --oneline -20` shows
the house style (*"Pond Fest 2026: correct which activities are new"*).

One thing to settle with Bryan rather than decide for him: the `Co-Authored-By`
trailer. It is honest attribution and the normal convention, but it is also
permanently visible in a public repository for a nonprofit, which is exactly the
surface he is asking about. Ask him whether he wants it on these commits. Don't
quietly drop it — that is a disclosure decision and it is his to make.

**And the obvious one.** No "as an AI", no meta-commentary about the page or the
process anywhere in the output, and nothing on the live site that describes how it
was built.

### Delegate this part

The copy pass is the one piece of this job that fans out cleanly, because it
touches files nothing else in this build needs: `src/pages/about/`,
`src/pages/resources/`, `src/content/blog/`, and the older `/resources/pondfest*`
pages. Hand a subagent the sweep of everything **outside** `src/pages/pondfest/`
and `src/data/pondfest/`, and keep those two directories yourself, since that is
where you are already editing and a second writer there will collide with you.

Give the subagent the §10 rules and the em-dash replacement guidance, and tell it
to leave band blurbs alone: those are the artists' own words about themselves,
supplied by them, and are not ours to rewrite. Same for the sponsor disclosure
text, which the board approved as written.

When it reports back, **re-run the grep yourself** before believing it. That is
checks 6 through 9 in §11.

Scale, as of this writing: about 175 em-dashes across the repo, the largest
concentrations being this brief (71), `src/pages/about/history.astro` (35),
`src/pages/pondfest/index.astro` (20) and `src/data/pondfest/config.ts` (19).
Thirteen en-dashes exist and all of them are time ranges; they stay.

## 11. Validation: the session does not end until this passes

The first attempt produced a page that built cleanly and did not work. A green
build proves the markup parses. It proves nothing about whether a tab switches,
whether an image loads, or whether the clock shows the right band. So the exit
condition for this job is not "it builds" and not "the subagents reported done".

**Write `scripts/verify-dayof.mjs` early, before most of the page exists.** It
should run every check below, print one line per check, and exit non-zero if any
fail. Run it after each section you finish, not only at the end. You may not
report the work complete until it exits 0 on a fresh build.

**Treat every subagent report as a claim and re-verify it yourself.** If an agent
says it removed all the em-dashes, the orchestrator runs the grep. If an agent
says the images are optimized, the orchestrator stats the files. An agent's
summary is a starting point for a check, never a substitute for one.

### Tier 1 — structure (fast, run constantly)

1. `npm run build` exits 0.
2. Every expected section id is present in `dist/pondfest/index.html`.
3. **Counts match the data.** 11 acts, 13 open mic slots, 15 food trucks,
   38 vendors, 11 agencies, 13 key times, 7 sponsor ads, 6 maps. A silently
   dropped array is the easiest failure to miss by eye and the easiest to catch
   here.
4. **Every in-page anchor resolves.** Collect every `href="#..."` in the built
   HTML and assert an element with that id exists. This is what catches a
   schedule row pointing at a band anchor that was never rendered.
5. **Every referenced asset exists.** Each `src` and `data-src` under
   `/pondfest/` maps to a real file. A typo in a map filename is otherwise
   invisible until someone taps the tab in the park.

### Tier 2 — copy and style gates (grep, binary, no judgment)

6. Zero em-dashes in reader-facing built output.
7. Zero British spellings, from the list in §10.
8. Zero kicker labels: `pf-eyebrow` must not exist anywhere.
9. Zero banned vocabulary from the §10 list in reader-facing copy.
10. En-dashes are still allowed, but only inside time strings. Assert that
    rather than banning them.

### Tier 3 — behavior in a real browser (the part that was missing)

Use the puppeteer setup in §9. These are the checks that actually matter.

11. **Map tabs work.** Click each tab in turn; assert its panel becomes visible,
    its `img` gains a real `src`, and the image truly decodes
    (`naturalWidth > 0`). A tab that switches but shows a broken image passes a
    naive check and fails a visitor.
12. **Deferral actually defers.** On first paint exactly one map image has a
    `src`. After clicking the third tab, exactly three do. This is the check
    that protects the page-weight budget from quietly regressing.
13. **The clock logic is right.** Override `Date.now` with
    `page.evaluateOnNewDocument` and assert: at 13:00 on event day the panel
    names Camp, Cher's Playground and Dansino; at 09:00 it is hidden or says the
    day has not started; at 19:00 it does not claim something is playing. Check
    the boundaries too, 12:15 and 12:45, where one set ends before the next
    begins.
14. **The winners flow, end to end.** Set `WINNERS_LIVE = true` with sample rows,
    rebuild, and assert the banner, the section and the nav entry all appear and
    the banner links to the section. Set it back to `false`, rebuild, assert all
    three are gone. Restore the file. Bryan will do exactly this, once, live,
    under time pressure, so it is the single most important test here.
15. **Bottom tab bar at 390px.** It exists, is pinned to the bottom, sits above
    the safe-area inset, does not cover the back-to-top button, and each tab
    scrolls to the right section.
16. **Jump accuracy.** Click each nav destination and assert the target's
    `getBoundingClientRect().top` lands at the 60px `scroll-margin-top`, both on
    a click and on a `#hash` load.
17. **No horizontal scroll** at 390px: `scrollWidth <= clientWidth`.
18. **No console errors** on load or after interacting with the tabs.

### Tier 4 — weight

19. Measure transferred bytes via CDP on a cold load. First paint stays near the
    0.95 MB the page holds today and must not pass about 1.2 MB. Report the
    number whether it passes or not, so there is a record.

### Tier 5 — something a person can actually look at

20. Capture screenshots of every new and changed section at 390px and 1440px
    into one folder and tell Bryan the path. He reviews rendered output closely
    and has caught things no automated check would (a `mailto:` opening a dead
    tab, an icon sitting wrong inside a link). The script's job is to make that
    review cheap, not to replace it.

### Last gate

When all twenty pass, hand the suite to a **fresh subagent with no memory of
building any of it** and have it re-run the script and independently spot-check
five claims against the live DOM. A verifier that did not write the code catches
what self-review does not. Only then report the work done.

## 12. Lessons from the first attempt

Recorded because they are the reason this document exists.

**Plan first even when the clock is loud.** The brief asked for an orchestration
prompt or a one-shot execution session. With a deadline in sight the second looked
obviously right, and it was half-right: the work was real and most of it compiles.
But choosing silently meant Bryan watched a build happen that he had asked to be
planned, and could not steer it until a lot of it existed. Name the fork out loud
and let him pick, even when you are confident — *especially* when the thing you are
skipping is the thing he explicitly asked for.

**Scope arrived late because the plan arrived late.** The winners mechanism — the
single most time-critical feature, with a hard 4:00 PM deadline and a human
standing in a field — was not in the original list and surfaced only after building
had started. A planning round would very likely have drawn it out, because "what do
you need to do *during* the event" is a planning question and never came up.

**Fan-out was the wrong instinct here, and that was right.** Two background agents
(image optimization; finding the magazine article) were genuinely independent and
both paid off. Everything else funnels through `config.ts` and `index.astro`, two
single files, where parallel agents would only have fought each other. Delegate on
file boundaries, not on task count.

**Do the research before asking the questions.** Four concrete questions with
recommended defaults, asked after the codebase was understood, got four fast
decisive answers. That part worked and is worth repeating.

**Markup without script is not a feature.** Every section was built and none of the
JavaScript was, so the page compiled green while the schedule had no live state and
the map tabs did nothing. Build one section's markup, styles *and* behavior
together, and verify it in a browser, before starting the next.
