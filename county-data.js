/* Milwaukee County Stadium — verbatim values from the user-provided Codex
   factual packet (stadium payload, featured-game payload, line score, and
   stadium context). Local data only. Each populated structured value appears
   once in the layout. Blank / n/a fields are omitted. No invented, normalized,
   or web-sourced values. Concept = "Lamp-Matrix Municipal". */
window.MCS = {
  // ---- Identity (left page title block) ----
  stadium_name: "Milwaukee County Stadium",
  classification_era: "Postwar Municipal",
  era_short: "Postwar Municipal Era",
  years_active: "1953\u20132000",
  stadium_type: "Open-air municipal baseball stadium",
  status: "Demolished",

  // ---- Location ----
  city: "Milwaukee",
  state: "Wisconsin",
  team_name: "Milwaukee Brewers",
  league: "American / National League",
  division: "AL East/Central \u00b7 NL Central",
  location_type: "Fairgrounds-adjacent",
  address: "201 S 46th Street, Milwaukee, WI 53214 (former site)",
  elevation: "650 ft",
  coordinates: "43.03\u00b0 N, 87.974\u00b0 W",

  // ---- Stadium Facts ----
  opened: "1953",
  architect: "Osborn Engineering",
  facade: "Steel-and-concrete municipal grandstand with utilitarian exposed stadium structure",
  architectural_style: "Postwar municipal baseball stadium with expandable utilitarian bowl planning",
  playing_surface: "Natural grass",
  surface_detail: "Bluegrass",
  roof_type: "Open Air",
  capacity_opening: "36,011",
  capacity_current: "53,192",
  stadium_cost: "$5.9 million",
  stadium_cost_adjusted: "$71 million",
  financing_method: "Publicly financed and owned by Milwaukee County as a municipal stadium",
  financing_owner: "Milwaukee County",
  renovations: "Upper-deck and seating expansions in the 1950s; scoreboard, lighting, clubhouse, and amenities upgrades across Brewers tenancy",
  allstar_years: "1955 \u00b7 1975",

  // ---- Lifecycle ----
  construction_start: "Oct 19, 1950",
  opening_day: "Apr 6, 1953",
  final_game: "Sep 28, 2000",
  demolition_year: "2001",
  succeeded_by: "Miller Park",

  // ---- Classification ----
  roof_classification: "Open Air",
  location_classification: "Fairgrounds-adjacent",

  // ---- Field geometry ----
  left_field_distance: "362 ft",
  center_field_distance: "402 ft",
  right_field_distance: "362 ft",
  orientation: "SE",
  orientation_degrees: 135,

  // ---- Visit / featured game ----
  visit_order: 2,
  visit_count: 2,
  first_visit_date: "Jun 26 or 27, 1953",
  featured_visit_day: "Friday",
  featured_visit_date: "Aug 12, 1988",
  game_title: "Group Visit",
  trip_name: "Midwest",

  home_team: "Milwaukee Brewers",
  home_team_abbreviation: "MIL",
  away_team: "Baltimore Orioles",
  away_team_abbreviation: "BAL",
  matchup: "Baltimore Orioles at Milwaukee Brewers",
  game_result: "Brewers 8, Orioles 3",
  attendance: "30,181",
  first_pitch: "7:40 PM CDT",
  game_duration: "3:05",
  innings_played: 9,
  home_starter: "Mike Birkbeck",
  away_starter: "Oswaldo Peraza",
  winning_pitcher: "Mike Birkbeck",
  losing_pitcher: "Oswaldo Peraza",

  // weather
  temperature: "87\u00b0",
  conditions: "Mostly Clear",
  wind: "5 mph SW",
  humidity: "62%",

  // ---- Line score (provided) ----
  // BAL: 3 0 0 0 0 0 0 0 0 | 3 10 1
  // MIL: 0 2 0 4 0 0 2 0 x | 8 14 0
  box: {
    away: { team: "Baltimore Orioles", abbr: "BAL", byInning: [3,0,0,0,0,0,0,0,0], r: 3, h: 10, e: 1 },
    home: { team: "Milwaukee Brewers", abbr: "MIL", byInning: [0,2,0,4,0,0,2,0,"x"], r: 8, h: 14, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (provided) — one unified block, paragraph breaks intact, verbatim ----
  stadium_context: [
    "Milwaukee County Stadium was built before Milwaukee had a major-league franchise to fill it, which gives the park an unusual place in MLB history. It was less a replacement than an argument: a publicly financed municipal stadium meant to prove that a midwestern industrial city could support big-league baseball. When the Braves arrived from Boston, the building's purpose became clear. Milwaukee had used infrastructure to make itself available to the league.",
    "The site reinforced that civic pitch. Placed beside the Wisconsin State Fair grounds rather than inside a tight downtown grid, County Stadium worked as a regional destination. It offered room, access, and expandability, all of which mattered in the postwar period when baseball attendance, automobile travel, and municipal ambition were being remade together. The ballpark's utilitarian steel-and-concrete form did not try to charm like an older jewel box. It promised capacity and practicality.",
    "That practicality shaped its long second life with the Brewers as much as its first life with the Braves. Upper-deck additions, seating expansions, lights, scoreboards, clubhouses, and amenity upgrades kept the stadium useful through decades of changing expectations. It was never a refined architectural object, but that was partly the point. County Stadium made baseball feel civic, accessible, and regional, with a culture built as much around arrival and parking-lot ritual as around the seating bowl.",
    "Its replacement by Miller Park showed what the old building could no longer provide. By 2001, smaller-market baseball needed weather protection, premium spaces, stronger concessions, and a more controlled revenue model. County Stadium mattered because it captured an earlier bargain: a public stadium as an invitation to MLB, durable enough to serve two franchises, but eventually too exposed and too plain for the economics that followed."
  ]
};
