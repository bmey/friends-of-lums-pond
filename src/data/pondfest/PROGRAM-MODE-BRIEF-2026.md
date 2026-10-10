# Pond Fest 2026 — Program Mode Brief

**Written 10 Oct 2026, ~02:00 ET. Gates open at 11:00 AM today.**

The day-of build shipped (`8e2ca3f`, `381a1e4`, `f521bce`). The page now has the
schedule, the maps, the winners mechanism, the three phases and the phone tab
bar. Reading it back on a phone, it is still shaped like a page that is selling
the festival rather than one you navigate while standing in it. On top of that,
four facts on the live page are wrong or missing, including a brewery that is
pouring all day and is not thanked anywhere.

Ten items, in priority order. The first four are corrections and additions that
live almost entirely in `config.ts`; they are cheap and they are the ones that
sting if they ship wrong. Five and six decide whether the page works as a
program. Everything after that is improvement.

This is a companion to `DAY-OF-BRIEF-2026.md`, not a replacement. That file holds
what has not changed, and this one does not repeat it:

- §4 — the gitignored source art in `to-process/`, how to open it, and why Grep
  will not find it. Still true. Still no worktrees, still never `git clean -fdx`.
- §9 — pushing. SSH still has no identity loaded. **Bryan pushes, not you.**
- §10 — driving Chrome in this repo. `puppeteer-core` in the scratchpad, the
  `content-visibility` gotcha, `setViewport` at 390×844 and 1440×900.
- §11 — the voice, the dialect, the em-dash rule, the styling vocabulary, the
  commit style. Read it before writing a word of copy or a commit message.
- §12 — the validation tiers. `scripts/verify-dayof.mjs` implements them and
  this brief adds to it rather than starting a new script.

One correction to that file: **commits on this repo carry no `Co-Authored-By`
trailer.** The day-of brief left it as an open question, the earlier commits had
one, and they have since been stripped. Do not add one back.

---

## The prompt

Open a session in this repo, set effort to **high**, and paste this.

> I'm shipping a second pass on the Pond Fest page. The festival opens at 11:00
> this morning and that page is the program: no printed copies, and the QR code
> on every flyer and yard sign points at `friendsoflumspond.org/pondfest`. A few
> thousand people will read it on phones, on park cell data, while standing in a
> field looking for a food truck or a beer. The first pass gave the page the
> right content. This pass fixes four facts that are wrong or missing on it, and
> then changes its shape so somebody can actually find things in it.
>
> Read `src/data/pondfest/PROGRAM-MODE-BRIEF-2026.md` first. It has ten items in
> priority order, what is in the files and where, a recommendation for each, the
> tap list and the thank-yous transcribed, and the planning committee roster. It
> also points at the parts of `DAY-OF-BRIEF-2026.md` that still apply,
> particularly §11 on voice and §10 on driving the browser.
>
> I have about nine hours and they are the wrong nine hours, so work the items in
> the order the brief gives them and commit after each one. Partial is fine;
> half-finished is not. If you get to item 6 and stop, the first five are good
> and the page is better.
>
> When you have enough information to act, act. Don't re-derive what the brief
> establishes, don't re-open decisions it records, and don't survey options you
> aren't going to take. Where you are weighing a call, make it and say which way
> you went.
>
> Don't add features, refactor, or introduce abstractions beyond what these items
> require. This page is 5,400 lines that work; a change to the amenity card is
> not an invitation to restructure the section. Match the patterns already there
> rather than importing new ones.
>
> Build each item's markup, styles and behavior together and look at it in a real
> browser at 390px before moving on. The last pass shipped markup with no
> JavaScript behind it and the page compiled green while nothing worked.
>
> Extend `scripts/verify-dayof.mjs` as you go. §15 of the brief lists the checks
> each item needs. Run the whole suite after each commit, not only at the end. A
> subagent reporting success is a claim; re-run the check yourself.
>
> Before reporting progress, audit each claim against a tool result from this
> session. Only report work you can point to evidence for, and say so plainly
> when something is not yet verified. If a check fails, give me the output.
>
> Delegate where the file boundaries make it safe. §14 of the brief says which
> work is genuinely separable; `index.astro` and `config.ts` are single shared
> files and stay in your hands. Keep working while subagents run, and step in if
> one drifts.
>
> Pause for me only when the work genuinely needs it: something destructive, a
> real change of scope, or a question only I can answer. §13 of the brief lists
> the four I expect. Ask those as one batch early, keep going on the defaults
> while you wait, and don't end a turn on a plan or a promise.
>
> Never invent a fact to fill a gap. Not an ABV, not a web address, not a
> brewery's spelling. The brief marks what is uncertain; leave those gaps open
> and tell me, because a wrong number on a tap list is worse than a missing one.
>
> This page is read by a few thousand neighbors, many of whom know the board.
> Work that reads as machine-written costs us trust. §11 of the day-of brief is
> the standard, and it applies to the copy, the commits and the CSS.
>
> Commit as you go, with no `Co-Authored-By` trailer. Do not push; I'll review and
> push once. Two things are off limits: the committee email addresses in §10
> never go near a built file or a commit message, and the band blurbs and
> `SUPPORT_DISCLOSURE` are not yours to rewrite.
>
> You have ample context. Don't stop, summarize or suggest a new session on
> account of it.
>
> When you write back at the end, write it for someone who has not seen any of
> this. Lead with what shipped, then what I need to decide, then what is left. No
> shorthand, no arrow chains, no vocabulary you invented while working.

---

## 1. Where the page stands

`src/pages/pondfest/index.astro` is 5,377 lines: the markup, a `<style>` block
holding the page-level rules of the Pond Fest design system, and one inline
`<script>` at the bottom with every behavior. `src/data/pondfest/config.ts` is
1,500 lines of content. Those are the two files almost everything here touches,
and they are the reason fan-out has to be careful.

Section ids in the built page: `pf-75th`, `pf-ads`, `pf-expect`, `pf-faq`,
`pf-fundraising`, `pf-gallery`, `pf-involved`, `pf-lineup`, `pf-mapview`,
`pf-memories`, `pf-merch`, `pf-next`, `pf-now`, `pf-plan`, `pf-schedule`,
`pf-sponsors`, `pf-thanks`, `pf-thankyou`, `pf-whos-here`, `pf-winners`.

The phase resolver is `src/data/pondfest/phase.ts`, mirrored by an inline script
in the page head so the page flips itself overnight. **Right now it returns
`event`**, and it returns `afterglow` at midnight tonight on its own. Every
change below has to be right in `event` and must not break `prep`, because `prep`
is what comes back when `EVENT_DATE` moves to 2027.

## 2. Priority order

| # | Item | Why here |
|---|---|---|
| 1 | The welcome team is at the fee booth, not the area split | Four places send people to the wrong person, one of them the banner at the top |
| 2 | "these businesses and organizations" | Half the sponsor list is not a business |
| 3 | The missing thank-yous: Bell's Brewery, the pumpkin donors, WSFS | Bell's is pouring all day and is thanked nowhere |
| 4 | What's on tap | Thirteen taps, and "what have you got?" is a question people ask all day |
| 5 | Collapse the hero in `event` phase | The program currently starts one full screen down |
| 6 | Clickable area tags that open the matching map | The biggest findability win available |
| 7 | Shrink "What to Expect" with a real "Show more" | The longest section, and the one people scroll past |
| 8 | Volunteers: "and counting", and the planning committee | A thank-you that undercounts is worse than none |
| 9 | Follow and share | Asked for, and it is where the hashtags belong |
| 10 | Sponsor ads sized by tier | Genuinely exploratory, and the least costly to skip |

## 3. Item 1 — the welcome team is at the fee booth

Bryan's correction: **the welcome team is at the fee booth. There is an officer
at the area split.** The page says the welcome team is at the split, in four
places, and one of them is the orange banner at the top.

| File | What it says now |
|---|---|
| `config.ts:171` (`DAY_OF_ALERT`) | "the welcome team at the area split will point you the right way" |
| `config.ts:179` (`PARKING_NOTES`) | "the welcome team at the area split will point you to the closest lot" |
| `config.ts:958` (FAQ, cell service) | "the welcome tent at the area split can always point you the right way" |
| `config.ts:963` (FAQ, accessibility) | "the welcome team at the area split can point you to the closest ones" |
| `UPDATING.md:314` | the same wording, as the example volunteers copy from |

Suggested replacements. Bryan may want his own words on the banner:

> `DAY_OF_ALERT`: Gates open at 11. Free parking at all three areas, the shuttle
> runs all day, and the welcome team is at the fee booth to get you started.

> `PARKING_NOTES`: There is free parking at all three event areas. Follow the
> Pond Fest signs from the park entrance. An officer at the area split is
> directing traffic, and the welcome team is at the fee booth. The standard park
> entrance fee is collected at the gate: $5 for Delaware vehicles, $10
> out-of-state, and annual passes are accepted.

> FAQ, cell service: Directional signs will get you there, and the welcome team
> at the fee booth can point you the right way.

**The accessibility FAQ needs a decision, not a rewrite.** It currently promises
that someone at the area split will point you to the closest accessible space.
The welcome team at the fee booth is before the split and may not know the lots
space by space. Do not invent a substitute. Drop the clause, keep "There are
marked accessible parking spaces in the park lots", and ask Bryan who that
question should go to. See §13.

Do not expand what the officer does beyond directing traffic. "An officer at the
area split is directing traffic" is the whole known fact.

## 4. Item 2 — "these businesses and organizations"

`index.astro:1937`, the line under "From our sponsors":

> Swipe through, and tap one to read it full size. These businesses paid for
> Pond Fest; give them a second.

Half the sponsor list is not a business: Masonic Charities of Delaware,
Granite-Corinthian Lodge No. 34, NCC Libraries, two councilmen. Change it to
"These businesses and organizations paid for Pond Fest".

Two things nearby that are **not** in scope. `SUPPORT_DISCLOSURE`
(`config.ts:900`) already says "businesses, community groups, and individuals"
and the board approved it as written: leave it. `involved.astro:78` says "your
business gets its name in front of the crowd", which is a `prep`-phase sponsor
pitch on another page; mention it to Bryan but do not rewrite it today.

## 5. Item 3 — the thank-yous that are missing

All three are `PARTNERS` and `THANKS_GROUPS` data in `config.ts`. No new
rendering code. This is the cheapest item on the list and the one with the worst
failure mode.

### Bell's Brewery is pouring and is thanked nowhere

`PARTNERS` has five breweries in the `beer` group (`config.ts:465-469`): Autumn
Arch Beer Project, Dogfish Head, JAKL Beerworks, Volunteer Brewing Company, New
Belgium. **Bell's Brewery is missing**, and it has a beer on the board. Add it.

The beer garden amenity description (`config.ts:685`) lists the same five and
needs Bell's too.

Two naming questions, both flagged rather than decided:

- The config says **"JAKL Beerworks"**; Bryan writes **"JAKL Beer Works"**. One
  of them is wrong and they appear in several places. Ask; do not pick.
- The config says **"New Belgium"**; Bryan writes **"New Belgium Brewing
  Company"**. Use the full name on the partner list, where it is a credit.

### Pumpkins for the Junior Jam

**Mr. Mulch, Filasky's Produce, and The Local Buzz** donated the pumpkins the
kids decorate in the Junior Jam area. Add all three to `PARTNERS` with a `what`
line saying so.

Two notes. Mr. Mulch is already a gold sponsor with an ad, and appearing in both
places is correct, not a duplicate: Rainbow Records is already both a silver
sponsor and an activities partner. And the Junior Jam card (`config.ts:642`)
says "pumpkin painting" while Bryan says "decorate"; decorating is the wider and
truer word, so use it on the new credit and leave the card's existing sentence
alone.

We have no web addresses for Filasky's Produce or The Local Buzz. Leave `url`
off rather than guessing one. Bryan can add them later.

### WSFS

WSFS sent a crew on their "We Stand For Service" day. They made signs, cleaned
up, and prepped the horseshoe area. That is volunteered time rather than an
attraction or a check, so it does not belong in the `activities` partner group
and it is not a sponsor.

**Recommendation: its own small `ThanksGroup`.** The type already supports a
group with an intro and no names, which is exactly this. One entry, no new type
value, no new rendering. Suggested wording:

> WSFS sent a crew for their We Stand For Service day. They made signs, cleaned
> up, and had the horseshoe pits ready before the rest of us showed up.

There is precedent that this is a repeat relationship: `pf2025/volunteers.ts:57`
lists "WSFS volunteers" from last year.

## 6. Item 4 — what's on tap

Thirteen taps across six breweries, and nothing on the page says what any of them
are. The board is a handwritten sign at the beer tent; the transcription below is
read off the photo Bryan supplied.

### The list, as transcribed

Beer names are kept as the board writes them. Brewery names are written out in
full, since the board abbreviates ("Dogfish", "JAKL").

**Ales**

| Brewery | Beer | ABV |
|---|---|---|
| Dogfish Head | Grateful Dead Juicy Pale Ale | **cut off in the photo** |
| Dogfish Head | SeaQuench Ale | 4.9% |
| JAKL | JAKLantern Pumpkin Ale | 6.0% |

**IPAs**

| Brewery | Beer | ABV |
|---|---|---|
| Dogfish Head | 60 Minute IPA | 6.0% |
| Autumn Arch | Table Hazy IPA | 4.5% |
| Bell's Brewery | Two Hearted IPA | 7.0% |
| New Belgium | Voodoo Ranger Juicy Haze | 7.0% |

**Lagers**

| Brewery | Beer | ABV |
|---|---|---|
| Autumn Arch | Czech the Math | 5.2% |
| JAKL | Stairway to Helles | 5.0% |
| Volunteer Brewing | Frontier-8 Light | 4.8% |

**Others**

| Brewery | Beer | ABV |
|---|---|---|
| Dogfish Head | Blood Orange Mango Vodka Crush | 7.0% |
| Volunteer Brewing | Prickly Pear Seltzer | 6.0% |
| Volunteer Brewing | Caramel Apple Seltzer | 6.0% |

**The first ABV is unreadable.** The photo is cropped at the right edge and shows
a "5" and then nothing. Do not complete it from memory or from a brewery's
website; the board is what is being poured today. Ship that entry with no ABV and
ask Bryan. Every other number above is legible and certain.

Two smaller transcription notes to raise, not resolve: the board reads
**"Frontier-8 Light"** with a hyphen, which may or may not be the real name, and
**"JAKLantern"** is a deliberate pun and is correct as written.

### Where it goes

A new `TAP_LIST` in `config.ts` as a flat array, each entry carrying brewery,
beer, optional ABV, and which of the four board headings it sits under. Flat and
grouped at render, matching how `FOOD_TRUCKS` already works with its `area`
field. A volunteer editing this next year should be adding one line, not nesting
anything.

Render it as a fourth block inside `#pf-whos-here`, alongside Food Trucks, Craft
Vendors and First Responders. That section is already "what is here to find", it
is already lazy, and the beer garden amenity can point at it the same way the
food trucks card already does (`config.ts:694` uses `url: "#pf-whos-here"`).
Reuse that pattern rather than inventing a second one.

Three things that follow:

- The section heading is "Food, Vendors & First Responders". It needs drink in
  it. "Food, Drink, Vendors & First Responders" is accurate and long; look at it
  wrapping at 390px before settling. The nav entry currently reads "Food &
  Vendors" and should become "Food & Drink".
- **Call the block "On Tap", not "Beer".** Three of the thirteen are a vodka
  crush and two seltzers.
- One line noting 21+ and that the beer garden is in Area 1. The amenity card
  already carries the `21+` badge; the block should not need a second one, but it
  does need to say where to go.

If item 6 lands after this, give the block an area chip then. It is one line.

## 7. Item 5 — collapse the hero in `event` phase

The hero is `min-height: max(85vh, 780px)` (`index.astro:2353`) with a 285 KB
background photo, a countdown, the tagline, and two marketing buttons. On event
morning somebody scans a QR code and lands on a full screen of hype before the
quick-links row that is the actual table of contents.

**Recommendation: collapse, do not hide.** Somebody arriving from a yard sign
needs about half a second of confirmation they are in the right place, and a page
that opens on a nav row gives them nothing to confirm against. Reduce it to a
band: "Pond Fest 2026", the date and time, and the location. Everything else in
the hero is `prep` material.

- Mark `.pf-hero-eyebrow`, `.pf-hero-tagline`, `.pf-hero-free` and
  `.pf-hero-ctas` as `data-phase="prep afterglow"`. The countdown already carries
  `data-phase="prep"` (`PondFestCountdown.astro:13`).
- Retire the hero's "RSVP on the Facebook event" link in `event`. RSVPing to
  something that started an hour ago is noise, and item 9 gives that slot a
  better job. The same link in Plan Your Visit (`index.astro:1173`) gets the same
  treatment.
- One phase-scoped rule so the section stops reserving a screen:
  `[data-pf-phase="event"] .pf-hero { min-height: 0 }` plus tightened padding.
  Phases are an attribute on `<html>`, so this costs no JavaScript and does not
  flash.
- **Drop the hero background image in `event`.** A 180px band does not need a
  285 KB photo, and the hero image is on the critical path. Use the existing
  `--pf-purple` gradient. This is the biggest page-weight win available today.

The target, and it is a verify check: at 390×844 in `event` phase, the
quick-links row is visible without scrolling.

Leave the `pf-75th-strip` where it is. It is one line, it is a real partner
credit, and it already sits below the hero to keep the hero short.

## 8. Item 6 — area tags that open the map

This is the one that changes how the page works, and Bryan has already worked out
the UX: **every card already carries an area tag. Make the tag the control, and
move the tag above the description.**

That resolves the collision he was worried about. The card title keeps linking to
the partner's own site, the "Show more" control from item 7 sits under the
description, and the area chip above the description opens the map. Three
affordances, three jobs, none of them fighting. No separate map button needed.

### Where the chips are

| Place | File | What it has now |
|---|---|---|
| Amenity cards | `index.astro:1363-1375` (`.pf-amen-meta`) | area chip and an optional time chip, **below** `.pf-amen-desc` |
| Food trucks | `index.astro:1454` | `<h4>Area {g.area}</h4>` per group |
| Craft vendors | `index.astro:1473` | "Under the tents in Area 1" in prose |
| First responders | `index.astro:1491` | "{N} agencies in Area 3" in prose |
| On Tap | new, item 4 | Area 1 |
| Band cards | `index.astro:1673` (`.pf-act-stage`) | the stage name, with no area |
| Key times | `KeyTime.area` in `types.ts` | "Area 2" where it matters |

Move `.pf-amen-meta` above `.pf-amen-desc` in the amenity card. That is what
Bryan asked for and it is the right order anyway: where and when, then what.

### The mechanism

`EVENT_MAPS` ids are `full`, `area-1`, `area-2`, `area-3`, `shuttle-park`,
`shuttle-campground` (`config.ts:997-1043`). The map viewer at `#pf-mapview`
already has tab buttons with ids `pf-maptab-<id>` and panels `pf-mappanel-<id>`,
and the tab-activation path already handles the deferred `data-src` swap.

Render each area chip as `<a href="#pf-maptab-area-1" data-pf-map="area-1">`. One
delegated click handler: prevent default, call the existing tab activation for
that id, scroll `#pf-mapview` into view honoring the 60px `scroll-margin-top`,
and move focus to the panel. With JavaScript off the anchor still resolves to a
real element, which keeps the "every anchor resolves" check green and degrades to
focusing the right tab.

`history.pushState` the hash on the way, so the phone's back gesture returns the
reader to the card they tapped. Somebody who jumps to the map to find Kona Ice
has lost their place in a 5,000-line page otherwise, and back is the gesture they
will reach for.

### The area-string to map-id mapping

Amenity `area` values in use: `"Area 1"`, `"Area 2"`, `"Area 3"`,
`"Areas 1 & 2"`, `"All three areas"`. A single area maps to that area's id;
anything spanning more than one maps to `full`. A small helper next to the other
page helpers, not inline in the markup.

Band cards need a stage-to-area mapping, which is not in the data yet. It is
known and it is not a guess: **Wingspan and Monarch are in Area 1, Nest Box is in
Area 2.** Add it to `config.ts` as data beside the stages rather than hardcoding
it in the markup, and give the band card an area chip alongside the stage chip.

### The one thing not to break

Check 12 in the existing suite asserts exactly one map image has a `src` on first
paint, and exactly three after three tabs are opened. Tapping an area chip
fetches a map on demand, which is correct and is the point, but the new path has
to go through the same activation function so the accounting still holds. Make
the deferral check exercise the chip path too.

## 9. Item 7 — shrink "What to Expect"

Twenty-two amenity cards with photos, and some descriptions run 500 characters.
It is the longest section on the page and the easiest to bounce off.

**Smaller thumbnails.** Reduce the media height on phones. The grid is masonry
with per-card aspect ratios; a shorter fixed ratio on narrow screens is enough
and the photos stay recognizable.

**Clamp the description to two lines with a "Show more".** Two mobile lines is
`-webkit-line-clamp: 2` on a `display: -webkit-box` element.

Three details that decide whether this feels hand-built:

1. **Only add the control where the text actually overflows.** Measure
   `scrollHeight > clientHeight` in script and insert the button only then.
   Otherwise every card grows a pointless "Show more" and the section looks
   generated.
2. **Apply the clamp from script, not from the stylesheet.** With JavaScript off,
   a stylesheet clamp leaves text cut with no way to open it. Set an attribute on
   the card and scope the clamp rule to it, so no-JS renders full text.
3. `aria-expanded` on the button, flipping on click. The repo precedent is the
   gallery toggle at `index.astro:5269`: `el.hidden`, `aria-expanded`,
   `aria-controls`. Follow it rather than inventing a second pattern.

**Do not shorten the copy itself.** The long descriptions are good and the detail
in them is why they are long. The pickleball card explains a ladder format and a
$10 entry; the Kids Market card explains who runs registration. Clamping hides it
until asked for, which is the point. Rewriting it loses it.

## 10. Item 8 — volunteers, and the planning committee

### "87 and counting"

`THANKS_GROUPS[0].intro` opens "Eighty-seven people gave up a Saturday". Bryan's
note: people show up day-of without signing up, a volunteer brings a friend, and
several of them gave far more than a Saturday.

Put it in prose rather than rendering "87+", which reads like a metric:

> Eighty-eight people signed up, and more than that showed up: a volunteer brings
> a friend, somebody watching the tents go up asks what needs carrying. These are
> the ones we have names for, and a handful of them gave this a great deal more
> than a Saturday.

**Eighty-eight, not eighty-seven.** See the list changes below.

**Interpolate that number from the array length rather than typing it.** The
count has now been wrong twice in two days, and `names.length` cannot drift.

### Two changes to the volunteer list itself

1. **"Chris Funcheon" becomes "Chriss Funcheon"** (`config.ts:1368`). Bryan
   confirmed the spelling.
2. **Add Jenny Grady.** She is on the planning committee and she volunteered;
   she was not in the 87. Alphabetical by last name puts her next to Chris Grady.
   This takes the list to 88.

### The planning committee as its own group

A second `ThanksGroup` ahead of Volunteers. The type already supports `title`,
`icon`, `intro` and `names`, so this is data, not new rendering code.

**All twenty-two are in the volunteer list** once Jenny Grady is added. Leave them
in both and say so in one line, because pulling twenty-two names out of the
volunteer list makes it look like it is missing people:

> The people who met through the year to plan this. They are all on the volunteer
> list below too, because planning it does not get you out of carrying tables.

### The roster

Bryan resolved every open name. Twenty-two people, alphabetical by last name to
match the volunteer list.

Valerie Cheyney · Bob Conley, Sr · Linda Conley · John Deakins ·
Theresa Deakins · Chriss Funcheon · Diane Gearhart · Chris Grady · Jenny Grady ·
John Jacob · Patty Jacob · Kayla Johnson · Ellen Lyons · John Lyons ·
Emily McMichael · Bryan Mey · Jessie Mey · Michael Newell · Clara Robbs ·
Candace Rodriguez · Julia Santini · Nancy Sheehan-Becker

Resolutions worth keeping on the record, since the addresses they came from are
not going in the repo:

- **Candace Rodriguez** was the unidentified `canmcmullen` address. She is already
  in the volunteer list.
- **Jenny Grady** is both, as above.
- Spellings confirmed by Bryan: **Cheyney** (not Cheney), **Diane** (not Dianne),
  **Chriss** (not Chris).
- **John Jacob**, not John Jacob III. Both are real people and both stay in the
  volunteer list; only the elder is on the committee.
- **Emily McMichael** also runs Little Bear Dog Care, a silver sponsor. Same
  person, two roles, and that is fine.

**The email addresses Bryan supplied do not go into `config.ts`, into the built
page, or into a commit message.** They identified people, and this is a public
repository. §15 has a hard check for this.

Two entries in the existing volunteer list are still open and the day-of brief
already flagged them: `Thabisile` has no surname, and "Jessica Bell and daughter"
is still a placeholder. Re-raise them, do not resolve them.

## 11. Item 9 — follow and share

Bryan asked for a section about following on Facebook and Instagram, plus a quick
link in the "More" sheet. Fold the share controls into the same section rather
than building two: they are the same impulse thirty seconds apart.

Current state: the Pond Fest page imports `FACEBOOK_URL` and `HASHTAGS` but
**never imports `INSTAGRAM_URL` at all**. Instagram appears only in the global
footer. The hashtags appear once, as an orphan line in Plan Your Visit
(`index.astro:1184`): "Share your day: #DEStateParks #LumsPondFest".

New section `#pf-follow` next to "Before you go" (`#pf-next`), with a
`navSections` entry labeled "Follow & share", icon `fa-share-nodes`, all phases.
It does **not** go in the four-slot phone tab bar; that stays Schedule, Map, Food,
Winners. Move the hashtag line out of Plan Your Visit into the new section.

### What is actually possible, researched 10 Oct 2026

Bryan asked whether a post to Facebook or Instagram can be pre-tagged with our
hashtags. The short answer is no on both, and the long answer changes what to
build.

**Facebook will not take prefilled text.** The old `sharer.php` parameters for
title, summary and quote were dropped years ago; everything in the share preview
comes from the target page's Open Graph tags. `sharer.php?u=<url>` works and is
all that works. There is an official Share Dialog that accepts exactly one
`hashtag` parameter, but it needs a registered Facebook app id, which FOLP does
not have and should not create for this. Anything claiming `quote` still works is
describing undocumented behavior that has come and gone.

The real lever for Facebook is already in place: `BaseHead.astro` sets `og:title`,
`og:description` and `og:image`, and `OG_IMAGE_URL` points at
`public/pondfest/og.jpg`. A shared link already carries a proper card. Leave the
OG description alone; hashtags belong in the post, not in the page's own
description where search results will show them.

**Instagram has no text prefill and no web share intent at all.** The documented
publishing path is the Graph API with a business account and a server. There is no
URL that opens a composer with a caption in it.

**The Web Share API is what actually works on a phone.**
`navigator.share({ title, text, url })` opens the native share sheet on iOS Safari
and Android Chrome, which is nearly every reader standing in that field.
Instagram, Facebook, Messages and AirDrop all appear there as the reader's own
choice, and the `text` field carries the hashtags into whichever app accepts text.
It needs a secure context and a real user gesture, and it is absent on desktop
Firefox.

**Recommendation, four controls and no more:**

1. **Share** — `navigator.share` with the hashtags in `text`, shown only when
   `navigator.share` exists.
2. **Copy caption** — `navigator.clipboard.writeText` with a ready-made sentence,
   both hashtags and the URL. This is the honest answer to the Instagram
   question: one tap here, paste there. Give it a confirmation state.
3. **Facebook** — `sharer.php?u=<the page url>`.
4. **Follow** — the Facebook page and the Instagram profile, side by side.

X, Threads and Bluesky all have working text intents, but FOLP has no presence on
any of them, so a button would send people somewhere we are not.

**Verify this one in the browser rather than trusting it.** Stub
`navigator.share` and `navigator.clipboard.writeText` and assert the button calls
them with the hashtags and the URL. Do not write anything on the page, in a
commit, or in `UPDATING.md` claiming Instagram captions can be prefilled.

## 12. Item 10 — sponsor ads sized by tier

Bryan's ask: platinum full page, gold half, silver quarter. His own note is that
leaving it alone is acceptable. Last item for that reason.

### The fact that changes the design

**None of the seven ads is platinum or diamond.** The ad slugs map to tiers like
this (`config.ts:385-395`):

- **Gold:** ChristianaCare, Union Park BMW, Mr Mulch
- **Silver:** Premier Paws, Little Bear Dog Care, Rainbow Records, Eric Morrison

Diamond is Masonic Charities of Delaware; platinum is Granite-Corinthian Lodge
No. 34 and Patterson Schwartz. None of the three supplied an ad. So the scheme as
described produces zero full-size ads, three half, and four quarter. Build the
scale anyway, as data, so a platinum ad in 2027 lands in its slot without a code
change. Just do not expect today's page to show the top of it.

### The part that needs judgment

"Quarter page" does not survive a 390px phone. A quarter-width ad is 95 pixels
across and nobody reads it; these are print ads full of small type. The reading
experience is and should remain tap-to-full-size, which already works through the
lightbox.

So express tier as **order, plus relative size in the medium the reader is in**:

- **Desktop:** grid span. Full spans the content width, half spans two columns of
  four, quarter spans one.
- **Phone:** keep the swipe rail and vary the slide width. A gold slide noticeably
  wider than a silver one reads as hierarchy and stays legible and tappable.
- **Order:** tier order, always, ahead of any size treatment. Half the perceived
  hierarchy is just which ad you see first.

Put the tier-to-size mapping in `config.ts` with a comment so a volunteer can
change it, and document it in `UPDATING.md`.

### The gotcha worth writing down

Thumbnails are rendered at 600px wide or less. At today's tiers the widest slot is
around 540px, so they are fine. **A `full`-tier slot would upscale a 600px
thumbnail across 1,100px and look terrible.** If a platinum ad arrives for 2027,
its thumbnail needs re-rendering at 1,200px or more. Put that sentence in
`UPDATING.md` next to the mapping, because the person who hits it will be a
volunteer in September 2027 who has never read this file.

Page weight: the seven thumbnails are 290 KB together and the section is lazy, so
this item does not change the budget as long as nobody adds a rendition.

## 13. What to ask Bryan, as one batch

Ask these early, in one message, then keep working on the defaults. None blocks
anything.

1. **The ABV on the Dogfish Head Grateful Dead Juicy Pale Ale.** Cut off at the
   edge of the photo; the board shows a "5" and then the crop. Default: ship that
   one tap with no ABV.
2. **"JAKL Beerworks" or "JAKL Beer Works"?** The config says one, Bryan wrote the
   other. Default: leave the config spelling alone until he answers.
3. **Web addresses for Filasky's Produce and The Local Buzz**, if he has them.
   Default: credit them with no link.
4. **Who should the accessibility FAQ send people to for the nearest accessible
   parking space**, now that the welcome team is at the fee booth? Default: drop
   the clause and keep the rest of the answer.

## 14. Delegation

`index.astro` and `config.ts` are single files that nearly every item touches. Two
agents in them will collide and the second will clobber the first. Keep both in
your own hands.

What is genuinely separable:

- **Extending `scripts/verify-dayof.mjs`.** Different file, well specified, and it
  wants writing before the features exist. Good first delegation.
- **`UPDATING.md`.** The tap list and how to edit it, the planning committee
  group, the sponsor tier mapping with its 1,200px thumbnail warning, the follow
  and share section, and the corrected welcome-team wording at line 314. Different
  file, and the audience is a non-technical volunteer, which is worth a dedicated
  pass.
- **The final verification run.** A fresh agent that did not build any of this,
  re-running the suite and spot-checking five claims against the live DOM. That is
  the last gate, and self-review does not substitute for it.

Everything else funnels through the two shared files. Delegate on file boundaries,
not on task count.

## 15. Verification additions

Extend `scripts/verify-dayof.mjs`. It has the reporting helpers (`report`,
`note`), a static server for `dist/`, the puppeteer loader, and five tiers. Add to
the matching tier; do not start a second script.

**Structure and copy gates:**

- "welcome team at the area split" and "welcome tent at the area split" appear
  nowhere in `dist/`.
- "these businesses and organizations" is present in the built sponsor section.
- **No committee email address appears anywhere in `dist/` or in the diff.** Hard
  gate. Build the address list into the script, assert zero hits.
- Six breweries in the beer partner group, Bell's Brewery among them, and Bell's
  also named in the beer garden card.
- Thirteen taps render, in the four board groups, with twelve ABVs. The
  thirteenth having no ABV is the expected state, so assert that rather than
  treating it as a gap.
- Mr. Mulch, Filasky's Produce, The Local Buzz and WSFS all appear in the
  thank-yous.
- A planning committee group renders with twenty-two names, and every one of them
  also appears in the volunteer list.
- The volunteer list has 88 names, has "Chriss Funcheon" and not "Chris Funcheon",
  and the intro number matches `names.length`.
- `#pf-follow` exists, is in the nav list, and the Instagram URL is on the page.
- Every `data-pf-map` value matches an `EVENT_MAPS` id. This is the check that
  catches "Areas 1 & 2" silently mapping to nothing.
- Ad count is still seven, in tier order, each carrying its size class.

**Browser behavior:**

- At 390×844 in `event` phase, the quick-links row is inside the viewport without
  scrolling, and the hero background image is not requested.
- Clicking an area chip switches the map tab, the map image decodes
  (`naturalWidth > 0`), and `#pf-mapview` lands at the 60px `scroll-margin-top`.
- Deferral still holds through the chip path: one map with a `src` on first paint,
  rising by one per distinct area opened.
- Browser back after a chip tap returns to the card.
- "Show more" appears only on cards whose description overflows, reveals the full
  text, and flips `aria-expanded`.
- With JavaScript disabled, amenity descriptions are not clamped.
- Share: with `navigator.share` stubbed, the button calls it with both hashtags
  and the page URL. With `navigator.share` deleted, the button is absent and the
  Facebook and copy controls are still there.
- Still no horizontal scroll at 390px, still no console errors.

**Weight:** report the first-paint transfer number as before. Dropping the hero
image in `event` should move it down; say by how much either way.

**Screenshots:** every changed section at 390px and 1440px, in both `event` and
`prep` phase. `prep` matters because these changes have to still be right when
`EVENT_DATE` moves to 2027 and nobody is watching.

## 16. The order of operations

1. Items 1 and 2. `config.ts`, and one line of `index.astro`. Commit.
2. Item 3, the missing thank-yous. Config only. Commit.
3. Delegate the verify-script extension and the `UPDATING.md` pass. Send the four
   questions in §13 to Bryan.
4. Item 4, the tap list. Commit.
5. Item 5, the hero. Look at it at 390px in `event` and in `prep`. Commit.
6. Item 6, the area chips. Markup, the helper, the stage-to-area data, the click
   handler, the history push, all together. Browser-check before moving on.
   Commit.
7. Item 7, the clamp. Commit.
8. Item 8, the committee and the volunteer list. Commit.
9. Item 9, follow and share. Commit.
10. Item 10, the sponsor tiers, if the clock allows.
11. Full suite, fresh-agent verification, then report.
