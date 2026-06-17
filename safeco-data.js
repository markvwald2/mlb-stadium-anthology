/* Safeco Field — Seattle, Washington.
   "Shelter Without Walls." The controlling idea is the retractable canopy as a
   civic roof: the page architecture reads as a sequence of roof bays beneath an
   exposed-steel truss framework. LEFT page = full-bleed elevated hero of the
   canopy over the field and the SoDo rail corridor; RIGHT page = warm paper
   organized as roof bays — a top photo strip, an identity track, a stadium data
   shelf, a unified Stadium Context, and a compact Visit scorecard band.
   Factual authority: the supplied Codex brief ONLY. Empty / n-a fields omitted;
   nothing invented. Palette: warm off-white paper, charcoal type, restrained
   Northwest Green + Navy + Silver/steel accents. */
window.SAFECO = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Safeco Field",
  name_lines: ["SAFECO", "FIELD"],
  city: "Seattle",
  state: "Washington",
  est: "1999",
  league: "American League",
  division: "AL West",
  roof: "Retractable canopy roof",
  coordinates: "47.591\u00b0 N, 122.333\u00b0 W",
  coord_lines: ["47.591\u00b0 N", "122.333\u00b0 W"],
  elevation: "20 ft",
  address: "1250 1st Avenue S, Seattle, WA 98134",
  years_active: "1999\u2013Present",
  visit_order: 22,

  // ---- Identity / classification ribbon (the main canopy track) ----
  identity: [
    ["Team", "Seattle Mariners"],
    ["League", "American League"],
    ["Division", "AL West"],
    ["Classification", "Retro-Classic Renaissance"],
    ["Years Active", "1999\u2013Present"],
    ["Visit Order", "22"],
    ["Coordinates", "47.591\u00b0N \u00b7 122.333\u00b0W"],
    ["Opening Capacity", "47,116"]
  ],

  // ---- Stadium facts (museum-style tabular, single-line) ----
  facts: [
    ["Opened", "July 15, 1999"],
    ["Surface", "Natural grass \u2014 bluegrass / rye"],
    ["Architect", "NBBJ & 360 Architecture"],
    ["Stadium Type", "Open-air, retractable umbrella roof"],
    ["Roof", "Retractable canopy (not enclosed)"],
    ["Facade", "Brick & exposed steel; steel canopy"],
    ["Capacity (Current)", "47,943"],
    ["Preceded By", "Kingdome"],
    ["Address", "1250 1st Ave S, Seattle, WA 98134"]
  ],

  // ---- Construction / lifecycle ----
  lifecycle: [
    ["Construction Start", "Mar 8, 1997"],
    ["Opened", "Jul 15, 1999"],
    ["Cost", "$517 million ($1 billion adjusted)"],
    ["Financing", "Public-private; WA State & King County tax-backed bonds (majority) + Mariners / private"]
  ],

  // ---- Name history + renovations callouts (lifecycle bay) ----
  name_history: "Safeco Field (1999\u20132018)  \u2192  T-Mobile Park (2019\u2013present)",
  renovations: "2019 rename; roof, scoreboard, seating, club & hospitality upgrades; outfield fences moved in before the 2013 season.",

  // ---- Setting / classification tags (roof-bay tags) ----
  tags: ["Urban / Industrial-Edge", "Downtown-Edge", "Rail-Adjacent"],
  classification_line: "Retro-Classic Renaissance \u00b7 Weather-Protection Engineering",

  // ---- Field dimensions module (the small surveying instrument) ----
  field: {
    left_field: "331",
    center_field: "401",
    right_field: "326",
    orientation: "NE",
    degrees: 49
  },

  // ---- Featured visit / game ----
  visit_matchup: "Boston Red Sox at Seattle Mariners",
  visit_result: "Mariners 10, Red Sox 5",
  visit_day: "Friday",
  visit_date: "Aug 15, 2003",
  visit_trip: "Seattle",
  first_pitch: "7:05 PM PDT",
  game_duration: "3:28",
  game_type: "Night",
  attendance: "46,171",
  conditions: "Open-air natural-grass ballpark with retractable canopy",

  // visit facts (compact stack — values not duplicated in the line-score caption)
  visit_facts: [
    ["Visit Order", "22"],
    ["Date", "Friday \u00b7 Aug 15, 2003"],
    ["Trip", "Seattle"],
    ["Game Type", "Night"]
  ],

  // ---- Pitching decisions ----
  pitching: {
    away_team: "BOS",
    away_starter: "Jeff Suppan",
    home_team: "SEA",
    home_starter: "Jamie Moyer",
    win: "Julio Mateo",
    loss: "Mike Timlin",
    save: "Shigetoshi Hasegawa"
  },

  // ---- Featured game / line score (the scorecard band) ----
  box: {
    innings: 9,
    away: { abbr: "BOS", name: "Red Sox", byInning: [0, 0, 0, 1, 1, 2, 0, 1, 0], r: 5, h: 8, e: 1 },
    home: { abbr: "SEA", name: "Mariners", byInning: [0, 2, 1, 1, 0, 4, 0, 2, "x"], r: 10, h: 13, e: 0 }
  },

  // ---- Stadium context (ONE unified body — museum wall text, paragraph breaks intact) ----
  stadium_context: [
    "Safeco Field belongs to the stadium history of Seattle because it was built to solve a specific civic and baseball problem: to replace the Kingdome with a baseball-specific venue that kept Seattle\u2019s game outdoors while protecting against persistent rain. Its placement and ownership model reflected the Pacific Northwest\u2019s climate, the Mariners\u2019 post-1995 popularity, and the late-1990s demand for modern revenue spaces, making the ballpark a product of its metropolitan moment rather than simply a neutral venue for games. The building\u2019s identity is therefore inseparable from the economics, transportation assumptions, and expansion logic that shaped its commission.",
    "Architecturally, the park is best understood through industrial retro ballpark with engineered weather protection. Its seating geometry, exterior language, and circulation patterns expressed brick, exposed steel, retractable canopy, real grass, and views toward the city, rail yards, port, and mountains. Those choices positioned the stadium within the Retro-Classic Renaissance of MLB design, when clubs and cities were negotiating new expectations for capacity, television, premium inventory, civic image, and the increasingly managed experience of spectatorship.",
    "Updates have modernized hospitality, technology, and fan movement while preserving the unusual roof concept: shelter without a sealed dome. The changes did more than update finishes or add amenities. They altered how the stadium performed as a business asset, how it framed the field, and how it translated baseball into a broader entertainment product. In that sense, the building records not only one architectural idea but several layers of baseball economics pressed into the same site.",
    "The stadium\u2019s importance is clearest when measured against the parks that came before and after it. It corrected the Kingdome\u2019s enclosed multipurpose experience without abandoning Seattle\u2019s weather reality. It can read as typical, transitional, or influential depending on which layer is being examined, but it consistently reveals how MLB venues respond to larger pressures: regional growth, public finance, media presentation, team branding, and the search for a more profitable game-day environment.",
    "For a stadium anthology, Safeco Field is useful because it resists a single category. It shows how regional climate can produce a distinct version of the retro ballpark rather than a generic downtown template. Its value lies in the way the building makes baseball\u2019s design priorities visible: where the sport wanted to be located, what kind of public it imagined, and how the architecture of watching baseball changed across decades.",
    "Safeco Field\u2019s setting is defined by Seattle\u2019s SoDo district, between downtown, rail yards, port infrastructure, highways, and the Seahawks\u2019 stadium. The surrounding geography matters because it determines how the ballpark is approached, how it is photographed, and how strongly it participates in the daily urban fabric beyond game days.",
    "The park is embedded in an industrial and event-district landscape rather than a traditional retail neighborhood. In planning terms, the site reveals the relationship between baseball and infrastructure: highways, rail lines, parking fields, transit nodes, waterfronts, downtown blocks, or redevelopment districts become part of the stadium experience as much as the seating bowl itself.",
    "Light rail, commuter rail, ferries, garages, and highway approaches all shape the approach, with crowd movement braided through working infrastructure. The result is a ballpark environment whose character comes from more than architecture. Arrival sequences, edge conditions, views, climate, and land-use patterns all shape how the stadium sits in memory and how it fits into the wider history of MLB place-making."
  ],

  // ---- Supporting photography (roof bays — structural observations) ----
  // each: [slot id, drop guidance]
  panels: [
    ["safeco-p1", "Exterior \u00b7 brick facade & exposed steel"],
    ["safeco-p2", "Retractable canopy roof structure"],
    ["safeco-p3", "Seating bowl & the field"],
    ["safeco-p4", "Concourse steelwork"],
    ["safeco-p5", "Safeco-era / construction archival image"]
  ]
};
