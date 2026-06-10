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
    { name: "Riverfront Stadium",        city: "Cincinnati",   slot: "cv-riverfront",  src: "cover-ready/Riverfront-cover-867x897.jpg" },
    { name: "Cleveland Municipal Stadium", city: "",           slot: "cv-cleveland",   src: "cover-ready/Cleveland_Municipal-cover-867x897.jpg" },
    { name: "Wrigley Field",             city: "Chicago",      slot: "cv-wrigley",     src: "cover-ready/Wrigley-cover-867x897.jpg" },
    { name: "Dodger Stadium",            city: "Los Angeles",  slot: "cv-dodger",      src: "cover-ready/Dodger-cover-867x897.jpg" },
    { name: "County Stadium",            city: "Milwaukee",    slot: "cv-county",      src: "cover-ready/Milwaukee-County-cover-867x897.jpg" },
    { name: "Three Rivers Stadium",      city: "Pittsburgh",   slot: "cv-threerivers", src: "cover-ready/Three-Rivers-cover-867x897.jpg" },
    { name: "Yankee Stadium",            city: "New York",     slot: "cv-yankee",      src: "cover-ready/Yankee-cover-867x897.jpg" },
    { name: "Anaheim Stadium",           city: "Anaheim",      slot: "cv-angels",      src: "cover-ready/Angel-cover-867x897.jpg" },
    { name: "Tiger Stadium",             city: "Detroit",      slot: "cv-tiger",       src: "cover-ready/Tiger-cover-867x897.jpg" }
  ]
};
