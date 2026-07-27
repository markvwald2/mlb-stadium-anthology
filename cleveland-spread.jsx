/* cleveland-spread.jsx — "Lakefront Civic Datum" two-page spread for
   Cleveland Municipal Stadium. Reads window.CMS, window.ClevelandFieldPlan,
   window.ClevelandProtractor. Every populated structured value is placed
   exactly once. Local data only; no invented facts. */
(function () {
  const e = React.createElement;
  const D = window.CMS;
  const FieldPlan = window.ClevelandFieldPlan;
  const Protractor = window.ClevelandProtractor;

  function Slot(props) {
    return e("image-slot", Object.assign({ id: props.id, placeholder: props.placeholder, shape: "rect" }, props.src ? { src: props.src } : {}));
  }

  /* faint datum / survey linework over the aerial plate */
  function PlatLines() {
    const c = "#C9D2D8";
    function cross(x, y, k) {
      return e("g", { key: k },
        e("line", { x1: x - 9, y1: y, x2: x + 9, y2: y }),
        e("line", { x1: x, y1: y - 9, x2: x, y2: y + 9 }));
    }
    return e("svg", { className: "cm-plat-lines", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
      e("g", { stroke: c, strokeWidth: 1, fill: "none", opacity: 0.34 },
        e("line", { x1: 0, y1: 232, x2: 1275, y2: 232 }),
        e("line", { x1: 0, y1: 196, x2: 1275, y2: 196 }),
        e("line", { x1: 470, y1: 0, x2: 470, y2: 232 }),
        e("line", { x1: 880, y1: 0, x2: 880, y2: 232 })
      ),
      e("g", { stroke: c, strokeWidth: 1.3, opacity: 0.6 }, cross(470, 232, "a"), cross(880, 232, "b")),
      e("g", { stroke: c, strokeWidth: 1, opacity: 0.45 },
        e("line", { x1: 470, y1: 214, x2: 880, y2: 214 }),
        e("line", { x1: 470, y1: 208, x2: 470, y2: 220 }),
        e("line", { x1: 880, y1: 208, x2: 880, y2: 220 }))
    );
  }

  /* ---- small civic line icons ---- */
  function Icon(kind, cls) {
    const c = { className: cls || "ico", viewBox: "0 0 24 24", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    const P = (d) => e("path", { d: d });
    if (kind === "route")   return e("svg", c, e("circle", { cx: 5, cy: 6, r: 2 }), e("circle", { cx: 19, cy: 18, r: 2 }), P("M5 8v6a4 4 0 0 0 4 4h6"));
    if (kind === "pin")     return e("svg", c, P("M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"), e("circle", { cx: 12, cy: 11, r: 2 }));
    if (kind === "cal")     return e("svg", c, e("rect", { x: 4, y: 5, width: 16, height: 16, rx: 1 }), P("M4 9h16M8 3v4M16 3v4"));
    if (kind === "ticket")  return e("svg", c, P("M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"), P("M13 6v8"));
    if (kind === "vs")      return e("svg", c, P("M7 5l-3 7 3 7M17 5l3 7-3 7"));
    if (kind === "clock")   return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }), P("M12 8v4l3 2"));
    if (kind === "people")  return e("svg", c, e("circle", { cx: 9, cy: 8, r: 3 }), P("M3 20a6 6 0 0 1 12 0"), P("M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6"));
    if (kind === "timer")   return e("svg", c, e("circle", { cx: 12, cy: 13, r: 8 }), P("M12 13V9M9 2h6"));
    if (kind === "temp")    return e("svg", c, P("M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z"));
    if (kind === "sun")     return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), P("M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"));
    if (kind === "wind")    return e("svg", c, P("M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7"));
    if (kind === "drop")    return e("svg", c, P("M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z"));
    return null;
  }

  function factRow(k, v) { return e("tr", null, e("th", null, k), e("td", null, v)); }

  function viRow(icon, k, v, navy) {
    return e("div", { className: "cm-virow" },
      Icon(icon, "ico"),
      e("div", { className: "kv" },
        e("div", { className: "k" }, k),
        e("div", { className: "v" + (navy ? " navy" : "") }, v)));
  }

  function wx(icon, val, lab) {
    return e("div", { className: "cm-wx" },
      Icon(icon, "ico"),
      e("div", { className: "txt" },
        e("div", { className: "val" }, val),
        e("div", { className: "lab" }, lab)));
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
    return e("table", { className: "cm-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Pilaster(side) {
    return e("div", { className: "cm-pilaster " + side },
      e("div", { className: "cap" }), e("div", { className: "shaft" }), e("div", { className: "base" }));
  }

  function Spread() {
    const awayWin = D.box.away.r > D.box.home.r;
    return e("div", { className: "cm-spread", "data-screen-label": "Cleveland Municipal Stadium spread" },

      /* ============ LEFT / AERIAL HERO PLATE ============ */
      e("div", { className: "cm-page cm-left" },
        e("div", { className: "cm-hero-slot" },
          e(Slot, { id: "cms-hero", src: "images/cleveland/municipal-stadium-00-main-87982a4e.jpg", placeholder: "Drop the Cleveland Municipal Stadium aerial \u2014 the lakefront civic bowl between Lake Erie, the rail yards, and downtown Cleveland" })),
        e("div", { className: "cm-hero-scrim" }),
        e(PlatLines, null),
        e("div", { className: "cm-shore" }, "Lake Erie Shoreline"),

        e("div", { className: "cm-hero-datum" }, D.coordinates,
          e("span", { className: "sub" }, "Elev. " + D.elevation + " \u00b7 Lakefront Datum")),

        e("div", { className: "cm-hero-mast" },
          e("div", { className: "cm-mast-logos" },
            e("img", { className: "cm-mast-mark", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))
        ),

        e("div", { className: "cm-hero-block" },
          e("div", { className: "cm-hero-kicker" }, "Lakefront Civic Monument"),
          e("h1", { className: "cm-hero-name" },
            e("span", { className: "l1 cm-ds", "data-t": "Cleveland" }, "Cleveland"),
            e("span", { className: "l2 cm-ds", "data-t": "Municipal Stadium" }, "Municipal Stadium")),
          e("div", { className: "cm-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt cm-ds", "data-t": D.city + ", " + D.state }, D.city + ", " + D.state)),
          e("div", { className: "cm-hero-team cm-ds", "data-t": "Cleveland Indians" }, "Cleveland Indians"),
          e("div", { className: "cm-hero-era" },
            e("div", { className: "cmark" }, e("img", { src: "assets/cleveland-wahoo-logo.svg", alt: "" })),
            e("div", { className: "etext" },
              e("div", { className: "e1" }, "MLB Tenure"),
              e("div", { className: "e2" }, D.years_active_note)))
        )
      ),

      /* ============ RIGHT / CIVIC PLATE ============ */
      e("div", { className: "cm-page cm-right" },
        e("div", { className: "cm-corner tl" }), e("div", { className: "cm-corner tr" }),
        e("div", { className: "cm-corner bl" }), e("div", { className: "cm-corner br" }),

        e("div", { className: "cm-rp" },

          /* ---- STADIUM SECTION header ---- */
          e("div", { className: "cm-secbar navy" },
            e("span", { className: "rule l" }),
            e("div", { className: "t" }, "Stadium ", e("span", { className: "n" }, "Section")),
            e("span", { className: "rule r" })),

          /* ---- panoramic datum strip ---- */
          e("div", { className: "cm-datum" },
            e("div", { className: "cm-datum-slot" },
              e(Slot, { id: "cms-pano", src: "images/cleveland/municipal-stadium-01.png", placeholder: "Drop a wide lakefront panorama \u2014 Lake Erie horizon, rail & port corridor, and the downtown Cleveland skyline behind the stadium" }))
          ),

          /* ---- lifecycle band ---- */
          e("div", { className: "cm-lifecycle" },
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Construction Start"), e("div", { className: "v" }, D.construction_start)),
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Opening Day"), e("div", { className: "v" }, D.opening_day)),
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Final Game"), e("div", { className: "v" }, D.final_game)),
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Demolished"), e("div", { className: "v dem" }, D.demolition_year)),
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Preceded By"), e("div", { className: "v" }, D.preceded_by)),
            e("div", { className: "cm-lc" }, e("div", { className: "k" }, "Succeeded By"), e("div", { className: "v" }, D.succeeded_by))
          ),

          /* ---- main grid ---- */
          e("div", { className: "cm-stadium" },

            /* facts column */
            e("div", { className: "cm-facts" },
              e("div", { className: "cm-coltitle" }, e("div", { className: "t" }, "Stadium Record"), e("div", { className: "ln" })),
              e("table", { className: "cm-ftable" },
                e("tbody", null,
                  factRow("Opened", e("b", null, D.opened)),
                  factRow("Architect", D.architect),
                  factRow("Type", D.stadium_type),
                  factRow("Style", D.architectural_style),
                  factRow("Structure", D.facade_material),
                  factRow("Surface", D.playing_surface),
                  factRow("Roof", D.roof_type),
                  factRow("Capacity", e(React.Fragment, null, "Opening ", e("b", null, D.capacity_opening), " \u00b7 MLB ", e("b", null, D.capacity_later))),
                  factRow("Location", D.location_classification),
                  factRow("Address", e(React.Fragment, null, "1085 W 3rd Street", e("br"), "Cleveland, OH 44114 (former site)")),
                  factRow("Cost", e(React.Fragment, null, D.stadium_cost, " (", D.stadium_cost_adjusted, " adj.)")),
                  factRow("Financing", D.financing_method),
                  factRow("Renovations", D.renovations)))
            ),

            /* center: context prose + faint field-plan watermark */
            e("div", { className: "cm-center" },
              FieldPlan ? e("div", { className: "cm-fieldwm" },
                e(FieldPlan, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                  stroke: "#5C6B78", opacity: 0.16 })) : null,
              e("div", { className: "ctxh" },
                e("div", { className: "t" }, "The Lakefront Colossus"),
                e("div", { className: "ln" }),
                e("div", { className: "sub" }, "Civic Monument \u2192 Ballpark")),
              e("div", { className: "cm-ctx" },
                e("div", { className: "col" }, D.stadium_context.slice(0, 2).map((p, i) => e("p", { key: i }, p))),
                e("div", { className: "col" }, D.stadium_context.slice(2).map((p, i) => e("p", { key: i }, p)))),
              e("div", { className: "cm-nick" },
                e("div", { className: "name" },
                  e("span", { className: "q o" }, "\u201C"),
                  "The Mistake by the Lake",
                  e("span", { className: "q c" }, "\u201D")))
            ),

            /* right column: photo grid + instruments */
            e("div", { className: "cm-rcol" },
              e("div", { className: "cm-photos" },
                e("div", { className: "cm-pcard" }, e(Slot, { id: "cms-p1", src: "images/cleveland/municipal-stadium-02-8515c300.jpg", placeholder: "Stripped-classical exterior facade" })),
                e("div", { className: "cm-pcard" }, e(Slot, { id: "cms-p2", src: "images/cleveland/municipal-stadium-05-93869c5d.jpg", placeholder: "Open-air bowl & grandstand" })),
                e("div", { className: "cm-pcard" }, e(Slot, { id: "cms-p3", src: "images/cleveland/municipal-stadium-04-29bb25b7.jpg", placeholder: "Concourse interior" })),
                e("div", { className: "cm-pcard" }, e(Slot, { id: "cms-p4", src: "images/cleveland/municipal-stadium-03-9a103987.jpg", placeholder: "Scoreboard / outfield" }))),
              e("div", { className: "cm-instr" },
                Protractor ? e(Protractor, { orientation: D.orientation, degrees: D.orientation_degrees }) : null,
                e("div", { className: "cm-fdims" },
                  e("div", { className: "h" }, "Field Dimensions \u00b7 ft"),
                  e("div", { className: "row" },
                    e("div", { className: "c" }, e("div", { className: "k" }, "LF"), e("div", { className: "v" }, D.left_field_distance.replace(" ft", ""))),
                    e("div", { className: "c" }, e("div", { className: "k" }, "CF"), e("div", { className: "v" }, D.center_field_distance.replace(" ft", ""))),
                    e("div", { className: "c" }, e("div", { className: "k" }, "RF"), e("div", { className: "v" }, D.right_field_distance.replace(" ft", "")))),
                  e("div", { className: "orient" },
                    e("div", { className: "k" }, "Orientation"),
                    e("div", { className: "v" }, D.orientation + " \u00b7 " + D.orientation_degrees + "\u00b0"))))
            )
          ),

          /* ---- civic ribbon ---- */
          e("div", { className: "cm-ribbon" },
            e("div", { className: "end" }, e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
            e("div", { className: "cell" },
              e("div", { className: "k" }, "Division"),
              e("div", { className: "v" }, "American League East")),
            e("div", { className: "cell" },
              e("div", { className: "k" }, "Era"),
              e("div", { className: "v" }, D.classification_era)),
            e("div", { className: "cell" },
              e("div", { className: "k" }, "Status"),
              e("div", { className: "v dem" }, D.status)),
            e("div", { className: "cell" },
              e("div", { className: "k" }, "Years Active"),
              e("div", { className: "v" }, D.years_active_note)),
            e("div", { className: "end" }, e("img", { src: "assets/cleveland-wahoo-logo.svg", alt: "Cleveland" }))
          ),

          /* ---- VISIT SECTION header ---- */
          e("div", { className: "cm-secbar red", style: { marginTop: "10px" } },
            e("span", { className: "rule l" }),
            e("div", { className: "t" }, "Visit Section ",
              e("span", { className: "rn" }, "(" + D.visit_order + " of " + D.visit_total + ")")),
            e("span", { className: "rule r" })),

          /* ---- visit grid ---- */
          e("div", { className: "cm-visit" },
            e("div", { className: "cm-vgrid" },

              /* visit info */
              e("div", { className: "cm-vcol" },
                e("div", { className: "cm-vh" }, "Featured Visit Record"),
                viRow("route", "Trip", D.trip_name, true),
                viRow("pin", "Visit No.", D.visit_order + " / " + D.visit_total, true),
                viRow("cal", "Date", D.featured_visit_day + ", " + D.featured_visit_date),
                viRow("clock", "First Pitch", D.first_pitch + " \u00b7 " + D.game_type),
                viRow("people", "Attendance", D.attendance),
                viRow("timer", "Duration", D.game_duration),
                viRow("ticket", "Visits", D.visit_count + " visit")),

              /* result + line score + decisions */
              e("div", { className: "cm-vcol cm-result" },
                e("div", { className: "cm-vh" }, "Game Result"),
                e("div", { className: "gr" },
                  e("span", { className: awayWin ? "win" : "" }, "Tigers " + D.box.away.r), ", ",
                  e("span", { className: !awayWin ? "win" : "" }, "Indians " + D.box.home.r)),
                e("div", { className: "matchup" }, D.matchup),
                LineScore(D.box),
                e("div", { className: "cm-decis" },
                  e("div", { className: "blk" },
                    e("div", { className: "bh" }, "Starters"),
                    e("div", { className: "cm-prow" }, e("span", { className: "tag" }, "DET"), e("span", { className: "nm" }, D.away_starter)),
                    e("div", { className: "cm-prow" }, e("span", { className: "tag" }, "CLE"), e("span", { className: "nm" }, D.home_starter))),
                  e("div", { className: "blk" },
                    e("div", { className: "bh" }, "Decisions"),
                    e("div", { className: "cm-prow" }, e("span", { className: "tag" }, "W"), e("span", { className: "nm" }, e("b", null, D.winning_pitcher))),
                    e("div", { className: "cm-prow" }, e("span", { className: "tag" }, "L"), e("span", { className: "nm" }, D.losing_pitcher)),
                    e("div", { className: "cm-prow" }, e("span", { className: "tag" }, "S"), e("span", { className: "nm" }, D.save_pitcher))))),

              /* weather */
              e("div", { className: "cm-vcol cm-weather" },
                e("div", { className: "cm-vh" }, "Weather"),
                wx("temp", D.temperature, "Temperature"),
                wx("partly", D.conditions, "Conditions"),
                wx("wind", D.wind, "Wind"),
                wx("drop", D.humidity, "Humidity")),

              /* night-game photo */
              e("div", { className: "cm-vphoto" },
                e(Slot, { id: "cms-night", src: "images/cleveland/municipal-stadium-06.jpg", placeholder: "Night game under the lights \u2014 Aug 13, 1990" }))
            )
          ),

          /* ---- footer colophon ---- */
          e("div", { className: "cm-foot" },
            e("span", { className: "plate" }, "Cleveland Municipal Stadium"),
            e("span", { className: "sep" }, "\u2502"),
            e("span", null, "Walker & Weeks \u00b7 Lakefront Bowl \u00b7 1931\u20131993"),
            e("span", { className: "end" }, "All-Star Games: ", e("span", { className: "yrs" }, "1935, 1954, 1960, 1963, 1981")))
        )
      )
    );
  }

  window.ClevelandSpread = Spread;
})();
