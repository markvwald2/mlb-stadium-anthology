/* busch-spread.jsx — the Busch Stadium spread, "The Civic Arch".
   Reads window.BUSCH + window.BuschProtractor.
   LEFT  page: full-bleed dusk aerial hero — brick mass, downtown skyline, the
   Gateway Arch and Mississippi River bridges; compact carved title block.
   RIGHT page: limestone paper organized as five structural bays (bridge spans /
   arch ribs). A documentary photo strip rides the top; a metadata ribbon spans
   beneath it like a bridge track; a three-column zone holds the museum Stadium
   Facts + protractor, the unified Stadium Context, and a framed press-box Visit
   Section with a scorecard ledger and a weather exhibit label. Faint engineering
   grid + Gateway-Arch linework sits behind. Photos carry NO captions. */
(function () {
  const e = React.createElement;
  const D = window.BUSCH;
  const Protractor = window.BuschProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src, position: props.position });
  }
  function SecHead(props) {
    return e("div", { className: "bz-h" + (props.red ? " red" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }
  function factRow(row, i) {
    return e("div", { className: "bz-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" + (row[3] === "roman" ? " roman" : "") }, row[2]) : null));
  }
  function ribbonLines(val) {
    return val.split("\n").map((ln, i) => e("span", { className: "rl-ln", key: i }, ln));
  }

  function WxIcon(kind) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "#544D42",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "bz-wico" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "sky") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4.4 }),
      e("path", { d: "M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.5 5.5l1.3 1.3M17.2 17.2l1.3 1.3M18.5 5.5l-1.3 1.3M6.8 17.2l-1.3 1.3" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label, small) {
    return e("div", { className: "bz-wcell" + (small ? " sm" : "") }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv" }, value), e("div", { className: "wl" }, label)));
  }

  function LineScore(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "inn" }, n)),
        e("td", { className: "rcol sep" }, t.r),
        e("td", { className: "hecol" }, t.h),
        e("td", { className: "hecol" }, t.e));
    }
    return e("table", { className: "bz-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, "\u2022"),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  // ---------- right-page armature: engineering grid + Gateway-Arch linework ----------
  function Armature() {
    const grid = [];
    for (let x = 0; x <= 1275; x += 42.5) grid.push(e("line", { key: "gx" + x, x1: x, y1: 0, x2: x, y2: 1088, stroke: "#1B2C4B", strokeWidth: 0.5, opacity: 0.05 }));
    for (let y = 0; y <= 1088; y += 42.5) grid.push(e("line", { key: "gy" + y, x1: 0, y1: y, x2: 1275, y2: y, stroke: "#1B2C4B", strokeWidth: 0.5, opacity: 0.05 }));
    // Gateway Arch (catenary) springing from the lower-right, faint survey linework
    const arches = [];
    [330, 300, 270].forEach((span, i) => {
      const cx = 980, base = 1120, h = 760 - i * 26, w = span;
      arches.push(e("path", { key: "arch" + i,
        d: "M " + (cx - w) + " " + base + " C " + (cx - w * 0.34) + " " + (base - h) + " " + (cx + w * 0.34) + " " + (base - h) + " " + (cx + w) + " " + base,
        fill: "none", stroke: "#9E2B2B", strokeWidth: i === 0 ? 1.4 : 1, opacity: i === 0 ? 0.10 : 0.06 }));
    });
    return e("svg", { className: "bz-armature", viewBox: "0 0 1275 1088", preserveAspectRatio: "none" }, grid, arches);
  }

  function Spread() {
    return e("div", { className: "bz-spread", "data-screen-label": "Busch Stadium spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "bz-page bz-left", "data-screen-label": "Busch Stadium \u2014 hero" },
        e("div", { className: "bz-hero-slot" },
          e(Slot, { id: "busch-hero", src: "images/busch/busch-stadium-00-main.jpg", placeholder: "Drop the Busch Stadium hero \u2014 dusk aerial: brick & cast-stone mass, the open bowl, downtown skyline, the Gateway Arch and the Mississippi River bridges beyond" })),
        e("div", { className: "bz-hero-scrim" }),

        e("div", { className: "bz-folio" }, "VISIT NO. " + D.visit_order),
        e("div", { className: "bz-spine" }, "EST. " + D.est + "  \u00b7  ST. LOUIS, MISSOURI  \u00b7  VISIT " + D.visit_order),

        e("div", { className: "bz-hero-title" },
          D.name_lines.map((ln, i) => e("h1", { className: "bz-name", "data-t": ln, key: i }, ln)),
          e("div", { className: "bz-sub" },
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "bz-geo" },
            e("span", { className: "ln" }, D.coordinates),
            e("span", { className: "ln" }, "ELEVATION " + D.elevation.toUpperCase()))),

        e("div", { className: "bz-marks" },
          e("img", { className: "cards", src: "assets/cardinals-stl-insignia.svg", alt: "St. Louis Cardinals" }),
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "lg" },
            e("span", null, "National"),
            e("span", null, "League")))
      ),

      /* ================= RIGHT PAGE / THE STRUCTURAL BAYS ================= */
      e("div", { className: "bz-page bz-right", "data-screen-label": "Busch Stadium \u2014 editorial" },
        e(Armature, null),

        /* ---- five documentary bays (captions per concept) ---- */
        e("div", { className: "bz-strip" },
          D.bays.map((b, i) =>
            e("figure", { className: "bz-bay", key: i },
              e(Slot, { id: b[0], src: b[3], placeholder: b[1] })))),

        /* ---- metadata ribbon — the bridge track ---- */
        e("div", { className: "bz-ribbon" },
          e("div", { className: "bz-rib-mark" },
            e("img", { src: "assets/st-louis-cardinals-logo.svg", alt: "St. Louis Cardinals" })),
          D.identity.map((row, i) => {
            if (row[0] === "Visit Order") {
              const p = row[1].split("\n");
              return e("div", { className: "bz-rib-cell", key: i },
                e("div", { className: "rk" }, row[0]),
                e("div", { className: "rv vorder" },
                  e("span", { className: "vo-num" }, p[0]),
                  e("span", { className: "vo-of" }, p[1])));
            }
            return e("div", { className: "bz-rib-cell", key: i },
              e("div", { className: "rk" }, row[0]),
              e("div", { className: "rv" }, ribbonLines(row[1])));
          })),

        /* ================= LOWER ZONE — three structural bays ================= */
        /* -- BAY 1 : Stadium Facts + Field Dimensions protractor -- */
        e("div", { className: "bz-col bz-col-facts" },
          e(SecHead, { title: "Stadium Facts", note: "MUSEUM RECORD" }),
          e("div", { className: "bz-facts" }, D.facts.map(factRow)),
          e("div", { className: "bz-field" },
            e("div", { className: "bz-field-head" }),
            e("figure", { className: "bz-fieldfig" },
              Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
                rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null))),

        /* -- BAY 2 : Stadium Context (unified body) -- */
        e("div", { className: "bz-col bz-col-context" },
          e(SecHead, { title: "Arches & Skyline", note: "DOWNTOWN BALLPARK \u2192 DISTRICT" }),
          e("div", { className: "bz-prose" },
            D.stadium_context.map((p, i) => e("p", { key: i }, p)))),

        /* -- BAY 3 : Visit Section — framed press-box report -- */
        e("div", { className: "bz-col bz-col-visit" },
          e("div", { className: "bz-visit" },
            e("div", { className: "bz-visit-head" },
              e("span", { className: "tag" },
                e("span", { className: "t-main" }, "Group Visit"),
                e("span", { className: "t-dot" }, "\u00b7"),
                e("span", { className: "t-sub" }, "Saturday Aug 17, 2024")),
              e("span", { className: "ord" }, "40 of " + D.visit_total_book)),

            /* facts (left) + team marks (right), ledger & pitching distributed to fill */
            e("div", { className: "bz-visit-body" },
              e("div", { className: "bz-visit-top" },
                e("div", { className: "bz-vfacts" }, D.visit.map(factRow)),
                e("div", { className: "bz-vmatch" },
                  e("div", { className: "tm" },
                    e("img", { src: "assets/los-angeles-dodgers-logo.svg", alt: "Los Angeles Dodgers" }),
                    e("span", { className: "ab" }, "LAD")),
                  e("span", { className: "vs" }, "VS"),
                  e("div", { className: "tm" },
                    e("img", { src: "assets/st-louis-cardinals-logo.svg", alt: "St. Louis Cardinals" }),
                    e("span", { className: "ab" }, "STL")))),

              /* scorecard ledger */
              e("div", { className: "bz-ledger" },
                e("div", { className: "bz-ledger-cap" }, "Line Score \u00b7 Final"),
                LineScore(D.box)),

              /* pitching matchup + decisions */
              e("div", { className: "bz-pitch" },
                e("div", { className: "match" },
                  e("span", null, D.pitching.away),
                  e("em", null, "(" + D.pitching.away_team + ")"),
                  e("span", { className: "v" }, "vs"),
                  e("span", null, D.pitching.home),
                  e("em", null, "(" + D.pitching.home_team + ")")),
                e("div", { className: "dec" },
                  e("span", null, e("b", null, "W"), " ", D.pitching.win),
                  e("span", null, e("b", null, "L"), " ", D.pitching.loss),
                  e("span", { className: "sv" }, e("b", null, "S"), " ", D.pitching.save)))),

            /* weather — separate museum exhibit module */
            e("div", { className: "bz-wx" },
              e("div", { className: "bz-wx-head" }, "Weather"),
              e("div", { className: "bz-wx-cells" },
                wxCell("temp", D.weather.temperature, "Temp"),
                wxCell("sky", D.weather.conditions, "Conditions", true),
                wxCell("wind", D.weather.wind, "Wind", true),
                wxCell("drop", D.weather.humidity, "Humidity"))),

            /* documentary photo filling the lower bay */
            e("figure", { className: "bz-visit-photo" },
              e(Slot, { id: "busch-p6", src: "images/busch/busch-stadium-02.jpg", placeholder: "The group at Busch Stadium \u2014 Aug 17, 2024" }))))
      )
    );
  }

  window.BuschSpread = Spread;
})();
