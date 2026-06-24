/* Angel Stadium of Anaheim — Anaheim, California. Home of the Angels.
   Concept: "Freeway Landmark." The Big A — roadside sign, scoreboard memory,
   civic wayfinding mast, regional arrival marker for Orange County — is the
   organizing device for the whole spread. Its geometry (mast, crossbar, halo,
   triangular A-brace) governs the grid, the title lockup, the metadata
   alignment, the section dividers and the photo rhythm. The right page reads as
   an architectural survey panel hung off a vertical mast; the lifecycle is three
   compact structural strata; the Visit reads as a typographic scoreboard.

   FACTUAL AUTHORITY: every value below is taken verbatim from the provided
   Anaheim Stadium Codex packet. The ChatGPT concept render is VISUAL DIRECTION
   ONLY and contains wrong values (Opened "Apr 19 1966"; Surface "Kentucky
   Bluegrass"; dims 330/400/330; elevation "206 ft"; invented structural
   engineer; First Opponent "Kansas City Athletics"; a 2024 Angels-vs-Rangers
   line score). NONE are copied. Empty / n/a fields (Succeeded By, Final Game,
   Demolition) are omitted entirely. */
window.ANAHEIM = {
  /* ---- identity ---- */
  stadium_name: "Angel Stadium",
  stadium_full: "Angel Stadium of Anaheim",
  city: "Anaheim",
  state: "California",
  team: "Angels",
  league: "American League",
  division: "AL West",
  visit_order: 6,
  visit_total: 42,
  visits_here: 2,
  coords_line: "33.8006\u00b0 N  117.8834\u00b0 W",
  est_line: "Anaheim, California \u00b7 Est. 1966",

  /* ---- Stadium Section — survey rail hung off the Big A mast ----
     Long-form values folded compactly per the Codex examples. Orientation
     lives with the field instrument; Name History / Preceded By go to the
     footnote rail. */
  spec: [
    ["Status", "Active"],
    ["Years Active", "1966\u2013Present"],
    ["Opened", "Apr 9, 1966"],
    ["Construction", "Began 1964"],
    ["Address", "2000 E Gene Autry Way\nAnaheim, California"],
    ["Location", "Suburban"],
    ["Coordinates", "33.8006\u00b0 N, 117.8834\u00b0 W"],
    ["Elevation", "148 ft"],
    ["Capacity", "45,517 (originally 43,204)"],
    ["All-Star Games", "1967, 1989, 2010"],
    ["Surface", "Natural grass (Tifway 419 Bermuda Grass)"],
    ["Cost", "$24 million ($240M adj.)"],
    ["Architect", "Noble W. Herzberg and Associates"],
    ["Renovation", "HOK Sport, Robert A.M. Stern Architects, and Walt Disney Imagineering", { letterSpacing: "-0.1px" }],
    ["Financing", "Publicly financed by the City of Anaheim"],
    ["Renovation Funding", "Disney/Angels and city participation"]
  ],

  /* ---- overall classification / descriptive era (caption beneath the strata) ---- */
  classification: {
    era: "Modern Baseball-Specific",
    type: "Open-air baseball stadium; former multipurpose stadium",
    style: "Expansion-era modern stadium with Disney retro entertainment renovation",
    facade: "Concrete, stucco, and steel",
    later: "Video, lighting, seating, and technology upgrades"
  },

  /* ---- footnote rail beneath the survey ---- */
  footnotes: [
    ["Preceded By", "Los Angeles Wrigley Field (1961)\nDodger Stadium* (1962-1965)"],
    ["Name History", "Anaheim Stadium (1966-1997)\nEdison Intl. Field of Anaheim (1998-2003)\nAngel Stadium of Anaheim (2004-present)"]
  ],

  /* ---- asterisk note rendered beneath the footnote rail ---- */
  footnote_note: "* Referred to by Angels as \u201CChavez Ravine Stadium\u201D",

  /* ---- field instrument (protractor): Northeast, 43.61 deg ---- */
  field: { left_field: "347", center_field: "396", right_field: "350", orientation: "Northeast", abbr: "NE", degrees: 43.61 },

  /* ---- the three architectural lives — compact structural strata (crossbar) ----
     Descriptors drawn only from the provided Renovations field + Stadium Context;
     nothing invented. */
  lifecycle: [
    ["1966-78", "Expansion Era", "Open-outfield baseball park; broad seating bowl geometry; the landmark Big A scoreboard on an expansive suburban parking field."],
    ["1979\u201395", "Multipurpose Era", "Outfield enclosed for the Los Angeles Rams; baseball capacity expanded beyond 64,000; Big A scoreboard moved to freeway-adjacent parking lot."],
    ["1996\u2013present", "Retro-Classic Renaissance", "Disney-era baseball-only renovation; outfield reopened; left-field rock formation added; adoption of green and sandstone aesthetic."]
  ],

  /* ---- supporting photo panels — mounted roadside sign panels, ~4:3 / 3:4.
     No captions render; subject text is drop-guidance only. ---- */
  panels: [
    ["anaheim-p1", "Big A landmark \u2014 the freeway-era roadside sign / scoreboard mast and halo, the regional arrival marker for Orange County."],
    ["anaheim-p2", "Site & infrastructure \u2014 the ballpark above its surface parking fields and freeway approach; suburban, automobile-oriented arrival."],
    ["anaheim-p3", "Seating bowl \u2014 the broad open-air expansion-era bowl and outfield, read against freeways and low Southern California fabric."],
    ["anaheim-p4", "Disney-era face \u2014 the rebuilt gate / exterior or the left-field rock formation from the 1996\u201398 baseball-only renovation."]
  ],

  /* ---- unified Stadium Context (verbatim, 4 paragraphs) ---- */
  stadium_context: [
    "Anaheim Stadium was built so the Angels could stop being guests in someone else\u2019s baseball story. After beginning at Los Angeles Wrigley Field and then Dodger Stadium, the franchise needed a permanent home separate from the Dodgers\u2019 civic and architectural shadow. Anaheim offered land, room, and a different Southern California identity: suburban, automobile-oriented, and tied to Orange County\u2019s rapid postwar growth rather than to downtown Los Angeles.",
    "The original stadium made sense as an expansion-era building. It was open-air, modern, and regional in its assumptions, with a large site that could welcome fans by car and give Anaheim a major-league address of its own. It did not try to reproduce an older neighborhood ballpark. It treated baseball as part of a new suburban civic landscape, where access and identity came through highways, parking, and the emerging entertainment geography around Anaheim.",
    "The building\u2019s later history is what makes it especially revealing. The 1979-1981 Rams conversion enclosed and enlarged the stadium, bending it toward the multipurpose logic of football capacity and shared use. That change made the venue more efficient as an event container but less distinct as a baseball setting. Then the 1996-1998 Disney-era renovation reversed much of that enclosure, restoring a baseball-only feel while adding themed entertainment elements and premium infrastructure.",
    "Few active MLB parks show so clearly how one structure can pass through several stadium eras. Anaheim Stadium began as a suburban expansion park, became a football-influenced multipurpose bowl, then was renovated into a retro-era entertainment venue without losing its original site. Its importance comes from that layering. The Angels\u2019 home is not pure, and that is exactly why it is useful: it records how baseball\u2019s expectations kept changing around the same concrete frame."
  ],

  /* ---- Visit / trip ---- */
  visit: {
    no: 6, total: 42, here: 2,
    trip: "Southern California",
    other_visits: ["2006"]
  },

  /* ---- featured game — Aug 17, 1986, the first visit ---- */
  game: {
    title: "First Visit",
    day: "Sunday", date: "Aug 17, 1986", type: "Day",
    home_city: "California", home_name: "Angels", home_abbr: "CAL", home_score: "7",
    away_city: "Oakland", away_name: "Athletics", away_abbr: "OAK", away_score: "3",
    first_pitch: "1:05 PM PDT", attendance: "28,504", duration: "3:10",
    home_starter: "Don Sutton", away_starter: "Joaquin Andujar",
    win: "Don Sutton", loss: "Joaquin Andujar", save: "Gary Lucas",
    box: {
      innings: 9,
      away: { abbr: "OAK", byInning: ["0","1","0","1","0","0","0","0","1"], r: "3", h: "9", e: "2" },
      home: { abbr: "CAL", byInning: ["1","0","1","0","0","2","1","2","x"], r: "7", h: "12", e: "0" }
    },
    weather: { temperature: "83\u00b0", conditions: "Clear", wind: "11 mph WSW", humidity: "51%" }
  }
};
