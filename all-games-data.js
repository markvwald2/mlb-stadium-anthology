/* all-games-data.js — source-of-truth for the "ALL TRIP GAMES" appendix index.
   Every game attended across all twelve road trips, 1986–2025.

   DATA DISCIPLINE: trips, dates, stadiums, and home/away teams are transcribed
   verbatim from the user's game-log table. Totals are the project's authoritative
   figures (39 games incl. the Camden rainout · 12 trips · 34 unique stadiums ·
   27 teams). Nothing here is invented, inferred, or pulled from memory/web.
   Trip accent colors reuse the overview spread's archival palette for continuity. */
(function () {
  // team → { logo file in assets/, display nickname }. Logos carry the color;
  // nicknames stay charcoal so the page reads paper + ink + restrained accent.
  var T = {
    Angels:       { logo: "angels-logo.svg",                 nick: "Angels" },
    "A's":        { logo: "oakland-athletics-logo.svg",      nick: "A\u2019s" },
    Dodgers:      { logo: "los-angeles-dodgers-logo.svg",     nick: "Dodgers" },
    Mets:         { logo: "new-york-mets-logo.svg",           nick: "Mets" },
    Cubs:         { logo: "chicago-cubs-logo.svg",            nick: "Cubs" },
    Cardinals:    { logo: "st-louis-cardinals-logo.svg",      nick: "Cardinals" },
    Brewers:      { logo: "milwaukee-brewers-logo.svg",       nick: "Brewers" },
    Orioles:      { logo: "baltimore-orioles-logo.svg",       nick: "Orioles" },
    Reds:         { logo: "reds.svg",                         nick: "Reds" },
    Braves:       { logo: "atlanta-braves-logo.svg",          nick: "Braves" },
    Tigers:       { logo: "detroit-tigers-logo.svg",          nick: "Tigers" },
    Twins:        { logo: "minnesota-twins-logo.svg",         nick: "Twins" },
    "White Sox":  { logo: "chicago-white-sox-logo.svg",       nick: "White Sox" },
    "Blue Jays":  { logo: "toronto-blue-jays-logo.svg",       nick: "Blue Jays" },
    Indians:      { logo: "cleveland-indians-logo.svg",       nick: "Indians" },
    Pirates:      { logo: "pirates-p.svg",                    nick: "Pirates" },
    Phillies:     { logo: "philadelphia-phillies-logo.svg",   nick: "Phillies" },
    Giants:       { logo: "giants-logo.svg",                  nick: "Giants" },
    Astros:       { logo: "houston-astros-logo.svg",          nick: "Astros" },
    Rays:         { logo: "tampa-bay-rays-logo.svg",          nick: "Rays" },
    Nationals:    { logo: "washington-nationals-logo.svg",    nick: "Nationals" },
    Yankees:      { logo: "new-york-yankees-logo.svg",        nick: "Yankees" },
    Rangers:      { logo: "texas-rangers-logo.svg",           nick: "Rangers" },
    Diamondbacks: { logo: "arizona-diamondbacks-logo.svg",    nick: "Diamondbacks" },
    Padres:       { logo: "san-diego-padres-logo.svg",        nick: "Padres" },
    "Red Sox":    { logo: "boston-red-sox-logo.svg",          nick: "Red Sox" },
  };

  function g(date, stadium, home, away, tag, ov) {
    return { date: date, stadium: stadium, home: home, away: away, tag: tag || null, ov: ov || null };
  }

  window.ALLGAMES = {
    title: "ALL BASEBALL TRIP GAMES",
    years: "1986\u20132025",
    sub: [
      { n: "39", l: "GAMES" },
      { n: "12", l: "ROAD TRIPS" },
      { n: "34", l: "STADIUMS" },
    ],
    teams: T,
    footer: [
      { n: "39", l: ["GAMES"] },
      { n: "12", l: ["ROAD", "TRIPS"] },
      { n: "34", l: ["UNIQUE", "STADIUMS"] },
      { n: "27", l: ["MLB", "TEAMS"] },
    ],

    // column assignment balances the two columns (col 1 = first five trips).
    trips: [
      { year: "1986", name: "Southern California", accent: "#9B3A2E", col: 1, games: [
        g("Aug 17", "Anaheim Stadium",          "Angels", "A's", null, { Angels: "angels-logo-1986.png" }),
        g("Aug 18", "Dodger Stadium",           "Dodgers", "Mets"),
        g("Aug 19", "Dodger Stadium",           "Dodgers", "Mets"),
      ] },
      { year: "1988", name: "Midwest", accent: "#B0792A", col: 1, games: [
        g("Aug 12", "Wrigley Field",             "Cubs", "Cardinals"),
        g("Aug 12", "Milwaukee County Stadium",  "Brewers", "Orioles", null, { Brewers: "brewers-ball-in-glove.png", Orioles: "orioles-cartoon-logo.svg" }),
        g("Aug 13", "Wrigley Field",             "Cubs", "Cardinals"),
        g("Aug 14", "Riverfront Stadium",        "Reds", "Braves"),
        g("Aug 15", "Tiger Stadium",             "Tigers", "Twins"),
        g("Aug 16", "Comiskey Park",             "White Sox", "Blue Jays", null, { "White Sox": "white-sox-1988.svg" }),
      ] },
      { year: "1990", name: "Northeast", accent: "#97781E", col: 1, games: [
        g("Aug 13", "Cleveland Stadium",         "Indians", "Tigers", null, { Indians: "cleveland-wahoo-logo.svg" }),
        g("Aug 14", "Three Rivers Stadium",      "Pirates", "Braves", "DH"),
        g("Aug 14", "Three Rivers Stadium",      "Pirates", "Braves", "DH"),
        g("Aug 15", "Veterans Stadium",          "Phillies", "Giants", null, { Phillies: "phillies-script-p-v2.svg" }),
        g("Aug 16", "Shea Stadium",              "Mets", "Dodgers"),
        g("Aug 17", "Memorial Stadium",          "Orioles", "A's", null, { Orioles: "orioles-cartoon-logo.svg" }),
      ] },
      { year: "2011", name: "Ohio / Pennsylvania", accent: "#6B672C", col: 1, games: [
        g("Sep 21", "Great American Ball Park",  "Reds", "Astros"),
        g("Sep 22", "Progressive Field",         "Indians", "White Sox", null, { "White Sox": { dx: 5 } }),
        g("Sep 23", "PNC Park",                  "Pirates", "Reds"),
      ] },
      { year: "2016", name: "Boston", accent: "#2E6E6A", col: 1, games: [
        g("Jul 22", "Fenway Park",               "Red Sox", "Twins"),
        g("Jul 23", "Fenway Park",               "Red Sox", "Twins"),
      ] },

      { year: "2018", name: "Florida / Georgia", accent: "#2C4A6E", col: 2, games: [
        g("May 26", "Marlins Park",              "Marlins", "Nationals"),
        g("May 27", "Tropicana Field",           "Rays", "Orioles"),
        g("May 28", "SunTrust Park",             "Braves", "Mets"),
      ] },
      { year: "2019", name: "Northeast v2", accent: "#25345A", col: 2, games: [
        g("May 1",  "Nationals Park",            "Nationals", "Cardinals"),
        g("May 2",  "Citi Field",                "Mets", "Reds"),
        g("May 3",  "Yankee Stadium",            "Yankees", "Twins"),
        g("May 4",  "Citizens Bank Park",        "Phillies", "Nationals"),
        g("May 5",  "Camden Yards",              "Orioles", "Rays", "RAINOUT"),
      ] },
      { year: "2021", name: "Texas", accent: "#573A64", col: 2, games: [
        g("Sep 11", "Minute Maid Park",          "Astros", "Angels"),
        g("Sep 13", "Globe Life Field",          "Rangers", "Astros"),
      ] },
      { year: "2023", name: "Northern Midwest", accent: "#3E5E78", col: 2, games: [
        g("Jul 20", "Rogers Centre",             "Blue Jays", "Padres"),
        g("Jul 21", "Comerica Park",             "Tigers", "Padres", null, { Tigers: "detroit-tigers-d.svg" }),
        g("Jul 22", "American Family Field",      "Brewers", "Braves"),
        g("Jul 23", "Target Field",              "Twins", "White Sox", null, { Twins: "twins-insignia.svg", "White Sox": { dx: 5 } }),
      ] },
      { year: "2024", name: "Phoenix", accent: "#AE5C24", col: 2, games: [
        g("Apr 29", "Chase Field",               "Diamondbacks", "Dodgers"),
      ] },
      { year: "2024", name: "St. Louis", accent: "#8E3A2E", col: 2, games: [
        g("Aug 17", "Busch Stadium",             "Cardinals", "Dodgers"),
        g("Aug 18", "Busch Stadium",             "Cardinals", "Dodgers"),
      ] },
      { year: "2025", name: "Northern California", accent: "#8A6A2A", col: 2, games: [
        g("Jul 11", "Sutter Health Park",        "A's", "Blue Jays", null, { "A's": { logo: "athletics-cap-logo.svg", scale: 0.9 } }),
        g("Jul 12", "Oracle Park",               "Giants", "Dodgers"),
      ] },
    ],
  };

  // Marlins isn't in a home/away of the early lookup above (2018 Marlins home),
  // add any teams that only appear once so every matchup resolves a logo.
  window.ALLGAMES.teams.Marlins = { logo: "miami-marlins-logo.svg", nick: "Marlins" };
})();
