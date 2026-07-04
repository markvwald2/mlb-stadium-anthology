/* yankee2009-data.js — Yankee Stadium (2009) — verbatim values from the
   user-provided brief (factual authority). Local data only. Each populated
   value appears once in the layout. Empty / n-a / unprovided fields (e.g. a
   successor, save-only edge fields, All-Star / World Series host years) are
   simply OMITTED — never invented. The concept render is visual direction
   only and is NOT a data source. */
window.YK2009 = {
  // ---- Identity (left hero title block) ----
  stadium_name: "Yankee Stadium",
  opened_year: "2009",
  classification_era: "Retro Classic",
  years_active: "2009\u2013present",
  stadium_type: "Open-air baseball-only ballpark",
  status: "Active",

  // ---- Stadium facts ----
  city: "Bronx",
  state: "New York",
  team_name: "Yankees",
  league: "American League",
  division: "AL East",
  opened: "2009",
  architect: "Populous",
  architectural_style: "Retro-monumental ballpark replicating the original Yankee Stadium's civic facade",
  facade_material: "Indiana limestone, granite, precast concrete, steel, and replicated frieze",
  roof_type: "Open Air",
  playing_surface: "Natural grass (Kentucky bluegrass)",
  capacity_current: "46,543",
  capacity_opening: "50,287",
  preceded_by: "Hilltop Park; Polo Grounds; Yankee Stadium (1923)",
  elevation: "55 ft",
  coordinates: "40.8292\u00b0 N, 73.9264\u00b0 W",
  stadium_cost: "$2.3 billion",
  stadium_cost_adjusted: "$3.45 billion",
  financing_method: "Yankees-financed project using tax-exempt public bonds plus city/state land, infrastructure, parking, and tax subsidy support",
  address: "1 E 161 Street, Bronx, NY 10451",
  location_classification: "Urban",
  construction_start: "Aug 19, 2006",
  opening_day: "Apr 16, 2009",
  renovations: "Scoreboard, fan-space, seating, club, social-area, and field-level improvements; Monument Park and museum refinements",

  // ---- Field geometry ----
  left_field_distance: "318 ft",
  center_field_distance: "408 ft",
  right_field_distance: "314 ft",
  orientation: "ENE",
  orientation_degrees: 75,

  // ---- Visit / game ----
  visit_order: 32,
  visit_count: 1,
  first_visit_date: "May 3, 2019",
  featured_visit_day: "Friday",
  featured_visit_date: "May 3, 2019",
  featured_game_title: "Group Visit",
  trip_name: "Northeast v2",

  home_team: "New York Yankees",
  home_team_abbreviation: "NYY",
  away_team: "Minnesota Twins",
  away_team_abbreviation: "MIN",
  game_result: "Yankees 6, Twins 3",
  attendance: "35,911",
  first_pitch: "7:08PM EDT",
  game_duration: "3:08",
  pitching_matchup: "Kyle Gibson (MIN) vs James Paxton (NYY)",
  // Pitching results combined per brief: W / L / S
  win_pitcher: "Jonathan Holder",
  loss_pitcher: "Kyle Gibson",
  save_pitcher: "Aroldis Chapman",
  innings_played: 9,

  // weather
  temperature: "57\u00b0",
  conditions: "Light Drizzle",
  wind: "4 mph SW",
  humidity: "87%",

  // ---- Team colors (styling tokens only; restrained accents, not surfaced as data) ----
  colors: {
    primary: { name: "Navy Blue", hex: "#0C2340" },
    secondary: { name: "White", hex: "#FFFFFF" },
    accent: { name: "Gray", hex: "#8A9098" }
  },

  // ---- Lifecycle as compact data rows (NOT a timeline) ----
  lifecycle: [
    { k: "Construction Start", v: "Aug 19, 2006" },
    { k: "Opening Day", v: "Apr 16, 2009" },
    { k: "Years Active", v: "2009\u2013present" },
    { k: "Status", v: "Active" }
  ],

  // ---- Box / line score (verbatim) ----
  box: {
    date: "May 3, 2019",
    day: "Friday",
    away: { team: "Minnesota Twins", abbr: "MIN", byInning: [0,0,1,0,0,0,0,2,0], r: 3, h: 4, e: 2 },
    home: { team: "New York Yankees", abbr: "NYY", byInning: [1,1,0,2,1,0,1,0,"x"], r: 6, h: 8, e: 1 },
    innings: 9
  },

  // ---- Stadium Context (FULL, verbatim, paragraph breaks intact; one unified block) ----
  stadium_context: [
    "Yankee Stadium replaced the original 1923 stadium by turning memory into infrastructure. The old building, even after its 1970s reconstruction, could no longer provide the premium spaces, circulation, technology, and controlled revenue environment the Yankees wanted. But the franchise could not simply leave its visual inheritance behind. The new stadium had to be modern and familiar at the same time.",
    "The site directly across from the original made that balancing act possible. The Yankees stayed in the Bronx, near the same dense urban baseball geography, while gaining a larger and more controlled building. The architecture used the old stadium's monumental facade language and civic scale, not as preservation but as brand continuity. It made history legible at the surface while replacing the operational core almost entirely.",
    "The design bargain was expensive and deliberate. Yankee Stadium gained luxury seating, clubs, social areas, Monument Park, museum space, improved field-level amenities, and the infrastructure of a modern revenue machine. It sacrificed the accumulated physical irregularity and public memory of the old stadium, substituting a more polished version of the same symbolic language.",
    "Its later scoreboard, seating, fan-space, club, social-area, and field-level improvements show a building still being adjusted like any other contemporary park. But its larger meaning was fixed at opening: this was not a retro ballpark in the ordinary sense. It was a franchise monument. Yankee Stadium matters because it shows how stadium replacement can preserve image while replacing substance, and how memory itself became one of the most valuable materials in modern MLB architecture."
  ]
};
