/* marlins-data.js — Marlins Park / loanDepot park, Miami, Florida.
   "Climate Vessel" — a precision-engineered white environmental shell floating
   inside humid Miami air. The retractable-roof geometry drives the grid; Miami
   Art Deco signage proportions drive the title; climate-control architecture
   drives the information hierarchy.

   FACTUAL AUTHORITY: the Marlins Park Codex payload only. No invented facts,
   no values pulled from memory/web, none copied from the concept render (whose
   surface/renovations/attendance/time/weather are all wrong). n/a fields omitted. */
window.MARLINS = {
  // ---- Identity (hero title block, left page) ----
  stadium_name: "Marlins Park",
  current_name: "loanDepot park",
  city: "Miami",
  state: "Florida",
  est: "2012",
  years_active: "2012\u2013Present",
  roof: "Retractable",
  location_type: "Urban",

  // ---- Identity ribbon ----
  team_short: "Marlins",
  team_name: "Miami Marlins",
  league: "National League",
  league_short: "NL",
  division: "NL East",
  division_short: "NL East",
  classification_ribbon: "Modern Baseball-Specific",
  status: "Active",
  visit_order: 27,
  visit_total: 42,
  coordinates: "25.7781\u00b0 N, 80.2197\u00b0 W",

  // ---- Stadium Facts (structural spec) ----
  facts: [
    ["Opened", "April 4, 2012"],
    ["Construction Start", "Jul 1, 2009"],
    ["Opening Capacity", "36,742"],
    ["Current Capacity", "37,442"],
    ["Surface", "Mixed / changed over time", "Celebration bermudagrass 2012; Platinum TE paspalum 2014\u20132019; Shaw Sports Turf B1K since 2020"],
    ["Type", "Retractable-roof baseball-only ballpark"],
    ["Roof", "Retractable"],
    ["Location", "Urban"],
    ["Elevation", "10 ft"],
    ["Address", "501 Marlins Way, Miami, FL 33125"],
    ["Coordinates", "25.7781\u00b0 N, 80.2197\u00b0 W"],
    ["Original Cost", "$634 million", "$889 million adjusted"]
  ],

  // ---- Design & Lifecycle (design facts) ----
  lifecycle: [
    ["Architect", "Populous"],
    ["Architectural Style", "Contemporary neomodern retractable-roof ballpark"],
    ["Facade", "White stucco, silver metal, exposed steel, and extensive glass facade / retractable panels"],
    ["Name History", "Marlins Park (2012\u20132020)\nloanDepot park (2021\u2013Present)"],
    ["Preceded By", "Pro Player Stadium / Sun Life Stadium"],
    ["Renovations", "Home-run sculpture removed; seating, scoreboard, club, field, and fan-space updates"],
    ["Financing", "Public-private; Miami-Dade County and City of Miami public bonds, with a Marlins private contribution"]
  ],

  // ---- Field geometry ----
  field: {
    left_field: "344 ft",
    center_field: "400",
    right_field: "335 ft",
    orientation: "SE",
    degrees: 128
  },

  // ---- Visit information (27 of 42) ----
  visit: [
    ["First Visit", "Saturday \u00b7 May 26, 2018"],
    ["Trip", "Florida / Georgia"],
    ["Matchup", "Washington Nationals at Miami Marlins"],
    ["Result", "Nationals 4, Marlins 1"],
    ["Attendance", "11,646"],
    ["First Pitch", "4:10 PM EDT"]
  ],

  // ---- Weather (first visit) ----
  weather: {
    temperature: "72\u00b0",
    conditions: "Rain",
    wind: "17 MPH ENE",
    humidity: "87%"
  },

  // ---- Line score ----
  game_day: "Sat",
  game_date: "May 26, 2018",
  game_title: "Group Visit",
  game_duration: "2:56",
  box: {
    innings: 9,
    away: { abbr: "WSH", byInning: [0, 0, 0, 0, 0, 0, 0, 1, 3], r: 4, h: 7, e: 1 },
    home: { abbr: "MIA", byInning: [0, 0, 0, 1, 0, 0, 0, 0, 0], r: 1, h: 6, e: 0 }
  },
  away_starter: "Tanner Roark",
  home_starter: "Wei-Yin Chen",
  winning_pitcher: "Justin Miller",
  winning_team: "WSH",
  losing_pitcher: "Brad Ziegler",
  losing_team: "MIA",
  save_pitcher: "Sean Doolittle",
  save_team: "WSH",

  // ---- Stadium Context (one unified block, museum exhibit copy) ----
  stadium_context: [
    "Marlins Park was built to solve a problem the franchise had carried since its beginning: the Marlins were playing baseball in a football stadium, in a climate that made open-air summer baseball difficult, with no permanent architectural identity of their own. Moving from Pro Player Stadium and Sun Life Stadium to a retractable-roof park in Miami gave the club control over weather, revenue spaces, and presentation.",
    "The site on the former Orange Bowl footprint in Little Havana made the project civic as well as architectural. Rather than move to a suburban sports complex, Miami placed the park in an urban setting west of downtown. That choice gave the building a public role, but also placed it inside the politics and expectations that come with a publicly financed stadium trying to anchor more than baseball.",
    "The design bargain was deliberately unlike the brick retro parks that preceded it. White modern surfaces, a retractable roof, climate control, large glass walls, and a sculptural contemporary form gave the building a Miami-specific image. It gained comfort and technical control, but its scale, financing, and highly managed interior made it feel less like a continuation of older ballpark traditions than a new kind of enclosed entertainment object.",
    "The later removal of the home-run sculpture and updates to seating, scoreboards, clubs, field, and fan spaces show the park being refined after the first version proved too specific in some ways and not settled enough in others. Marlins Park matters because it exposes a different route for contemporary stadium design: not retro intimacy, but climate, spectacle, and civic controversy wrapped into one controlled environment."
  ],

  // ---- Supporting image bay (right page roof cassettes) ----
  strip: [
    ["marlins-s1", "Drop the exterior shell \u2014 white stucco, silver metal & glass facade with the retractable roof closed"],
    ["marlins-s2", "Drop the seating bowl \u2014 interior under the roof, field & color-cut seats"],
    ["marlins-s3", "Drop the glass facade / concourse \u2014 curtain-wall daylight, left-field windows"]
  ]
};
