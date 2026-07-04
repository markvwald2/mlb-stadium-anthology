/* veterans-data.js — Veterans Stadium, Philadelphia.
   Authoritative source: the user-provided Codex prompt + featured-game CSV row.
   The ChatGPT concept render is VISUAL DIRECTION ONLY — no facts/labels/numbers
   were taken from it (its capacity, architect, renovations, attendance, and
   weather were hallucinated and are NOT used here). Every populated structured
   value is mapped once, verbatim. Fields marked n/a in the source (Save) are
   OMITTED, never invented. */
window.VETERANS = {
  // ---- Identity (left-page hero) ----
  stadium_name: "Veterans Stadium",
  city: "Philadelphia",
  state: "Pennsylvania",
  years_active: "1971\u20132003",
  stadium_type: "Open-air octorad multipurpose stadium",
  status: "Demolished",

  // ---- Team / classification ----
  team_name: "Philadelphia Phillies",
  team_short: "Phillies",
  league: "National League",
  division: "NL East",
  classification_era: "Multipurpose Shared Use",
  classification_short: "Multipurpose Era \u00b7 Turf & Concrete",
  roof_type: "Open Air",
  location_classification: "Sports-complex",

  // ---- Stadium facts (verbatim) ----
  opened: "1971",
  opening_day: "Apr 10, 1971",
  construction_start: "Oct 2, 1967",
  final_game: "Sep 28, 2003",
  demolition_year: "2004",
  architect: "Hugh Stubbins and Associates",
  architectural_style: "Brutalist modern multipurpose concrete stadium",
  stadium_type_facts: "Open-air octorad multipurpose stadium",
  facade: "Exposed reinforced / precast concrete circular octorad bowl",
  surface_type: "Artificial",
  surface: "AstroTurf 1971\u20132001; NexTurf 2001\u20132003",
  capacity_opening: "56,371",
  capacity_current: "65,352",
  capacity_combined: "65,352 (originally 56,371)",
  elevation: "20 ft",
  coordinates: "39.9067\u00b0 N, 75.1711\u00b0 W",
  address: "3501 S Broad Street, Philadelphia, PA 19148 (former site)",
  location: "Sports-complex",
  all_star_games: "1976; 1996",
  team_colors: "Red \u00b7 Blue \u00b7 White",

  // ---- Construction & finance ----
  original_cost: "$63 million",
  adjusted_cost: "$501 million",
  financing: "Publicly financed by the City of Philadelphia as a municipal multipurpose stadium",
  renovations: "Scoreboard, turf, seating, suites, concessions, football-related, and safety updates across Phillies and Eagles tenancies",

  // ---- Lineage ----
  preceded_by: "Recreation Park; Baker Bowl; Shibe Park / Connie Mack Stadium",
  succeeded_by: "Citizens Bank Park",

  // ---- Field geometry ----
  left_field_distance: "330 ft",
  center_field_distance: "371 ft",
  right_field_distance: "330 ft",
  orientation: "ENE",
  orientation_degrees: 67.5,

  // ---- Featured visit (Aug 15, 1990) ----
  visit_order: 14,
  visit_count: 1,
  featured_visit_day: "Wednesday",
  featured_visit_date: "Aug 15, 1990",
  visit_type: "Group Visit",
  trip_name: "Northeast",
  game_kind: "Night Game",
  day_night: "Night",
  attendance: "32,156",
  innings_played: 9,
  no_hitter_note: "Terry Mulholland no-hitter",
  game_note_full: "Terry Mulholland threw a no-hitter for Philadelphia.",

  // ---- The featured game (Aug 15, 1990) ----
  game: {
    title: "San Francisco Giants at Philadelphia Phillies",
    home_abbr: "PHI", away_abbr: "SF",
    home_name: "Phillies", away_name: "Giants",
    home_full: "Philadelphia Phillies", away_full: "San Francisco Giants",
    home_runs: 6, away_runs: 0,
    result_line: "Phillies 6, Giants 0",
    first_pitch: "7:35 PM EDT",
    duration: "2:09",
    home_starter: "Terry Mulholland", away_starter: "Don Robinson",
    winning_pitcher: "Terry Mulholland", losing_pitcher: "Don Robinson",
    // save_pitcher: n/a in source — OMITTED
    weather: { temperature: "79\u00b0", conditions: "Mostly Clear", wind: "4 mph WSW", humidity: "65%", sky: "moon" },
    box: {
      away: { abbr: "SF",  byInning: ["0","0","0","0","0","0","0","0","0"], r: 0, h: 0, e: 0 },
      home: { abbr: "PHI", byInning: ["1","0","0","0","3","2","0","0","x"], r: 6, h: 8, e: 1 }
    }
  },

  // ---- Team colors (restrained accent only) ----
  colors: {
    red:   { name: "Red",   hex: "#A8132B" },
    blue:  { name: "Blue",  hex: "#284A86" },
    white: { name: "White", hex: "#FFFFFF" }
  },

  // ---- Material / concept cues (bottom ribbon) ----
  cues: [
    { t: "Exposed Concrete", s: "Precast Bowl" },
    { t: "Octorad", s: "Circular Geometry" },
    { t: "Multipurpose", s: "Baseball / Football" },
    { t: "Artificial Turf", s: "AstroTurf Era" },
    { t: "South Philly", s: "Sports Complex" },
    { t: "Demolished", s: "2004" }
  ],

  // ---- Stadium Context (verbatim, one unified block w/ paragraph breaks) ----
  stadium_context: [
    "Veterans Stadium was Philadelphia's answer to a problem many older baseball cities faced by the late 1960s: the neighborhood ballpark no longer seemed big, flexible, or convenient enough for the business professional sports was becoming. The Phillies had outgrown Shibe Park, later Connie Mack Stadium, not only in seating and amenities but in the civic imagination. The city wanted something larger, publicly owned, easier to reach by car, and capable of serving both baseball and football. The result was not a ballpark in the old sense, but a municipal sports instrument: broad, circular, concrete, and built to handle crowds as efficiently as possible.",
    "Its South Philadelphia sports-complex setting was part of the design logic. Rather than threading baseball back into a dense neighborhood, the city concentrated major venues in a district organized around regional access, parking, and event management. That choice changed the relationship between the Phillies and Philadelphia. Baseball became less attached to a particular street corner and more attached to a metropolitan gathering place, where the approach, the lots, and the neighboring football infrastructure were all part of the experience. Veterans Stadium made sense in an era that valued capacity, multipurpose use, and civic scale more than architectural warmth.",
    "The building's Brutalist circular form carried the strengths and weaknesses of that era plainly. It was durable, symmetrical, and adaptable, with artificial turf, football geometry, scoreboard upgrades, suites, and concessions added or revised as the economics of sports changed. But the same qualities that made it practical also made it blunt. Baseball had to share the geometry. The field sat inside a larger all-purpose machine, and the intimacy of Shibe Park was replaced by a more distant, managed spectacle.",
    "By the time Citizens Bank Park succeeded it in 2004, Veterans Stadium had become a clear example of what the next generation of MLB parks was rejecting. The retro-classic movement did not merely replace old concrete; it restored asymmetry, baseball-specific sightlines, local architectural cues, and a stronger sense of place. Veterans Stadium matters because it shows the peak logic of the multipurpose era: a city betting on efficiency, shared infrastructure, and public scale, then eventually deciding that baseball needed something more particular again."
  ]
};
