/* Wrigley Field — verbatim values from uploads/all-stadium-pages.csv (row 1),
   uploads/featured-game-box-scores.csv (Wrigley game 1), uploads/stadium-context.csv.
   Local data only. Every populated structured value is mapped here exactly once;
   each appears in exactly one place in the layout. "n/a" fields are omitted. */
window.WRIGLEY = {
  // ---- Identity (title block, left page) ----
  stadium_name: "Wrigley Field",
  classification_era: "Jewel Box & Early Concrete",
  years_active: "1914\u2013present",

  // ---- Stadium Section ----
  city: "Chicago",
  state: "Illinois",
  team_name: "Chicago Cubs",
  league: "National League",
  division: "NL East/Central",
  opened: "1914",
  status: "Active",
  architect: "Zachary Taylor Davis",
  architectural_style: "Jewel-box neighborhood ballpark",
  stadium_type: "Open-air neighborhood jewel-box ballpark",
  roof_type: "Open Air",
  playing_surface_type: "Natural grass",
  surface: "Kentucky bluegrass",
  facade_material: "Steel-and-concrete grandstand with brick outfield walls and concrete-and-steel street facades",
  capacity_opening: "14,000",
  capacity_current: "41,649",
  name_history: "Weeghman Park (1914\u20131920); Cubs Park (1920\u20131926); Wrigley Field (1927\u2013present)",
  preceded_by: "23rd Street Grounds (1876-1877)\nLakefront Park (1878-1884)\nWest Side Park (1885-1891)\nSouth Side Park (1891-1893)\nWest Side Grounds (1893-1915)",
  elevation: "600 ft",
  coordinates: "41.9481\u00b0 N, 87.6556\u00b0 W",
  stadium_cost: "$250k",
  stadium_cost_adjusted: "$8.04 million",
  financing_method: "Privately financed by Charles Weeghman for the Federal League Chicago Whales, later acquired by the Cubs",
  address: "1060 W Addison Street, Chicago, IL 60613",
  location_classification: "Urban",
  construction_start: "Mar 4, 1911",
  opening_day: "Apr 23, 1914",
  left_field_distance: "355 ft",
  center_field_distance: "400 ft",
  right_field_distance: "353 ft",
  orientation: "NE",
  orientation_degrees: 37,
  renovations: "Major 1930s expansion; lights installed in 1988; 1060 Project restoration and expansion from 2014\u20132019; scoreboard, clubhouse, bleacher, concourse, and plaza upgrades",

  // ---- Visit Section ----
  visit_order: 1,
  visit_count: 3,
  first_visit_date: "Jun 17, 1953",
  featured_visit_day: "Friday",
  featured_visit_date: "Aug 12, 1988",
  visit_type: "Group Visit", // (CSV column: featured_game_title) verbatim
  other_visits: "Jun 19, 1953 (doubleheader); Aug 13, 1988",
  trip_name: "Midwest",

  // ---- Visit history (curated display log; years + known opponents) ----
  visit_log: [
    { year: "1953", games: [
      { date: "Jun 17", opponent: "Pirates", note: "First MLB Game (16 innings)" },
      { date: "Jun 19", opponent: "Dodgers", note: "Doubleheader" }
    ] },
    { year: "1969\u201370", games: [ { date: "Multiple games", opponent: "", note: "" } ] },
    { year: "1988", games: [
      { date: "Aug 12", opponent: "Cardinals", note: "", featured: true },
      { date: "Aug 13", opponent: "Cardinals", note: "" }
    ] }
  ],

  // featured game
  home_team: "Chicago Cubs",
  home_team_abbreviation: "CHC",
  away_team: "St. Louis Cardinals",
  away_team_abbreviation: "STL",
  game_result: "Cardinals 4, Cubs 0",
  attendance: "31,596",
  start_time: "3:05 PM",
  time_zone: "CDT",
  game_duration: "2:42",
  day_night: "Day",
  innings_played: 9,
  home_starting_pitcher: "Rick Sutcliffe",
  away_starting_pitcher: "Joe Magrane",
  winning_pitcher: "Joe Magrane",
  losing_pitcher: "Rick Sutcliffe",
  // save_pitcher: n/a (omitted)

  // weather
  temperature: "91\u00b0",
  conditions: "Clear",
  wind: "11 mph SSW",
  humidity: "51%",

  // ---- Team colors (styling tokens, also surfaced once as a swatch key) ----
  colors: {
    primary: { name: "Royal Blue", hex: "#0E3386" },
    secondary: { name: "Red", hex: "#CC3433" },
    accent: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Box score (uploads/featured-game-box-scores.csv, Wrigley game 1) ----
  box: {
    date: "Aug 12, 1988",
    day: "Friday",
    away: { team: "St. Louis Cardinals", abbr: "STL", byInning: [0,0,0,1,0,0,2,1,0], r: 4, h: 10, e: 0 },
    home: { team: "Chicago Cubs", abbr: "CHC", byInning: [0,0,0,0,0,0,0,0,0], r: 0, h: 1, e: 2 },
    innings: 9
  },

  // ---- Stadium Context (uploads/stadium-context.csv) — FULL, VERBATIM ----
  stadium_context: [
    "Wrigley Field has survived so long that it can be mistaken for something outside stadium history, as if it simply endured while other parks came and went. But its importance is more interesting than preservation alone. It began as Weeghman Park in 1914, became Cubs Park, then Wrigley Field, and through those name changes kept the basic arrangement that later eras would spend enormous sums trying to recreate: baseball fitted tightly into a living city.",
    "The park did not replace a single modern stadium problem so much as inherit Chicago baseball's restless early geography. The Cubs had already moved through a chain of grounds before settling into the North Side building that became their long-term home. What made Wrigley durable was not that it was ideal by later standards. It was constrained, urban, asymmetrical, and physically close to the streets around it. Those constraints became the identity. The brick walls, steel-and-concrete grandstand, neighborhood edges, and compact field geometry make the park feel less like a detached venue than a piece of city fabric that happens to contain major-league baseball.",
    "That older arrangement kept needing negotiation with newer forms of the sport. Lights arrived in 1988, long after night baseball had become ordinary elsewhere. Later work through the 1060 Project rebuilt and expanded clubhouses, bleachers, concourses, scoreboards, and adjacent fan spaces. Those changes were not cosmetic. They were the cost of keeping an early twentieth-century ballpark viable inside a league built around broadcast schedules, premium inventory, player facilities, and year-round revenue.",
    "Wrigley matters because it complicates the usual stadium timeline. Most parks represent their era by being replaced when the next era arrives. Wrigley represents its era by forcing later eras to adapt around it. It is not a pure relic, and it is not a retro invention. It is a working old building that has repeatedly been made new enough to survive, while still reminding the rest of baseball what was lost when ballparks stopped being woven so tightly into ordinary streets."
  ]
};
