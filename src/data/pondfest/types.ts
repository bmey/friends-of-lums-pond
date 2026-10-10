export interface Performer {
  name: string;
  stage?: string;
  time?: string;
  imageUrl?: string; // /pondfest/lineup/<slug>.webp
  imageWidth?: number; // natural pixel size of the file — sets the frame's
  imageHeight?: number; // aspect ratio so nothing jumps while photos load
  url?: string; // act's official site or page. For an emcee it links the
  // name in the "Hosted all day by" strip.
  blurb?: string; // a short paragraph, in the act's own words where possible
  canceled?: string; // set when the act pulls out: the one line that says
  // so. The act stays on the page, marked, because it was on every poster.
}

export type SponsorTier =
  | "diamond"
  | "platinum"
  | "gold"
  | "silver"
  | "bronze"
  | "family"
  | "special"; // "Special Thanks": supporters outside the paid tiers, e.g.
// elected officials who directed community funds our way. Listed last.

export interface Sponsor {
  name: string;
  tier: SponsorTier;
  url?: string;
}

// ── "Special Thanks" — the groups who bring an activity, a crew, or the park
// itself to the day. Kept apart from SPONSORS on purpose: these partners give
// us their people and their time rather than a sponsorship check, so a paid
// tier would misdescribe what they do.
export interface Partner {
  name: string;
  group: PartnerGroup;
  what?: string; // one short line on what they bring. Leave it off where the
  // group heading already says it (the breweries, for instance).
  url?: string; // their own site; turns the name into a link
}

export type PartnerGroup = "activities" | "beer" | "agency";

export interface FAQItem {
  question: string;
  answer: string;
  phases?: Phase[]; // when to show it; leave off for always
}

export interface FundingGoal {
  name: string;
  description: string;
  imageUrl?: string; // photo to show alongside this goal (16:9 recommended)
  donorboxUrl?: string;
  learnMoreUrl?: string; // e.g. the manufacturer's page for the thing we are buying
  learnMoreLabel?: string; // link text; defaults to "Learn more"
}

// ── "What to Expect" — one card per thing to do at the fest ──
export interface Amenity {
  id: string; // anchor id, e.g. "junior-jam"
  icon: string; // Font Awesome name, e.g. "fa-music"
  title: string;
  desc: string; // caption; a few sentences is fine where there is more to say
  area: string; // where to find it: "Area 1", "Areas 1 & 2", "All three areas"
  time?: string; // only when it does NOT run all day, e.g. "12:00 to 4:00"
  badge?: string | string[]; // small chip: "New", "21+", "Price TBD". Pass an
  // array for a card that needs two, e.g. ["New", "$10 entry"]
  url?: string; // partner's own site; turns the card title into a link
  links?: AmenityLink[]; // extra buttons under the card: sign-up forms,
  // registration pages, a mailto. Keep labels short.
  imageUrl?: string; // real photo; falls back to an icon tile when empty
  imageAlt?: string; // what the photo actually shows
  credit?: string; // photo credit. Omit for Amanda Rose (the default),
  // set to "" to show no credit at all
  creditUrl?: string; // where the credit links to
}

export interface AmenityLink {
  label: string;
  url: string; // "mailto:" and "#on-page" links work too
  phases?: Phase[]; // when to show it; leave off for always. A sign-up link
  // is ["prep"]: it hides itself the week of the event, and comes back
  // when EVENT_DATE moves to next year.
}

// ── Merch section ──
// No prices here on purpose: the pre-sale store and the fest tent charge
// different amounts, so a single number on the page would be wrong in one
// place or the other. The store has its own prices; the tent posts its own.
export interface MerchItem {
  name: string;
  imageUrl: string; // /pondfest/merch/<slug>.webp, transparent background
  imageAlt: string;
  note?: string; // one short line under the name, e.g. "Limited edition"
  // Where you can get it. Default "both".
  //   "both"    — pre-order it now, or buy it at the fest tent
  //   "presale" — pre-order only; not sold at the fest
  //   "fest"    — only at the fest tent; never gets a pre-order link
  availability?: "both" | "presale" | "fest";
}

// Short logistics strip under the amenity grid
export interface EveryAreaItem {
  icon: string;
  title: string;
}

// ── Page navigation ──
// One destination in the quick-links row and the jump sheet. An `href`
// starting with "#" is a section on this page; anything else is an outside
// link and opens in a new tab.
export interface NavSection {
  href: string;
  label: string;
  icon: string; // Font Awesome name, e.g. "fa-map"
  phases?: Phase[]; // when to show it; leave off for always
}

export interface ArchiveYear {
  year: number;
  date: string; // ISO date string
  dateDisplay: string;
  attendees?: number;
  grossRevenue?: number;
  fundraisingGoal?: number;
  highlights: string[];
  fundingGoals: FundingGoal[];
  featuredPhotoUrl?: string; // hero photo shown at top of year card in archive
  photoGalleryUrl?: string;
  detailPageUrl?: string; // internal path, e.g. "/resources/pondfest2025"
}

// ── Phases ──
// The page does three jobs across the year. Mark an element with the phases
// it belongs to and the layout's CSS hides it in the others; no attribute
// means always visible. See phase.ts for how the current phase is decided.
export type Phase = "prep" | "event" | "afterglow";

// ─────────────────────────────────────────────
// DAY-OF DATA: the things people look up while standing in the park.
// All of it is optional: an empty array means the matching section
// simply does not render, so these can be filled in as they firm up.
// ─────────────────────────────────────────────

// One slot on the open mic stage, run by OMAD.
export interface OpenMicSlot {
  time: string; // display form, e.g. "11:30 AM"
  name: string; // the performer
}

// One map in the tabbed map viewer. Only the first map's display image is
// downloaded with the page; the rest load when their tab is opened, which is
// why `src` and `full` are separate files.
export interface EventMap {
  id: string; // anchor-safe id, e.g. "area-1"
  label: string; // tab label; keep it to a word or two, it has to fit a phone
  title: string; // heading shown above the map
  src: string; // display rendition, /pondfest/maps/<id>.webp
  full: string; // larger rendition opened by "open full size"
  alt: string; // what the map actually shows
  note?: string; // one short line under the map
}

// A fixed moment in the day: a demo, a deadline, a dedication. Separate from
// AMENITIES (which describes things that run for hours) because these are
// the ones you miss if you do not know when they are.
export interface KeyTime {
  start: string; // 24-hour "HH:MM"; sorts the list and drives "up next"
  time: string; // display form, e.g. "12:00 PM"
  title: string;
  icon: string; // Font Awesome name, free set only
  area?: string; // "Area 2", where it matters
  detail?: string; // one or two sentences
}

// Food trucks are grouped by area on the page, because "which truck" matters
// far less than "is it worth the walk".
export interface FoodTruck {
  name: string;
  area: 1 | 2 | 3;
}

// One line on the beer garden board. `group` is the heading the board files
// it under, and the page groups by it the same way it groups trucks by area.
export interface Tap {
  brewery: string;
  beer: string;
  group: TapGroup;
}
export type TapGroup = "ale" | "ipa" | "lager" | "other";

// A sponsor's own advertisement, shown as a thumbnail that opens full size.
export interface SponsorAd {
  slug: string; // /pondfest/ads/<slug>.webp and <slug>-thumb.webp
  sponsor: string; // whose ad it is
  alt: string; // what the ad shows, in a sentence
  url?: string; // the sponsor's site, if we know it
}

// One heading in the people thank-you: a title, an optional line of context,
// and a list of names. A group with an intro and no names still renders.
export interface ThanksGroup {
  title: string;
  icon: string;
  intro?: string;
  names: string[];
}
