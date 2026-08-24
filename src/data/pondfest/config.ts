import type {
  Amenity,
  EveryAreaItem,
  FAQItem,
  FundingGoal,
  Performer,
  Sponsor,
} from "./types";

// ─────────────────────────────────────────────
// UPDATE THIS SECTION EACH YEAR
// See UPDATING.md for step-by-step instructions
// ─────────────────────────────────────────────

export const CURRENT_YEAR = 2026;

// ISO datetime — used for countdown and day-of mode trigger (gates open 11:00)
export const EVENT_DATE = "2026-10-10T11:00:00";

// Human-readable strings shown on the page
export const EVENT_DATE_DISPLAY = "Saturday, October 10, 2026";
export const EVENT_TIME = "11:00 AM – 6:00 PM";
export const EVENT_LOCATION = "Lums Pond State Park, Bear, DE";
export const EVENT_TAGLINE =
  "A concert for a cause. Live music, food, community, and nature.";
export const FUNDRAISING_GOAL = "$30,000";

// Hero and map images — place files in public/pondfest/
export const HERO_IMAGE_URL = "/pondfest/hero.jpg";
export const OG_IMAGE_URL = "/pondfest/og.jpg";
export const EVENT_MAP_IMAGE_URL = "/pondfest/map-event.jpg";
export const EVENT_MAP_FULL_URL = "/pondfest/map-event-full.jpg";
export const PARKING_MAP_IMAGE_URL = "";
export const VENDOR_MAP_IMAGE_URL = "";

// ─────────────────────────────────────────────
// PHOTOS — download from Lightroom → public/pondfest/photos/
// Then reference as "/pondfest/photos/filename.jpg"
// ─────────────────────────────────────────────

// Full-width photo band between Lineup and Get Involved sections
// Recommended: wide panoramic crowd/stage shot (landscape, high-res)
export const PHOTO_BAND_1_URL = "/pondfest/wide-1.jpg";

// Gallery grid on the index page. Drop new files in public/pondfest/gallery/ and
// add paths here. Keep photos already used in AMENITIES out of this list so the
// same shot does not show up twice on the page.
export const GALLERY_PHOTOS: string[] = [
  "/pondfest/gallery/gallery1.jpg",
  "/pondfest/gallery/gallery2.jpg",
  "/pondfest/gallery/gallery3.jpg",
  "/pondfest/gallery/gallery7.jpg",
  "/pondfest/gallery/gallery10.jpg",
  "/pondfest/gallery/gallery11.jpg",
];

// Credit line shown under the gallery (also covers the photo band)
export const PHOTO_CREDIT_NAME = "Amanda Rose Photography";
export const PHOTO_CREDIT_URL = "https://www.amandaroseportraits.com/";

// Background photo for the History Teaser section
// Recommended: aerial or wide crowd/event overview shot
export const HISTORY_BG_PHOTO = "";

// ─────────────────────────────────────────────
// 75th ANNIVERSARY OF DELAWARE STATE PARKS (2026)
// ─────────────────────────────────────────────

export const SEVENTY_FIFTH_URL = "https://www.destateparks.com/75-years/";
export const SEVENTY_FIFTH_LOGO_WHITE = "/pondfest/75th/dsp-75th-white.png";
export const SEVENTY_FIFTH_LOGO_COLOR = "/pondfest/75th/dsp-75th-color.png";

// "Heart of the Parks" video — leave VIDEO_URL empty to hide the video
export const HEART_OF_PARKS_VIDEO_URL =
  "/pondfest/heart-of-the-parks-bryan-mey-720p.mp4";
export const HEART_OF_PARKS_POSTER_URL =
  "/pondfest/heart-of-the-parks-poster.jpg";
export const HEART_OF_PARKS_CAPTIONS_URL =
  "/pondfest/heart-of-the-parks-bryan-mey.vtt";

// ─────────────────────────────────────────────
// EXTERNAL URLS — update as they become available
// ─────────────────────────────────────────────

// Shirt pre-orders. Leave empty until pre-sales launch — the
// "Pre-Order Shirts" button only appears when this is non-empty.
export const MERCH_URL = "";

export const PONDFEST_DONATE_URL =
  "https://donorbox.org/pond-fest-2026-donations";

export const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejXUBtCgim_Q1gnda4ctmi64cHBA1zQ9UbfH7JSyOAKmBOyg/viewform";
export const SPONSOR_URL =
  "https://drive.google.com/file/d/1guZhsINdNO_mcN29o0vkPVAfxpLt1ruv/view?usp=sharing";
export const VENDOR_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcFDJyBj1_WAk3yI60c3QFRcmQ1936RhkllGyDqWKf-m5k0Q/viewform";

// Contact — also where performer interest is directed (no form)
export const PONDFEST_EMAIL = "pondfest@friendsoflumspond.org";
export const PRESIDENT_EMAIL = "president@friendsoflumspond.org";

// Social
export const FACEBOOK_URL = "https://www.facebook.com/FriendsofLumsPond";
export const INSTAGRAM_URL = "https://www.instagram.com/friendsoflumspond";
export const HASHTAGS = ["#DEStateParks", "#LumsPondFest"];

// ─────────────────────────────────────────────
// DAY-OF FIELDS — populate the week of the event
// ─────────────────────────────────────────────

// Shown in an orange banner at the top of the page; leave empty to hide
export const DAY_OF_ALERT = "";

export const SHUTTLE_INFO =
  "A free shuttle loops between Areas 1, 2, and 3 and the Lums Pond campground all day. The " +
  "three event areas are an easy walk from each other. The campground is not, so if you're " +
  "camping, plan on riding the shuttle both ways.";
export const PARKING_NOTES =
  "There is free parking at all three event areas. Follow the Pond Fest signs from the park " +
  "entrance, and the welcome team at the area split will point you to the closest lot. The " +
  "standard park entrance fee is collected at the gate: $5 for Delaware vehicles, $10 " +
  "out-of-state, and annual passes are accepted.";
export const FEE_NOTE =
  "Free to attend. The standard park entrance fee still applies at the gate: $5 for Delaware " +
  "vehicles, $10 out-of-state, and annual passes are accepted.";
export const BRING_NOTE =
  "Chairs, blankets, cash or card, water. And screenshot this map before you arrive.";
export const RAIN_DATE_NOTE =
  "Rain date: Sunday, October 11. If anything changes we will post it here and on our socials.";

export const RAFFLE_LINK = ""; // link to raffle results / info page
export const AUCTION_LINK = ""; // link to auction results / info page
export const FEEDBACK_LINK = ""; // Google Form survey link

// ─────────────────────────────────────────────
// LINEUP — add performers as they are confirmed
// Alphabetical (ignoring "The"); reorder by schedule once set times exist
// ─────────────────────────────────────────────

export const LINEUP: Performer[] = [
  { name: "Benny Preston" },
  {
    name: "Billy Pierce Band",
    imageUrl: "/pondfest/lineup/billy-pierce-band.jpg",
    url: "https://www.billypierce.com/",
  },
  { name: "Brian Corcoran" },
  { name: "Camp" },
  { name: "Cher's Playground" },
  { name: "Dansino" },
  { name: "Guilt 45 Band", imageUrl: "/pondfest/lineup/guilt-45-band.jpg" },
  { name: "Hippocampus", imageUrl: "/pondfest/lineup/hippocampus.jpg" },
  { name: "Mauka & Makai" },
  { name: "The Sarah Koon Band" },
  { name: "Scott & Tammy" },
];

export const EMCEES: Performer[] = [
  { name: "Tom the Spokesman" },
  { name: "DJ DLyte" },
];

// ─────────────────────────────────────────────
// SPONSORS — add as they are confirmed
// ─────────────────────────────────────────────

export const SPONSORS: Sponsor[] = [
  { name: "Union Park BMW", tier: "gold" },
  { name: "Mr Mulch", tier: "gold" },
  { name: "Rainbow Records", tier: "silver" },
  { name: "Premier Paws LLC", tier: "silver" },
  { name: "Little Bear Dog Care", tier: "silver" },
  { name: "Deerfield Golf Club", tier: "silver" },
  { name: "Eric Morrison", tier: "silver" },
  { name: "Snarky Bark", tier: "bronze" },
];

// ─────────────────────────────────────────────
// FUNDING GOALS for this year
// ─────────────────────────────────────────────

export const FUNDING_GOALS: FundingGoal[] = [
  {
    name: "Youth Scholarships",
    description:
      "Subsidize environmental education field trips for Title 1 schools at Lums Pond. In 2024, 524 students attended these outdoor experiences.",
    imageUrl: "/pondfest/field_trip.jpeg",
    donorboxUrl: PONDFEST_DONATE_URL,
  },
  {
    name: "Accessible Kayak Launch",
    description:
      "Complete funding for a BoardSafe Accessible Kayak Launch, opening Lums Pond's waters to visitors of all abilities.",
    imageUrl: "/pondfest/kayak-launch.jpg",
    donorboxUrl: PONDFEST_DONATE_URL,
  },
];

// ─────────────────────────────────────────────
// WHAT TO EXPECT — every amenity at the fest
// One card each. Leave imageUrl empty and the card
// falls back to an icon tile, which is what you want
// for anything new that we have no photo of yet.
// ─────────────────────────────────────────────

export const AMENITIES_INTRO =
  "One festival, three park areas, and plenty going on in each of them. Here's what you'll " +
  "find. The event map further down shows where the areas sit, and the free shuttle loops " +
  "between them all day.";

export const AMENITIES: Amenity[] = [
  {
    id: "live-music",
    icon: "fa-music",
    title: "Live Music",
    area: "Areas 1 & 2",
    desc: "Eleven acts on three stages: Wingspan and Monarch in Area 1, the Nest Box pavilion in Area 2. Every performer is donating the day.",
    imageUrl: "/pondfest/live-music.jpg",
    imageAlt: "Two singers performing on a Pond Fest stage",
  },
  {
    id: "junior-jam",
    icon: "fa-child",
    title: "Junior Jam",
    area: "Area 1",
    badge: "Price TBD",
    desc: "Our kids' zone: duck pond, pumpkin painting, temporary tattoos, and a kid-sized stage. Every stop stamps a backstage pass, and a full pass earns a prize.",
    imageUrl: "/pondfest/kid-zone.jpg",
    imageAlt: "Kids painting pumpkins at a picnic table in the kids' zone",
  },
  {
    id: "first-responders",
    icon: "fa-truck-fast",
    title: "First Responders Block Party",
    area: "Area 3",
    badge: "Expanded",
    desc: "A full day with Delaware's fire, police, and EMS crews. Bigger than last year, with more agencies and more to climb on.",
    imageUrl: "/pondfest/gallery/gallery4.jpg",
    imageAlt: "A fire engine on display at Pond Fest",
  },
  {
    id: "k9-demos",
    icon: "fa-dog",
    title: "K9 Demonstrations",
    area: "Area 3",
    desc: "Live demonstrations from the Wilmington Police Department K9 Unit, running throughout the day.",
    imageUrl: "/pondfest/gallery/gallery5.jpg",
    imageAlt: "A police K9 looking out of a patrol vehicle window",
  },
  {
    id: "beer-garden",
    icon: "fa-beer-mug-empty",
    title: "Beer Garden",
    area: "Area 1",
    badge: "21+",
    desc: "Autumn Arch Beer Project, JAKL Beerworks, Volunteer Brewing Company, and New Belgium pouring all day.",
    imageUrl: "/pondfest/beer.jpg",
    imageAlt: "A volunteer handing a cup of beer across the taps",
  },
  {
    id: "food-trucks",
    icon: "fa-utensils",
    title: "Food Trucks",
    area: "All three areas",
    desc: "Over a dozen trucks spread across the park, so you're never far from lunch. Bring cash or card.",
    imageUrl: "/pondfest/food-truck2.jpg",
    imageAlt: "A line of visitors waiting at a row of food trucks",
  },
  {
    id: "kids-market",
    icon: "fa-lightbulb",
    title: "Kids Entrepreneur Market",
    area: "Area 2",
    badge: "New",
    desc: "Twenty-plus booths run start to finish by young entrepreneurs. Bring small bills.",
  },
  {
    id: "pony-rides",
    icon: "fa-horse",
    title: "Pony Rides, Petting Zoo & Face Painting",
    area: "Area 2",
    desc: "The Little Farm DE brings the animals, and the face painters set up alongside them.",
  },
  {
    id: "vendors",
    icon: "fa-store",
    title: "Local Vendors & Nonprofits",
    area: "Area 1",
    desc: "More than 40 artisans, crafters, makers, and community nonprofits under the tents.",
    imageUrl: "/pondfest/gallery/gallery9.jpg",
    imageAlt: "Visitors browsing a vendor table under a pop-up tent",
  },
  {
    id: "story-time",
    icon: "fa-book-open",
    title: "Story Time Tent",
    area: "Area 1",
    desc: "Local authors reading to kids on a rotation all day, with books to take home.",
    imageUrl: "/pondfest/vendor.jpg",
    imageAlt: "A book table set up under the trees near the pond",
  },
  {
    id: "pickleball",
    icon: "fa-table-tennis-paddle-ball",
    title: "Pickleball Tournament",
    area: "Area 2",
    badge: "Entry TBD",
    desc: "A ladder tournament run by the Diamond State Pickleball Club. Win your court, move up a court.",
  },
  {
    id: "horseshoes",
    icon: "fa-bullseye",
    title: "Horseshoes",
    area: "Area 2",
    desc: "Open play with the First State Horseshoe Club. Walk up, pick up a shoe, and someone will teach you.",
  },
  {
    id: "raffles",
    icon: "fa-gavel",
    title: "Raffles & Silent Auction",
    area: "Area 1",
    desc: "A whole tent of baskets and prizes donated by local businesses. Winners are called before the last set.",
    imageUrl: "/pondfest/raffles.jpg",
    imageAlt: "A volunteer handing over a raffle basket prize",
  },
  {
    id: "rigs",
    icon: "fa-camera-retro",
    title: "Climb Aboard the Rigs",
    area: "Area 3",
    desc: "Fire engines, squad cars, ambulances, and rescue gear, with the crews standing by to answer questions.",
    imageUrl: "/pondfest/gallery/gallery6.jpg",
    imageAlt: "A Delaware State Police cruiser parked on the grass on display",
  },
  {
    id: "merch",
    icon: "fa-shirt",
    title: "Pond Fest Merch Store",
    area: "Area 1",
    desc: "New this year as a walk-in shop. Grab a basket, browse the shirts, and check out at the counter.",
    imageUrl: "/pondfest/gallery/gallery13.jpg",
    imageAlt: "Pond Fest T-shirts hanging on display at the merch tent",
  },
  {
    id: "playground",
    icon: "fa-child-reaching",
    title: "Playground",
    area: "Area 2",
    desc: "The park's own playground sits right in the middle of Area 2, open all day and free.",
  },
  {
    id: "kayak-launch",
    icon: "fa-person-swimming",
    title: "Adaptive Kayak Launch Site",
    area: "Area 2",
    desc: "Come see the spot on the water where the accessible launch is going, and what your donation is buying.",
    imageUrl: "/pondfest/kayak-launch.jpg",
    imageAlt: "An accessible kayak launch with a wheelchair transfer bench",
  },
  {
    id: "rc-aircraft",
    icon: "fa-plane",
    title: "RC Aircraft Displays",
    area: "Area 1",
    desc: "Remote-control planes on the field from the Delaware R/C Club, with pilots happy to talk shop.",
    imageUrl: "/pondfest/gallery/gallery8.jpg",
    imageAlt: "Remote-control model airplanes lined up on the grass",
  },
  {
    id: "delawanderer",
    icon: "fa-caravan",
    title: "DelaWanderer Airstream",
    area: "Area 1",
    desc: "Delaware State Parks' traveling outpost, parked up with staff, gear, and park merch.",
    imageUrl: "/pondfest/gallery/gallery12.jpg",
    imageAlt: "The Delaware State Parks DelaWanderer Airstream trailer",
  },
  {
    id: "rainbow-records",
    icon: "fa-record-vinyl",
    title: "Rainbow Records Bus",
    area: "Area 1",
    badge: "New",
    desc: "Crate digging on wheels. The Newark record shop is bringing its bus to Pond Fest for the first time.",
  },
];

// Short logistics strip under the amenity grid
export const EVERY_AREA: EveryAreaItem[] = [
  {
    icon: "fa-bus",
    title: "Free all-day shuttle between the areas and the campground",
  },
  { icon: "fa-square-parking", title: "Free parking at every area" },
  { icon: "fa-restroom", title: "Restrooms in all three areas" },
  { icon: "fa-kit-medical", title: "Info, check-in, and first aid in Area 1" },
];

// ─────────────────────────────────────────────
// FAQ — timeless questions; update answers as needed
// ─────────────────────────────────────────────

export const FAQ: FAQItem[] = [
  {
    question: "What is Pond Fest?",
    answer:
      "Pond Fest is the annual signature fundraiser of Friends of Lums Pond State Park (FOLP), a 501(c)(3) nonprofit. It is a free community festival with live music on three stages, local vendors, food trucks, a beer garden, kids' activities, raffles, and more. The third annual Pond Fest, on October 10, 2026, is the biggest one yet: for the first time it spans three areas of the park. Every dollar raised supports Lums Pond State Park.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "Pond Fest is free to attend, and there is no ticket. The only cost to get in is the standard Delaware State Parks vehicle entrance fee at the gate: $5 for Delaware plates, $10 for out-of-state (annual passes accepted; see destateparks.com). Some activities cost extra, like Junior Jam and the pickleball tournament (prices to be announced), plus food, drinks, and the beer garden. Bring cash or card.",
  },
  {
    question: "What if it rains?",
    answer:
      "Pond Fest 2026 is planned for Saturday, October 10, with a rain date of Sunday, October 11. If weather forces a change, we'll announce it right here at the top of this page and on our Facebook and Instagram, so check back before you head out.",
  },
  {
    question: "Where do I park, and how do I get around?",
    answer:
      "There is free parking at all three event areas. Follow the Pond Fest signs from the park entrance at 1068 Howell School Rd. Areas 1, 2, and 3 are all walkable, with a marked path connecting Area 1 to Area 2, and a free shuttle loops between all three areas throughout the day.",
  },
  {
    question:
      "I'm camping at Lums Pond that weekend. How do I get to the festival?",
    answer:
      "Take the free shuttle! It serves the campground all day. Unlike the three event areas, the campground is not a walk. It is a separate drive around the outside of the park, so plan on the shuttle both ways.",
  },
  {
    question: "Is it family friendly?",
    answer:
      "Completely. Junior Jam, our kids' zone, has pumpkin painting, a duck pond, temporary tattoos, a kid-sized stage, and a backstage pass that kids get stamped at each activity to earn a prize. Area 2 adds pony rides, a petting zoo, face painting, and the Kids Entrepreneur Market with 20+ youth-run booths, and the Story Time Tent in Area 1 has local authors reading to kids all day.",
  },
  {
    question: "Can I bring my dog?",
    answer:
      "Yes, leashed dogs are welcome throughout Pond Fest, in accordance with park rules. It's a full day outdoors, so bring water for them too.",
  },
  {
    question: "Can I bring my own food and drinks?",
    answer:
      "Yes, outside food and drinks are permitted in accordance with park rules. That said, over a dozen food trucks and a beer garden will be there to tempt you.",
  },
  {
    question: "Will I have cell service?",
    answer:
      "Coverage at the park is workable, but it can get spotty with a big crowd. Screenshot the event map, and the schedule once it is posted, before you arrive. Directional signs and the welcome tent at the area split can always point you the right way.",
  },
  {
    question: "Is Pond Fest stroller and wheelchair accessible?",
    answer:
      "The event areas are mostly flat and grassy, with paved park roads and parking at all three areas, and the free shuttle runs between areas all day. Delaware State Parks also keeps a free all-terrain Trackchair at Lums Pond. It has motorized treads, a tilting seat, and companion controls so someone can help you drive it. Reserve it at no cost by calling the park office at (302) 368-6989 at least 48 hours ahead; sessions are three hours and start with a short how-to video. Planning a visit and want to know more? Email pondfest@friendsoflumspond.org and we will help however we can.",
  },
  {
    question: "What should I bring?",
    answer:
      "Lawn chairs or blankets for the music areas, cash or card, comfortable walking shoes, sunscreen, and a reusable water bottle. And a phone with the event map screenshotted, as above.",
  },
  {
    question: "What causes does Pond Fest support?",
    answer:
      "This year's $30,000 goal funds two things: field trip assistance so students from Title I schools can experience the park, and the adaptive kayak launch that will open Lums Pond's waters to visitors of all abilities. See the fundraising goals above. Since 2024, Pond Fest has raised about $30,000 for park projects.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes. Pond Fest runs on volunteers, and we need hands for setup, Junior Jam, info tables, and day-of operations. Shifts are short and the company is great. Sign up via the Volunteer button above.",
  },
];
