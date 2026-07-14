/* petco-spread.jsx — the single Petco Park spread. "The Warehouse Block."
   Reads window.PETCO + window.PetcoProtractor.
   LEFT  page: full-bleed dusk district aerial; a narrow red-brick title-sign
   panel on the outer edge carries the stacked "PETCO PARK" warehouse marker,
   the city line, the Western Metal Supply landmark note, and the team marks.
   RIGHT page: warm sandstone paper organized as FOUR vertical warehouse-facade
   bays divided by brick pilasters —
     A  Stadium Identity & Specifications (+ field protractor)
     B  Stadium Context (unified interior narrative wall)
     C  The Architectural Story (three steel window openings)
     D  Visit Information (scoreboard game artifact, line score dominant)
   Every populated field renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.PETCO;

  /* ---- right-page geometry (local coords 0..1275; safe x 37.5..1237.5) ---- */
  const BAYTOP = 44, BAYBOT = 1048, BAYH = BAYBOT - BAYTOP;
  const BAYS = {
    a: { left: 55,  width: 332 },
    b: { left: 401, width: 528 },
    d: { left: 943, width: 276 }
  };
  // steel drafting separators centered in the gutters: [x, top, height]
  const SEPS = [[393, 96, 944], [935, 96, 944]];

  function Slot(props) {
    return e("image-slot", Object.assign({ id: props.id, placeholder: props.placeholder, shape: "rect",
      style: { width: "100%", height: "100%" } }, props.src ? { src: props.src } : {}));
  }
  function BayHead(props) {
    return e("div", { className: "pk-bayhead" },
      e("span", { className: "nm" }, props.title),
      props.note ? e("span", { className: "nt" }, props.note) : null);
  }
  function Sub(props) { return e("div", { className: "pk-sub" + (props.mod ? " " + props.mod : "") }, e("span", { className: "t" }, props.children)); }
  function schedRow(row, i) {
    return e("div", { className: "pk-srow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: row[3] === "vm" ? "vm" : "vs" }, row[2]) : null));
  }

  /* weather icons (line drafting) */
  function WxIcon(kind) {
    const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#5A4A3A",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "none" } };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "sun") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }),
      e("path", { d: "M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label) {
    return e("div", { className: "pk-wcell" }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv" }, value), e("div", { className: "wl" }, label)));
  }

  /* line score — charcoal scoreboard board (dominant) */
  function Board(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "sep rc" }, t.r),
        e("td", null, t.h),
        e("td", null, t.e));
    }
    return e("table", null,
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function bayStyle(b) {
    return { left: b.left + "px", top: BAYTOP + "px", width: b.width + "px", height: BAYH + "px" };
  }

  function Spread() {
    const F = D.field, V = D.visit, P = D.pitching, W = D.weather;
    return e("div", { className: "pk-spread", "data-screen-label": "Petco Park spread" },

      /* ============== LEFT PAGE / HERO ============== */
      e("div", { className: "pk-page pk-left", "data-screen-label": "Petco Park \u2014 hero" },
        e("div", { className: "pk-hero-slot" },
          e(Slot, { id: "petco-hero", src: "images/petco/petco-park-00-main-5eb1df62.jpg",
            placeholder: "Drop the Petco Park dusk district aerial \u2014 the preserved Western Metal Supply building, downtown East Village street grid, Gallagher Square, open concourses & the bay beyond. Avoid field-centered framing." })),
        e("div", { className: "pk-hero-scrim" }),
        e("div", { className: "pk-folio" }, "VISIT", e("b", null, "NO. " + D.visit_order)),

        /* ---- slim black-steel title rail (vertically mounted signage) ---- */
        e("div", { className: "pk-rail" },
          e("div", { className: "pk-rail-name" },
            e("div", { className: "vert" },
              e("span", { className: "nm" }, D.stadium_name.toUpperCase()),
              e("span", { className: "pl" }, D.city + " \u00b7 " + D.state))),
          e("div", { className: "pk-rail-foot" },
            e("div", { className: "pk-rail-mark" },
              e("div", { className: "m1" }, D.landmark[0]),
              e("div", { className: "m2" }, (D.landmark[1] + " " + D.landmark[2]).toUpperCase())),
            e("div", { className: "pk-rail-rule" }),
            e("div", { className: "pk-rail-logos" },
              e("span", { className: "lw" },
                e("img", { src: "assets/san-diego-padres-logo.svg", alt: "San Diego Padres" })),
              e("span", { className: "lw" },
                e("img", { src: "assets/mlb-logo.svg", alt: "MLB" })),
              e("span", { className: "lw" },
                e("img", { src: "assets/nl-logo.png", alt: "National League" })))))
      ),

      /* ============== RIGHT PAGE / WAREHOUSE BAYS ============== */
      e("div", { className: "pk-page pk-right", "data-screen-label": "Petco Park \u2014 warehouse-block bays" },
        // faint drafting grid / parcel underlay (light steel on the dark sheet)
        e("svg", { className: "pk-underlay", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
          Array.from({ length: 18 }, (_, i) => e("line", { key: "vx" + i, x1: 40 + i * 68, y1: 30, x2: 40 + i * 68, y2: 1058, stroke: "#8A8170", strokeWidth: 0.5, opacity: 0.07 })),
          Array.from({ length: 16 }, (_, i) => e("line", { key: "hz" + i, x1: 30, y1: 36 + i * 66, x2: 1245, y2: 36 + i * 66, stroke: "#8A8170", strokeWidth: 0.5, opacity: 0.055 })),
          e("line", { x1: 120, y1: -40, x2: 600, y2: 1130, stroke: "#C99A4A", strokeWidth: 1.1, opacity: 0.06 }),
          e("line", { x1: 1180, y1: -40, x2: 700, y2: 1130, stroke: "#C99A4A", strokeWidth: 1.1, opacity: 0.05 })),

        e("div", { className: "pk-frame" }),
        e("div", { className: "pk-corner tl" }), e("div", { className: "pk-corner tr" }),
        e("div", { className: "pk-corner bl" }), e("div", { className: "pk-corner br" }),

        SEPS.map((p, i) =>
          e("div", { className: "pk-sep", key: "sp" + i,
            style: { left: p[0] + "px", top: p[1] + "px", height: p[2] + "px" } })),

        /* ---------- BAY A : STADIUM IDENTITY ---------- */
        e("div", { className: "pk-bay", style: bayStyle(BAYS.a) },
          e(BayHead, { title: "Stadium Identity" }),
          e("div", { className: "pk-idlogos" },
            e("span", { className: "lw" }, e("img", { src: "assets/san-diego-padres-logo.svg", alt: "San Diego Padres" })),
            e("span", { className: "lw" }, e("img", { src: "assets/mlb-logo.svg", alt: "MLB" })),
            e("span", { className: "lw" }, e("img", { src: "assets/nl-logo.png", alt: "National League" }))),
          e("div", { className: "pk-sched" }, D.identity.map(schedRow)),
          e(Sub, null, "Specifications"),
          e("div", { className: "pk-sched" }, D.specs.map(schedRow)),
          e("div", { className: "pk-sched", style: { borderTop: "1px solid var(--rule)" } },
            schedRow(["Era", "Retro Classic"], "ec"),
            schedRow(["Preceded By", D.preceded_by], "pb")),
          e(Sub, null, "Field Geometry"),
          window.PetcoProtractor ? e("div", { style: { display: "flex", justifyContent: "center", marginTop: "10px" } },
            e("div", { style: { width: "198px" } },
              e(window.PetcoProtractor, { lf: F.left_field, cf: F.center_field, rf: F.right_field,
                orientation: F.orientation, degrees: F.degrees }))) : null),

        /* ---------- BAY B : STADIUM CONTEXT (2-col prose with 2 full-width inline landscape photos) ---------- */
        e("div", { className: "pk-bay", style: bayStyle(BAYS.b) },
          e(BayHead, { title: "The Warehouse Corner" }),
          e("div", { className: "pk-wall" },
            e("div", { className: "pk-prose" },
              e("p", { key: "p0" },
                e("span", { className: "fw-dropcap" }, D.stadium_context[0].charAt(0)),
                D.stadium_context[0].slice(1)),
              e("p", { key: "p1" }, D.stadium_context[1]),
              e("figure", { className: "pk-window pk-ctxfig", key: "f0" },
                e(Slot, { id: D.windows[0][0], placeholder: D.windows[0][1], src: D.windows[0][2] })),
              e("p", { key: "p2" }, D.stadium_context[2]),
              e("p", { key: "p3" }, D.stadium_context[3]),
              e("figure", { className: "pk-window pk-ctxfig", key: "f1" },
                e(Slot, { id: D.windows[1][0], placeholder: D.windows[1][1], src: D.windows[1][2] }))))),

        /* ---------- BAY D : VISIT INFORMATION (game artifact) ---------- */
        e("div", { className: "pk-bay", style: Object.assign(bayStyle(BAYS.d), { justifyContent: "space-between" }) },
          e(BayHead, { title: "Visit Information" }),
          e("div", { className: "pk-vhead", style: { marginTop: "0" } },
            e("div", { className: "vh-top" },
              e("span", { className: "vh-no" }, "VISIT NO. " + V.no + " OF " + D.visits_total),
              e("span", { className: "vh-tag" }, V.night ? "NIGHT GAME" : "")),
            e("div", { className: "vh-sub" }, V.title + " \u00b7 " + V.day + ", " + V.date)),

          e("div", { className: "pk-match" },
            e("div", { className: "team away" },
              e("img", { src: "assets/oakland-athletics-logo.svg", alt: V.away_team }),
              e("span", { className: "tn" }, V.away_team)),
            e("span", { className: "at" }, "AT"),
            e("div", { className: "team home" },
              e("img", { src: "assets/san-diego-padres-logo.svg", alt: V.home_team }),
              e("span", { className: "tn" }, V.home_team))),

          e("div", { className: "pk-result" }, V.result),

          e("div", { className: "pk-gi" },
            e("div", { className: "girow" }, e("span", { className: "k" }, "Attendance"), e("span", { className: "v" }, V.attendance)),
            e("div", { className: "girow" }, e("span", { className: "k" }, "First Pitch"), e("span", { className: "v" }, V.first_pitch)),
            e("div", { className: "girow" }, e("span", { className: "k" }, "Time of Game"), e("span", { className: "v" }, V.duration))),

          e(Sub, { mod: "up" }, "Weather"),
          e("div", { className: "pk-wx" },
            wxCell("temp", W.temperature, "Temp"),
            wxCell("sun", W.conditions, "Sky"),
            wxCell("wind", W.wind, "Wind"),
            wxCell("drop", W.humidity, "Humidity")),

          e(Sub, { mod: "up" }, "Pitching"),
          e("div", { className: "pk-matchup" },
            e("span", { className: "mt" }, P.away_team),
            e("span", { className: "mn" }, P.away),
            e("span", { className: "vs" }, "vs"),
            e("span", { className: "mt" }, P.home_team),
            e("span", { className: "mn" }, P.home)),

          e("figure", { className: "pk-vfig" },
            e(Slot, { id: "petco-visit-photo", src: "images/petco/petco-park-01alt.jpg",
              placeholder: "Group photo in the seats" })),

          e(Sub, null, "Line Score"),
          e("div", { className: "pk-board" }, Board(D.box)),

          e(Sub, null, "Decisions"),
          e("div", { className: "pk-pitch" },
            e("div", { className: "prow dec" }, e("span", { className: "pt w" }, "W"), e("span", { className: "pn" }, P.win), e("span", { className: "pd" }, "")),
            e("div", { className: "prow dec" }, e("span", { className: "pt l" }, "L"), e("span", { className: "pn" }, P.loss), e("span", { className: "pd" }, "")),
            e("div", { className: "prow dec" }, e("span", { className: "pt s" }, "SV"), e("span", { className: "pn" }, P.save), e("span", { className: "pd" }, ""))),

          e("div", { className: "pk-vlogos" },
            e("span", { className: "lw" }, e("img", { src: "assets/san-diego-padres-logo.svg", alt: "Padres" })),
            e("span", { className: "lw" }, e("img", { src: "assets/mlb-logo.svg", alt: "MLB" })),
            e("span", { className: "lw" }, e("img", { src: "assets/nl-logo.png", alt: "National League" }))))
      )
    );
  }

  window.PetcoParkSpread = Spread;
})();
