/* Tropicana Field — St. Petersburg, Florida. Home of the Tampa Bay Rays.
   Concept: "The Service Deck" — controlling metaphor BASEBALL INSIDE A GARAGE.
   A full MLB field sealed inside a vast utilitarian fixed-dome structure. The
   right page is organized as a system of horizontal ROOF-SERVICE BAYS separated
   by thin steel seams — roof panels, catwalk rings, maintenance access, a game-
   operations display — derived from the slanted PTFE dome, catwalk network,
   artificial turf, and downtown-edge superblock. Cool concrete/roof-white paper
   (NOT warm), charcoal ink, steel rules; synthetic turf green is the one strong
   color field; Rays navy / Columbia blue / yellow are restrained wayfinding accents.

   FACTUAL AUTHORITY: every value below is transcribed verbatim from the provided
   Tropicana Field Codex packet. The ChatGPT concept render is visual direction
   ONLY and contains many WRONG values (opening "Mar 31 1990", capacity 48,000,
   AstroTurf, "Hellmuth Obata + Kassabaum", elevation 26 ft, coords 82.6375° W,
   "Nationals 2", attendance 13,422, Snell/Scherzer/Colomé) — NONE are used.
   Fields marked n/a in the packet (Preceded By, Succeeded By, Final Game,
   Demolition) are omitted. Total visits to this park == 1, so the single featured
   visit renders once with no duplicate First/Featured callout. */
window.TROPICANA = {
  /* ---- identity / hero plaque (left page) ---- */
  stadium_name: "Tropicana Field",
  name_lines: ["TROPICANA", "FIELD"],
  city: "St. Petersburg",
  state: "Florida",
  team_name: "Tampa Bay Rays",
  team_short: "Rays",
  league: "American League",
  division: "AL East",
  visit_order: 28,
  trip: "Florida/Georgia",
  bay_caption: "Roof-service deck \u00b7 dome bay system",

  /* ---- Bay B · Facility Specification register (physical-plant register).
     [label, value, sub?] — sub is a small italic gloss. Combined compactly,
     none dropped; n/a fields omitted. ---- */
  specs: [
    ["Stadium Type", "Fixed-dome multipurpose stadium", "adapted for baseball"],
    ["Era", "Multipurpose Shared Use"],
    ["Roof", "Fixed dome", "slanted PTFE / fiberglass tensile membrane"],
    ["Surface", "Artificial turf", "Shaw Sports Turf TruHop synthetic turf"],
    ["Architect", "HOK Sport \u00b7 Lescher & Mahoney"],
    ["Facade", "Concrete structure; slanted PTFE / fiberglass fabric dome; glazed rotunda entries"],
    ["Capacity", "25,025", "opened at 45,000"],
    ["Status", "Active"],
    ["Financing", "Publicly financed by the City of St. Petersburg as a fixed-dome stadium intended to attract MLB"],
    ["Address", "1 Tropicana Drive St. Petersburg, Florida 33705"],
    ["Coordinates", "27.7683\u00b0 N, 82.6533\u00b0 W"],
    ["Elevation", "45 ft"]
  ],

  /* ---- Bay E · construction / lifecycle data ---- */
  lifecycle: [
    ["Construction Start", "Nov 22, 1986"],
    ["Location", "Downtown edge \u00b7 St. Petersburg"],
    ["Opening Day", "Mar 3, 1990", "as Florida Suncoast Dome"],
    ["MLB Tenant", "Rays, 1998\u2013present"],
    ["Name History", "Florida Suncoast Dome (1990\u201393)\nThunderDome (1993\u201396)\nTropicana Field (1996\u2013present)"],
    ["Original Cost", "$130M (1990)", "$320M adjusted"],
    ["Renovations", "Field, catwalk, lighting, scoreboard, seating, turf, ray tank & fan-space updates; storm-damage & relocation issues in the 2020s"]
  ],

  /* ---- field geometry (small protractor instrument, Bay E) ---- */
  field: {
    left_field: "315",
    center_field: "404",
    right_field: "322",
    orientation: "N",
    bearing: 45
  },

  /* ---- restrained team-color + material key ---- */
  team_colors: [
    ["#092C5C", "Navy"],
    ["#8FBCE6", "Columbia"],
    ["#F5D130", "Yellow"]
  ],

  /* ---- Bay C · unified Stadium Context (verbatim, 4 paragraphs).
     One block, paragraph breaks preserved; NOT split into history/site. ---- */
  stadium_context: [
    "Tropicana Field is one of the strangest MLB stadium stories because it was not originally the answer to an existing major-league franchise\u2019s ordinary facility problem. It was a fixed-dome civic bet that St. Petersburg could build its way into major-league relevance. When the Rays arrived in 1998, the building finally had the tenant it had been waiting for, but it also carried the limitations of a late multipurpose dome adapted for baseball.",
    "The downtown-edge site gave St. Petersburg a major sports address, yet the building\u2019s interior condition mattered more than its urban setting. The fixed roof, catwalks, artificial turf, and enclosed environment made climate control the defining experience. In Florida, shelter had obvious value, but the stadium\u2019s form also separated baseball from the outdoor conditions, views, and urban texture that the retro-classic era was beginning to restore elsewhere.",
    "The design bargain was blunt. Tropicana Field offered certainty, shade, and a controllable interior, but at the cost of baseball-specific atmosphere. Field changes, catwalk adjustments, lighting, scoreboards, seating, turf, the ray tank, and fan-space updates have all tried to make the building more workable and more distinctive. Later storm-damage and relocation issues in the 2020s only reinforced the sense that the park has always existed under pressure.",
    "Tropicana Field matters because it shows the limits of the dome-era solution at the moment baseball was moving away from it. It is not merely unpopular or odd; it is evidence of a civic strategy that valued landing a franchise and controlling climate more than producing a traditional ballpark. Its unresolved status makes it feel less like a completed stadium chapter than an argument baseball has never fully settled in Tampa Bay."
  ],

  /* ---- Bay A · two stacked roof-bay photo strips (no captions) ----
     [slot id, drop-guidance placeholder] ---- */
  roof_photos: [
    ["trop-roof1", "Dome interior \u2014 slanted white PTFE ceiling, catwalk rings & suspended lighting over the bowl. Looking up into the enclosed roof volume."],
    ["trop-roof2", "Catwalk / roof-truss detail \u2014 the suspended ring walkways and structural hardware spanning the dome."]
  ],
  /* Bay E supporting photo */
  support_photo: ["trop-supp1", "Interior concourse or glazed rotunda entry \u2014 concrete structure, cool artificial light, the synthetic field beyond."],

  /* ---- Bay D · featured visit / game (game-operations display) ---- */
  visit: {
    no: 28,
    day: "Sunday",
    date: "May 27, 2018",
    title: "Group Visit",
    trip: "Florida/Georgia",
    home_team: "Tampa Bay Rays",
    home_abbr: "TB",
    away_team: "Baltimore Orioles",
    away_abbr: "BAL",
    result: "Rays 8, Orioles 3",
    attendance: "13,311",
    first_pitch: "1:10 PM EDT",
    day_game: true,
    duration: "3:10",
    innings: 9
  },
  weather: {
    temperature: "76\u00b0",
    conditions: "Drizzle",
    wind: "26 mph SE",
    humidity: "90%"
  },
  pitching: {
    away_team: "BAL",
    away: "Kevin Gausman",
    home_team: "TB",
    home: "Sergio Romo",
    win: "Vidal Nuno",
    loss: "Kevin Gausman",
    save: "Austin Pruitt"
  },
  /* line score — bats: BAL (away) on top, TB (home) below; "x" = home didn't bat 9th */
  box: {
    innings: 9,
    away: { abbr: "BAL", byInning: ["3","0","0","0","0","0","0","0","0"], r: "3", h: "8", e: "0" },
    home: { abbr: "TB",  byInning: ["1","0","6","0","0","0","1","0","x"], r: "8", h: "10", e: "1" }
  }
};
