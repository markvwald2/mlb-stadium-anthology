/* citi-field-data.js — Citi Field, Queens, New York (New York Mets).
   Concept: "The Rotunda Grid" — the Jackie Robinson Rotunda's arched masonry
   arcade organizes the whole spread; brick piers, limestone bands, and granite
   rules build the right page, with abstract NY-monogram interlock lines as
   quiet registration.

   ALL factual values are taken verbatim from the user-supplied Codex payload
   (the authoritative source). The ChatGPT render is VISUAL DIRECTION ONLY and
   is NOT a factual source — its invented/wrong values (Mets 5–0, attendance
   30,076, 7:10 PM start, "Sunny 64°", "Entertainment District Era", elev 23 ft,
   split Historical/Site sections) are deliberately NOT used here. n/a / blank
   fields (Succeeded By, Final Game, Demolition, Save) are omitted. Each
   populated value appears once. Limestone-cream paper + granite charcoal +
   brick red; Mets royal blue + orange are restrained accents only. */
window.CITI = {
  // ---- Identity (left page carved-signage title block) ----
  stadium_name: "Citi Field",
  city: "Queens",
  state: "New York",
  classification_era: "Retro Classic",
  years_active: "2009\u2013Present",
  status: "Active",
  folio: "Rotunda / Borough Classic",

  // ---- Stadium identity ribbon (limestone datum band) ----
  team_name: "Mets",
  team_full: "New York Mets",
  league: "National League",
  league_abbr: "NL",
  division: "NL East",
  visit_order: 31,
  visit_total: 42,
  coordinates_n: "40.7569\u00b0 N",
  coordinates_w: "73.8458\u00b0 W",
  capacity_opening: "41,922",

  // ---- Stadium facts (museum specification sheet) ----
  facts: [
    ["Years Active", "2009\u2013present"],
    ["Capacity", "41,922"],
    ["Surface", "Natural grass (Kentucky bluegrass)"],
    ["Architect", "Populous"],
    ["Type", "Open-air baseball-only ballpark"],
    ["Roof", "Open Air"],
    ["All-Star Game", "2013"],
    ["Location", "Parkland-adjacent"],
    ["Preceded By", "Polo Grounds (1962\u20131963)\nShea Stadium (1964\u20132008)"]
  ],
  all_star_game: "2013",

  // ---- Architecture (rotunda / brick / limestone cues) ----
  architectural_style: "Retro-classic ballpark with Ebbets Field-inspired monumental entrance",
  facade_material: "Brick, limestone, granite, and cast-stone facade with Jackie Robinson Rotunda",
  renovations: "Center-field, scoreboard, seating, outfield wall, plaza, club, and fan-space updates",

  // ---- Field geometry (small protractor on the right page) ----
  field: {
    left_field: "335 ft",
    center_field: "408 ft",
    right_field: "330 ft",
    orientation: "NNE",
    bearing: 13
  },

  // ---- Address / colophon (left page) ----
  address: "41 Seaver Way, Queens, NY 11368",
  elevation: "10 ft",

  // ---- Construction & finance (footer datum) ----
  opening_day: "Apr 13, 2009",
  construction_start: "Nov 13, 2006",
  stadium_cost: "$900 million",
  stadium_cost_adjusted: "$1.35 billion",
  financing_method: "Mets-financed project using tax-exempt PILOT bonds and significant city/state land, infrastructure, and subsidy support",

  // ---- Visit Section / featured game (May 2, 2019) ----
  featured_day: "Thursday",
  featured_date: "May 2, 2019",
  featured_title: "Group Visit",
  trip_name: "Northeast v2",
  home_team: "New York Mets",
  home_abbr: "NYM",
  away_team: "Cincinnati Reds",
  away_abbr: "CIN",
  result_line: "Mets 1, Reds 0",
  attendance: "21,445",
  first_pitch: "12:11 PM EDT",
  game_duration: "2:10",
  starter_home: "Noah Syndergaard",
  starter_away: "Tyler Mahle",
  matchup_line: "Tyler Mahle (CIN) vs Noah Syndergaard (NYM)",
  decisions_line: "W: Noah Syndergaard \u00b7 L: Tyler Mahle",
  game_note: "Noah Syndergaard became the first pitcher since the Dodgers\u2019 Bob Welch (also vs the Reds on June 17, 1983) to hit a home run and throw a complete-game shutout in a 1-0 victory.",

  // ---- Line score (verbatim) ----
  box: {
    innings: 9,
    away: { abbr: "REDS", byInning: [0, 0, 0, 0, 0, 0, 0, 0, 0], r: 0, h: 4, e: 0 },
    home: { abbr: "METS", byInning: [0, 0, 1, 0, 0, 0, 0, 0, "x"], r: 1, h: 4, e: 1 }
  },

  // ---- Weather (compact editorial strip) ----
  weather: {
    temperature: "68\u00b0",
    conditions: "Partly Cloudy",
    wind: "2 mph NW",
    humidity: "74%"
  },

  // ---- Stadium Context (ONE unified body; paragraph breaks verbatim) ----
  context: [
    "Citi Field replaced Shea Stadium by narrowing the Mets\u2019 architectural identity. Shea had been a large, colorful, multipurpose public stadium tied to World\u2019s Fair-era Queens. Citi Field kept the franchise in Flushing Meadows but moved toward a more curated baseball environment, reducing scale and wrapping the Mets in a retro-classic language shaped partly by memory of Ebbets Field.",
    "The site decision preserved continuity. The Mets did not leave Flushing Meadows, the former World\u2019s Fair and parkland-adjacent stadium district of Queens, with its broad regional access and neighboring sports infrastructure. Instead, the new building tried to make that same district feel more baseball-specific and less municipal. The monumental entrance gave the park an image of tradition, even though the surrounding geography remained closer to Shea\u2019s world than to a dense Brooklyn street grid.",
    "That tension is the design bargain. Citi Field gained intimacy, premium spaces, controlled plazas, improved concessions, and a more recognizable architectural identity. It also inherited a site that could never fully deliver the neighborhood texture its retro references suggested. Center-field changes, scoreboard updates, seating adjustments, outfield wall revisions, plaza work, club upgrades, and fan-space improvements have continued to tune the building after opening.",
    "Citi Field matters because it shows both the power and the limits of retro reference. It replaced a multipurpose stadium with a baseball-only park, but it also revealed how memory can become complicated when architecture borrows from one lineage while serving another franchise in another borough. The result is not simply nostalgic. It is a modern stadium trying to manufacture intimacy in a district built for scale."
  ]
};
