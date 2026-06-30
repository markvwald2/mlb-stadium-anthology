/* Dodger Stadium — Los Angeles, California. Home of the Los Angeles Dodgers.
   Concept: "Terraces of Chavez Ravine." Dodger Stadium treated as a designed
   LANDFORM — the site, parking terraces, bowl, pavilions, roofline and
   circulation read as one integrated composition. The right page is built as a
   series of horizontal TERRACES (concrete elevation bands) that descend down the
   page; the upper-deck roofline is the master alignment datum. The two featured
   games are symmetric PAVILION masses flanking a central trip spine. Architectural
   monograph first, baseball second; concrete + charcoal carry the page, with
   Dodger blue used only to organise hierarchy and red only as a trace accent.

   FACTUAL AUTHORITY: every value below is taken verbatim from the provided
   Dodger Stadium Codex packet. The ChatGPT concept renders are VISUAL DIRECTION
   ONLY and contain wrong values (architect "Welton Becket"; renovation year list;
   Game-2 attendance 46,125 / first pitch 5:08 / duration 3:28; 76°/73° weather;
   John Franco / Dwight Gooden decisions; "Jack's first visit"). NONE are copied.
   Empty / n/a fields (Previous Names, Succeeded By, demolition, final game) are
   omitted entirely. */
window.DODGER = {
  /* ---- identity ---- */
  stadium_name: "Dodger Stadium",
  city: "Los Angeles",
  state: "California",
  team: "Los Angeles Dodgers",
  league: "National League",
  division: "NL West",
  visit_order: 4,
  visits_total: 5,
  coords_line: "34.0736\u00b0 N  118.24\u00b0 W",
  site_line: "Chavez Ravine \u00b7 Elev. 520 ft \u00b7 Opened 1962",

  /* ---- museum spec rail — reordered as a strict 4x4 matrix, by tier ----
     Row 1 PRIMARY  · Row 2 SECONDARY · Row 3 TERTIARY · Row 4 HISTORICAL.
     (Surface "Natural grass" is folded into the full Surface record below; Era
     overlaps Style — both omitted to keep the matrix a clean 4x4.) */
  spec: [
    /* primary */
    ["Opened", "Apr 10, 1962"],
    ["Capacity", "56,000"],
    ["Status", "Active"],
    ["Years Active", "1962\u2013present"],
    /* secondary */
    ["Architect", "Emil Praeger"],
    ["Style", "Mid-century modern, hillside"],
    ["Era", "Modern Baseball-Specific"],
    ["Stadium Type", "Open-air, baseball-only"],
    /* tertiary */
    ["Roof", "Open air"],
    ["Setting", "Parkland-adjacent \u00b7 Hilltop \u00b7 Urban"],
    ["Elevation", "520 ft"],
    ["Coordinates", "34.0736\u00b0 N \u00b7 118.24\u00b0 W"],
    /* historical */
    ["Preceded By", "L.A. Memorial Coliseum"],
    ["Construction", "Begun Sep 17, 1959"],
    ["Cost", "$23M (1962) \u00b7 $245M adj."],
    ["Address", "1000 Vin Scully Ave, Los Angeles, CA 90012"]
  ],

  /* ---- extended museum labels (full faithful long-form values) ----
     rendered as a running fine-print notation rail beneath the spec grid. */
  notes: [
    ["Surface", "Natural grass - Tifway 419 bermudagrass, overseeded with perennial ryegrass."],
    ["Fa\u00e7ade", "Cast-in-place and precast concrete with painted steel railings and pastel modernist accents."],
    ["Financing", "Privately financed by Dodgers owner Walter O\u2019Malley, enabled by a land exchange and site / infrastructure arrangements with the City of Los Angeles."],
    ["Renovations", "Major phased renovations under multiple ownership groups; seating, video, club, concourse, plaza, bullpen and center-field work completed across the 2000s and 2010s."],
    ["Address", "1000 Vin Scully Avenue, Los Angeles, CA 90012."]
  ],

  /* ---- field geometry (small architectural notation, NNE 26 deg) ---- */
  field: { left_field: "330", center_field: "395", right_field: "330", orientation: "NNE", degrees: 26 },

  /* ---- photo frieze (no captions; subject is drop-guidance only) ---- */
  strip: [
    ["dodger-s1", "Chavez Ravine approach \u2014 terraced parking levels stepping up the hillside basin"],
    ["dodger-s2", "Outfield pavilions \u2014 the symmetrical open-air pavilion roofs above the bleachers"],
    ["dodger-s3", "Upper-deck roofline \u2014 the long cantilevered horizontal roof datum"],
    ["dodger-s4", "Seating bowl \u2014 the terraced, color-coded decks carved into the grade"],
    ["dodger-s5", "Exterior concrete \u2014 cast-in-place surfaces, steel railings & pastel accents"],
    ["dodger-s6", "Scoreboard structure \u2014 the faceted mid-century billboard / sign architecture"]
  ],

  /* ---- unified Stadium Context (verbatim, 4 paragraphs) ---- */
  stadium_context: [
    "Dodger Stadium was built for a baseball franchise and an American city both trying to define themselves at major-league scale. After the Dodgers left Brooklyn for the west coast, the Los Angeles Memorial Coliseum could only be a temporary answer: huge, improvised, and not truly shaped for baseball. The permanent park in secluded Chavez Ravine provided the relocated club a home of its own and gave Los Angeles a stadium that matched the city\u2019s mid-century confidence in the land, in movement, and in modern form. The result read less as a venue than as a civic statement.",
    "Its location was the central choice. Rather than imitate an older neighborhood ballpark, Dodger Stadium settled into a scenic hilltop basin, surrounded by parkland and urban terrain, and organized around automobile arrival. That setting made the building feel both central and apart. It was close enough to the city to carry civic weight, but its experience was governed by grade changes, terraced parking, and the broad spatial logic of 60's Los Angeles. The ballpark did not ask fans to step off a dense street grid into baseball. It asked them to ascend into a designed landscape.",
    "Architecturally, Dodger Stadium is a rare case of baseball-specific modernism that did not become obsolete as quickly as much of its generation. Its clean horizontal decks, Downtown-adjacent hillside setting, open-air multilayered bowl, and mid-century discipline gave it a clarity that later multipurpose stadiums often lacked. It gained scale, visibility, and a powerful sense of arrival, but it sacrificed the sidewalk intimacy of the older parks that preceded modern relocation and expansion, along with much of their surrounding urban texture. The gain in scale came at the cost of the street.",
    "The renovations across later decades show how much the original form could absorb. Seating, video, club, concourse, plaza, bullpen, and center-field work expanded the business and social functions of the stadium without erasing the underlying composition. That is why Dodger Stadium occupies such a particular place in baseball: it is not a jewel box, not a concrete doughnut, and not a retro reconstruction. It is the enduring version of an alternate path MLB might have taken more often, where modernism, topography, and baseball-specific design were allowed to reinforce one another."
  ],

  /* ---- Visit / trip spine ---- */
  visit: {
    no: 4, total: 5,
    title: "Group Visit",
    trip: "Southern California",
    span: "Aug 18\u201319, 1986",
    location: "Los Angeles, California",
    note: "Two nights in Chavez Ravine",
    home_team: "Los Angeles Dodgers",
    away_team: "New York Mets",
    other_visits: [
      "1970 \u00b7 Date unknown",
      "May 14, 1978 \u00b7 vs Chicago Cubs",
      "May 22, 2010 \u00b7 vs Detroit Tigers"
    ]
  },

  /* ---- the two pavilions (equal weight) — bats: NYM away top, LAD home below ---- */
  games: [
    {
      mass: "First Night", day: "Monday", date: "Aug 18, 1986",
      away_name: "Mets", away_score: "5", home_name: "Dodgers", home_score: "4",
      first_pitch: "5:05 PM PDT", attendance: "46,099", duration: "3:23", type: "Night",
      home_starter: "Orel Hershiser", away_starter: "Bob Ojeda",
      win: "Bob Ojeda", loss: "Orel Hershiser", save: "Roger McDowell",
      box: { innings: 9,
        away: { abbr: "NYM", byInning: [1, 0, 1, 0, 3, 0, 0, 0, 0], r: 5, h: 9, e: 0 },
        home: { abbr: "LAD", byInning: [0, 0, 0, 0, 4, 0, 0, 0, 0], r: 4, h: 11, e: 1 } },
      weather: { temperature: "83\u00b0", conditions: "Partly Cloudy", wind: "14 mph SW", humidity: "43%" }
    },
    {
      mass: "Second Night", day: "Tuesday", date: "Aug 19, 1986",
      away_name: "Mets", away_score: "6", home_name: "Dodgers", home_score: "4",
      first_pitch: "7:35 PM PDT", attendance: "46,977", duration: "3:03", type: "Night",
      home_starter: "Fernando Valenzuela", away_starter: "Ron Darling",
      win: "Ron Darling", loss: "Fernando Valenzuela", save: "Roger McDowell",
      box: { innings: 9,
        away: { abbr: "NYM", byInning: [2, 2, 0, 0, 0, 1, 0, 0, 1], r: 6, h: 12, e: 2 },
        home: { abbr: "LAD", byInning: [0, 2, 2, 0, 0, 0, 0, 0, 0], r: 4, h: 9, e: 1 } },
      weather: { temperature: "83\u00b0", conditions: "Mostly Clear", wind: "10 mph SW", humidity: "47%" }
    }
  ]
};
