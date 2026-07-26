/* three-rivers-data.js — Three Rivers Stadium, Pittsburgh.
   Authoritative source: the Codex prompt (user-provided). The ChatGPT concept
   render is VISUAL DIRECTION ONLY — no facts/labels were taken from it.
   Every populated structured value is mapped here once, verbatim. Fields marked
   n/a in the source (e.g. Game 1 save) are OMITTED, never invented. */
window.THREE_RIVERS = {
  // ---- Identity (left-page hero) ----
  stadium_name: "Three Rivers Stadium",
  city: "Pittsburgh",
  state: "Pennsylvania",
  years_active: "1970\u20132000",
  stadium_type: "Open-air circular multipurpose stadium",
  status: "Demolished",

  // ---- Team / classification ----
  team_name: "Pittsburgh Pirates",
  league: "National League",
  division: "NL East/Central",
  classification_era: "Multipurpose Shared Use",
  roof_type: "Open Air",
  location_classification: "Riverfront",

  // ---- Stadium facts (verbatim) ----
  opened: "1970",
  architect: "Deeter Ritchey Sippel",
  architectural_style: "Circular multipurpose concrete doughnut stadium",
  stadium_type_facts: "Open-air circular multipurpose stadium",
  facade: "Precast concrete structural system with exposed concrete circular bowl",
  surface_type: "Artificial turf",
  surface: "Tartan Turf 1970\u20131982; AstroTurf 1983\u20132000",
  capacity_opening: "47,942",
  capacity_current: "47,971",
  elevation: "730 ft",
  coordinates: "40.4467\u00b0 N, 80.0128\u00b0 W",
  address: "600 Stadium Circle<br>Pittsburgh, PA 15212 (former site)",
  location: "Riverfront",
  team_colors: "Black \u00b7 Gold \u00b7 White",

  // ---- Construction & finance ----
  construction_start: "Apr 25, 1968",
  opening_day: "Jul 16, 1970",
  final_game: "Oct 1, 2000",
  demolition_year: "2001",
  original_cost: "$55 million",
  adjusted_cost: "$483 million",
  financing: "Publicly financed through Pittsburgh/Allegheny County stadium-authority bonds as a municipal multipurpose stadium",
  renovations: "Artificial turf, seating, scoreboard, suite, football, and baseball updates across Pirates and Steelers tenancies",

  // ---- Lineage ----
  preceded_by: "Recreation Park (1887–1890)\nExposition Park (1891–1909)\nForbes Field (1909–1970)",
  succeeded_by: "PNC Park",

  // ---- Field geometry ----
  left_field_distance: "335 ft",
  center_field_distance: "400 ft",
  right_field_distance: "335 ft",
  orientation: "SE",
  orientation_degrees: 135,

  // ---- Featured visit (Aug 14, 1990 doubleheader) ----
  visit_order: 13,
  visit_count: 1,
  featured_visit_day: "Tuesday",
  featured_visit_date: "Aug 14, 1990",
  visit_type: "Group Visit",
  trip_name: "Northeast",
  game_kind: "Doubleheader",
  day_night: "Night",
  attendance: "25,542",
  innings_played: 9,

  // ---- The two games (rendered as separate, parallel records) ----
  games: [
    {
      no: 1,
      title: "Atlanta Braves at Pittsburgh Pirates",
      home_abbr: "PIT", away_abbr: "ATL",
      home_name: "Pirates", away_name: "Braves",
      home_runs: 3, away_runs: 1,
      first_pitch: "5:35 PM EDT",
      duration: "2:32",
      home_starter: "Doug Drabek", away_starter: "Charlie Leibrandt",
      winning_pitcher: "Doug Drabek", losing_pitcher: "Charlie Leibrandt",
      // save_pitcher: n/a in source — OMITTED
      weather: { temperature: "76\u00b0", conditions: "Mostly Clear", wind: "4 mph NW", humidity: "57%", sky: "sun" },
      box: {
        away: { abbr: "ATL", byInning: ["0","0","0","0","0","0","0","0","1"], r: 1, h: 6, e: 0 },
        home: { abbr: "PIT", byInning: ["0","0","0","2","0","1","0","0","x"], r: 3, h: 9, e: 0 }
      }
    },
    {
      no: 2,
      title: "Atlanta Braves at Pittsburgh Pirates",
      home_abbr: "PIT", away_abbr: "ATL",
      home_name: "Pirates", away_name: "Braves",
      home_runs: 6, away_runs: 4,
      first_pitch: "9:00 PM EDT",
      duration: "2:14",
      home_starter: "Zane Smith", away_starter: "Steve Avery",
      winning_pitcher: "Zane Smith", losing_pitcher: "Steve Avery",
      save_pitcher: "Bob Patterson",
      weather: { temperature: "70\u00b0", conditions: "Mostly Clear", wind: "4 mph N", humidity: "78%", sky: "moon" },
      box: {
        away: { abbr: "ATL", byInning: ["0","0","1","0","1","0","2","0","0"], r: 4, h: 5, e: 1 },
        home: { abbr: "PIT", byInning: ["4","0","2","0","0","0","0","0","x"], r: 6, h: 6, e: 1 }
      }
    }
  ],

  // ---- Team colors (accent only) ----
  colors: {
    black: { name: "Black", hex: "#101010" },
    gold:  { name: "Gold",  hex: "#C9A227" },
    white: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Stadium Context (verbatim, one unified block w/ paragraph breaks) ----
  stadium_context: [
    "Three Rivers Stadium came from the same civic bargain that shaped many 1970s baseball cities: trade the old, particular ballpark for a larger public facility that could serve more than one team, more than one sport, and more than one version of the modern spectator economy. Forbes Field had given Pittsburgh a distinctive baseball address, but it belonged to an earlier city and an earlier business model. Three Rivers replaced that intimacy with shared infrastructure: one circular concrete stadium for the Pirates and Steelers, built on the riverfront and sized for the era of multipurpose public works.",
    "The site mattered because it made the stadium part of a broader downtown-edge civic landscape rather than a neighborhood ballpark. Pittsburgh's baseball geography moved from the layered campus-and-city setting of Forbes Field to a riverfront venue defined by scale, access, and event management. That choice fit the period. Cities wanted facilities that could concentrate crowds, justify public investment, and handle football as readily as baseball. The rivers gave the stadium a dramatic address, but the building itself treated place in the blunt language of the multipurpose era: a big symmetrical vessel, adaptable enough to host different games and generic enough to flatten their differences.",
    "Its circular form was not an accident; it was the point. Artificial turf, shared seating geometry, football and baseball updates, suites, scoreboards, and other improvements kept the building useful, but usefulness was also its limitation. Baseball at Three Rivers was framed by compromise. The field existed inside a larger machine whose priorities were capacity, conversion, and repeatable operations rather than baseball-specific character.",
    "PNC Park, its successor, reads almost like a rebuttal written on the same riverfront. Where Three Rivers centralized and generalized, PNC specialized and opened itself to a more particular civic image. That contrast is why Three Rivers remains valuable in a stadium anthology. It shows how thoroughly one generation believed in the efficiency of shared concrete infrastructure, and how decisively the next generation turned back toward asymmetry, intimacy, and a ballpark that could belong to baseball first."
  ]
};
