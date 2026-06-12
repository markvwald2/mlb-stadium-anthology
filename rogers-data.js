/* Rogers Centre — Toronto, Ontario.
   "The Retractable Machine" — a high-tech multipurpose retractable-roof stadium
   being retrofitted toward a baseball-specific home. Factual payload transcribed
   verbatim from the Codex production prompt (the factual authority). Local data
   only; concept image is visual direction, never a data source. Every populated
   value renders exactly once. Warm paper + charcoal ink + Royal/Navy blue and a
   restrained red accent — blueprint / architectural-systems language. */
window.ROGERS = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Rogers Centre",
  city: "Toronto",
  state: "Ontario",
  team_short: "Blue Jays",
  team_name: "Toronto Blue Jays",
  league: "American League",
  division: "AL East",
  years_active: "1989\u2013Present",
  era: "Multipurpose Shared Use",

  // ---- Visit framing ----
  visit_order: 37,
  visit_total: 42,
  trip: "Northern Midwest",

  // ---- Stadium facts (engineering specification sheet, Stadium Section) ----
  facts: [
    ["Opened", "1989"],
    ["Years Active", "1989\u2013Present"],
    ["Construction Start", "Oct 3, 1986"],
    ["Opening Day", "Jun 3, 1989"],
    ["Capacity", "41,500 (originally 50,516)"],
    ["Surface", "Artificial - AstroTurf 3D Xtreme with dirt infield"],
    ["Architect", "Rod Robbie and Michael Allen", "Structural design by Adjeleian Allen Rubeli"],
    ["Type", "Multipurpose retractable-roof stadium adapted increasingly toward baseball"],
    ["Style", "Late multipurpose high-tech retractable-dome stadium, now retrofitted toward baseball-specific use"],
    ["Name History", "SkyDome (1989\u20132005)\nRogers Centre (2005\u2013Present)"],
    ["Preceded By", "Exhibition Stadium (1977–1989)"],
    ["Renovations", "Major 2023\u20132025 phased renovation of outfield districts, seating bowl, clubhouses, premium areas, video boards, and fan amenities"]
  ],

  // ---- Meta ribbon (Stadium Section, bottom) ----
  meta: [
    ["Status", "Active", "status"],
    ["Era", "Multipurpose Shared Use", "era"],
    ["Roof", "Retractable", "roof"],
    ["Location", "Downtown", "pin"],
    ["Elevation", "250 ft", "elev"]
  ],

  // ---- retractable roof diagram (honest: only Codex-supported labels) ----
  roof: {
    title: "Retractable Roof",
    closed: "Closed",
    open: "Open"
  },

  // ---- Field geometry (protractor) ----
  field: {
    left_field: "328 FT",
    center_field: "400 FT",
    right_field: "328 FT",
    orientation: "NNW",
    bearing: 345
  },

  // ---- Featured visit / game ----
  visit_day: "Thursday",
  visit_date: "Jul 20, 2023",
  game_title: "Group Visit",
  first_pitch: "1:07 PM EDT",
  attendance: "43,196",
  duration: "2:53",
  game_type: "Day",

  // featured-game stat strip
  stats: [
    ["group", "Group Visit", "Featured"],
    ["clock", "1:07 PM EDT", "First Pitch"],
    ["ticket", "43,196", "Attendance"],
    ["timer", "2:53", "Duration"],
    ["ball", "9", "Innings"]
  ],

  // ---- Weather ----
  weather: {
    temperature: "77\u00b0",
    conditions: "Clear",
    wind: "8 mph SSE",
    humidity: "68%"
  },

  // ---- Matchup + line score ----
  away_name: "San Diego Padres",
  home_name: "Toronto Blue Jays",
  away_logo: "assets/san-diego-padres-logo.svg",
  home_logo: "assets/toronto-blue-jays-logo.svg",
  result: "Blue Jays 4, Padres 0",
  box: {
    innings: 9,
    away: { abbr: "SD", byInning: ["0", "0", "0", "0", "0", "0", "0", "0", "0"], r: "0", h: "6", e: "0" },
    home: { abbr: "TOR", byInning: ["0", "1", "0", "0", "0", "0", "1", "2", "x"], r: "4", h: "9", e: "1" }
  },
  starters: { away: "Blake Snell", away_abbr: "SD", home: "Chris Bassitt", home_abbr: "TOR" },
  decision: { w: "Chris Bassitt", l: "Blake Snell" },

  // ---- Design & construction notes (Visit Section, bottom) ----
  build: [
    ["Facade", "Concrete-and-steel multipurpose shell with steel/PVC retractable-roof panels and selective glazed edges"],
    ["Original Cost", "$470 million", "$1.26 billion adjusted"],
    ["Financing", "Public-private partnership led by Ontario, Canada, and Toronto public entities with private corporate participation; later privately acquired by Rogers"],
    ["Coordinates", "43.6414\u00b0 N, 79.3892\u00b0 W"],
    ["Address", "1 Blue Jays Way, Toronto, ON M5V 1J1, Canada"]
  ],

  // team color key
  colors: [
    ["Royal Blue", "#1453a0"],
    ["Navy Blue", "#0e2a55"],
    ["Red", "#b4232a"]
  ],

  // ---- Stadium context (one unified block, paragraph breaks; do NOT split) ----
  stadium_context: [
    "Rogers Centre belongs to a different dream of modern baseball than the retro parks that soon followed it. Opened in 1989, it was a high-tech multipurpose stadium built for a downtown Toronto setting, with a retractable roof that made weather control part of the spectacle. Exhibition Stadium had been the predecessor, but the new building promised something more ambitious: baseball, football, concerts, civic events, and climate management inside one enormous piece of urban machinery.",
    "Its downtown placement gave the stadium a public visibility that many multipurpose parks lacked. Rather than occupy a remote sports complex, it sat in the central city, where scale and engineering could become part of Toronto's late twentieth-century image. The roof was not a minor feature; it was the building's premise. In a northern city, a retractable dome offered certainty without fully surrendering the idea of open-air baseball. That bargain made sense for its moment, when cities were still willing to imagine the future of sport as technologically expansive, multipurpose, and enclosed when necessary.",
    "But the same qualities that made the building impressive also made it difficult to keep aligned with baseball's next phase. Rogers Centre was not born from the retro-classic turn toward intimacy, asymmetry, and neighborhood texture. It was big, flexible, and engineered at a scale that treated baseball as one use among several. Over time, that flexibility became less valuable than baseball-specific experience. The major 2023\u20132025 renovations to outfield districts, seating bowl, clubhouses, premium areas, video boards, and fan amenities reveal the shift: the building has had to be edited toward baseball rather than merely maintained.",
    "That makes Rogers Centre especially useful in the stadium timeline. It is not simply the last gasp of the multipurpose idea or an early retractable-roof experiment. It is a surviving high-tech stadium being retrofitted into a more specialized ballpark culture. Its story is not replacement, at least not yet, but conversion: a building from one future of baseball being steadily adapted to fit another."
  ],

  // ---- Photo strip (Stadium Section) ----
  strip: [
    ["rc-s1", "Exterior \u00b7 retractable-roof shell & downtown Toronto"],
    ["rc-s2", "Interior \u00b7 bowl, field & open roof"],
    ["rc-s3", "Street level \u00b7 Rogers Centre signage"]
  ],
  // visit-section photo
  visit_photo: ["rc-v1", "Interior under the open roof, day game"]
};
