/* Globe Life Field — Arlington, Texas. Home of the Texas Rangers.
   "The Enormous Room" — baseball at the bottom of a vast climate-controlled
   interior volume. Architecture of enclosure, roof structure, glass walls and
   interior scale drives every decision; the game is secondary.

   FACTUAL AUTHORITY: the supplied Codex payload ONLY. No invented, normalized,
   web-sourced or memory facts. Empty / n/a fields are omitted. Concept render is
   visual direction only — no text/numbers copied from it. Every populated value
   appears exactly once across the layout. */
window.GLOBE = {
  // ---- Identity (left-page signage block) ----
  stadium_name: "Globe Life Field",
  name_lines: ["GLOBE", "LIFE", "FIELD"],
  city: "Arlington",
  state: "Texas",
  era: "Contemporary Mixed-Use Era",
  years_active: "2020\u2013Present",
  bearing_cue: "NNE \u00b7 30\u00b0",

  // ---- Metadata ribbon (clerestory band) — each value shown ONCE, here only ----
  ribbon: [
    ["Team", "Texas Rangers"],
    ["League", "American League"],
    ["Stadium Classification", "Ballpark District"],
    ["Years Active", "2020\u2013Present"],
    ["Visit Number", "36 of 42"],
    ["Status", "Active"],
    ["Capacity", "40,300"]
  ],

  // ---- Stadium facts, organized as the architecture of the enclosure ----
  // (Ribbon already carries Team, League, Classification, Years Active, Status,
  //  Opening Capacity. Capacity is restated in the Structure bay as the full
  //  spec value, matching the Chase spread pattern.)
  bays: [
    { cat: "Architecture", rows: [
      ["Architect", "HKS"],
      ["Facade", "Brick, limestone / precast concrete, steel, glass & ETFE roof elements"],
      ["Style", "Contemporary retractable-roof ballpark with mixed-use district transparency"]
    ]},
    { cat: "Cost", rows: [
      ["Original", "$1.1 Billion"],
      ["Adjusted", "$1.37 Billion"],
      ["Financing", "Public-private; Arlington voter-approved bonds / taxes up to $500M, Rangers funded the balance"]
    ]},
    { cat: "Structure", rows: [
      ["Roof", "Retractable"],
      ["Type", "Retractable-roof baseball-only ballpark", { ls: "-0.3px" }],
      ["Surface", "Artificial turf (Shaw Sports Turf B1K)"],
      ["Capacity", "40,300"]
    ]},
    { cat: "Site", rows: [
      ["Address", "734 Stadium Drive\nArlington, Texas 76011"],
      ["Location", "Urban; Suburban"],
      ["Elevation", "550 ft"],
      ["Coordinates", "32.7475\u00b0 N, 97.0842\u00b0 W"]
    ]},
    { cat: "Lifecycle", rows: [
      ["Construction Start", "Sep 28, 2017"],
      ["Opened", "Jul 24, 2020"],
      ["All-Star Game", "2024"],
      ["Preceded By", "Arlington Stadium (1972\u20131993)\nThe Ballpark in Arlington (1994\u20132019)"]
    ]}
  ],

  // ---- Field geometry (subordinate protractor) ----
  field: {
    left_field: "329",
    center_field: "407",
    right_field: "326",
    orientation: "NNE",
    degrees: 30
  },

  // ---- Supporting photography (enclosure / transparency / structure / scale).
  //      NO captions per house rule — placeholder is drop guidance only. ----
  glasswall: [
    ["globe-encl-1", "Interior bowl & roof volume \u2014 high vantage, truss spans overhead", "images/globe/encl-1.jpg"],
    ["globe-encl-2", "On-field celebration / event scale \u2014 horizontal group shot", "images/globe/encl-2.jpg"],
    ["globe-encl-3", "Retractable roof machinery / overhead steel structure", "images/globe/encl-3.jpg"],
    ["globe-encl-4", "Concourse transparency / interior scale", "images/globe/hero.jpg"]
  ],

  // ---- The Visit (scorekeeper insert) ----
  visit: {
    no: "36",
    total: "42",
    title: "Group Visit",
    trip: "Texas",
    day: "Monday",
    date: "Sep 13, 2021",
    away_team: "Houston Astros",
    home_team: "Texas Rangers",
    away_abbr: "HOU",
    home_abbr: "TEX",
    result: "Astros 15, Rangers 1",
    attendance: "18,903",
    first_pitch: "7:05 PM CDT",
    duration: "3:53",
    home_starter: "Spencer Howard",
    away_starter: "Jake Odorizzi",
    winning_pitcher: "Cristian Javier",
    losing_pitcher: "Spencer Howard"
  },

  // ---- Weather / conditions ----
  weather: {
    temperature: "84\u00b0",
    conditions: "Mostly Clear",
    wind: "5 MPH ESE",
    humidity: "60%"
  },

  // ---- Line score (nine-inning) ----
  box: {
    innings: 9,
    away: { abbr: "HOU", name: "Astros", byInning: [3, 4, 2, 0, 0, 4, 1, 1, 0], r: 15, h: 16, e: 0 },
    home: { abbr: "TEX", name: "Rangers", byInning: [0, 0, 1, 0, 0, 0, 0, 0, 0], r: 1, h: 9, e: 0 }
  },

  // ---- Stadium Context (ONE unified block, paragraph breaks preserved) ----
  stadium_context: [
    "Globe Life Field replaced a relatively young ballpark because comfort and event control had become more valuable than open-air tradition in North Texas. The Ballpark in Arlington had given the Rangers a retro-classic outdoor home, but heat, revenue demands, and the growth of the surrounding entertainment district pushed the franchise toward a new retractable-roof building. This was not the usual story of an obsolete old stadium. It was replacement driven by climate, business model, and district strategy.",
    "The Arlington site remained central. The Rangers did not abandon their suburban sports-and-entertainment geography; they intensified it. Globe Life Field joined a mixed-use district where baseball, football, parking, hospitality, and year-round events could reinforce one another. The stadium\u2019s transparency and contemporary roofed form fit that newer model of controlled regional entertainment.",
    "The design bargain is direct. Globe Life Field gains climate reliability, premium inventory, event-hosting flexibility, and comfort in a market where summer weather can directly shape attendance and experience. It sacrifices the open-air romance and architectural distinctiveness of its predecessor. The building is less about recreating old ballpark texture than about making baseball viable long-term inside a larger commercial and climatic system.",
    "Because it only opened in 2020, its meaning is still forming, but ongoing technology, premium seating, hospitality, and event-hosting updates already point to its role. Globe Life Field matters because it shows that the retro-classic wave was not the end of stadium evolution. In some markets, the next correction was not more nostalgia or more urbanism, but more control: roof, climate, district, and revenue all under one contemporary shell."
  ]
};
