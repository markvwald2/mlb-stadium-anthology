/* yankee2009-spread.jsx — "Section Through a Monument" two-page spread for
   Yankee Stadium (2009). Reads window.YK2009, window.YK2009FieldPlan,
   window.YK2009Protractor. Controlling metaphor: the 2009 building is memory
   turned into infrastructure — a replicated-frieze SURFACE wrapping a modern
   revenue CORE. The right page is a vertical section: frieze cornice → Great
   Hall limestone colonnade (SURFACE | CORE) → field-level concourse (the
   visit). Data is authoritative; every populated value placed once; empties
   omitted. The concept render is visual direction only. */
(function () {
  const e = React.createElement;
  const D = window.YK2009;
  const FieldPlan = window.YK2009FieldPlan;
  const Protractor = window.YK2009Protractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" });
  }

  /* ---- replicated frieze cornice: flat beam + round-top open arcade ----
     evenodd so the photo (hero) / paper (sheet) shows through the openings. */
  function Frieze(props) {
    const fill = props.fill || "#0C2340";
    const H = props.h || 24;
    const vw = props.vw || 1275;
    const cell = props.cell || 26;
    const n = Math.max(2, Math.round(vw / cell));
    const c = vw / n;
    const archTop = Math.max(4, Math.round(H * 0.30));
    const pier = Math.max(2.4, c * 0.30);
    const ow = c - pier;
    let r = ow / 2; const maxR = H - archTop; if (r > maxR) r = maxR;
    const springY = archTop + r;
    const bottom = H + 2;
    let d = "M 0 0 H " + vw + " V " + H + " H 0 Z ";
    for (let i = 0; i < n; i++) {
      const x0 = i * c + pier / 2, x1 = x0 + ow;
      d += "M " + x0.toFixed(2) + " " + bottom +
           " L " + x0.toFixed(2) + " " + springY.toFixed(2) +
           " A " + r.toFixed(2) + " " + r.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + springY.toFixed(2) +
           " L " + x1.toFixed(2) + " " + bottom + " Z ";
    }
    if (H >= 16) {
      const beadR = Math.min(1.9, Math.max(0.9, H * 0.045)), beadY = archTop * 0.5;
      for (let i = 0; i < n; i++) {
        const cx = i * c + c / 2;
        d += "M " + (cx - beadR).toFixed(2) + " " + beadY.toFixed(2) +
             " a " + beadR.toFixed(2) + " " + beadR.toFixed(2) + " 0 1 0 " + (2 * beadR).toFixed(2) + " 0" +
             " a " + beadR.toFixed(2) + " " + beadR.toFixed(2) + " 0 1 0 " + (-2 * beadR).toFixed(2) + " 0 Z ";
      }
    }
    return e("svg", { className: props.className, viewBox: "0 0 " + vw + " " + H,
      preserveAspectRatio: "none", "aria-hidden": "true",
      style: { display: "block", width: "100%", height: H + "px" } },
      e("path", { d: d, fill: fill, fillRule: "evenodd" }));
  }

  function factRow(k, v) { return e("tr", null, e("th", null, k), e("td", null, v)); }
  function dc(k, v, sm) {
    return e("div", { className: "y9-dc" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (sm ? " sm" : "") }, v));
  }
  function spec(k, v, vcls) {
    return e("div", { className: "y9-spec" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (vcls ? " " + vcls : "") }, v));
  }
  function virow(k, v, cls) {
    return e("div", { className: "y9-virow" + (cls ? " " + cls : "") }, e("div", { className: "k" }, k), e("div", { className: "v" }, v));
  }
  function wx(val, lab) { return e("div", { className: "w" }, e("div", { className: "val" }, val), e("div", { className: "lab" }, lab)); }
  function dim(v, l) {
    return e("div", { className: "y9-dim" },
      e("div", { className: "n" }, (v || "").replace(" ft", "")),
      e("div", { className: "l" }, l));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "y9-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    const homeWin = D.box.home.r > D.box.away.r;
    const capacity = D.capacity_current + " (originally " + D.capacity_opening + ")";

    return e("div", { className: "y9-spread", "data-screen-label": "Yankee Stadium (2009) spread" },

      /* ============ LEFT / DAYLIGHT LIMESTONE HERO ============ */
      e("div", { className: "y9-page y9-left", "data-screen-label": "Hero — Yankee Stadium 2009 daylight" },
        e("div", { className: "y9-hero-slot" },
          e(Slot, { id: "y9-hero", placeholder: "Drop the 2009 Yankee Stadium \u2014 daylight, open-air bowl behind the Indiana-limestone exterior and replicated frieze, South Bronx at 161st Street" })),
        e("div", { className: "y9-hero-scrim" }),
        e("div", { className: "y9-hero-frieze-bleed" }),
        e(Frieze, { className: "y9-hero-frieze", h: 24, vw: 1275, fill: "#F3EFE4" }),

        /* opening-year datum stamp */
        e("div", { className: "y9-stamp" },
          e("div", { className: "yr" }, "2009"),
          e("div", { className: "tx" }, "A franchise monument rebuilt across the street \u2014 ", e("b", null, "opened Apr 16, 2009"))),

        /* logo wells */
        e("div", { className: "y9-hero-mast" },
          e("div", { className: "y9-logo-well" }, e("img", { src: "assets/new-york-yankees-logo.svg", alt: "New York Yankees" })),
          e("div", { className: "y9-logo-well" }, e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
          e("div", { className: "y9-logo-well" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))),

        /* lapidary title block */
        e("div", { className: "y9-hero-block" },
          e("div", { className: "y9-hero-kicker" }, "The Bronx \u00b7 American League"),
          e("h1", { className: "y9-hero-name" }, "Yankee", e("span", { className: "l2" }, "Stadium")),
          e("div", { className: "y9-hero-rule" }, e("div", { className: "band" }), e("div", { className: "band thin" })),
          e("div", { className: "y9-hero-loc" }, e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "y9-hero-meta" },
            e("span", null, e("b", null, D.years_active)),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.classification_era + " Era"),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "Open Air"),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", { className: "act" }, "Active")))
      ),

      /* ============ RIGHT / LIMESTONE SECTION SHEET ============ */
      e("div", { className: "y9-page y9-right", "data-screen-label": "Editorial — Yankee Stadium 2009 data" },
        e("div", { className: "y9-rp" },

          /* frieze cornice */
          e("div", { className: "y9-crown-bleed" }),
          e(Frieze, { className: "y9-crown", h: 24, vw: 1275, fill: "#0C2340" }),

          /* header / nameplate */
          e("div", { className: "y9-head" },
            e("div", { className: "hl" },
              e("div", { className: "over" }, "Memory as Infrastructure"),
              e("div", { className: "nm" }, "Yankee Stadium \u00b7 2009")),
            e("div", { className: "hr" },
              e("div", { className: "cell" }, e("div", { className: "k" }, "Status"), e("div", { className: "v act" }, D.status)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Roof"), e("div", { className: "v" }, D.roof_type)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Setting"), e("div", { className: "v" }, D.location_classification)))
          ),

          /* identity datum strip */
          e("div", { className: "y9-datum" },
            dc("Team", D.team_name),
            dc("League / Division", "American League \u00b7 AL East", true),
            dc("Type", D.stadium_type, true),
            dc("Years Active", D.years_active),
            dc("Coordinates", D.coordinates, true),
            dc("Elevation", D.elevation)
          ),

          /* THE COLONNADE — SURFACE | CORE diptych */
          e("div", { className: "y9-colonnade" },

            /* ---- SURFACE : the replicated skin ---- */
            e("div", { className: "y9-half surface" },
              e("div", { className: "y9-halfhead" },
                e("span", { className: "rn" }, "I"),
                e("span", { className: "t" }, "The Surface"),
                e("span", { className: "sub" }, "Inherited Facade")),
              e("div", { className: "y9-surface-grid" },
                e("div", { className: "y9-photo" },
                  e(Slot, { id: "y9-facade", placeholder: "Indiana-limestone exterior facade & replicated frieze \u2014 the Great Hall gate elevation (portrait, ~3:4)" }),
                  e("div", { className: "pier-cap" })),
                e("table", { className: "y9-ftable" },
                  e("tbody", null,
                    factRow("Architect", e("b", null, D.architect)),
                    factRow("Style", D.architectural_style),
                    factRow("Facade", D.facade_material),
                    factRow("Lineage", e(React.Fragment, null, "Hilltop Park; Polo Grounds", e("span", { className: "sub" }, "  \u2192  "), e("b", null, "Yankee Stadium (1923)"), e("span", { className: "sub" }, "  \u2192  "), "the 2009 monument across the street")))))
            ),

            /* ---- CORE : the modern revenue machine ---- */
            e("div", { className: "y9-half core" },
              e("div", { className: "y9-halfhead" },
                e("span", { className: "rn" }, "II"),
                e("span", { className: "t" }, "The Core"),
                e("span", { className: "sub" }, "Modern Operation")),
              e("div", { className: "y9-core-grid" },
                /* spec rows */
                e("div", { className: "y9-specs" },
                  spec("Capacity", e(React.Fragment, null, e("b", null, D.capacity_current), e("span", { className: "adj" }, " (originally " + D.capacity_opening + ")"))),
                  spec("Cost", e(React.Fragment, null, e("b", null, D.stadium_cost), e("span", { className: "adj" }, " (" + D.stadium_cost_adjusted + " adj.)"))),
                  spec("Financing", D.financing_method, "fin"),
                  spec("Surface", D.playing_surface),
                  spec("Renovations & Refinements", D.renovations)),
                /* instrument pier: lifecycle rows + protractor field datum */
                e("div", { className: "y9-instr" },
                  e("div", { className: "y9-life" },
                    e("div", { className: "hd" }, "Lifecycle"),
                    D.lifecycle.map((s, i) => e("div", { className: "y9-liferow", key: i },
                      e("div", { className: "lab" }, s.k),
                      e("div", { className: "val" }, s.v)))),
                  e("div", { className: "y9-fieldwrap" },
                    e("div", { className: "hd" }, "Field Dimensions \u00b7 Orientation"),
                    e("div", { className: "y9-fieldrow" },
                      Protractor ? e(Protractor, { className: "pro", orientation: D.orientation, degrees: D.orientation_degrees,
                        lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance }) : null,
                      e("div", { className: "y9-dimcol" },
                        dim(D.left_field_distance, "Left Field"),
                        dim(D.center_field_distance, "Center Field"),
                        dim(D.right_field_distance, "Right Field"))))))
            )
          ),

          /* STADIUM CONTEXT — single unified prose block */
          e("div", { className: "y9-context" },
            FieldPlan ? e(FieldPlan, { className: "y9-ctx-wm", lf: D.left_field_distance,
              cf: D.center_field_distance, rf: D.right_field_distance, stroke: "#5E6976", opacity: 0.09 }) : null,
            e("div", { className: "y9-ctxh" },
              e("span", { className: "rn" }, "III"),
              e("span", { className: "t" }, "The Frieze Returns"),
              e("div", { className: "ln nav" }),
              e("div", { className: "ln" })),
            e("div", { className: "y9-ctx" },
              D.stadium_context.map((p, i) => e("p", { key: i }, p)))
          ),

          /* THE CONCOURSE — visit / game scorecard */
          e("div", { className: "y9-visit", "data-screen-label": "Visit section" },
            e("div", { className: "y9-visit-inner" },
              /* result */
              e("div", { className: "y9-vcol y9-result" },
                e("div", { className: "y9-vh" }, "Featured Game \u00b7 ", e("b", null, D.featured_game_title)),
                e("div", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                e("div", { className: "y9-scorerow" + (!homeWin ? " win" : "") },
                  e("div", { className: "tmwrap" },
                    e("img", { className: "logo", src: "assets/minnesota-twins-logo.svg", alt: "" }),
                    e("div", { className: "tm" }, D.away_team_abbreviation)),
                  e("div", { className: "sc" }, D.box.away.r)),
                e("div", { className: "y9-scorerow" + (homeWin ? " win" : "") },
                  e("div", { className: "tmwrap" },
                    e("img", { className: "logo", src: "assets/new-york-yankees-logo.svg", alt: "" }),
                    e("div", { className: "tm" }, D.home_team_abbreviation)),
                  e("div", { className: "sc" }, D.box.home.r)),
                e("div", { className: "venue" }, D.away_team + " at " + D.home_team)),

              /* line score + pitching */
              e("div", { className: "y9-vcol" },
                e("div", { className: "y9-vh" }, "Line Score \u00b7 " + D.innings_played + " Innings"),
                LineScore(D.box),
                e("div", { className: "y9-pitch" },
                  e("div", { className: "y9-prow" },
                    e("div", { className: "k" }, "Pitching Matchup"),
                    e("div", { className: "v" }, D.pitching_matchup)),
                  e("div", { className: "y9-prow" },
                    e("div", { className: "k" }, "Decision"),
                    e("div", { className: "v" }, e("b", null, "W: " + D.win_pitcher), "  /  L: " + D.loss_pitcher + "  /  S: " + D.save_pitcher)))),

              /* visit info + weather */
              e("div", { className: "y9-vcol" },
                e("div", { className: "y9-vh" }, "Visit \u00b7 ", e("b", null, D.trip_name)),
                virow("Attendance", D.attendance),
                virow("First Pitch", D.first_pitch),
                virow("Duration", D.game_duration),
                virow("Visit No.", D.visit_order + " of 42", "divtop"),
                virow("Visit Count", D.visit_count),
                e("div", { className: "y9-wx" },
                  wx(D.temperature, "Temp"),
                  wx(D.conditions, "Sky"),
                  wx(D.wind, "Wind"),
                  wx(D.humidity, "Humidity")))
            )
          ),

          /* footer colophon */
          e("div", { className: "y9-foot" },
            e("span", { className: "plate" }, "Section Through a Monument"),
            e("span", { className: "sep" }, "\u2014"),
            e("span", null, D.address + " \u00b7 " + D.coordinates),
            e("span", { className: "end" }, "Memory as Infrastructure"))
        )
      )
    );
  }

  window.YK2009Spread = Spread;
})();
