/* Sutter Health Park — West Sacramento, California.
   "The Temporary Span." Interim riverfront warehouse ballpark, temporary MLB
   home of the Athletics. Authoritative Codex packet only — no invented facts,
   no values pulled from the concept image. Warm paper + charcoal + masonry
   red-brown, with controlled Tower Bridge yellow as structural accent and A's
   green as a restrained supporting accent. */
window.SUTTER = {
  // ---- Identity (hero title plate, left page) ----
  stadium_name: "Sutter Health Park",
  city: "West Sacramento",
  state: "California",
  classification_era: "Retro Classic",
  status: "Active \u00b7 temporary MLB",
  opened_mlb: "2025",

  // ---- Hero metadata footer (left page) ----
  address: "400 Ballpark Drive, West Sacramento, CA 95691",
  elevation: "25 ft",
  coordinates_n: "38.5804\u00b0 N",
  coordinates_w: "121.5138\u00b0 W",

  // ---- Right-page identity line ----
  team_name: "A\u2019s",
  league: "American League",
  division: "AL West",
  visit_order: 41,
  visit_total: 42,

  // ---- Bay 1 \u2014 Stadium Facts (dense engineered table) ----
  facts: [
    ["Team", "A\u2019s"],
    ["League", "American League"],
    ["Division", "AL West"],
    ["Status", "Active \u00b7 temporary MLB"],
    ["MLB Use", "2025\u2013present"],
    ["Capacity", "14,000 \u2192 14,014"],
    ["Surface", "Natural grass \u00b7 Bermuda / rye blend"],
    ["Architect", "HOK Sport"],
    ["Era", "Retro Classic"],
    ["Facade", "Concrete masonry units \u00b7 red brick block + trim"],
    ["Roof", "Open Air"],
    ["Type", "Open-air MiLB park adapted for temporary MLB"],
    ["Renovations", "2025 temp. MLB upgrades \u2014 clubhouse, lighting, broadcast, dugout, training, seating"],
    ["Names", "Raley Field (2000\u201319)\nSutter Health Park (2020\u2013present)"],
    ["Opening Day", "May 15, 2000"],
    ["Construction", "Started Oct 28, 1999"],
    ["Preceded By", "Oakland Coliseum"],
    ["Cost", "$46.5M \u00b7 $86.9M adj."],
    ["Financing", "River City Regional Stadium Financing Authority \u2014 public-authority bonds, stadium / private revenue"]
  ],

  // ---- Field geometry (engineering protractor, embedded in Bay 1) ----
  field: {
    left_field: "330 ft",
    center_field: "403 ft",
    right_field: "325 ft",
    orientation: "NE",
    orientation_degrees: 46
  },

  // ---- Bay 2 \u2014 Stadium Context (one unified body, 4 paragraphs, verbatim) ----
  context: [
    "Sutter Health Park is unusual because its MLB significance arrived after the building already had a different life. It was not conceived as a major-league monument, a downtown franchise anchor, or a permanent answer to a club\u2019s long-term stadium needs. It was a retro-classic minor-league park on West Sacramento\u2019s riverfront edge, later adapted for the Athletics\u2019 temporary MLB use beginning in 2025 after the club left Oakland Coliseum and before a permanent Las Vegas facility.",
    "That makes its context less about architectural ambition than baseball\u2019s unsettled geography. Most stadium pages in this anthology describe a city building toward permanence: replacing an obsolete park, securing a franchise, or reshaping a district around a long-term home. Sutter Health Park tells a different story. It reflects a moment when temporary tenancy, broadcast requirements, player facilities, and political transition became part of the MLB stadium record. The building had to be upgraded quickly with clubhouse, lighting, broadcast, dugout, training, and seating modifications because it was being asked to operate above its original scale.",
    "Its riverfront and urban-edge setting also gives the arrangement a different character from the Oakland Coliseum it followed. The Athletics moved from a large multipurpose predecessor into a smaller park with masonry warehouse-district cues and a more intimate open-air frame. That shift was not the result of a normal replacement cycle in which a franchise graduates into a richer permanent building. It was a stopgap, and the architecture reads that way: appealing in scale, useful in the short term, but not designed to carry the full symbolic burden of a settled MLB home.",
    "Sutter Health Park matters because it expands the definition of a major-league stadium page. It shows that MLB history is not only made by grand openings and demolitions. Sometimes it is made by interim arrangements, adapted buildings, and the awkward spaces between one civic compact and the next."
  ],

  // ---- Bay 3 \u2014 Visit / featured game ----
  featured_title: "Group Visit",
  trip_name: "Northern California",
  featured_day: "Friday",
  featured_date: "Jul 11, 2025",
  away_team: "Toronto Blue Jays",
  away_abbr: "TOR",
  home_team: "Oakland Athletics",
  home_abbr: "OAK",
  result_line: "Blue Jays 7, Athletics 6",
  attendance: "7,950",
  first_pitch: "7:05 PM PDT",
  game_duration: "3:01",
  starter_away: "Max Scherzer",
  starter_home: "Luis Severino",
  winning_pitcher: "Max Scherzer",
  losing_pitcher: "Luis Severino",

  // ---- Line score ----
  box: {
    innings: 9,
    away: { abbr: "TOR", byInning: [0, 0, 0, 1, 6, 0, 0, 0, 0], r: 7, h: 12, e: 0 },
    home: { abbr: "OAK", byInning: [0, 0, 0, 0, 0, 3, 0, 0, 3], r: 6, h: 10, e: 1 }
  },

  // ---- Weather strip ----
  weather: {
    temperature: "96\u00b0",
    conditions: "Sunny",
    wind: "10 MPH SW",
    humidity: "33%"
  }
};
