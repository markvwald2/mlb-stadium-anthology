/* comerica-data.js — Comerica Park, Detroit.
   FACTUAL AUTHORITY: the Comerica Park Codex prompt (stadium data, featured-game
   box score, line score, stadium context). Local data only — nothing inferred,
   normalized from memory, or pulled from the ChatGPT concept image. Every
   populated structured value is placed exactly once in the layout. Fields marked
   n/a / blank / unknown (Name History, Succeeded By, Final Game, Demolition) are
   omitted entirely. */
window.COMERICA = {
  // ---- Identity (left page title block) ----
  stadium_name: "Comerica Park",
  era: "Retro Classic",
  years_active: "2000\u2013present",
  stadium_type: "Open-air baseball-only ballpark",
  status: "Active",

  // ---- Stadium Section ----
  city: "Detroit",
  state: "Michigan",
  team_name: "Detroit Tigers",
  team_abbr: "DET",
  league: "American League",
  division: "AL Central",
  address: "2100 Woodward Avenue, Detroit, MI 48201",
  opened: "2000",
  opening_day: "Apr 11, 2000",
  construction_start: "Oct 29, 1997",
  all_star: "2005",
  architect: "HOK Sport, SHG, and Rockwell Group",
  facade: "Retro brick-clad concrete-and-steel structure with stone tiger-head ornament",
  architectural_style: "Retro-classic downtown ballpark with large-scale traditional stadium massing",
  roof_type: "Open Air",
  surface_type: "Natural grass",
  surface: "Kentucky bluegrass",
  capacity_opening: "40,120",
  capacity_current: "41,083",
  preceded_by: "Bennett Park; Tiger Stadium",
  elevation: "600 ft",
  coordinates: "42.3392\u00b0 N, 83.0486\u00b0 W",
  original_cost: "$300 million",
  adjusted_cost: "$561 million",
  financing: "Public-private financing; Tigers/private funds supplied the majority with Detroit/Wayne County public infrastructure and capital support",
  location: "Downtown",
  renovations: "Scoreboard, outfield, seating, club, fences, social-space, and player-facility upgrades",

  // ---- Field geometry ----
  left_field_distance: "342 ft",
  center_field_distance: "412 ft",
  right_field_distance: "330 ft",
  orientation: "SSE",
  orientation_degrees: 150,

  // ---- Visit Section ----
  visit_order: 19,
  visit_total: 42,
  visit_count: "2",
  first_visit_date: "Jul 3, 2001",
  featured_visit_day: "Friday",
  featured_visit_date: "Jul 21, 2023",
  visit_type: "Group Visit",
  trip_name: "Northern Midwest",

  // featured game
  home_team: "Detroit Tigers",
  home_team_abbreviation: "DET",
  away_team: "San Diego Padres",
  away_team_abbreviation: "SD",
  game_result: "Padres 5, Tigers 4",
  attendance: "28,834",
  first_pitch: "6:40 PM EDT",
  game_duration: "2:33",
  game_type: "Night",
  home_starter: "Reese Olson",
  away_starter: "Seth Lugo",
  winning_pitcher: "Seth Lugo",
  losing_pitcher: "Reese Olson",
  save_pitcher: "Josh Hader",
  innings_played: 9,

  // weather
  temperature: "79\u00b0",
  conditions: "Clear",
  wind: "10 mph N",
  humidity: "41%",

  // ---- Team colors (styling tokens only; restrained accents) ----
  colors: {
    primary: { name: "Navy Blue", hex: "#0C2340" },
    secondary: { name: "Orange", hex: "#C8501C" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Line Score (verbatim from Codex) ----
  box: {
    away: { team: "San Diego Padres", abbr: "SD", byInning: [3,0,2,0,0,0,0,0,0], r: 5, h: 9, e: 1 },
    home: { team: "Detroit Tigers", abbr: "DET", byInning: [0,0,0,0,1,1,2,0,0], r: 4, h: 8, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (verbatim, four paragraphs, breaks intact) ----
  stadium_context: [
    "Comerica Park faced a difficult inheritance. Tiger Stadium had given Detroit one of baseball's most intense urban ballparks, dense with history and physically locked into its corner at Michigan and Trumbull. Replacing it meant solving modern facility needs without pretending that a new building could simply reproduce the old one. Comerica Park chose a different kind of permanence: downtown, retro-classic, larger in footprint, and built to carry both baseball and civic symbolism into a new era.",
    "The move from Tiger Stadium's neighborhood block to Woodward Avenue changed the Tigers' relationship to Detroit. The new park belonged to a broader downtown setting rather than to the compressed geometry of one old corner. Its brick, stone tiger-head ornament, large-scale traditional massing, and open-air baseball-only form gave the building a recognizable ballpark language while making room for contemporary concourses, clubs, scoreboards, and fan amenities.",
    "The design bargain was visible from the start. Comerica gained space, comfort, and modern revenue infrastructure, but it could not replicate Tiger Stadium's vertical intimacy or accumulated strangeness. Later changes to scoreboards, outfield dimensions, seating, clubs, fences, social spaces, and player facilities show a park still adjusting after opening, especially where the original design's spaciousness needed more energy or sharper baseball character.",
    "Comerica Park matters because it illustrates the emotional difficulty of the retro-classic replacement. It was not replacing an unloved multipurpose bowl; it was replacing a beloved urban survivor. Its value in the anthology lies in that tension: a modern downtown ballpark trying to honor a city's baseball lineage while accepting that contemporary MLB required a very different building."
  ]
};
