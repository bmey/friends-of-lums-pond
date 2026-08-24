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

Pond Fest is held the **second Saturday of October** every year. `EVENT_DATE` should be the time gates open. It drives the countdown, the "today" state, and the day-of quick-links bar.

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
    imageUrl: "/pondfest/lineup/billy-pierce-band.jpg", // square photo, ~400px
    url: "https://www.billypierce.com/", // makes the name a link
    blurb: "Delaware slide-guitar blues.", // one muted line under the name
  },
];
```

Acts without an `imageUrl` get a coloured tile with the first letter of their name, so the list still looks even. Keep the list alphabetical (ignoring a leading "The") until set times are known, then reorder it by schedule.

Photos go in `public/pondfest/lineup/`, named after the act (`guilt-45-band.jpg`). Square, about 400×400. **Never guess a photo credit.** If you don't know who took it, leave the photo off.

**Emcees** use the same shape and only need names. They render as one line under the band list ("Hosted all day by …").

**Sponsors:**

```ts
export const SPONSORS: Sponsor[] = [
  { name: "Union Park BMW", tier: "gold" },
  { name: "Snarky Bark", tier: "bronze" },
  { name: "Some Business", tier: "silver", url: "https://example.com" }, // url optional
];
```

Tier options, highest first: `"diamond"`, `"platinum"`, `"gold"`, `"silver"`, `"bronze"`, `"family"`

A tier with no sponsors in it simply doesn't appear on the page, so you never need a placeholder.

### 4. Update external URLs

Replace empty strings with real links as they become available:

```ts
export const MERCH_URL = "https://..."; // shirt pre-orders
export const PONDFEST_DONATE_URL = "https://donorbox.org/pond-fest-2027";
export const VOLUNTEER_URL = "https://www.signupgenius.com/...";
export const SPONSOR_URL = "https://forms.gle/...";
export const VENDOR_URL = "https://forms.gle/...";
```

- `MERCH_URL`: while this is empty (`""`), the "Pre-Order Shirts" button simply isn't on the page. Fill it in when pre-sales open and the button appears.
- `PONDFEST_DONATE_URL`: the Donorbox **campaign page**, not an embed. It's used by the hero Donate button, the fundraising section, both funding-goal buttons, and the day-of quick links, so one edit changes all of them.

Note: Performers don't use a form. The "Apply to Perform" buttons open a small popup directing them to email `pondfest@friendsoflumspond.org`.

### 5. Update funding goals

Update the `FUNDING_GOALS` array with this year's projects:

```ts
export const FUNDING_GOALS: FundingGoal[] = [
  {
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

## Day-of playbook (the week of the event)

| Field           | What it does                                                       |
| --------------- | ------------------------------------------------------------------ |
| `DAY_OF_ALERT`  | Orange banner at the very top of the page. Leave empty to hide it. |
| `RAFFLE_LINK`   | Link to raffle info / results page                                 |
| `AUCTION_LINK`  | Link to silent auction info / results page                         |
| `FEEDBACK_LINK` | Post-event survey link                                             |

The **day-of quick links bar** (Plan Your Visit, Raffles, Auction, Donate, Feedback) appears on its own from seven days before `EVENT_DATE` until the day after. You don't switch it on; you only need to fill in the links above.

Everything visitors need on the day (the map, parking, the shuttle, fees, the rain date) lives in the always-on **Plan Your Visit** section, so it works whether they look it up in September or standing at the gate.

**Weather and status.** Set `DAY_OF_ALERT` at any time; it shows at the top of the page as soon as the site rebuilds (a few minutes after you commit).

**Morning of the event.** Set:

```ts
export const DAY_OF_ALERT =
  "Gates open at 11! Free parking in all three areas, and the welcome team at the split will guide you.";
```

**If the rain date is invoked.** Do _both_ of these:

1. Change `EVENT_DATE` to `"2026-10-11T11:00:00"`. This moves the countdown, the "today" state, and the quick-links window together.
2. Announce it in `DAY_OF_ALERT`, e.g. `"Rained out. Pond Fest is running Sunday, October 11, 11 AM to 6 PM. Same three areas, same lineup."`

**After the event.** The quick-links bar hides itself automatically the day after. Put a thank-you and the feedback-survey link in `DAY_OF_ALERT` for about a week:

```ts
export const DAY_OF_ALERT =
  "Thank you for an incredible Pond Fest! Tell us how it went: <survey link>";
```

Then clear it back to `""`.

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
