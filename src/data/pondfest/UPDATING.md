# Updating the Pond Fest Hub for a New Year

This guide is written for non-developers. You only need to edit one file, `config.ts`, and drop in a few images. No coding knowledge required; GitHub's web editor works fine.

---

## Where to find the file

In the GitHub repository, navigate to:

```
src/data/pondfest/config.ts
```

Click the pencil icon to edit it in your browser.

---

## Step-by-step: new year update

### 1. Update the year and event date

Find these lines near the top of the file and update them:

```ts
export const CURRENT_YEAR = 2027;
export const EVENT_DATE = "2027-10-09T11:00:00"; // second Saturday of October
export const EVENT_DATE_DISPLAY = "Saturday, October 9, 2027";
export const EVENT_TIME = "11:00 AM – 6:00 PM";
```

Pond Fest is held the **second Saturday of October** every year. `EVENT_DATE` should be the time gates open, written in Eastern time. It drives the countdown, and it decides which of the page's three **phases** you are in:

| Phase       | When                                 | What the page shows                                                                 |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| `prep`      | More than seven days before the fest | Volunteer, Perform, Vend, Sponsor, the sign-up links, the countdown                 |
| `event`     | The week of, and event day           | Schedule, maps, food and vendors, winners. Every sign-up ask is hidden, not deleted |
| `afterglow` | After event day                      | A thank-you at the top, the survey, membership, and next year's date                |

Nothing is removed between phases. The sign-up links are still in the file, just hidden by the phase. **Changing `EVENT_DATE` to next year's date is the whole reset**: the page goes back to `prep` on its own and every button comes back. There is no second switch to remember.

To force a phase (say, to preview the day-of page in September), set `PHASE_OVERRIDE` just below `EVENT_DATE`:

```ts
export const PHASE_OVERRIDE = "event"; // "", "prep", "event" or "afterglow"
```

Clear it back to `""` when you are done, or the page will stay in that phase forever.

### 2. Update the hero image

1. Get a hero photo or graphic for the new year (JPG or PNG, landscape orientation, at least 1200px wide).
2. Name the file `hero.jpg` (or `hero.png`).
3. Upload it to the `public/pondfest/` folder in the GitHub repo.
4. In `config.ts`, update:

```ts
export const HERO_IMAGE_URL = "/pondfest/hero.jpg";
```

There is also `OG_IMAGE_URL`, the picture that shows up when someone shares the page on Facebook. It should be exactly 1200×630 pixels. Usually it is a crop of the hero.

### 3. Clear the lineup, emcees, and sponsors

At the start of the year, empty these arrays:

```ts
export const LINEUP: Performer[] = [];
export const EMCEES: Performer[] = [];
export const SPONSORS: Sponsor[] = [];
```

Add entries back as they are confirmed throughout the year.

**Performers.** Only `name` is required. Everything else is optional, so a name-only entry is perfectly valid:

```ts
export const LINEUP: Performer[] = [
  { name: "Benny Preston" }, // name only is fine
  {
    name: "Billy Pierce Band",
    stage: "Wingspan Stage", // shows as a teal badge
    time: "2:00 PM – 4:00 PM", // shows next to the badge
    imageUrl: "/pondfest/lineup/billy-pierce-band.webp",
    imageWidth: 410, // the file's real pixel size; the frame uses it
    imageHeight: 482, // to reserve space so nothing jumps as photos load
    url: "https://www.billypierce.com/", // adds a "Website" / "Facebook" button
    blurb: "Delaware slide-guitar blues.", // a short paragraph under the name
  },
];
```

Each act gets its own panel with the photo breaking out of the top edge, and the panels flip left/right down the page. On phones the photo goes full-bleed across the top of the panel and the words sit underneath. Acts without an `imageUrl` get a colored tile with the first letter of their name instead. Keep the list alphabetical (ignoring a leading "The") until set times are known, then reorder it by schedule.

**Set times build the schedule.** Once every act has a `stage` and a `time`, the page grows a Schedule section near the top: one column per stage, each row linking down to that band's panel, and on event day an "On right now" box that names what is playing on each stage. Two rules for the `time` so the page can read it: write it as `"11:00 AM – 12:15 PM"` or `"12:45 – 2:00 PM"` (that dash is an en-dash, copy it from an existing act), and put AM or PM on at least one side. Write `stage` as `"Wingspan Stage · Area 1"`; the part after the dot becomes the column's sub-heading.

Photos go in `public/pondfest/lineup/`, named after the act (`guilt-45-band.webp`). Use whatever shape the band sent: portrait, square, or a wide band shot all work, and the panel follows the photo. Crop only to bring anything narrower than about 9:10 back up to it, keep the longest side around 600–1400px, and save as WebP at quality 80 (roughly 25–100KB each). Set `imageWidth`/`imageHeight` to the finished file's real dimensions. **Never guess a photo credit.** Bands supply their own promo photos, so no credit line is shown; if you get a photo from anywhere else and don't know who took it, leave it off.

**Emcees** use the same shape and only need names. They render as one line under the band list ("Hosted all day by …").

**Sponsors:**

```ts
export const SPONSORS: Sponsor[] = [
  { name: "Union Park BMW", tier: "gold" },
  { name: "Snarky Bark", tier: "bronze" },
  { name: "Some Business", tier: "silver", url: "https://example.com" }, // url optional
];
```

Tier options, highest first: `"diamond"`, `"platinum"`, `"gold"`, `"silver"`, `"bronze"`, `"family"`, plus `"special"` for the **Community Support** block, which is shown last and set apart from the paid tiers (for supporters who gave money but are not really a sponsorship level, like an elected official who directed community funds our way). Organizations that bring an activity or a crew rather than money go in `PARTNERS` instead; see "Special Thanks" below.

A tier with no sponsors in it simply doesn't appear on the page, so you never need a placeholder.

**Emcees** can carry a `url` like performers do; it links their name in the "Hosted all day by" strip.

### 3b. Special Thanks (`PARTNERS`)

Separate from sponsors on purpose. `SPONSORS` is for people who wrote a check;
`PARTNERS` is for the organizations who bring an activity, a crew, or the park
itself and never send us an invoice. They get their own **Special Thanks**
section under the sponsor list.

```ts
export const PARTNERS: Partner[] = [
  {
    name: "Original Music Association of Delaware",
    group: "activities", // which heading it lands under
    what: "Hosting the open mic all day", // one short line
    url: "https://302omad.com/", // optional; links the name
  },
  { name: "Dogfish Head", group: "beer" }, // no `what` needed
];
```

`group` picks one of three headings, shown in this order:

| `group`        | Heading                      | Who belongs there                                |
| -------------- | ---------------------------- | ------------------------------------------------ |
| `"activities"` | Activities & Attractions     | Anyone running a thing to do at the fest         |
| `"beer"`       | In the Beer Garden           | The breweries pouring                            |
| `"agency"`     | Park, Agency & Public Safety | Park staff, DNREC, the rangers, first responders |

A group with nobody in it doesn't appear, so you never need a placeholder.

Two rules:

- `what` is optional. Leave it off when the heading already says it. That is
  why the breweries are names only, and they render as a row rather than a grid.
- `url` is optional too, and an entry with no link just shows as plain text.
  **Never guess a web address.** A missing link is better than a dead one.

Rule of thumb: if an organization appears in `AMENITIES` as the host of a card,
it should also be in `PARTNERS`. An organization can be in both `PARTNERS` and
`SPONSORS` if they did both.

### 4. Update external URLs

Replace empty strings with real links as they become available:

```ts
export const MERCH_URL = "https://..."; // shirt pre-orders
export const PONDFEST_DONATE_URL = "https://donorbox.org/pond-fest-2027";
export const VOLUNTEER_URL = "https://www.signupgenius.com/...";
export const SPONSOR_URL = "https://forms.gle/...";
export const VENDOR_URL = "https://forms.gle/...";
```

- `MERCH_URL`: while this is empty (`""`), the hero's "Pre-Order Merch" button and the pre-sale banner in the Merch section simply aren't on the page. Fill it in when pre-sales open and they appear. Set `MERCH_PRESALE_DEADLINE` (an ISO datetime with the Eastern offset, e.g. `"2026-09-23T12:00:00-04:00"`) and `MERCH_PRESALE_DEADLINE_DISPLAY` (the same moment in words) and the page switches itself to "pre-sales have closed, shop the merch tent" the moment the deadline passes, with no rebuild needed. The items themselves live in `MERCH_ITEMS`: name, an optional one-line `note`, the product shot (`public/pondfest/merch/<slug>.webp`, transparent background, trimmed, about 640px on the long side), and `availability`: `"both"` (the default: pre-order it or buy it at the tent), `"presale"` (pre-order only, not sold at the fest), or `"fest"` (tent only, so it never gets a pre-order link). **Do not add prices.** The pre-sale store and the fest tent charge different amounts, so any single number on the page would be wrong in one of the two places. `MERCH_AT_THE_FEST` is the plain list of small goods sold at the tent on event day (stickers, pins, and so on); they show as a row of names, not photos.
- `FACEBOOK_EVENT_URL`: the year's Facebook event. Adds an RSVP link under the hero buttons and in Plan Your Visit; leave empty to hide both.
- `PONDFEST_DONATE_URL`: the Donorbox **campaign page**, not an embed. It's used by the hero Donate button, the fundraising section, both funding-goal buttons, and the day-of quick links, so one edit changes all of them.

Note: Performers don't use a form. The "Apply to Perform" buttons open a small popup directing them to email `pondfest@friendsoflumspond.org`.

### 4b. Amenity cards ("What to Expect")

Each entry in `AMENITIES` is one card. Beyond the basics (`title`, `desc`, `area`, an optional `time` and `badge`), a card can carry:

- `url`: the partner's own site, which turns the card title into a link. A `"#pf-..."` value jumps to a section on the page instead.
- `links`: extra buttons under the card, each `{ label, url }`. Use them for registration pages or a `mailto:` (the pickleball ladder and horseshoes cards are the examples). Keep labels short. Add `phases: ["prep"]` to a link that is a sign-up, and it hides itself the week of the event and comes back next year on its own.
- `imageUrl` / `imageAlt` / `credit` / `creditUrl`: the photo and who took it. Never guess a credit.

### 4c. Gallery ("Fest Memories")

`GALLERY_PHOTOS` lists the photos; the first `GALLERY_PREVIEW_COUNT` show right away and the rest sit behind a "Show more photos" button and are not downloaded until someone taps it, so the list can grow without slowing the page. Keep new files around 800px on the long side.

### 5. Update funding goals

Update the `FUNDING_GOALS` array with this year's projects:

```ts
export const FUNDING_GOALS: FundingGoal[] = [
  {
    // optional: a "learn more" link on the card, e.g. the maker's page
    // learnMoreUrl: "https://boardsafedocks.com/accessible-kayak-launch/",
    // learnMoreLabel: "About the BoardSafe launch",
    name: "Youth Scholarships",
    description: "...",
    imageUrl: "/pondfest/field_trip.jpeg",
    donorboxUrl: PONDFEST_DONATE_URL,
  },
];
```

If both goals share one campaign, point both `donorboxUrl`s at `PONDFEST_DONATE_URL`.

### 6. Update "What to Expect" (`AMENITIES`)

The "What to Expect" section is one big photo-led grid, one card per thing to do
at the fest. It is built entirely from `AMENITIES`, so adding an activity is a
matter of adding an entry:

```ts
export const AMENITIES: Amenity[] = [
  {
    id: "junior-jam", // anchor link, keep it simple
    icon: "fa-child", // a Font Awesome name
    title: "Junior Jam",
    area: "Area 1", // or "Areas 1 & 2", "All three areas"
    badge: "Price TBD", // optional chip: "New", "Expanded", "21+", "Entry TBD"
    // a card needing two chips passes an array: ["New", "$10 entry"]
    desc: "Our kids' zone: duck pond, pumpkin painting, temporary tattoos...",
    imageUrl: "/pondfest/kid-zone.jpg", // optional
    imageAlt: "Kids painting pumpkins at a picnic table",
  },
];
```

Optional fields worth knowing:

- `time` only when the activity does **not** run all day, e.g. `"12:00 to 4:00"`.
  It renders as a second chip next to the area. Leave it off and the card simply
  does not claim a schedule.
- `url` links the card title out to the partner's own site.
- `credit` and `creditUrl` are the photo credit shown under the image. Leave
  `credit` off and the card credits Amanda Rose Photography, which is right for
  anything from our own event albums. Set it for a partner or stock photo. Set
  it to `""` when we genuinely do not know who took the picture; a blank credit
  is better than a wrong one.

Two things to know about the photos:

- Leave `imageUrl` empty and the card renders an icon tile on a purple gradient
  instead. That is the right answer for anything new that we have no photo of
  yet. Drop a real photo in later and the card upgrades itself.
- A photo already listed in `AMENITIES` should be taken **out** of
  `GALLERY_PHOTOS`, or the same shot appears twice on the page.

`imageAlt` should say what the photo actually shows, not repeat the title. If we
only have a stage photo from a past year, describe it as a stage photo.

`EVERY_AREA` is the short logistics strip under the grid: shuttle, parking,
restrooms, first aid. `AMENITIES_INTRO` is the paragraph under the heading.

Icon names come from Font Awesome. Search at fontawesome.com, use the `fa-` name,
and check that the icon you picked is in the **free** set. Pro-only icons render
as an empty box on the page and nothing warns you (`fa-circle-parking` is Pro,
`fa-square-parking` is free, and that one cost us a silent blank icon).

Two rules on wording, learned the hard way:

- Describe the **scale** of the vendor village ("40+ local artisans"), never the
  **state of the sign-up sheet**. No "spots remaining", "filling fast", or counts
  of what's left.
- `"New"` means new to Pond Fest this year, not new to the world. Take it off
  the following year. An activity that has run before but is bigger this time
  gets `"Expanded"` instead.
- Prices that aren't final get the `"Price TBD"` or `"Entry TBD"` badge. Never
  invent a number and never quietly drop the activity.

### 7. Archive last year's event

Open `src/data/pondfest/archive/` and create a new file named `2026.ts` (or the year just completed). Copy the format from an existing archive file (e.g., `2025.ts`) and fill in the results.

This will automatically appear on the `/pondfest/archive` page.

---

## Other fields worth knowing

| Field                                      | What it does                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `EVENT_MAP_IMAGE_URL`                      | The event map shown inline in "Plan Your Visit" (~1600px wide)                      |
| `EVENT_MAP_FULL_URL`                       | The full-resolution map the inline one links to for "tap to enlarge"                |
| `PARKING_MAP_IMAGE_URL`                    | Optional second map; leave empty and it doesn't render                              |
| `VENDOR_MAP_IMAGE_URL`                     | Optional third map; same                                                            |
| `PARKING_NOTES`, `SHUTTLE_INFO`            | The parking and shuttle notes in "Plan Your Visit"                                  |
| `FEE_NOTE`, `BRING_NOTE`, `RAIN_DATE_NOTE` | The other three notes in the same section                                           |
| `HASHTAGS`                                 | The hashtags shown at the bottom of "Plan Your Visit" and in the press kit          |
| `PHOTO_CREDIT_NAME` / `_URL`               | The credit line under the photo gallery                                             |
| `SEVENTY_FIFTH_URL`                        | DNREC's 75th anniversary hub. Clear it and the link disappears cleanly              |
| `HEART_OF_PARKS_VIDEO_URL`                 | The video in the 75th section. Clear it and the section shows a placeholder instead |
| `GALLERY_PHOTOS`                           | The masonry photo grid; add paths as new photos are uploaded                        |

---

## Day-of playbook

The page switches itself to the `event` phase seven days before `EVENT_DATE` (see step 1). You do not turn anything on. What you do is fill in the day-of lists below, set the banner the morning of, and post the winners at four o'clock.

### The banner

| Field           | What it does                                                       |
| --------------- | ------------------------------------------------------------------ |
| `DAY_OF_ALERT`  | Orange banner at the very top of the page. Leave empty to hide it. |
| `RAFFLE_LINK`   | Optional link to a raffle page, if there is one                    |
| `AUCTION_LINK`  | Optional link to a silent auction page                             |
| `FEEDBACK_LINK` | The post-event survey. Used by "Before you go" and the thank-you   |

**Morning of the event.** Set:

```ts
export const DAY_OF_ALERT =
  "Gates open at 11! Free parking at all three areas, and the welcome team at the split will guide you.";
```

**If the rain date is invoked.** Do _both_ of these:

1. Change `EVENT_DATE` to `"2026-10-11T11:00:00"`. This moves the countdown, the phase switch and the "On right now" clock together.
2. Announce it in `DAY_OF_ALERT`, e.g. `"Rained out. Pond Fest is running Sunday, October 11, 11 AM to 6 PM. Same three areas, same lineup."`

### Posting the winners (the one thing you do during the fest)

Winners live in their own file so there is nothing else to get wrong on a phone in a field:

```
src/data/pondfest/winners.ts
```

Edit it straight from your phone at
<https://github.com/bmey/friends-of-lums-pond/edit/main/src/data/pondfest/winners.ts>

The file explains itself at the top. In short: one winner per line, written as `Prize | Winner`, where the winner is a name or a ticket number. No quotes, no commas, no brackets. A typo in there cannot break the site; a confusing line just shows as a confusing line. Blank lines are ignored and a line starting with `#` is a private note.

When the list is ready, change `WINNERS_LIVE = false` to `WINNERS_LIVE = true` and commit. That one edit reveals the Winners section, puts a banner at the top of the page linking to it, and adds "Winners" to the menus. The site takes about three minutes to rebuild, so post ahead of the 4:00 announcement rather than at it. Flip it back to `false` whenever you want the winners gone.

### The day-of lists (fill in the week of the event)

All of these sit at the bottom of `config.ts`. Every one of them is a plain list, and a list that is empty simply does not appear, so next year's reset is "delete the contents", not "delete the code".

| List               | What it is                                                                                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EVENT_MAPS`       | The tabbed map viewer in Plan Your Visit. Each entry names two files in `public/pondfest/maps/`: `<id>.webp` for the page (about 1800px wide) and `<id>-lg.webp` for "open full size" (about 2600px). Only the first map downloads with the page; the rest load when their tab is tapped, so keep the most useful one first. |
| `KEY_TIMES`        | The fixed moments: a demo, a deadline, a dedication. `start` is 24-hour (`"16:00"`) and sorts the list; `time` is what people see (`"4:00 PM"`). Things that run all day belong on their amenity card, not here. |
| `OPEN_MIC_SLOTS`   | The booked open mic list, time and name.                                                                                                                                                                        |
| `FOOD_TRUCKS`      | Name and area number. The page groups them by area.                                                                                                                                                             |
| `CRAFT_VENDORS`    | Names, alphabetical, exactly as the vendors gave them to us.                                                                                                                                                    |
| `FIRST_RESPONDERS` | The agencies at the Block Party.                                                                                                                                                                                |
| `SPONSOR_ADS`      | The sponsor ad rail under the sponsor list. Each entry names `public/pondfest/ads/<slug>-thumb.webp` (about 600px) and `<slug>.webp` (about 1400px). Write `alt` as a sentence saying what the ad shows. Only add `url` when the ad itself prints a web address; never guess one. |
| `OUT_AND_ABOUT_URL`| A press feature to link under the ads. Leave empty to hide the link.                                                                                                                                           |
| `THANKS_GROUPS`    | The people thank-yous: volunteers, parks staff, sound engineers, emcees. A group is a title, an optional line of context, and a list of names. The volunteer list is long on purpose and renders in columns.    |
| `EAGLE_SCOUT_NOTE` | The bench acknowledgement. Clear it when it no longer applies.                                                                                                                                                  |

Four things on this page are **decided from the lists above**, so you never edit them directly: the Schedule section (from `LINEUP` set times, `OPEN_MIC_SLOTS` and `KEY_TIMES`), the "On right now" box (from `LINEUP` and the phone's clock, event day only), the Food, Vendors & First Responders section, and the sponsor ad rail.

### After the festival

The page switches itself to `afterglow` at midnight after event day. A thank-you section leads the page with the survey, membership, and next year's date. Three fields to fill in over the following days:

- `AFTERGLOW_RESULTS`: the headline numbers once you have them, e.g. `"About 2,500 of you came, and together we raised $31,400 for the kayak launch and the field trip fund."` Until it is set, the page says the count is still coming.
- `DAY_OF_ALERT`: put a one-line thank-you with the survey link here for about a week, then clear it back to `""`.
- `WINNERS_LIVE`: leave it `true` for a few days so people can still check, then set it `false`.

The 2027 date is already in `NEXT_YEAR`, `NEXT_EVENT_DATE_DISPLAY`, `NEXT_EVENT_TIME`, the `.ics` file at `public/pondfest/pond-fest-2027.ics`, and `NEXT_EVENT_GOOGLE_URL`. Update all five together each year (the Google link has the date in it twice, in UTC).

---

## The section nav (you probably don't need to touch this)

The Pond Fest page is long, so it carries three navigation helpers: a row of quick links right under the hero, a bar that names whichever section you're currently in, and a back-to-top button. On a wide screen the bar sticks to the top once you scroll past the quick links. On a phone it is a tab bar along the bottom instead, with the three or four things people look up most and a "More" button that opens the full list. The week of the event both show from the moment the page loads.

All of them read from two lists near the top of `src/pages/pondfest/index.astro`: `navSections` (the quick links and the full "More" list) and `tabBar` (the phone tabs). **Sections drop out of the nav on their own when they have nothing in them.** Clear `LINEUP` at the start of the year and "Music Lineup" and "Schedule" disappear until you add the first act back. So the normal yearly reset needs no nav edits at all.

Each entry can say which phases it belongs to, so the week of the event the menu offers Schedule, the map and the food instead of Volunteer and Sponsor:

```ts
{ href: "#pf-involved", label: "Get Involved", icon: "fa-hand-holding-heart", phases: ["prep"] },
```

`href` is the section's `id` with a `#` in front, `label` is what people see, `icon` is a free Font Awesome name (the same rule as `AMENITIES`: check it isn't Pro-only, or it renders as a blank box), and `phases` is optional; leave it off for always.

Keep each phase's tab bar to four entries. There is only room for four and "More" on a phone.

---

## How to commit changes

After editing in GitHub's web editor:

1. Scroll to the bottom of the editor page.
2. Write a short commit message like "Update Pond Fest config for 2027".
3. Click **Commit changes**.

GitHub Pages will automatically rebuild and deploy the site within a few minutes.

---

## Questions?

Email pondfest@friendsoflumspond.org or reach out to a committee member familiar with the website.
