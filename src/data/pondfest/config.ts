import type { FAQItem, FundingGoal, Performer, Sponsor } from "./types";

// ─────────────────────────────────────────────
// UPDATE THIS SECTION EACH YEAR
// See UPDATING.md for step-by-step instructions
// ─────────────────────────────────────────────

export const CURRENT_YEAR = 2026;

// ISO datetime — used for countdown and day-of mode trigger
export const EVENT_DATE = "2026-10-10T10:00:00";

// Human-readable strings shown on the page
export const EVENT_DATE_DISPLAY = "Saturday, October 10, 2026";
export const EVENT_TIME = "11:00 AM – 6:00 PM";
export const EVENT_LOCATION = "Lums Pond State Park, Bear, DE";
export const EVENT_TAGLINE =
  "A concert for a cause — live music, food, community, and nature.";
export const FUNDRAISING_GOAL = "$30,000";

// Hero and map images — place files in public/pondfest/
// For 2026, update these filenames when assets are ready
export const HERO_IMAGE_URL = "/blog/25-05-09_pond-fest-hero.jpg"; // placeholder
export const EVENT_MAP_IMAGE_URL = ""; // e.g. "/pondfest/map-event.jpg"
export const PARKING_MAP_IMAGE_URL = "";
export const VENDOR_MAP_IMAGE_URL = "";

// ─────────────────────────────────────────────
// PHOTOS — download from Lightroom → public/pondfest/photos/
// Then reference as "/pondfest/photos/filename.jpg"
// ─────────────────────────────────────────────

// Full-width photo band between Lineup and Get Involved sections
// Recommended: wide panoramic crowd/stage shot (landscape, high-res)
export const PHOTO_BAND_1_URL = "";

// Gallery grid on the index page (4 photos shown, landscape 4:3 recommended)
export const GALLERY_PHOTOS: string[] = [
  // e.g. "/pondfest/photos/crowd-1.jpg",
  // e.g. "/pondfest/photos/music-1.jpg",
  // e.g. "/pondfest/photos/kids-1.jpg",
  // e.g. "/pondfest/photos/vendors-1.jpg",
];

// Background photo for the History Teaser section
// Recommended: aerial or wide crowd/event overview shot
export const HISTORY_BG_PHOTO = "";

// External URLs — update as they become available
export const TICKETS_URL = ""; // Eventbrite link
export const VOLUNTEER_URL = ""; // SignUpGenius or Google Form
export const SPONSOR_URL = ""; // Google Form or sponsor package PDF
export const VENDOR_URL = ""; // Vendor interest form
export const PERFORMER_URL = ""; // 2026 interest form

// Contact
export const PONDFEST_EMAIL = "pondfest@friendsoflumspond.org";

// ─────────────────────────────────────────────
// DAY-OF FIELDS — populate the week of the event
// ─────────────────────────────────────────────

// Shown in an orange banner at the top of the page; leave empty to hide
export const DAY_OF_ALERT = "";

export const SHUTTLE_INFO = "";
export const PARKING_NOTES =
  "Main parking in Area 1 (event location). Overflow in Area 2 near the playground. Follow Pond Fest signs.";
export const RAFFLE_LINK = ""; // link to raffle results / info page
export const AUCTION_LINK = ""; // link to auction results / info page
export const FEEDBACK_LINK = ""; // Google Form survey link
export const DONATION_EMBED_URL = ""; // Donorbox embed URL for this year

// ─────────────────────────────────────────────
// LINEUP — add performers as they are confirmed
// ─────────────────────────────────────────────

export const LINEUP: Performer[] = [
  // Example:
  // { name: "Lucky Stone", stage: "Wingspan Stage", time: "2:00 PM – 4:00 PM" },
];

// ─────────────────────────────────────────────
// SPONSORS — add as they are confirmed
// ─────────────────────────────────────────────

export const SPONSORS: Sponsor[] = [
  // Example:
  // { name: "Granite-Corinthian Lodge No. 34", tier: "platinum" },
];

// ─────────────────────────────────────────────
// FUNDING GOALS for this year
// ─────────────────────────────────────────────

export const FUNDING_GOALS: FundingGoal[] = [
  {
    name: "Youth Scholarships",
    description:
      "Subsidize environmental education field trips for Title 1 schools at Lums Pond. In 2024, 524 students attended these outdoor experiences.",
    imageUrl: "", // e.g. "/pondfest/photos/students-field-trip.jpg"
    donorboxUrl: "",
  },
  {
    name: "Accessible Kayak Launch",
    description:
      "Complete funding for a BoardSafe Accessible Kayak Launch, opening Lums Pond's waters to visitors of all abilities.",
    imageUrl: "", // e.g. "/pondfest/photos/kayak-launch.jpg"
    donorboxUrl: "",
  },
];

// ─────────────────────────────────────────────
// FAQ — timeless questions; update answers as needed
// ─────────────────────────────────────────────

export const FAQ: FAQItem[] = [
  {
    question: "What is Pond Fest?",
    answer:
      "Pond Fest is the annual signature fundraiser of Friends of Lums Pond State Park (FOLP), a 501(c)(3) nonprofit. It's a community outdoor festival featuring live music, local craft vendors, food trucks, a beer garden, kids activities, raffles, and more — all set in Lums Pond State Park in Bear, Delaware. Held every second Saturday of October, Pond Fest raises funds for park programs, facilities, and conservation.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "General admission is free! Some activities such as the kids zone, hayride, and beer garden have optional additional costs. Bring cash or card for vendors and food trucks.",
  },
  {
    question: "Is it family friendly?",
    answer:
      "Absolutely. Pond Fest is designed for all ages. There is a dedicated kids zone with crafts, games, and activities. Children are welcome throughout the event.",
  },
  {
    question: "Is there parking?",
    answer:
      "Yes, parking is available on-site at Lums Pond State Park. A Delaware State Parks vehicle entry fee applies (annual passes accepted). Overflow parking and walking routes are available when needed — check back closer to the event for updated maps.",
  },
  {
    question: "What should I bring?",
    answer:
      "Lawn chairs or blankets for the music areas, cash (some vendors are cash-preferred), comfortable walking shoes, sunscreen, and a reusable water bottle. Leashed pets are welcome.",
  },
  {
    question: "Is Pond Fest rain or shine?",
    answer:
      "Yes, Pond Fest is a rain-or-shine event. In the case of severe weather or lightning, safety protocols will be followed and updates will be posted here and on our Facebook page.",
  },
  {
    question: "What causes does Pond Fest support?",
    answer:
      "Each year Pond Fest raises funds for specific park projects and programs — see the fundraising goals listed above. All proceeds support Friends of Lums Pond's mission of preserving and enhancing Lums Pond State Park.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes! Pond Fest runs on volunteers. We need help with setup, the kids zone, information tables, day-of operations, and more. Visit the Get Involved page or sign up via the Volunteer link above.",
  },
  {
    question: "Where exactly is the event held?",
    answer:
      "Lums Pond State Park is located at 1068 Howell School Rd, Bear, DE 19701. Pond Fest is held in the picnic and pavilion areas near the park's main facilities. Signage will guide you from the entrance.",
  },
];
