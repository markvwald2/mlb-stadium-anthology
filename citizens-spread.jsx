/* citizens-spread.jsx — the single Citizens Bank Park spread.
   "The Brick District Grid." Reads window.CBP + window.CBPDiagrams.
   LEFT  page: full-bleed aerial hero of the South Philadelphia sports complex;
   a mounted brick-and-stone signage plaque carries the title; a foundation band
   carries the Phillies / NL / MLB marks.
   RIGHT page: warm paper organized as a rowhouse-bay masonry grid over a faint
   site-plan underlay — a carved stone lintel inscription, three rowhouse bays
   (Elevations / Stadium Facts / Stadium Context) above a Lifecycle foundation
   band, and a tall Visit "tower" bay (Ashburn Alley signage) on the right.
   Every populated field renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.CBP;
  const Dg = window.CBPDiagrams || {};

  /* ---- right-page geometry (local coords 0..1275; safe x 37.5..1237.5) ---- */
  /* Outer margins matched to the 18px column gutter: content spans 55..1219
     inside the 37.5..1237.5 safe box (≈18px clear on every edge). Pillars are
     centered in each gutter. */
  const LINTEL = { left: 55, top: 44, width: 1164, height: 54 };
  const TOPY = 116, TOPH = 708;            // 116 .. 824
  const BANDY = 840, BANDH = 206;          // 840 .. 1046
  const BAYS = {
    photo:   { left: 55,  top: TOPY, width: 158, height: TOPH },
    facts:   { left: 231, top: TOPY, width: 227, height: TOPH },
    context: { left: 476, top: TOPY, width: 384, height: 930 },
    visit:   { left: 878, top: 116,  width: 341, height: 930 }
  };
  const BAND = { left: 55, top: BANDY, width: 403, height: BANDH };
  // vertical brick pilasters: [x, top, height] — centered in the 18px gutters
  const PILLARS = [
    [219, 110, 720],
    [464, 110, 936],
    [866, 110, 942]
  ];

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect",
      style: { width: "100%", height: "100%" } });
  }
  function BayHead(props) {
    return e("div", { className: "cbp-bayhead" },
      e("span", { className: "nm" }, props.title),
      props.note ? e("span", { className: "nt" }, props.note) : null);
  }
  function SecHead(props) {
    return e("div", { className: "cbp-h" },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }
  function PhotoPlate(props) {
    return e("figure", { className: "cbp-photo",
      style: { width: "100%", height: props.h + "px", marginTop: (props.mt || 0) + "px" } },
      e(Slot, { id: props.slot, placeholder: props.placeholder }));
  }
  function factRow(row, i) {
    return e("div", { className: "cbp-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" + (row[3] ? " cont" : "") }, row[2]) : null));
  }

  /* weather icons (line drafting, restrained) */
  function WxIcon(kind) {
    const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#574B3D",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "none" } };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "cloud") return e("svg", c, e("path", { d: "M7 18h9.5a3.5 3.5 0 0 0 .4-6.98 5 5 0 0 0-9.65-1.2A3.9 3.9 0 0 0 7 18z" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label) {
    return e("div", { className: "cbp-wcell" }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv" }, value), e("div", { className: "wl" }, label)));
  }

  /* ongoing-upgrade icons (line drafting, consistent with the weather set) */
  function UpIcon(kind) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "#4A4036",
      strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "none" } };
    if (kind === "score") return e("svg", c,
      e("rect", { x: 3, y: 4, width: 18, height: 9, rx: 1 }),
      e("path", { d: "M6.5 7.3h11M6.5 10h7M12 13v6M8 19h8" }));
    if (kind === "concession") return e("svg", c,
      e("path", { d: "M6 9h12M7.6 9l1.3 10h6.2L16.4 9M13 9l2-5" }));
    if (kind === "seating") return e("svg", c,
      e("path", { d: "M3 19h4v-3h4v-3h4v-3h5" }), e("path", { d: "M3 19v-2.4" }));
    if (kind === "outfield") return e("svg", c,
      e("path", { d: "M12 19.2l3-2v-3H9v3z" }),
      e("path", { d: "M10.6 15.4 4.6 7M13.4 15.4 19.4 7" }),
      e("path", { d: "M4.6 7a10 10 0 0 1 14.8 0" }));
    if (kind === "club") return e("svg", c,
      e("path", { d: "M7 11V9.2A2.2 2.2 0 0 1 9.2 7h5.6A2.2 2.2 0 0 1 17 9.2V11" }),
      e("path", { d: "M7 11a1.7 1.7 0 0 0-1.7 1.7V16h13.4v-3.3A1.7 1.7 0 0 0 17 11z" }),
      e("path", { d: "M6.6 16v2.6M17.4 16v2.6" }));
    if (kind === "social") return e("svg", c,
      e("circle", { cx: 8.5, cy: 9, r: 2.2 }), e("circle", { cx: 15.5, cy: 9, r: 2.2 }),
      e("path", { d: "M4.6 18v-1c0-2.3 7.8-2.3 7.8 0" }),
      e("path", { d: "M11.6 18v-1c0-2.3 7.8-2.3 7.8 0" }));
    if (kind === "tech") return e("svg", c,
      e("path", { d: "M8 14a5.6 5.6 0 0 1 8 0" }),
      e("path", { d: "M5.2 11a9.6 9.6 0 0 1 13.6 0" }),
      e("circle", { cx: 12, cy: 17.4, r: 1.1, fill: "#4A4036", stroke: "none" }));
    return null;
  }
  function upCell(r, i) {
    return e("div", { className: "up-cell", key: i }, UpIcon(r.icon),
      e("span", { className: "up-lab" }, r.label));
  }

  /* line score — navy outfield-signal board */
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

  function swatchKey(title, items, key) {
    return e("div", { className: "cbp-key", key: key },
      e("div", { className: "kt" }, title),
      e("div", { className: "ks" },
        items.map((m, i) => e("div", { className: "krow", key: i },
          e("span", { className: "sw", style: { background: m[0] } }),
          e("span", { className: "kl" }, m[1])))));
  }

  function Spread() {
    const F = D.field, V = D.visit, P = D.pitching, W = D.weather;
    return e("div", { className: "cbp-spread", "data-screen-label": "Citizens Bank Park spread" },

      /* ============== LEFT PAGE / HERO ============== */
      e("div", { className: "cbp-page cbp-left", "data-screen-label": "Citizens Bank Park \u2014 hero" },
        e("div", { className: "cbp-hero-slot" },
          e(Slot, { id: "cbp-hero",
            placeholder: "Drop the Citizens Bank Park aerial hero \u2014 the open-air bowl inside the South Philadelphia sports complex: parking fields, approach roads, neighboring-venue infrastructure, outfield scoreboard & Ashburn Alley edge" })),
        e("div", { className: "cbp-hero-scrim" }),

        e("div", { className: "cbp-folio" }, "VISIT", e("b", null, "NO. " + D.visit_order)),
        e("div", { className: "cbp-spine" }, "EST. 2004  \u00b7  PHILADELPHIA, PA  \u00b7  VISIT " + D.visit_order),

        // mounted brick-and-stone signage plaque (lower-left)
        e("div", { className: "cbp-titlewrap" },
          e("div", { className: "cbp-plaque" },
            e("span", { className: "brk tl" }), e("span", { className: "brk tr" }),
            e("span", { className: "brk bl" }), e("span", { className: "brk br" }),
            e("h1", { className: "cbp-name" }, D.name_one_line),
            e("div", { className: "cbp-place" },
              Dg.Bell ? e(Dg.Bell, { size: 30, color: "#BA0C2F" }) : null,
              e("span", { className: "bar" }),
              e("span", { className: "txt" }, D.city + ", " + D.state)))),

        // foundation marks band
        e("div", { className: "cbp-foot" },
          e("div", { className: "fcol" },
            e("img", { className: "phi", src: "assets/philadelphia-phillies-logo.svg", alt: "Philadelphia Phillies" }),
            e("div", { className: "ftx" },
              e("span", { className: "s" }, "HOME OF THE"),
              e("span", { className: "b" }, "PHILADELPHIA PHILLIES"))),
          e("span", { className: "fdiv" }),
          e("div", { className: "fcol" },
            e("img", { className: "nl", src: "assets/nl-logo.png", alt: "National League" }),
            e("div", { className: "ftx" },
              e("span", { className: "s" }, "NATIONAL LEAGUE"),
              e("span", { className: "b" }, "EAST DIVISION"))),
          e("span", { className: "fdiv" }),
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))
      ),

      /* ============== RIGHT PAGE / BRICK DISTRICT GRID ============== */
      e("div", { className: "cbp-page cbp-right", "data-screen-label": "Citizens Bank Park \u2014 brick district grid" },
        // faint site-plan / sports-complex infrastructure underlay
        e("svg", { className: "cbp-underlay", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
          // parking-lot grid
          Array.from({ length: 18 }, (_, i) => e("line", { key: "vx" + i, x1: 40 + i * 68, y1: 30, x2: 40 + i * 68, y2: 1058, stroke: "#9B8C70", strokeWidth: 0.5, opacity: 0.16 })),
          Array.from({ length: 16 }, (_, i) => e("line", { key: "hz" + i, x1: 30, y1: 36 + i * 66, x2: 1245, y2: 36 + i * 66, stroke: "#9B8C70", strokeWidth: 0.5, opacity: 0.12 })),
          // Broad Street / approach axes
          e("line", { x1: 120, y1: -40, x2: 560, y2: 1130, stroke: "#7A2A22", strokeWidth: 1.1, opacity: 0.1 }),
          e("line", { x1: 1180, y1: -40, x2: 760, y2: 1130, stroke: "#1E3A6E", strokeWidth: 1.1, opacity: 0.1 })),

        // steel hairline frame just inside safe margin
        e("div", { className: "cbp-frame" }),

        // ---- carved stone lintel inscription ----
        e("div", { className: "cbp-lintel", style: { left: LINTEL.left + "px", top: LINTEL.top + "px",
            width: LINTEL.width + "px", height: LINTEL.height + "px" } },
          D.lintel.map((c, i) =>
            e("div", { className: "lcell", key: i },
              e("span", { className: "lk" }, c[0]),
              e("span", { className: "lv" }, c[1])))),

        // ---- vertical brick pilasters ----
        PILLARS.map((p, i) =>
          e("div", { className: "cbp-pillar", key: "pl" + i,
            style: { left: p[0] + "px", top: p[1] + "px", height: p[2] + "px" } })),

        /* ---------- BAY 1 : ELEVATIONS (photos + material keys) ---------- */
        e("div", { className: "cbp-bay", style: { left: BAYS.photo.left + "px", top: BAYS.photo.top + "px",
            width: BAYS.photo.width + "px", height: BAYS.photo.height + "px" } },
          e(BayHead, { title: "Elevations", note: "I" }),
          e(PhotoPlate, { slot: D.photos[0][0], placeholder: D.photos[0][1], h: 266, mt: 2 }),
          e(PhotoPlate, { slot: D.photos[1][0], placeholder: D.photos[1][1], h: 188, mt: 10 }),
          e(PhotoPlate, { slot: D.photos[2][0], placeholder: D.photos[2][1], h: 188, mt: 10 })),

        /* ---------- BAY 2 : STADIUM FACTS ---------- */
        e("div", { className: "cbp-bay", style: { left: BAYS.facts.left + "px", top: BAYS.facts.top + "px",
            width: BAYS.facts.width + "px", height: BAYS.facts.height + "px" } },
          e(BayHead, { title: "Stadium Facts", note: "II" }),
          e("div", { className: "cbp-facts" }, D.facts.map(factRow)),
          e("div", { className: "cbp-fieldblock" },
            e(SecHead, { title: "Field Dimensions", note: "FT \u00b7 ORIENT." }),
            window.CitizensProtractor ? e(window.CitizensProtractor, { lf: F.left_field, cf: F.center_field,
              rf: F.right_field, orientation: F.orientation, degrees: F.degrees }) : null)),

        /* ---------- BAY 3 : STADIUM CONTEXT (masonry wall) ---------- */
        e("div", { className: "cbp-bay", style: { left: BAYS.context.left + "px", top: BAYS.context.top + "px",
            width: BAYS.context.width + "px", height: BAYS.context.height + "px" } },
          e(BayHead, { title: "Stadium Context", note: "III" }),
          e("div", { className: "cbp-wall" },
            e("div", { className: "cbp-prose" },
              D.stadium_context.map((p, i) => e("p", { key: i }, p)))),
          e("figure", { className: "cbp-photo cbp-context-photo" },
            e(Slot, { id: D.photos[3][0], placeholder: D.photos[3][1] })),
          e("figure", { className: "cbp-photo cbp-context-photo2" },
            e(Slot, { id: D.photos[4][0], placeholder: D.photos[4][1] }))),

        /* ---------- LIFECYCLE BAND : LINEAGE + ONGOING UPGRADES ---------- */
        e("div", { className: "cbp-band", style: { left: BAND.left + "px", top: BAND.top + "px",
            width: BAND.width + "px", height: BAND.height + "px" } },

          // LINEAGE — fills the space below & left of the field-dimensions diagram
          e("div", { className: "cbp-lineage" },
            e(SecHead, { title: "Stadium Lineage" }),
            e("div", { className: "lin-list" },
              D.lineage.map((s, i) =>
                e("div", { className: "lin-node" + (s.terminus ? " term" : ""), key: i },
                  e("span", { className: "lin-name", style: s.ls ? { letterSpacing: s.ls } : null }, s.name),
                  s.years ? e("span", { className: "lin-yr" }, s.years) : null)))),

          // ONGOING UPGRADES — verbatim renovations note, tucked in the small area below the field diagram
          e("div", { className: "cbp-upgrades" },
            e(SecHead, { title: "Ongoing Upgrades", note: "2004 \u2192" }),
            e("p", { className: "up-note" }, D.renovation_note)))
        ,

        /* ---------- VISIT TOWER BAY (Ashburn Alley signage) ---------- */
        e("div", { className: "cbp-bay cbp-visit", style: { left: BAYS.visit.left + "px", top: BAYS.visit.top + "px",
            width: BAYS.visit.width + "px", height: BAYS.visit.height + "px" } },
          e("div", { className: "cbp-visithead" },
            e("div", { className: "vh-top" },
              e("span", { className: "vh-no" }, "VISIT NO. " + V.no),
              e("span", { className: "vh-tag" }, V.night ? "NIGHT GAME" : "")),
            e("div", { className: "vh-sub" }, V.day + " \u00b7 " + V.date + " \u00b7 " + V.title + " \u00b7 Trip: " + V.trip)),

          // matchup line
          e("div", { className: "cbp-match" },
            e("div", { className: "team away" },
              e("img", { src: "assets/washington-nationals-logo.svg", alt: V.away_team }),
              e("div", { className: "tt" }, e("span", { className: "ab" }, V.away_abbr), e("span", { className: "nm" }, "Washington"))),
            e("span", { className: "at" }, "AT"),
            e("div", { className: "team home" },
              e("div", { className: "tt r" }, e("span", { className: "ab" }, V.home_abbr), e("span", { className: "nm" }, "Philadelphia")),
              e("img", { src: "assets/philadelphia-phillies-logo.svg", alt: V.home_team }))),

          e("div", { className: "cbp-result" }, V.result),

          e("div", { className: "cbp-gi" },
            e("div", { className: "girow" }, e("span", { className: "k" }, "Attendance"), e("span", { className: "v" }, V.attendance)),
            e("div", { className: "girow" }, e("span", { className: "k" }, "First Pitch"), e("span", { className: "v" }, V.first_pitch)),
            e("div", { className: "girow" }, e("span", { className: "k" }, "Time of Game"), e("span", { className: "v" }, V.duration))),

          e(SecHead, { title: "Weather", note: "MAY 4, 2019" }),
          e("div", { className: "cbp-wx" },
            wxCell("temp", W.temperature, "Temp"),
            wxCell("cloud", W.conditions, "Sky"),
            wxCell("wind", W.wind, "Wind"),
            wxCell("drop", W.humidity, "Humidity")),

          e(SecHead, { title: "Pitching", note: "MATCHUP \u00b7 DECISIONS" }),
          e("div", { className: "cbp-pitch" },
            e("div", { className: "prow" }, e("span", { className: "pt" }, P.away_team), e("span", { className: "pn" }, P.away), e("span", { className: "pd" }, "GS")),
            e("div", { className: "prow" }, e("span", { className: "pt" }, P.home_team), e("span", { className: "pn" }, P.home), e("span", { className: "pd" }, "GS")),
            e("div", { className: "prow dec" }, e("span", { className: "pt w" }, "W"), e("span", { className: "pn" }, P.win), e("span", { className: "pd" }, "")),
            e("div", { className: "prow dec" }, e("span", { className: "pt l" }, "L"), e("span", { className: "pn" }, P.loss), e("span", { className: "pd" }, "")),
            e("div", { className: "prow dec" }, e("span", { className: "pt s" }, "SV"), e("span", { className: "pn" }, P.save), e("span", { className: "pd" }, ""))),

          e(SecHead, { title: "Line Score", note: "FINAL \u00b7 9 INN \u00b7 " + V.duration }),
          e("div", { className: "cbp-board" }, Board(D.box)),

          e("figure", { className: "cbp-photo cbp-visit-photo" },
            e(Slot, { id: "cbp-p4",
              placeholder: "Visit photo \u2014 Ashburn Alley / outfield promenade on game night" })),

          e("div", { className: "cbp-vlogos" },
            e("span", { className: "lw" }, e("img", { src: "assets/philadelphia-phillies-logo.svg", alt: "Phillies" })),
            e("span", { className: "lw" }, e("img", { src: "assets/nl-logo.png", alt: "National League" })),
            e("span", { className: "lw" }, e("img", { src: "assets/mlb-logo.svg", alt: "MLB" }))))
      )
    );
  }

  window.CitizensBankParkSpread = Spread;
})();
