/* PNC Park — Pittsburgh, Pennsylvania.
   "Baseball framed by bridges." Local data only; every structured value
   appears exactly once in the layout. Charcoal + warm off-white + Pirates gold. */
window.PNC = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "PNC Park",
  city: "Pittsburgh",
  state: "Pennsylvania",
  classification_era: "Retro Classic",
  years_active: "2001\u2013Present",
  status: "Active",

  // ---- Stadium identity ribbon ----
  team_name: "Pittsburgh Pirates",
  league: "National League",
  league_abbr: "NL",
  division: "NL Central",
  visit_order: 25,
  coordinates_n: "40.4469\u00b0 N",
  coordinates_w: "80.0058\u00b0 W",
  capacity_opening: "38,362",

  // ---- Stadium facts (museum specification sheet) ----
  facts: [
    ["Opened", "April 9, 2001"],
    ["Construction Start", "Apr 7, 1999"],
    ["Renovations", "Scoreboard, club, premium seating, concessions, outfield, social-space, and technology upgrades"],
    ["Capacity", "38,362 opening \u00b7 38,747 current"],
    ["Surface", "Natural grass (Kentucky bluegrass)"],
    ["Architect", "HOK Sport and L.D. Astorino & Associates"],
    ["Type", "Open-air baseball-only ballpark"],
    ["Roof", "Open Air"],
    ["Location Type", "Riverfront; Urban"],
    ["Preceded By", "Recreation Park; Exposition Park; Forbes Field; Three Rivers Stadium"]
  ],

  // ---- Field geometry module ----
  field: {
    foul_lines: "325 ft",
    center_field: "399 ft",
    right_field: "320 ft",
    left_field: "325 ft",
    orientation: "ESE",
    orientation_degrees: 112,
    surface: "Kentucky bluegrass"
  },

  // ---- Address / colophon (left page metadata) ----
  address: "115 Federal Street, Pittsburgh, PA 15212",
  elevation: "730 ft",

  // ---- Construction & finance ----
  architectural_style: "Retro-classic riverfront ballpark with civic limestone architecture",
  facade_material: "Kasota limestone facade with brick bases, terra-cotta tile, masonry arches, and green steel",
  stadium_cost: "$216 million",
  stadium_cost_adjusted: "$393M",
  financing_method: "Publicly financed through Pennsylvania, Allegheny County, Pittsburgh, and stadium-authority sources, with Pirates lease / private participation",

  // ---- Historical context (museum wall text) ----
  context: [
    "PNC Park replaced Three Rivers Stadium with almost surgical clarity. The Pirates did not just move from one building to another; they moved from the multipurpose era\u2019s shared concrete logic to one of the most distilled examples of the retro-classic ballpark. Three Rivers had offered scale, football compatibility, and public infrastructure. PNC offered baseball first.",
    "The riverfront site gave the new park a strong civic frame, but unlike Three Rivers, the building did not treat the rivers as scenery around a generic bowl. Its limestone facade, masonry arches, terra-cotta tile, brick bases, and green steel were composed to make the ballpark feel specific to Pittsburgh\u2019s bridges, topography, and civic materials. The site and architecture worked together rather than competing for attention.",
    "The design bargain favored intimacy over capacity. PNC opened with fewer seats than many older parks, but gained sightlines, proportion, and a direct relationship between the field and the city beyond it. That choice reflected a broader shift in MLB economics: a smaller, better-designed park with premium areas and strong identity could be more valuable than a larger multipurpose stadium. Later scoreboard, club, seating, concession, outfield, social-space, and technology upgrades have expanded the park\u2019s contemporary functions without undoing its compact character.",
    "PNC Park matters because it represents the retro-classic movement at its most disciplined. It is not simply old-fashioned styling applied to a new facility. It is a direct answer to what Three Rivers could not provide: a baseball-specific room where site, skyline, bridges, materials, and field geometry reinforce one another."
  ],

  // ---- Visit section / featured game ----
  featured_title: "Group Visit",
  trip_name: "Ohio/Pennsylvania",
  featured_day: "Friday",
  featured_date: "Sep 23, 2011",
  visit_count: "1",
  away_team: "Cincinnati Reds",
  away_abbr: "CIN",
  home_team: "Pittsburgh Pirates",
  home_abbr: "PIT",
  starter_away: "Edinson Volquez",
  starter_home: "Jeff Locke",
  result_line: "Pirates 4, Reds 3",
  attendance: "23,632",
  first_pitch: "7:06 PM EDT",
  winning_pitcher: "Joel Hanrahan",
  losing_pitcher: "Bill Bray",
  time_of_game: "3:22",

  // ---- Line score (vintage newspaper grid) ----
  box: {
    innings: 9,
    away: { abbr: "REDS", byInning: [0, 0, 0, 0, 1, 1, 0, 0, 1], r: 3, h: 11, e: 0 },
    home: { abbr: "PIRATES", byInning: [0, 2, 1, 0, 0, 0, 0, 0, 1], r: 4, h: 8, e: 0 }
  },

  // ---- Weather module ----
  weather: {
    temperature: "64\u00b0F",
    conditions: "Light Drizzle",
    wind: "WNW 7 MPH",
    humidity: "98%"
  },

  // ---- Color system (surfaced for swatch key) ----
  colors: {
    paper: { name: "Off-White", hex: "#E8E3D6" },
    ink: { name: "Charcoal", hex: "#1C1B19" },
    gold: { name: "Pirates Gold", hex: "#C79A2E" }
  }
};
