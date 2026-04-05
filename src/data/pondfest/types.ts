export interface Performer {
  name: string;
  stage?: string;
  time?: string;
}

export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "family";

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
