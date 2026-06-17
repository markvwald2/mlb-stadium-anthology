/* Petco Park — San Diego, California. Home of the San Diego Padres.
   Concept: "The Warehouse Block." Controlling metaphor — Petco Park organized
   not around the field but around the preserved Western Metal Supply building:
   a downtown East Village parcel where a red-brick adaptive-reuse landmark, an
   urban street grid, and asymmetric outfield geometry are locked into one civic
   redevelopment frame. The right page is built as four vertical warehouse-facade
   bays: Identity / Stadium Context / Architectural Story (window openings) /
   Game Artifact (scoreboard).

   FACTUAL AUTHORITY: every value below is taken verbatim from the provided Petco
   Park Codex packet — the factual and production authority. The accompanying
   ChatGPT concept render is visual direction ONLY and contains several wrong
   values (Populous, "no renovations", a 3-2 Padres score, 25,075 attendance,
   72°/12mph/61% weather, 30 ft elevation); NONE of those are copied. Fields
   marked n/a / blank in the packet (Name History, Succeeded By, Closed Date,
   Final Game, Demolition, First Visit duplicate, Other Visits, Trip) are omitted
   entirely. Total visits to the park == 1, so the single featured visit renders
   once with no duplicate callout.

   Palette: warm sandstone/stucco paper, warm charcoal ink, Western-Metal red
   brick, Indian-sandstone trim, white-painted-steel rule lines; restrained
   Padres brown + gold accents only. */
window.PETCO = {
  /* ---- identity / hero title block (left page) ---- */
  stadium_name: "Petco Park",
  name_lines: ["PET", "CO", "PARK"],
  city: "San Diego",
  state: "California",
  team_city: "SAN DIEGO",
  team_name: "PADRES",
  league: "National League",
  division: "NL West",
  visit_order: 23,
  visits_total: 42,
  landmark: ["Western Metal Supply Co.", "Built 1920", "Preserved 2004"],
  tagline: "A DOWNTOWN BALLPARK BUILT AROUND A PRESERVED WAREHOUSE BLOCK",

  /* ---- Bay A · identity schedule (museum-style architectural schedule) ----
     [label, value, sub?]  — sub renders as a small italic gloss. */
  identity: [
    ["Team", "San Diego Padres"],
    ["League", "National League"],
    ["Division", "NL West"],
    ["Opened", "Apr 8, 2004", "construction begun May 3, 2000"],
    ["Years Active", "2004\u2013present"],
    ["Status", "Active"]
  ],

  /* ---- Bay A · specifications (fields combined compactly, none dropped) ---- */
  specs: [
    ["Capacity", "39,860", "originally 42,445"],
    ["Surface", "Natural grass", "Bandera Bermuda grass"],
    ["Architect", "HOK Sport \u00b7 Antoine Predock"],
    ["Class / Roof", "Retro Classic \u00b7 Open air", "open-air, baseball-only ballpark"],
    ["Facade", "Indian sandstone, stucco & white-painted steel", "+ preserved red-brick Western Metal Supply building"],
    ["Location", "Downtown \u00b7 East Village", "near Gaslamp Quarter, trolley lines & bayfront"],
    ["Address", "100 Park Boulevard, San Diego, CA 92101"],
    ["Elevation", "40 ft", "32.7073\u00b0 N, 117.1566\u00b0 W"],
    ["Cost", "$450M (2004) \u00b7 $767M adj.", "public\u2013private partnership: redevelopment funds + Padres private"],
    ["All-Star Game", "2016"],
    ["Renovations", "Scoreboard, social-space, seating, outfield, premium-area & technology upgrades; Gallagher Square"]
  ],

  /* naming + lineage tail (rendered below the schedule) */
  naming: ["Petco Park", "2004\u2013present"],
  preceded_by: "Jack Murphy Stadium / Qualcomm Stadium",

  /* ---- field geometry (small protractor instrument, Bay A foot) ---- */
  field: {
    left_field: "336",
    center_field: "396",
    right_field: "391",
    orientation: "N",
    degrees: 0
  },

  /* ---- material / facade cues + team-color key ---- */
  materials: [
    ["#9C4A33", "Western-Metal brick"],
    ["#D8C3A0", "Indian sandstone"],
    ["#C9BCA6", "Stucco"],
    ["#C7C4BE", "White-painted steel"]
  ],
  team_colors: [
    ["#5C3A21", "Brown"],
    ["#C99A4A", "Gold"],
    ["#F4EAD6", "White"]
  ],

  /* ---- Bay B · unified Stadium Context (verbatim, 4 paragraphs).
     One block, paragraph breaks preserved; NOT split into history/site. ---- */
  stadium_context: [
    "Petco Park replaced Jack Murphy Stadium by moving the Padres out of regional infrastructure and into an urban redevelopment story. Mission Valley had given San Diego major-league scale, but it was a freeway-served multipurpose landscape where baseball shared identity with football and parking fields. Petco shifted the franchise downtown, making the ballpark part of East Village redevelopment and giving the Padres a more specific civic address.",
    "The site decision shaped the architecture. Petco did not need to invent all of its character from scratch because the Western Metal Supply building gave the park a real urban anchor. Indian sandstone, stucco, white-painted steel, open concourses, and the preserved warehouse landmark produced a ballpark that felt contemporary without abandoning the retro-classic desire for texture and asymmetry.",
    "The design bargain was to make baseball a district experience. Petco gained walkability, mixed urban edges, public open space, and a stronger relationship between ballpark and city. It also became part of a larger development project, where the stadium\u2019s value extended beyond the ticketed game. Later scoreboard, social-space, seating, outfield, premium-area, technology, and Gallagher Square renovations have only strengthened that broader role.",
    "Petco Park matters because it shows the retro-classic movement maturing from ballpark design into urban strategy. It did not merely replace a multipurpose stadium with a prettier one. It changed what the Padres\u2019 home was supposed to do: not just host baseball, but help restructure a downtown district and make the franchise feel embedded in San Diego rather than parked beside its freeways. Its success depends on that expanded job description, where the park, the preserved warehouse, and the surrounding streets all share responsibility for the stadium\u2019s identity."
  ],

  /* ---- Bay C · architectural window openings (no captions) ----
     [slot id, drop-guidance placeholder (disappears when filled)] ---- */
  windows: [
    ["petco-w1", "Western Metal Supply building \u2014 preserved red-brick warehouse anchoring the left-field corner"],
    ["petco-w2", "Open concourse & white-painted steel structure \u2014 sandstone / stucco material detailing"],
    ["petco-w3", "Downtown skyline integration \u2014 East Village frontage, Gallagher Square & the bay beyond"]
  ],
  window_plate: ["Built for baseball.", "Built for the city."],

  /* ---- Bay D · featured visit / game (scoreboard bay) ---- */
  visit: {
    no: 23,
    day: "Saturday",
    date: "Jun 20, 2009",
    title: "Group Visit",
    home_team: "San Diego Padres",
    home_abbr: "SD",
    away_team: "Oakland Athletics",
    away_abbr: "OAK",
    result: "Athletics 6, Padres 3",
    attendance: "28,074",
    first_pitch: "7:05 PM PDT",
    night: true,
    duration: "2:59"
  },
  weather: {
    temperature: "66\u00b0",
    conditions: "Clear",
    wind: "6 mph SW",
    humidity: "69%"
  },
  pitching: {
    away_team: "OAK",
    away: "Brett Anderson",
    home_team: "SD",
    home: "Walter Silva",
    win: "Michael Wuertz",
    loss: "Cla Meredith",
    save: "Andrew Bailey"
  },
  /* line score — bats: OAK (away) on top, SD (home) below */
  box: {
    innings: 9,
    away: { abbr: "OAK", byInning: [1, 1, 0, 0, 0, 1, 1, 2, 0], r: 6, h: 10, e: 0 },
    home: { abbr: "SD", byInning: [0, 0, 2, 0, 1, 0, 0, 0, 0], r: 3, h: 8, e: 2 }
  }
};
