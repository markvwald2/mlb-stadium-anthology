/* Royals Stadium — verbatim values from uploads/all-stadium-pages.csv (Royals Stadium row),
   uploads/featured-game-box-scores.csv (Royals Stadium game 1), uploads/stadium-context.csv.
   Local data only. Every populated structured value is mapped here exactly once;
   each appears in exactly one place in the layout. "n/a" fields are omitted.
   Field-era name "Royals Stadium" (1973–1993) used throughout; renamed Kauffman in 1993. */
window.ROYALS = {
  // ---- Identity (title block, left page) ----
  stadium_name: "Royals Stadium",
  classification_era: "Modern Baseball-Specific",
  years_active: "1973\u2013present",

  // ---- Stadium Section ----
  city: "Kansas City",
  state: "Missouri",
  team_name: "Kansas City Royals",
  league: "American",
  division: "AL Central",
  opened: "April 10, 1973",
  status: "Active",
  architect: "Kivett and Myers",
  architectural_style: "Modernist baseball-only stadium with fountain-focused sports-complex planning",
  stadium_type: "Open-air baseball-only stadium in a sports complex",
  roof_type: "Open Air",
  playing_surface_type: "Mixed / changed over time",
  surface: "AstroTurf 1973\u20131994; seasonal natural-grass blend since 1995",
  facade_material: "Smooth exposed concrete facade with later glass and metal entrance additions",
  capacity_opening: "40,625",
  capacity_current: "37,903",
  name_history: "Royals Stadium (1973\u20131993); Kauffman Stadium (1993\u2013present)",
  preceded_by: "Municipal Stadium (1969\u20131972)",
  elevation: "870 ft",
  coordinates: "39.0514\u00b0 N, 94.4806\u00b0 W",
  stadium_cost: "$70 million",
  stadium_cost_adjusted: "$508 million",
  financing_method: "Publicly financed by Jackson County bonds as part of the Truman Sports Complex, with later voter-approved public renovation funding",
  address: "1 Royal Way, Kansas City, MO 64129",
  location_classification: "Sports-complex \u00b7 Urban \u00b7 Suburban",
  construction_start: "Jul 11, 1968",
  opening_day: "Apr 10, 1973",
  left_field_distance: "330 ft",
  center_field_distance: "410 ft",
  right_field_distance: "330 ft",
  orientation: "NE",
  orientation_degrees: 46,
  renovations: "Major 2007\u20132009 renovation; scoreboard, concourses, fountains, outfield experience, seating, club, and amenities upgrades",

  // ---- Visit Section ----
  visit_order: 11,
  visit_count: 1,
  first_visit_date: "Aug 23, 1989",
  featured_visit_day: "Wednesday",
  featured_visit_date: "Aug 23, 1989",
  visit_type: "Group Visit", // (CSV column: featured_game_title) verbatim
  // other_visits: n/a (omitted)
  // trip_name: n/a (omitted)

  // featured game
  home_team: "Kansas City Royals",
  home_team_abbreviation: "KC",
  away_team: "California Angels",
  away_team_abbreviation: "CAL",
  game_result: "Royals vs Angels",
  attendance: "32,843",
  start_time: "7:35 PM",
  time_zone: "CDT",
  game_duration: "3:09",
  day_night: "Night",
  innings_played: 9,
  home_starting_pitcher: "Tom Gordon",
  away_starting_pitcher: "Jim Abbott",
  winning_pitcher: "Tom Gordon",
  losing_pitcher: "Jim Abbott",
  save_pitcher: "Jeff Montgomery",

  // weather
  temperature: "82\u00b0",
  conditions: "Mostly Clear",
  wind: "2 mph NE",
  humidity: "69%",

  // ---- Team colors (styling tokens, also surfaced once as a swatch key) ----
  colors: {
    primary: { name: "Royal Blue", hex: "#134A8E" },
    secondary: { name: "Gold", hex: "#BD9B60" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Box score (uploads/featured-game-box-scores.csv, Royals Stadium game 1) ----
  box: {
    date: "Aug 23, 1989",
    day: "Wednesday",
    away: { team: "California Angels", abbr: "CAL", byInning: [1,0,0,0,0,0,0,3,0], r: 4, h: 6, e: 1 },
    home: { team: "Kansas City Royals", abbr: "KC", byInning: [2,0,0,0,3,1,0,0,"x"], r: 6, h: 11, e: 1 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv, source: Kauffman Stadium) — FULL, VERBATIM ----
  stadium_context: [
    "Royals Stadium was unusual for its era because Kansas City chose a sports-complex model without making baseball share a multipurpose bowl. After Municipal Stadium, the Royals moved into a new public complex that separated baseball and football into neighboring venues. That decision gave the franchise a modern home while avoiding the worst geometric compromises that defined many 1970s stadiums.",
    "The site reflected a regional theory of attendance. Rather than embed the park in a downtown grid, Kansas City placed it in a sports-complex landscape where automobile access, parking, and event scale could be managed directly. The setting made baseball part of a broader metropolitan destination rather than a neighborhood habit. That was very much of its time, but the building itself took a different path from the circular concrete stadiums of the same decade.",
    "Its modernist baseball-only form and fountain-focused identity gave Royals Stadium a clarity that many contemporaries lacked. It gained the access and capacity of the sports-complex age while preserving a field shaped primarily for baseball. The design bargain was still real: the park sacrificed urban intimacy and walkable texture for regional convenience and controlled arrival. But inside the bowl, baseball did not have to compete with football geometry in the same way it did at Riverfront, Three Rivers, or Veterans Stadium.",
    "The 2007\u20132009 renovation reinforced that original strength rather than replacing it. Scoreboard, concourse, fountain, outfield, seating, club, and amenity upgrades made the park more compatible with contemporary MLB expectations while preserving its essential form. Royals Stadium, now Kauffman Stadium, matters because it complicates the 1970s story. It shows that the era's appetite for suburban-scale infrastructure did not always require a multipurpose compromise."
  ]
};
