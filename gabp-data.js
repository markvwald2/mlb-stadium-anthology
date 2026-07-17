/* gabp-data.js — Great American Ball Park, Cincinnati, Ohio.
   "Riverboat Reds Frame." Cincinnati baseball on the Ohio River.
   FACTUAL AUTHORITY: the Codex brief only. Every populated value appears
   exactly once across the layout (ribbon / facts / footer / left page) so
   nothing is repeated unnecessarily. Empty / n/a fields are omitted. */
window.GABP = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Great American Ball Park",
  city: "Cincinnati",
  state: "Ohio",
  classification_era: "Retro Classic",
  years_active: "2003\u2013Present",
  status: "Active",

  // ---- Team / league ----
  team_name: "Cincinnati Reds",
  league: "National League",
  league_abbr: "NL",
  division: "NL Central",
  visit_order: 24,

  // ---- Left-page colophon (identity headline stats) ----
  coordinates_n: "39.0975\u00b0 N",
  coordinates_w: "84.5067\u00b0 W",
  elevation: "490 ft",
  address: "100 Joe Nuxhall Way, Cincinnati, OH 45202",

  // ---- Right-page metadata ribbon (8 cells) ----
  ribbon: [
    ["Opened", "Mar 31, 2003"],
    ["Capacity", "42,271 \u2192 42,319"],
    ["Years Active", "2003\u2013Present"],
    ["Surface", "Natural Grass"],
    ["Type", "Open-Air Baseball"],
    ["Roof", "Open Air"],
    ["Era", "Retro Classic"],
    ["Original Cost", "$290M \u00b7 $508M adj."]
  ],

  // ---- Stadium Facts (museum specification sheet) ----
  facts: [
    ["Construction Start", "Aug 1, 2000"],
    ["Architect", "HOK Sport \u00b7 GBBN \u00b7 Moody Nolan"],
    ["Surface", "Perennial ryegrass mixture"],
    ["Facade", "Brick & cast stone/sandstone base, white-painted steel, and glass"],
    ["Style", "Retro-contemporary riverfront ballpark"],
    ["Financing", "Public\u2013private; Hamilton County sales-tax / public funds with Reds private share"],
    ["Renovations", "Scoreboard, club, seating, concessions, social-space, and riverfront district upgrades"]
  ],

  // ---- Reds home-grounds lineage (oldest to immediate predecessor) ----
  preceded_by: [
    "Union Grounds (1869\u201370)",
    "Avenue Grounds (1876\u201379)",
    "Bank Street Grounds (1880\u201383)",
    "League Park (1884\u20131901)",
    "Palace of the Fans (1902\u201311)",
    "Crosley Field (1912\u201370)",
    "Riverfront Stadium (1970\u20132002)",
    "Great American Ball Park (2003\u2013 )"
  ],

  // ---- Field geometry module (protractor) ----
  field: {
    left_field: "328 ft",
    center_field: "404 ft",
    right_field: "325 ft",
    orientation: "ESE",
    orientation_degrees: 122
  },

  // ---- Footer river band (classification chips) ----
  footer: [
    ["Classification Era", "Retro Classic", "era"],
    ["Status", "Active", "status"],
    ["League", "National League", "league"],
    ["Division", "NL Central", "division"],
    ["Location", "Riverfront \u00b7 Downtown", "location"],
    ["River", "Ohio River", "river"]
  ],

  // ---- Stadium Context (one unified text block, 4 paragraphs) ----
  context: [
    "Great American Ball Park replaced Riverfront Stadium without leaving Cincinnati\u2019s riverfront story behind. That is the key to understanding it. The Reds did not need a new geographic identity as much as a new architectural one. Riverfront had made sense as a shared concrete civic platform for baseball and football, but by the early 2000s its multipurpose symmetry, artificial turf inheritance, and large all-purpose scale no longer fit MLB\u2019s direction.",
    "The new park kept baseball on the banks of the Ohio River while changing the meaning of that location. Instead of a circular stadium designed for conversion, Great American Ball Park offered an open-air baseball-only form with industrial and riverboat references, brick facades, cast stone, glass, and white-painted steel. The setting remained downtown and riverfront, but the experience became more particular to the Reds and to baseball.",
    "The design bargain was typical of the retro-classic period but locally inflected. Cincinnati gained asymmetry, better intimacy, premium spaces, riverfront views, and a stronger connection to team history. It also became part of a broader downtown riverfront development environment, where plazas, garages, bridge movement, and neighboring venues all shaped arrival. Later scoreboard, club, seating, concession, social-space, and district upgrades have continued that evolution.",
    "Great American Ball Park matters because it shows that replacing a multipurpose stadium did not always mean rejecting the old site. Sometimes the correction was architectural rather than geographic. Cincinnati kept the river and changed the container, turning the same civic edge from a shared concrete apparatus into a ballpark that could carry local references and modern baseball economics at once."
  ],

  // ---- Visit Information ----
  visit: {
    first_visit: "Sep 21, 2011",
    trip_name: "Ohio/Pennsylvania",
    featured_title: "Group Visit",
    attendance: "20,875",
    first_pitch: "12:35 PM EDT",
    duration: "2:12",
    game_type: "Day"
  },

  // ---- Featured game ----
  game: {
    date_full: "Sep 21, 2011",
    day: "Wednesday",
    home_abbr: "REDS",
    away_abbr: "ASTROS",
    home_full: "Cincinnati Reds",
    away_full: "Houston Astros",
    home_runs: 2,
    away_runs: 0,
    winning_pitcher: "Bronson Arroyo",
    losing_pitcher: "Wandy Rodriguez",
    home_starter: "Bronson Arroyo",
    away_starter: "Wandy Rodriguez"
  },

  // ---- Line score (HOU top, CIN bottom; home did not bat in 9th) ----
  box: {
    innings: 9,
    away: { abbr: "HOU", byInning: [0, 0, 0, 0, 0, 0, 0, 0, 0], r: 0, h: 6, e: 1 },
    home: { abbr: "CIN", byInning: [1, 1, 0, 0, 0, 0, 0, 0, "x"], r: 2, h: 5, e: 1 }
  },

  // ---- Weather ----
  weather: {
    temperature: "68\u00b0F",
    conditions: "Drizzle",
    wind: "SSW 7 MPH",
    humidity: "95%"
  }
};
