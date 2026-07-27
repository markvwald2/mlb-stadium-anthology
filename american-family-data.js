/* American Family Field — Milwaukee, Wisconsin.
   "The Fan." The controlling idea is the fan-shaped retractable roof: five
   panels pivoting from a single point behind home plate. The whole right page
   is drawn as that roof plan — a hub at the bottom, radiating ribs, concentric
   roof-track arcs, five panels fanned across the crown. Local data only; every
   structured value appears exactly once in the layout.
   Palette: weathered off-white paper, charcoal type, Brewers navy + gold and a
   brick-red accent, steel-gray roof structure cues. */
window.AMFAM = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "American Family Field",
  name_lines: ["AMERICAN", "FAMILY", "FIELD"],
  city: "Milwaukee",
  state: "Wisconsin",
  est: "2001",
  league: "National League",
  division: "NL Central",
  roof: "Fan-shaped retractable roof",
  coordinates: "43.0283\u00b0 N, 87.9711\u00b0 W",
  elevation: "635 ft",
  address: "1 Brewers Way, Milwaukee, WI 53214",
  years_active: "2001\u2013Present",

  // ---- Identity / classification ribbon (the main roof track) ----
  team_short: "Brewers",
  identity: [
    ["Team", "Brewers"],
    ["League", "National League"],
    ["Division", "NL Central"],
    ["Status", "Active"],
    ["Roof Type", "Fan-shaped retractable"],
    ["Location", "Urban / Suburban"]
  ],

  // ---- Stadium facts (museum-style tabular) ----
  facts: [
    ["Years Active", "2001\u2013present"],
    ["Classification", "Retro Classic"],
    ["Stadium Type", "Retractable-roof baseball-only ballpark"],
    ["CAPACITY", "41,900"],
    ["Surface", "Natural grass", "Kentucky bluegrass"],
    ["Architect", "HKS \u00b7 NBBJ \u00b7 Eppstein Uhen"],
    ["Architectural Style", "Retro-classic retractable-roof ballpark with industrial roof expression"],
    ["Facade", "Red brick with limestone, steel & glass", "fan-shaped retractable-roof structure"],
    ["Elevation", "635 ft"],
    ["Coordinates", "43.0283\u00b0 N, 87.9711\u00b0 W"],
    ["Address", "1 Brewers Way, Milwaukee, WI 53214"],
    ["Renovations", "Scoreboard, seating, club, concessions, and infrastructure improvements; roof and winterization work"],
    ["Previous Names", "Miller Park (2001\u20132020)"],
    ["Preceded By", "County Stadium"]
  ],

  // ---- Construction / lifecycle ----
  lifecycle: [
    ["GROUNDBREAKING", "Nov 9, 1996"],
    ["Opened", "April 6, 2001"],
    ["All-Star Game", "2002"],
    ["Cost", "$400 million"],
    ["Adjusted Cost", "$727 million"],
    ["Financing", "Public-private; SE Wisconsin Pro Baseball Park District sales-tax bonds, Brewers/private"]
  ],

  // ---- Field dimensions module (at the pivot hub) ----
  field: {
    left_field: "342",
    center_field: "400",
    right_field: "337",
    orientation: "SE",
    degrees: 129
  },

  // ---- Featured visit ----
  visit: [
    ["Visit Order", "21"],
    ["Visit Count", "2"],
    ["First Visit", "Jul 5, 2001"],
    ["Featured Visit", "Jul 22, 2023"],
    ["Trip", "Northern Midwest"],
    ["Attendance", "39,707"],
    ["Duration", "2:32"]
  ],
  visit_order: 21,
  visit_count: 2,

  // ---- Pitching decisions ----
  pitching: {
    away: "Allan Winans",
    away_team: "ATL",
    home: "Adrian Houser",
    home_team: "MIL",
    win: "Joel Payamps",
    loss: "Joe Jimenez",
    save: "Devin Williams"
  },

  // ---- Weather strip ----
  weather: {
    temperature: "78\u00b0",
    conditions: "Clear",
    wind: "5 mph WSW",
    humidity: "47%"
  },

  // ---- Featured game / line score (the roof-track band) ----
  game_day: "Saturday",
  game_date: "Jul 22, 2023",
  game_duration: "2:32",
  box: {
    innings: 9,
    away: { abbr: "ATL", name: "Braves", byInning: [0, 0, 3, 0, 0, 0, 0, 0, 0], r: 3, h: 7, e: 2 },
    home: { abbr: "MIL", name: "Brewers", byInning: [0, 0, 0, 0, 2, 1, 0, 1, "x"], r: 4, h: 8, e: 0 }
  },

  // ---- Stadium context (one unified body — museum wall text) ----
  stadium_context: [
    "American Family Field replaced County Stadium by addressing the two things Milwaukee\u2019s old municipal park could not control: weather and modern revenue. County Stadium had given Milwaukee a major-league identity and a regional tailgating culture, but by the end of the twentieth century it was exposed, aging, and limited by the economics of a smaller-market franchise. The Brewers needed a building that could protect attendance, expand premium spaces, and keep baseball viable through cold, uncertain spring weather.",
    "The site choice was deliberately continuous. Rather than move to a downtown setting, Milwaukee kept baseball in the same west-side stadium district, preserving the regional driving patterns and parking-lot rituals that had become part of the club\u2019s identity. That decision makes the park different from the downtown retro-classic wave. Its brick, limestone, steel, glass, and fan-shaped retractable roof gave it a traditional ballpark vocabulary, but its geography remained tied to Milwaukee\u2019s older fairgrounds-adjacent, tailgating-oriented baseball culture.",
    "The design bargain is the roof. It gives the Brewers certainty, comfort, and scheduling stability, but it also makes the building read less like a compact urban ballpark and more like a large mechanical shelter for a regional baseball event. Later scoreboard, seating, club, concession, infrastructure, roof, and winterization improvements have reinforced that practical role.",
    "American Family Field matters because it shows how the retro era bent itself to local conditions. Milwaukee did not simply copy Camden Yards. It built a weather-protected successor that preserved County Stadium\u2019s regional habits while replacing its vulnerabilities. The park is a reminder that stadium evolution is not just aesthetic. In some cities, climate, market size, and tradition shape the architecture as much as nostalgia does."
  ],

  // ---- Supporting photography (roof panels, fanned across the crown) ----
  // each: [slot id, short caption, aspect "4:3" | "3:4"]
  panels: [
    ["amfam-p1", "Exterior \u00b7 brick & the fan roof", "4:3", "images/american-family/miller-park-01.jpg"],
    ["amfam-p2", "Seating bowl beneath the closed roof", "4:3", "images/american-family/miller-park-02.jpg"],
    ["amfam-p3", "Center-field scoreboard", "4:3", "images/american-family/miller-park-03.jpg"],
    ["amfam-p4", "Concourse & the Hot Corner", "4:3", "images/american-family/miller-park-04.jpg"],
    ["amfam-p5", "Roof interior \u00b7 pivoting panels", "4:3", "images/american-family/miller-park-05.jpg"]
  ]
};
