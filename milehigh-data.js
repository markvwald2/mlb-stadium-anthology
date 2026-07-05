/* Mile High Stadium — verbatim values from uploads/all-stadium-pages.csv (Mile High Stadium row),
   uploads/featured-game-box-scores.csv (Mile High Stadium game 1), uploads/stadium-context.csv.
   Local data only. Each populated structured value is mapped here once and rendered exactly once
   in the layout. Blank / n/a / unknown / null fields are omitted entirely (visit_count, trip_name,
   preceded_by, save_pitcher).
   Concept: "Proof of Concept — The Borrowed Bowl." A football-first, open-air, multipurpose
   stadium with movable-grandstand engineering, pressed into service for MLB expansion baseball
   at exactly one mile of elevation, while Coors Field was built. Rockies purple/black/silver
   used only as restrained accents over a concrete-and-steel editorial frame. */
window.MILEHIGH = {
  // ---- Identity (hero, left page) ----
  stadium_name: "Mile High Stadium",
  city: "Denver",
  state: "Colorado",
  status: "Demolished",
  roof_type: "Open Air",
  years_active: "1993\u20131994 \u00b7 MLB",
  elevation: "5,280 ft",
  coordinates: "39.7461\u00b0 N, 105.0217\u00b0 W",
  lat: "39.7461\u00b0 N",
  lon: "105.0217\u00b0 W",

  // ---- Ribbon (stadium section) ----
  team_name: "Colorado Rockies",
  league: "National League",
  division: "NL West",
  classification_era: "Multipurpose Shared Use",
  visit_order: 16,

  // ---- Stadium facts ----
  opened_mlb: "1993",                                   // opened
  construction_start: "1947",
  opening_day: "Aug 14, 1948",
  final_game: "Aug 11, 1994",
  demolition_year: "2002",
  capacity_opening: "76,000",
  capacity_current: "76,123",
  playing_surface_type: "Natural grass",
  surface: "Kentucky bluegrass",
  architect: "Original Bears Stadium by local municipal designers; later expansions by several firms",
  stadium_type: "Open-air multipurpose stadium adapted for MLB expansion",
  architectural_style: "Utilitarian open-air multipurpose stadium with expandable movable-grandstand",
  facade_material: "Concrete and steel grandstands with movable steel east-stand structure",
  name_history: "Bears Stadium (1948\u20131968); Mile High Stadium (1969\u20132001)",
  succeeded_by: "Coors Field",
  address: "2755 W 17th Avenue, Denver, CO 80204 (former site)",
  location_classification: "Urban-edge; Urban",
  renovations: "Expanded repeatedly for football; movable east stands, upper decks, scoreboard, and event upgrades before Rockies tenancy",

  // ---- Finance ----
  stadium_cost: "$500k",
  stadium_cost_adjusted: "$7 million",
  financing_method: "Publicly financed and expanded by Denver as a municipal stadium; Rockies tenancy used the existing facility as an interim Major League Baseball venue",

  // ---- Field geometry ----
  left_field_distance: "333 ft",
  center_field_distance: "423 ft",
  right_field_distance: "370 ft",
  orientation: "SE",
  orientation_degrees: 135,

  // ---- Visit section ----
  visit_type: "First Visit",                            // featured_game_title
  first_visit_date: "Apr 9, 1993",                      // == featured_visit_date
  featured_visit_day: "Friday",
  other_visits: "Multiple",
  game_result: "Rockies 11, Expos 4",
  attendance: "80,227",
  start_time: "3:05 PM",
  time_zone: "MDT",
  game_duration: "2:42",
  day_night: "Day",
  innings_played: 9,
  home_starting_pitcher: "Bryn Smith",                  // also winning_pitcher
  away_starting_pitcher: "Kent Bottenfield",            // also losing_pitcher
  winning_pitcher: "Bryn Smith",
  losing_pitcher: "Kent Bottenfield",

  // weather
  temperature: "63\u00b0",
  conditions: "Light Drizzle",
  wind: "3 mph SW",
  humidity: "23%",

  // ---- Club colors (source of the restrained accent palette) ----
  colors: {
    primary: { name: "Purple", hex: "#5A3E8E" },
    secondary: { name: "Black", hex: "#1A1714" },
    accent: { name: "Silver", hex: "#AEB1B5" }
  },

  // ---- Featured game line score (uploads/featured-game-box-scores.csv, Mile High game 1) ----
  box: {
    away: { team: "Montreal Expos", abbr: "MON", byInning: [0,0,0,0,0,0,0,0,4], r: 4, h: 10, e: 4 },
    home: { team: "Colorado Rockies", abbr: "COL", byInning: [4,1,0,2,2,0,2,0,"x"], r: 11, h: 18, e: 1 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv, Mile High Stadium) — FULL, VERBATIM ----
  stadium_context: [
    "Mile High Stadium's place in MLB history is brief but revealing. It was not built to be the Rockies' permanent home; it was an adaptable open-air multipurpose stadium pressed into service while Denver proved it could support major-league baseball and while Coors Field was being built. That temporary role makes it different from most stadiums in the anthology. Its importance lies in transition rather than permanence.",
    "The west-side urban-edge setting matched the building's regional function. Denver's new franchise needed a venue that could hold enormous crowds immediately, and Mile High already had the scale, access, and event infrastructure to do it. The stadium's expandable and movable-grandstand engineering, shaped largely by football and other uses, became a way to bridge the gap between expansion award and baseball-specific construction.",
    "The bargain was straightforward. Mile High gave the Rockies significant capacity and instant legitimacy, but not a true baseball home. Its multipurpose, utilitarian form could adapt, but adaptation is not the same as belonging. Baseball there was provisional, staged inside a building whose history and geometry pointed elsewhere. That did not make the experience unimportant; it made it a public test of Denver's appetite for MLB.",
    "Coors Field succeeded it in 1995 with a completely different argument: downtown, baseball-only, retro-classic, and designed around the rhythms of the new franchise rather than borrowed from another sport. Mile High Stadium matters because it captures the launch phase of expansion baseball. It shows that sometimes a temporary home is not a footnote but the proof of concept that makes the permanent ballpark possible."
  ]
};
