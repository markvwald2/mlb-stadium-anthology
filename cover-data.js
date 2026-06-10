/* cover-data.js — the ten ballparks shown on the front cover grid.
   4×3 grid, reading order; the two center cells (row 2, cols 2–3) are the
   open title block, so only 10 photo cells are filled. Placement order maps
   to PLACE[] in cover-spread.jsx:
     row 1:  Kauffman · Riverfront · Cleveland Municipal · Wrigley
     row 2:  Dodger ·            [title]            · County Stadium
     row 3:  Three Rivers · Yankee · Angels · Tiger                       */
window.COVER_DATA = {
  title: { l1: "Big League", l2a: "NL", l2b: "AL", l3: "Ballparks" },
  parks: [
    { name: "Kauffman Stadium",          city: "Kansas City",  slot: "cv-kauffman" },
    { name: "Riverfront Stadium",        city: "Cincinnati",   slot: "cv-riverfront" },
    { name: "Cleveland Municipal Stadium", city: "",           slot: "cv-cleveland" },
    { name: "Wrigley Field",             city: "Chicago",      slot: "cv-wrigley" },
    { name: "Dodger Stadium",            city: "Los Angeles",  slot: "cv-dodger" },
    { name: "County Stadium",            city: "Milwaukee",    slot: "cv-county" },
    { name: "Three Rivers Stadium",      city: "Pittsburgh",   slot: "cv-threerivers" },
    { name: "Yankee Stadium",            city: "New York",     slot: "cv-yankee" },
    { name: "Anaheim Stadium",           city: "Anaheim",      slot: "cv-angels" },
    { name: "Tiger Stadium",             city: "Detroit",      slot: "cv-tiger" }
  ]
};
