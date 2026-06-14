/* Comiskey Park — verbatim values from the Comiskey Codex brief (stadium row,
   featured-game box score, stadium-context). Local data only. Each populated
   structured value is placed exactly once in the layout. "n/a" / blank fields
   are omitted. The ChatGPT concept image is visual direction only — no text,
   numbers, or labels are taken from it. */
window.COMISKEY = {
  // ---- Identity (left page title block) ----
  stadium_name: "Comiskey Park",
  classification_era: "Jewel Box & Early Concrete",
  years_active: "1910\u20131990",
  stadium_type: "Open-air neighborhood jewel-box ballpark",
  status: "Demolished",

  // ---- Stadium Section ----
  city: "Chicago",
  state: "Illinois",
  team_name: "Chicago White Sox",
  league: "American League",
  division: "AL West",
  opened: "1910",
  architect: "Zachary Taylor Davis",
  architectural_style: "Jewel-box neighborhood ballpark",
  facade_material: "Brick, reinforced concrete, and steel",
  roof_type: "Open Air",
  playing_surface: "Bluegrass outfield; Sox Sod AstroTurf infield 1969\u20131975; grass infield restored 1976",
  surface_type: "Mixed / changed over time",
  opening_capacity: "32,000",
  final_capacity: "43,951",
  name_history: "White Sox Park (1910\u20131912, 1962\u20131975); Comiskey Park (1913\u20131961, 1976\u20131990)",
  preceded_by: "39th Street Grounds / South Side Park",
  succeeded_by: "New Comiskey Park",
  elevation: "595 ft",
  coordinates: "41.8317\u00b0 N, 87.6342\u00b0 W",
  stadium_cost: "$750k",
  stadium_cost_adjusted: "$25.9 million",
  financing_method: "Privately financed by White Sox owner Charles Comiskey",
  address: "324 W 35th Street, Chicago, IL 60616 (former site)",
  location_classification: "Urban",
  construction_start: "1910",
  opening_day: "Jul 1, 1910",
  final_game: "Sep 30, 1990",
  demolition_year: "1991",
  all_star_games: "1933, 1950, 1983",
  renovations: "Upper-deck, scoreboard, lighting, seating, clubhouse, and structural updates across decades",

  // ---- Field geometry ----
  left_field_distance: "352 ft",
  center_field_distance: "420 ft",
  right_field_distance: "352 ft",
  orientation: "NE",
  orientation_degrees: 45,

  // ---- Visit Section ----
  visit_order: 3,
  visit_total: 42,
  visit_count: "2",
  first_visit_year: "1969",
  featured_visit_day: "Tuesday",
  featured_visit_date: "Aug 16, 1988",
  visit_type: "Group Visit",
  trip_name: "Midwest",

  // featured game
  home_team: "Chicago White Sox",
  home_team_abbreviation: "CWS",
  away_team: "Toronto Blue Jays",
  away_team_abbreviation: "TOR",
  game_result: "White Sox 5, Blue Jays 4",
  attendance: "15,706",
  first_pitch: "7:38 PM CDT",
  game_duration: "3:09",
  pitching_matchup: "Jimmy Key (TOR) vs Jack McDowell (CWS)",
  winning_pitcher: "Jack McDowell",
  losing_pitcher: "Jimmy Key",
  save_pitcher: "Bobby Thigpen",
  innings_played: 9,

  // weather
  temperature: "95\u00b0",
  conditions: "Clear",
  wind: "9 mph SSW",
  humidity: "54%",

  // ---- Team colors (styling tokens only; restrained accents, not text) ----
  colors: {
    primary: { name: "Black", hex: "#161310" },
    secondary: { name: "Silver", hex: "#9A9384" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Box score ----
  box: {
    date: "Aug 16, 1988",
    day: "Tuesday",
    away: { team: "Toronto Blue Jays", abbr: "TOR", byInning: [1,0,0,0,0,0,2,0,1], r: 4, h: 10, e: 0 },
    home: { team: "Chicago White Sox", abbr: "CWS", byInning: [0,2,2,0,1,0,0,0,"x"], r: 5, h: 6, e: 0 },
    innings: 9
  },

  // ---- Stadium Context — FULL, VERBATIM, paragraph breaks intact ----
  stadium_context: [
    "Comiskey Park belonged to the generation when an owner could build a major-league ballpark as an urban piece of infrastructure and expect the city to grow around its rhythms. Opened in 1910 on Chicago's South Side, it replaced the White Sox's earlier 39th Street Grounds with something larger, more permanent, and more architecturally substantial. Brick, steel, reinforced concrete, and a neighborhood setting made it part of the jewel-box era, but its scale and durability also gave it a harder civic presence than the phrase \u201cold ballpark\u201d sometimes suggests.",
    "The site mattered because it kept the White Sox rooted in a particular side of Chicago. Unlike later stadiums organized around regional access and surface parking, Comiskey was tied to streets, blocks, and neighborhood identity. That did not make it quaint; it made it specific. Baseball there was shaped by proximity, by the compression of city land, and by the social geography of the South Side.",
    "Over eight decades, the building absorbed the usual pressures of modern baseball: lighting, scoreboards, seating changes, clubhouse updates, structural work, and the shifting expectations of television-era spectatorship. Those changes could extend the life of the park, but they could not turn it into the kind of facility owners and cities came to want by the late twentieth century. Its strengths as an old urban park also became the reasons it looked obsolete: limited revenue space, aging structure, and a site less easily adapted to newer expectations of comfort and control.",
    "New Comiskey Park succeeded it in 1991, keeping the team nearby while changing the stadium model almost completely. The replacement traded intimacy and accumulated history for a larger, modern baseball-only facility backed by public stadium politics and parking logic. Comiskey Park matters because it shows what was lost in that trade: not only an old building, but a particular way of attaching baseball to a city neighborhood."
  ]
};
