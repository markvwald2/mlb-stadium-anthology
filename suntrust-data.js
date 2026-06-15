/* suntrust-data.js — SunTrust Park, Cumberland, Georgia. "The Anchor Tenant."
   SunTrust Park (now Truist Park) is the anchor parcel of The Battery Atlanta —
   a privately master-planned mixed-use district at the I-75 / I-285 edge of
   metro Atlanta. The spread reads the right page as a development site plan:
   the ballpark exists as the organizing element of a larger commercial
   ecosystem, the post-Camden Yards shift from ballpark-as-building to
   ballpark-as-district.

   FACTUAL AUTHORITY: the SunTrust Park Codex brief. The ChatGPT concept image is
   visual direction ONLY — none of its invented values are used: attendance is
   32,377 (not 22,577), the architect is Populous (not "HOK Sport"), elevation is
   1,010 ft (not 1,050), the line score / pitching decisions are the Codex ones,
   and the image's "Quick Facts", developer name, $1.5B total, and groundbreaking
   date are omitted because they are not in the brief. Empty / n/a fields (Save,
   Final Game, Demolition, Succeeded By, Other Visits) are omitted. Every
   populated value renders exactly once. Team navy / scarlet / gold are restrained
   accents only. */
window.SUNTRUST = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "SunTrust Park",
  name_lines: ["SUNTRUST PARK"],
  district: "The Battery Atlanta",
  city: "Cumberland",
  state: "Georgia",
  est: "2017",
  years_active: "2017\u2013Present",
  coordinates: "33.89\u00b0 N, 84.468\u00b0 W",
  coordinates_n: "33.89\u00b0 N",
  coordinates_w: "84.468\u00b0 W",
  elevation: "1,010 ft",

  // ---- Metadata ribbon (top of the right page) ----
  team_short: "Atlanta Braves",
  team_abbr: "ATL",
  league: "National League",
  division: "NL East",
  classification: "Contemporary Mixed-Use",
  status: "Active",
  visit_order: 29,
  visit_total: 42,
  capacity_ribbon: "41,108",
  capacity_note: "41,149 opening",

  // ---- Stadium Facts parcel (the building specification) ----
  facts: [
    ["Opened", "Apr 14, 2017"],
    ["Architect", "Populous"],
    ["Type", "Open-air, baseball-only"],
    ["Roof", "Open air"],
    ["Surface", "Natural grass", "Seashore Paspalum Platinum TE"],
    ["Capacity", "41,108", "41,149 opening"],
    ["Facade", "Red brick masonry, precast stone & steel", "metal seating-bowl canopy"],
    ["Elevation", "1,010 ft"],
    ["Name History", "SunTrust Park (2017\u20132019)\nTruist Park (2020\u2013present)"],
    ["Preceded By", "Atlanta\u2013Fulton County Stadium\nTurner Field"],
    ["Address", "755 Battery Avenue SE", "Atlanta, GA 30339"]
  ],

  // ---- Development & Life Cycle parcel (the economics / lifecycle) ----
  lifecycle: [
    ["Classification", "Contemporary Mixed-Use"],
    ["Status", "Active"],
    ["Setting", "Open-air ballpark integrated with", "mixed-use entertainment district"],
    ["Construction Start", "Sep 16, 2014"],
    ["Opening Day", "Apr 14, 2017"],
    ["Original Cost", "$622 million", "$818 million adjusted"],
    ["Financing", "Public\u2013private partnership", "Cobb County / Cobb-Marietta authority bonds and Cumberland CID support funded part of the stadium; the Braves funded the balance and The Battery development"],
    ["Renovations", "Ongoing technology, hospitality, premium seating & entertainment-district upgrades"],
    ["Location", "Urban / Suburban", "entertainment district"]
  ],

  // ---- Field dimensions instrument ----
  field: {
    left_field: "335",
    center_field: "400",
    right_field: "325",
    orientation: "SE",
    degrees: 145
  },

  // ---- Featured visit (29 of 42). First Visit = Featured Visit, so the date is
  //      stated once. Visit Note "Memorial Day" is a factual note only — no
  //      patriotic theming. Save / Other Visits are n/a and omitted. ----
  visit_headline_note: "Memorial Day",
  visit_headline_date: "Monday, May 28, 2018",
  visit: [
    ["Trip", "Florida / Georgia"],
    ["Matchup", "Mets at Braves"],
    ["First Pitch", "1:13 PM EDT"],
    ["Duration", "3:05 \u00b7 9 innings"]
  ],

  // ---- Pitching ----
  pitching: {
    away: "Jacob deGrom",
    away_team: "NYM",
    home: "Max Fried",
    home_team: "ATL",
    win: "Shane Carle",
    win_team: "ATL",
    loss: "Seth Lugo",
    loss_team: "NYM"
  },

  // ---- Weather strip ----
  weather: {
    temperature: "70\u00b0",
    conditions: "Light Drizzle",
    wind: "15 mph ENE",
    humidity: "93%"
  },

  // ---- Featured game / line score (9 innings) ----
  result: "Braves 4, Mets 3",
  attendance: "32,377",
  box: {
    innings: 9,
    away: { abbr: "NYM", name: "Mets", byInning: [1, 0, 0, 1, 0, 0, 0, 0, 1], r: 3, h: 7, e: 0 },
    home: { abbr: "ATL", name: "Braves", byInning: [0, 0, 0, 0, 0, 0, 1, 1, 2], r: 4, h: 8, e: 1 }
  },

  // ---- Stadium context (one unified block — museum wall text, 4 paragraphs) ----
  stadium_context: [
    "SunTrust Park, now Truist Park, was built because the Braves wanted a different kind of control than Turner Field could offer. Turner Field had been adapted from Olympic infrastructure and remained tied to a city-owned stadium model. The move to Cumberland gave the franchise a baseball-only park integrated with a surrounding commercial district, closer to a large share of its suburban ticket base and more directly connected to year-round development revenue.",
    "The site decision is the story. Instead of doubling down on downtown Atlanta, the Braves moved to an edge-city setting near the regional highway network, where the ballpark and mixed-use district could be planned together. That choice made the stadium less a standalone civic venue and more a real-estate platform. Baseball became the anchor for restaurants, offices, hospitality, structured parking, and controlled pedestrian activity.",
    "The design bargain was powerful but revealing. The Braves gained a contemporary park with retro-classic cues and a surrounding entertainment district that could generate value beyond eighty-one home games. They also accepted a more privatized, managed form of urbanism, where the stadium experience is carefully concentrated around the commercial edges of the development. Ongoing technology, hospitality, premium seating, and district upgrades are part of the same logic.",
    "SunTrust Park matters because it shows where the post-Camden Yards movement went once the ballpark itself was no longer enough. The question was not only how to design a good venue, but how to own and monetize the land around it. In the anthology, it marks a shift from ballpark-as-building to ballpark-as-district."
  ]
};
