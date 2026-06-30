/* Oracle Park — San Francisco, California.
   "The Bay as Architecture." Local data only; every structured value appears
   exactly once in the layout. Warm charcoal + warm off-white paper +
   faded Giants orange / bay blue-green accents. No invented facts. */
window.ORACLE = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Oracle Park",
  city: "San Francisco",
  state: "California",
  classification_era: "Retro Classic",
  years_active: "2000\u2013Present",
  status: "Active",

  // ---- Identity line (right page, under section header) ----
  team_name: "San Francisco Giants",
  team_abbr: "SF",
  league: "National League",
  league_abbr: "NL",
  division: "NL West",
  visit_order: 42,
  visit_total: 42,
  coordinates_n: "37.7786\u00b0 N",
  coordinates_w: "122.3892\u00b0 W",

  // ---- Stadium facts (museum specification sheet) ----
  facts: [
    ["Opened", "April 11, 2000"],
    ["Years Active", "2000\u2013present"],
    ["Renovations", "Scoreboard, seating, concession, center-field, and waterfront-edge upgrades"],
    ["Capacity", "42,000 \u00b7 originally 41,503"],
    ["Surface", "Natural grass (Tifway 419 bermudagrass)"],
    ["Architect", "HOK Sport"],
    ["Type", "Open-air baseball-only waterfront ballpark"],
    ["Roof", "Open Air"],
    ["Names", "Pacific Bell Park (2000\u20132003)\nSBC Park (2004\u20132005)\nAT&T Park (2006\u20132018)\nOracle Park (2019\u2013present)"],
    ["Location Type", "Waterfront; Urban"],
    ["Preceded By", "Seals Stadium (1958\u201359)\nCandlestick Park (1960\u20131999)"]
  ],

  // ---- Classification chips ----
  chips: [
    ["Era", "Retro Classic"],
    ["Status", "Active"],
    ["Roof", "Open Air"],
    ["Location", "Waterfront/Urban"]
  ],

  // ---- Field geometry module ----
  field: {
    left_field: "339 ft",
    center_field: "391 ft",
    right_field: "365 ft",
    orientation: "E",
    orientation_degrees: 85
  },

  // ---- Address / colophon (left page metadata) ----
  address: "24 Willie Mays Plaza, San Francisco, CA 94107",
  elevation: "10 ft",

  // ---- Construction & finance (Ballpark Notes band) ----
  architectural_style: "Retro-classic urban waterfront ballpark",
  facade_material: "Red brick masonry with exposed steel framing and glass waterfront elements",
  construction_start: "Dec 11, 1997",
  stadium_cost: "$357 million",
  stadium_cost_adjusted: "$667M",
  financing_method: "Primarily privately financed by the Giants, with limited public infrastructure and land/site support",

  // ---- Stadium context (museum wall text — one unified body, 4 paragraphs) ----
  context: [
    "Oracle Park replaced Candlestick Park by changing the Giants\u2019 relationship to San Francisco. Candlestick had been cold, windswept, football-shared, and geographically awkward for baseball, even though it carried decades of franchise history. The new waterfront park gave the Giants a baseball-only home designed around the city rather than merely located within it.",
    "The picturesque site along the San Francisco Bay was the decisive move. Instead of another large multipurpose venue at the edge of the city, the Giants built an urban waterfront ballpark where the setting became part of the game. Brick, steel, open-air seating, and compact geometry worked with water, city views, and pedestrian arrival to produce an identity that Candlestick could not offer. The park made geography feel like architecture.",
    "The design bargain favored specificity over flexibility. Oracle Park gained intimacy, sightlines, waterfront drama, local material cues, and a strong civic image. It sacrificed the broader multipurpose utility that had defined Candlestick Park, but that sacrifice was the point. The Giants needed a home intentionally shaped for baseball and for San Francisco\u2019s visual aesthetic, not just a stadium that could treat baseball as one use among several.",
    "Improvements to the scoreboard, premium seating, concession areas, center-field pavilion, and waterfront-edge pedestrian access have kept the park current without changing the basic relationship between the field and The Bay. Oracle Park matters because it shows the retro-classic movement at its most site-dependent. It is not only a baseball replacement for a generic multipurpose predecessor; it is a park whose success depends on the precision of where it sits and the geographic features nearby. In this anthology, it stands as one of the clearest examples of location becoming the stadium\u2019s central design material."
  ],

  // ---- Visit section / featured game ----
  featured_title: "Group Visit",
  trip_name: "Northern California trip",
  featured_day: "Saturday",
  featured_date: "Jul 12, 2025",
  visit_count: "1",
  away_team: "Los Angeles Dodgers",
  away_abbr: "LAD",
  home_team: "San Francisco Giants",
  home_abbr: "SF",
  result_line: "Dodgers 2, Giants 1",
  attendance: "41,029",
  first_pitch: "1:05 PM PDT",
  game_duration: "2:11",
  starter_away: "Shohei Ohtani",
  starter_home: "Landen Roupp",
  winning_pitcher: "Emmet Sheehan",
  losing_pitcher: "Landen Roupp",
  save_pitcher: "Tanner Scott",

  // ---- Line score (vintage newspaper grid) ----
  box: {
    innings: 9,
    away: { abbr: "LAD", byInning: [0, 1, 0, 0, 0, 1, 0, 0, 0], r: 2, h: 8, e: 0 },
    home: { abbr: "SF", byInning: [0, 0, 0, 0, 0, 0, 0, 1, 0], r: 1, h: 3, e: 1 }
  },

  // ---- Weather module ----
  weather: {
    temperature: "64\u00b0",
    conditions: "Partly Cloudy",
    wind: "12 MPH WSW",
    humidity: "70%"
  }
};
