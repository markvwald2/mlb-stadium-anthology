/* new-comiskey-spread.jsx — the single New Comiskey Park spread, "The Correction".
   Reads window.NEWCOMISKEY + window.NewComiskeyProtractor.
   LEFT  page: full-bleed dusk fortress hero — concrete bowl, steep upper deck,
   black steel canopy silhouette, field glow — with the title fabricated as a
   black-steel sign band (silver canopy chords, scoreboard fascia).
   RIGHT page: cool concrete spec sheet on a black-steel scoreboard-fascia
   ribbon, divided into three structural zones by steel mullions —
     I  The Stadium    (specification schedule, lifecycle, names, cost, logos)
     II The Correction (Stadium Context in a steel spine + the field instrument)
     III Game Night    (Jul 4, 2001 visit, scoreboard line score, weather)
   No module crosses the fold; photos carry no caption; every populated value
   appears once. The ChatGPT render's invented data is not used. */
(function () {
  const e = React.createElement;
  const D = window.NEWCOMISKEY;
  const Protractor = window.NewComiskeyProtractor;

  function Slot(props) {
    return e("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return e("div", { className: "nc-h" + (props.green ? " green" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }

  function ZoneHead(props) {
    return e("div", { className: "nc-zh" },
      e("span", { className: "rn" }, props.rn),
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }

  function factRow(row, i) {
    return e("div", { className: "nc-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }

  function LineScore(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "inn" + (n !== 0 && n !== "x" ? " sc" : "") }, n)),
        e("td", { className: "rcol sep" }, t.r),
        e("td", { className: "hecol" }, t.h),
        e("td", { className: "hecol" }, t.e));
    }
    return e("table", { className: "nc-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function wxCell(value, label) {
    return e("div", { className: "nc-wcell" },
      e("div", { className: "wv" }, value),
      e("div", { className: "wl" }, label));
  }

  function ribCell(label, value, opts) {
    opts = opts || {};
    return e("div", { className: "cell" + (opts.cls ? " " + opts.cls : "") },
      e("div", { className: "rl" }, label),
      e("div", { className: "rv" }, value));
  }

  // small restrained spark cluster — July-4 night, keyed to the game photo only
  function sparkCluster() {
    const arms = [];
    for (let i = 0; i < 7; i++) {
      arms.push(e("i", { key: i, style: { transform: "rotate(" + (i * 360 / 7) + "deg)" } }));
    }
    return e("span", { className: "sparks", "aria-hidden": "true" }, arms);
  }

  function Spread() {
    const P = D.pitching;
    return e("div", { className: "nc-spread", "data-screen-label": "New Comiskey Park spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "nc-page nc-left", "data-screen-label": "New Comiskey Park \u2014 hero" },
        e("div", { className: "nc-hero-slot" },
          e(Slot, { id: "nc-hero", placeholder: "Drop the New Comiskey Park hero \u2014 dusk / night view emphasizing the late-modern concrete bowl, steep upper-deck massing, exposed structure, the black steel roof canopy silhouette, and the field glow emerging from inside the mass. Avoid skyline emphasis, fireworks dominance, crowd-energy photography" })),
        e("div", { className: "nc-hero-scrim" }),

        e("div", { className: "nc-folio" }, "VISIT " + D.visit_order + " / " + D.visit_total),
        e("div", { className: "nc-spine" }, "EST. " + D.est + "  \u00b7  CHICAGO, ILLINOIS  \u00b7  " + D.district.toUpperCase()),

        e("div", { className: "nc-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "OPEN-AIR \u00b7 BLACK STEEL CANOPY \u00b7 SOUTH SIDE, CHICAGO"),
          e("span", { className: "ln" }), e("span", { className: "tk" })),

        e("div", { className: "nc-hero-title" },
          e("div", { className: "nc-chord" },
            e("span", { className: "stud" }), e("span", { className: "bar" }), e("span", { className: "stud" })),
          e("div", { className: "nc-kicker" },
            e("span", { className: "lbl" }, D.name_kicker),
            e("span", { className: "est" }, "EST. " + D.est)),
          D.name_lines.map((ln, i) => e("h1", { className: "nc-name", key: i }, ln)),
          e("div", { className: "nc-sub" },
            e("span", { className: "txt" }, D.city + ", " + D.state),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", { className: "txt" }, D.district)),
          e("div", { className: "nc-coords" },
            e("span", null, D.coordinates_n), e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.coordinates_w), e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "ELEV. " + D.elevation))),

        e("div", { className: "nc-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, D.league + " \u00b7 " + D.division))
      ),

      /* ================= RIGHT PAGE / THE CORRECTION ================= */
      e("div", { className: "nc-page nc-right", "data-screen-label": "New Comiskey Park \u2014 the correction" },
        e("div", { className: "nc-rp" },

          /* ---- black-steel scoreboard-fascia ribbon ---- */
          e("div", { className: "nc-ribbon" },
            e("div", { className: "cell team" },
              e("div", { className: "rl" }, "Team"),
              e("div", { className: "rv" },
                e("img", { className: "rib-sox", src: "assets/chicago-white-sox-logo.svg", alt: "" }),
                e("span", null, D.team_short))),
            ribCell("Era", D.era),
            ribCell("Years Active", D.years_active),
            e("div", { className: "cell" },
              e("div", { className: "rl" }, "Capacity \u00b7 Open \u2192 Now"),
              e("div", { className: "rv" },
                e("span", null, D.capacity_opening),
                e("span", { className: "arrow" }, "\u2192"),
                e("span", null, D.capacity_current))),
            ribCell("Hosted All-Star Game", D.allstar),
            ribCell("Status", "Active"),
            ribCell("Visit", D.visit_order + " of " + D.visit_total)),

          /* ---- the three structural zones ---- */
          e("div", { className: "nc-zones" },

            /* ===== ZONE A — THE STADIUM ===== */
            e("div", { className: "nc-zone a" },
              e(ZoneHead, { rn: "I", title: "The Stadium", note: "Details" }),
              e("div", { className: "nc-facts" }, D.facts.map(factRow)),
              e("div", { className: "nc-block" },
                e(SecHead, { title: "Lifecycle" }),
                e("div", { className: "nc-facts" }, D.lifecycle.map(factRow))),
              e("div", { className: "nc-block" },
                e(SecHead, { title: "Names Over Time", note: "1991 \u2192 NOW" }),
                e("div", { className: "nc-names" },
                  D.names.map((n, i) => e("div", { className: "nc-nrow", key: i },
                    e("span", { className: "nm" }, n[0]),
                    e("span", { className: "yr" }, n[1]))))),
              e("div", { className: "nc-block" },
                e(SecHead, { title: "Cost & Financing" }),
                e("div", { className: "nc-facts" }, D.finance.map(factRow))),
              e("div", { className: "nc-fieldwrap" },
                e(SecHead, { title: "Field Geometry", note: D.field.orientation + " \u00b7 " + D.field.degrees + "\u00b0" }),
                e("figure", { className: "nc-fieldfig" },
                  Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
                    rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null))),

            /* ===== ZONE B — THE CORRECTION (spine) ===== */
            e("div", { className: "nc-zone b" },
              e(ZoneHead, { rn: "II", title: "Concrete Before Camden", note: "The Last Modern Park" }),
              e("div", { className: "nc-spine-body" },
                e("div", { className: "nc-canopy" },
                  e(Slot, { id: "nc-canopy", placeholder: "Architectural photo of the black steel roof canopy / upper-deck structure added in the 2001\u20132007 renovation \u2014 the correction made visible" })),
                e("div", { className: "nc-ctx" },
                  e(SecHead, { title: "The Correction", note: "1991 \u2192 PRESENT" }),
                  e("div", { className: "nc-ctx-cols" },
                    e("div", { className: "nc-ctx-col l" },
                      e("p", null, D.stadium_context[0]),
                      e("p", null, D.stadium_context[1])),
                    e("div", { className: "nc-ctx-col r" },
                      e("p", null, D.stadium_context[2]),
                      e("p", null, D.stadium_context[3])))),
                e("div", { className: "nc-logos" },
                  e("img", { className: "sox", src: "assets/chicago-white-sox-logo.svg", alt: "Chicago White Sox" }),
                  e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
                  e("img", { className: "al", src: "assets/american-league-logo.png", alt: "American League" })))),

            /* ===== ZONE C — GAME NIGHT ===== */
            e("div", { className: "nc-zone c" },
              e(ZoneHead, { rn: "III", title: "Game Night", note: "Jul 4, 2001" }),
              e("div", { className: "nc-night" },
                sparkCluster(),
                e("div", { className: "nc-night-cell" },
                  e(Slot, { id: "nc-night", placeholder: "Night-game photo \u2014 the lit field, scoreboard, and seating bowl under lights on the Jul 4, 2001 visit (field-green glow)" })),
                e("div", { className: "nc-night-cell" },
                  e(Slot, { id: "nc-night2", placeholder: "Second night view \u2014 black steel canopy / upper-deck bowl, scoreboard or concourse under the lights" }))),
              e("div", { className: "nc-visit" },
                e(SecHead, { title: "Visit Information", note: "MIN AT CWS" }),
                e("div", { className: "nc-facts" }, D.visit.map(factRow))),
              e("div", { className: "nc-score" },
                e(SecHead, { title: "Line Score", note: D.box.innings + " INNINGS" }),
                e("div", { className: "nc-final" },
                  e("div", { className: "team" },
                    e("img", { src: "assets/minnesota-twins-logo.svg", alt: "Minnesota Twins" }),
                    e("span", { className: "nm" },
                      e("span", { className: "city" }, "Minnesota"),
                      e("span", { className: "tn" }, "Twins")),
                    e("span", { className: "sc" }, D.box.away.r)),
                  e("span", { className: "dash" }, "\u2013"),
                  e("div", { className: "team r" },
                    e("span", { className: "sc win" }, D.box.home.r),
                    e("span", { className: "nm" },
                      e("span", { className: "city" }, "Chicago"),
                      e("span", { className: "tn" }, "White Sox")),
                    e("img", { className: "sox", src: "assets/chicago-white-sox-logo.svg", alt: "Chicago White Sox" }))),
                e("div", { className: "nc-board" }, LineScore(D.box)),
                e("div", { className: "nc-dec" },
                  e("p", null,
                    e("i", null, P.home), " (" + P.home_team + ") ",
                    e("span", { className: "vs" }, "vs"), " ",
                    e("i", null, P.away), " (" + P.away_team + ")"),
                  e("p", { className: "sp" },
                    e("b", null, "W"), " ", e("i", null, P.win), "\u2003",
                    e("b", null, "L"), " ", e("i", null, P.loss)))),
              e("div", { className: "nc-wx" },
                e(SecHead, { title: "Weather", note: "AT FIRST PITCH" }),
                e("div", { className: "nc-wx-row" },
                  wxCell(D.weather.temperature, "Temp"),
                  wxCell(D.weather.conditions, "Sky"),
                  wxCell(D.weather.wind, "Wind"),
                  wxCell(D.weather.humidity, "Humidity"))))
          )
        )
      )
    );
  }

  window.NewComiskeySpread = Spread;
})();
