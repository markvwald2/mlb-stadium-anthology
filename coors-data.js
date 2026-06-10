/* Coors Field — verbatim values from uploads/all-stadium-pages.csv (Coors Field row),
   uploads/featured-game-box-scores.csv (Coors Field game 1), uploads/stadium-context.csv.
   Local data only. Each populated structured value is mapped here once and rendered
   exactly once in the layout. "n/a" / "unknown" fields become an em dash or are omitted.
   Concept: "The Mile-High Datum" — elevation, urban masonry, atmospheric openness. */
window.COORS = {
  // ---- Identity (hero, left page) ----
  stadium_name: "Coors Field",
  classification_era: "Retro Classic",
  years_active: "1995\u2013present",

  // ---- Stadium Section ----
  city: "Denver",
  state: "Colorado",
  team_name: "Colorado Rockies",
  league: "National League",
  division: "NL West",
  opened_year: "1995",
  opening_day: "April 26, 1995",
  status: "Active",
  architect: "HOK Sport and W.E. Simpson",
  architectural_style: "Retro-classic warehouse-district ballpark",
  stadium_type: "Open-air baseball-only ballpark",
  roof_type: "Open Air",
  playing_surface_type: "Natural grass",
  surface: "Natural grass (Kentucky bluegrass blend)",
  facade_material: "Brick, sandstone, precast masonry, and exposed steel",
  capacity_opening: "50,200",
  capacity_current: "46,891",
  name_history: "\u2014",                       // n/a
  preceded_by: "Mile High Stadium",
  succeeded_by: "\u2014",                        // n/a
  elevation: "5,200 ft",
  coordinates: "39.7561\u00b0 N, 104.9942\u00b0 W",
  lat: "39.7561\u00b0 N",
  lon: "104.9942\u00b0 W",
  stadium_cost: "$300 million",
  stadium_cost_adjusted: "$634 million",
  financing_method: "Public-private; Denver metropolitan stadium-district sales-tax bonds funded the majority, with a Rockies/private contribution",
  address: "2001 Blake Street, Denver, CO 80205",
  location_classification: "Downtown",
  construction_start: "Oct 16, 1992",
  renovations: "Rooftop deck opened in 2014; scoreboard, club, seating, concessions, and social-space upgrades",
  renovation_history: [
    "Opened in 1995, Coors Field has been upgraded steadily toward a more casual, revenue-rich game day\u2014without disturbing its retro-classic brick-and-steel frame.",
    "The defining change came in 2014, when roughly 3,800 of the highest right-field upper-deck seats gave way to The Rooftop, a two-level social deck of bars, lounges, and standing room. Successive scoreboard and video-board upgrades, plus reworked club levels, premium seating, concessions, and social spaces, have kept the building current while leaving its character intact."
  ],
  left_field_distance: "347 ft",
  center_field_distance: "415 ft",
  right_field_distance: "350 ft",
  wall_height_lf: "8 ft",
  wall_height_cf: "8 ft",
  wall_height_rf: "8 ft",
  orientation: "N",
  orientation_degrees: 4,

  // ---- Visit Section ----
  visit_order: 17,
  visit_total: 42,
  first_visit_date: "Apr 26, 1995",
  featured_visit_day: "Wednesday",
  featured_visit_date: "April 26, 1995",
  visit_type: "First Visit",     // featured_game_title
  other_visits: "Multiple",

  // featured game
  home_team: "Colorado Rockies",
  home_team_abbreviation: "COL",
  away_team: "New York Mets",
  away_team_abbreviation: "NYM",
  game_result: "Rockies 11, Mets 9",
  attendance: "47,228",
  start_time: "5:38 PM",
  time_zone: "MDT",
  game_duration: "4:49",
  day_night: "Night",
  innings_played: 14,
  home_starting_pitcher: "Bill Swift",
  away_starting_pitcher: "Bobby Jones",
  winning_pitcher: "Mark Thompson",
  losing_pitcher: "Mike Remlinger",
  save_pitcher: "\u2014",                        // n/a

  // weather
  temperature: "36\u00b0",
  conditions: "Partly Cloudy",
  wind: "5 mph ESE",
  humidity: "69%",

  // ---- Team colors (styling tokens; also surfaced once as a swatch key) ----
  colors: {
    primary: { name: "Rockies Purple", hex: "#5A3E8E" },
    secondary: { name: "Black", hex: "#1A1714" },
    accent: { name: "Silver", hex: "#B7B9BC" }
  },

  // ---- Featured game scores (uploads/featured-game-box-scores.csv, Coors Field game 1) ----
  box: {
    date: "April 26, 1995",
    day: "Wednesday",
    away: { team: "New York Mets", abbr: "METS", byInning: [0,0,0,1,0,4,1,0,1,0,0,0,1,1], r: 9, h: 18, e: 1 },
    home: { team: "Colorado Rockies", abbr: "ROCKIES", byInning: [2,0,1,0,2,1,0,0,1,0,0,0,1,3], r: 11, h: 15, e: 0 },
    innings: 14
  },

  // ---- Stadium Context (uploads/stadium-context.csv, Coors Field) — FULL, VERBATIM ----
  stadium_context: [
    "Coors Field was Denver's answer to the temporary success of Mile High Stadium. The Rockies had already shown that major-league baseball could draw in Colorado; the question was what kind of permanent park could turn that first rush of attendance into an identity. Coors Field supplied the answer: a downtown, baseball-only ballpark with warehouse-district materials\u2014exposed steel, brick, sandstone\u2014and enough scale to feel regional without becoming another multipurpose bowl.",
    "The site moved the Rockies from a borrowed football-centered venue into the fabric of downtown Denver. That mattered for a new franchise trying to feel less temporary. The ballpark's location and materials tied it to a city district rather than to an abstract sports complex, while its elevation and open-air form gave the park a regional condition no design could ignore. Baseball in Denver would be urban, but also unmistakably shaped by altitude and climate.",
    "The design bargain was characteristic of the retro-classic moment. Coors Field borrowed the visual language of older urban ballparks while serving the needs of a 1990s expansion franchise: capacity, concessions, premium spaces, and a strong entertainment setting. Later additions such as the Rooftop deck and other club, scoreboard, seating, and social-space upgrades show how the building kept adjusting toward the more casual, revenue-rich stadium culture that followed.",
    "Coors Field remains important because it made the Rockies feel permanent without needing the monumental heaviness of earlier civic stadiums. It translated Denver's expansion moment into a ballpark that could belong to downtown, to the National League, and to the broader retro-classic wave all at once."
  ]
};
