/* riverfront-spread.jsx — "The Concrete Doughnut".
   Reads window.RIVERFRONT + window.CircleDiagram. Every populated field once. */
(function () {
  const D = window.RIVERFRONT;
  const CircleDiagram = window.CircleDiagram;

  function Slot(props) {
    return React.createElement("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" });
  }

  // concentric-ring SVG (hero motif + page watermark)
  function Rings(props) {
    const stroke = props.stroke || "#46586B";
    const op = props.op || 0.1;
    const rs = props.rings || [240, 210, 182, 156, 132];
    return React.createElement("svg", { viewBox: "0 0 520 520", className: props.className, "aria-hidden": "true" },
      rs.map((r, i) => React.createElement("circle", {
        key: i, cx: 260, cy: 260, r: r, fill: "none", stroke: stroke,
        strokeWidth: i === 0 ? 2 : 1, opacity: op
      })),
      // radial seat ticks between outer two rings
      Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        return React.createElement("line", {
          key: "t" + i,
          x1: 260 + rs[0] * Math.cos(a), y1: 260 + rs[0] * Math.sin(a),
          x2: 260 + rs[1] * Math.cos(a), y2: 260 + rs[1] * Math.sin(a),
          stroke: stroke, strokeWidth: 0.6, opacity: op * 0.7
        });
      })
    );
  }

  function WxIcon(kind) {
    const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#E7E5DE", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    if (kind === "sun") return React.createElement("svg", c, React.createElement("circle", { cx: 12, cy: 12, r: 4 }), React.createElement("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "temp") return React.createElement("svg", c, React.createElement("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }));
    if (kind === "wind") return React.createElement("svg", c, React.createElement("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return React.createElement("svg", c, React.createElement("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function Spread() {
    const C = D.colors;
    return (
      React.createElement("div", { className: "rf-spread", "data-screen-label": "Riverfront Stadium spread" },

        /* ===== LEFT / HERO ===== */
        React.createElement("div", { className: "rf-page rf-left" },
          React.createElement("div", { className: "rf-hero-scrim" }),
          React.createElement(Rings, { className: "rf-hero-rings", stroke: "#EDEAE0", op: 0.16, rings: [250, 222, 196, 172] }),
          React.createElement("div", { className: "rf-hero-folio" }, "Plate 09"),
          React.createElement("div", { className: "rf-hero-title" },
            React.createElement("h1", { className: "rf-hero-name" }, "Riverfront", React.createElement("span", { className: "l2" }, "Stadium")),
            React.createElement("div", { className: "rf-hero-loc" },
              React.createElement("span", { className: "bar" }),
              React.createElement("span", { className: "txt" }, D.city + ", " + D.state)),
            React.createElement("div", { className: "rf-hero-meta" },
              D.years_active + "  \u00b7  " + D.stadium_type + "  \u00b7  ",
              React.createElement("span", { className: "dem" }, D.status))
          )
        ),

        /* ===== RIGHT PAGE ===== */
        React.createElement("div", { className: "rf-page rf-right" },
          React.createElement(Rings, { className: "rf-watermark", stroke: "#46586B", op: 0.07, rings: [250, 218, 188, 160, 134] }),
          React.createElement("div", { className: "rf-rp" },

            /* exhibit header */
            React.createElement("div", { className: "rf-head" },
              React.createElement("div", { className: "hl" },
                React.createElement("div", { className: "nm" }, "Riverfront Stadium"),
                React.createElement("div", { className: "sub" }, D.classification_era + "  \u00b7  " + D.roof_type + "  \u00b7  " + D.location_classification)
              ),
              React.createElement("div", { className: "hr" },
                React.createElement("div", { className: "k" }, "ERA"),
                React.createElement("div", { className: "v" }, "1970\u20132002"))
            ),

            /* STADIUM SECTION */
            React.createElement("div", { className: "rf-stadium" },
              React.createElement("div", { className: "rf-seclbl" },
                React.createElement("span", { className: "dot" }),
                React.createElement("span", { className: "t" }, "I \u00b7 The Stadium"),
                React.createElement("span", { className: "ln" })),

              React.createElement("div", { className: "rf-photos" },
                React.createElement(Slot, { id: "rf-p1", placeholder: "Exterior \u00b7 riverfront" }),
                React.createElement(Slot, { id: "rf-p2", placeholder: "Interior \u00b7 baseball config" }),
                React.createElement(Slot, { id: "rf-p3", placeholder: "Circular bowl structure" }),
                React.createElement(Slot, { id: "rf-p4", placeholder: "Detail \u00b7 concrete fa\u00e7ade" })
              ),

              React.createElement("div", { className: "rf-sgrid" },

                /* col 1 — facts */
                React.createElement("div", { className: "rf-facts" },
                  React.createElement("div", { className: "lbl colhdr" }, "Stadium Facts"),
                  factRow("Team", D.team_name),
                  factRow("League", D.league),
                  factRow("Division", D.division),
                  factRow("Opened", D.opened),
                  factRow("Architect", D.architect),
                  factRow("Style", D.architectural_style),
                  factRow("Structure", D.facade_material),
                  factRow("Surface", D.surface),
                  factRow("Capacity", D.capacity_opening + " (originally " + D.capacity_current + ")"),
                  factRow("Elevation", D.elevation),
                  factRow("Cost", D.stadium_cost + " (" + D.stadium_cost_adjusted + " adj.)"),
                  factRow("Financing", D.financing_method),
                  factRow("Successor", D.succeeded_by),
                  React.createElement("div", { className: "rf-logos" },
                    React.createElement("img", { src: "assets/reds.svg", alt: "Cincinnati Reds", className: "rf-logo" }),
                    React.createElement("img", { src: "assets/nl-logo.png", alt: "National League", className: "rf-logo" })
                  )
                ),

                /* col 2 — diagram + lineage + era timeline */
                React.createElement("div", { className: "rf-mid" },
                  React.createElement("div", { className: "lbl colhdr" }, "Field & Lineage"),
                  CircleDiagram ? React.createElement(CircleDiagram, {
                    lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                    orientation: D.orientation, degrees: D.orientation_degrees, accent: C.primary.hex
                  }) : null,
                  React.createElement("div", { className: "blk" },
                    React.createElement("div", { className: "lbl k" }, "Name History"),
                    React.createElement("div", { className: "val v" }, D.name_history)),
                  React.createElement("div", { className: "blk" },
                    React.createElement("div", { className: "lbl k" }, "Preceded By"),
                    React.createElement("div", { className: "val v" }, D.preceded_by)),
                  React.createElement("div", { className: "blk" },
                    React.createElement("div", { className: "lbl k" }, "Construction & Era"),
                    React.createElement("div", { className: "val v" },
                      "Construction Start " + D.construction_start + " \u00b7 Opened " + D.opening_day + " \u00b7 Final game " + D.final_game + " \u00b7 Razed " + D.demolition_year)),
                  React.createElement("div", { className: "blk" },
                    React.createElement("div", { className: "lbl k" }, "Renovations"),
                    React.createElement("div", { className: "val v" }, D.renovations))
                ),

                /* col 3 — context */
                React.createElement("div", { className: "rf-context" },
                  React.createElement("div", { className: "lbl colhdr" }, "The Concrete Circle"),
                  React.createElement("div", { className: "body" },
                    D.stadium_context.map((p, i) => React.createElement("p", { key: i }, p)))
                )
              )
            ),

            /* VISIT SECTION */
            React.createElement("div", { className: "rf-visit" },
              React.createElement("div", { className: "rf-vband" },

                /* score */
                React.createElement("div", { className: "vcol", style: { display: "flex", flexDirection: "column" } },
                  React.createElement("div", { className: "rf-vlbl" },
                    React.createElement("span", { className: "dot" }),
                    React.createElement("span", { className: "t" }, "II \u00b7 Group Visit"),
                    React.createElement("span", { className: "pill" }, D.trip_name)),
                  React.createElement("div", { className: "rf-score" },
                    React.createElement("div", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                    React.createElement("div", { className: "rf-circle" },
                      React.createElement("svg", { viewBox: "0 0 232 232", "aria-hidden": "true" },
                        React.createElement("circle", { cx: 116, cy: 116, r: 112, fill: "none", stroke: "rgba(255,255,255,.22)", strokeWidth: 1.4 }),
                        React.createElement("circle", { cx: 116, cy: 116, r: 100, fill: "none", stroke: "rgba(255,255,255,.12)", strokeWidth: 0.8 })
                      ),
                      scoreRow(D.home_team_abbreviation, D.box.home.r, D.box.home.r > D.box.away.r),
                      React.createElement("div", { className: "div" }),
                      scoreRow(D.away_team_abbreviation, D.box.away.r, D.box.away.r > D.box.home.r)
                    )
                  )
                ),

                /* line score + pitchers */
                React.createElement("div", { className: "vcol", style: { display: "flex", flexDirection: "column", justifyContent: "space-between" } },
                  React.createElement("div", null,
                    React.createElement("div", { className: "rf-vsub", style: { marginTop: 0 } }, "Line Score \u00b7 " + D.innings_played + " innings"),
                    BoxScore(D.box)),
                  React.createElement("div", null,
                    vrow("Starters", D.home_starting_pitcher + " (CIN) \u00b7 " + D.away_starting_pitcher + " (ATL)"),
                    vrow("Decision", "W " + D.winning_pitcher + " \u00b7 L " + D.losing_pitcher + " \u00b7 SV " + D.save_pitcher)),
                  React.createElement("div", { className: "rf-wx", style: { marginTop: 0 } },
                    wx("sun", null, D.conditions, "Sky"),
                    wx("temp", D.temperature, null, "Temp"),
                    wx("wind", null, D.wind, "Wind"),
                    wx("drop", D.humidity, null, "Humidity"))
                ),

                /* visit facts */
                React.createElement("div", { className: "vcol", style: { display: "flex", flexDirection: "column" } },
                  React.createElement("div", { className: "rf-vsub", style: { marginTop: 0 } }, "Visit Information"),
                  React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 6, paddingBottom: 2 } },
                    vrow("Visit No.", String(D.visit_order) + " / 42"),
                    vrow("Total Visits", String(D.visit_count)),
                    vrow("Attendance", D.attendance),
                    vrow("First Pitch", D.start_time + " " + D.time_zone),
                    vrow("Duration", D.game_duration),
                    vrow("Trip", D.trip_name))
                )
              )
            ),

            /* footer colophon */
            React.createElement("div", { className: "rf-foot" },
              React.createElement("span", { className: "plate" }, "Riverfront Stadium"),
              React.createElement("span", { className: "mono" }, D.address),
              React.createElement("span", { className: "sep" }, "\u00b7"),
              React.createElement("span", { className: "mono" }, D.coordinates)
            )
          )
        ),

        React.createElement("div", { className: "rf-gutter" })
      )
    );
  }

  /* helpers */
  function factRow(k, v) {
    return React.createElement("div", { className: "row" },
      React.createElement("div", { className: "lbl" }, k),
      React.createElement("div", { className: "val" }, v));
  }
  function vrow(k, v) {
    return React.createElement("div", { className: "rf-vrow" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function scoreRow(abbr, score, win) {
    return React.createElement("div", { className: "tm" + (win ? " win" : "") },
      React.createElement("span", { className: "ab" }, abbr),
      React.createElement("span", { className: "sc" }, score));
  }
  function sw(c) {
    return React.createElement("div", { className: "sw" },
      React.createElement("span", { className: "chip", style: { background: c.hex } }),
      React.createElement("span", { className: "nm" }, c.name));
  }
  function wx(icon, big, small, cap) {
    return React.createElement("div", { className: "c" },
      WxIcon(icon),
      big ? React.createElement("div", { className: "big" }, big) : null,
      small ? React.createElement("div", { className: "small" }, small) : null,
      React.createElement("div", { className: "cap" }, cap));
  }
  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t) {
      return React.createElement("tr", null,
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i }, n)),
        React.createElement("td", { className: "rhe rcol sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e));
    }
    return React.createElement("table", { className: "rf-box" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E"))),
      React.createElement("tbody", null, tr(box.away), tr(box.home)));
  }

  window.RiverfrontSpread = Spread;
})();
