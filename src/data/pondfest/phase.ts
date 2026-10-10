// Which job the page is doing right now. Shared by the build (so the HTML is
// right without JavaScript) and by a small inline script in the page head
// (so it flips itself overnight without anyone pushing a commit).
//
//   prep       more than a week out: recruiting volunteers, vendors, sponsors
//   event      the week of, and event day: finding things
//   afterglow  after the festival: thanks, the survey, next year's date
//
// If you change the rules here, change the copy of them in
// src/pages/pondfest/index.astro (the inline "phase" script) to match.
import type { Phase } from "./types";

export const PHASES: readonly Phase[] = ["prep", "event", "afterglow"];

// Config dates are written without a zone ("2026-10-10T11:00:00") and mean
// Eastern time. Pond Fest is always in early-to-mid October, which is still
// daylight time, so the offset is -04:00. Pinning it here means the GitHub
// build (which runs in UTC) and a phone in Bear agree on the moment.
export function easternMs(iso: string): number {
  const zoned = /(Z|[+-]\d\d:\d\d)$/i.test(iso) ? iso : `${iso}-04:00`;
  return new Date(zoned).getTime();
}

export function resolvePhase(
  eventDate: string,
  now: number = Date.now(),
  override: Phase | "" = "",
): Phase {
  if (override) return override;
  const start = easternMs(eventDate);
  // the event phase runs through the end of event day, Eastern
  const dayEnd = easternMs(`${eventDate.slice(0, 10)}T23:59:59`);
  const week = 7 * 24 * 60 * 60 * 1000;
  if (now > dayEnd) return "afterglow";
  if (now >= start - week) return "event";
  return "prep";
}
