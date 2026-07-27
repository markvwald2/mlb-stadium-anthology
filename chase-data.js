/* Chase Field — Phoenix, Arizona.
   "The Environmental Machine" — a desert climate-control machine that happens
   to contain a baseball field. Content transcribed from the approved Chase
   Field reference spread. Local data only; every structured value appears
   exactly once in the layout. Warm off-white + charcoal + Sedona red accent. */
window.CHASE = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Chase Field",
  city: "Phoenix",
  state: "Arizona",
  est: "1998",
  classification_era: "Retro Classic",
  years_active: "1998\u2013Present",
  roof: "Retractable Roof",
  location_type: "Downtown",

  // ---- Stadium identity ribbon ----
  team_short: "Diamondbacks",
  team_name: "Arizona Diamondbacks",
  league: "National League",
  division: "NL West",
  classification_ribbon: "Retro Classic",
  status: "Active",
  visit_order: 39,
  visit_total: 42,
  coordinates: "33.4453\u00b0 N, 112.0669\u00b0 W",
  coordinates_n: "33.4453\u00b0 N",
  coordinates_w: "112.0669\u00b0 W",
  capacity_opening: "48,500",
  capacity_current: "48,330",

  // ---- Stadium facts (engineering specification sheet) ----
  facts: [
    ["Opened", "March 31, 1998"],
    ["Status", "Active"],
    ["Construction Start", "Nov 16, 1995"],
    ["Capacity (Opening)", "48,500"],
    ["All-Star Game", "2011"],
    ["Surface", "Mixed / changed over time", "(DeAnza zoysia blend 1998, Bull\u2019s Eye Bermuda 1999\u20132018; Shaw Sports Turf B1K since 2019)"],
    ["Renovations", "Center-field and seating changes, synthetic turf conversion, scoreboard and premium-area upgrades, pool and hospitality updates"],
    ["Architect", "Ellerbe Becket, with Bill Johnson Design"],
    ["Architectural Style", "Retro-modern retractable-roof ballpark with industrial warehouse-scale massing"],
    ["Type", "Retractable-roof baseball-only park"],
    ["Roof", "Retractable"],
    ["Facade", "Steel frame with concrete, gray metal panels, glass, and an operable retractable-roof enclosure"],
    ["Previous Name", "Bank One Ballpark (1998\u20132005)"],
    ["Location", "Downtown"],
    ["Elevation", "1,085 ft"],
    ["Coordinates", "33.4453\u00b0 N, 112.0669\u00b0 W"],
    ["Address", "401 E Jefferson Street\nPhoenix, AZ 85004"],
    ["Cost", "$354 million ($699 million adj.)"],
    ["Financing", "Public-private; Maricopa County sales-tax / public bonds funded the majority, with a Diamondbacks / private contribution"]
  ],

  // ---- Field geometry module ----
  field: {
    left_field: "330 FT",
    center_field: "407",
    right_field: "334 FT",
    orientation: "N"
  },

  // ---- Visit information (40 of 42) ----
  visit: [
    ["First Visit", "Apr 29, 2024"],
    ["Game", "LAD at ARI"],
    ["Result", "Dodgers 8, Diamondbacks 4"],
    ["Attendance", "36,985"],
    ["Start Time", "6:40 PM MST"]
  ],

  // ---- Weather module ----
  weather: {
    temperature: "89\u00b0",
    conditions: "Clear",
    wind: "5 MPH SE",
    humidity: "10%"
  },

  // ---- First visit game / line score ----
  game_day: "Mon",
  game_date: "Apr 29, 2024",
  game_duration: "2:50",
  box: {
    innings: 9,
    away: { abbr: "LAD", byInning: [0, 2, 0, 0, 4, 1, 0, 1, 0], r: 8, h: 10, e: 0 },
    home: { abbr: "ARI", byInning: [1, 0, 0, 0, 3, 0, 0, 0, 0], r: 4, h: 7, e: 0 }
  },
  winning_pitcher: "James Paxton",
  winning_team: "LAD",
  losing_pitcher: "Tommy Henry",
  losing_team: "ARI",
  save_pitcher: "\u2014",

  // ---- Stadium context (museum wall text) ----
  stadium_context: [
    "Chase Field was built to launch major-league baseball in Phoenix with a building that could survive the desert. Unlike many parks in the anthology, it did not replace a long MLB lineage. It created one, giving the Diamondbacks an expansion home with a retractable roof, downtown scale, and the environmental control required for summer baseball in Arizona.",
    "The downtown site gave the new franchise immediate civic visibility. Phoenix could have treated climate control as a reason to isolate the ballpark, but Chase Field was placed near the city\u2019s central event infrastructure. Its retro-modern, warehouse-scale massing gave the building a large civic presence, while the roof made clear that baseball here would depend on engineering as much as tradition.",
    "The design bargain was unavoidable. The Diamondbacks gained a viable summer venue, shade, cooling, hospitality spaces, and a downtown home. They also accepted the challenge of making a huge retractable-roof building feel like a ballpark rather than an indoor event shed. The pool and other distinctive hospitality features reflected the expansion-era appetite for spectacle and regional branding.",
    "Later center-field changes, seating updates, synthetic turf conversion, scoreboard and premium-area upgrades, and continued work around the building show a park still adjusting to its own scale and climate. Chase Field matters because it demonstrates how expansion baseball in the late 1990s had to be regional, technical, and marketable all at once. In Phoenix, MLB did not adapt an old ballpark idea; it built an environmental machine and then kept revising it into a more usable baseball home."
  ],

  // ---- Supporting image strip (right page) ----
  strip: [
    ["chase-s1", "the visit", "images/chase/chase-field-03.jpg"],
    ["chase-s2", "the pool", "images/chase/chase-field-02.jpg"],
    ["chase-s3", "dinner over the field", "images/chase/chase-field-04.jpg"],
    ["chase-s4", "aerial", "images/chase/chase-field-05-b7e05840.jpg"]
  ],

  // ---- Color system (styling tokens; surfaced once as a swatch key if needed) ----
  colors: {
    paper: { name: "Sonoran Sand", hex: "#EFE7D6" },
    ink: { name: "Charcoal", hex: "#211E1A" },
    sedona: { name: "Sedona Red", hex: "#A3392B" }
  }
};
