/* Citizens Bank Park — Philadelphia, Pennsylvania. Home of the Philadelphia
   Phillies. Concept: "The Brick District Grid." Controlling metaphor — a
   Philadelphia red-brick block inserted into the South Philadelphia
   sports-complex infrastructure grid. The right page is organized as a
   rowhouse-bay masonry system over a faint site-plan underlay: a carved stone
   lintel inscription across the top, three rowhouse bays (photos / facts /
   context) above a lifecycle foundation band, and a tall Visit "tower" bay on
   the right (Ashburn Alley destination signage).

   FACTUAL AUTHORITY: every value below is taken verbatim from the provided
   Citizens Bank Park brief. Nothing is invented, normalized, or pulled from
   memory. Fields marked n/a / blank in the brief (Name History, Succeeded By,
   Final Game, Demolition) are omitted entirely. First Visit == Featured Visit,
   so the date renders once.

   Palette: warm off-white paper, charcoal ink, multi-shade red brick, light
   stone / precast trim, granite gray, exposed-steel dark gray, field green;
   restrained Phillies red + blue as accents only. */
window.CBP = {
  /* ---- identity / hero title block (left page) ---- */
  stadium_name: "Citizens Bank Park",
  name_lines: ["CITIZENS BANK", "PARK"],
  name_one_line: "CITIZENS BANK PARK",
  city: "Philadelphia",
  state: "Pennsylvania",
  team_city: "PHILADELPHIA",
  team_name: "PHILLIES",
  league: "National League",
  division: "NL East",
  visit_order: 33,
  visits_to_park: 1,
  tagline: "A BRICK BLOCK IN THE SOUTH PHILADELPHIA SPORTS COMPLEX",

  /* ---- carved stone lintel inscription (right-page header course) ---- */
  lintel: [
    ["Team", "PHILLIES"],
    ["League", "National League"],
    ["Division", "NL East"],
    ["ERA", "Retro Classic"],
    ["Opened", "2004"],
    ["Years Active", "2004\u2013present"],
    ["Status", "Active"],
    ["Visit No.", "33 OF 42"]
  ],

  /* ---- Stadium Facts bay (museum tabular) ----
     [label, value, sub]  — sub renders as a small italic gloss. */
  facts: [
    ["Opened", "Apr 12, 2004", "groundbreaking Jun 28, 2001"],
    ["Capacity", "43,500 \u00b7 currently 42,901"],
    ["Surface", "Natural grass", "Riviera Bermuda outfield \u00b7 Kentucky bluegrass infield"],
    ["Roof", "Open air", "open-air, baseball-only ballpark"],
    ["Architect", "EwingCole \u00b7 HOK Sport"],
    ["Facade", "Red brick, precast / light-stone trim, granite & exposed steel"],
    ["Style", "Retro-classic sports-complex, Philly rowhouse & industrial cues"],
    ["All-Star Game", "2026"],
    ["Cost", "$458M (2004)", "$781M adjusted"],
    ["Financing", "Public\u2013private", "Phillies private + Philadelphia / state public"],
    ["Elevation", "20 ft"],
    ["Coordinates", "39.9058\u00b0 N, 75.1664\u00b0 W"],
    ["Location", "South Philadelphia sports complex"],
    ["Address", "1 Citizens Bank Way", "Philadelphia, PA 19148", 1]
  ],

  /* ---- field geometry (small protractor instrument) ---- */
  field: {
    left_field: "329",
    center_field: "401",
    right_field: "369",
    orientation: "N",
    degrees: 9
  },

  /* ---- material / facade cues (small key in the photo bay) ---- */
  materials: [
    ["#8E3B2F", "Red brick"],
    ["#D8CDB6", "Light stone"],
    ["#6E6A63", "Granite"],
    ["#46433E", "Exposed steel"],
    ["#5E7350", "Field green"]
  ],
  /* team colors — accent key only */
  team_colors: [
    ["#BA0C2F", "Red"],
    ["#284B9B", "Blue"],
    ["#FBF7EE", "White"]
  ],

  /* ---- lifecycle / evolution (foundation band) ---- */
  // stadium lineage — Phillies ballparks in order, ending at the current park.
  // Years sourced from existing project data (timeline-data.js). Recreation Park
  // has no year in our data, so its year is omitted per the no-invent rule.
  lineage: [
    { name: "Recreation Park", years: "1883\u20131886" },
    { name: "Baker Bowl", years: "1890\u20131938" },
    { name: "Shibe Park / Connie Mack Stadium", years: "1938\u20131970", ls: "-0.5px" },
    { name: "Veterans Stadium", years: "1971\u20132003" },
    { name: "Citizens Bank Park", years: "2004\u2013present", terminus: true }
  ],
  // ongoing upgrades — verbatim renovations sentence (from the brief) + category icons
  renovation_note: "Multimillion-dollar concourse expansions, fan-friendly social spaces, upgraded technology, and a redesigned Hall of Fame Club.",
  renovations: [
    { label: "Scoreboards", icon: "score" },
    { label: "Concessions", icon: "concession" },
    { label: "Seating", icon: "seating" },
    { label: "Outfield", icon: "outfield" },
    { label: "Club Spaces", icon: "club" },
    { label: "Social Spaces", icon: "social" },
    { label: "Technology", icon: "tech" }
  ],

  /* ---- featured visit / game (Ashburn Alley tower bay) ---- */
  visit: {
    no: 33,
    day: "Saturday",
    date: "May 4, 2019",
    title: "Group Visit",
    trip: "Northeast v2",
    home_team: "Philadelphia Phillies",
    home_abbr: "Phillies",
    away_team: "Washington Nationals",
    away_abbr: "Nationals",
    result: "Nationals 10, Phillies 8",
    attendance: "43,319",
    first_pitch: "7:28 PM EDT",
    night: true,
    duration: "3:45"
  },
  weather: {
    temperature: "70\u00b0",
    conditions: "Overcast",
    wind: "5 mph E",
    humidity: "77%"
  },
  pitching: {
    away_team: "WSH",
    away: "Patrick Corbin",
    home_team: "PHI",
    home: "Jake Arrieta",
    win: "Tony Sipp",
    loss: "Adam Morgan",
    save: "Sean Doolittle"
  },
  // line score — bats: WSH (away) on top, PHI (home) below
  box: {
    innings: 9,
    away: { abbr: "WSH", byInning: [1, 0, 1, 0, 1, 0, 2, 4, 1], r: 10, h: 13, e: 3 },
    home: { abbr: "PHI", byInning: [1, 1, 0, 1, 0, 0, 5, 0, 0], r: 8, h: 12, e: 2 }
  },

  /* ---- unified Stadium Context (verbatim, 4 paragraphs) ---- */
  stadium_context: [
    "Citizens Bank Park replaced Veterans Stadium by bringing Phillies baseball back down to scale without leaving the South Philadelphia sports complex. The Vet had embodied the multipurpose civic logic of the 1970s: large, shared, durable, and blunt. By 2004, the Phillies needed a baseball-specific park with better sightlines, stronger concessions, premium spaces, and a local identity that the circular concrete bowl could never provide.",
    "The site decision preserved the city\u2019s sports geography. Philadelphia did not move the Phillies into a downtown neighborhood or a riverfront redevelopment district. It kept baseball in the same sports-complex landscape, surrounded by the broader event infrastructure of South Philadelphia. That continuity makes Citizens Bank Park different from many retro-classic successors. It changed the building type more than the urban model.",
    "The architecture worked to soften and localize that setting. Brick, rowhouse and industrial cues, open-air baseball-only geometry, and outfield social spaces gave the park texture inside a district still shaped by parking, highways, and neighboring venues. The design bargain was clear: gain baseball intimacy and local reference while accepting that arrival and context would remain sports-complex rather than neighborhood-integrated.",
    "Later scoreboard, concession, seating, outfield, club, social-space, and technology upgrades have pushed the park further into the contemporary fan-experience economy. Citizens Bank Park matters because it shows that the rejection of the multipurpose era did not require abandoning the old stadium district. Philadelphia kept the geography of the Vet and replaced its architectural values, turning a site once dominated by shared concrete scale into a more particular home for baseball."
  ],

  /* ---- supporting photography — rowhouse-bay inserts, NO captions.
     [slot id, drop-guidance placeholder (disappears when filled), aspect] ---- */
  photos: [
    ["cbp-p1", "Brick & steel exterior \u2014 red-brick facade, light-stone trim, exposed steel", "3:4"],
    ["cbp-p2", "Liberty Bell scoreboard \u2014 outfield signal beyond the open-air bowl", "4:3"],
    ["cbp-p3", "Ashburn Alley \u2014 outfield promenade & social concourse", "4:3"],
    ["cbp-p5", "South Philadelphia sports complex \u2014 aerial: open-air bowl, parking fields, transit & highway arrival", "16:7"],
    ["cbp-p6", "Sports-complex context \u2014 ground-level approach, parking & neighboring venues", "16:7"]
  ]
};
