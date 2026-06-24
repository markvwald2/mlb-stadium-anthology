/* jack-collection-data.js — "Direction B": the collection opener.
   The HEADLINE is the concept; no "Jack's Ballparks" title. NO timeline / stats
   (those live on the Road Trips spread that follows). A documentary photo mosaic
   demonstrates the claim; a five-part "Generations of the Game" key explains it.
   Headline, deck, park groupings, spans, and photo categories are user-provided. */
(function () {
  var RUST = "#9B3A2E", OLIVE = "#6B672C", CHAR = "#2f2a26", NAVY = "#21303c", BRICK = "#A84B32", STEEL = "#3E5E78";

  window.JACK_COLLECTION = {
    headline: { a: "All 30 Current Ballparks", b: "42 Stadiums Total" },
    deck: "Visits spanning every active Major League Baseball ballpark, plus twelve predecessor stadiums visited across four decades of baseball travel.",

    // dense documentary mosaic — 12-col × 5-row grid, varied spans, even gutters.
    mosaic: [
      { id: "jc-m01", ph: "Stadium aerial",         gc: "1 / 5",   gr: "1 / 3" },
      { id: "jc-m02", ph: "Wrigley marquee",        gc: "5 / 8",   gr: "1 / 2" },
      { id: "jc-m03", ph: "Fenway scoreboard",      gc: "8 / 10",  gr: "1 / 3" },
      { id: "jc-m04", ph: "Camden Yards warehouse", gc: "10 / 13", gr: "1 / 3" },
      { id: "jc-m05", ph: "Seating bowl, night",    gc: "5 / 8",   gr: "2 / 3" },
      { id: "jc-m06", ph: "Buckethead \u2014 candid", gc: "1 / 4", gr: "3 / 5" },
      { id: "jc-m07", ph: "Angel Stadium ticket",   gc: "4 / 6",   gr: "3 / 4" },
      { id: "jc-m08", ph: "Stadium lighting",       gc: "6 / 8",   gr: "3 / 5" },
      { id: "jc-m09", ph: "Family at the park",     gc: "8 / 11",  gr: "3 / 4" },
      { id: "jc-m10", ph: "Yankee Stadium facade",  gc: "11 / 13", gr: "3 / 5" },
      { id: "jc-m11", ph: "Scorecard & stubs",      gc: "4 / 6",   gr: "4 / 5" },
      { id: "jc-m12", ph: "Fans at the gate",       gc: "8 / 11",  gr: "4 / 5" },
      { id: "jc-m13", ph: "PNC Park exterior",      gc: "1 / 4",   gr: "5 / 6" },
      { id: "jc-m14", ph: "Interstate highway",     gc: "4 / 7",   gr: "5 / 6" },
      { id: "jc-m15", ph: "Coors Field tower",      gc: "7 / 9",   gr: "5 / 6" },
      { id: "jc-m16", ph: "Rental car / lot",       gc: "9 / 11",  gr: "5 / 6" },
      { id: "jc-m17", ph: "Sutter Health Park",     gc: "11 / 13", gr: "5 / 6" }
    ],

    // "Stadium Eras" — six-part classification key. Each: one elevation drawing
    // (image-slot) + a short description + a park list. Long categories show a
    // few examples + "& N others" (per user). Counts reflect the full lists.
    generations: [
      { title: "Jewel Box & Early Concrete", desc: "Early concrete, neighborhood/urban, intimate asymmetry.", accent: RUST, slot: "jc-g1",
        parks: ["Comiskey Park", "Fenway Park", "Tiger Stadium", "Wrigley Field", "Yankee Stadium"], more: 0 },
      { title: "Postwar Municipal", desc: "Civic scale, public ownership, municipal identity.", accent: OLIVE, slot: "jc-g2",
        parks: ["Cleveland Municipal Stadium", "Milwaukee County Stadium", "Memorial Stadium"], more: 0 },
      { title: "Modern Baseball-Specific", desc: "Baseball-only, modernist, outside the retro-classic line.", accent: STEEL, slot: "jc-g3",
        parks: ["Dodger Stadium", "Anaheim Stadium", "Kauffman Stadium", "New Comiskey", "loanDepot Park"], more: 0 },
      { title: "Multipurpose Shared Use", desc: "Shared-use, concrete bowls, flexibility over intimacy.", accent: CHAR, slot: "jc-g4",
        parks: ["Shea Stadium", "Riverfront Stadium", "Three Rivers", "Veterans Stadium"], more: 4 },
      { title: "Retro Classic", desc: "Baseball-only, urban nostalgia, local texture.", accent: BRICK, slot: "jc-g5",
        parks: ["Camden Yards", "Coors Field", "PNC Park", "Petco Park"], more: 12 },
      { title: "Ballpark District", desc: "Mixed-use anchor, entertainment district, planned destination.", accent: NAVY, slot: "jc-g6",
        parks: ["Nationals Park", "Target Field", "Truist Park", "Globe Life Field", "Busch Stadium"], more: 0 }
    ]
  };
})();
