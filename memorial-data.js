/* Memorial Stadium — verbatim values from uploads/all-stadium-pages.csv (Memorial Stadium row),
   uploads/featured-game-box-scores.csv (Memorial Stadium game 1), uploads/stadium-context.csv.
   Local data only. Each populated structured value appears once in the layout.
   Concept: "The Gateway Before the Revolution" — a transitional civic monument
   standing between postwar municipal stadium design and the retro-classic era. */
window.MEMORIAL = {
  // ---- Identity (left page carved title block) ----
  stadium_name: "Memorial Stadium",
  city: "Baltimore",
  state: "Maryland",
  classification_era: "Postwar Municipal",
  years_active: "1954\u20131991 for MLB",
  stadium_type: "Open-air municipal multipurpose stadium",
  status: "Demolished",

  // ---- Stadium Section ----
  team_name: "Baltimore Orioles",
  team_abbr: "BAL",
  league: "American League",
  league_abbr: "AL",
  division: "AL East",
  opened: "1954",
  architect: "Hall, Border & Donaldson",
  architectural_style: "Postwar municipal memorial stadium with monumental classical frontage",
  facade_material: "Reinforced concrete structure with brick-and-stone memorial facade and gateway",
  roof_type: "Open Air",
  playing_surface: "Natural grass",
  capacity_current: "53,371",
  capacity_opening: "31,000",
  succeeded_by: "Oriole Park at Camden Yards",
  elevation: "250 ft",
  coordinates: "39.3294\u00b0 N, 76.6014\u00b0 W",
  coordinates_n: "39.3294\u00b0 N",
  coordinates_w: "76.6014\u00b0 W",
  stadium_cost: "$6.5 million",
  stadium_cost_adjusted: "$87 million",
  financing_method: "Publicly financed as a Baltimore municipal memorial stadium, with city/state civic-stadium support",
  address: "900 E 33rd Street, Baltimore, MD 21218 (former site)",
  location_classification: "Urban",
  construction_start: "1921",
  opening_day: "Dec 2, 1922",
  final_game: "Oct 6, 1991",
  demolition_year: "2001",
  renovations: "Major 1950s reconstruction; scoreboards, lighting, seating, and football/baseball updates across decades",

  // ---- Field geometry ----
  left_field_distance: "309 ft",
  center_field_distance: "405 ft",
  right_field_distance: "309 ft",
  orientation: "N",
  orientation_degrees: 0,

  // ---- Visit Section ----
  visit_order: 15,
  visit_total: 42,
  visit_count: "1",
  first_visit_date: "Aug 17, 1990",
  featured_visit_day: "Friday",
  featured_visit_date: "August 17, 1990",
  visit_type: "Group Visit",
  trip_name: "Northeast",

  // featured game
  home_team: "Baltimore Orioles",
  home_team_abbreviation: "BAL",
  away_team: "Oakland Athletics",
  away_team_abbreviation: "OAK",
  game_result: "Athletics 8, Orioles 3",
  attendance: "45,379",
  first_pitch: "7:38 PM EDT",
  day_night: "Night",
  game_duration: "2:51",
  home_starting_pitcher: "John Mitchell",
  away_starting_pitcher: "Bob Welch",
  winning_pitcher: "Bob Welch",
  losing_pitcher: "John Mitchell",
  innings_played: 9,

  // weather
  temperature: "81\u00b0",
  conditions: "Clear",
  wind: "4 mph S",
  humidity: "66%",

  // ---- Team colors (styling tokens only; surfaced once as a swatch key) ----
  colors: {
    primary: { name: "Orange", hex: "#D8541B" },
    secondary: { name: "Black", hex: "#171513" },
    accent: { name: "White", hex: "#F1ECDF" }
  },

  // ---- Box score (uploads/featured-game-box-scores.csv, Memorial Stadium game 1) ----
  box: {
    date: "Aug 17, 1990",
    day: "Friday",
    away: { team: "Oakland Athletics", abbr: "OAK", byInning: [0,0,0,0,7,0,0,1,0], r: 8, h: 13, e: 0 },
    home: { team: "Baltimore Orioles", abbr: "BAL", byInning: [0,2,0,0,0,0,0,1,0], r: 3, h: 9, e: 0 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv) — FULL, VERBATIM, breaks intact ----
  stadium_context: [
    "Memorial Stadium gave Baltimore a postwar civic stage before Camden Yards taught MLB a different lesson. It was built through a major 1950s reconstruction into a municipal memorial stadium with a monumental classical frontage, serving baseball and football in a structure meant to carry public meaning as well as crowds. For the Orioles, it provided the major-league setting that earlier Baltimore baseball had lacked in the modern era.",
    "Its urban site kept the stadium within the city, but not in the same way as a tight jewel-box park. Memorial Stadium was broader, more formal, and more institutional. The building's memorial character and reinforced concrete mass made it feel like civic infrastructure, a place where baseball was one expression of public gathering rather than the sole organizing idea.",
    "The design bargain was typical of its moment. Baltimore gained scale, permanence, and a shared venue that could support two major sports. Baseball gave up some of the intimacy and specificity that later generations would come to value again. Scoreboards, lighting, seating, and football/baseball updates kept the stadium useful, but the building's underlying logic remained municipal and multipurpose.",
    "Oriole Park at Camden Yards replaced it in 1992 and changed the terms of the national conversation. The Orioles did not simply move into a newer facility; they moved from postwar civic stadium to retro-classic downtown ballpark, from memorial frontage to warehouse-district character, from shared municipal scale to baseball-specific urban texture. Memorial Stadium matters because it provides the before image for Camden Yards. Without it, the revolution that followed looks less dramatic."
  ]
};
