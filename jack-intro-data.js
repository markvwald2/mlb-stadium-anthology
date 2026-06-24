/* jack-intro-data.js — source-of-truth for the "Jack's Ballparks" intro leaf
   (single 1275×1088 book page). All facts are data-true:
     · 12 road trips / years / regions  →  all-games-data.js (1986–2025)
     · 42 ballparks · 30 teams · 1953–2025 · 39 games  →  ballparks-data.js +
       all-games-data.js authoritative totals
     · evolution years = each park's opening "from" year in ballparks-data.js
   The eras[] array is an APPROVED-PENDING placeholder — names/ranges/counts are
   to be supplied by the user (questions: "I'll give you the era list + counts").
   Intro prose is the user's own draft copy (1987 corrected to data-true 1986). */
(function () {
  // restrained archival accents (reused from the trip palette for continuity)
  var RUST = "#9B3A2E", SLATE = "#2C4A6E", OLIVE = "#6B672C",
      TEAL = "#2E6E6A", GOLD = "#B0792A", PLUM = "#573A64", STEEL = "#3E5E78";

  window.JACK = {
    title: "Jack\u2019s Ballparks",
    subline: ["42 Ballparks", "12 Road Trips", "1953\u20132025"],
    standfirst: "A personal survey of Major League Baseball\u2019s ballparks across four decades of travel.",

    intro: [
      "This book documents visits to forty-two Major League Baseball stadiums, gathered across twelve road trips between 1986 and 2025. The collection spans nearly every major period of modern ballpark design \u2014 from early twentieth-century urban parks and late-century multipurpose facilities to the retro-classic renaissance and the contemporary generation of stadiums.",
      "The chapters that follow combine personal travel records with architectural and historical documentation. Each stadium is examined as both a place to watch baseball and a product of its era \u2014 shaped by the cities, transportation systems, design philosophies, and development priorities that produced it.",
      "Together, these visits form a chronological survey of the changing American ballpark."
    ],

    // ── THE JOURNEY TIMELINE — 12 road trips, verbatim from all-games-data.js ──
    axis: { min: 1984, max: 2026, ticks: [1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025] },
    // stadiums / games per trip computed from all-games-data.js (sum: 34 unique
    // road-trip stadiums · 39 games incl. the 2019 Camden rainout)
    trips: [
      { seq: 1,  year: 1986, region: ["Southern", "California"], st: 2, gm: 3, accent: RUST },
      { seq: 2,  year: 1988, region: ["Midwest"],                st: 5, gm: 6, accent: GOLD },
      { seq: 3,  year: 1990, region: ["Northeast"],              st: 5, gm: 6, accent: OLIVE },
      { seq: 4,  year: 2011, region: ["Ohio /", "Pennsylvania"], st: 3, gm: 3, accent: OLIVE },
      { seq: 5,  year: 2016, region: ["Boston"],                 st: 1, gm: 2, accent: TEAL },
      { seq: 6,  year: 2018, region: ["Florida /", "Georgia"],   st: 3, gm: 3, accent: SLATE },
      { seq: 7,  year: 2019, region: ["Northeast v2"],           st: 5, gm: 5, accent: STEEL },
      { seq: 8,  year: 2021, region: ["Texas"],                  st: 2, gm: 2, accent: RUST },
      { seq: 9,  year: 2023, region: ["Northern", "Midwest"],    st: 4, gm: 4, accent: STEEL },
      { seq: 10, year: 2024, region: ["Phoenix"],                st: 1, gm: 1, accent: GOLD },
      { seq: 11, year: 2024, region: ["St. Louis"],              st: 1, gm: 2, accent: RUST },
      { seq: 12, year: 2025, region: ["Northern", "California"], st: 2, gm: 2, accent: GOLD }
    ],

    // ── THE COLLECTION — data-true scale figures (States/Province per user) ──
    collection: [
      { n: "42", l: "Ballparks", c: RUST },
      { n: "39", l: "Games", c: SLATE },
      { n: "12", l: "Road Trips", c: OLIVE },
      { n: "14", l: "States", c: TEAL },
      { n: "1", l: "Province", sub: "Ontario", c: GOLD },
      { n: "1953\u201325", l: "Seasons", c: PLUM, small: true }
    ],

    // ── STADIUM ERAS — names, spans & counts per user (sum = 42 ballparks) ──
    erasPending: false,
    eras: [
      { bar: SLATE, name: ["Jewel Box", "Era"],                 years: "1909\u20131962", count: "5",  slot: "jb-era-1" },
      { bar: RUST,  name: ["Multipurpose", "Era"],              years: "1963\u20131991", count: "8",  slot: "jb-era-2" },
      { bar: OLIVE, name: ["Retro-Classic", "Renaissance"],     years: "1992\u20132006", count: "19", slot: "jb-era-3" },
      { bar: STEEL, name: ["Entertainment District /", "Post-Retro"], years: "2007\u20132016", count: "6",  slot: "jb-era-4" },
      { bar: PLUM,  name: ["Contemporary", "Era"],              years: "2017\u2013Present", count: "4",  slot: "jb-era-5" }
    ],

    // ── THE EVOLUTION OF THE BALLPARK — 12 chronological exemplars.
    //    years = opening "from" year per ballparks-data.js. image-slot per park. ──
    evolution: [
      { name: "Comiskey Park",      year: "1910", slot: "jb-evo-01" },
      { name: "Tiger Stadium",      year: "1912", slot: "jb-evo-02" },
      { name: "Fenway Park",        year: "1912", slot: "jb-evo-03" },
      { name: "Wrigley Field",      year: "1914", slot: "jb-evo-04" },
      { name: "Riverfront Stadium", year: "1970", slot: "jb-evo-05" },
      { name: "Three Rivers",       year: "1970", slot: "jb-evo-06" },
      { name: "Veterans Stadium",   year: "1971", slot: "jb-evo-07" },
      { name: "Camden Yards",       year: "1992", slot: "jb-evo-08" },
      { name: "Oracle Park",        year: "2000", slot: "jb-evo-09" },
      { name: "PNC Park",           year: "2001", slot: "jb-evo-10" },
      { name: "Citi Field",         year: "2009", slot: "jb-evo-11" },
      { name: "Globe Life Field",   year: "2020", slot: "jb-evo-12" }
    ],

    tagline: ["Different Cities", "Different Eras", "One Game"]
  };
})();
