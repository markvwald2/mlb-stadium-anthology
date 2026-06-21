/* road-trips-spread.jsx — "THE ROAD TRIPS" lifetime overview.
   A data spread (warm paper across BOTH pages). One continuous chronology rail
   carries twelve trip markers; beneath each marker a contact-sheet photo column
   grows from sparse archival (1986) to photo-rich modern (2025). Six trips live
   on the left page (1986–2018), six on the right (2019–2025); nothing but the
   quiet rail crosses the gutter. Reads window.ROADTRIPS. */
(function () {
  const D = window.ROADTRIPS;
  const e = React.createElement;

  // ---- page geometry (1in = 100px) ----
  const SAFE = { L0: 37.5, L1: 1237.5, R0: 1312.5, R1: 2512.5 };
  const COLS = 6;                        // trips per page
  const COLW_PAGE = (SAFE.L1 - SAFE.L0) / COLS; // 200
  const CARDW = 178;
  const PEN_H = 280;          // pennant badge height
  const PEN_TAIL = 24;        // depth of the bottom V-notch
  const RAIL_Y = 494;
  const FIELD_TOP = 516;

  // pennant silhouette path (outer = fill; inset = crisp all-side stroke)
  const SIL_FILL = "M0 0 H" + CARDW + " V" + (PEN_H - PEN_TAIL) + " L" + (CARDW / 2) + " " + PEN_H + " L0 " + (PEN_H - PEN_TAIL) + " Z";
  const SIL_STROKE = "M1 1 H" + (CARDW - 1) + " V" + (PEN_H - PEN_TAIL - 1) + " L" + (CARDW / 2) + " " + (PEN_H - 1.5) + " L1 " + (PEN_H - PEN_TAIL - 1) + " Z";

  // center x of a trip's column
  function centerX(trip, idxInPage) {
    const base = trip.page === "left" ? SAFE.L0 : SAFE.R0;
    return base + COLW_PAGE * (idxInPage + 0.5);
  }

  function Slot(p) {
    return e("image-slot", { id: p.id, placeholder: p.ph, shape: "rect" });
  }

  // ---- editorial line icons for "The Journey by the Numbers" ----
  function Icon(kind) {
    const c = { width: 44, height: 44, viewBox: "0 0 40 40", fill: "none",
      stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
    if (kind === "road") return e("svg", c,            // open road — trips
      e("path", { d: "M15.5 5 L8 35" }),
      e("path", { d: "M24.5 5 L32 35" }),
      e("path", { d: "M20 7 L20 11 M20 16 L20 22 M20 27 L20 34", strokeWidth: 2.1 }));
    if (kind === "ticket") return e("svg", c,          // admission ticket — games
      e("path", { d: "M7 13 H23 a2 2 0 0 0 4 0 H33 V27 H27 a2 2 0 0 0 -4 0 H7 Z" }),
      e("path", { d: "M25 15.6 V24.4", strokeDasharray: "1 2", strokeWidth: 1.4 }),
      e("path", { d: "M11 18.5 h8 M11 22 h5.5", strokeWidth: 1.3 }));
    if (kind === "stadium") return e("svg", c,         // baseball field — stadiums
      e("path", { d: "M20 32.5 L6 15 Q 20 4 34 15 Z" }),
      e("path", { d: "M20 32.5 L25.5 27 L20 21.5 L14.5 27 Z", strokeWidth: 1.25 }),
      e("path", { d: "M14.5 27 L25.5 27", strokeWidth: 1, opacity: 0.45 }),
      e("circle", { cx: 20, cy: 25.4, r: 0.9, fill: "currentColor", stroke: "none" }));
    if (kind === "rain") return e("svg", c,            // rain cloud — rainout
      e("path", { d: "M12 23 a6 6 0 0 1 1.4 -11.8 A8 8 0 0 1 29 13.5 a5.5 5.5 0 0 1 -1 11 H13" }),
      e("path", { d: "M14 27 L12.3 31.6 M20 27 L18.3 31.6 M26 27 L24.3 31.6", strokeWidth: 1.6 }));
    if (kind === "teams") return e("svg", c,           // ball cap — teams
      e("path", { d: "M9.5 24 C9.5 14 14.5 9.5 20 9.5 C25.5 9.5 30.5 14 30.5 24 Z" }),
      e("path", { d: "M30.5 24 L36.5 26 C37.4 26.4 37.4 26.9 36.5 27.1 L30.5 25.6" }),
      e("circle", { cx: 20, cy: 9.6, r: 1.1, fill: "currentColor", stroke: "none" }),
      e("path", { d: "M20 11 L20 24", opacity: 0.5 }));
    return null;
  }

  // ---- trip marker: hanging pennant badge ----
  function Marker(props) {
    const t = props.trip;
    const cx = props.cx;
    return e("div", {
      className: "rt-pennant", "data-screen-label": t.year + " " + t.name.join(" "),
      style: { left: (cx - CARDW / 2) + "px", "--accent": t.accent },
    },
      // background fill in the pennant silhouette
      e("svg", { className: "rt-pen-fill", viewBox: "0 0 " + CARDW + " " + PEN_H, preserveAspectRatio: "none" },
        e("path", { d: SIL_FILL })),
      // colored header band
      e("div", { className: "rt-pen-head" },
        e("span", { className: "rt-year" }, t.year),
        t.dates ? e("span", { className: "rt-pen-dates" }, t.dates) : null),
      // content
      e("div", { className: "rt-pen-content" },
        e("div", { className: "rt-name" }, t.name.map((ln, i) => e("span", { key: i }, ln))),
        e("div", { className: "rt-meta" },
          e("span", null, t.games, " ", t.games === 1 ? "GAME" : "GAMES"),
          e("span", { className: "rt-meta-dot" }, "\u00b7"),
          e("span", null, t.stadiums, " ", t.stadiums === 1 ? "STADIUM" : "STADIUMS")),
        e("div", { className: "rt-route" },
          t.route.map((r, i) => {
            const o = typeof r === "string" ? { n: r } : r;
            return e("span", { key: i, className: o.alt ? "rt-route-line rt-route-alt" : "rt-route-line" },
              o.n,
              o.cat ? e("span", { className: "rt-route-cat" }, o.cat) : null,
              o.dh ? e("span", { className: "rt-route-dh", title: "Doubleheader" }, "DH") : null);
          }))),
      // all-side outline (drawn on top so it wraps the V-notch and header edges)
      e("svg", { className: "rt-pen-stroke", viewBox: "0 0 " + CARDW + " " + PEN_H, preserveAspectRatio: "none" },
        e("path", { d: SIL_STROKE })));
  }
  function DhGlyph() {
    return e("svg", { className: "rt-flag-ico", width: 13, height: 13, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" },
      e("circle", { cx: 5, cy: 8, r: 2.4 }), e("circle", { cx: 11, cy: 8, r: 2.4 }));
  }
  function RainGlyph() {
    return e("svg", { className: "rt-flag-ico", width: 13, height: 13, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" },
      e("path", { d: "M5 9 a2.6 2.6 0 0 1 .6 -5 A3.4 3.4 0 0 1 12 5.4 a2.4 2.4 0 0 1 -.4 4.6 H5.4" }),
      e("path", { d: "M6 11.5 L5.2 13.6 M9 11.5 L8.2 13.6 M12 11.5 L11.2 13.6", strokeWidth: 1.2 }));
  }

  // ---- memory column: one contact-sheet plate per stadium visited ----
  function MemoryColumn(props) {
    const t = props.trip;
    const cx = props.cx;
    return e("div", {
      className: "rt-memcol", style: { left: (cx - CARDW / 2) + "px", width: CARDW + "px" },
    },
      t.route.map((r) => (typeof r === "string" ? { n: r } : r)).filter((r) => !r.alt).map((r, i) =>
        e("div", { key: i, className: "rt-plate" + (r.stamp ? " rt-plate-stamped" : ""), style: { aspectRatio: t.plateAr } },
          e(Slot, { id: "rt-" + t.key + "-" + i, ph: r.n }),
          r.stamp ? e("div", { className: "rt-plate-stamp" }, r.stamp) : null)));
  }

  function Spread() {
    // split trips per page, keep index within page for x placement
    const left = [], right = [];
    D.trips.forEach((t) => (t.page === "left" ? left : right).push(t));
    const placed = [];
    left.forEach((t, i) => placed.push({ t, cx: centerX(t, i) }));
    right.forEach((t, i) => placed.push({ t, cx: centerX(t, i) }));

    return e("div", { className: "rt-spread", "data-screen-label": "The Road Trips overview spread" },
      e("div", { className: "rt-page rt-left", "data-screen-label": "Road Trips \u2014 left page" }),
      e("div", { className: "rt-page rt-right", "data-screen-label": "Road Trips \u2014 right page" }),

      // ============ HEADER — LEFT: title + stats + intro ============
      e("div", { className: "rt-titleblock" },
        e("h1", { className: "rt-title" }, D.title.map((w, i) => e("span", { key: i }, w))),
        e("div", { className: "rt-statline" },
          D.statline.map((s, i) => e(React.Fragment, { key: i },
            i > 0 ? e("span", { className: "rt-stat-sep" }, "\u00b7") : null,
            e("span", { className: "rt-stat" },
              e("span", { className: "rt-stat-n" }, s.n), " ",
              e("span", { className: "rt-stat-l" }, s.l))))),
        e("div", { className: "rt-note" }, D.note)),
      e("p", { className: "rt-intro" }, D.intro),

      // ============ HEADER — RIGHT: by the numbers ============
      e("div", { className: "rt-numbers" },
        e("div", { className: "rt-numbers-head" },
          e("span", { className: "rt-numbers-title" }, "THE JOURNEY BY THE NUMBERS"),
          e("span", { className: "rt-numbers-span" }, D.span.from, "\u2013", D.span.to, "\u2002\u00b7\u2002", D.span.note)),
        e("div", { className: "rt-numbers-row" },
          D.numbers.map((m, i) =>
            e("div", { className: "rt-numcell", key: i },
              e("div", { className: "rt-numn" }, m.n),
              e("div", { className: "rt-numl" }, m.l.map((ln, j) => e("span", { key: j }, ln))),
              m.sub ? e("div", { className: "rt-numsub" }, m.sub) : null)))),

      // ============ CHRONOLOGY RAIL ============
      e("svg", { className: "rt-rail", viewBox: "0 0 2550 1088", "aria-hidden": "true" },
        e("line", { x1: 64, y1: RAIL_Y, x2: 2486, y2: RAIL_Y, stroke: "#21344A", strokeWidth: 3 }),
        // end caps / arrowheads
        e("path", { d: "M64 " + RAIL_Y + " l13 -6 v12 z", fill: "#21344A" }),
        e("path", { d: "M2486 " + RAIL_Y + " l-13 -6 v12 z", fill: "#21344A" }),
        placed.map((p, i) =>
          e("g", { key: i },
            e("line", { x1: p.cx, y1: RAIL_Y - 22, x2: p.cx, y2: RAIL_Y, stroke: "#21344A", strokeWidth: 1.4, opacity: 0.5 }),
            e("circle", { cx: p.cx, cy: RAIL_Y, r: 8.5, fill: "#F4EEDF", stroke: "#21344A", strokeWidth: 2.6 }),
            e("circle", { cx: p.cx, cy: RAIL_Y, r: 3.2, fill: p.t.accent })))),

      // ============ MARKERS ============
      placed.map((p, i) => e(Marker, { key: "m" + i, trip: p.t, cx: p.cx })),

      // ============ MEMORY FIELD ============
      placed.map((p, i) => e(MemoryColumn, { key: "c" + i, trip: p.t, cx: p.cx })),

      e("div", { className: "rt-colophon" },
        e("img", { className: "rt-colo-mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
        e("span", { className: "rt-colo-txt" }, "A baseball-travel chronicle")));
  }

  window.RoadTripsSpread = Spread;
})();
