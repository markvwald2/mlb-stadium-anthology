/* New Comiskey Park — Chicago, Illinois.  "The Correction."
   New Comiskey Park (1991) is baseball's most important transitional ballpark:
   a late-modern, concrete-and-steel, baseball-only stadium that opened months
   before Camden Yards reset the design argument, then spent 2001–2007 being
   retrofitted toward the retro-classic expectations it had narrowly missed.

   FACTUAL AUTHORITY: the Codex New Comiskey Park packet. The ChatGPT concept
   render is visual direction only — none of its invented data is used here
   (it wrongly showed Blue Jays / Roy Halladay / Ellerbe Becket / 46,005 /
   1:05 PM / a 10-inning 2–1 game). The correct opponent is the Minnesota Twins,
   architect HOK Sport, capacity 44,321→40,615, first pitch 6:07 PM CDT, a
   9-inning 4–3 White Sox win. Fields marked n/a (Succeeded By, Final Game,
   Demolition, Other Visits, Save) are omitted. Every populated value renders
   once. Palette: steel black, silver, off-white, concrete gray; field green +
   tiny July-4 sparks only in the game zone. */
window.NEWCOMISKEY = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "New Comiskey Park",
  name_kicker: "NEW",
  name_lines: ["COMISKEY PARK"],
  city: "Chicago",
  state: "Illinois",
  district: "South Side",
  est: "1991",
  years_active: "1991\u2013Present",
  coordinates_n: "41.83\u00b0 N",
  coordinates_w: "87.6339\u00b0 W",
  elevation: "595 ft",

  // ---- Metadata ribbon (black-steel scoreboard fascia, top of right page) ----
  team_short: "Chicago White Sox",
  team_abbr: "CWS",
  league: "American League",
  division: "AL Central",
  era: "Modern Baseball-Specific",
  capacity_opening: "44,321",
  capacity_current: "40,615",
  allstar: "2003",
  visit_order: 20,
  visit_total: 42,

  // ---- Zone A — specification schedule (blueprint legend, no baseball-card
  //      ornament). Capacity lives in the ribbon, so it is not repeated here. ----
  facts: [
    ["Opened", "Apr 18, 1991"],
    ["Const. Start", "May 7, 1989"],
    ["Architect", "HOK Sport"],
    ["Type", "Open-air \u00b7 baseball-only"],
    ["Surface", "Natural grass", "Kentucky bluegrass"],
    ["Style", "Late-modern retrofitted retro-classic"],
    ["Facade", "Concrete & steel; arched-window facade; black steel canopy"],
    ["Location", "Urban", "333 W 35th St, Chicago, IL 60616"],
    ["Elevation", "595 ft"],
    ["Coordinates", "41.83\u00b0 N, 87.6339\u00b0 W"]
  ],

  // ---- Zone A — lifecycle / identity history ----
  lifecycle: [
    ["Renovations", "Major 2001\u20132007", "reduced upper deck \u00b7 roof canopy \u00b7 reworked concourses, seating, scoreboard & fan areas"],
    ["Preceded By", "South Side Park (1901\u20131910)\nComiskey Park (1910\u20131990)"]
  ],

  // ---- Zone A — names over time (one per line, like a sign schedule) ----
  names: [
    ["New Comiskey Park", "1991\u20132002"],
    ["U.S. Cellular Field", "2003\u20132016"],
    ["Guaranteed Rate Field", "2016\u20132024"],
    ["Rate Field", "2024\u2013present"]
  ],

  // ---- Zone A — cost & financing ----
  finance: [
    ["Original Cost", "$137 million", "$324 million adjusted"],
    ["Financing", "Publicly financed", "Illinois Sports Facilities Authority \u00b7 public bonds & state / local revenue"]
  ],

  // ---- Zone B — field dimensions (protractor instrument) ----
  field: {
    left_field: "330",
    center_field: "400",
    right_field: "335",
    orientation: "SE",
    degrees: 127
  },

  // ---- Zone C — featured visit (20 of 42). First Visit = Featured Visit, so
  //      the date is stated once. Night game is communicated by the 6:07 PM
  //      first pitch, so "Night" is not listed separately. Save is n/a. ----
  visit: [
    ["Date", "Wed \u00b7 Jul 4, 2001"],
    ["First Pitch", "6:07 PM CDT"],
    ["Attendance", "22,934"],
    ["Duration", "2:51"]
  ],

  // ---- Zone C — pitching ----
  pitching: {
    home: "Mark Buehrle",
    home_team: "CWS",
    away: "Eric Milton",
    away_team: "MIN",
    win: "Keith Foulke",
    win_team: "CWS",
    loss: "LaTroy Hawkins",
    loss_team: "MIN"
  },

  // ---- Zone C — weather (broadcast gauges) ----
  weather: {
    temperature: "82\u00b0",
    conditions: "Clear",
    wind: "8 mph NW",
    humidity: "50%"
  },

  // ---- Zone C — line score (scoreboard insertion panel, 9 innings) ----
  box: {
    innings: 9,
    away: { abbr: "MIN", name: "Twins", byInning: [0, 0, 0, 0, 0, 2, 0, 1, 0], r: 3, h: 10, e: 0 },
    home: { abbr: "CWS", name: "White Sox", byInning: [0, 0, 0, 0, 0, 1, 0, 1, 2], r: 4, h: 9, e: 1 }
  },

  // ---- Zone B — Stadium Context (one unified block, four paragraphs preserved
  //      exactly; titled "Stadium Context", set inside the correction spine) ----
  stadium_context: [
    "New Comiskey Park opened in 1991 at the edge of a stadium revolution and suffered for the timing. It replaced the old Comiskey Park, keeping the White Sox on the South Side while promising a modern baseball-only facility with more capacity, suites, parking, and contemporary amenities. But it arrived just before Camden Yards changed the model for what a new ballpark could be.",
    "The location carried continuity and rupture at the same time. The team remained in its South Side baseball district, near the old park, but the experience shifted toward a more managed modern venue shaped by public financing, broader access, and a less intimate relationship to the surrounding streets. It was not a suburban stadium, but it adopted some of the late-modern assumptions that convenience, height, and capacity could substitute for the peculiar closeness of an older neighborhood park.",
    "That was the design bargain, and it quickly became a problem. New Comiskey gained a clean baseball-only form, modern structure, and revenue spaces, but its upper deck, concrete scale, and relatively plain original character made it feel out of step almost immediately after the retro-classic movement took hold. The 2001\u20132007 renovation is therefore central to its story. The reduced upper deck, roof canopy, reworked concourses, seating, scoreboard, and fan areas were not routine updates; they were a correction toward the ballpark culture that arrived just after it opened.",
    "Now Rate Field, the stadium matters because it is a transitional object. It shows what MLB thought it wanted just before Camden Yards redefined the target. Its history is not simply replacement of an old park, but the renovation of a new one to survive a design argument it had narrowly missed."
  ]
};
