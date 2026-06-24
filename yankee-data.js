/* Yankee Stadium (1923) — verbatim values from the Codex production prompt
   (factual authority). Local data only. Each populated structured value
   appears once in the layout. "n/a" fields (Name History, Save) are omitted.
   The ChatGPT concept render is visual direction only and is NOT a data source. */
window.YANKEE = {
  // ---- Identity (left page title block) ----
  stadium_name: "Yankee Stadium",
  opened_year: "1923",
  classification_era: "Jewel Box & Early Concrete",
  years_active: "1923\u20132008",
  stadium_type: "Open-air monumental urban ballpark",
  status: "Demolished",

  // ---- Stadium Section ----
  city: "Bronx",
  state: "New York",
  team_name: "New York Yankees",
  league: "American League",
  division: "AL East",
  opened: "1923",
  architect: "Osborn Engineering",
  architectural_style: "Monumental jewel-box; classical civic scale and Art Deco frieze",
  facade_material: "Concrete-and-steel triple-deck; limestone/concrete exterior with copper/painted concrete frieze",
  roof_type: "Open Air",
  playing_surface: "Natural grass (Merion bluegrass)",
  capacity_opening: "58,000",
  capacity_current: "56,936",
  preceded_by: "Hilltop Park; Polo Grounds",
  succeeded_by: "Yankee Stadium (2009)",
  elevation: "55 ft",
  coordinates: "40.8269\u00b0 N, 73.9281\u00b0 W",
  stadium_cost: "$2.4 million",
  stadium_cost_adjusted: "$34.4 million",
  financing_method: "Privately financed by Yankees owners Jacob Ruppert and Tillinghast Huston",
  address: "161st Street and River Avenue, Bronx, NY 10451",
  location_classification: "Urban",
  construction_start: "May 5, 1922",
  opening_day: "Apr 18, 1923",
  final_game: "Sep 21, 2008",
  demolition_year: "2010",
  allstar_years: "1939 \u00b7 1960 \u00b7 1977 \u00b7 2008",
  renovations: "Major 1974\u201375 reconstruction; seating, facade, scoreboard, club, lighting, and amenity upgrades",

  // ---- Field geometry ----
  left_field_distance: "318 ft",
  center_field_distance: "408 ft",
  right_field_distance: "314 ft",
  orientation: "E",
  orientation_degrees: 90,

  // ---- Visit Section ----
  visit_order: 7,
  visit_total: 2,
  featured_visit_day: "Saturday",
  featured_visit_date: "Aug 1, 1987",
  featured_game_title: "First Visit",
  other_visits: "Jul 1, 2001",
  trip_name: "New York",

  // featured game
  home_team: "New York Yankees",
  home_team_abbreviation: "NYY",
  away_team: "Detroit Tigers",
  away_team_abbreviation: "DET",
  game_result: "Tigers 10, Yankees 5",
  attendance: "55,103",
  first_pitch: "7:05 PM EDT",
  game_duration: "3:11",
  pitching_matchup: "Frank Tanana (DET) vs Dennis Rasmussen (NYY)",
  winning_pitcher: "Frank Tanana",
  losing_pitcher: "Dennis Rasmussen",
  innings_played: 9,

  // weather
  temperature: "77\u00b0",
  conditions: "Clear",
  wind: "8 mph S",
  humidity: "56%",

  // ---- Team colors (styling tokens only; restrained accents, not surfaced as data) ----
  colors: {
    primary: { name: "Navy Blue", hex: "#0C2340" },
    secondary: { name: "White", hex: "#FFFFFF" },
    accent: { name: "Gray", hex: "#8A9098" }
  },

  // ---- Lifecycle (A Bronx Monument: Life Cycle) ----
  lifecycle: [
    { year: "1922", label: "Construction Start", note: "May 5, 1922" },
    { year: "1923", label: "Opening Day", note: "Apr 18, 1923" },
    { year: "1974\u201375", label: "Reconstruction", note: "Major rebuild" },
    { year: "2008", label: "Final Game", note: "Sep 21, 2008" },
    { year: "2010", label: "Demolished", note: "Successor opened 2009" }
  ],

  // ---- World Series hosted (user-provided) ----
  world_series: ["1923","1926","1927","1928","1932","1936","1937","1938","1939","1941","1943","1947","1949","1950","1951","1952","1953","1955","1956","1957","1958","1960","1961","1962","1963","1964","1976","1977","1978","1981","1996","1998","1999","2000","2001","2003","2008"],

  // ---- Box score (Codex line score, verbatim) ----
  box: {
    date: "Aug 1, 1987",
    day: "Saturday",
    away: { team: "Detroit Tigers", abbr: "DET", byInning: [1,0,1,0,3,3,2,0,0], r: 10, h: 16, e: 1 },
    home: { team: "New York Yankees", abbr: "NYY", byInning: [0,0,0,0,1,0,0,2,2], r: 5, h: 8, e: 2 },
    innings: 9
  },

  // ---- Stadium Context (FULL, verbatim, paragraph breaks intact; one unified block) ----
  stadium_context: [
    "Yankee Stadium was built because the Yankees had become too large for borrowed space. After Hilltop Park and the Polo Grounds, the franchise needed a home that could match the scale of its ambitions and the crowd it expected to command. The 1923 stadium in the Bronx was not merely a new ballpark; it was a declaration that baseball could occupy monumental civic architecture.",
    "Its urban site beside 161st Street and River Avenue gave the building a metropolitan intensity that older grounds could not match. The triple-deck structure, limestone and concrete exterior, and frieze made the stadium feel less like a neighborhood enclosure than a public institution. It belonged to the jewel-box lineage in age and baseball specificity, but its scale pushed beyond the intimacy usually associated with that era. Yankee Stadium turned a ballpark into a capital building for a franchise.",
    "The 1974-1975 reconstruction is essential to its story because it showed both the power and fragility of that monument. The renovated stadium preserved the address and symbolic identity while changing the building's physical character. Seating, facade, scoreboard, club, lighting, and amenity upgrades kept it viable for the late twentieth century, but the process also made clear that memory and modern operations were not easy partners.",
    "The 2009 Yankee Stadium succeeded it not because the original lacked meaning, but because meaning alone could not supply the premium inventory, infrastructure, and controlled environment the modern Yankees wanted. The old stadium's demolition closed one of baseball's most famous architectural chapters, but it also revealed how franchise memory had become a design asset. The replacement carried forward the monumental vocabulary, proving that the 1923 building had become more than a venue: it had become a brand language powerful enough to be rebuilt across the street."
  ]
};
