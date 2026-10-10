import type {
  Amenity,
  EventMap,
  EveryAreaItem,
  FAQItem,
  FoodTruck,
  FundingGoal,
  KeyTime,
  MerchItem,
  OpenMicSlot,
  Partner,
  Performer,
  Phase,
  Sponsor,
  SponsorAd,
  ThanksGroup,
} from "./types";

// ─────────────────────────────────────────────
// UPDATE THIS SECTION EACH YEAR
// See UPDATING.md for step-by-step instructions
// ─────────────────────────────────────────────

export const CURRENT_YEAR = 2026;

// ISO datetime, Eastern. Drives the countdown and decides which of the three
// phases the page is in (see PHASE_OVERRIDE below). Gates open at 11:00.
export const EVENT_DATE = "2026-10-10T11:00:00";

// The page does three jobs across the year and works out which one from
// EVENT_DATE on its own:
//   prep       more than a week out: volunteer, perform, vend, sponsor
//   event      the week of, and event day: map, schedule, food, winners
//   afterglow  after the festival: thanks, the survey, next year's date
// Leave this empty and the phase follows EVENT_DATE. Set it to force one,
// for instance "event" to preview the day-of page in September, and clear
// it again when you are done. Updating EVENT_DATE for next year puts the
// page back in "prep" with every sign-up link restored; no second switch.
export const PHASE_OVERRIDE: "" | Phase = "";

// Human-readable strings shown on the page
export const EVENT_DATE_DISPLAY = "Saturday, October 10, 2026";
export const EVENT_TIME = "11:00 AM – 6:00 PM";

// The standing promise, new in 2026. Pond Fest 2024 was October 12 and 2025 was
// October 4, both one-offs; this is the first year we are committing to a fixed
// weekend so people can plan around it. Say it before, during and after the
// event, and every year after this one.
export const ANNUAL_PROMISE =
  "Pond Fest is the second Saturday of October, every year. Mark it now.";
export const ANNUAL_PROMISE_SHORT = "Second Saturday of October, every year.";
export const EVENT_LOCATION = "Lums Pond State Park, Bear, DE";
export const EVENT_TAGLINE =
  "A concert for a cause. Live music, food, community, and nature.";
export const FUNDRAISING_GOAL = "$30,000";

// Hero and map images — place files in public/pondfest/
export const HERO_IMAGE_URL = "/pondfest/hero.jpg";
// Phone-sized copy of the hero. It is a CSS background, so without this a
// phone downloads the full desktop file before it can paint anything.
export const HERO_IMAGE_MOBILE_URL = "/pondfest/hero-sm.jpg";
export const OG_IMAGE_URL = "/pondfest/og.jpg";
export const EVENT_MAP_IMAGE_URL = "/pondfest/map-event.jpg";
export const EVENT_MAP_FULL_URL = "/pondfest/map-event-full.jpg";
export const PARKING_MAP_IMAGE_URL = "";
export const VENDOR_MAP_IMAGE_URL = "";

// ─────────────────────────────────────────────
// PHOTOS — download from Lightroom → public/pondfest/photos/
// Then reference as "/pondfest/photos/filename.jpg"
// ─────────────────────────────────────────────

// Full-width photo band between Lineup and Get Involved sections
// Recommended: wide panoramic crowd/stage shot (landscape, high-res)
export const PHOTO_BAND_1_URL = "/pondfest/wide-1.jpg";
export const PHOTO_BAND_1_MOBILE_URL = "/pondfest/wide-1-sm.jpg";

// Gallery grid on the index page. Drop new files in public/pondfest/gallery/
// (about 800px on the long side, JPG quality ~75, so 50–120KB each) and add
// paths here. Keep photos already used in AMENITIES out of this list so the
// same shot does not show up twice on the page. The first
// GALLERY_PREVIEW_COUNT show right away; the rest sit behind a "Show more
// photos" button and are not downloaded until someone taps it, so this list
// can grow without making the page heavier.
export const GALLERY_PREVIEW_COUNT = 8;
export const GALLERY_PHOTOS: string[] = [
  "/pondfest/gallery/gallery1.jpg",
  "/pondfest/gallery/gallery2.jpg",
  "/pondfest/gallery/gallery3.jpg",
  "/pondfest/gallery/gallery7.jpg",
  "/pondfest/gallery/gallery10.jpg",
  "/pondfest/gallery/gallery11.jpg",
];

// Credit line shown under the gallery (also covers the photo band)
export const PHOTO_CREDIT_NAME = "Amanda Rose Photography";
export const PHOTO_CREDIT_URL = "https://www.amandaroseportraits.com/";

// Background photo for the History Teaser section
// Recommended: aerial or wide crowd/event overview shot
export const HISTORY_BG_PHOTO = "";

// Official press release (PDF, hosted on the FOLP Google Drive).
// Shared "anyone with the link"; the uc?export=download form saves the file
// rather than opening Drive's preview page.
export const PRESS_RELEASE_URL =
  "https://drive.google.com/uc?export=download&id=1tZ2AZCvFQ4G2_D00sGxbsDemE-zqpbvT";

// ─────────────────────────────────────────────
// 75th ANNIVERSARY OF DELAWARE STATE PARKS (2026)
// ─────────────────────────────────────────────

export const SEVENTY_FIFTH_URL = "https://www.destateparks.com/75-years/";
export const SEVENTY_FIFTH_LOGO_WHITE = "/pondfest/75th/dsp-75th-white.png";
export const SEVENTY_FIFTH_LOGO_COLOR = "/pondfest/75th/dsp-75th-color.png";

// "Heart of the Parks" video — leave VIDEO_URL empty to hide the video
export const HEART_OF_PARKS_VIDEO_URL =
  "/pondfest/heart-of-the-parks-bryan-mey-720p.mp4";
export const HEART_OF_PARKS_POSTER_URL =
  "/pondfest/heart-of-the-parks-poster.jpg";
export const HEART_OF_PARKS_CAPTIONS_URL =
  "/pondfest/heart-of-the-parks-bryan-mey.vtt";

// ─────────────────────────────────────────────
// EXTERNAL URLS — update as they become available
// ─────────────────────────────────────────────

// Merch pre-orders (the FTF Design Co. store). Leave empty when no pre-sale
// is running — the hero's "Pre-Order Merch" button and the pre-sale banner in
// the Merch section only appear while this is non-empty AND the deadline
// below has not passed.
export const MERCH_URL =
  "https://ftfdesignco.printavo.com/merch/friends-of-lums-pond";
// When the store closes: ISO datetime with the Eastern offset (-04:00 in
// September and October). After this moment the page swaps its pre-order
// buttons for "shop at the merch tent" on its own, so nobody has to rebuild
// the site that day. Leave empty for a pre-sale with no end date.
export const MERCH_PRESALE_DEADLINE = "2026-09-23T12:00:00-04:00";
export const MERCH_PRESALE_DEADLINE_DISPLAY =
  "noon Eastern on Wednesday, September 23";

export const PONDFEST_DONATE_URL =
  "https://donorbox.org/pond-fest-2026-donations";

export const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejXUBtCgim_Q1gnda4ctmi64cHBA1zQ9UbfH7JSyOAKmBOyg/viewform";
export const SPONSOR_URL =
  "https://drive.google.com/file/d/1guZhsINdNO_mcN29o0vkPVAfxpLt1ruv/view?usp=sharing";
export const VENDOR_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcFDJyBj1_WAk3yI60c3QFRcmQ1936RhkllGyDqWKf-m5k0Q/viewform";

// Contact — also where performer interest is directed (no form)
export const PONDFEST_EMAIL = "pondfest@friendsoflumspond.org";
export const PRESIDENT_EMAIL = "president@friendsoflumspond.org";

// Social
export const FACEBOOK_URL = "https://www.facebook.com/FriendsofLumsPond";
// This year's Facebook event. Leave empty to hide the RSVP links.
export const FACEBOOK_EVENT_URL =
  "https://www.facebook.com/events/1433844331863143";
export const INSTAGRAM_URL = "https://www.instagram.com/friendsoflumspond";
export const HASHTAGS = ["#DEStateParks", "#LumsPondFest"];

// ─────────────────────────────────────────────
// DAY-OF FIELDS — populate the week of the event
// ─────────────────────────────────────────────

// Shown in an orange banner at the top of the page; leave empty to hide
export const DAY_OF_ALERT =
  "Gates open at 11. Free parking at all three areas, the shuttle runs all day, and the welcome team is at the fee booth to get you started.";

export const SHUTTLE_INFO =
  "A free shuttle loops between Areas 1, 2, and 3 and the Lums Pond campground all day. The " +
  "three event areas are an easy walk from each other. The campground is not, so if you're " +
  "camping, plan on riding the shuttle both ways.";
export const PARKING_NOTES =
  "There is free parking at all three event areas. Follow the Pond Fest signs from the park " +
  "entrance. An officer at the area split is directing traffic, and the welcome team is at the " +
  "fee booth. The standard park entrance fee is collected at the gate: $5 for Delaware " +
  "vehicles, $10 out-of-state, and annual passes are accepted.";
export const FEE_NOTE =
  "Free to attend. The standard park entrance fee still applies at the gate: $5 for Delaware " +
  "vehicles, $10 out-of-state, and annual passes are accepted.";
export const BRING_NOTE =
  "Chairs, blankets, cash or card, water. And screenshot this map before you arrive.";
export const RAIN_DATE_NOTE =
  "Rain date: Sunday, October 11. If anything changes we will post it here and on our socials.";
export const DOG_NOTE =
  "Pond Fest is dog-friendly. Leashed dogs are welcome in all three areas, per park rules, " +
  "and the Academy of Dog Training & Agility runs walk-up agility mini-lessons in Area 2 all " +
  "day. Bring water and a bowl; it is a long day outdoors for them too.";

export const RAFFLE_LINK = ""; // link to raffle results / info page
export const AUCTION_LINK = ""; // link to auction results / info page
export const FEEDBACK_LINK = "https://forms.gle/WiB4UH4xDt9XQbjh8"; // Google Form survey

// ─────────────────────────────────────────────
// LINEUP, in the order the acts play. `stage` and `time` feed the schedule
// grid and the "on right now" panel as well as the band cards, so write the
// time as "11:00 AM – 12:15 PM" or "12:45 – 2:00 PM" (an en-dash, and AM/PM
// on at least one side). Before set times exist, keep the list alphabetical
// (ignoring "The") and leave both fields off.
// ─────────────────────────────────────────────

export const LINEUP: Performer[] = [
  {
    name: "The Sarah Koon Band",
    stage: "Wingspan Stage \u00b7 Area 1",
    time: "11:00 AM \u2013 12:15 PM",
    imageUrl: "/pondfest/lineup/sarah-koon-band.webp",
    imageWidth: 475,
    imageHeight: 559,
    url: "https://www.facebook.com/sarahkoonmusic/",
    blurb:
      "Sarah Koon is a Wilmington, DE-based indie pop/art-rock band centered " +
      "around classically trained pianist and singer-songwriter Sarah Koon. " +
      "Her music features original cinematic melodies with a quirky charm.",
  },
  {
    name: "Brian Corcoran",
    stage: "Monarch Stage \u00b7 Area 1",
    time: "11:00 AM \u2013 12:15 PM",
    imageUrl: "/pondfest/lineup/brian-corcoran.webp",
    imageWidth: 511,
    imageHeight: 601,
    blurb:
      "Brian is a Delaware-based singer-songwriter whose performances blend " +
      "heartfelt original music with timeless Americana favorites. Drawing " +
      "from folk, blues, and rock traditions, he delivers an engaging mix of " +
      "originals and beloved covers that connect with audiences of all ages.",
  },
  {
    name: "Scott & Tammy",
    stage: "Nest Box Stage \u00b7 Area 2",
    time: "12:00 \u2013 1:00 PM",
    imageUrl: "/pondfest/lineup/scott-and-tammy.webp",
    imageWidth: 844,
    imageHeight: 633,
    blurb:
      "Scott & Tammy are a husband & wife duo based out of Smyrna, Delaware. " +
      "They play acoustic covers and originals with Scott on guitar, Tammy " +
      "on washboard and other percussion instruments. Their influences " +
      "include Grateful Dead, Peter Rowan and Animal from the Muppets.",
  },
  {
    name: "Camp",
    stage: "Wingspan Stage \u00b7 Area 1",
    time: "12:45 \u2013 2:00 PM",
    imageUrl: "/pondfest/lineup/camp.webp",
    imageWidth: 1360,
    imageHeight: 633,
    blurb:
      "Camp is an instrumental experience that fuses the energy of surf rock, " +
      "the attitude of punk, the spontaneity of jazz, and the adventurous " +
      "spirit of indie rock. Their music delivers infectious rhythms, " +
      "unexpected twists, with a uniquely quirky edge.",
  },
  {
    name: "Cher's Playground",
    stage: "Monarch Stage \u00b7 Area 1",
    time: "12:45 \u2013 2:00 PM",
    imageUrl: "/pondfest/lineup/chers-playground.webp",
    imageWidth: 934,
    imageHeight: 633,
    url: "https://www.facebook.com/chersplayground/",
    blurb:
      "Cher's Playground is a Delaware-based musical duo and cover band " +
      "featuring powerhouse vocalist Cher Goodchild. Known for their " +
      "energetic performances and crowd-pleasing setlists, they bring " +
      "beloved hits and fan-favorite covers to every stage, creating an " +
      "unforgettable live music experience.",
  },
  {
    name: "Dansino",
    stage: "Nest Box Stage \u00b7 Area 2",
    time: "1:30 \u2013 2:30 PM",
    imageUrl: "/pondfest/lineup/dansino.webp",
    imageWidth: 643,
    imageHeight: 633,
    blurb:
      "Dansino is the spirited acoustic duo of Anthony Ambrosino and Bob " +
      "Danyo, delivering exceptional musicianship, and an energetic live " +
      "performance. Both are accomplished vocalists, with Anthony on guitar " +
      "and Bob on mandolin, creating a distinctive blend of acoustic " +
      "favorites that entertains audiences of all ages.",
  },
  {
    name: "Guilt 45 Band",
    stage: "Wingspan Stage \u00b7 Area 1",
    time: "2:30 \u2013 3:45 PM",
    imageUrl: "/pondfest/lineup/guilt-45-band.webp",
    imageWidth: 602,
    imageHeight: 633,
    url: "https://www.facebook.com/guilt45band",
    blurb:
      "Guilt 45 Band is a 4-piece grunge & alternative band covering the best " +
      "of the 90s and 2000s. They're bringing back the Seattle Sound to " +
      "kick-start the nostalgia of that era while introducing younger " +
      "generations to those iconic moments. In addition to the classics, " +
      "Guilt 45 is always adding to their 200+ song catalog with fan " +
      "favorites, one-hit wonders, and deep cuts to make every show fresh " +
      "and exciting.",
  },
  {
    name: "Benny Preston",
    stage: "Monarch Stage \u00b7 Area 1",
    time: "2:30 \u2013 3:45 PM",
    imageUrl: "/pondfest/lineup/benny-preston.webp",
    imageWidth: 422,
    imageHeight: 496,
    blurb:
      "Benny is a 50-year veteran of the Delaware music scene, known for his " +
      "high-energy performances and crowd-pleasing style. With an extensive " +
      "repertoire spanning the 1950s to today's hits, he delivers something " +
      "for every generation, keeping audiences entertained from the first " +
      "song to the last.",
  },
  {
    name: "Mauka & Makai",
    stage: "Nest Box Stage \u00b7 Area 2",
    time: "3:00 \u2013 4:00 PM",
    imageUrl: "/pondfest/lineup/mauka-and-makai.webp",
    imageWidth: 406,
    imageHeight: 477,
    blurb:
      "Mauka & Makai are Frieda Fisher-Tyler & Robin Tyler. Based in Kent " +
      "County, Delaware, this talented duo has been making music together " +
      "for the past two years, bringing energy and chemistry to every " +
      "performance. Their crowd-pleasing setlist blends beloved covers from " +
      "folk, pop, and island-inspired genres, creating a fun, feel-good " +
      "sound that keeps audiences coming back for more.",
  },
  {
    name: "Hippocampus",
    stage: "Wingspan Stage \u00b7 Area 1",
    time: "4:15 \u2013 5:30 PM",
    imageUrl: "/pondfest/lineup/hippocampus.webp",
    imageWidth: 615,
    imageHeight: 460,
    url: "https://www.facebook.com/hippocampus2/",
    blurb:
      "Hippocampus is one of Delaware's premier high-energy bands, blending " +
      "jazz, blues, rock, and pop into a dynamic American sound reminiscent " +
      "of Phish and Dave Matthews Band. Known for their electrifying live " +
      "performances, the band mixes crowd-favorite covers with compelling " +
      "original music, creating an engaging experience for all.",
  },
  {
    name: "Billy Pierce Band",
    stage: "Monarch Stage \u00b7 Area 1",
    time: "4:15 \u2013 5:30 PM",
    imageUrl: "/pondfest/lineup/billy-pierce-band.webp",
    imageWidth: 410,
    imageHeight: 482,
    url: "https://www.billypierce.com/",
    blurb:
      "Billy Pierce is an electric slide disciple of the Sonny Landreth " +
      "earthy New Orleans style. Billy's crafted his songs into blues, " +
      "rhythm and swamp funk. He has opened for Indigenous, Mike Zito and " +
      "Tyrone Vaughn of the Texas Vaughn musical dynasty. Billy has recorded " +
      "8 CDs and is working on 2 more.",
  },
];

export const EMCEES: Performer[] = [
  {
    name: "Tom the Spokesman",
    url: "https://www.facebook.com/profile.php?id=61572018387856",
  },
  { name: "DJ DLyte" },
];

// ─────────────────────────────────────────────
// SPONSORS — add as they are confirmed
// Tiers: diamond, platinum, gold, silver, bronze, family, and "special" for
// Special Thanks (supporters outside the paid tiers, listed last). Order
// within a tier is the order shown. Logos are a separate pass.
// ─────────────────────────────────────────────

export const SPONSORS: Sponsor[] = [
  { name: "Masonic Charities of Delaware", tier: "diamond" },
  { name: "Granite-Corinthian Lodge No. 34 A.F. & A.M.", tier: "platinum" },
  { name: "Patterson Schwartz", tier: "platinum" },
  { name: "ChristianaCare", tier: "gold" },
  { name: "Union Park BMW", tier: "gold" },
  { name: "Mr Mulch", tier: "gold" },
  { name: "T&D Bus Service", tier: "gold" },
  { name: "Premier Paws LLC", tier: "silver" },
  { name: "Little Bear Dog Care", tier: "silver" },
  { name: "Rainbow Records", tier: "silver" },
  { name: "Deerfield Golf Club", tier: "silver" },
  { name: "The F.A. Bartlett Tree Expert Company", tier: "silver" },
  { name: "Guild Mortgage", tier: "silver" },
  { name: "Eric Morrison", tier: "silver" },
  { name: "Snarky Bark Pet Treats", tier: "bronze" },
  { name: "Councilman David Carter", tier: "special" },
  { name: "Councilman Kevin Caneco", tier: "special" },
];

// ─────────────────────────────────────────────
// SPECIAL THANKS — the groups who bring an activity, a crew, or the park
// itself to the day. Deliberately separate from SPONSORS: these partners
// give us their people and their time rather than a sponsorship check.
//
// `group` sorts an entry under one of three headings, in this order:
//   "activities" — Activities & Attractions
//   "beer"       — In the Beer Garden
//   "agency"     — Park, Agency & Public Safety
// A group with nobody in it does not appear on the page.
//
// `what` is one short line on what they bring; leave it off where the
// heading already says it (the breweries). `url` is optional, and an entry
// with no link just shows as plain text — better than a guessed address.
// ─────────────────────────────────────────────

export const PARTNERS: Partner[] = [
  {
    name: "Original Music Association of Delaware",
    group: "activities",
    what: "Hosting the open mic all day",
    url: "https://302omad.com/",
  },
  {
    name: "Kids Markets",
    group: "activities",
    what: "Running the Kids Entrepreneur Market",
    url: "https://kidsmarkets.com/markets/bear",
  },
  {
    name: "The Little Farm DE",
    group: "activities",
    what: "Pony rides, the petting zoo, and face painting",
    url: "https://thelittlefarmde.com",
  },
  {
    name: "Academy of Dog Training & Agility",
    group: "activities",
    what: "The agility course and walk-up mini-lessons",
    url: "https://academyofdogtraining.com/",
  },
  {
    name: "Diamond State Pickleball Club",
    group: "activities",
    what: "Running the ladder tournament",
    url: "https://diamondstatepickleballclub.com/",
  },
  {
    name: "First State Horseshoe Club",
    group: "activities",
    what: "Open horseshoe play and coaching",
  },
  {
    name: "Delaware R/C Club",
    group: "activities",
    what: "The RC aircraft display, with pilots on hand",
  },
  {
    name: "Rainbow Records",
    group: "activities",
    what: "Bringing the Rainbow Record Bus",
    url: "https://rainbowrecordsde.com/",
  },
  // The pumpkins the kids decorate in the Junior Jam came from these three.
  // Mr. Mulch is also a gold sponsor; that is two different things they did.
  {
    name: "Mr. Mulch",
    group: "activities",
    what: "Pumpkins for the Junior Jam",
    url: "https://www.mrmulchdelaware.com/",
  },
  {
    name: "Filasky's Produce",
    group: "activities",
    what: "Pumpkins for the Junior Jam",
    url: "https://www.filaskyspumpkinpatch.com/",
  },
  {
    name: "The Local Buzz",
    group: "activities",
    what: "Pumpkins for the Junior Jam",
    url: "https://www.thelocalbuzzde.com/",
  },

  { name: "Autumn Arch Beer Project", group: "beer" },
  { name: "Bell's Brewery", group: "beer" },
  { name: "Dogfish Head", group: "beer" },
  { name: "JAKL Beer Works", group: "beer" },
  { name: "Volunteer Brewing Company", group: "beer" },
  { name: "New Belgium Brewing Company", group: "beer" },

  {
    name: "Lums Pond State Park Staff",
    group: "agency",
    what: "Our home park, and a year of planning behind every Pond Fest",
  },
  {
    name: "Delaware State Parks & DNREC",
    group: "agency",
    what: "Permits, logistics, and the DelaWanderer on the field",
    url: "https://www.destateparks.com/",
  },
  {
    name: "Delaware Natural Resources Police",
    group: "agency",
    what: "Keeping the park and the festival safe all day",
  },
  {
    name: "Delaware First Responders",
    group: "agency",
    what: "The fire, police, and EMS crews of the Block Party in Area 3",
  },
  {
    name: "Wilmington Police Department K9 Unit",
    group: "agency",
    what: "K9 demonstrations throughout the day",
  },
];

export const PARTNERS_INTRO =
  "Pond Fest is put on by volunteers, and a lot of it simply would not happen " +
  "without the organizations below. They bring an activity, a crew, or the " +
  "park itself, and none of them send us an invoice for it.";

// ─────────────────────────────────────────────
// FUNDING GOALS for this year
// ─────────────────────────────────────────────

export const FUNDING_GOALS: FundingGoal[] = [
  {
    name: "Youth Scholarships",
    description:
      "Subsidize environmental education field trips for Title 1 schools at Lums Pond. In 2024, 524 students attended these outdoor experiences.",
    imageUrl: "/pondfest/field_trip.jpeg",
    donorboxUrl: PONDFEST_DONATE_URL,
  },
  {
    name: "Accessible Kayak Launch",
    description:
      "Complete funding for a BoardSafe Accessible Kayak Launch, opening Lums Pond's waters to visitors of all abilities.",
    imageUrl: "/pondfest/kayak-launch.jpg",
    donorboxUrl: PONDFEST_DONATE_URL,
    learnMoreUrl: "https://boardsafedocks.com/products/adaptive-kayak-launch/",
    learnMoreLabel: "About the BoardSafe launch",
  },
];

// ─────────────────────────────────────────────
// MERCH — the dedicated section on the index page
// Product shots go in public/pondfest/merch/ as WebP with a transparent
// background, trimmed to the product, about 640px on the long side.
// Prices are deliberately not listed: the pre-sale store and the fest tent
// charge different amounts. `availability` says where you can get each item
// ("both" is the default; see types.ts).
// ─────────────────────────────────────────────

export const MERCH_INTRO =
  "This year's design puts a great blue heron behind the drum kit. Pre-order yours now and " +
  "pick it up at the info tent in Area 1 on event day, or shop the walk-in merch tent " +
  "during the fest.";

export const MERCH_ITEMS: MerchItem[] = [
  {
    name: "Nature Rocks Tee",
    note: "Adult and youth sizes. The full 2026 lineup on the back",
    imageUrl: "/pondfest/merch/tee.webp",
    imageAlt:
      "Charcoal Pond Fest 2026 T-shirt with a heron on drums on the front and the band lineup on the back",
  },
  {
    name: "Event Shirt",
    note: "Heather green. This year's sponsors on the back",
    availability: "fest",
    imageUrl: "/pondfest/merch/event-shirt.webp",
    imageAlt:
      "Heather green Pond Fest 2026 T-shirt, a great blue heron in a circle crest on the front and the year's sponsor logos on the back",
  },
  {
    name: "Fleece Hoodie",
    note: "Limited edition, pre-order only",
    availability: "presale",
    imageUrl: "/pondfest/merch/hoodie.webp",
    imageAlt: "Dark Pond Fest fleece hoodie with the heron drummer in white",
  },
  {
    name: "Charcoal Trucker Hat",
    imageUrl: "/pondfest/merch/hat-charcoal.webp",
    imageAlt:
      "Charcoal and white trucker hat with the heron drummer embroidered in white",
  },
  {
    name: "White Rope Hat",
    imageUrl: "/pondfest/merch/hat-white.webp",
    imageAlt:
      "White five-panel hat with a navy rope and the heron drummer in color",
  },
  {
    name: "Fleece Blanket",
    availability: "fest",
    imageUrl: "/pondfest/merch/blanket.webp",
    imageAlt: "Folded dark fleece blanket with the heron drummer in white",
  },
];

// Small goods sold at the merch tent on event day. No photos: they are all the
// same heron artwork, and a row of names reads faster than eight pictures.
export const MERCH_AT_THE_FEST: string[] = [
  "Stickers",
  "Keychains",
  "Posters",
  "Pins",
  "Temporary tattoos",
  "Magnets",
  "Koozies",
  "Collector cup",
];

// ─────────────────────────────────────────────
// WHAT TO EXPECT — every amenity at the fest
// One card each. Leave imageUrl empty and the card
// falls back to an icon tile, which is what you want
// for anything new that we have no photo of yet.
// ─────────────────────────────────────────────

export const AMENITIES_INTRO =
  "One festival, three park areas, and plenty going on in each of them. Here's what you'll " +
  "find. The event map further down shows where the areas sit, and the free shuttle loops " +
  "between them all day. Leashed dogs are welcome everywhere, and there is even an agility " +
  "course for them in Area 2.";

export const AMENITIES: Amenity[] = [
  {
    id: "live-music",
    icon: "fa-music",
    title: "Live Music",
    area: "Areas 1 & 2",
    url: "#pf-lineup", // jumps down to the full lineup on this page
    desc: "Eleven acts on three stages: Wingspan and Monarch in Area 1, the Nest Box pavilion in Area 2. Every performer is donating the day.",
    imageUrl: "/pondfest/live-music.jpg",
    imageAlt: "Two singers performing on a Pond Fest stage",
  },
  {
    id: "open-mic",
    icon: "fa-microphone-lines",
    title: "Open Mic",
    area: "Area 1",
    desc:
      "A stage for anyone who wants it, hosted all day by the Original Music " +
      "Association of Delaware. OMAD is a Delaware nonprofit built on the idea " +
      "that every artist deserves a chance to be heard: they run events and " +
      "concerts across the state all year, and the proceeds go back to local " +
      "artists and the community. Slots are booked ahead of time, and " +
      "walk-ups get whatever is still open.",
    url: "https://302omad.com/",
    links: [
      {
        label: "Sign up for a slot",
        url: "https://form.jotform.com/262678354076063",
        phases: ["prep"], // slots are full by event week; walk-ups at the stage
      },
    ],
    imageUrl: "/pondfest/open-mic.jpg",
    imageAlt:
      "Two musicians singing and playing guitar at an OMAD open mic on the grass",
  },
  {
    id: "junior-jam",
    icon: "fa-child",
    title: "Junior Jam",
    area: "Area 1",
    desc: "Our kids' zone, and the reason a lot of families come at all. Duck pond, pumpkin painting, temporary tattoos, and a stage sized for people who are three feet tall. Every kid gets a backstage pass on the way in and a stamp at each activity, and a full pass earns a prize on the way out.",
    imageUrl: "/pondfest/kid-zone.jpg",
    imageAlt: "Kids painting pumpkins at a picnic table in the kids' zone",
  },
  {
    id: "first-responders",
    icon: "fa-truck-fast",
    title: "First Responders Block Party",
    area: "Area 3",
    badge: "Expanded",
    url: "#pf-whos-here", // every agency, listed further down the page
    desc: "A full day with Delaware's fire, police, and EMS crews, and the biggest it has been. More agencies than last year, more equipment on the grass, and the people who answer the call standing next to it, happy to talk to your kids.",
    imageUrl: "/pondfest/gallery/gallery4.jpg",
    imageAlt: "A fire engine on display at Pond Fest",
  },
  {
    id: "k9-demos",
    icon: "fa-dog",
    title: "K9 Demonstrations",
    area: "Area 3",
    desc: "Live demonstrations from the Wilmington Police Department K9 Unit, running throughout the day.",
    imageUrl: "/pondfest/gallery/gallery5.jpg",
    imageAlt: "A police K9 looking out of a patrol vehicle window",
  },
  {
    id: "dog-agility",
    icon: "fa-paw",
    title: "Dog Agility",
    area: "Area 2",
    badge: "New",
    desc: "Demonstrations from the Academy of Dog Training & Agility, with student dogs of every level and breed running the course. Agility is a numbered obstacle course you walk first and then run together with your dog, and it works for any breed or size. Bring your own dog for a walk-up mini-lesson: they run all day, for a suggested $10 donation to the Pond Fest fundraiser, and everything is taught with fun, positive methods.",
    url: "https://academyofdogtraining.com/",
    imageUrl: "/pondfest/dog-agility.jpg",
    imageAlt: "A long-coated dog leaping through a yellow agility hoop",
    credit: "Andrea Lightfoot on Unsplash",
    creditUrl: "https://unsplash.com/photos/IrZ5xXXCsn4",
  },
  {
    id: "beer-garden",
    icon: "fa-beer-mug-empty",
    title: "Beer Garden",
    area: "Area 1",
    badge: "21+",
    desc: "Autumn Arch Beer Project, Bell's Brewery, Dogfish Head, JAKL Beer Works, Volunteer Brewing Company, and New Belgium pouring all day.",
    imageUrl: "/pondfest/beer.jpg",
    imageAlt: "A volunteer handing a cup of beer across the taps",
  },
  {
    id: "food-trucks",
    icon: "fa-utensils",
    title: "Food Trucks",
    area: "All three areas",
    url: "#pf-whos-here", // the full list, by area, further down the page
    desc: "Fifteen trucks spread across the three areas, so you're never far from lunch. Bring cash or card.",
    imageUrl: "/pondfest/food-truck2.jpg",
    imageAlt: "A line of visitors waiting at a row of food trucks",
  },
  {
    id: "kids-market",
    icon: "fa-lightbulb",
    title: "Kids Entrepreneur Market",
    area: "Area 2",
    time: "12:00 to 4:00",
    badge: "New",
    desc: "A farmers market with young entrepreneurs at the center of it. Twenty-plus booths, every one run by a kid selling something they made: handmade crafts, baked goods, original products, and the odd invention. Kids Markets is a nonprofit that helps kids launch and run a real small business, and they take care of registration, setup, and insurance so the kids can get on with the selling. Cash is the safest bet at the booths.",
    url: "https://kidsmarkets.com/markets/bear",
    imageUrl: "/pondfest/kids-market.jpg",
    imageAlt:
      "Young sellers behind a Kids Market booth of homemade jam and baked goods",
    credit: "Kids Markets",
    creditUrl: "https://kidsmarkets.com/",
  },
  {
    id: "pony-rides",
    icon: "fa-horse",
    title: "Pony Rides & Petting Zoo",
    area: "Area 2",
    badge: "New",
    desc: "The Little Farm DE brings a trailer of animals down for the day. Ponies to ride, and a petting area with the smaller ones for kids who would rather keep both feet on the ground.",
    url: "https://thelittlefarmde.com",
    imageUrl: "/pondfest/little-farm.jpg",
    imageAlt: "A duck, a pig and a calf lying together at The Little Farm DE",
    credit: "The Little Farm DE",
    creditUrl: "https://thelittlefarmde.com",
  },
  {
    id: "face-painting",
    icon: "fa-paintbrush",
    title: "Face Painting",
    area: "Area 2",
    desc: "Also from The Little Farm DE, set up beside the animals. Tigers, butterflies, and whatever else the artist can talk a kid into.",
    url: "https://thelittlefarmde.com",
    imageUrl: "/pondfest/face-painting.jpg",
    imageAlt: "An artist painting a young visitor's face at Pond Fest",
  },
  {
    id: "vendors",
    icon: "fa-store",
    title: "Local Vendors & Nonprofits",
    area: "Area 1",
    url: "#pf-whos-here", // the full list further down the page
    desc: "More than 40 artisans, crafters, makers, and community nonprofits under the tents.",
    imageUrl: "/pondfest/gallery/gallery9.jpg",
    imageAlt: "Visitors browsing a vendor table under a pop-up tent",
  },
  {
    id: "pickleball",
    icon: "fa-table-tennis-paddle-ball",
    title: "Pickleball Ladder Tournament",
    area: "Area 2",
    time: "12:00 to 4:30",
    badge: ["New", "$10 entry"],
    url: "https://diamondstatepickleballclub.com/",
    desc: "Two ladder sessions run by the Diamond State Pickleball Club: beginner and intermediate players from 12 to 2, advanced (3.5+) from 2:30 to 4:30. Win your court and you move up a court, lose and you move down, so you spend the afternoon playing people at your own level. Doubles, with partners assigned that day, so sign up on your own. $10 per player, donated to Friends of Lums Pond, and prizes for the winners. Twelve spots per session. The courts have new benches this year, built by Thomas Carpenter for his Eagle Scout project and dedicated at 4:00.",
    links: [
      {
        label: "Register: Beginner & Intermediate, 12 to 2",
        url: "https://diamondstatepickleballclub.com/content.aspx?page_id=4091&club_id=556482&item_id=3053114",
        phases: ["prep"], // registration closes before event week
      },
      {
        label: "Register: Advanced, 2:30 to 4:30",
        url: "https://diamondstatepickleballclub.com/content.aspx?page_id=4091&club_id=556482&item_id=3053115",
        phases: ["prep"],
      },
    ],
    imageUrl: "/pondfest/pickleball.jpg",
    imageAlt: "A player stretching for a return during a pickleball match",
    credit: "Venti Views on Unsplash",
    creditUrl: "https://unsplash.com/photos/UfnsQzOGLu8",
  },
  {
    id: "horseshoes",
    icon: "fa-bullseye",
    title: "Horseshoes",
    area: "Area 2",
    time: "12:00 to 5:00",
    badge: "New",
    desc: "Open play with the First State Horseshoe Club. Walk up, pick up a shoe, and a club member will show you how it is done. No experience and no equipment needed, and all ages are welcome. One-hour slots (12, 1, 2, 3, or 4 o'clock) can be reserved ahead of time by email; walk-ups are welcome whenever a pitch is free.",
    links: [
      {
        label: "Email to reserve a time slot",
        url: "mailto:pattyjacob@friendsoflumspond.org?subject=Pond%20Fest%20horseshoe%20time%20slot",
        phases: ["prep"], // reservations close before event week
      },
    ],
    imageUrl: "/pondfest/horseshoes.jpg",
    imageAlt: "Horseshoes resting in the sand of a pitching box",
    credit: "Taylor Heery on Unsplash",
    creditUrl: "https://unsplash.com/photos/g1YbrNS3T-o",
  },
  {
    id: "raffles",
    icon: "fa-gavel",
    title: "Raffles & Silent Auction",
    area: "Area 1",
    desc: "A whole tent of baskets and prizes donated by local businesses, plus the 50/50. Entries close at 3:00, winners are posted at 4:00 (here, and on a sign at the raffle table), and you have until 5:00 to pick up your prize.",
    imageUrl: "/pondfest/raffles.jpg",
    imageAlt: "A volunteer handing over a raffle basket prize",
  },
  {
    id: "rigs",
    icon: "fa-camera-retro",
    title: "Climb Aboard the Rigs",
    area: "Area 3",
    desc: "Fire engines, squad cars, ambulances, and rescue gear, with the crews standing by to answer questions.",
    imageUrl: "/pondfest/gallery/gallery6.jpg",
    imageAlt: "A Delaware State Police cruiser parked on the grass on display",
  },
  {
    id: "merch",
    icon: "fa-shirt",
    title: "Pond Fest Merch Store",
    area: "Area 1",
    url: "#pf-merch", // jumps down to the Merch section on this page
    desc: "New this year as a walk-in shop: this year's heron-drummer tees, hats, and a fleece blanket, plus stickers, pins, posters, and other small goods. Grab a basket, browse, and check out at the counter. Pre-orders are collected at the info tent in Area 1. See the Merch section for the full lineup.",
    imageUrl: "/pondfest/gallery/gallery13.jpg",
    imageAlt: "Pond Fest T-shirts hanging on display at the merch tent",
  },
  {
    id: "playground",
    icon: "fa-child-reaching",
    title: "Playground",
    area: "Area 2",
    desc: "The park's own playground sits right in the middle of Area 2, open all day and free. Handy when someone has had enough of standing in lines.",
    imageUrl: "/pondfest/playground.jpg",
    imageAlt: "The big kids' playground at Lums Pond State Park",
    credit: "Delaware State Parks",
    creditUrl:
      "https://www.destateparks.com/playground-roundup-new-castle-county/",
  },
  {
    id: "kayak-launch",
    icon: "fa-person-swimming",
    title: "Adaptive Kayak Launch Site",
    area: "Area 2",
    url: "https://boardsafedocks.com/products/adaptive-kayak-launch/",
    desc: "Come see the spot on the water where the BoardSafe accessible launch is going, and what your donation is buying.",
    imageUrl: "/pondfest/kayak-launch.jpg",
    imageAlt: "An accessible kayak launch with a wheelchair transfer bench",
    credit: "",
  },
  {
    id: "rc-aircraft",
    icon: "fa-plane",
    title: "RC Aircraft Displays",
    area: "Area 1",
    desc: "Remote-control planes on the field from the Delaware R/C Club, with pilots happy to talk shop.",
    imageUrl: "/pondfest/gallery/gallery8.jpg",
    imageAlt: "Remote-control model airplanes lined up on the grass",
  },
  {
    id: "delawanderer",
    icon: "fa-caravan",
    title: "DelaWanderer Airstream",
    area: "Area 1",
    desc: "Delaware State Parks' traveling outpost, parked up with staff, gear, and park merch.",
    imageUrl: "/pondfest/gallery/gallery12.jpg",
    imageAlt: "The Delaware State Parks DelaWanderer Airstream trailer",
  },
  {
    id: "rainbow-records",
    icon: "fa-record-vinyl",
    title: "Rainbow Record Bus",
    area: "Area 1",
    badge: "New",
    desc: "Crate digging on wheels: a school bus rebuilt into a record shop, bins down both sides and a rug in the middle. Rainbow Records of Newark is bringing it to Pond Fest for the first time this year, parked up next to the Airstream.",
    url: "https://rainbowrecordsde.com/",
    imageUrl: "/pondfest/rainbow-records-bus.jpg",
    imageAlt:
      "The inside of the Rainbow Record Bus, lined with bins of records",
    credit: "Rainbow Records",
    creditUrl: "https://rainbowrecordsde.com/",
  },
];

// Short logistics strip under the amenity grid
export const EVERY_AREA: EveryAreaItem[] = [
  {
    icon: "fa-bus",
    title: "Free all-day shuttle between the areas and the campground",
  },
  { icon: "fa-square-parking", title: "Free parking at every area" },
  { icon: "fa-dog", title: "Leashed dogs welcome" },
  { icon: "fa-restroom", title: "Restrooms in all three areas" },
];

// ─────────────────────────────────────────────
// SUPPORT DISCLOSURE — shown at the foot of /pondfest
// Says plainly that taking someone's money is not an
// endorsement of them. Standard nonprofit language;
// run any edit past the board before shipping it.
// ─────────────────────────────────────────────

export const SUPPORT_DISCLOSURE_TITLE = "About Our Sponsors and Supporters";

export const SUPPORT_DISCLOSURE: string[] = [
  "Friends of Lums Pond State Park is a 501(c)(3) nonprofit, run entirely by volunteers. Our work is the park, and we are nonpartisan.",
  "Pond Fest is paid for by businesses, community groups, and individuals from across our area, and it is put on with the help of dozens of vendors, performers, and partner organizations. Accepting a sponsorship, donation, or vendor fee is not an endorsement of that person or organization, or of their products, services, opinions, or political or religious views. Their support likewise does not mean they endorse everything we say or do. They are here because they want to support Lums Pond State Park, and that is the common ground we ask everyone to stand on.",
  "As a 501(c)(3) we do not support or oppose candidates for public office, and Pond Fest is not a venue for campaign activity. What we are after is a welcoming, family-friendly day where the whole community feels at home, and we reserve the right to decline support or participation that works against that.",
];

// ─────────────────────────────────────────────
// FAQ — timeless questions; update answers as needed
// ─────────────────────────────────────────────

export const FAQ: FAQItem[] = [
  {
    question: "What is Pond Fest?",
    answer:
      "Pond Fest is the annual signature fundraiser of Friends of Lums Pond State Park (FOLP), a 501(c)(3) nonprofit. It is a free community festival with live music on three stages, local vendors, food trucks, a beer garden, kids' activities, raffles, and more. The third annual Pond Fest, on October 10, 2026, is the biggest one yet: for the first time it spans three areas of the park. Every dollar raised supports Lums Pond State Park.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "Pond Fest is free to attend, and there is no ticket. The only cost to get in is the standard Delaware State Parks vehicle entrance fee at the gate: $5 for Delaware plates, $10 for out-of-state (annual passes accepted; see destateparks.com). Some activities cost extra, like Junior Jam, the pickleball ladder ($10 per player), and dog agility mini-lessons (suggested $10 donation), plus food, drinks, and the beer garden. Bring cash or card.",
  },
  {
    question: "When is Pond Fest each year?",
    answer:
      "The second Saturday of October, starting in 2026. The first two were October 12, 2024 and October 4, 2025, and from here on the date is fixed so you can plan around it: October 10, 2026, then October 9, 2027.",
  },
  {
    question: "What if it rains?",
    answer:
      "Pond Fest 2026 is planned for Saturday, October 10, with a rain date of Sunday, October 11. If weather forces a change, we'll announce it right here at the top of this page and on our Facebook and Instagram, so check back before you head out.",
  },
  {
    question: "Where do I park, and how do I get around?",
    answer:
      "There is free parking at all three event areas. Follow the Pond Fest signs from the park entrance at 1068 Howell School Rd. Areas 1, 2, and 3 are all walkable, with a marked path connecting Area 1 to Area 2, and a free shuttle loops between all three areas throughout the day.",
  },
  {
    question:
      "I'm camping at Lums Pond that weekend. How do I get to the festival?",
    answer:
      "Take the free shuttle! It serves the campground all day. Unlike the three event areas, the campground is not a walk. It is a separate drive around the outside of the park, so plan on the shuttle both ways.",
  },
  {
    question: "Is it family friendly?",
    answer:
      "Completely. Junior Jam, our kids' zone, has pumpkin painting, a duck pond, temporary tattoos, a kid-sized stage, and a backstage pass that kids get stamped at each activity to earn a prize. Area 2 adds pony rides, a petting zoo, face painting, dog agility demos, the playground, and the Kids Entrepreneur Market with 20+ youth-run booths.",
  },
  {
    question: "Can I bring my dog?",
    answer:
      "Yes! Pond Fest is dog-friendly: leashed dogs are welcome throughout all three areas, in accordance with park rules. New this year, the Academy of Dog Training & Agility runs agility demonstrations and walk-up mini-lessons in Area 2 all day, so your dog can try the course too (suggested $10 donation). It's a full day outdoors, so bring water and a bowl for them.",
  },
  {
    question: "Can I bring my own food and drinks?",
    answer:
      "Yes, outside food and drinks are permitted in accordance with park rules. That said, over a dozen food trucks and a beer garden will be there to tempt you.",
  },
  {
    question: "Will I have cell service?",
    answer:
      "Coverage at the park is workable, but it can get spotty with a big crowd. Screenshot the event map, and the schedule once it is posted, before you arrive. Directional signs will get you there, and the welcome team at the fee booth can point you the right way.",
  },
  {
    question: "Is Pond Fest stroller and wheelchair accessible?",
    answer:
      "Yes. The event areas are mostly flat and grassy, with paved park roads, and the free shuttle runs between all three areas all day. Every one of the three areas has marked accessible parking spaces, and the enforcement team there can get you into a proper spot. Lums Pond also has accessible trails, and Delaware State Parks keeps a free all-terrain Action Trackchair at the park: motorized treads, a tilting seat, and a companion joystick so someone can help you drive it. Reserve it at no cost by calling the park office at (302) 368-6989 at least 48 hours ahead; sessions are three hours and start with a short how-to video and a waiver. Planning a visit and want to know more? Email pondfest@friendsoflumspond.org and we will help however we can.",
  },
  {
    question: "What should I bring?",
    answer:
      "Lawn chairs or blankets for the music areas, cash or card, comfortable walking shoes, sunscreen, and a reusable water bottle. And a phone with the event map screenshotted, as above.",
  },
  {
    question: "What causes does Pond Fest support?",
    answer:
      "This year's $30,000 goal funds two things: field trip assistance so students from Title I schools can experience the park, and the adaptive kayak launch that will open Lums Pond's waters to visitors of all abilities. See the fundraising goals above. Since 2024, Pond Fest has generated about $30,000 for Lums Pond.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes. Pond Fest runs on volunteers, and we need hands for setup, Junior Jam, info tables, and day-of operations. Shifts are short and the company is great. Sign-ups open in the spring: use the Volunteer button above while it is there, or email pondfest@friendsoflumspond.org any time and we will find you a job.",
  },
];

// ═════════════════════════════════════════════════════════════════
// DAY-OF DATA
// Everything below is what somebody standing in the park looks up.
// Each list renders its own section and disappears when emptied, so
// next year's reset is "delete the contents", not "delete the code".
// ═════════════════════════════════════════════════════════════════

// ── The map viewer ──────────────────────────────────────────────
// Tabbed. Only the first map here is downloaded with the page; the
// others load the first time their tab is opened, which is what keeps
// six maps off the critical path on park cell data. Renditions live in
// public/pondfest/maps/: <id>.webp for the page, <id>-lg.webp for the
// "open full size" link.
export const EVENT_MAPS: EventMap[] = [
  {
    id: "full",
    label: "Full map",
    title: "The whole festival",
    src: "/pondfest/maps/full.webp",
    full: "/pondfest/maps/full-lg.webp",
    alt: "Pond Fest 2026 site map showing all three event areas around Lums Pond, the walking path between Areas 1 and 2, the bus stops, and a key to what is in each area.",
    note: "Area 1 is the main hub, Area 2 is community and kids, Area 3 is the First Responders Block Party.",
  },
  {
    id: "area-1",
    label: "Area 1",
    title: "Area 1: the main hub",
    src: "/pondfest/maps/area-1.webp",
    full: "/pondfest/maps/area-1-lg.webp",
    alt: "Detail map of Area 1 showing the Wingspan and Monarch stages, beer garden, craft vendors, raffles and auction, Junior Jam, open mic, food trucks, merch, and the info and check-in tent.",
    note: "Info, check-in, first aid and the merch store are all here, next to the bus stop.",
  },
  {
    id: "area-2",
    label: "Area 2",
    title: "Area 2: community and kids",
    src: "/pondfest/maps/area-2.webp",
    full: "/pondfest/maps/area-2-lg.webp",
    alt: "Detail map of Area 2 showing the Nest Box stage, pickleball courts, horseshoes, dog agility, pony rides and petting zoo, face painting, the Kids Entrepreneur Market, playground, food trucks and restrooms.",
    note: "The playground, the pickleball courts and the Kids Entrepreneur Market are all in this area.",
  },
  {
    id: "area-3",
    label: "Area 3",
    title: "Area 3: First Responders Block Party",
    src: "/pondfest/maps/area-3.webp",
    full: "/pondfest/maps/area-3-lg.webp",
    alt: "Detail map of Area 3 showing the First Responders Block Party layout: fire trucks, police vehicles, motor and mounted units, bomb squad, K9, virtual reality, careers tent, food trucks and the bus stop.",
    note: "Across Buck Jersey Road from Area 2, with its own bus stop.",
  },
  {
    id: "shuttle-park",
    label: "Shuttle",
    title: "Shuttle: between the three areas",
    src: "/pondfest/maps/shuttle-park.webp",
    full: "/pondfest/maps/shuttle-park-lg.webp",
    alt: "Map of the in-park shuttle loop in red, connecting the bus stops at Area 1, Area 2 and Area 3, with the walking path between Areas 1 and 2 marked in blue.",
    note: "Free, all day. Areas 1 and 2 are also an easy walk along the blue path.",
  },
  {
    id: "shuttle-campground",
    label: "Campground",
    title: "Shuttle: to and from the campground",
    src: "/pondfest/maps/shuttle-campground.webp",
    full: "/pondfest/maps/shuttle-campground-lg.webp",
    alt: "Map of the campground shuttle route in orange, running from the event areas out through the park entrance and around to the Lums Pond campground.",
    note: "Camping with us? The campground is a drive around the outside of the park, so plan on the shuttle both ways.",
  },
];

// ── Today's timeline ────────────────────────────────────────────
// The fixed moments: the ones you miss if nobody tells you. Things that
// simply run all day belong in AMENITIES, not here. `start` is 24-hour
// and drives both the sort and the "up next" marker on event day.
export const KEY_TIMES: KeyTime[] = [
  {
    start: "11:00",
    time: "11:00 AM",
    title: "Gates open, and the first sets start",
    icon: "fa-door-open",
    detail:
      "The Sarah Koon Band on Wingspan and Brian Corcoran on Monarch, both in Area 1.",
  },
  {
    start: "11:30",
    time: "11:30 AM",
    title: "Open mic starts",
    icon: "fa-microphone-lines",
    area: "Area 1",
    detail:
      "Hosted by the Original Music Association of Delaware. A new act every half hour; the last slot is 5:30.",
  },
  {
    start: "12:00",
    time: "12:00 PM",
    title: "K9 demonstration",
    icon: "fa-dog",
    area: "Area 3",
    detail: "The Wilmington Police Department K9 Unit, at the Block Party.",
  },
  {
    start: "12:00",
    time: "12:00 PM",
    title: "Kids Entrepreneur Market opens",
    icon: "fa-lightbulb",
    area: "Area 2",
    detail: "Twenty-plus booths, every one run by a kid. Open until 4:00.",
  },
  {
    start: "12:00",
    time: "12:00 PM",
    title: "Pickleball ladder: beginner and intermediate",
    icon: "fa-table-tennis-paddle-ball",
    area: "Area 2",
    detail: "Runs to 2:00. The advanced session starts at 2:30.",
  },
  {
    start: "12:00",
    time: "12:00 PM",
    title: "Horseshoes open play",
    icon: "fa-bullseye",
    area: "Area 2",
    detail:
      "The First State Horseshoe Club, until 5:00. Walk up whenever a pitch is free.",
  },
  {
    start: "14:30",
    time: "2:30 PM",
    title: "Pickleball ladder: advanced",
    icon: "fa-table-tennis-paddle-ball",
    area: "Area 2",
    detail: "3.5 and above, until 4:30.",
  },
  {
    start: "15:00",
    time: "3:00 PM",
    title: "Raffle, 50/50 and silent auction close",
    icon: "fa-ticket",
    area: "Area 1",
    detail: "Last call. Tickets in and final bids down before three.",
  },
  {
    start: "16:00",
    time: "4:00 PM",
    title: "Winners announced",
    icon: "fa-trophy",
    area: "Area 1",
    detail:
      "Posted on this page and on a yard sign at the raffle table. Pick up by 5:00.",
  },
  {
    start: "16:00",
    time: "4:00 PM",
    title: "Pickleball bench dedication",
    icon: "fa-award",
    area: "Area 2",
    detail:
      "The new benches at the courts are Thomas Carpenter's Eagle Scout service project. Come say thank you, and sit down.",
  },
  {
    start: "17:00",
    time: "5:00 PM",
    title: "Last call to claim prizes",
    icon: "fa-hourglass-end",
    area: "Area 1",
    detail:
      "Anything unclaimed at five is redrawn, and only among people still at the fest.",
  },
  {
    start: "17:30",
    time: "5:30 PM",
    title: "Final sets end",
    icon: "fa-guitar",
    detail: "Hippocampus on Wingspan and the Billy Pierce Band on Monarch.",
  },
  {
    start: "18:00",
    time: "6:00 PM",
    title: "Pond Fest ends",
    icon: "fa-flag-checkered",
    detail: "Thanks for coming. See you next October.",
  },
];

// ── Open mic ────────────────────────────────────────────────────
// Run by OMAD on the Area 1 open mic stage. Walk-ups take whatever
// slots are still open, so this is the booked list, not a closed one.
export const OPEN_MIC_SLOTS: OpenMicSlot[] = [
  { time: "11:30 AM", name: "Adam Molden" },
  { time: "12:00 PM", name: "James McCloskey" },
  { time: "12:30 PM", name: "Marco Arcana" },
  { time: "1:00 PM", name: "Jaid" },
  { time: "1:30 PM", name: "Tim Hynson" },
  { time: "2:00 PM", name: "Darren Michener" },
  { time: "2:30 PM", name: "Pete Richardson" },
  { time: "3:00 PM", name: "Lynne Gong" },
  { time: "3:30 PM", name: "Joe X Brand" },
  { time: "4:00 PM", name: "Strays & Misfits" },
  { time: "4:30 PM", name: "Khristian Chesney" },
  { time: "5:00 PM", name: "Landfall" },
  { time: "5:30 PM", name: "Orlando Duran" },
];

// ── Food trucks ─────────────────────────────────────────────────
// Grouped by area on the page. Fifteen trucks across the three areas.
export const FOOD_TRUCKS: FoodTruck[] = [
  { name: "Backyard Squeeze", area: 1 },
  { name: "Carl's Gourmet Hots & Sandwiches", area: 1 },
  { name: "DeMex Street Foods", area: 1 },
  { name: "Dixie's Down Home Cooking", area: 1 },
  { name: "Kona Ice", area: 1 },
  { name: "Savage Delight Food Truck", area: 1 },
  { name: "Two Friends Coffee", area: 1 },

  { name: "Angel's Kitchen", area: 2 },
  { name: "Bruster's Ice Cream Truck", area: 2 },
  { name: "Sippin on Sunshine", area: 2 },
  { name: "We Aim to Cheese", area: 2 },
  { name: "Woody's on Wheels", area: 2 },

  { name: "Donut NV", area: 3 },
  { name: "Koi on the Go", area: 3 },
  { name: "UDairy Creamery Truck", area: 3 },
];

// ── Craft vendors and nonprofits ────────────────────────────────
// Under the tents in Area 1, as the names were given to us. One
// alphabetical list rather than "craft" and "nonprofit": several are
// both, and nobody walking the row is sorting them that way.
export const CRAFT_VENDORS: string[] = [
  "3D Layer Foundry",
  "Art By M. Johnston",
  "Backyard Squeeze",
  "Beaded Expressions",
  "Becca Roberts Studio",
  "Bright Ideas Graphics",
  "Buds Bait & Tackle",
  "Cakepops by Tori",
  "Cherished Crystal Treasures",
  "Cheyla's Rescue Foundation",
  "DiLi Creations",
  "Dying to Impress",
  "Elayne James Salon",
  "GIFTMOOR LLC",
  "Kails Craft Co",
  "Krafty Khaos",
  "Little Garden Inkwell",
  "Love Lee Boutique",
  "MadeByMissTish",
  "Megan's Creations",
  "MJMBOOKS",
  "NCC Libraries (Bear Library)",
  "Not Broken, Just Custom",
  "Ohana Bonded Forever LinkSmith",
  "One Creation International",
  "PAWS for People",
  "PraPari and Co",
  "Russ's Angels",
  "Sasnspice Sweets",
  "Scentsy",
  "Shilpifinearts",
  "The Bewitching Beetle",
  "The Healing Garden Botanical Apothecary",
  "The Witches of the Eastt",
  "Thorin's Promise",
  "ToodleBug Design",
  "William Francis",
  "Woodhill Hives, LLC",
];

// ── First responders at the Block Party ─────────────────────────
// Eleven agencies in Area 3, alphabetical, named as they were given to us.
export const FIRST_RESPONDERS: string[] = [
  "Delaware Capitol Police",
  "Delaware Department of Correction",
  "Delaware River & Bay Authority Police",
  "Delaware State Police",
  "Division of Alcohol & Tobacco Enforcement",
  "Marshalls",
  "New Castle County Police",
  "Newark Police Department",
  "Townsend Police Department",
  "Volunteer Hose Company",
  "Wilmington Police Department",
];

// ── Sponsor advertisements ──────────────────────────────────────
// A swipeable rail of thumbnails that open the full ad on tap. Only the
// thumbnails are fetched until somebody taps one. Files live in
// public/pondfest/ads/ as <slug>-thumb.webp (about 600px) and <slug>.webp
// (about 1400px). `alt` says what the ad shows; `url` only where the ad
// itself prints an address, never a guess.
export const SPONSOR_ADS: SponsorAd[] = [
  {
    slug: "christiana-care",
    sponsor: "ChristianaCare",
    alt: "ChristianaCare ad reading 'For the love of your health,' with a QR code to visit ChristianaCare.org or request an appointment.",
    url: "https://christianacare.org/",
  },
  {
    slug: "union-park",
    sponsor: "Union Park BMW",
    alt: "Union Park BMW ad reading 'Confidence Comes Standard,' with a green BMW SUV parked outside the showroom in Wilmington.",
    url: "https://www.unionparkbmw.com/",
  },
  {
    slug: "mr-mulch",
    sponsor: "Mr Mulch",
    alt: "Mr. Mulch Middletown ad for mulch, stone and pavers, with photos of a stone outdoor kitchen, a fire pit and a paver patio.",
    url: "https://www.mrmulchdelaware.com/",
  },
  {
    slug: "premier-paws",
    sponsor: "Premier Paws LLC",
    alt: "Premier Paws Pet Care ad for licensed vet tech home care and professional pet sitting, with a black and purple paw print logo.",
    url: "https://premierpawspetcare.com/",
  },
  {
    slug: "little-bear",
    sponsor: "Little Bear Dog Care",
    alt: "Little Bear Dog Care and Training ad for dog trainer Emily McMichael, with a cartoon puppy holding a teddy bear outside a doghouse.",
  },
  {
    slug: "rainbow-records",
    sponsor: "Rainbow Records",
    alt: "Rainbow Records of Newark ad saying they buy record, CD and cassette collections, over a close-up of a black vinyl record.",
    url: "https://rainbowrecordsde.com/",
  },
  {
    slug: "eric-morrison",
    sponsor: "Eric Morrison",
    alt: "Rep. Eric Morrison, 27th District, thanks the organizers and everyone who maintains Lums Pond, with a photo of him in the House chamber.",
  },
];

// Out & About magazine's October issue carries a Pond Fest feature, "Park
// People" by David Ferguson (pages 29 and 30). The plain web page loads far
// better on park cell data than the page-turner. Leave the URL empty to hide
// the link.
export const OUT_AND_ABOUT_URL = "https://outandaboutnow.com/park-people/";
export const OUT_AND_ABOUT_LABEL =
  "“Park People” by David Ferguson, Out & About, October 2026";

// ── Thank-yous: the people ──────────────────────────────────────
// PARTNERS is the organizations; this is the people. A group with an intro
// and an empty `names` list still renders, which is how the parks staff
// entry works: the names are in the sentence.
//
// Volunteers are listed alphabetically by last name, as the names were
// given to us. Two to look at: "Jessica Bell and daughter" came to us as
// "Jessica Bell/Dtr." and should carry the daughter's name; "Thabisile"
// came with no surname.
export const THANKS_GROUPS: ThanksGroup[] = [
  {
    title: "Volunteers",
    icon: "fa-people-group",
    intro:
      "Eighty-seven people gave up a Saturday to set up tents, pour beer, mind the gates, run the kids' zone, and take it all down again. Pond Fest is their work.",
    names: [
      "Sarah Anderson",
      "Michaela Anthony",
      "Lukemon Arzoi",
      "Lois Baker",
      "Judah Baronskowski",
      "Samantha Baronskowski",
      "Caroline Bass",
      "Dave Becker",
      "Jessica Bell and daughter",
      "Deanna Buckson",
      "Tyler Buzby",
      "Ann Carpenter",
      "Marjorie Carter",
      "Mike Cathell",
      "Valerie Cheyney",
      "Giovanni Ciranni",
      "Bob Conley, Sr",
      "Linda Conley",
      "John Deakins",
      "Theresa Deakins",
      "Claire Denney",
      "Stephanie Doodigan",
      "Lea Eshaghoff",
      "Victoria Esposito",
      "Grace Ezell",
      "Grace Farrell",
      "Fabian Fernandez",
      "Chris Funcheon",
      "Diane Gearhart",
      "Amaresh Gopalaswamy",
      "Chris Grady",
      "Nicole Habbe",
      "Jodi Hartlep",
      "Logan Hayden",
      "Shanee Haymon",
      "Kaci Ieppert",
      "John Jacob",
      "John Jacob III",
      "Patty Jacob",
      "Kayla Johnson",
      "Maddie Johnson",
      "Erica Keibel",
      "Kaitlin Knox",
      "Laural Kretzer",
      "Jacque Lukaszewicz",
      "Ellen Lyons",
      "John Lyons",
      "Soufian Mankour",
      "Laurie Maragas",
      "Kathy Maslar",
      "Quinn Masset",
      "Karen McCloskey",
      "Aaron McGraw",
      "Candace McGraw",
      "Emily McMichael",
      "Bob Mercer",
      "Bryan Mey",
      "Jessie Mey",
      "Austen Morgan",
      "Edan Mowles",
      "Justin Mowles",
      "Lauren Mowles",
      "Jean Mullin",
      "Michael Newell",
      "Celeste Rivera",
      "Isabella Rivera",
      "Brian Roache",
      "Clara Robbs",
      "Candace Rodriguez",
      "Vicky Roland",
      "Julia Santini",
      "Brianna Schetzler",
      "Margot Shea",
      "Nancy Sheehan-Becker",
      "Emma Shubrook",
      "Matthew Silva",
      "Isabel Smith",
      "Thabisile",
      "Aaliyah Townsend",
      "Fran Travis",
      "Sophia Travlos",
      "Kobo Valladares-Aguilar",
      "Brenna Vendrick",
      "Samantha White",
      "Alyssa Winner",
      "Atlee Yetter",
      "Jennifer Zakrzewski",
    ],
  },
  {
    title: "Delaware State Parks staff",
    icon: "fa-tree",
    intro:
      "Alex Hannah, Arden Locker, Lisa McHugh, Beth Daliessio, Sam Bosserman, and a long list of others who answered the phone, moved the picnic tables, and said yes to things that made more work for them. Pond Fest happens in their park, with their help, all year.",
    names: [],
  },
  {
    title: "Sound engineers",
    icon: "fa-sliders",
    intro: "Three stages, one day, and none of it heard without them.",
    names: [
      "Dave Muddiman (Starground Audio)",
      "Ernie Bouey (PawPrint Productions)",
      "Keith Thompson (Vice Squad)",
    ],
  },
  {
    title: "Emcees and DJs",
    icon: "fa-microphone",
    intro: "Keeping the day moving between the sets.",
    names: ["DJ DLyte", "Tom the Spokesman"],
  },
  {
    title: "WSFS",
    icon: "fa-paintbrush",
    intro:
      "WSFS sent a crew for their We Stand For Service day. They made signs, cleaned up, and had the horseshoe pits ready before the rest of us showed up.",
    names: [],
  },
];

// Thomas Carpenter's Eagle Scout service project, dedicated at 4:00 in
// Area 2. Also in KEY_TIMES; this is the longer acknowledgement. He raised
// most of the money himself and Friends of Lums Pond covered part of it, so
// the wording credits both without taking the project away from him.
export const EAGLE_SCOUT_NOTE =
  "The benches at the pickleball courts are new this year, and they are Thomas " +
  "Carpenter's Eagle Scout service project. He designed them, raised most of the " +
  "money for them himself, and built and installed them, with Friends of Lums Pond " +
  "covering part of the cost. They are here for good. We are dedicating them at " +
  "4:00 in Area 2. Come and sit down.";
// A shorter version, if you would rather:
//   "The new benches at the pickleball courts are Thomas Carpenter's Eagle
//   Scout service project: his design, mostly his fundraising, and his
//   build, with Friends of Lums Pond covering part of the cost. We dedicate
//   them at 4:00 in Area 2."

// ── After the festival ──────────────────────────────────────────
// Shown at the top of the page once the day is over (the "afterglow"
// phase). Put the headline numbers here when you have them, for instance
// "About 2,500 of you came, and together we raised $31,400 for the kayak
// launch and the field trip fund." Leave it empty until then and the page
// says the count is still coming.
export const AFTERGLOW_RESULTS = "";

// ── Next year ───────────────────────────────────────────────────
// Pond Fest is the second Saturday of October, every year.
export const NEXT_YEAR = 2027;
export const NEXT_EVENT_DATE_DISPLAY = "Saturday, October 9, 2027";
export const NEXT_EVENT_TIME = "11:00 AM – 6:00 PM";
export const NEXT_EVENT_ICS_URL = "/pondfest/pond-fest-2027.ics";
// Google's "add to calendar" template. Times are UTC: October 9, 2027 is
// still daylight time (UTC-4), so 11:00 local is 15:00Z and 18:00 is 22:00Z.
export const NEXT_EVENT_GOOGLE_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Pond%20Fest%202027" +
  "&dates=20271009T150000Z/20271009T220000Z" +
  "&details=The%20fourth%20annual%20Pond%20Fest%20at%20Lums%20Pond%20State%20Park.%20" +
  "Free%20to%20attend.%20Details%3A%20https%3A%2F%2Ffriendsoflumspond.org%2Fpondfest" +
  "&location=Lums%20Pond%20State%20Park%2C%201068%20Howell%20School%20Rd%2C%20Bear%2C%20DE%2019701";

// ── Membership ──────────────────────────────────────────────────
export const MEMBERSHIP_URL = "https://donorbox.org/friends-of-lums-pond";
export const MEMBERSHIP_INFO_URL = "/resources/membership";
export const MEMBERSHIP_NOTE =
  "Dues are $10 a year. Members vote, get the member-only emails about " +
  "events and planning, and get a member sticker every year.";
