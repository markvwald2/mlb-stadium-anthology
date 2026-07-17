/* timeline-data.js — source-of-truth data for the MLB Stadium Timeline interstitial.
   Franchise stadium chronology, 1890 forward (no pre-1890 parks). 30 lanes.

   Per tenure:
     stadium      primary (opening) label for the bar
     start,end    tenure years (active tenures charted through 2026; shared
                  boundary years between consecutive parks are intentional)
     visited      true if visited=yes
     visitYears   unique visit years (gold diamonds), sorted
     visitCount   total known visit events (>= visitYears.length)
     renames      documented name changes as { year, name }. A notch is drawn at
                  each year; where the bar segment has room, the new name prints
                  too. Renames at the opening year or equal to the primary render
                  as a notch only. */
(function () {
  const FRANCHISES = [
    { lines: ["Boston Red Sox"], tenures: [
      { stadium: "Huntington Avenue Grounds", start: 1901, end: 1911, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Fenway Park", start: 1912, end: 2026, visited: true, visitYears: [2016], visitCount: 2, renames: [] },
    ]},
    { lines: ["Boston / Milwaukee / Atlanta Braves"], tenures: [
      { stadium: "South End Grounds II", start: 1888, end: 1894, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "South End Grounds III", start: 1894, end: 1914, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Fenway Park", start: 1914, end: 1915, visited: false, visitYears: [], visitCount: 0, renames: [], labelBelow: true },
      { stadium: "Braves Field", start: 1915, end: 1952, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Milwaukee County Stadium", start: 1953, end: 1965, visited: true, visitYears: [1953], visitCount: 1, renames: [] },
      { stadium: "Atlanta Stadium", start: 1966, end: 1996, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1976, name: "Atlanta\u2013Fulton County Stadium" }] },
      { stadium: "Turner Field", start: 1997, end: 2016, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "SunTrust Park", start: 2017, end: 2026, visited: true, visitYears: [2018], visitCount: 1, renames: [{ year: 2020, name: "Truist Park" }] },
    ]},
    { lines: ["New York Yankees"], tenures: [
      { stadium: "Hilltop Park", start: 1903, end: 1912, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Polo Grounds", start: 1913, end: 1922, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Yankee Stadium", start: 1923, end: 2008, visited: true, visitYears: [1987, 2001], visitCount: 2, renames: [] },
      { stadium: "Yankee Stadium II", start: 2009, end: 2026, visited: true, visitYears: [2019], visitCount: 1, renames: [] },
    ]},
    { lines: ["New York / San Francisco Giants"], tenures: [
      { stadium: "Polo Grounds / Manhattan Field", start: 1891, end: 1911, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Polo Grounds", start: 1911, end: 1957, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Seals Stadium", start: 1958, end: 1959, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Candlestick Park", start: 1960, end: 1999, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1995, name: "3-Com Park" }] },
      { stadium: "Pac. Bell", start: 2000, end: 2026, visited: true, visitYears: [2025], visitCount: 1, renames: [{ year: 2004, name: "SBC" }, { year: 2006, name: "AT&T Park" }, { year: 2019, name: "Oracle" }] },
    ]},
    { lines: ["Brooklyn / Los Angeles Dodgers"], tenures: [
      { stadium: "Washington Park", start: 1890, end: 1891, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Eastern Park", start: 1891, end: 1897, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "\u201cNew\u201d Washington Park", start: 1898, end: 1912, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Ebbets Field", start: 1913, end: 1957, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Memorial Coliseum", start: 1958, end: 1961, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Dodger Stadium", start: 1962, end: 2026, visited: true, visitYears: [1970, 1978, 1986, 2010], visitCount: 5, renames: [] },
    ]},
    { lines: ["Philadelphia Phillies"], tenures: [
      { stadium: "Baker Bowl", start: 1890, end: 1938, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Shibe Park", start: 1938, end: 1970, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1953, name: "Connie Mack Stadium" }] },
      { stadium: "Veterans Stadium", start: 1971, end: 2003, visited: true, visitYears: [1990], visitCount: 1, renames: [] },
      { stadium: "Citizens Bank Park", start: 2004, end: 2026, visited: true, visitYears: [2019], visitCount: 1, renames: [] },
    ]},
    { lines: ["Philadelphia / KC / Oakland Athletics"], tenures: [
      { stadium: "Columbia Park", start: 1901, end: 1908, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Shibe Park", start: 1909, end: 1954, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1953, name: "Connie Mack Stadium" }] },
      { stadium: "Municipal Stadium", start: 1955, end: 1967, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Oakland Coliseum", start: 1968, end: 2024, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1998, name: "Network Assoc." }, { year: 2004, name: "McAfee" }, { year: 2011, name: "O.co Coliseum" }, { year: 2019, name: "RingCentral" }] },
      { stadium: "Sutter Health Park", start: 2025, end: 2026, visited: true, visitYears: [2025], visitCount: 1, renames: [] },
    ]},
    { lines: ["Washington Senators / Minnesota Twins"], tenures: [
      { stadium: "American League Park", start: 1901, end: 1910, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Griffith Stadium", start: 1911, end: 1960, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Metropolitan Stadium", start: 1961, end: 1981, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Metrodome", start: 1982, end: 2009, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Target Field", start: 2010, end: 2026, visited: true, visitYears: [2023], visitCount: 1, renames: [] },
    ]},
    { lines: ["Pittsburgh Pirates"], tenures: [
      { stadium: "Exposition Park", start: 1891, end: 1909, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Forbes Field", start: 1909, end: 1970, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Three Rivers Stadium", start: 1970, end: 2000, visited: true, visitYears: [1990], visitCount: 1, renames: [] },
      { stadium: "PNC Park", start: 2001, end: 2026, visited: true, visitYears: [2011], visitCount: 1, renames: [] },
    ]},
    { lines: ["Detroit Tigers"], tenures: [
      { stadium: "Bennett Park", start: 1901, end: 1911, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Navin Field", start: 1912, end: 1999, visited: true, visitYears: [1988], visitCount: 1, renames: [{ year: 1938, name: "Briggs Stadium" }, { year: 1961, name: "Tiger Stadium" }] },
      { stadium: "Comerica Park", start: 2000, end: 2026, visited: true, visitYears: [2001, 2023], visitCount: 2, renames: [] },
    ]},
    { lines: ["Cincinnati Reds"], tenures: [
      { stadium: "League Park", start: 1890, end: 1901, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Palace of the Fans", start: 1902, end: 1911, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Redland Field", start: 1912, end: 1970, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1934, name: "Crosley Field" }] },
      { stadium: "Riverfront Stadium", start: 1970, end: 2002, visited: true, visitYears: [1988], visitCount: 1, renames: [{ year: 1996, name: "Cinergy" }] },
      { stadium: "Great American Ball Park", start: 2003, end: 2026, visited: true, visitYears: [2011], visitCount: 1, renames: [] },
    ]},
    { lines: ["Cleveland Indians / Guardians"], tenures: [
      { stadium: "League Park", start: 1901, end: 1931, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1916, name: "Dunn Field" }] },
      { stadium: "Cleveland Municipal Stadium", start: 1932, end: 1993, visited: true, visitYears: [1990], visitCount: 1, renames: [] },
      { stadium: "Jacobs Field", start: 1994, end: 2026, visited: true, visitYears: [2001, 2011], visitCount: 2, renames: [{ year: 2008, name: "Progressive Field" }] },
    ]},
    { lines: ["Chicago Cubs"], tenures: [
      { stadium: "West Side Grounds", start: 1893, end: 1915, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Weeghman Park", start: 1916, end: 2026, visited: true, visitYears: [1953, 1988], visitCount: 4, labelAbove: true, renames: [{ year: 1920, name: "Cubs Park" }, { year: 1927, name: "Wrigley Field" }] },
    ]},
    { lines: ["Chicago White Sox"], tenures: [
      { stadium: "South Side Park", start: 1901, end: 1910, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "White Sox Park", start: 1910, end: 1990, visited: true, visitYears: [1969, 1988], visitCount: 2, labelAbove: true, renames: [{ year: 1913, name: "Comiskey Park" }, { year: 1962, name: "White Sox Park", relabel: true }, { year: 1976, name: "Comiskey Park" }] },
      { stadium: "New Comiskey Park", start: 1991, end: 2026, visited: true, visitYears: [2001], visitCount: 1, renames: [{ year: 2003, name: "U.S. Cellular Field" }, { year: 2016, name: "Guaranteed Rate" }, { year: 2024, name: "Rate Field" }] },
    ]},
    { lines: ["St. Louis Cardinals"], tenures: [
      { stadium: "Sportsman's Park", start: 1890, end: 1891, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Union Park", start: 1892, end: 1897, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "League Park", start: 1898, end: 1898, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Robison Field", start: 1899, end: 1920, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Sportsman's Park", start: 1920, end: 1966, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1953, name: "Busch Stadium" }] },
      { stadium: "Busch Stadium II", start: 1966, end: 2005, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Busch Stadium III", start: 2006, end: 2026, visited: true, visitYears: [2024], visitCount: 2, renames: [] },
    ]},
    { lines: ["St. Louis Browns / Baltimore Orioles"], tenures: [
      { stadium: "Lloyd Street Grounds", start: 1901, end: 1901, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Sportsman's Park", start: 1902, end: 1953, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Memorial Stadium", start: 1954, end: 1991, visited: true, visitYears: [1990], visitCount: 1, renames: [] },
      { stadium: "Oriole Park at Camden Yards", start: 1992, end: 2026, visited: true, visitYears: [2019], visitCount: 1, renames: [] },
    ]},
    { lines: ["Washington Senators (II) / Texas Rangers"], tenures: [
      { stadium: "Griffith Stadium", start: 1961, end: 1961, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "D.C. Stadium", start: 1962, end: 1971, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 1969, name: "RFK Stadium" }] },
      { stadium: "Arlington Stadium", start: 1972, end: 1993, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Ballpark in Arlington", start: 1994, end: 2019, visited: false, visitYears: [], visitCount: 0, renames: [{ year: 2004, name: "Ameriquest Field" }, { year: 2007, name: "Rangers Ballpark" }, { year: 2014, name: "Globe Life Park" }] },
      { stadium: "Globe Life Field", start: 2020, end: 2026, visited: true, visitYears: [2021], visitCount: 1, renames: [] },
    ]},
    { lines: ["Houston Colt .45s / Astros"], tenures: [
      { stadium: "Colt Stadium", start: 1962, end: 1964, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Astrodome", start: 1965, end: 1999, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Enron Field", start: 2000, end: 2026, visited: true, visitYears: [2021], visitCount: 1, labelOutside: true, renames: [{ year: 2002, name: "Minute Maid Park" }, { year: 2025, name: "Daikin Park" }] },
    ]},
    { lines: ["New York Mets"], tenures: [
      { stadium: "Polo Grounds", start: 1962, end: 1963, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Shea Stadium", start: 1964, end: 2008, visited: true, visitYears: [1987, 1990], visitCount: 2, renames: [] },
      { stadium: "Citi Field", start: 2009, end: 2026, visited: true, visitYears: [2019], visitCount: 1, renames: [] },
    ]},
    { lines: ["L.A. / California / Anaheim Angels"], tenures: [
      { stadium: "Wrigley Field (Los Angeles)", start: 1961, end: 1961, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Dodger Stadium", start: 1962, end: 1965, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Anaheim Stadium", start: 1966, end: 2026, visited: true, visitYears: [1986, 2006], visitCount: 2, renames: [{ year: 1998, name: "Edison Int'l Field" }, { year: 2004, name: "Angel Stadium" }] },
    ]},
    { lines: ["Kansas City Royals"], tenures: [
      { stadium: "Municipal Stadium", start: 1969, end: 1972, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Royals Stadium", start: 1973, end: 2026, visited: true, visitYears: [1989], visitCount: 1, renames: [{ year: 1993, name: "Kauffman Stadium" }] },
    ]},
    { lines: ["Montreal Expos / Washington Nationals"], tenures: [
      { stadium: "Jarry Park", start: 1969, end: 1976, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Olympic Stadium", start: 1977, end: 2004, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "RFK Stadium", start: 2005, end: 2007, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Nationals Park", start: 2008, end: 2026, visited: true, visitYears: [2019], visitCount: 1, renames: [] },
    ]},
    { lines: ["San Diego Padres"], tenures: [
      { stadium: "San Diego Stadium", start: 1969, end: 2003, visited: true, visitYears: [1972], visitCount: 1, renames: [{ year: 1981, name: "Jack Murphy Stadium" }, { year: 1997, name: "Qualcomm Stadium" }] },
      { stadium: "PETCO Park", start: 2004, end: 2026, visited: true, visitYears: [2009], visitCount: 1, renames: [] },
    ]},
    { lines: ["Seattle Pilots / Milwaukee Brewers"], tenures: [
      { stadium: "Sick's Stadium", start: 1969, end: 1969, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Milwaukee County Stadium", start: 1970, end: 2000, visited: true, visitYears: [1988], visitCount: 1, renames: [] },
      { stadium: "Miller Park", start: 2001, end: 2026, visited: true, visitYears: [2001, 2023], visitCount: 2, renames: [{ year: 2021, name: "American Family Field", above: true }] },
    ]},
    { lines: ["Seattle Mariners"], tenures: [
      { stadium: "Kingdome", start: 1977, end: 1999, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Safeco Field", start: 1999, end: 2026, visited: true, visitYears: [2003], visitCount: 1, renames: [{ year: 2019, name: "T-Mobile" }] },
    ]},
    { lines: ["Toronto Blue Jays"], tenures: [
      { stadium: "Exhibition Stadium", start: 1977, end: 1989, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "SkyDome", start: 1989, end: 2026, visited: true, visitYears: [2023], visitCount: 1, renames: [{ year: 2005, name: "Rogers Centre" }] },
    ]},
    { lines: ["Florida / Miami Marlins"], tenures: [
      { stadium: "Joe Robbie Stadium", start: 1993, end: 2011, visited: false, visitYears: [], visitCount: 0, labelOutside: true, renames: [{ year: 1996, name: "Pro Player Stadium" }, { year: 2005, name: "Dolphin Stad.", force: true }, { year: 2009, name: "Land Shark Stadium" }, { year: 2010, name: "Sun Life Stadium" }] },
      { stadium: "Marlins Park", start: 2012, end: 2026, visited: true, visitYears: [2018], visitCount: 1, renames: [{ year: 2021, name: "loanDepot park" }] },
    ]},
    { lines: ["Colorado Rockies"], tenures: [
      { stadium: "Mile High Stadium", start: 1993, end: 1994, visited: true, visitYears: [1993, 1994], visitCount: 2, renames: [] },
      { stadium: "Coors Field", start: 1995, end: 2026, visited: true, visitYears: Array.from({ length: 2026 - 1995 + 1 }, function (_, i) { return 1995 + i; }).filter(function (y) { return y !== 2020; }), visitCount: 2026 - 1995 + 1 - 1, renames: [] }, // 2020 omitted: COVID season, no fans admitted
    ]},
    { lines: ["Arizona Diamondbacks"], tenures: [
      { stadium: "Bank One Ballpark", start: 1998, end: 2026, visited: true, visitYears: [2024], visitCount: 1, renames: [{ year: 2005, name: "Chase Field" }] },
    ]},
    { lines: ["Tampa Bay Devil Rays / Rays"], tenures: [
      { stadium: "Tropicana Field", start: 1998, end: 2024, visited: true, visitYears: [2018], visitCount: 1, renames: [], spanText: "1998\u201324, now" },
      { stadium: "Steinbrenner Field", start: 2025, end: 2025, visited: false, visitYears: [], visitCount: 0, renames: [] },
      { stadium: "Tropicana Field", start: 2026, end: 2026, visited: true, visitYears: [], visitCount: 0, renames: [], noLabel: true },
    ]},
  ];

  // dataset-wide totals (for the bottom key)
  const TOTALS = { franchises: 30, tenures: 98, visited: 43 };

  window.TimelineData = { FRANCHISES: FRANCHISES, TOTALS: TOTALS, YEAR_MIN: 1890, YEAR_MAX: 2026 };
})();
