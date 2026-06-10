/* Riverfront Stadium — verbatim from uploads/all-stadium-pages.csv (Riverfront row),
   uploads/featured-game-box-scores.csv (Riverfront game 1), uploads/stadium-context.csv.
   Local data only. Every populated structured value is mapped here once. */
window.RIVERFRONT = {
  // ---- Identity (left-page hero, title only) ----
  stadium_name: "Riverfront Stadium",
  city: "Cincinnati",
  state: "Ohio",
  years_active: "1970\u20132002",
  stadium_type: "Open-air circular multipurpose stadium",
  status: "Demolished",

  // ---- Right-page exhibit header ----
  classification_era: "Multipurpose Shared Use",
  roof_type: "Open Air",
  location_classification: "Riverfront \u00b7 Downtown",

  // ---- Stadium facts ----
  team_name: "Reds",
  league: "National League",
  division: "NL West/Central",
  opened: "1970",
  architect: "Heery & Heery, and FABRAP",
  architectural_style: "Circular multipurpose concrete doughnut stadium",
  facade_material: "Exposed reinforced/precast concrete circular multipurpose bowl",
  playing_surface_type: "Mixed / changed over time",
  surface: "AstroTurf 8 (1970\u20132000); natural grass (2001\u20132002)",
  capacity_opening: "51,050",
  capacity_current: "52,952",
  elevation: "490 ft",
  stadium_cost: "$45 million",
  stadium_cost_adjusted: "$373 million",
  financing_method: "Publicly financed by Cincinnati/Hamilton County as a municipal riverfront multipurpose stadium",
  succeeded_by: "Great American Ball Park",
  address: "201 E Mehring Way, Cincinnati, OH 45202 (former site)",
  coordinates: "39.0967\u00b0 N, 84.5083\u00b0 W",

  // ---- Lineage ----
  name_history: "Riverfront Stadium (1970\u20131996); Cinergy Field (1996\u20132002)",
  preceded_by: "Union Grounds \u00b7 Avenue Grounds \u00b7 Bank Street Grounds \u00b7 League Park \u00b7 Palace of the Fans \u00b7 Redland Field / Crosley Field",

  // ---- Construction & era timeline ----
  construction_start: "Feb 1, 1968",
  opening_day: "Jun 30, 1970",
  final_game: "Sep 22, 2002",
  demolition_year: "2002",
  renovations: "Artificial turf, seating, scoreboard, luxury, and football/baseball updates; partial seating removal before demolition",

  // ---- Field geometry ----
  left_field_distance: "330 ft",
  center_field_distance: "404 ft",
  right_field_distance: "330 ft",
  orientation: "E",
  orientation_degrees: 90,

  // ---- Visit ----
  visit_order: 9,
  visit_count: 1,
  first_visit_date: "Aug 14, 1988",
  featured_visit_day: "Sunday",
  featured_visit_date: "Aug 14, 1988",
  visit_type: "Group Visit",        // CSV: featured_game_title
  // other_visits: n/a (omitted)
  trip_name: "Midwest",

  // featured game
  home_team: "Cincinnati Reds",
  home_team_abbreviation: "CIN",
  away_team: "Atlanta Braves",
  away_team_abbreviation: "ATL",
  game_result: "Reds 2, Braves 0",
  attendance: "38,945",
  start_time: "2:15 PM",
  time_zone: "EDT",
  game_duration: "2:04",
  day_night: "Day",
  innings_played: 9,
  home_starting_pitcher: "Jose Rijo",
  away_starting_pitcher: "Zane Smith",
  winning_pitcher: "Tim Birtsas",
  losing_pitcher: "Zane Smith",
  save_pitcher: "John Franco",

  // derived for visit context (from years_active + surface; not literal columns)
  status_at_visit: "Active",
  surface_at_visit: "AstroTurf 8",

  // weather
  temperature: "93\u00b0",
  conditions: "Clear",
  wind: "7 mph SW",
  humidity: "43%",

  // ---- Team colors (Reds: used sparingly as accent only) ----
  colors: {
    primary: { name: "Red", hex: "#C6011F" },
    secondary: { name: "Black", hex: "#101012" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Box score (uploads/featured-game-box-scores.csv, Riverfront game 1) ----
  box: {
    date: "Aug 14, 1988",
    day: "Sunday",
    away: { team: "Atlanta Braves", abbr: "ATL", byInning: ["0","0","0","0","0","0","0","0","0"], r: 0, h: 9, e: 0 },
    home: { team: "Cincinnati Reds", abbr: "CIN", byInning: ["0","1","0","0","1","0","0","0","x"], r: 2, h: 5, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv) — FULL, VERBATIM ----
  stadium_context: [
    "Riverfront Stadium was Cincinnati's modern replacement for the long and irregular lineage that led through Crosley Field. The Reds had occupied a sequence of older grounds, but by 1970 the city wanted a facility that fit a different civic vision: downtown riverfront redevelopment, shared use, large crowds, and the efficiency of a circular multipurpose stadium. The result was a concrete bowl that placed baseball inside a broader public project.",
    "The site was the message. Cincinnati kept baseball on the Ohio River, but changed the meaning of that riverfront presence. Instead of the intimate, eccentric scale of Crosley Field, Riverfront offered a downtown civic platform shared with football and tuned to automobile-age event management. It was part of the era when cities believed major venues could reshape urban edges through scale, infrastructure, and all-purpose design.",
    "Its circular form made the bargain plain. Artificial turf, symmetrical geometry, football conversion, seating changes, scoreboards, luxury areas, and later partial seating removal all reflected a building trying to serve several masters. It could host major events and accommodate two franchises, but the baseball experience was generalized. The very features that made it modern in 1970 made it vulnerable when MLB began to prize asymmetry, intimacy, and local architectural reference.",
    "Great American Ball Park succeeded it in 2003 without abandoning the riverfront. That is the important contrast. Cincinnati did not decide the river was wrong; it decided the multipurpose bowl was wrong. The successor used the same broad civic setting to produce a more baseball-specific experience. Riverfront Stadium matters because it shows how one site can carry two very different theories of baseball: first as a shared concrete apparatus, then as a riverfront ballpark built to recover character from the same ground."
  ]
};
