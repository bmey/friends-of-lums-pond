export interface Performer {
  name: string;
  stage?: string;
  time?: string;
  imageUrl?: string; // /pondfest/lineup/<slug>.webp
  imageWidth?: number; // natural pixel size of the file — sets the frame's
  imageHeight?: number; // aspect ratio so nothing jumps while photos load
  url?: string; // act's official site or page
  blurb?: string; // a short paragraph, in the act's own words where possible
}

export type SponsorTier =
  | "diamond"
  | "platinum"
  | "gold"
  | "silver"
  | "bronze"
  | "family";

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
  imageUrl?: string; // photo to show alongside this goal (4:3 or 16:9 recommended)
  donorboxUrl?: string;
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
  imageUrl?: string; // real photo; falls back to an icon tile when empty
  imageAlt?: string; // what the photo actually shows
  credit?: string; // photo credit. Omit for Amanda Rose (the default),
  // set to "" to show no credit at all
  creditUrl?: string; // where the credit links to
}

// Short logistics strip under the amenity grid
export interface EveryAreaItem {
  icon: string;
  title: string;
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
