/* cover-data.js — the fourteen ballparks shown on the front cover grid.
   4×4 grid, reading order; the two center cells (row 3, cols 2–3) are the
   open title block, so 14 photo cells are filled. Placement order maps
   to PLACE[] in cover-spread.jsx:
     row 1:  County · Fenway · San Diego · Veterans
     row 2:  Royals · Riverfront · Cleveland Municipal · Wrigley
     row 3:  Dodger ·        [title]        · Three Rivers
     row 4:  Memorial · Yankee · Anaheim · Tiger                     */
window.COVER_DATA = {
  title: { l1: "Big League", l2a: "NL", l2b: "AL", l3: "Ballparks" },
  parks: [
    { name: "County Stadium",            city: "Milwaukee",    slot: "cv-county" },
    { name: "Fenway Park",               city: "Boston",       slot: "cv-fenway" },
    { name: "San Diego Stadium",         city: "San Diego",    slot: "cv-sandiego" },
    { name: "Veterans Stadium",          city: "Philadelphia", slot: "cv-veterans" },
    { name: "Royals Stadium",            city: "Kansas City",  slot: "cv-kauffman" },
    { name: "Riverfront Stadium",        city: "Cincinnati",   slot: "cv-riverfront" },
    { name: "Cleveland Municipal Stadium", city: "",           slot: "cv-cleveland" },
    { name: "Wrigley Field",             city: "Chicago",      slot: "cv-wrigley" },
    { name: "Dodger Stadium",            city: "Los Angeles",  slot: "cv-dodger" },
    { name: "Three Rivers Stadium",      city: "Pittsburgh",   slot: "cv-threerivers" },
    { name: "Memorial Stadium",          city: "Baltimore",    slot: "cv-memorial" },
    { name: "Yankee Stadium",            city: "New York",     slot: "cv-yankee" },
    { name: "Anaheim Stadium",           city: "Anaheim",      slot: "cv-angels" },
    { name: "Tiger Stadium",             city: "Detroit",      slot: "cv-tiger" }
  ]
};
