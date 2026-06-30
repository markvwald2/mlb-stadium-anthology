/* road-trips-data.js — source-of-truth for "THE ROAD TRIPS" overview spread.
   Lifetime baseball road-trip chronology, 1986–2025.

   DATA DISCIPLINE: every count, year, name, and route below comes from the
   user's production brief. Nothing here is inferred, normalized, or pulled
   from memory/web. Empty/unknown fields are simply absent. Do not invent
   mileage, dates, scores, quotes, captions, or extra teams/games.

   Each trip is assigned to exactly ONE page (left = 1986–2018, right =
   2019–2025) so no marker or photo cluster ever bridges the gutter. `accent`
   is a muted heritage tone keyed to the trip's host club — a restrained
   per-marker accent only, never a dominant field. The memory column under each
   trip carries ONE photo plate per stadium visited (generated from `route`);
   `plateAr` keeps even the five-stadium stacks inside the bottom safe line. */
(function () {
  window.ROADTRIPS = {
    title: ["THE", "BASEBALL", "TRIPS"],
    statline: [
      { n: "12", l: "TRIPS" },
      { n: "39", l: "GAMES" },
      { n: "38", l: "DAYS" },
      { n: "34", l: "STADIUMS" },
    ],
    note: "Including one Camden Yards rainout.",
    introLead: "Let\u2019s see\u2026 Yes, Yes, No, Yes\u2026",
    intro:
      "Between 1986 and 2025, twelve trips took us to ballparks across the country and across the " +
      "major leagues. Expertly planned around efficient routes and packed schedules, each game " +
      "checked another stadium off the poster that hung on our bedroom wall.",

    // right-page "by the numbers" cluster — six metrics, distinct from the
    // 12/39/34 headline on the left page. All values from the user's record.
    numbers: [
      { n: "5,000+", l: ["MILES DRIVEN"], sub: "Across all trips" },
      { n: "81+", l: ["HOURS"], sub: "In a rental car" },
      { n: "27", l: ["TEAMS"], sub: "Seen, home & away" },
      { n: "7",  l: ["DODGER GAMES"], sub: "Most-seen club" },
      { n: "1",  l: ["RAINOUT"], sub: "Camden Yards \u00b7 2019" },
      { n: "3",  l: ["UNSEEN TEAMS"], sub: "Mariners \u00b7 Rockies \u00b7 Royals" },
      { n: "4",  l: ["DECADES"], sub: "Of ballpark travel" },
    ],
    span: { from: "1986", to: "2025", note: "Eleven trip years" },

    // plateAr chosen by stadium count so 4/5-stadium stacks still clear the
    // 0.25in bottom safe line: 1–3 stadiums → 4:3, 4 → 3:2, 5 → 16:9.
    trips: [
      // ----------------------------- LEFT PAGE -----------------------------
      {
        key: "1986", year: "1986", name: ["SOUTHERN", "CALIFORNIA"], games: 3, stadiums: 2, dates: "AUG 17\u201319",
        route: ["Anaheim Stadium", "Dodger Stadium"],
        accent: "#9B3A2E", page: "left", plateAr: "4 / 3", drive: { mi: "144", time: "2h 40m" },
      },
      {
        key: "1988", year: "1988", name: ["MIDWEST"], games: 6, stadiums: 5, dates: "AUG 12\u201316",
        route: ["Wrigley Field", "Milwaukee County Stadium", "Riverfront Stadium", "Tiger Stadium", "Comiskey Park"],
        accent: "#B0792A", page: "left", plateAr: "16 / 9", drive: { mi: "1,019", time: "16h 16m" },
      },
      {
        key: "1990", year: "1990", name: ["NORTHEAST"], games: 6, stadiums: 5, dates: "AUG 13\u201317",
        route: ["Cleveland Stadium", { n: "NFL Hall of Fame", alt: true }, { n: "Three Rivers Stadium", dh: true }, "Veterans Stadium", "Shea Stadium", "Memorial Stadium"],
        accent: "#97781E", page: "left", plateAr: "16 / 9", drive: { mi: "772", time: "12h 25m" },
      },
      {
        key: "2011", year: "2011", name: ["OHIO /", "PENNSYLVANIA"], games: 3, stadiums: 3, dates: "SEP 21\u201323",
        route: ["Great American Ball Park", { n: "Rock & Roll Hall of Fame", alt: true }, "Progressive Field", { n: "NFL Hall of Fame", alt: true }, "PNC Park", { n: "Ohio Stadium", alt: true, cat: "CFB" }, { n: "Paul Brown Stadium", alt: true, cat: "NFL" }],
        accent: "#6B672C", page: "left", plateAr: "4 / 3", drive: { mi: "707", time: "11h 22m" },
      },
      {
        key: "2016", year: "2016", name: ["BOSTON"], games: 2, stadiums: 1, dates: "JUL 22\u201323",
        route: ["Fenway Park"],
        accent: "#2E6E6A", page: "left", plateAr: "4 / 3",
      },
      {
        key: "2018", year: "2018", name: ["FLORIDA /", "GEORGIA"], games: 3, stadiums: 3, dates: "MAY 26\u201328",
        route: ["Marlins Park", "Tropicana Field", "SunTrust Park"],
        accent: "#2C4A6E", page: "left", plateAr: "4 / 3", drive: { mi: "757", time: "10h 51m" },
      },
      // ----------------------------- RIGHT PAGE -----------------------------
      {
        key: "2019", year: "2019", name: ["NORTHEAST", "v2"], games: 4, stadiums: 5, dates: "MAY 1\u20135",
        route: ["Nationals Park", "Citi Field", "Yankee Stadium", "Citizens Bank Park", { n: "Camden Yards", stamp: "RAINOUT" }],
        accent: "#25345A", page: "right", plateAr: "16 / 9", drive: { mi: "462", time: "7h 36m" },
      },
      {
        key: "2021", year: "2021", name: ["TEXAS"], games: 2, stadiums: 2, dates: "SEP 11\u201313",
        route: ["Minute Maid Park", { n: "NRG Stadium", alt: true, cat: "NFL" }, { n: "AT&T Stadium", alt: true, cat: "NFL" }, "Globe Life Field"],
        accent: "#573A64", page: "right", plateAr: "4 / 3", drive: { mi: "258", time: "3h 47m" },
      },
      {
        key: "2023", year: "2023", name: ["NORTHERN", "MIDWEST"], games: 4, stadiums: 4, dates: "JUL 20\u201323",
        route: ["Rogers Centre", "Comerica Park", "American Family Field", "Target Field"],
        accent: "#3E5E78", page: "right", plateAr: "3 / 2", drive: { mi: "857", time: "14h 37m" },
      },
      {
        key: "2024p", year: "2024", name: ["PHOENIX"], games: 1, stadiums: 1, dates: "APR 29",
        route: ["Chase Field"],
        accent: "#AE5C24", page: "right", plateAr: "4 / 3",
      },
      {
        key: "2024s", year: "2024", name: ["ST. LOUIS"], games: 2, stadiums: 1, dates: "AUG 17\u201318",
        route: ["Busch Stadium"],
        accent: "#8E3A2E", page: "right", plateAr: "4 / 3",
      },
      {
        key: "2025", year: "2025", name: ["NORTHERN", "CALIFORNIA"], games: 2, stadiums: 2, dates: "JUL 11\u201312",
        route: ["Sutter Health Park", "Oracle Park"],
        accent: "#8A6A2A", page: "right", plateAr: "4 / 3", drive: { mi: "84", time: "1h 25m" },
      },
    ],
  };
})();
