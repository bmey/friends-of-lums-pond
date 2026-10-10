// ═══════════════════════════════════════════════════════════════════
//  POND FEST WINNERS — the one file you edit on event day
// ═══════════════════════════════════════════════════════════════════
//
//  Edit it straight from your phone:
//  https://github.com/bmey/friends-of-lums-pond/edit/main/src/data/pondfest/winners.ts
//
//  Type the winners in, scroll down, hit "Commit changes". The site
//  rebuilds itself and the winners are live in about three minutes.
//
//  ── THE ONLY RULE ─────────────────────────────────────────────────
//  One winner per line, between the ` ` marks, written as:
//
//      Prize name | Winner
//
//  The winner can be a name or a ticket number, whichever you have.
//  If you only have ticket numbers and no prize names, just put the
//  number on the line by itself and leave the | off.
//
//  Blank lines are ignored. A line starting with # is a note to
//  yourself and never shows on the site. Spaces around the | do not
//  matter. You cannot break the site with a typo in here: a confusing
//  line renders as a confusing line, it does not take the page down.
//  There are no quotes, commas or brackets to get wrong.
// ═══════════════════════════════════════════════════════════════════

// ── STEP 1 ────────────────────────────────────────────────────────
// Leave this false while you are typing. Flip it to true and commit
// when you are ready for the world to see the winners. Flipping it
// also puts the announcement banner at the top of the page and adds
// "Winners" to the day-of menu.
export const WINNERS_LIVE = true;

// ── STEP 2 ────────────────────────────────────────────────────────
// The 50/50. Ticket number, and the amount if you want to show it.
// Leave both empty and the 50/50 block does not appear at all.
export const FIFTY_FIFTY_TICKET = "332252";
export const FIFTY_FIFTY_AMOUNT = "$383"; // e.g. "$1,240"

// ── STEP 3 ────────────────────────────────────────────────────────
// Raffle baskets. One per line: Prize | Winner
export const RAFFLE_WINNERS = `
Basket #1 | 32575-135
Basket #2 | 22689-686
Basket #3 | 32575-349
Basket #4 | 14153-009
Basket #5 | 24325-864
Basket #6 | 32575-178
Basket #7 | 32575-173
Basket #8 | 32575-293
Basket #9 | 32575-474
Basket #10 | 32575-222
Basket #11 | 24325-970
Basket #12 | 32575-163
Basket #13 | 32575-562
Basket #14 | 32575-384
Basket #15 | 32575-322
Basket #16 | 32575-144
Basket #17 | 32575-478
Basket #18 | 32575-494
Basket #19 | 24325-867
Basket #20 | 32575-284
Basket #21 | 24325-948
Basket #22 | 24325-846
Basket #23 | 32575-517
Basket #24 | 24325-990
Basket #25 | 32575-564
Basket #26 | 32575-522
Basket #27 | 32575-306
Basket #28 | 24325-896
Basket #29 | 32575-433
Basket #30 | 24325-968
Basket #31 | 22689-677
Basket #32 | 24325-955
Basket #33 | 32575-125
Basket #34 | 32575-460
Basket #35 | 32575-123
Basket #36 | 24325-940
Basket #37 | 22689-694
Basket #38 | 22689-696
Basket #39 | 32575-187
Basket #40 | 32575-454
Basket #41 | 32575-198
Basket #42 | 32575-466
Basket #43 | 22689-712
Basket #44 | 32575-251
Basket #45 | 32575-492
Basket #46 | 32575-277
`;

// ── STEP 4 ────────────────────────────────────────────────────────
// Silent auction. One per line: Item | Winner
export const AUCTION_WINNERS = `
Deerfield Foursome of Golf with Cart | Clara Robbs
Delaware State Park Surf Jeep | Jeff Mey
Delaware State Park Camping Voucher | Jeff Mey
Beads by Carol - Necklace & Earrings | Jeff Mey
Beads by Carol - Faceted Amethyst Necklacs | Jeff Mey
Blackstone 17" Propane Gas Griddle | Jeff Mey
`;

// ── STEP 5 (optional) ─────────────────────────────────────────────
// Anything extra to say at the top of the winners section. Leave it
// empty and the standard claim instructions show instead.
export const WINNERS_NOTE = "";

// How long winners have to pick up, and what happens if they do not.
// Shown with the winners. Clear it to hide it.
export const WINNERS_CLAIM_NOTE =
  "Pick up at the raffle table in Area 1 by 5:00 PM. Anything unclaimed at " +
  "five is redrawn, and the redraw is only among people still at the fest.";

// Where the printed copy of this list lives, for anyone who asks.
export const WINNERS_WHERE = "A yard sign at the raffle table in Area 1.";

// ═══════════════════════════════════════════════════════════════════
//  Below here is the machinery. You never need to touch it.
// ═══════════════════════════════════════════════════════════════════

export interface WinnerRow {
  prize: string; // may be empty when only a ticket number was given
  winner: string;
}

// Deliberately forgiving. Anything we cannot make sense of is dropped
// rather than thrown, because this file gets edited one-handed on a
// phone in a field, and a build failure on event day is the one
// outcome worse than a missing line.
export function parseWinners(raw: string): WinnerRow[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line) => {
      const bar = line.indexOf("|");
      if (bar === -1) return { prize: "", winner: line };
      return {
        prize: line.slice(0, bar).trim(),
        winner: line.slice(bar + 1).trim(),
      };
    })
    .filter((row) => row.prize || row.winner);
}
