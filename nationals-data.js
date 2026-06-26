/* nationals-data.js — Nationals Park, Washington, D.C.
   Concept: "Civic Grid / River Edge" — a permanent civic ballpark anchoring the
   Navy Yard / Capitol Riverfront redevelopment district. FACTUAL AUTHORITY is the
   Codex brief; concept renderings are visual direction only. Local data only;
   every populated value appears once. Limestone + charcoal + navy, red as accent. */
window.NATS = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Nationals Park",
  city: "Washington, D.C.",
  classification_era: "Ballpark District",
  years_active: "2008\u2013Present",
  status: "Active",

  // ---- Stadium identity ribbon ----
  team_name: "Washington Nationals",
  league: "National League",
  league_abbr: "NL",
  division: "NL East",
  visit_order: 30,
  coordinates_n: "38.8728\u00b0 N",
  coordinates_w: "77.0075\u00b0 W",

  // ---- Stadium facts (museum catalogue) ----
  facts: {
    capacity: "41,373",
    capacity_note: "originally 41,888",
    opened: "March 30, 2008",
    surface: "Natural Grass",
    surface_note: "Kentucky Bluegrass",
    elevation: "25 ft",
    elevation_note: "above sea level",
    team: "Washington Nationals",
    league_line: "National League \u00b7 East",
    roof: "Open Air",
    type: "Baseball-only ballpark"
  },

  // ---- Field geometry module (protractor) ----
  field: {
    left_field: "337 ft",
    center_field: "402 ft",
    right_field: "335 ft",
    orientation: "NNE",
    orientation_degrees: 28
  },

  // ---- Construction & district ledger ----
  architect: "Populous and Devrouax & Purnell Architects",
  facade_material: "Glass and steel facade with precast concrete civic massing",
  architectural_style: "Contemporary sustainable urban ballpark",
  stadium_cost: "$693M",
  stadium_cost_adjusted: "$1.04B",
  financing_method: "Almost entirely publicly financed by the District of Columbia through public bonds and stadium-related taxes",
  construction_start: "May 4, 2006",
  preceded_by: "Robert F. Kennedy Memorial Stadium",
  renovations: "Scoreboard, social-space, club, seating, concessions, and neighborhood-access upgrades",
  all_star: "2018",
  address: "1500 S Capitol Street SE, Washington, DC 20003",
  location_type: "Riverfront; Urban",
  elevation: "25 ft",

  // ---- Stadium context (one unified body, paragraph breaks intact) ----
  context: [
    "Nationals Park was built to turn Washington\u2019s restored MLB franchise from a temporary arrangement into a permanent civic presence. RFK Stadium could hold the team after baseball returned to the city, but it was a multipurpose holdover, not a long-term home. The new park gave the Nationals a baseball-specific building and tied the franchise to the redevelopment of the Anacostia riverfront.",
    "The site choice mattered as much as the architecture. By placing the ballpark in the Navy Yard and Capitol Riverfront area, Washington used baseball as part of a larger urban transformation. The stadium was not asked merely to host games; it was expected to help anchor new streets, housing, entertainment, and waterfront activity. That role placed it within the contemporary mixed-use era rather than the earlier retro-classic model of charm and enclosure alone.",
    "Architecturally, Nationals Park took a restrained modern approach. Limestone-toned civic materials, open-air form, riverfront orientation, and modern infrastructure gave the building a Washington character without leaning heavily on nostalgic imitation. It gained flexibility, public visibility, and development leverage, while sacrificing some of the immediate intimacy and texture associated with older or more richly detailed retro parks.",
    "Later scoreboard, social-space, club, seating, concession, and neighborhood-access upgrades reflect the way the surrounding district matured around the ballpark. Nationals Park matters because it shows a newer stadium logic: the park as a permanent home for a restored franchise and as an instrument of riverfront redevelopment. Its success is measured not only by the seating bowl, but by how thoroughly the city grew into the site around it."
  ],

  // ---- Visit section / featured game ----
  featured_title: "Group Visit",
  trip_name: "Northeast v2",
  featured_day: "Wednesday",
  featured_date: "May 1, 2019",
  away_team: "St. Louis Cardinals",
  away_abbr: "STL",
  home_team: "Washington Nationals",
  home_abbr: "WSH",
  starter_away: "Miles Mikolas",
  starter_home: "Max Scherzer",
  result_line: "Cardinals 5 Nationals 1",
  attendance: "22,157",
  first_pitch: "7:05 PM EDT",
  winning_pitcher: "Miles Mikolas",
  losing_pitcher: "Max Scherzer",
  time_of_game: "3:02",

  // ---- Line score ----
  box: {
    innings: 9,
    away: { abbr: "CARDINALS", byInning: [3, 0, 0, 0, 0, 0, 0, 2, 0], r: 5, h: 11, e: 0 },
    home: { abbr: "NATIONALS", byInning: [0, 0, 0, 1, 0, 0, 0, 0, 0], r: 1, h: 9, e: 1 }
  },

  // ---- Weather module ----
  weather: {
    temperature: "72\u00b0",
    conditions: "Partly Cloudy",
    wind: "8 mph E",
    humidity: "73%"
  }
};
