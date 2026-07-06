/* Minute Maid Park — Houston, Texas. Visit-era home of the Houston Astros.
   "Platform 35: The Retractable Terminal." Controlling metaphor: a historic
   rail terminal operating beneath a moving retractable-roof machine. The right
   page is organized as five station "track bays" (A–E) separated by steel-track
   rules; roof-panel geometry overlays the upper field. Union Station frontage,
   timetable rhythm, station-window glazing, brick + steel + roof-glass.
   Local data only — every populated field renders exactly once; nothing invented.
   Palette: warm paper stock, charcoal/rail-black ink, Astros navy + a single
   orange signal accent, brick red architecture, blue-gray roof glass, grass green. */
window.MMP = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Minute Maid Park",
  name_lines: ["MINUTE MAID PARK"],
  city: "Houston",
  state: "Texas",
  team_city: "HOUSTON",
  team_name: "ASTROS",
  league: "American League",
  division: "AL West",
  est: "2000",
  years_active: "2000\u2013present",
  coordinates: "29.7569\u00b0 N, 95.3556\u00b0 W",
  elevation: "45 ft",
  address: "501 Crawford Street, Houston, TX 77002",
  visit_order: 35,
  tagline: "RETRACTABLE ROOF \u00b7 UNION STATION TERMINAL",

  // ---- Bay A : identity route board ----
  identity: [
    ["League", "American League"],
    ["Division", "AL West"],
    ["Classification", "Retro Classic"],
    ["Type", "Retractable-roof \u00b7 baseball-only"],
    ["Status", "Active"],
    ["Years Active", "2000\u2013present"]
  ],
  all_star: "2004",
  // name history — one compact row, not separate callouts
  name_history: [
    ["Enron Field", "2000\u201302"],
    ["Astros Field", "2002"],
    ["Minute Maid Park", "2002\u201324"],
    ["Daikin Park", "2025\u2013"]
  ],
  preceded_by: [
    ["Colt Stadium", "1962\u201364"],
    ["Astrodome", "1965\u201399"]
  ],
  // renovations — condensed to a single record line item (from lifecycle data)
  renovations: "Center-field renovation — Tal\u2019s Hill removed (before 2017); scoreboard & premium-space upgrades; roof & fan-experience improvements",

  // ---- Bay B : museum facts ----
  facts: [
    ["Opened", "Mar 30, 2000", "groundbreaking Nov 1, 1997"],
    ["Capacity", "40,950"],
    ["Surface", "Natural grass", "Seashore Paspalum"],
    ["Architect", "HOK Sport"],
    ["Roof", "Retractable"],
    ["Facade", "Red brick masonry; steel-and-glass retractable-roof structure; preserved Union Station frontage"],
    ["Style", "Retro-classic downtown retractable-roof ballpark woven into historic railroad-station architecture"],
    ["Elevation", "45 ft"],
    ["Coordinates", "29.7569\u00b0 N, 95.3556\u00b0 W"],
    ["Cost", "$250M (1997)", "$467M adjusted"],
    ["Financing", "Public\u2013private; Harris County\u2013Houston Sports Authority / public majority + Astros private"],
    ["Address", "501 Crawford Street, Houston, TX 77002", "downtown"]
  ],

  // ---- Bay B : lifecycle "route" stops (no fabricated dates — only given anchors) ----
  lifecycle: [
    ["Astrodome", "fixed-dome predecessor"],
    ["Minute Maid Park opens", "Mar 30, 2000"],
    ["Center-field renovation \u00b7 Tal\u2019s Hill removed", "before 2017"],
    ["Scoreboard & premium-space upgrades", null],
    ["Roof & fan-experience improvements", null]
  ],

  // ---- Bay D : field geometry ----
  field: {
    left_field: "315",
    center_field: "409",
    right_field: "326",
    orientation: "NNW",
    degrees: 343
  },

  // ---- Bay E : featured visit / game ----
  visit: [
    ["Trip", "Texas"],
    ["Date", "Sat \u00b7 Sep 11, 2021"],
    ["Matchup", "LAA at HOU"],
    ["Result", "Angels 4, Astros 2"],
    ["Attendance", "31,547"],
    ["First Pitch", "6:10 PM CDT"],
    ["Duration", "3:42"]
  ],

  weather: {
    temperature: "84\u00b0",
    conditions: "Clear",
    wind: "10 mph SE",
    humidity: "54%"
  },

  pitching: {
    away_team: "LAA",
    away: "Jose Suarez",
    away_dec: "W",
    home_team: "HOU",
    home: "Luis Garcia",
    home_dec: "L",
    save: "Raisel Iglesias"
  },

  // ---- line score / departure board ----
  box: {
    innings: 9,
    away: { abbr: "LAA", name: "Angels", byInning: [2, 0, 2, 0, 0, 0, 0, 0, 0], r: 4, h: 10, e: 1 },
    home: { abbr: "HOU", name: "Astros", byInning: [0, 0, 0, 1, 0, 0, 0, 0, 1], r: 2, h: 6, e: 0 }
  },

  // ---- Bay C : unified Stadium Context (verbatim, paragraph breaks intact) ----
  stadium_context: [
    "Minute Maid Park replaced the Astrodome by revising Houston\u2019s relationship with enclosure. The Astrodome had been the great fixed-dome experiment, a technological answer to climate, spectacle, and multipurpose ambition. By 2000, the Astros needed a park that could keep weather control while moving away from the sealed abstraction of dome-era baseball. The new building made the roof retractable and the setting downtown.",
    "The site gave the ballpark an anchor the Astrodome did not have in the same way. Built around historic railroad-station architecture, Minute Maid Park used downtown Houston and rail imagery to give a contemporary retractable-roof stadium a more grounded identity. The building did not reject technology; it wrapped technology in a retro-classic language of brick, steel, glass, and industrial reference.",
    "The design bargain produced one of the era\u2019s more layered parks. Houston gained climate protection, a baseball-only setting, historic adaptive cues, premium spaces, and downtown visibility. It also inherited some eccentricities from the attempt to make a large retractable-roof building feel intimate and characterful, most famously the center-field condition later changed with the removal of Tal\u2019s Hill.",
    "The center-field renovation, scoreboard and premium-space upgrades, roof work, and other fan-experience improvements show a building still editing its original experiments. Minute Maid Park matters because it sits between two stadium futures: the Astrodome\u2019s total environmental control and the retro era\u2019s desire for urban character. It is Houston translating the dome idea into a more baseball-specific and city-facing form, while acknowledging that in this climate the old dream of controlled baseball never fully disappeared."
  ],

  // ---- supporting photography — framed station posters between bays ----
  // [slot id, label (NOT a caption — drop guidance only), aspect]
  photos: [
    ["mmp-p1", "Exterior \u00b7 Union Station frontage & brick facade", "4:3"],
    ["mmp-p2", "Retractable roof \u00b7 steel-and-glass over the bowl", "3:4"],
    ["mmp-p3", "Crawford Boxes & the left-field train", "4:3"]
  ]
};
