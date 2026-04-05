# Updating the Pond Fest Hub for a New Year

This guide is written for non-developers. You only need to edit one file — `config.ts` — and drop in a few images. No coding knowledge required; GitHub's web editor works fine.

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
export const EVENT_DATE = "2027-10-09T10:00:00";  // second Saturday of October
export const EVENT_DATE_DISPLAY = "Saturday, October 9, 2027";
export const EVENT_TIME = "10:00 AM – 6:00 PM";
```

Pond Fest is held the **second Saturday of October** every year.

### 2. Update the hero image

1. Get a hero photo or graphic for the new year (JPG or PNG, landscape orientation, at least 1200px wide).
2. Name the file `hero.jpg` (or `hero.png`).
3. Upload it to the `public/pondfest/` folder in the GitHub repo.
4. In `config.ts`, update:

```ts
export const HERO_IMAGE_URL = "/pondfest/hero.jpg";
```

### 3. Clear the lineup and sponsors

At the start of the year, empty these arrays:

```ts
export const LINEUP: Performer[] = [];
export const SPONSORS: Sponsor[] = [];
```

Add entries back as they are confirmed throughout the year. Example:

```ts
export const LINEUP: Performer[] = [
  { name: "Lucky Stone", stage: "Wingspan Stage", time: "2:00 PM – 4:00 PM" },
  { name: "The Mad Dabbers", stage: "Monarch Stage", time: "12:00 PM – 1:00 PM" },
];

export const SPONSORS: Sponsor[] = [
  { name: "Granite-Corinthian Lodge No. 34", tier: "platinum" },
  { name: "Christiana Care", tier: "platinum" },
  { name: "Superservice Automotive", tier: "gold" },
];
```

Tier options: `"platinum"`, `"gold"`, `"silver"`, `"bronze"`, `"family"`

### 4. Update external URLs

Replace empty strings with real links as they become available:

```ts
export const TICKETS_URL = "https://www.eventbrite.com/e/pond-fest-2027...";
export const VOLUNTEER_URL = "https://www.signupgenius.com/...";
export const SPONSOR_URL = "https://forms.gle/...";
export const VENDOR_URL = "https://forms.gle/...";
export const PERFORMER_URL = "https://forms.gle/...";
```

If a URL is empty (`""`), that button will appear grayed out on the page with a "Coming Soon" note.

### 5. Update funding goals

Update the `FUNDING_GOALS` array with this year's projects:

```ts
export const FUNDING_GOALS: FundingGoal[] = [
  {
    name: "Youth Scholarships",
    description: "...",
    donorboxUrl: "https://donorbox.org/...",
  },
];
```

### 6. Archive last year's event

Open `src/data/pondfest/archive/` and create a new file named `2026.ts` (or the year just completed). Copy the format from an existing archive file (e.g., `2025.ts`) and fill in the results.

This will automatically appear on the `/pondfest/archive` page.

---

## Day-of updates (the week of the event)

These fields in `config.ts` are only needed the week of the event:

| Field | What it does |
|---|---|
| `DAY_OF_ALERT` | Orange banner at top of page (e.g., "Gates open now!"). Leave empty to hide. |
| `RAFFLE_LINK` | Link to raffle info / results page |
| `AUCTION_LINK` | Link to silent auction info / results page |
| `FEEDBACK_LINK` | Post-event survey link |
| `DONATION_EMBED_URL` | Donorbox embed URL for this year |
| `EVENT_MAP_IMAGE_URL` | Path to event map image in `/public/pondfest/` |
| `PARKING_MAP_IMAGE_URL` | Path to parking map image |
| `VENDOR_MAP_IMAGE_URL` | Path to vendor map image |

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
