// Every Pond Fest that has happened, and the running totals taken from it.
//
// This is the one place the "since 2024" figures come from. The archive
// page, the Our History strip on /pondfest, the fundraising line above it
// and the FAQ all read from here, so adding a year updates every one of
// them and none of them can drift from each other.
//
// Adding a year: write its file next to this one, then import it below and
// put it at the front of ARCHIVE_YEARS. Nothing else to edit.
import type { ArchiveYear } from "../types";
import { PONDFEST_2024 } from "./2024";
import { PONDFEST_2025 } from "./2025";
import { PONDFEST_2026 } from "./2026";

// Newest first; the archive page shows them in this order.
export const ARCHIVE_YEARS: ArchiveYear[] = [
  PONDFEST_2026,
  PONDFEST_2025,
  PONDFEST_2024,
];

const sum = (pick: (y: ArchiveYear) => number | undefined) =>
  ARCHIVE_YEARS.reduce((total, y) => total + (pick(y) ?? 0), 0);

export const ARCHIVE_TOTALS = {
  events: ARCHIVE_YEARS.length,
  attendees: sum((y) => y.attendees),
  grossRevenue: sum((y) => y.grossRevenue),
};

// The exact figure, for the stat strips: "$69,738".
export function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

// Rounded to the nearest thousand, for a sentence: "$70,000". Prose says
// "about" in front of it, which an exact number to the dollar does not
// deserve when the attendance either side of it is an estimate.
export function formatCurrencyApprox(n: number): string {
  return "$" + (Math.round(n / 1000) * 1000).toLocaleString("en-US");
}

// Attendance is counted by hand and rounded off, so it is always "at
// least": "5,500+".
export function formatAttendees(n: number): string {
  return n.toLocaleString("en-US") + "+";
}
