/* cover-data-4x5.js — the eighteen ballparks shown on the 4×5 front-cover
   variant. 4×5 grid, reading order; the two center cells (row 3, cols 2–3) are
   the open title block, so 18 photo cells are filled. Placement order maps to
   PLACE[] in cover-spread-4x5.jsx:
     row 1:  County · Fenway · San Diego · Veterans
     row 2:  Royals · Riverfront · Cleveland Municipal · Wrigley
     row 3:  Dodger ·        [title]        · Three Rivers
     row 4:  Comiskey · Shea · Busch · Mile High
     row 5:  Memorial · Yankee · Anaheim · Tiger                            */
window.COVER_DATA_5 = {
  title: { l1: "Big League", l2a: "NL", l2b: "AL", l3: "Ballparks" },
  parks: [
    { name: "County Stadium",            city: "Milwaukee",    slot: "cv5-county" },
    { name: "Fenway Park",               city: "Boston",       slot: "cv5-fenway" },
    { name: "San Diego Stadium",         city: "San Diego",    slot: "cv5-sandiego" },
    { name: "Veterans Stadium",          city: "Philadelphia", slot: "cv5-veterans" },
    { name: "Royals Stadium",            city: "Kansas City",  slot: "cv5-kauffman" },
    { name: "Riverfront Stadium",        city: "Cincinnati",   slot: "cv5-riverfront" },
    { name: "Cleveland Municipal Stadium", city: "",           slot: "cv5-cleveland" },
    { name: "Wrigley Field",             city: "Chicago",      slot: "cv5-wrigley" },
    { name: "Dodger Stadium",            city: "Los Angeles",  slot: "cv5-dodger" },
    { name: "Three Rivers Stadium",      city: "Pittsburgh",   slot: "cv5-threerivers" },
    { name: "Comiskey Park",             city: "Chicago",      slot: "cv5-comiskey" },
    { name: "Shea Stadium",              city: "Queens",       slot: "cv5-shea" },
    { name: "Busch Stadium",             city: "St. Louis",    slot: "cv5-busch" },
    { name: "Mile High Stadium",         city: "Denver",       slot: "cv5-milehigh" },
    { name: "Memorial Stadium",          city: "Baltimore",    slot: "cv5-memorial" },
    { name: "Yankee Stadium",            city: "New York",     slot: "cv5-yankee" },
    { name: "Anaheim Stadium",           city: "Anaheim",      slot: "cv5-angels" },
    { name: "Tiger Stadium",             city: "Detroit",      slot: "cv5-tiger" }
  ]
};
