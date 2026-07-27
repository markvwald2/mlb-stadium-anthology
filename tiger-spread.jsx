/* tiger-spread.jsx — "The Corner Lot" two-page spread for Tiger Stadium.
   Reads window.TIGER, window.TigerFieldPlan, window.TigerProtractor.
   Every populated structured value is placed exactly once. Local data only. */
(function () {
  const e = React.createElement;
  const D = window.TIGER;
  const FieldPlan = window.TigerFieldPlan;
  const Protractor = window.TigerProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src });
  }

  /* faint plat / survey linework drawn over the aerial plate */
  function PlatLines() {
    const c = "#ECE6D6";
    return e("svg", { className: "ts-plat-lines", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
      // block grid lines
      e("g", { stroke: c, strokeWidth: 1, fill: "none", opacity: 0.42 },
        e("line", { x1: 0, y1: 250, x2: 1275, y2: 250 }),
        e("line", { x1: 0, y1: 760, x2: 760, y2: 760 }),
        e("line", { x1: 470, y1: 0, x2: 470, y2: 250 }),
        e("line", { x1: 900, y1: 0, x2: 900, y2: 250 }),
        e("line", { x1: 300, y1: 760, x2: 300, y2: 1088 }),
        e("line", { x1: 640, y1: 760, x2: 640, y2: 1088 })
      ),
      // survey corner crosses at intersections
      e("g", { stroke: c, strokeWidth: 1.4, opacity: 0.7 },
        cross(470, 250), cross(900, 250), cross(300, 760), cross(640, 760)
      ),
      // dimension tick along top block
      e("g", { stroke: c, strokeWidth: 1, opacity: 0.5 },
        e("line", { x1: 470, y1: 232, x2: 900, y2: 232 }),
        e("line", { x1: 470, y1: 226, x2: 470, y2: 238 }),
        e("line", { x1: 900, y1: 226, x2: 900, y2: 238 })
      )
    );
    function cross(x, y) {
      return e("g", { key: x + "-" + y },
        e("line", { x1: x - 9, y1: y, x2: x + 9, y2: y }),
        e("line", { x1: x, y1: y - 9, x2: x, y2: y + 9 }));
    }
  }

  function wxIcon(kind) {
    const c = { className: "ico", viewBox: "0 0 24 24", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "sun")  return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function factRow(k, v) {
    return e("tr", null, e("th", null, k), e("td", null, v));
  }
  function virow(k, v, navy) {
    return e("div", { className: "ts-virow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (navy ? " navy" : "") }, v));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe rcol sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "ts-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    const homeWin = D.box.home.r > D.box.away.r;
    return e("div", { className: "ts-spread", "data-screen-label": "Tiger Stadium spread" },

      /* ============ LEFT / AERIAL PLATE ============ */
      e("div", { className: "ts-page ts-left" },
        e("div", { className: "ts-hero-slot" },
          e(Slot, { id: "ts-hero", src: "images/tiger/tiger-stadium-00-main-31a229d7.jpg", placeholder: "Drop the Tiger Stadium aerial \u2014 the ballpark inside the Corktown street grid at Michigan & Trumbull" })),
        e("div", { className: "ts-hero-scrim" }),
        e(PlatLines, null),
        e("div", { className: "ts-street michigan" }, "Michigan Avenue"),
        e("div", { className: "ts-street trumbull" }, "Trumbull Avenue"),

        e("div", { className: "ts-hero-mast" },
          e("div", { className: "ts-mast-logos" },
            e("div", { className: "ts-logo-well club" },
              e("img", { src: "assets/detroit-tigers-logo.svg", alt: "Detroit Tigers" })),
            e("div", { className: "ts-logo-well" },
              e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
            e("div", { className: "ts-logo-well" },
              e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })))
        ),

        e("div", { className: "ts-hero-block" },
          e("div", { className: "ts-hero-survey" }, "Michigan & Trumbull"),
          e("h1", { className: "ts-hero-name" }, "Tiger", e("span", { className: "l2" }, "Stadium")),
          e("div", { className: "ts-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "ts-hero-meta" },
            e("span", null, e("b", null, D.years_active)),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.stadium_type),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.coordinates),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "Elev. ", e("b", null, D.elevation)))
        )
      ),

      /* ============ RIGHT / PLAT SHEET ============ */
      e("div", { className: "ts-page ts-right" },
        e("div", { className: "ts-corner tl" }), e("div", { className: "ts-corner tr" }),
        e("div", { className: "ts-corner bl" }), e("div", { className: "ts-corner br" }),

        e("div", { className: "ts-rp" },

          /* sheet header / title-block */
          e("div", { className: "ts-head" },
            e("div", { className: "hl" },
              e("div", { className: "over" }, "Corktown \u00b7 Detroit \u00b7 Michigan"),
              e("div", { className: "nm" }, "Tiger Stadium")),
            e("div", { className: "hr" },
              e("div", { className: "cell" }, e("div", { className: "k" }, "Status"), e("div", { className: "v", style: { color: "#C5491B" } }, D.status)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Roof"), e("div", { className: "v" }, D.roof_type)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Setting"), e("div", { className: "v" }, D.location_classification)))
          ),

          /* ---- PARCEL I : THE STADIUM ---- */
          e("div", { className: "ts-stadium" },
            e("div", { className: "ts-parcel-lbl" },
              e("div", { className: "badge" }, "I"),
              e("div", { className: "t" }, "The Stadium"),
              e("div", { className: "ln" }),
              e("div", { className: "ribbon" },
                e("span", null, "Architect ", e("b", null, D.architect)),
                e("span", null, "Era ", e("b", null, "Jewel Box & Early Concrete")),
                e("span", null, "Cost ", e("b", null, D.stadium_cost + " (" + D.stadium_cost_adjusted + " adj.)")))
            ),

            /* construction / lifecycle strip */
            e("div", { className: "ts-lifecycle" },
              e("div", { className: "ts-lc" }, e("div", { className: "k" }, "Construction Start"), e("div", { className: "v" }, D.construction_start)),
              e("div", { className: "ts-lc" }, e("div", { className: "k" }, "Opening Day"), e("div", { className: "v" }, D.opening_day)),
              e("div", { className: "ts-lc allstar" }, e("div", { className: "k" }, "All-Star Games"), e("div", { className: "v" }, "1941, 1951, 1971")),
              e("div", { className: "ts-lc" }, e("div", { className: "k" }, "Final Game"), e("div", { className: "v" }, D.final_game)),
              e("div", { className: "ts-lc" }, e("div", { className: "k" }, "Demolished"), e("div", { className: "v" }, D.demolition_year))
            ),

            e("div", { className: "ts-sgrid" },
              /* facts table */
              e("div", { className: "ts-facts" },
                e("table", { className: "ts-ftable" },
                  e("tbody", null,
                  factRow("Team", e("b", null, D.team_name)),
                  factRow("League", D.league + " \u00b7 " + D.division),
                  factRow("Opened", D.opened),
                  factRow("Style", D.architectural_style),
                  factRow("Structure", D.facade_material),
                  factRow("Surface", D.playing_surface),
                  factRow("Capacity", D.capacity),
                  factRow("Names", D.name_history.split("; ").map((s, i, a) =>
                    e(React.Fragment, { key: i }, s, i < a.length - 1 ? e("br") : null))),
                  factRow("Preceded By", D.preceded_by),
                  factRow("Succeeded By", D.succeeded_by),
                  factRow("Financing", D.financing_method),
                  factRow("Renovations", D.renovations))),
                Protractor ? e("div", { className: "ts-anglebox" },
                  e(Protractor, { orientation: D.orientation, degrees: D.orientation_degrees }),
                  e("div", { className: "ts-angletext" },
                    e("div", { className: "hd" }, "Field Orientation"),
                    e("div", { className: "or" }, "Oriented " + D.orientation))) : null
              ),

              /* center: field watermark + prose */
              e("div", { className: "ts-center" },
                FieldPlan ? e("div", { className: "ts-fieldwm" },
                  e(FieldPlan, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                    stroke: "#5E6E7E", opacity: 0.2 })) : null,
                e("div", { className: "ctxh" },
                  e("div", { className: "t" }, "The Corner"),
                  e("div", { className: "ln" })),
                e("div", { className: "ts-ctx" },
                  e("div", { className: "col" }, D.stadium_context.slice(0, 2).map((p, i) => e("p", { key: i }, p))),
                  e("div", { className: "col" }, D.stadium_context.slice(2).map((p, i) => e("p", { key: i }, p))))
              ),

              /* photo column */
              e("div", { className: "ts-photos" },
                photo("ts-p1", "Exterior", "4:3", "Brick & steel facade \u2014 Trumbull Avenue elevation", "images/tiger/tiger-stadium-01.jpg"),
                photo("ts-p2", "Seating Bowl", "4:3", "Double-decked grandstand interior", "images/tiger/tiger-stadium-02.jpg"),
                photo("ts-p3", "Concourse", "4:3", "Steel-column lower concourse", "images/tiger/tiger-stadium-03.jpg"))
            )
          ),

          /* subdivision survey line */
          e("div", { className: "ts-subdiv" },
            e("div", { className: "tick", style: { left: "26%" } }),
            e("div", { className: "tick", style: { left: "62%" } })),

          /* ---- PARCEL II : THE VISIT ---- */
          e("div", { className: "ts-visit" },
            e("div", { className: "ts-parcel-lbl" },
              e("div", { className: "badge" }, "II"),
              e("div", { className: "t" }, "The Visit"),
              e("div", { className: "ln" }),
              e("span", { className: "pill" }, "Trip \u00b7 " + D.trip_name)),

            e("div", { className: "ts-ledger" },
              /* result */
              e("div", { className: "ts-result" },
                e("div", { className: "ts-led-h" }, "Featured Game \u00b7 " + D.visit_type),
                e("div", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                e("div", { className: "ts-scorerow" + (!homeWin ? " win" : "") },
                  e("div", { className: "tm" },
                    e("img", { className: "tlogo", src: "assets/minnesota-twins-logo.svg", alt: "" }),
                    e("span", null, D.away_team)),
                  e("div", { className: "sc" }, D.box.away.r)),
                e("div", { className: "ts-scorerow" + (homeWin ? " win" : "") },
                  e("div", { className: "tm" },
                    e("img", { className: "tlogo", src: "assets/detroit-tigers-logo.svg", alt: "" }),
                    e("span", null, D.home_team)),
                  e("div", { className: "sc" }, D.box.home.r)),
                e("div", { className: "venue" }, D.away_team + " at " + D.home_team)),

              /* line score + pitching */
              e("div", { className: "ts-mid" },
                e("div", { className: "ts-led-h" }, "Line Score \u00b7 " + D.innings_played + " Innings"),
                LineScore(D.box),
                e("div", { className: "ts-pitch" },
                  e("div", { className: "ts-prow" },
                    e("div", { className: "k" }, "Pitching Matchup"),
                    e("div", { className: "v" }, D.pitching_matchup)),
                  e("div", { className: "ts-prow" },
                    e("div", { className: "k" }, "Decision"),
                    e("div", { className: "v" }, e("b", null, "W: Frank Viola"), " / L: Walt Terrell")))),

              /* visit info */
              e("div", { className: "ts-vinfo" },
                e("div", { className: "ts-led-h" }, "Visit Information"),
                virow("Visit No.", D.visit_order + " / " + D.visit_total, true),
                virow("Total Visits", D.visit_count),
                virow("Attendance", D.attendance),
                virow("First Pitch", D.first_pitch),
                virow("Duration", D.game_duration),
                virow("Trip", D.trip_name))
            ),

            /* weather ribbon — colophon rides as the final cell */
            e("div", { className: "ts-weather" },
              wx("temp", D.temperature, "Temperature"),
              wx("sun", D.conditions, "Conditions"),
              wx("wind", D.wind, "Wind"),
              wx("drop", D.humidity, "Humidity"),
              e("div", { className: "ts-wx ts-colophon" },
                e("span", { className: "end" }, "The Corner Lot")))
          )
        )
      )
    );

    function photo(id, name, ratio, ph, src) {
      return e("div", { className: "ts-pcard" },
        e("div", { className: "frame" }, e(Slot, { id: id, placeholder: ph, src: src })));
    }
    function wx(icon, val, lab) {
      return e("div", { className: "ts-wx" },
        wxIcon(icon),
        e("div", { className: "txt" },
          e("div", { className: "val" }, val),
          e("div", { className: "lab" }, lab)));
    }
  }

  window.TigerSpread = Spread;
})();
