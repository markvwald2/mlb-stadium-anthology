/* Oriole Park at Camden Yards — Baltimore, Maryland.
   Concept: "The Warehouse Datum" — the B&O Warehouse acts as the organizing
   architectural spine for the whole spread. ALL factual values are taken
   verbatim from the user-supplied Codex payload (the authoritative source).
   The ChatGPT render is visual direction only and is NOT a factual source —
   its invented values (Visit 32, "Renaissance" era, $552M adjusted, split
   context) are deliberately NOT used here. n/a / blank fields are omitted.
   Each populated value appears once. Warm paper + charcoal + brick red +
   weathered green steel; orange/black are restrained accents only. */
window.CAMDEN = {
  // ---- Identity (left page painted-signage title block) ----
  stadium_name: "Oriole Park at Camden Yards",
  city: "Baltimore",
  state: "Maryland",
  classification_era: "Retro Classic",
  years_active: "1992\u2013Present",
  status: "Active",
  folio: "Warehouse-District Ballpark",

  // ---- Stadium identity ribbon (the warehouse datum spine) ----
  team_name: "Orioles",
  team_full: "Baltimore Orioles",
  league: "American League",
  league_abbr: "AL",
  division: "AL East",
  visit_order: 34,
  visit_total: 42,
  coordinates_n: "39.2839\u00b0 N",
  coordinates_w: "76.6217\u00b0 W",
  capacity_opening: "48,041",
  capacity_current: "42,455",

  // ---- Stadium facts (museum specification sheet) ----
  facts: [
    ["Opened", "April 6, 1992"],
    ["Years Active", "1992\u2013present"],
    ["Capacity", "48,041 opening \u00b7 42,455 current"],
    ["Surface", "Natural grass (Kentucky bluegrass)"],
    ["Architect", "HOK Sport and RTKL"],
    ["Type", "Open-air baseball-only ballpark"],
    ["Roof", "Open Air"],
    ["Location", "Downtown"],
    ["Preceded By", "Memorial Stadium"]
  ],

  // ---- Architecture (warehouse / brick / steel cues) ----
  architectural_style: "Retro-classic downtown ballpark with warehouse-district industrial character",
  facade_material: "Red brick masonry with stone base, exposed green steel, and integrated B&O Warehouse context",
  renovations: "Scoreboard, seating, club, concessions, left-field, social-space, and concourse renovations; long-term lease improvements in progress",

  // ---- Field geometry (small protractor on the hero) ----
  field: {
    left_field: "333 ft",
    center_field: "400 ft",
    right_field: "318 ft",
    orientation: "NNE",
    bearing: 31
  },

  // ---- Address / colophon (left page) ----
  address: "333 W Camden Street, Baltimore, MD 21201",
  elevation: "30 ft",

  // ---- Construction & finance (footer datum) ----
  opening_day: "Apr 6, 1992",
  construction_start: "Jun 28, 1989",
  stadium_cost: "$110 million",
  stadium_cost_adjusted: "$252 million",
  financing_method: "Publicly financed by the Maryland Stadium Authority with Orioles lease payments and related revenues",

  // ---- Visit Section / featured game (Jul 13, 2019) ----
  featured_day: "Saturday",
  featured_date: "Jul 13, 2019",
  trip_name: "Baltimore",
  home_team: "Baltimore Orioles",
  home_abbr: "BAL",
  away_team: "Tampa Bay Rays",
  away_abbr: "TB",
  result_line: "Orioles 2, Rays 1",
  attendance: "22,596",
  first_pitch: "1:07 PM EDT",
  game_duration: "2:58",
  starter_home: "Aaron Brooks",
  starter_away: "Brendan McKay",
  matchup_line: "Brendan McKay (TB) vs Aaron Brooks (BAL)",
  decisions_line: "W: Richard Bleier / L: Colin Poche / S: Mychal Givens",

  // ---- Line score (verbatim) ----
  box: {
    innings: 9,
    away: { abbr: "RAYS", byInning: [0, 0, 1, 0, 0, 0, 0, 0, 0], r: 1, h: 3, e: 0 },
    home: { abbr: "ORIOLES", byInning: [0, 0, 0, 0, 0, 0, 2, 0, "x"], r: 2, h: 7, e: 0 }
  },

  // ---- Weather (compact editorial strip) ----
  weather: {
    temperature: "85\u00b0",
    conditions: "Clear",
    wind: "6 mph W",
    humidity: "51%"
  },

  // ---- Stadium Context (ONE unified body; paragraph breaks preserved verbatim) ----
  context: [
    "Oriole Park at Camden Yards was not just Baltimore replacing Memorial Stadium. It was MLB changing its mind about what a new ballpark should be. Memorial Stadium had the civic scale and shared-use logic of the postwar municipal era, but by the early 1990s that model no longer fit the direction of baseball. The Orioles\u2019 new park moved away from the large municipal multipurpose template and toward something more specific: downtown, open-air, baseball-only, and visually tied to older urban fabric.",
    "The location did much of the work. A downtown site allowed the ballpark to participate in the city rather than sit as an isolated sports object. Its warehouse-district industrial character gave the architecture something real to answer to, which separated Camden Yards from later parks that would imitate retro style without the same urban pressure. The building did not merely borrow old ballpark imagery. It used brick, steel, scale, and asymmetry to make a modern stadium feel as though it belonged to a longer city history.",
    "That was the design bargain. Camden Yards gained intimacy, texture, and a sense of place, while still serving contemporary MLB needs for suites, clubs, concessions, scoreboards, and controlled circulation. It proved that nostalgia did not have to mean a literal replica; it could be a way to reorganize modern stadium economics inside a more legible baseball setting. The park\u2019s later renovations and lease improvements have continued that negotiation, updating social spaces and concourses without changing the basic argument.",
    "Its influence is hard to overstate within this collection because so many later parks are, in some way, responding to it. Citizens Bank Park, PNC Park, Great American Ball Park, Comerica Park, and others all belong to a world Camden Yards helped make possible. The park matters because it turned rejection into precedent: rejection of the concrete multipurpose bowl, rejection of placelessness, and rejection of the idea that modern baseball had to look detached from the city around it."
  ]
};
