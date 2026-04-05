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
  photoGalleryUrl?: string;
  detailPageUrl?: string; // internal path, e.g. "/resources/pondfest2025"
}
