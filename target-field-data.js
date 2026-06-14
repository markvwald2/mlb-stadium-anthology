/* Target Field — Minneapolis, Minnesota.
   "The Urban Seam." Target Field is a ballpark stitched into a constrained
   downtown site — freight rail, warehouse blocks, and I-394 — that reversed the
   Metrodome bargain and returned Twins baseball to weather, light, and the city.
   FACTUAL AUTHORITY: the Codex Target Field brief. The ChatGPT concept image is
   visual direction only; none of its invented scores, pitchers, attendance,
   capacity, weather, or the wrong center-field distance are used here. Empty /
   n/a fields (Save, Name History, Succeeded By, Final Game) are omitted.
   Palette: limestone off-white paper, charcoal ink, Twins navy + red and a
   Kasota-limestone gold — accents only. Every populated value appears once. */
window.TARGET = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Target Field",
  name_lines: ["TARGET", "FIELD"],
  city: "Minneapolis",
  state: "Minnesota",
  est: "2010",
  years_active: "2010\u2013Present",
  coordinates: "44.9817\u00b0 N, 93.2772\u00b0 W",
  coordinates_n: "44.9817\u00b0 N",
  coordinates_w: "93.2772\u00b0 W",
  elevation: "830 ft",

  // ---- Metadata ribbon (top of the right page) ----
  team_short: "Minnesota Twins",
  team_abbr: "MIN",
  league: "American League",
  division: "AL Central",
  classification: "Contemporary Mixed-Use",
  visit_order: 38,
  visit_total: 42,
  capacity_opening: "38,544",

  // ---- Stadium Facts (core specification, boxed left column) ----
  facts: [
    ["Opened", "Apr 12, 2010"],
    ["Construction Start", "Aug 30, 2007"],
    ["Architect", "Populous"],
    ["Type", "Open-air, baseball-only"],
    ["Roof", "Open air"],
    ["Surface", "Natural grass", "Four-way Kentucky bluegrass blend"],
    ["Capacity", "38,544 (originally 39,504)"],
    ["Elevation", "830 ft"],
    ["Preceded By", "Metropolitan Stadium\nHubert H. Humphrey Metrodome"]
  ],

  // ---- Construction & Setting (factual right column) ----
  setting: [
    ["Style", "Contemporary urban ballpark", "regional limestone & warehouse-district references"],
    ["Facade", "Kasota limestone, glass & steel"],
    ["Original Cost", "$555 million", "$820 million adjusted"],
    ["Financing", "Public\u2013private", "Hennepin County sales-tax / public funds majority, with Twins / private contribution"],
    ["Renovations", "Scoreboard, club, seating, social-space, concourse, lighting & plaza improvements"],
    ["Location", "Downtown"],
    ["Address", "1 Twins Way", "Minneapolis, MN 55403"]
  ],

  // ---- Field dimensions module ----
  field: {
    left_field: "339",
    center_field: "411",
    right_field: "328",
    orientation: "E",
    degrees: 90
  },

  // ---- Featured visit (38 of 42). First Visit = Featured Visit, so it is
  //      stated once as the game Date; Save is n/a and omitted. ----
  visit: [
    ["Date", "Sun \u00b7 Jul 23, 2023"],
    ["Trip", "Northern Midwest"],
    ["Result", "Twins 5, White Sox 4"],
    ["Attendance", "29,001"],
    ["First Pitch", "1:10 PM CDT"],
    ["Duration", "3:28 \u00b7 12 innings"]
  ],

  // ---- Pitching ----
  pitching: {
    away: "Lucas Giolito",
    away_team: "CWS",
    home: "Bailey Ober",
    home_team: "MIN",
    win: "Emilio Pagan",
    win_team: "MIN",
    loss: "Jesse Scholtens",
    loss_team: "CWS"
  },

  // ---- Weather strip ----
  weather: {
    temperature: "84\u00b0",
    conditions: "Overcast",
    wind: "5 mph NW",
    humidity: "38%"
  },

  // ---- Featured game / line score (12 innings) ----
  box: {
    innings: 12,
    away: { abbr: "CWS", name: "White Sox", byInning: [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0], r: 4, h: 11, e: 0 },
    home: { abbr: "MIN", name: "Twins", byInning: [0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 1], r: 5, h: 13, e: 1 }
  },

  // ---- Stadium context (one unified block — museum wall text) ----
  stadium_context: [
    "Target Field replaced the Metrodome by returning Twins baseball to weather, light, and the city. As was the intent, the Metrodome had solved Minnesota\u2019s climate problem through enclosure, temperature control, and multipurpose efficiency. But it gave baseball a football-shaped interior and an artificial sense of place. Target Field chose the harder path: an outdoor ballpark in Minneapolis, fitted onto a constrained downtown site.",
    "The stadium\u2019s location is central to its success. Rather than seek a broad suburban tract or repeat the dome\u2019s interior certainty, the Twins accepted infrastructure pressure on the western edge of downtown. Rail lines, highways, parking structures, and warehouse-district edges made the site complicated, but those constraints also gave the park its identity. It feels assembled into the city rather than placed on top of it or beyond its borders.",
    "The design bargain was regional as much as architectural. Target Field gained open-air baseball, local limestone materials, downtown access, and a more intimate relationship between game and city. It sacrificed weather certainty, which had been the Metrodome\u2019s central promise. That risk was part of the point. The franchise chose to make Minnesota\u2019s climate visible again, turning cold nights, summer evenings, and urban arrival into part of the baseball experience.",
    "Scoreboard, club, seating, social-space, concourse, lighting, and plaza improvements have kept the park evolving within that compact frame. Target Field matters because it shows contemporary ballpark design using constraint as a strength. It did not simply replace a dome with a prettier building. It reversed the Metrodome\u2019s bargain, deciding that exposure, specificity, and city texture were worth the complications they brought."
  ],

  // ---- Supporting image strip (right page). Per book rule, photo plates carry
  //      NO caption; this text is drop-guidance only (the slot placeholder). ----
  strip: [
    ["target-s1", "Kasota limestone facade"],
    ["target-s2", "View from left field"],
    ["target-s3", "Big board & downtown skyline"],
    ["target-s4", "Main concourse"],
    ["target-s5", "Heritage scoreboard \u2014 Minnie & Paul"],
    ["target-s6", "Warehouse-district edge & rail"]
  ]
};
