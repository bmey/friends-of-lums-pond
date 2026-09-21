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

export interface FAQItem {
  question: string;
  answer: string;
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
  badge?: string; // small chip: "New", "21+", "Price TBD"
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
}

// ── Merch section ──
export interface MerchItem {
  name: string;
  price?: string; // display string, e.g. "$25 to $28 adult, $18 youth"
  imageUrl: string; // /pondfest/merch/<slug>.webp, transparent background
  imageAlt: string;
  note?: string; // one short line under the price, e.g. "Limited edition"
  presale?: boolean; // default true. false = only sold at the fest tent, so
  // the item never gets a pre-order link.
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
