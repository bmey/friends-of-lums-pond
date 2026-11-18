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
  SponsorTier,
  ThanksGroup,
  Tap,
} from "./types";

// ─────────────────────────────────────────────
// UPDATE THIS SECTION EACH YEAR
// See UPDATING.md for step-by-step instructions
// ─────────────────────────────────────────────

export const CURRENT_YEAR = 2027;

// ISO datetime, Eastern. Drives the countdown and decides which of the three
// phases the page is in (see PHASE_OVERRIDE below). Gates open at 11:00.
export const EVENT_DATE = "2027-10-09T11:00:00";

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
export const EVENT_DATE_DISPLAY = "Saturday, October 9, 2027";
export const EVENT_TIME = "11:00 AM – 6:00 PM";

// The standing promise, made in 2026. Pond Fest 2024 was October 12 and 2025
// was October 4, both one-offs; 2026 was the first year we committed to a fixed
// weekend so people can plan around it. Say it before, during and after the
// event, every year.
export const ANNUAL_PROMISE =
  "Pond Fest is the second Saturday of October, every year. Mark it now.";
export const ANNUAL_PROMISE_SHORT = "Second Saturday of October, every year.";
export const EVENT_LOCATION = "Lums Pond State Park, Bear, DE";
export const EVENT_TAGLINE =
  "A concert for a cause. Live music, food, community, and nature.";
// The dollar goal for this year, once the board has set it. Leave it empty
// until then: the Fundraising section runs without a number rather than
// carrying last year's.
export const FUNDRAISING_GOAL = "";

// Hero and map images — place files in public/pondfest/
export const HERO_IMAGE_URL = "/pondfest/hero.jpg";
// Phone-sized copy of the hero. It is a CSS background, so without this a
// phone downloads the full desktop file before it can paint anything.
export const HERO_IMAGE_MOBILE_URL = "/pondfest/hero-sm.jpg";
export const OG_IMAGE_URL = "/pondfest/og.jpg";
export const EVENT_MAP_IMAGE_URL = "";
// Last year's map, still offered in the press kit until the new one exists.
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

// Delaware State Parks turned 75 in 2026 and Pond Fest was part of it. The
// section, the strip under the hero and the video stay in the page; this turns
// them on. It was a one-year celebration, so it is off now.
export const SEVENTY_FIFTH_ACTIVE = false;
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
export const MERCH_URL = "";
// When the store closes: ISO datetime with the Eastern offset (-04:00 in
// September and October). After this moment the page swaps its pre-order
// buttons for "shop at the merch tent" on its own, so nobody has to rebuild
// the site that day. Leave empty for a pre-sale with no end date.
export const MERCH_PRESALE_DEADLINE = "";
export const MERCH_PRESALE_DEADLINE_DISPLAY = "";

// Donations go to the general fund between festivals. Point this at the new
// Donorbox campaign once there is one for this year's Pond Fest.
export const PONDFEST_DONATE_URL =
  "https://donorbox.org/friends-of-lums-pond-state-park?default_interval=o";

// While this is set, every Get Involved card points here instead of at its own
// form: one early-bird list, gathered over the winter. Clear it when the
// volunteer, vendor and sponsor forms below are ready for the new year and each
// card goes back to its own.
export const INTEREST_URL = "https://forms.gle/HjycU4ebrxwHUW2X6";

export const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejXUBtCgim_Q1gnda4ctmi64cHBA1zQ9UbfH7JSyOAKmBOyg/viewform";
// The 2026 sponsorship package. Replace it with this year's before clearing
// INTEREST_URL above.
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
export const FACEBOOK_EVENT_URL = "";
export const INSTAGRAM_URL = "https://www.instagram.com/friendsoflumspond";
export const HASHTAGS = ["#DEStateParks", "#LumsPondFest"];

// ─────────────────────────────────────────────
// DAY-OF FIELDS — populate the week of the event
// ─────────────────────────────────────────────

// Shown in an orange banner at the top of the page; leave empty to hide
export const DAY_OF_ALERT = "";

export const SHUTTLE_INFO =
  "A free shuttle loops between Areas 1, 2, and 3 and the Lums Pond campground all day. The " +
  "three event areas are an easy walk from each other. The campground is not, so if you're " +
  "camping, plan on riding the shuttle both ways.";
export const PARKING_NOTES =
  "There is free parking at all three event areas. Follow the Pond Fest signs from the park " +
  "entrance; an officer directs traffic at the area split, and the welcome team is at the fee " +
  "booth. The standard park entrance fee is collected at the gate: $5 for Delaware vehicles, " +
  "$10 out-of-state, and annual passes are accepted.";
export const FEE_NOTE =
  "Free to attend. The standard park entrance fee still applies at the gate: $5 for Delaware " +
  "vehicles, $10 out-of-state, and annual passes are accepted.";
export const BRING_NOTE =
  "Chairs, blankets, layers for an October day, cash or card, water.";
export const RAIN_DATE_NOTE =
  "Rain date: Sunday, October 10. If anything changes we will post it here and on our socials.";
export const DOG_NOTE =
  "Pond Fest is dog-friendly. Leashed dogs are welcome in all three areas, per park rules, " +
  "and there is an agility course for them in Area 2. Bring water and a bowl; it is a long " +
  "day outdoors for them too.";

export const RAFFLE_LINK = ""; // link to raffle results / info page
export const AUCTION_LINK = ""; // link to auction results / info page
// The survey from last October. It stays up over the winter: what people
// answer here is what next year gets built from.
export const FEEDBACK_LINK = "https://forms.gle/WiB4UH4xDt9XQbjh8";

// ─────────────────────────────────────────────
// LINEUP, in the order the acts play. `stage` and `time` feed the schedule
// grid and the "on right now" panel as well as the band cards, so write the
// time as "11:00 AM – 12:15 PM" or "12:45 – 2:00 PM" (an en-dash, and AM/PM
// on at least one side). Before set times exist, keep the list alphabetical
// (ignoring "The") and leave both fields off.
// ─────────────────────────────────────────────

export const LINEUP: Performer[] = [];

export const EMCEES: Performer[] = [];

// ─────────────────────────────────────────────
// SPONSORS — add as they are confirmed
// Tiers: diamond, platinum, gold, silver, bronze, family, and "special" for
// Special Thanks (supporters outside the paid tiers, listed last). Order
// within a tier is the order shown. Logos are a separate pass.
// ─────────────────────────────────────────────

// The year this list was raised for. While it is behind CURRENT_YEAR the
// Sponsors section says so, so last year's backers keep their thank-you
// without reading as though they have already signed for this one. Set it to
// CURRENT_YEAR with the first sponsor of the new year.
export const SPONSORS_YEAR = 2026;

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

export const PARTNERS: Partner[] = [];

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

export const MERCH_ITEMS: MerchItem[] = [];

// Small goods sold at the merch tent on event day. No photos: they are all the
// same heron artwork, and a row of names reads faster than eight pictures.
export const MERCH_AT_THE_FEST: string[] = [];

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
    desc: "Three stages: Wingspan and Monarch in Area 1, the Nest Box pavilion in Area 2. Every performer donates the day. The lineup goes up here as acts are booked.",
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
    url: "#pf-whos-here", // every agency, listed further down the page
    desc: "A full day with Delaware's fire, police, and EMS crews: engines and equipment out on the grass, and the people who answer the call standing next to it, happy to talk to your kids.",
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
    url: "#pf-whos-here", // what is on tap, further down the page
    desc: "Local and regional breweries pouring all day. Who is on the taps goes up here once the list is set.",
    imageUrl: "/pondfest/beer.jpg",
    imageAlt: "A volunteer handing a cup of beer across the taps",
  },
  {
    id: "food-trucks",
    icon: "fa-utensils",
    title: "Food Trucks",
    area: "All three areas",
    url: "#pf-whos-here", // the full list, by area, further down the page
    desc: "Trucks spread across the three areas, so you're never far from lunch. Bring cash or card.",
    imageUrl: "/pondfest/food-truck2.jpg",
    imageAlt: "A line of visitors waiting at a row of food trucks",
  },
  {
    id: "kids-market",
    icon: "fa-lightbulb",
    title: "Kids Entrepreneur Market",
    area: "Area 2",
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
    url: "https://diamondstatepickleballclub.com/",
    desc: "Ladder sessions run by the Diamond State Pickleball Club, split by level. Win your court and you move up a court, lose and you move down, so you spend the afternoon playing people at your own level. Doubles, with partners assigned that day, so sign up on your own. Entry is donated to Friends of Lums Pond, and there are prizes for the winners. Registration opens with the rest of the sign-ups.",
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
    desc: "Open play with the First State Horseshoe Club. Walk up, pick up a shoe, and a club member will show you how it is done. No experience and no equipment needed, and all ages are welcome. One-hour slots can be reserved ahead of time once sign-ups open; walk-ups are welcome whenever a pitch is free.",
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
    desc: "A whole tent of baskets and prizes donated by local businesses, plus the 50/50. Entries close in the afternoon and winners are posted here and on a sign at the raffle table, with time left to pick up your prize before the gates close.",
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
    desc: "A walk-in shop in Area 1: that year's shirts and hats, plus stickers, pins, posters, and other small goods. Grab a basket, browse, and check out at the counter. Pre-orders are collected at the info tent next door.",
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
    desc: "Crate digging on wheels: a school bus rebuilt into a record shop, bins down both sides and a rug in the middle. Rainbow Records of Newark parks it up next to the Airstream.",
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
      "Pond Fest is the annual signature fundraiser of Friends of Lums Pond State Park (FOLP), a 501(c)(3) nonprofit. It is a free community festival with live music on three stages, local vendors, food trucks, a beer garden, kids' activities, raffles, and more. The fourth annual Pond Fest is Saturday, October 9, 2027, across three areas of the park. Every dollar raised supports Lums Pond State Park.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "Pond Fest is free to attend, and there is no ticket. The only cost to get in is the standard Delaware State Parks vehicle entrance fee at the gate: $5 for Delaware plates, $10 for out-of-state (annual passes accepted; see destateparks.com). A few activities cost extra, like the pickleball ladder and the dog agility mini-lessons, along with food, drinks, and the beer garden. Bring cash or card.",
  },
  {
    question: "When is Pond Fest each year?",
    answer:
      "The second Saturday of October, starting in 2026. The first two were October 12, 2024 and October 4, 2025. From there the date is fixed so you can plan around it: October 10, 2026, then October 9, 2027, then October 14, 2028.",
  },
  {
    question: "What if it rains?",
    answer:
      "Pond Fest 2027 is planned for Saturday, October 9, with a rain date of Sunday, October 10. If weather forces a change, we'll announce it right here at the top of this page and on our Facebook and Instagram, so check back before you head out.",
  },
  {
    question: "Where do I park, and how do I get around?",
    answer:
      "There is free parking at all three event areas. Follow the Pond Fest signs from the park entrance at 1068 Howell School Rd. Areas 1, 2, and 3 are all walkable, with a marked path connecting Area 1 to Area 2, and a free shuttle loops between all three areas throughout the day.",
  },
  {
    question: "How do I find what is in each area?",
    answer:
      "The event map goes up in Plan Your Visit, above, once the layout is set, and there are printed pamphlets at the fest. The walking path between Area 1 and Area 2 is signed, and the free shuttle loops between all three areas all day.",
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
      "Yes! Pond Fest is dog-friendly: leashed dogs are welcome throughout all three areas, in accordance with park rules. The Academy of Dog Training & Agility runs agility demonstrations and walk-up mini-lessons in Area 2 all day, so your dog can try the course too. It's a full day outdoors, so bring water and a bowl for them.",
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
    question: "Where is first aid, and how do I get help in another area?",
    answer:
      "First aid is in Area 1, at the info and check-in tent next to the bus stop. In Area 2 or Area 3, find the nearest volunteer: they carry walkie-talkies and can get a first responder to you wherever you are.",
  },
  {
    question: "What if a child gets separated from their family?",
    answer:
      "Bring the child to the main info tent in Area 1. The volunteers there take it from that point and reconnect the child with their parents. In another area, tell the nearest volunteer, who can radio ahead.",
  },
  {
    question: "Is Pond Fest stroller and wheelchair accessible?",
    answer:
      "Yes. The event areas are mostly flat and grassy, with paved park roads, and the free shuttle runs between all three areas all day. Every one of the three areas has marked accessible parking spaces, and the enforcement team there can get you into a proper spot. Lums Pond also has accessible trails, and Delaware State Parks keeps a free all-terrain Action Trackchair at the park: motorized treads, a tilting seat, and a companion joystick so someone can help you drive it. Reserve it at no cost by calling the park office at (302) 368-6989 at least 48 hours ahead; sessions are three hours and start with a short how-to video and a waiver. Planning a visit and want to know more? Email pondfest@friendsoflumspond.org and we will help however we can.",
  },
  {
    question: "What should I bring?",
    answer:
      "Layers for an October day outdoors, lawn chairs or blankets for the music areas, cash or card, comfortable walking shoes, sunscreen, and a reusable water bottle. Your own food and drink are fine too, and dogs are welcome on a leash. And a phone with the event map screenshotted, as above.",
  },
  {
    question: "What causes does Pond Fest support?",
    answer:
      "Two things right now: field trip assistance so students from Title I schools can experience the park, and the adaptive kayak launch that will open Lums Pond's waters to visitors of all abilities. See the fundraising goals above. Since 2024, Pond Fest has generated about $70,000 for Lums Pond.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes. Pond Fest runs on volunteers, and we need hands for setup, Junior Jam, info tables, and day-of operations. Shifts are short and the company is great. Shift sign-ups open in the spring; until then, put your name on the early list through Get Involved above, or email pondfest@friendsoflumspond.org any time and we will find you a job.",
  },
  {
    question: "I'm volunteering. Where do I park and check in?",
    answer:
      "Park the way everyone does: follow the Pond Fest signs and the officer at the area split, then check in at the info and check-in tent in Area 1, next to the bus stop. If Area 1 is full, park in the next area and either catch the shuttle or walk. Area 2 to Area 1 is about a quarter mile.",
    phases: ["prep", "event"],
  },
  {
    question: "Do volunteers pay the park entrance fee?",
    answer:
      "No. Show the parking pass we emailed you at the fee booth. If you already have a Delaware State Parks annual pass, that works too.",
    phases: ["prep", "event"],
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
export const EVENT_MAPS: EventMap[] = [];

// ── Today's timeline ────────────────────────────────────────────
// The fixed moments: the ones you miss if nobody tells you. Things that
// simply run all day belong in AMENITIES, not here. `start` is 24-hour
// and drives both the sort and the "up next" marker on event day.
export const KEY_TIMES: KeyTime[] = [];

// ── Open mic ────────────────────────────────────────────────────
// Run by OMAD on the Area 1 open mic stage. Walk-ups take whatever
// slots are still open, so this is the booked list, not a closed one.
export const OPEN_MIC_SLOTS: OpenMicSlot[] = [];

// ── Food trucks ─────────────────────────────────────────────────
// Grouped by area on the page. Fifteen trucks across the three areas.
export const FOOD_TRUCKS: FoodTruck[] = [];

// ── On tap ──────────────────────────────────────────────────────
// The beer garden board, one line per tap. `group` is the heading the
// board files it under: "ale", "ipa", "lager" or "other" (the vodka crush
// and the seltzers). Beer names as the board writes them, brewery names in
// full, since the board shortens them. No ABVs on purpose: people read
// those at the tent, and a number that is right on the chalkboard and
// stale here is worse than none. An empty list hides the block.
export const TAP_LIST: Tap[] = [];

// ── Craft vendors and nonprofits ────────────────────────────────
// Under the tents in Area 1, as the names were given to us. One
// alphabetical list rather than "craft" and "nonprofit": several are
// both, and nobody walking the row is sorting them that way.
export const CRAFT_VENDORS: string[] = [];

// ── First responders at the Block Party ─────────────────────────
// Eleven agencies in Area 3, alphabetical, named as they were given to us.
export const FIRST_RESPONDERS: string[] = [];

// ── Sponsor advertisements ──────────────────────────────────────
// A swipeable rail of thumbnails that open the full ad on tap. Only the
// thumbnails are fetched until somebody taps one. Files live in
// public/pondfest/ads/ as <slug>-thumb.webp (about 600px) and <slug>.webp
// (about 1400px). `alt` says what the ad shows; `url` only where the ad
// itself prints an address, never a guess.
// How much room each tier's ad gets, by the sponsor's tier in SPONSORS.
// On a wide screen "full" spans the whole row, "half" two columns of four
// and "quarter" one; on a phone the rail keeps swiping and a bigger tier
// is a wider slide. Order is always tier first, then the order below.
// A full slot is about 1,100px across, so a platinum or diamond ad needs
// its -thumb.webp rendered at 1,200px or wider, not the usual 600.
export const SPONSOR_AD_SIZES: Record<
  SponsorTier,
  "full" | "half" | "quarter"
> = {
  diamond: "full",
  platinum: "full",
  gold: "half",
  silver: "quarter",
  bronze: "quarter",
  family: "quarter",
  special: "quarter",
};

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
// given to us. The intro takes its count from the list, so do not type a
// number into it. Two to look at: "Jessica Bell and daughter" came to us
// as "Jessica Bell/Dtr." and should carry the daughter's name; "Thabisile"
// came with no surname.
export const VOLUNTEER_NAMES: string[] = [];

// The planning committee is everyone who met through the year to put the
// day together. All of them are in VOLUNTEER_NAMES too, on purpose: add a
// new member to both lists. Alphabetical by last name, like the volunteers.
export const THANKS_GROUPS: ThanksGroup[] = [];

// A note for the Special Thanks section when somebody has built something
// for the park that year. Empty between festivals. The 2026 entry was Thomas
// Carpenter's Eagle Scout project, the benches at the pickleball courts.
export const EAGLE_SCOUT_NOTE = "";

// ── After the festival ──────────────────────────────────────────
// Shown at the top of the page once the day is over (the "afterglow"
// phase). Put the headline numbers here when you have them, for instance
// "About 2,500 of you came, and together we raised $31,400 for the kayak
// launch and the field trip fund." Leave it empty until then and the page
// says the count is still coming.
export const AFTERGLOW_RESULTS = "";

// ── Next year ───────────────────────────────────────────────────
// Pond Fest is the second Saturday of October, every year.
export const NEXT_YEAR = 2028;
export const NEXT_EVENT_DATE_DISPLAY = "Saturday, October 14, 2028";
export const NEXT_EVENT_TIME = "11:00 AM – 6:00 PM";
export const NEXT_EVENT_ICS_URL = "/pondfest/pond-fest-2028.ics";
// Google's "add to calendar" template. Times are UTC: October 14, 2028 is
// still daylight time (UTC-4), so 11:00 local is 15:00Z and 18:00 is 22:00Z.
export const NEXT_EVENT_GOOGLE_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Pond%20Fest%202028" +
  "&dates=20281014T150000Z/20281014T220000Z" +
  "&details=The%20fifth%20annual%20Pond%20Fest%20at%20Lums%20Pond%20State%20Park.%20" +
  "Free%20to%20attend.%20Details%3A%20https%3A%2F%2Ffriendsoflumspond.org%2Fpondfest" +
  "&location=Lums%20Pond%20State%20Park%2C%201068%20Howell%20School%20Rd%2C%20Bear%2C%20DE%2019701";

// ── Membership ──────────────────────────────────────────────────
export const MEMBERSHIP_URL = "https://donorbox.org/friends-of-lums-pond";
export const MEMBERSHIP_INFO_URL = "/resources/membership";
export const MEMBERSHIP_NOTE =
  "Dues are $10 a year. Members vote, get the member-only emails about " +
  "events and planning, and get a member sticker every year.";
