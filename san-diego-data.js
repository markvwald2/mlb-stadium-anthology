/* San Diego Stadium — verbatim from the Codex factual packet (San Diego Stadium).
   Local/brief data ONLY. The ChatGPT render is visual direction, never a factual
   source; its facts (1967 open, $36M, Bill Singer/Clay Kirby, 1:05 PM, NNW wind,
   1992/97 renos, etc.) are intentionally NOT used. Every populated field once. */
window.SANDIEGO = {
  // ---- Identity (left-page hero) ----
  stadium_name: "San Diego Stadium",
  city: "San Diego",
  state: "California",
  years_active: "1969\u20132003",
  stadium_type: "Open-air multipurpose stadium",
  status: "Demolished",

  // ---- Right-page exhibit header ----
  classification_era: "Multipurpose Shared Use",
  roof_type: "Open Air",
  location_classification: "Mission Valley \u00b7 Urban \u00b7 Suburban",

  // ---- Stadium facts ----
  team_name: "Padres",
  league: "National League",
  division: "NL West",
  opened: "1969",
  years_active_mlb: "1969\u20132003 (MLB)",
  architect: "Frank L. Hope and Associates",
  architectural_style: "Expressionist Brutalist multipurpose stadium",
  facade_material: "Exposed reinforced concrete; geometric ramps and round concrete circulation towers",
  playing_surface_type: "Natural grass",
  surface: "Santa Ana Bermuda grass",
  capacity_opening: "50,000",
  capacity_current: "63,890",
  elevation: "70 ft",
  stadium_cost: "$27.75 million",
  stadium_cost_adjusted: "$268 million",
  financing_method: "Publicly financed by the City of San Diego as a municipal multipurpose stadium",
  all_star_games: "1978 \u00b7 1992",
  renovations: "Expanded 1984; enclosed and enlarged for football 1997",
  succeeded_by: "Petco Park",
  address: "9449 Friars Road, San Diego, CA 92108 (former site)",
  coordinates: "32.7831\u00b0 N, 117.1194\u00b0 W",

  // ---- Lifecycle / name history (vertical sequence on the tower) ----
  name_history: [
    { name: "San Diego Stadium", years: "1967\u20131980" },
    { name: "Jack Murphy Stadium", years: "1981\u20131997" },
    { name: "Qualcomm Stadium", years: "1997\u20132017" },
    { name: "SDCCU Stadium", years: "2017\u20132020" }
  ],

  // ---- Construction & era timeline ----
  construction_start: "December 18, 1965",
  opening_day: "Apr 8, 1969",
  final_game: "Sep 28, 2003",
  demolition_year: "2021",

  // ---- Field geometry ----
  left_field_distance: "327 ft",
  center_field_distance: "405 ft",
  right_field_distance: "330 ft",
  orientation: "ENE",
  orientation_degrees: 70,

  // ---- Visit ----
  visit_order: 5,
  visit_count: 1,
  first_visit_date: "May 17, 1972 (estimated)",
  featured_visit_day: "Wednesday",
  featured_visit_date: "May 17, 1972",

  // featured game
  home_team: "San Diego Padres",
  home_team_abbreviation: "SD",
  away_team: "Los Angeles Dodgers",
  away_team_abbreviation: "LAD",
  game_result: "Padres 2, Dodgers 0",
  attendance: "12,995",
  start_time: "7:30 PM",
  time_zone: "PDT",
  game_duration: "2:13",
  day_night: "Night",
  innings_played: 9,
  home_starting_pitcher: "Fred Norman",
  away_starting_pitcher: "Tommy John",
  winning_pitcher: "Fred Norman",
  losing_pitcher: "Tommy John",
  // save_pitcher: None (omitted per data-handling note)

  // weather
  temperature: "60\u00b0",
  conditions: "Mostly Clear",
  wind: "7 mph WSW",
  humidity: "71%",

  // ---- Team colors (Brown / Gold / White — restrained accents only) ----
  colors: {
    primary:   { name: "Brown", hex: "#5A3A24" },
    secondary: { name: "Gold",  hex: "#B98D3E" },
    accent:    { name: "White", hex: "#F2EFE6" }
  },

  // ---- Line score (Codex packet) ----
  box: {
    date: "May 17, 1972",
    day: "Wednesday",
    away: { team: "Los Angeles Dodgers", abbr: "LAD", byInning: ["0","0","0","0","0","0","0","0","0"], r: 0, h: 6, e: 1 },
    home: { team: "San Diego Padres",    abbr: "SD",  byInning: ["0","0","1","0","0","0","0","1","x"], r: 2, h: 4, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (one unified block; paragraph breaks preserved, verbatim) ----
  stadium_context: [
    "San Diego Stadium came from the expansion-era belief that a growing Sun Belt city could announce itself through flexible sports infrastructure. It was not built simply as a baseball park. It was a civic machine for a metropolitan valley that wanted to host major-league baseball, professional football, and large public events in one open-air structure. When the Padres entered MLB, the stadium gave San Diego the scale and legitimacy that a new franchise required.",
    "The picturesque Mission Valley setting was central to that ambition. Rather than place baseball in an older downtown fabric or heavily-populated urban core, San Diego chose a broad valley landscape suited to automobile access, regional movement, and future growth. The site reflected the city's postwar, mid-century geography: spread out, freeway-oriented, and comfortable with the idea that a stadium could serve an entire region from a large infrastructural node.",
    "The building's expressionist Brutalist form and multipurpose layout gave it presence, but baseball was always sharing the frame. The 1984 expansion and the 1997 football-oriented enclosure pushed the stadium further toward scale and event capacity. Each change made sense for a shared facility, yet each made the Padres' home feel less like a place shaped around baseball. The more the building served football and regional spectacle, the more baseball became one tenant inside a larger civic container.",
    "Petco Park superseded it because the sport had moved in the opposite direction. By 2004, MLB valued downtown specificity, baseball-only geometry, premium spaces, and district-making over the open-ended flexibility of a valley stadium. San Diego Stadium matters because it captures the city's first major-league bargain: use regional infrastructure to get into the national sports map, then later replace that bargain with a park built to make baseball feel local again."
  ]
};
