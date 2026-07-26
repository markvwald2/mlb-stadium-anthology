/* jack-collection-data.js — "Direction B": the collection opener.
   The HEADLINE is the concept; no "Jack's Ballparks" title. NO timeline / stats
   (those live on the Road Trips spread that follows). A documentary photo mosaic
   demonstrates the claim; a five-part "Generations of the Game" key explains it.
   Headline, deck, park groupings, spans, and photo categories are user-provided. */
(function () {
  var RUST = "#9B3A2E", OLIVE = "#6B672C", CHAR = "#2f2a26", NAVY = "#21303c", BRICK = "#A84B32", STEEL = "#3E5E78";

  window.JACK_COLLECTION = {
    headline: { a: "All 30 Current Ballparks", b: "42 Stadiums Total" },
    deck: "Visits spanning every active Major League Baseball stadium, plus twelve predecessor ballparks visited across eight decades.",

    // documentary mosaic — 12-col × 6-row grid, 13 tiles. Deliberate mix of
    // landscape (~1.75:1), portrait (~2:3), and square (~1.15:1) — staggered
    // so nothing reads as a flat strip (max aspect 1.75:1).
    mosaic: [
      { id: "jc-m01", ph: "Stadium aerial",         gc: "1 / 4",   gr: "1 / 3" },
      { id: "jc-m02", ph: "Wrigley marquee",        gc: "4 / 6",   gr: "1 / 4" },
      { id: "jc-m03", ph: "Fenway scoreboard",      gc: "6 / 9",   gr: "1 / 3" },
      { id: "jc-m04", ph: "Camden Yards warehouse", gc: "9 / 11",  gr: "1 / 4" },
      { id: "jc-m05", ph: "Seating bowl, night",    gc: "11 / 13", gr: "1 / 3" },
      { id: "jc-m06", ph: "Buckethead \u2014 candid", gc: "1 / 4", gr: "3 / 5" },
      { id: "jc-m07", ph: "Angel Stadium ticket",   gc: "6 / 9",   gr: "3 / 5" },
      { id: "jc-m08", ph: "Stadium lighting",       gc: "11 / 13", gr: "3 / 5" },
      { id: "jc-m09", ph: "Family at the park",     gc: "4 / 6",   gr: "4 / 6" },
      { id: "jc-m21", ph: "Field level",            gc: "4 / 6",   gr: "6 / 7" },
      { id: "jc-m10", ph: "Yankee Stadium facade",  gc: "9 / 11",  gr: "4 / 7" },
      { id: "jc-m11", ph: "Scorecard & stubs",      gc: "1 / 4",   gr: "5 / 7" },
      { id: "jc-m12", ph: "Fans at the gate",       gc: "6 / 9",   gr: "5 / 7" },
      { id: "jc-m13", ph: "PNC Park exterior",      gc: "11 / 13", gr: "5 / 7" }
    ],

    // "Stadium Eras" — six-part classification key. Each: one elevation drawing
    // (image-slot) + a short description + the COMPLETE park roster (user list,
    // verbatim names & order; sum = 42). `wide:true` gives a double-width column
    // whose roster runs in two sub-columns (Retro Classic, 16 parks).
    generations: [
      { title: "Jewel Box & Early Concrete", desc: "Concrete ballparks woven into local streets, where intimate asymmetry emerged from constrained urban sites.", accent: "#3F6075", slot: "jc-g1", parksStyle: { fontSize: "11px" },
        parks: ["Wrigley Field", "Comiskey Park", "Yankee Stadium", "Tiger Stadium", "Fenway Park"] },
      { title: "Postwar Municipal", desc: "Civic-scale stadiums, expressing public ambition through monumental form and automobile access.", accent: "#7C6A4A", slot: "jc-g2",
        parks: ["Milwaukee County Stadium", "Cleveland Municipal Stadium", "Memorial Stadium"] },
      { title: "Modernist Baseball-Specific", desc: "Baseball-only modernism emphasizing geometry, sightlines, and architectural expression over historical reference.", accent: "#5E7A86", slot: "jc-g3",
        parks: ["Dodger Stadium", "Anaheim Stadium", "Royals Stadium", "New Comiskey Park", "Marlins Park"] },
      { title: "Multipurpose Shared Use", desc: "Concrete bowls focused on flexibility, where adaptability and efficiency outweighed baseball intimacy.", accent: "#8A8276", slot: "jc-g4", parksStyle: { letterSpacing: "-0.1px" },
        parks: ["Jack Murphy", "Shea", "Riverfront", "Three Rivers", "The Vet", "Mile High", "Tropicana Field", "Rogers Centre"] },
      { title: "Retro Classic", desc: "Baseball-only parks reintroducing asymmetry, local materials, urban context, and renewed sense of place.", accent: "#9C3A28", slot: "jc-g5", wide: true, parksStyle: { fontSize: "11px", letterSpacing: "-0.5px" },
        parks: ["Coors", "Progressive", "Comerica", "Miller", "Safeco", "Petco", "GABP", "Oracle", "Camden", "Citizens Bank", "Yankee", "Minute Maid", "Chase Field", "Sutter Health", "PNC", "Citi"] },
      { title: "Contemporary Mixed Use", desc: "Ballparks anchoring mixed-use districts, where baseball became one element of a year-round entertainment destination.", accent: "#4F6B57", slot: "jc-g6",
        parks: ["Busch Stadium", "SunTrust Park", "Nationals Park", "Globe Life Field", "Target Field"] }
    ]
  };
})();
