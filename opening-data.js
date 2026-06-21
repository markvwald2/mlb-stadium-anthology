/* opening-data.js — the opening two-page spread (inside cover + page one).
   A duplicate of the front-cover poster grid, continued across a real
   two-page spread: each page is a 4×4 cream grid with the center two cells
   (row 3, cols 2–3) reserved for the wordmark block, leaving 14 photo cells
   per page = 28 ballparks total.

   PARKS = the 28 stadiums from uploads/all-stadium-pages.csv that are NOT on
   the front cover (42 rows − 14 cover parks = 28). Names + cities are verbatim
   from the CSV, in CSV order; first 14 → inside cover, next 14 → page one.
   (The cover carries the 1923 Yankee Stadium; the 2009 rebuild is here.)

   Drop photos onto each cell (they persist in .image-slots.state.json), or
   wire `file` paths later for 300 DPI like the cover.
   slot ids: op-l01..op-l14 (inside cover), op-r01..op-r14 (page one).  */
(function () {
  // the 28 "rest" parks, verbatim from the CSV, in CSV order
  const REST = [
    { name: "Coors Field",                  city: "Denver" },
    { name: "Citi Field",                   city: "New York City" },
    { name: "PNC Park",                     city: "Pittsburgh" },
    { name: "Safeco Field",                 city: "Seattle" },
    { name: "Comiskey Park",               city: "Chicago" },
    { name: "Globe Life Field",             city: "Arlington" },
    { name: "American Family Field",        city: "Milwaukee" },
    { name: "Camden Yards",                 city: "Baltimore" },
    { name: "Marlins Park",                 city: "Miami" },
    { name: "Target Field",                 city: "Minneapolis" },
    { name: "Shea Stadium",                 city: "New York City" },
    { name: "Chase Field",                  city: "Phoenix" },
    { name: "Great American Ball Park",     city: "Cincinnati" },
    { name: "Yankee Stadium (2009)",        city: "New York City" },
    { name: "Mile High Stadium",            city: "Denver" },
    { name: "Petco Park",                   city: "San Diego" },
    { name: "SunTrust Park",                city: "Atlanta" },
    { name: "Comerica Park",                city: "Detroit" },
    { name: "Sutter Health Park",           city: "Sacramento" },
    { name: "Oracle Park",                  city: "San Francisco" },
    { name: "Citizens Bank Park",           city: "Philadelphia" },
    { name: "New Comiskey Park",            city: "Chicago" },
    { name: "Rogers Centre",                city: "Toronto" },
    { name: "Nationals Park",               city: "Washington, D.C." },
    { name: "Tropicana Field",              city: "St. Petersburg" },
    { name: "Busch Stadium",                city: "St. Louis" },
    { name: "Progressive Field",            city: "Cleveland" },
    { name: "Minute Maid Park",             city: "Houston" }
  ];

  function withSlots(arr, prefix) {
    return arr.map(function (p, i) {
      return { name: p.name, city: p.city, slot: prefix + String(i + 1).padStart(2, "0") };
    });
  }

  window.OPENING_DATA = {
    // per-page center-block text (left = inside cover, right = page one)
    titleLeft:  { l1: "Big League", l2a: "NL", l2b: "AL", l3: "Ballparks" },
    titleRight: { l1: "Happy", l2a: "20", l2b: "26", l3: "Father's Day" },
    left:  withSlots(REST.slice(0, 14),  "op-l"),   // inside cover
    right: withSlots(REST.slice(14, 28), "op-r")    // page one
  };
})();
