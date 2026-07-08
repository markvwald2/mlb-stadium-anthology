/* tropicana-spread.jsx — the single Tropicana Field spread. "The Service Deck."
   Controlling metaphor: BASEBALL INSIDE A GARAGE — a full MLB field sealed in a
   utilitarian fixed-dome enclosure. Reads window.TROPICANA + window.TropicanaProtractor.
   LEFT page: full-bleed dome-interior hero (enclosure, catwalks, roof volume,
   synthetic turf), with a compact civic-wayfinding title plaque mounted into the
   architecture. RIGHT page: cool concrete/roof-white paper organized as horizontal
   ROOF-SERVICE BAYS divided by thin steel seams —
     Bay 1  page masthead (Facility Record)
     Bay A  two stacked roof-bay photo strips     Bay B  Facility Specification register
     Bay C  unified Stadium Context (dominant mass, full width)
     Bay D  Game Operations display (electronic scoreboard)   Bay E  support photo +
            field diagram + construction/lifecycle + marks
   Synthetic turf green is the one strong color field; Rays navy / Columbia / yellow
   are restrained accents. Every populated value renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.TROPICANA;

  /* right-page geometry (local 0..1275; safe x 37.5..1237.5, y 37.5..1050.5) */
  const BAYS = {
    a: { left: 46,  top: 96,  width: 462, height: 220 },
    b: { left: 546, top: 96,  width: 689, height: 220 },
    c: { left: 46,  top: 340, width: 870, height: 458 },
    f: { left: 936, top: 340, width: 299, height: 458 },
    d: { left: 46,  top: 822, width: 588, height: 226 },
    e: { left: 672, top: 822, width: 563, height: 226 }
  };
  const HSEAMS = [84, 328, 810];                 // full-width horizontal seams
  const VSEAMS = [[524, 96, 220], [926, 340, 458], [651, 822, 226]]; // [x, top, height]

  function rect(b) { return { left: b.left + "px", top: b.top + "px", width: b.width + "px", height: b.height + "px" }; }

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect",
      src: props.src, style: { width: "100%", height: "100%" } });
  }
  function Head(props) {
    return e("div", { className: "tf-head" },
      e("span", { className: "nm" }, props.title),
      props.code ? e("span", { className: "code" }, props.code) : null);
  }
  function specRow(row, i) {
    return e("div", { className: "tf-srow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }
  function lifeRow(row, i) {
    var tall = row[1] && (String(row[1]).indexOf("\n") >= 0 || String(row[1]).length > 55);
    return e("div", { className: "tf-lrow" + (tall ? " tall" : ""), key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }

  function WxIcon(kind) {
    const c = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "#9fc6ee",
      strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "none" } };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "sky") return e("svg", c, e("path", { d: "M6 16a4 4 0 0 1 .6-7.96A5 5 0 0 1 16.5 9 3.5 3.5 0 0 1 17 16z" }), e("path", { d: "M9 19l-1 2M13 19l-1 2M17 19l-1 2" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label) {
    return e("div", { className: "wc" }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv" }, value), e("div", { className: "wl" }, label)));
  }

  /* LED line score board */
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
    return e("table", { className: "tf-board" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, Number(box.away.r) > Number(box.home.r)),
        row(box.home, Number(box.home.r) > Number(box.away.r))));
  }

  function Spread() {
    const F = D.field, V = D.visit, P = D.pitching, W = D.weather;
    const coord = (D.specs.find(function (s) { return s[0] === "Coordinates"; }) || [])[1] || "";

    return e("div", { className: "tf-spread", "data-screen-label": "Tropicana Field spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "tf-page tf-left", "data-screen-label": "Tropicana Field \u2014 dome hero (left page)" },
        e("div", { className: "tf-hero-slot" },
          e(Slot, { id: "trop-hero", src: "uploads/tropicana-field-00-main.jpg",
            placeholder: "Drop the Tropicana Field interior hero \u2014 an MLB game occurring INSIDE the engineered enclosure: slanted white PTFE dome ceiling, catwalk rings, suspended lighting & the synthetic turf below. Emphasize the enclosed roof volume; avoid exterior glamour, skyline or Florida sunshine." })),
        e("div", { className: "tf-hero-scrim" }),

        e("div", { className: "tf-folio" }, "VISIT", e("b", null, "NO. " + D.visit_order), "\u00b7 " + D.trip.toUpperCase()),
        e("div", { className: "tf-spine" }, "FIXED-DOME MULTIPURPOSE \u00b7 EST. 1990 \u00b7 ST. PETERSBURG, FLORIDA"),

        // white identification plate \u2014 mounted at the top
        e("div", { className: "tf-idplate" },
          e("img", { className: "tf-team-logo", src: "assets/tampa-bay-rays-logo.svg", alt: D.team_name }),
          e("div", { className: "tf-id-txt" },
            e("div", { className: "tm" }, D.team_name),
            e("div", { className: "lg" },
              e("span", null, D.league), e("span", null, "\u00b7"), e("span", { className: "dv" }, D.division))),
          e("span", { className: "tf-id-div" }),
          e("img", { className: "tf-mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("img", { className: "tf-al", src: "assets/american-league-logo.png", alt: "American League" })),

        // ---- title, anchored at the bottom on the scrim ----
        e("div", { className: "tf-titleblock" },
          e("p", { className: "tf-eyebrow" },
            e("span", { className: "dot" }), "Fixed-dome multipurpose \u00b7 Est. 1990"),
          e("h1", { className: "tf-title" },
            e("span", null, D.name_lines[0]),
            e("span", { className: "l2" }, D.name_lines[1])),
          e("div", { className: "tf-cityrow" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)))
      ),

      /* ================= RIGHT PAGE / SERVICE DECK ================= */
      e("div", { className: "tf-page tf-right", "data-screen-label": "Tropicana Field \u2014 service-deck bays (right page)" },

        // faint structural underlay: slanted dome plane + catwalk rings + grid
        e("svg", { className: "tf-underlay", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
          Array.from({ length: 17 }, (_, i) => e("line", { key: "vx" + i, x1: 46 + i * 72, y1: 40, x2: 46 + i * 72, y2: 1048, stroke: "#7E868C", strokeWidth: 0.5, opacity: 0.05 })),
          Array.from({ length: 15 }, (_, i) => e("line", { key: "hz" + i, x1: 46, y1: 56 + i * 68, x2: 1235, y2: 56 + i * 68, stroke: "#7E868C", strokeWidth: 0.5, opacity: 0.045 })),
          // slanted dome roof plane pressing across the top
          e("path", { d: "M46 150 Q640 56 1235 150", fill: "none", stroke: "#092C5C", strokeWidth: 1, opacity: 0.08 }),
          e("path", { d: "M46 176 Q640 86 1235 176", fill: "none", stroke: "#092C5C", strokeWidth: 1, opacity: 0.06 }),
          // catwalk-ring motif, lower-right quiet corner
          [150, 112, 74].map((r, i) => e("circle", { key: "cr" + i, cx: 1150, cy: 250, r: r, stroke: "#092C5C", strokeWidth: 1, opacity: 0.06, fill: "none" }))),

        // structural seams
        HSEAMS.map((y, i) => e("div", { className: "tf-seam", key: "hs" + i, style: { left: "46px", right: "40px", top: y + "px" } },
          e("span", { className: "cap l" }), e("span", { className: "cap r" }))),
        VSEAMS.map((s, i) => e("div", { key: "vs" + i, style: { position: "absolute", zIndex: 4,
          left: s[0] + "px", top: s[1] + "px", height: s[2] + "px", borderLeft: "1.5px solid var(--seam)" } })),

        /* ---- Bay 1 : page masthead ---- */
        e("div", { className: "tf-bay", style: { left: "46px", top: "40px", width: "1189px", height: "34px" } },
          e("div", { className: "tf-sec" },
            e("div", { className: "marque" },
              e("svg", { className: "glyph", width: 30, height: 22, viewBox: "0 0 30 22", fill: "none" },
                e("path", { d: "M2 16 Q15 3 28 16", stroke: "#092C5C", strokeWidth: 1.6 }),
                e("ellipse", { cx: 15, cy: 16, rx: 9, ry: 2.6, stroke: "#092C5C", strokeWidth: 1.4, fill: "none" }),
                e("circle", { cx: 15, cy: 16, r: 1.6, fill: "#F5D130" })),
              e("h2", null, "Tropicana Field")),
            e("div", { className: "scale" },
              Array.from({ length: 30 }, (_, i) => e("span", { className: "t" + (i % 5 === 0 ? " big" : ""), key: i }))),
            e("span", { className: "stamp" }, "FACILITY RECORD \u00b7 " + D.bay_caption.toUpperCase()))),

        /* ---- Bay A : single roof-bay photo ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.a) },
          e("figure", { className: "tf-frame", style: { margin: 0, width: "100%", height: "100%" } },
            e(Slot, { id: D.roof_photos[0][0], placeholder: D.roof_photos[0][1], src: D.roof_photos[0][2] }))),

        /* ---- Bay B : facility specification register ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.b) },
          e(Head, { title: "Facility Specification", code: "PLANT \u00b7 STRUCTURE" }),
          e("div", { className: "tf-spec" }, D.specs.map(specRow))),

        /* ---- Bay C : unified Stadium Context (dominant) with embedded landscape photo ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.c) },
          e("div", { className: "tf-ctx-prose" },
            D.stadium_context.slice(0, 3).map((p, i) => e("p", { key: i, style: i === 0 ? { fontWeight: 500 } : null }, p)),
            e("figure", { className: "tf-ctx-photo", key: "photo" },
              e(Slot, { id: D.roof_photos[1][0], placeholder: D.roof_photos[1][1], src: D.roof_photos[1][2] })),
            e("p", { key: 3 }, D.stadium_context[3]))),

        /* ---- Bay F : Construction & Lifecycle (middle row, right) ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.f) },
          e("div", { className: "tf-life" },
            e(Head, { title: "Construction & Lifecycle" }),
            e("div", { className: "rows" }, D.lifecycle.map(lifeRow)),
            e("div", { className: "tf-keyfoot" },
              e("div", { className: "tf-logos" },
                e("img", { src: "assets/tampa-bay-rays-logo.svg", alt: "Rays" }),
                e("img", { src: "assets/mlb-logo.svg", alt: "MLB", style: { height: "30.8px" } }),
                e("img", { className: "al", src: "assets/american-league-logo.png", alt: "American League" }))))),

        /* ---- Bay D : Game Operations display ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.d) },
          e("div", { className: "tf-ops" },
            e("div", { className: "tf-ops-head" },
              e("span", { className: "lab" }, "Game Day"),
              e("span", { className: "no" }, "VISIT NO. " + V.no + " \u00b7 " + V.day.toUpperCase() + ", " + V.date.toUpperCase())),
            e("div", { className: "tf-ops-body" },
              // left ops col — game details, weather
              e("div", { className: "tf-ops-col" },
                e("div", { className: "tf-gi-wrap" },
                  e("div", { className: "tf-gi" },
                    e("div", { className: "row" }, e("span", { className: "k" }, "Trip"), e("span", { className: "v" }, V.trip)),
                    e("div", { className: "row" }, e("span", { className: "k" }, "First Pitch"), e("span", { className: "v" }, V.first_pitch)),
                    e("div", { className: "row combo" },
                      e("span", { className: "pair" }, e("span", { className: "k" }, "Attendance"), e("span", { className: "v" }, V.attendance)),
                      e("span", { className: "pair" }, e("span", { className: "k" }, "Time of Game"), e("span", { className: "v" }, V.duration)))),
                  e("div", { className: "tf-starters" },
                    e("span", { className: "nm" }, P.away), e("span", { className: "ab" }, V.away_abbr),
                    e("span", { className: "vs" }, "vs"),
                    e("span", { className: "nm" }, P.home), e("span", { className: "ab" }, V.home_abbr))),
                e("div", { className: "tf-ops-sub" }, "Conditions \u00b7 Climate-Controlled"),
                e("div", { className: "tf-wx" },
                  wxCell("temp", W.temperature, "Temp"),
                  wxCell("sky", W.conditions, "Sky"),
                  wxCell("wind", W.wind, "Wind"),
                  wxCell("drop", W.humidity, "Humidity"))),
              // right ops col — matchup, result, line score
              e("div", { className: "tf-ops-col div" },
                e("div", { className: "tf-match" },
                  e("img", { src: "assets/baltimore-orioles-logo.svg", alt: V.away_team }),
                  e("div", { className: "tn" }, e("span", { className: "ab" }, V.away_abbr), e("span", { className: "nm" }, "Orioles")),
                  e("span", { className: "vs" }, "AT"),
                  e("div", { className: "tn" }, e("span", { className: "ab" }, V.home_abbr), e("span", { className: "nm" }, "Rays")),
                  e("img", { src: "assets/tampa-bay-rays-logo.svg", alt: V.home_team })),
                e("div", { className: "tf-result" }, V.result),
                Board(D.box),
                e("div", { className: "tf-dec", style: { marginTop: "7px" } },
                  e("div", { className: "d" }, e("span", { className: "t w" }, "W"), e("span", { className: "n" }, P.win)),
                  e("div", { className: "d" }, e("span", { className: "t l" }, "L"), e("span", { className: "n" }, P.loss)),
                  e("div", { className: "d" }, e("span", { className: "t s" }, "SV"), e("span", { className: "n" }, P.save))))))),

        /* ---- Bay E : field diagram | bottom-right photo ---- */
        e("div", { className: "tf-bay", style: rect(BAYS.e) },
          e("div", { className: "tf-e-grid" },
            // LEFT: field diagram
            e("div", { className: "tf-fieldfig" },
              e(Head, { title: "Field Diagram", code: F.orientation + " " + F.bearing + "\u00b0" }),
              window.TropicanaProtractor ? e(window.TropicanaProtractor, {
                lf: F.left_field, cf: F.center_field, rf: F.right_field,
                orientation: F.orientation, bearing: F.bearing }) : null,
              e("div", { className: "tf-colorkey" },
                D.team_colors.map((c, i) => e("div", { className: "ck", key: i },
                  e("span", { className: "sw", style: { background: c[0] } }),
                  e("span", { className: "lb" }, c[1]))))),
            // RIGHT: bottom-right photo
            e("figure", { className: "tf-ctxphoto", style: { margin: 0 } },
              e(Slot, { id: D.support_photo[0], placeholder: D.support_photo[1], src: D.support_photo[2] }))))
      )
    );
  }

  window.TropicanaFieldSpread = Spread;
})();
