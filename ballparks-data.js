/* ballparks-data.js — source-of-truth for the "BALLPARKS VISITED" appendix.
   A lifetime ballpark life-list: every stadium visited, ordered chronologically
   by first visit (1953–2025). Broader than the road-trip set — includes parks
   seen outside the documented trips.

   DATA DISCIPLINE: team, stadium, current/former status, division, tenure
   (from/to), and first/last visit years are transcribed verbatim from the
   user's stadium table. Division is intentionally blank for former parks in the
   source, so it is omitted there. Nothing invented or pulled from memory/web. */
(function () {
  var L = {
    Angels: "angels-logo.svg", "A's": "oakland-athletics-logo.svg", Astros: "houston-astros-logo.svg",
    "Blue Jays": "toronto-blue-jays-logo.svg", Braves: "atlanta-braves-logo.svg",
    Brewers: "milwaukee-brewers-logo.svg", Cardinals: "st-louis-cardinals-logo.svg",
    Cubs: "chicago-cubs-logo.svg", Diamondbacks: "arizona-diamondbacks-logo.svg",
    Dodgers: "los-angeles-dodgers-logo.svg", Giants: "giants-logo.svg",
    Guardians: "cleveland-indians-logo.svg", Mariners: "seattle-mariners-logo.svg",
    Marlins: "miami-marlins-logo.svg", Mets: "new-york-mets-logo.svg",
    Nationals: "washington-nationals-logo.svg", Orioles: "baltimore-orioles-logo.svg",
    Padres: "san-diego-padres-logo.svg", Phillies: "philadelphia-phillies-logo.svg",
    Pirates: "pirates-p.svg", Rangers: "texas-rangers-logo.svg", Rays: "tampa-bay-rays-logo.svg",
    "Red Sox": "boston-red-sox-logo.svg", Reds: "reds.svg", Rockies: "colorado-rockies-logo.svg",
    Royals: "royals-logo.svg", Tigers: "detroit-tigers-logo.svg", Twins: "minnesota-twins-logo.svg",
    "White Sox": "chicago-white-sox-logo.svg", Yankees: "new-york-yankees-logo.svg",
  };

  // r(order, team, stadium, current, division, from, to, firstVisit, lastVisit)
  function r(n, team, stadium, current, division, from, to, fv, lv, logo, logoScale, logoDy, logoFilter) {
    return { n: n, team: team, stadium: stadium, current: current, division: division || "",
      from: from, to: to, fv: fv, lv: lv, logo: logo || "",
      logoScale: logoScale || 0, logoDy: logoDy || 0, logoFilter: logoFilter || "",
      decade: (Math.floor(parseInt(fv, 10) / 10) * 10) + "s" };
  }

  window.BALLPARKS = {
    title: "BALLPARK FIRST VISITS",
    kicker: "APPENDIX \u00b7 BALLPARK VISIT BY DECADE",
    years: "1953\u20132025",
    sub: [
      { n: "42", l: "BALLPARKS" },
      { n: "30", l: "TEAMS" },
    ],
    footer: [
      { n: "42", l: ["BALLPARKS"] },
      { n: "30", l: ["TEAMS"] },
      { n: "12", l: ["FORMER", "PARKS"] },
      { n: "6", l: ["DIVISIONS"] },
    ],
    teams: L,
    split: 20, // orders 1..20 → left column, 21..42 → right column

    rows: [
      r(1,  "Cubs",      "Wrigley Field",                true,  "National League", "1914", "", "1953", "1988"),
      r(2,  "Braves",    "Milwaukee County Stadium",     false, "National League", "1953", "2000", "1955", "1988", "milwaukee-braves-cap.svg", 0.82),
      r(3,  "White Sox", "Comiskey Park",                false, "AL West",     "1910", "1990", "1969", "1988", "white-sox-1969.png"),
      r(4,  "Dodgers",   "Dodger Stadium",               true,  "NL West",    "1962", "", "1970", "2010"),
      r(5,  "Padres",    "San Diego Stadium",            false, "NL West",     "1969", "2003", "1972", "1972", "padres-friar.svg"),
      r(6,  "Angels",    "Angel Stadium",                true,  "AL West",    "1966", "", "1986", "2006", "angels-logo-1986.png"),
      r(7,  "Yankees",   "Yankee Stadium",               false, "AL East",     "1923", "2008", "1987", "2001"),
      r(8,  "Mets",      "Shea Stadium",                 false, "NL East",     "1964", "2008", "1987", "1990"),
      r(9,  "Reds",      "Riverfront Stadium",           false, "NL West",     "1970", "2002", "1988", "1988"),
      r(10, "Tigers",    "Tiger Stadium",                false, "AL East",     "1912", "1999", "1988", "1988"),
      r(11, "Royals",    "Kauffman Stadium",             true,  "AL West",    "1973", "", "1989", "1989"),
      r(12, "Indians",   "Cleveland Municipal Stadium",  false, "AL East",     "1931", "1993", "1990", "1990", "cleveland-wahoo-logo.svg"),
      r(13, "Pirates",   "Three Rivers Stadium",         false, "NL East",     "1970", "2000", "1990", "1990", "", 0, 0, "grayscale(1) brightness(0.55)"),
      r(14, "Phillies",  "Veterans Stadium",             false, "NL East",     "1971", "2003", "1990", "1990", "phillies-script-p-v2.svg", 1.0, 1),
      r(15, "Orioles",   "Memorial Stadium",             false, "AL East",     "1954", "1991", "1990", "1990", "orioles-cartoon-logo.svg"),
      r(16, "Rockies",   "Mile High Stadium",            false, "NL West",     "1993", "1994", "1993", "1994"),
      r(17, "Rockies",   "Coors Field",                  true,  "NL West",    "1995", "", "1995", "2019"),
      r(18, "Indians",   "Progressive Field",            true,  "AL Central", "1994", "", "2001", "2011", "cleveland-wahoo-logo.svg"),
      r(19, "Tigers",    "Comerica Park",                true,  "AL Central", "2000", "", "2001", "2023", "tigers-script-inline.svg"),
      r(20, "White Sox", "Rate Field",                   true,  "AL Central", "1991", "", "2001", "2001"),

      r(21, "Brewers",   "American Family Field",        true,  "NL Central", "2001", "", "2001", "2023"),
      r(22, "Mariners",  "T-Mobile Park",                true,  "AL West",    "1999", "", "2003", "2003"),
      r(23, "Padres",    "Petco Park",                   true,  "NL West",    "2004", "", "2009", "2009"),
      r(24, "Reds",      "Great American Ball Park",     true,  "NL Central", "2003", "", "2011", "2011"),
      r(25, "Pirates",   "PNC Park",                     true,  "NL Central", "2001", "", "2011", "2011"),
      r(26, "Red Sox",   "Fenway Park",                  true,  "AL East",    "1912", "", "2016", "2016"),
      r(27, "Marlins",   "loanDepot Park",               true,  "NL East",    "2012", "", "2018", "2018"),
      r(28, "Rays",      "Tropicana Field",              true,  "AL East",    "1998", "", "2018", "2018"),
      r(29, "Braves",    "Truist Park",                  true,  "NL East",    "2017", "", "2018", "2018"),
      r(30, "Nationals", "Nationals Park",               true,  "NL East",    "2008", "", "2019", "2019"),
      r(31, "Mets",      "Citi Field",                   true,  "NL East",    "2009", "", "2019", "2019"),
      r(32, "Yankees",   "Yankee Stadium",               true,  "AL East",    "2009", "", "2019", "2019"),
      r(33, "Phillies",  "Citizens Bank Park",           true,  "NL East",    "2004", "", "2019", "2019"),
      r(34, "Orioles",   "Oriole Park at Camden Yards",  true,  "AL East",    "1992", "", "2019", "2019"),
      r(35, "Astros",    "Daikin Park",                  true,  "AL West",    "2000", "", "2021", "2021"),
      r(36, "Rangers",   "Globe Life Field",             true,  "AL West",    "2020", "", "2021", "2021"),
      r(37, "Blue Jays", "Rogers Centre",                true,  "AL East",    "1989", "", "2023", "2023"),
      r(38, "Twins",     "Target Field",                 true,  "AL Central", "2010", "", "2023", "2023", "twins-insignia.svg"),
      r(39, "Diamondbacks","Chase Field",                true,  "NL West",    "1998", "", "2024", "2024"),
      r(40, "Cardinals", "Busch Stadium",                true,  "NL Central", "2006", "", "2024", "2024"),
      r(41, "A's",       "Sutter Health Park",           true,  "AL West",    "2025", "", "2025", "2025", "athletics-cap-logo.svg", 0.9),
      r(42, "Giants",    "Oracle Park",                  true,  "NL West",    "2000", "", "2025", "2025"),
    ],
  };
})();
