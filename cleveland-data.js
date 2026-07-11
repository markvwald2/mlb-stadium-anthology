/* Cleveland Municipal Stadium — verbatim values from the user-provided Codex brief
   (stadium payload, featured-game payload, line score, and stadium context).
   Local data only. Each populated structured value appears once in the layout.
   "n/a" fields are omitted. No invented, normalized, or web-sourced values. */
window.CMS = {
  // ---- Identity (left page title block) ----
  stadium_name: "Cleveland Municipal Stadium",
  source_name: "Municipal Stadium",
  classification_era: "Postwar Municipal",
  years_active: "1931\u20131993",
  years_active_note: "1931\u20131993",
  stadium_type: "Open-air municipal multipurpose stadium",
  status: "Demolished",

  // ---- Stadium Section ----
  city: "Cleveland",
  state: "Ohio",
  team_name: "Cleveland Indians / Guardians",
  league: "American League",
  division: "AL East",
  opened: "1931",
  architect: "Walker and Weeks",
  architectural_style: "Prewar municipal stadium with stripped-classical civic scale",
  facade_material: "Reinforced concrete and steel municipal bowl with monumental lakefront exterior",
  roof_type: "Open Air",
  playing_surface: "Natural grass",
  capacity_opening: "78,189",
  capacity_later: "81,000",
  preceded_by: "League Park",
  succeeded_by: "Jacobs Field",
  elevation: "590 ft",
  coordinates: "41.5067\u00b0 N, 81.6972\u00b0 W",
  stadium_cost: "$3 million",
  stadium_cost_adjusted: "$63.5 million",
  financing_method: "Publicly financed and owned by the City of Cleveland as a municipal lakefront stadium",
  address: "1085 W 3rd Street, Cleveland, OH 44114 (former site)",
  location_classification: "Lakefront; Downtown",
  construction_start: "Jun 24, 1930",
  opening_day: "Jul 1, 1931",
  final_game: "Oct 3, 1993",
  demolition_year: "1997",
  renovations: "Lighting, seating, scoreboard, field, football, and tenant-specific updates across decades",

  // ---- Field geometry ----
  left_field_distance: "322 ft",
  center_field_distance: "400 ft",
  right_field_distance: "322 ft",
  orientation: "NE",
  orientation_degrees: 45,

  // ---- Visit Section ----
  visit_order: 12,
  visit_total: 42,
  visit_count: "1",
  featured_visit_day: "Monday",
  featured_visit_date: "Aug 13, 1990",
  visit_type: "Group Visit",
  game_title: "Group Visit",
  trip_name: "Northeast",

  // featured game
  home_team: "Cleveland Indians",
  home_team_abbreviation: "CLE",
  away_team: "Detroit Tigers",
  away_team_abbreviation: "DET",
  matchup: "Detroit Tigers at Cleveland Indians",
  game_result: "Tigers 6, Indians 5",
  attendance: "12,073",
  first_pitch: "7:38 PM EDT",
  game_duration: "2:51",
  game_type: "Night",
  home_starter: "Jeff Shaw",
  away_starter: "Walt Terrell",
  winning_pitcher: "Walt Terrell",
  losing_pitcher: "Jeff Shaw",
  save_pitcher: "Jerry Gleaton",
  innings_played: 9,

  // weather
  temperature: "71\u00b0",
  conditions: "Partly Cloudy",
  wind: "8 mph NW",
  humidity: "73%",

  // ---- Team colors (Navy Blue, Red, White) — used as restrained accents / small color key ----
  team_colors: [
    { name: "Navy Blue", hex: "#0C2340" },
    { name: "Red", hex: "#C8102E" },
    { name: "White", hex: "#FFFFFF" }
  ],

  // ---- Box score (provided line score) ----
  box: {
    away: { team: "Detroit Tigers", abbr: "DET", byInning: [3,2,0,0,0,0,0,0,1], r: 6, h: 10, e: 1 },
    home: { team: "Cleveland Indians", abbr: "CLE", byInning: [0,1,2,0,0,0,0,0,2], r: 5, h: 11, e: 1 },
    innings: 9
  },

  // ---- Stadium Context (provided) — one unified block, paragraph breaks intact, verbatim ----
  stadium_context: [
    "Cleveland Municipal Stadium was built from civic ambition before modern stadium specialization had fully taken hold. It did not replace League Park because baseball alone demanded a new home; it was conceived as a vast lakefront public stadium for baseball, football, boxing, and large civic spectacle. When MLB used it, baseball occupied a building whose scale and purpose were broader than the sport itself.",
    "The lakefront site gave Cleveland a monumental address, but it also changed the relationship between team and city. League Park was configured to fit into the street grid, creating a more intimate neighborhood ballpark. Municipal Stadium placed baseball beside civic infrastructure, rail, port, and downtown lakefront space, making the game part of a larger public landscape. It was a building for a city imagining itself through big shared institutions rather than through the smaller grain of older ballpark urbanism.",
    "That ambition came with a cost. The stripped-classical exterior and huge open-air bowl gave the stadium presence, but baseball could feel dwarfed inside it. Lighting, seating, scoreboard, field, football, and tenant-specific updates kept the building active for decades, yet they did not change the basic mismatch: a sport built on field-level intimacy inside a stadium designed for mass civic use.",
    "Jacobs Field, later Progressive Field, succeeded Municipal Stadium in 1994 with the opposite premise. Baseball returned to a vibrant downtown setting, but in a building scaled and shaped for the game. Cleveland Municipal Stadium matters because it sits at an important hinge before the familiar postwar multipurpose boom. It shows that the tension between civic monument and baseball intimacy was already present long before the concrete doughnuts of the 1970s made that problem routine."
  ]
};
