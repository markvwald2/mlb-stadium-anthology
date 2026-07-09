/* Busch Stadium — St. Louis, Missouri.  "The Civic Arch."
   The controlling metaphor is the relationship between three civic forms: the
   Gateway Arch, Busch Stadium's exposed steel entrance arch, and the long-span
   Mississippi River bridges behind the ballpark. The right page is organized as
   five structural bays (bridge spans / arch ribs) rather than a magazine grid.
   Local data only — every structured value provided in the brief appears once.
   Palette: limestone off-white paper, charcoal type, Cardinal Red brick + navy
   structural accents, a thin gold highlight. Photos carry NO captions. */
window.BUSCH = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Busch Stadium",
  name_lines: ["BUSCH STADIUM"],
  city: "St. Louis",
  state: "Missouri",
  est: "2006",
  league: "National League",
  division: "NL Central",
  coordinates: "38.6225\u00b0 N, 90.1931\u00b0 W",
  elevation: "465 ft",
  visit_order: 40,
  visit_total_book: 42,

  // ---- Identity / classification ribbon (the main bridge track) ----
  identity: [
    ["Team", "St. Louis Cardinals"],
    ["League", "National League"],
    ["Division", "NL Central"],
    ["Classification", "Ballpark District"],
    ["Years Active", "2006\u2013Present"],
    ["Visit Order", "40\nof 42"],
    ["Coordinates", "38.6225\u00b0 N\n90.1931\u00b0 W"],
    ["Capacity", "44,494\n(orig. 46,861)"]
  ],

  // ---- Stadium facts (museum-style tabular, left bay) ----
  // [key, value, optional sub-value]
  facts: [
    ["Opened", "Apr 10, 2006"],
    ["Construction Start", "Jan 17, 2004"],
    ["Surface", "Natural grass", "Tahoma 31 hybrid bermudagrass since 2023; previously Kentucky bluegrass"],
    ["Roof", "Open Air"],
    ["Stadium Type", "Open-air baseball-only ballpark"],
    ["Architect", "Populous, with HOK Sport heritage"],
    ["Facade", "Red brick & limestone / cast-stone masonry; exposed structural steel entrance arch"],
    ["Original Cost", "$365 million", "adjusted $583 million"],
    ["Financing", "Primarily privately financed (Cardinals ownership); limited state / local public assistance & infrastructure support"],
    ["Renovations", "Ballpark Village phased development; scoreboard, club, seating & hospitality upgrades"],
    ["Location", "Downtown \u00b7 700 Clark Avenue"],
    ["Preceded By", "Sportsman\u2019s Park (1880-1891)\nUnion Park (1892-1897)\nLeague Park (1898)\nRobison Field (1899-1920)\nSportsman\u2019s Park (1920-1952)\nBusch Stadium (1953-1965)\nBusch Stadium II (1966-2005)"]
  ],

  // ---- Field dimensions module (protractor at the pivot) ----
  field: {
    left_field: "336",
    center_field: "375",
    right_field: "335",
    orientation: "ENE",
    degrees: 62
  },

  // ---- Featured visit information ----
  visit: [
    ["First Pitch", "6:15 PM CDT"],
    ["Duration", "2:27"],
    ["Attendance", "41,929"],
    ["Other Visits", "Aug 18, 2024"]
  ],
  result_line: "Cardinals 5, Dodgers 2",

  // ---- Pitching matchup + decisions ----
  pitching: {
    away: "Bobby Miller",
    away_team: "LAD",
    home: "Andre Pallante",
    home_team: "STL",
    win: "Andre Pallante",
    loss: "Bobby Miller",
    save: "Ryan Helsley"
  },

  // ---- Weather strip (museum exhibit label) ----
  weather: {
    temperature: "85\u00b0",
    conditions: "Mostly Clear",
    wind: "10 mph NW",
    humidity: "53%"
  },

  // ---- Featured game / line score (scorecard ledger) ----
  box: {
    innings: 9,
    away: { abbr: "LAD", name: "Dodgers", byInning: [1, 0, 0, 0, 1, 0, 0, 0, 0], r: 2, h: 4, e: 0 },
    home: { abbr: "STL", name: "Cardinals", byInning: [1, 0, 2, 0, 1, 0, 0, 1, "x"], r: 5, h: 11, e: 0 }
  },

  // ---- Stadium context (one unified body — museum wall text, paragraphs intact) ----
  stadium_context: [
    "Busch Stadium replaced the circular multipurpose Busch Memorial Stadium by giving St. Louis baseball a more particular downtown frame. The Cardinals had long occupied a series of homes, but by 2006 the old concrete bowl no longer matched the franchise\u2019s sense of tradition or MLB\u2019s facility economics. The new park kept the team downtown while reshaping the experience around baseball-specific geometry, premium inventory, and surrounding development.",
    "The site decision preserved the central city as part of the Cardinals\u2019 identity. Rather than retreat to a suburban complex, St. Louis used the new ballpark to reinforce downtown baseball and to set up Ballpark Village. The architecture\u2019s civic arch and Mississippi River bridge references worked to connect the park to local imagery, even as the building served contemporary revenue and hospitality needs.",
    "The design bargain was to make the stadium both venue and urban anchor. Busch gained open-air baseball, views, club spaces, hospitality areas, and a stronger relationship to downtown streets. It also became part of a managed entertainment environment, where the area around the ballpark could be programmed and monetized beyond the game itself. The phased development of Ballpark Village, along with scoreboard, club, seating, and hospitality upgrades, made that ambition explicit.",
    "Busch Stadium matters because it shows the late retro-classic period turning from ballpark replacement toward district design. It corrected the multipurpose bowl\u2019s lack of baseball specificity, but it also asked the stadium to do more than host the Cardinals. It became a tool for extending the franchise\u2019s presence into the surrounding city."
  ],

  // ---- Supporting photography (five documentary bays). Captions match the
  // supplied concept image. each: [slot id, drop placeholder, caption] ----
  bays: [
    ["busch-p1", "Third-base entry \u2014 brick facade & steel entrance arch", "Third Base Entry", "images/busch/busch-stadium-04.jpg"],
    ["busch-p2", "View from right field \u2014 seating bowl & field", "View from Right Field", "images/busch/busch-stadium-03.jpg"],
    ["busch-p3", "Center-field scoreboard", "Scoreboard", "images/busch/busch-stadium-06.jpg"],
    ["busch-p4", "Concourse & Ballpark Village edge", "Concourse", "images/busch/busch-stadium-01.jpg"],
    ["busch-p5", "Downtown St. Louis \u2014 Gateway Arch & river", "Downtown St. Louis", "images/busch/busch-stadium-05.jpg"]
  ]
};
