/* shea-data.js — Shea Stadium, Queens, New York (Mets, 1964–2008).
   AUTHORITATIVE SOURCE: the user-provided Codex factual packet + the featured
   line score. The ChatGPT render was SKIPPED and is not a source. No facts,
   labels, numbers, scores, or captions were invented, normalized from memory,
   or pulled from the web. Every populated value below is mapped once, verbatim.
   Fields the source marks n/a / absent (e.g. Name History) are OMITTED. */
window.SHEA = {
  // ---- Identity (left-page hero) ----
  stadium_name: "Shea Stadium",
  city: "Queens",
  state: "New York",
  years_active: "1964\u20132008",
  stadium_type: "Open-air multipurpose stadium",
  status: "Demolished",

  // ---- Team / classification ----
  team_name: "New York Mets",
  team_short: "Mets",
  league: "National League",
  division: "NL East",
  classification_era: "Multipurpose Shared Use",
  era_short: "World\u2019s Fair Color-Panel Bowl",
  roof_type: "Open Air",
  location_classification: "Parkland-adjacent",

  // ---- Stadium facts (verbatim) ----
  opened: "1964",
  opening_day: "Apr 17, 1964",
  construction_start: "Oct 28, 1961",
  final_game: "Sep 28, 2008",
  demolition_year: "2009",
  architect: "Praeger-Kavanagh-Waterbury",
  architectural_style: "1960s modern multipurpose stadium with World\u2019s Fair-era color-panel fa\u00e7ade",
  stadium_type_facts: "Open-air multipurpose stadium",
  facade: "Reinforced concrete and steel with blue-and-orange exterior steel panels",
  surface_type: "Natural grass",
  surface: "Kentucky bluegrass",
  capacity_opening: "55,300",
  capacity_current: "60,372",
  elevation: "10 ft",
  coordinates: "40.7556\u00b0 N, 73.8481\u00b0 W",
  address_line1: "123-01 Roosevelt Avenue",
  address_line2: "Flushing, NY 11368",
  address_line3: "(former site)",
  location: "Parkland-adjacent",
  all_star_games: "1964",
  team_colors: "Royal Blue \u00b7 Orange \u00b7 White",

  // ---- Construction & finance ----
  original_cost: "$28.5 million",
  adjusted_cost: "$296 million",
  financing: "Publicly financed and owned by New York City as a municipal stadium",
  renovations: "Scoreboard, seating, luxury, lighting, field, and amenity upgrades across Mets and Jets tenancies",

  // ---- Lineage ----
  preceded_by: "Polo Grounds",
  succeeded_by: "Citi Field",

  // ---- Field geometry ----
  left_field_distance: "338 ft",
  center_field_distance: "410 ft",
  right_field_distance: "338 ft",
  orientation: "ENE",
  orientation_degrees: 67.5,

  // ---- Visit record ----
  visit_order: 8,
  visit_count: 2,
  first_visit_date: "Aug 7, 1987",
  first_visit_day: "Friday",
  first_visit_matchup: "Chicago Cubs at New York Mets",
  first_visit_result: "Mets 7, Cubs 1",
  first_visit_wp: "Ron Darling",
  first_visit_lp: "Rick Sutcliffe",
  featured_visit_day: "Thursday",
  featured_visit_date: "Aug 16, 1990",
  visit_type: "Group Visit",
  trip_name: "Northeast",
  game_kind: "Day Game",
  attendance: "41,715",
  innings_played: 9,

  // ---- The featured game (Aug 16, 1990) ----
  game: {
    title: "Los Angeles Dodgers at New York Mets",
    home_abbr: "NYM", away_abbr: "LAD",
    home_name: "Mets", away_name: "Dodgers",
    home_full: "New York Mets", away_full: "Los Angeles Dodgers",
    home_runs: 4, away_runs: 1,
    result_line: "Mets 4, Dodgers 1",
    first_pitch: "1:35 PM EDT",
    duration: "2:32",
    home_starter: "Ron Darling", away_starter: "Tim Belcher",
    winning_pitcher: "Ron Darling", losing_pitcher: "Tim Belcher",
    save_pitcher: "John Franco",
    weather: { temperature: "82\u00b0", conditions: "Overcast", wind: "4 mph SSW", humidity: "51%", sky: "cloud" },
    box: {
      away: { abbr: "LAD", byInning: ["0","1","0","0","0","0","0","0","0"], r: 1, h: 10, e: 0 },
      home: { abbr: "NYM", byInning: ["0","0","0","2","1","1","0","0","x"], r: 4, h: 9, e: 0 }
    }
  },

  // ---- Team colors (restrained accent / small material key) ----
  colors: {
    blue:   { name: "Royal Blue", hex: "#0A2E73" },
    orange: { name: "Orange",     hex: "#E8531A" },
    white:  { name: "White",      hex: "#FFFFFF" }
  },

  // ---- Material / memory cues (slim bottom rail) ----
  cues: [
    { t: "Color Panels", s: "Blue / Orange Steel" },
    { t: "Concrete & Steel", s: "Reinforced Bowl" },
    { t: "Multipurpose", s: "Mets / Jets Open Air" },
    { t: "Flushing Meadows", s: "World\u2019s Fair Grounds" },
    { t: "Transit & Parkway", s: "Regional Access" },
    { t: "Demolished", s: "2009" }
  ],

  // ---- Stadium Context (verbatim, one unified block w/ paragraph breaks) ----
  stadium_context: [
    "Shea Stadium was built to restore National League baseball to New York after the departures of the Dodgers and Giants to California, but it also belonged to a broader 1960s faith in large public facilities. The Mets needed a permanent home to replace the outdated Polo Grounds, and the city wanted a stadium that could serve more than baseball. The result was a colorful, modern, multipurpose venue tied to Queens, parkland, and the World\u2019s Fair-era image of metropolitan progress.",
    "Its Flushing Meadows setting placed baseball in a civic landscape rather than a traditional neighborhood. That choice made sense for a city thinking at metropolitan scale: parkways, open land, public events, and shared facilities all mattered. Shea gave the Mets their own address, but it did so in a setting defined by circulation and public grounds rather than by the close street texture that had shaped older New York ballparks.",
    "The building\u2019s compromises were visible from the beginning. Its open-air multipurpose form could accommodate baseball and football, and its color-panel fa\u00e7ade gave the exterior a distinctive 1960s optimism. Yet baseball had to live inside a geometry designed for flexibility. Scoreboard, seating, luxury, lighting, field, and amenity upgrades helped the stadium age with the Mets and Jets, but they could not turn Shea into a baseball-specific park.",
    "Citi Field replaced it in 2009 as part of MLB\u2019s larger turn away from multipurpose scale and toward curated baseball identity. The successor kept the Mets in the same broad district while reducing the sense of sheer municipal apparatus. Shea matters because it captured a moment when New York\u2019s answer to baseball loss was not nostalgia, but a big public structure for a new borough identity. Its demolition marked the end of that confidence and the rise of a more controlled, historically referential stadium culture."
  ]
};
