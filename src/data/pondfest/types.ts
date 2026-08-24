export interface Performer {
  name: string;
  stage?: string;
  time?: string;
  imageUrl?: string; // /pondfest/lineup/<slug>.jpg
  url?: string; // act's official site or page
  blurb?: string; // one-liner, filled from band outreach
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
  desc: string; // one or two sentences of caption
  area: string; // where to find it: "Area 1", "Areas 1 & 2", "All three areas"
  badge?: string; // small chip: "New", "21+", "Price TBD"
  imageUrl?: string; // real photo; falls back to an icon tile when empty
  imageAlt?: string; // what the photo actually shows
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
