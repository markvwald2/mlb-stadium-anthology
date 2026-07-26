/* T-Mobile Park — Seattle, Washington.
   "Shelter Without Walls." The controlling idea is the retractable canopy as a
   civic roof: the page architecture reads as a sequence of roof bays beneath an
   exposed-steel truss framework. LEFT page = full-bleed elevated hero of the
   canopy over the field and the SoDo rail corridor; RIGHT page = warm paper
   organized as roof bays — a top photo strip, an identity track, a stadium data
   shelf, a unified Stadium Context, and a compact Visit scorecard band.
   Factual authority: the supplied Codex brief ONLY. Empty / n-a fields omitted;
   nothing invented. Palette: warm off-white paper, charcoal type, restrained
   Northwest Green + Navy + Silver/steel accents. */
window.TMOBILE = {
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
    ["Classification", "Retro Classic"],
    ["Years Active", "1999\u2013Present"],
    ["Visit Order", "22"],
    ["Coordinates", "47.591\u00b0N \u00b7 122.333\u00b0W"],
    ["Opening Capacity", "46,621"]
  ],

  // ---- Stadium facts (museum-style tabular, single-line) ----
  facts: [
    ["Opened", "July 15, 1999"],
    ["Surface", "Natural grass \u2014 bluegrass / rye"],
    ["Architect", "NBBJ & 360 Architecture"],
    ["Stadium Type", "Open-air, retractable umbrella roof"],
    ["Roof", "Retractable canopy (not enclosed)"],
    ["Facade", "Brick & exposed steel; steel canopy"],
    ["CAPACITY", "47,368"],
    ["Preceded By", "Kingdome"],
    ["Address", "1250 1st Ave S, Seattle, WA 98134"]
  ],

  // ---- Construction / lifecycle ----
  lifecycle: [
    ["GROUNDBREAKING", "Mar 8, 1997"],
    ["Opened", "Jul 15, 1999"],
    ["Cost", "$517 million ($1 billion adjusted)"],
    ["Financing", "Public-private; WA State & King County tax-backed bonds (majority) plus Mariners and private"]
  ],

  // ---- Name history + renovations callouts (lifecycle bay) ----
  name_history: "Safeco Field (1999\u20132018)  \u2192  T-Mobile Park (2019\u2013present)",
  renovations: "2019 rename; roof, scoreboard, seating, club & hospitality upgrades; outfield fences moved in before the 2013 season.",

  // ---- Setting / classification tags (roof-bay tags) ----
  tags: ["Urban / Industrial-Edge", "Downtown-Edge", "Rail-Adjacent", "Brick & Steel", "Open-Air"],
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
  visit_result: "MARINERS 4, RED SOX 3",
  visit_day: "Friday",
  visit_date: "Aug 15, 2002",
  visit_trip: "Seattle",
  first_pitch: "7:05 PM PDT",
  game_duration: "3:12",
  attendance: "46,171",
  conditions: "Open-air natural-grass ballpark with retractable canopy",

  // visit facts (compact stack — values not duplicated in the line-score caption)
  visit_facts: [
    ["Visit Order", "22"],
    ["Date", "Friday \u00b7 Aug 15, 2002"],
    ["Weather", "83\u00b0 \u00b7 Clear"],
    ["Wind / Hum.", "6 mph NW \u00b7 43%"]
  ],

  // ---- Pitching decisions ----
  pitching: {
    away_team: "BOS",
    away_starter: "Casey Fossum",
    home_team: "SEA",
    home_starter: "Freddy Garcia",
    win: "Freddy Garcia",
    loss: "Casey Fossum",
    save: "Kazuhiro Sasaki"
  },

  // ---- Featured game / line score (the scorecard band) ----
  box: {
    innings: 9,
    away: { abbr: "BOS", name: "Red Sox", byInning: [0, 0, 1, 0, 0, 2, 0, 0, 0], r: 3, h: 10, e: 1 },
    home: { abbr: "SEA", name: "Mariners", byInning: [0, 0, 0, 4, 0, 0, 0, 0, "x"], r: 4, h: 8, e: 0 }
  },

  // ---- Stadium context (ONE unified body — museum wall text, paragraph breaks intact) ----
  stadium_context: [
    "Safeco Field replaced the Kingdome by correcting the central contradiction of Seattle baseball: the city needed weather protection, but the Mariners needed a place that felt less like baseball inside a sealed multipurpose container. The Kingdome had provided cover and capacity, yet its fixed-dome form belonged to an era when flexibility often mattered more than texture. Safeco Field kept protection while reopening the game to air, views, and district character.",
    "The site on the downtown industrial edge gave the new ballpark a vocabulary the Kingdome lacked. Brick, exposed steel trusses, and the massive retractable canopy connected the building to a warehouse-district setting without trapping it in a nostalgic costume. The roof was not meant to create an indoor stadium so much as an umbrella over an open-air park. That distinction shaped the entire identity of the building.",
    "The design bargain was finely calibrated. Seattle gained a baseball-only venue with urban materials and better sightlines, while retaining the ability to manage rain. The roof, scoreboard, seating, club, video, hospitality, and fan-space improvements over time have kept the park aligned with contemporary expectations for an MLB venue, but the essential premise has remained intact: shield the event without enclosing the experience.",
    "Now T-Mobile Park, the stadium matters because it represents one of the retro era\u2019s smarter adaptations to climate. It did not reject the lesson of the Kingdome entirely. It kept the need for protection and changed the architectural answer. In the anthology, it stands as a bridge between dome-era pragmatism and the later preference for city-facing, baseball-specific parks."
  ],

  // ---- Supporting photography (roof bays — structural observations) ----
  // each: [slot id, drop guidance]
  panels: [
    ["tmobile-p1", "Exterior \u00b7 brick facade & exposed steel", "images/safeco/safeco-p1.jpg"],
    ["tmobile-p2", "Retractable canopy roof structure", "images/safeco/safeco-p2.jpg"],
    ["tmobile-p3", "Seating bowl & the field", "images/safeco/safeco-p3.jpg"],
    ["tmobile-p4", "Concourse steelwork", "images/safeco/safeco-p4.jpg"],
    ["tmobile-p5", "Safeco-era / construction archival image", "images/safeco/safeco-p5.jpg"]
  ]
};
