/* jacket-spread.jsx — the full wraparound DUST JACKET as one wide sheet.
   Laid flat, outside-up, reading left→right:
     [back flap] [BACK COVER = "Happy 2026 Father's Day" poster]
     [spine] [FRONT COVER = "Big League NL ◇ AL Ballparks"] [front flap]

   Reuses the front-cover photo grid (COVER_DATA, images/cover) and the
   Father's-Day poster grid (OPENING_DATA.right, images/opening), so the slot
   ids — and therefore the user's already-dropped photos — carry over verbatim.
   Geometry (100 px/in) is owned by window.JACKET_GEO (set in jacket-app.jsx).
   window.JacketSpread */
(function () {
  // ---- jacket geometry, design canvas @ 100 px/in (1 in = 100 px) ----------
  // Blurb Large Landscape, Hardcover — flapless wraparound cover spec:
  //   final PDF (with bleed)  26.681 × 11.625 in   = 2668.1 × 1162.5 px
  //   trim                    26.069 × 11.013 in   = 2606.9 × 1101.3 px
  //   bleed (all edges)       0.306 in              = 30.6 px
  //   spine                   0.569 in wide          = 56.9 px
  //   flaps                   NONE
  //   safe inset from trim    0.25 in                = 25 px
  //   each cover panel        (26.069 − 0.569)/2 = 12.75 in = 1275 px
  //   layout L→R: [BACK COVER = father's day][spine][FRONT COVER = big league]
  const BLEED = 30.6, SPINE_W = 56.9, COVER_W = 1275;
  const TRIM_W = 2606.9, TRIM_H = 1101.3, CANVAS_W = 2668.1, CANVAS_H = 1162.5;
  const G = {
    BLEED: BLEED, SPINE_W: SPINE_W, COVER_W: COVER_W,
    TRIM_W: TRIM_W, TRIM_H: TRIM_H, CANVAS_W: CANVAS_W, CANVAS_H: CANVAS_H,
    SAFE: 25,
    // x boundaries, left→right (design px)
    xTrimLeft: BLEED,                       // 30.6
    xBackCover: BLEED,                      // 30.6  (back cover = outer-left, no flap)
    xSpine: BLEED + COVER_W,                // 1305.6
    xFrontCover: BLEED + COVER_W + SPINE_W, // 1362.5
    xTrimRight: CANVAS_W - BLEED,           // 2637.5
    yTrimTop: BLEED,                        // 30.6
    yTrimBot: CANVAS_H - BLEED              // 1131.9
  };
  window.JACKET_GEO = G;

  const FRONT = window.COVER_DATA;                 // Big League front cover
  const BACK_PARKS = window.OPENING_DATA.right;    // Father's Day poster parks
  const FRONT_TITLE = window.COVER_DATA.title;     // Big League · NL AL · Ballparks
  const BACK_TITLE = window.OPENING_DATA.titleRight; // Happy · 20 26 · Father's Day

  // 4×4 grid placement for 14 parks; row 3 cols 2–3 hold the wordmark block.
  const PLACE = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
    { r: 3, c: 1 },                                   { r: 3, c: 4 },
    { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }
  ];

  function Cell(props) {
    const p = props.park, pl = props.place;
    return React.createElement("figure", {
      className: "jk-cell",
      style: { gridColumn: pl.c, gridRow: pl.r }
    },
      React.createElement("div", { className: "jk-photo" },
        React.createElement("image-slot", {
          id: p.slot,
          shape: "rect",
          src: props.srcDir + p.slot + ".jpg",
          placeholder: "Aerial \u2014 " + p.name
        })
      ),
      React.createElement("figcaption", { className: "jk-cap" },
        p.city
          ? [p.name + ", ", React.createElement("span", { className: "jk-cap-city", key: "c" }, p.city)]
          : p.name
      )
    );
  }

  function CoverPanel(props) {
    return React.createElement("div", {
      className: "jk-cover " + props.kind,
      "data-screen-label": props.label,
      style: { left: props.left + "px", width: G.COVER_W + "px" }
    },
      React.createElement("div", { className: "jk-grid" },
        props.parks.map(function (p, i) {
          return React.createElement(Cell, { key: p.slot, park: p, place: PLACE[i], srcDir: props.srcDir });
        }),
        React.createElement("div", { className: "jk-titleblock", style: { gridColumn: "2 / 4", gridRow: 3 } },
          React.createElement(window.CoverLogo, { iconHeight: 60, title: props.title })
        )
      )
    );
  }

  function JacketSpread() {
    return React.createElement("div", {
      className: "jk-jacket",
      "data-screen-label": "Dust jacket (full wrap)",
      style: { width: G.CANVAS_W + "px", height: G.CANVAS_H + "px" }
    },
      // BACK COVER (left of spine) — Father's Day poster
      React.createElement(CoverPanel, {
        kind: "jk-back", label: "Back cover \u2014 Happy Father\u2019s Day 2026",
        parks: BACK_PARKS, title: BACK_TITLE, srcDir: "images/opening/", left: G.xBackCover
      }),
      // FRONT COVER (right of spine) — Big League grid
      React.createElement(CoverPanel, {
        kind: "jk-front", label: "Front cover \u2014 Big League NL \u00b7 AL Ballparks",
        parks: FRONT.parks, title: FRONT_TITLE, srcDir: "images/cover/", left: G.xFrontCover
      }),
      // SPINE — echoes the front-cover wordmark, then the Father's Day line
      React.createElement("div", {
        className: "jk-spine", "data-screen-label": "Spine",
        style: { left: G.xSpine + "px", width: G.SPINE_W + "px" }
      },
        React.createElement("div", { className: "jk-spine-text" },
          React.createElement("span", { className: "jk-spine-word" }, "Big League NL"),
          React.createElement(window.FieldIcon, { height: 19 }),
          React.createElement("span", { className: "jk-spine-word" }, "AL Ballparks"),
          React.createElement("span", { className: "jk-spine-dot" }, "\u25C7"),
          React.createElement("span", { className: "jk-spine-word" }, "Father\u2019s Day"),
          React.createElement("span", { className: "jk-spine-num" }, "2026")
        )
      )
    );
  }

  window.JacketSpread = JacketSpread;
})();
