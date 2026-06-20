/* Progressive Field — Cleveland, Ohio.
   Concept: "The Gateway Frame" — Progressive Field's painted exposed steel and
   scoreboard-support structure become the organizing armature of the right
   page: visible framing members carve asymmetrical bays that hold the content.
   ALL factual values are taken verbatim from the user-supplied Codex payload
   (the authoritative source). Any rendered concept image is visual direction
   only and is NOT a factual source. n/a / blank / unknown fields are omitted.
   Each populated value appears once. Charcoal + steel-white + painted-steel
   gray; navy / red are restrained Cleveland accents only. */
window.PROG = {
  // ---- Identity (left page signage title block) ----
  stadium_name: "Progressive Field",
  city: "Cleveland",
  state: "Ohio",
  classification_era: "Retro Classic",
  years_active: "1994\u2013present",
  status: "Active",
  folio: "Downtown Gateway Ballpark",

  // ---- Team identity (right page upper-left bay) ----
  team_name: "Guardians",
  team_full: "Cleveland Guardians",
  league: "American League",
  league_abbr: "AL",
  division: "AL Central",

  // ---- Visit summary ----
  visit_order: 18,
  visits_to_park: 2,
  first_visit: "Jul 2, 2001 (as Jacobs Field)",

  // ---- Address / colophon (left page hero) ----
  address: "2401 Ontario Street, Cleveland, OH 44115",
  location: "Downtown",
  coordinates_n: "41.4958\u00b0 N",
  coordinates_w: "81.6853\u00b0 W",
  elevation: "650 ft",

  // ---- Stadium facts (lifecycle + specification sheet) ----
  facts: [
    ["Years Active", "1994\u2013present \u00b7 Active"],
    ["Previous Names", "Jacobs Field (1994\u20132007); Progressive Field (2008\u2013present)"],
    ["Preceded By", "League Park; Cleveland Municipal Stadium"],
    ["Capacity", "42,865 opening \u00b7 34,820 current"],
    ["Surface", "Natural grass (Kentucky bluegrass)"],
    ["Architect", "HOK Sport"],
    ["Type", "Open-air baseball-only ballpark (Open Air)"],
    ["Era", "Retro Classic"]
  ],

  // ---- Architecture (steel / brick / concrete cues) ----
  architectural_style: "Retro-modern downtown ballpark with industrial steel expression",
  facade_material: "Painted exposed steel, brick accents, and concrete seating-bowl structure",
  renovations: "Renovated 1997; 2019 \u2014 major 2015\u20132016 work plus 2020s upper-deck, social-space, club, bullpen, and neighborhood-connection improvements",

  // ---- Field geometry (small protractor in the facts bay) ----
  field: {
    left_field: "325 ft",
    center_field: "400 ft",
    right_field: "325 ft",
    orientation: "N",
    bearing: 0
  },

  // ---- Construction & finance (footer datum) ----
  opening_day: "Apr 4, 1994",
  construction_start: "Jan 13, 1992",
  stadium_cost: "$175 million",
  stadium_cost_adjusted: "$380 million",
  financing_method: "Public-private financing through the Gateway Economic Development Corporation, sin-tax / public bonds, and team / private contributions",
  all_star_games: "1997 \u00b7 2019",

  // ---- Visit Section / featured game (Sep 22, 2011) ----
  featured_day: "Thursday",
  featured_date: "Sep 22, 2011",
  featured_title: "Group Visit",
  trip_name: "Ohio / Pennsylvania",
  game_type: "Night",
  home_team: "Cleveland Indians",
  home_abbr: "CLE",
  away_team: "Chicago White Sox",
  away_abbr: "CWS",
  result_line: "Indians 11, White Sox 2",
  attendance: "21,487",
  first_pitch: "7:06 PM EDT",
  game_duration: "2:36",
  innings: 9,
  matchup_line: "Philip Humber (CWS) vs Jeanmar Gomez (CLE)",
  decisions_line: "W: Jeanmar Gomez (CLE) \u00b7 L: Philip Humber (CWS)",

  // ---- Line score (verbatim) ----
  box: {
    innings: 9,
    away: { abbr: "WHITE SOX", byInning: [0, 0, 0, 0, 2, 0, 0, 0, 0], r: 2, h: 4, e: 0 },
    home: { abbr: "INDIANS", byInning: [2, 0, 0, 0, 2, 1, 4, 2, "x"], r: 11, h: 12, e: 1 }
  },

  // ---- Weather ----
  weather: {
    temperature: "68\u00b0",
    conditions: "Clear",
    wind: "5 mph NE",
    humidity: "64%"
  },

  // ---- Stadium Context (ONE unified body; paragraph breaks preserved verbatim) ----
  context: [
    "Progressive Field replaced Cleveland Municipal Stadium by rejecting almost everything that had made the old lakefront bowl imposing. The previous stadium had been vast, civic, and multipurpose; Jacobs Field, as it opened in 1994, was downtown, baseball-only, and scaled to make the game feel close again. Cleveland did not abandon public ambition. It redirected it into a ballpark designed around baseball rather than civic mass.",
    "The downtown site was central to that shift. Instead of returning to the lakefront monument, the new park became part of a more focused urban development strategy. Its painted exposed steel, brick accents, and industrial expression connected the stadium to Cleveland's material character without pretending to be an old jewel box. It belonged to the retro-classic movement, but its language was sharper and more modern than pure nostalgia.",
    "The building's bargain was to give Cleveland intimacy and urban energy while still delivering the premium and operational machinery of a contemporary MLB venue. It corrected the scale problem of Municipal Stadium, but it also had to keep evolving as fan behavior changed. The 2015-2016 renovation and later 2020s work to upper decks, social spaces, clubs, bullpens, and neighborhood connections show the park being tuned from a 1990s ballpark into a more flexible twenty-first-century environment.",
    "Progressive Field matters because it captures the early retro era at a moment when the movement was still experimental rather than formulaic. It was not just a picturesque replacement for a concrete monolith. It was a practical re-scaling of baseball in Cleveland: from a huge public bowl where baseball could feel like one event among many, to an intimate downtown park that made the game the organizing principle again."
  ]
};
