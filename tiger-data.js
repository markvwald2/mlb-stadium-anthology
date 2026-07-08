/* Tiger Stadium — verbatim values from uploads/all-stadium-pages.csv (Tiger Stadium row),
   uploads/featured-game-box-scores.csv (Tiger Stadium game 1), uploads/stadium-context.csv.
   Local data only. Each populated structured value appears once in the layout.
   "n/a" fields are omitted. Combined renderings follow the brief's data preferences. */
window.TIGER = {
  // ---- Identity (left page title block) ----
  stadium_name: "Tiger Stadium",
  classification_era: "Jewel Box & Early Concrete",
  years_active: "1912\u20131999",
  stadium_type: "Jewel-box ballpark",
  status: "Demolished",

  // ---- Stadium Section ----
  city: "Detroit",
  state: "Michigan",
  team_name: "Detroit Tigers",
  league: "American League",
  division: "AL East",
  opened: "1912",
  architect: "Osborn Engineering",
  architectural_style: "Jewel-box urban ballpark",
  facade_material: "Brick, reinforced concrete, and steel",
  roof_type: "Open Air",
  playing_surface: "Natural grass (Bluegrass)",
  capacity: "52,416 (originally 23,000)",
  name_history: "Navin Field (1912\u20131937); Briggs Stadium (1938\u20131960); Tiger Stadium (1961\u20131999)",
  preceded_by: "Bennett Park",
  succeeded_by: "Comerica Park",
  elevation: "600 ft",
  coordinates: "42.3325\u00b0 N, 83.0691\u00b0 W",
  stadium_cost: "$300k",
  stadium_cost_adjusted: "$10 million",
  financing_method: "Privately financed by owner Frank Navin",
  address: "2121 Trumbull Avenue, Detroit, MI 48216",
  location_classification: "Urban",
  construction_start: "1911",
  opening_day: "Apr 20, 1912",
  final_game: "Sep 27, 1999",
  demolition_year: "2009",
  renovations: "Expanded in the 1930s; upper-deck enclosure, lights, scoreboards, seating, and structural updates",

  // ---- Field geometry ----
  left_field_distance: "340 ft",
  center_field_distance: "440 ft",
  right_field_distance: "325 ft",
  orientation: "NNE",
  orientation_degrees: 22.5,

  // ---- Visit Section ----
  visit_order: 10,
  visit_total: 42,
  visit_count: "1",
  featured_visit_day: "Monday",
  featured_visit_date: "Aug 15, 1988",
  visit_type: "Group Visit",
  trip_name: "Midwest",

  // featured game (combined renderings)
  home_team: "Detroit Tigers",
  home_team_abbreviation: "DET",
  away_team: "Minnesota Twins",
  away_team_abbreviation: "MIN",
  game_result: "Twins 2, Tigers 1",
  attendance: "32,700",
  first_pitch: "7:40 PM EDT",
  game_duration: "2:37",
  pitching_matchup: "Frank Viola (MIN) vs Walt Terrell (DET)",
  pitching_results: "W: Frank Viola / L: Walt Terrell",
  innings_played: 9,

  // weather
  temperature: "88\u00b0",
  conditions: "Mostly Clear",
  wind: "6 mph NW",
  humidity: "35%",

  // ---- Team colors (styling tokens only; not surfaced as text) ----
  colors: {
    primary: { name: "Navy", hex: "#0C2340" },
    secondary: { name: "Orange", hex: "#C5491B" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Box score (uploads/featured-game-box-scores.csv, Tiger Stadium game 1) ----
  box: {
    date: "Aug 15, 1988",
    day: "Monday",
    away: { team: "Minnesota Twins", abbr: "MIN", byInning: [0,0,1,0,0,0,1,0,0], r: 2, h: 9, e: 0 },
    home: { team: "Detroit Tigers", abbr: "DET", byInning: [1,0,0,0,0,0,0,0,0], r: 1, h: 7, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv) — FULL, VERBATIM, breaks intact ----
  stadium_context: [
    "Tiger Stadium began as Navin Field in 1912 and grew into one of baseball's most forceful and revered urban ballparks. It replaced Bennett Park with a steel, concrete, and brick structure that could expand with Detroit and with the ambitions of the Tigers. Its later names, Briggs Stadium and Tiger Stadium, mark more than ownership changes. They trace how one corner at Michigan and Trumbull became a long-running civic address for Detroit baseball.",
    "The site gave the park its power. Tiger Stadium was not set apart in a sports complex or designed as a regional object. It was embedded in the city, with the field and grandstands pressed into an urban block. That compression produced unusual geometry, layered decks, and the famous sense that the building was almost too much structure for its site. Baseball there felt vertical, close, and enclosed by the city around it.",
    "Its expansions in the 1930s and later updates for lights, scoreboards, seating, and structure showed how an early ballpark could be enlarged into something more monumental without becoming a modern multipurpose stadium. But those same layers also made the building harder to adapt indefinitely. By the late twentieth century, the park's age, constraints, and limited modern revenue spaces worked against it, even as they remained central to its character.",
    "Comerica Park succeeded it in 2000, moving the Tigers into a downtown retro-classic setting with more contemporary amenities and a different spatial logic. Tiger Stadium's demolition in 2009 closed a chapter that had outlasted almost every normal stadium cycle. Its value in the anthology is that it shows the jewel-box idea at full urban intensity: not merely quaint or nostalgic, but dense, muscular, and eventually too physically specific for the business model that followed."
  ]
};
