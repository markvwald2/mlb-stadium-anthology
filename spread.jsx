/* spread.jsx — the single Wrigley Field spread.
   Reads window.WRIGLEY (local data) + window.FieldDiagram.
   Every populated field is rendered exactly once. */
(function () {
  const D = window.WRIGLEY;
  const FieldDiagram = window.FieldDiagram;

  function Slot(props) {
    return React.createElement("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return React.createElement("div", { className: "sec-h" },
      React.createElement("span", { className: "ix" }, props.ix),
      React.createElement("span", { className: "tt" }, props.title),
      React.createElement("span", { className: "rule-fill" })
    );
  }

  function WxIcon(kind) {
    const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#EFE8D8", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    if (kind === "temp") return React.createElement("svg", common,
      React.createElement("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }));
    if (kind === "sun") return React.createElement("svg", common,
      React.createElement("circle", { cx: 12, cy: 12, r: 4 }),
      React.createElement("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return React.createElement("svg", common,
      React.createElement("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return React.createElement("svg", common,
      React.createElement("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function Spread() {
    const C = D.colors;
    return (
      React.createElement("div", { className: "spread", "data-screen-label": "Wrigley Field spread" },

        /* ============ LEFT PAGE / HERO ============ */
        React.createElement("div", { className: "page page-left" },
          React.createElement("div", { className: "hero-slot" },
            React.createElement(Slot, { id: "wrigley-hero", placeholder: "Drop the Wrigley Field hero photo", shape: "rect" })
          ),
          React.createElement("div", { className: "hero-scrim" }),
          React.createElement("div", { className: "hero-folio" }, "Plate 01"),
          React.createElement("div", { className: "hero-title" },
            React.createElement("h1", { className: "hero-name" },
              "Wrigley", React.createElement("span", { className: "l2" }, "Field")),
            React.createElement("div", { className: "hero-banner" }, D.city + ", " + D.state),
            React.createElement("div", { className: "hero-sub" }, D.years_active.toUpperCase())
          )
        ),

        /* ============ RIGHT PAGE ============ */
        React.createElement("div", { className: "page page-right" },
          React.createElement("div", { className: "rp" },

            /* ---- IMAGE STRIP ---- */
            React.createElement("div", { className: "strip" },
              React.createElement(Slot, { id: "wrigley-s1", placeholder: "Exterior \u00b7 marquee" }),
              React.createElement(Slot, { id: "wrigley-s2", placeholder: "Field \u00b7 ivy & bleachers" }),
              React.createElement(Slot, { id: "wrigley-s3", placeholder: "Scoreboard" }),
              React.createElement(Slot, { id: "wrigley-s4", placeholder: "Archival \u00b7 B&W" })
            ),

            /* ---- SPEC RIBBON ---- */
            React.createElement("div", { className: "ribbon" },
              React.createElement("div", { className: "cell team-cell" },
                React.createElement(Slot, { id: "wrigley-mark", placeholder: "Mark", shape: "rect" }),
                React.createElement("div", { className: "tx" },
                  React.createElement("div", { className: "lbl" }, "Team"),
                  React.createElement("div", { className: "rv" }, D.team_name))
              ),
              ribCell("League", D.league),
              ribCell("Division", D.division),
              ribCell("Era", D.classification_era),
              ribCell("Opened", D.opened),
              ribCell("Visit No.", String(D.visit_order).padStart(2, "0")),
              ribCell("Elevation", D.elevation),
              ribCell("Opening Cap.", D.capacity_opening)
            ),

            /* ---- BODY: 3 COLUMNS ---- */
            React.createElement("div", { className: "body-grid" },

              /* ===== COL A : Stadium Facts + Lineage ===== */
              React.createElement("div", { className: "col" },
                React.createElement("div", { className: "card" },
                  React.createElement(SecHead, { ix: "01", title: "Stadium Facts" }),
                  React.createElement("div", { className: "ledger" },
                    ledgerRow("Architect", D.architect),
                    ledgerRow("Style", D.architectural_style),
                    ledgerRow("Type", D.stadium_type),
                    ledgerRow("Roof", D.roof_type),
                    ledgerRow("Surface", D.playing_surface_type),
                    ledgerRow("Grass", D.surface),
                    ledgerRow("Facade", D.facade_material),
                    ledgerRow("Capacity", D.capacity_current),
                    ledgerRow("Location", D.location_classification),
                    ledgerRow("Address", D.address),
                    ledgerRow("Coords", D.coordinates),
                    ledgerRow("Cost", D.stadium_cost + "  \u00b7  " + D.stadium_cost_adjusted + " adj."),
                    ledgerRow("Financing", D.financing_method)
                  )
                ),
                React.createElement("div", { className: "card" },
                  React.createElement(SecHead, { ix: "02", title: "Lineage" }),
                  React.createElement("div", { className: "stack-block" },
                    React.createElement("div", { className: "lbl k" }, "Name History"),
                    React.createElement("div", { className: "val v" }, D.name_history)),
                  React.createElement("div", { className: "stack-block", style: { marginBottom: 0 } },
                    React.createElement("div", { className: "lbl k" }, "Preceded By"),
                    React.createElement("div", { className: "val v" }, D.preceded_by))
                )
              ),

              /* ===== COL B : Field Plan + Timeline + Renovations ===== */
              React.createElement("div", { className: "col" },
                React.createElement("div", { className: "card" },
                  React.createElement(SecHead, { ix: "03", title: "Field Plan" }),
                  FieldDiagram ? React.createElement(FieldDiagram, {
                    lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                    orientation: D.orientation, degrees: D.orientation_degrees, accent: C.primary.hex
                  }) : null
                ),
                React.createElement("div", { className: "card" },
                  React.createElement(SecHead, { ix: "04", title: "Construction & Era" }),
                  React.createElement("div", { className: "tl" },
                    React.createElement("div", { className: "track" }),
                    React.createElement("div", { className: "pts" },
                      tlPt("1911", "Construction begins \u00b7 Mar 4", false),
                      tlPt("1914", "Opening Day \u00b7 Apr 23", true),
                      tlPt("1988", "Lights installed", false),
                      tlPt("'14\u2013'19", "1060 Project", false)
                    )
                  ),
                  React.createElement("div", { className: "reno-note" },
                    React.createElement("span", { className: "lbl", style: { paddingTop: 2 } }, "Renovations"),
                    React.createElement("span", { className: "v" }, D.renovations)
                  )
                )
              ),

              /* ===== COL C : The Visit (dark) + Historical Context ===== */
              React.createElement("div", { className: "col" },
                React.createElement("div", { className: "visit" },
                  React.createElement("div", { className: "vhead" },
                    React.createElement("span", { className: "tt" }, "The Visit"),
                    React.createElement("span", { className: "pill" }, D.visit_type)
                  ),
                  React.createElement("div", { className: "vcols" },
                    React.createElement("div", null,
                      React.createElement("div", { className: "vlbl", style: { marginBottom: 5 } }, "Visit Information"),
                      vrow("Total Visits", String(D.visit_count)),
                      vrow("First Visit", D.first_visit_date),
                      vrow("Featured", D.featured_visit_date),
                      vrow("Day", D.featured_visit_day),
                      vrow("Other", D.other_visits)
                    ),
                    React.createElement("div", null,
                      React.createElement("div", { className: "vlbl", style: { marginBottom: 5 } }, "Featured Game"),
                      vrow("Result", D.game_result),
                      vrow("Attendance", D.attendance),
                      vrow("First Pitch", D.start_time + " " + D.time_zone),
                      vrow("Duration", D.game_duration),
                      vrow("Type", D.day_night + " \u00b7 " + D.innings_played + " inn.")
                    )
                  ),
                  React.createElement("div", { className: "matchup" },
                    teamScore(D.box.away.abbr, D.box.away.r, D.box.away.r > D.box.home.r),
                    React.createElement("span", { className: "at" }, "AT"),
                    teamScore(D.box.home.abbr, D.box.home.r, D.box.home.r > D.box.away.r)
                  ),
                  BoxScore(D.box),
                  React.createElement("div", { className: "vcols", style: { marginTop: 10 } },
                    React.createElement("div", null,
                      vrow("Home SP", D.home_starting_pitcher, true),
                      vrow("Away SP", D.away_starting_pitcher, true)
                    ),
                    React.createElement("div", null,
                      vrow("Win", D.winning_pitcher, true),
                      vrow("Loss", D.losing_pitcher, true)
                    )
                  ),
                  React.createElement("div", { className: "wx" },
                    wxCell("temp", D.temperature, null, "Temp"),
                    wxCell("sun", null, D.conditions, "Sky"),
                    wxCell("wind", null, D.wind, "Wind"),
                    wxCell("drop", D.humidity, null, "Humidity")
                  )
                )
              )
            ),

            /* ---- HISTORICAL CONTEXT (full-width band) ---- */
            React.createElement("div", { className: "card essay-full" },
              React.createElement(SecHead, { ix: "05", title: "Historical Context" }),
              React.createElement("div", { className: "essay-body" },
                D.stadium_context.map((p, i) => React.createElement("p", { key: i }, p))
              )
            )
          ),

          /* ---- FOOTER ---- */
          React.createElement("div", { className: "footer" },
            React.createElement("div", { className: "fl" },
              React.createElement("div", { className: "plate" }, "WRIGLEY FIELD"),
              React.createElement("div", { className: "trip" }, "Trip \u00b7 " + D.trip_name)
            ),
            React.createElement("div", { className: "colors" },
              colorSw(C.primary), colorSw(C.secondary), colorSw(C.accent)
            ),
            React.createElement("div", { className: "status" },
              React.createElement("div", { className: "k" }, "STATUS"),
              React.createElement("div", { className: "v" }, D.status)
            )
          )
        ),

        React.createElement("div", { className: "gutter" })
      )
    );
  }

  /* ---------- helpers ---------- */
  function ribCell(label, value) {
    return React.createElement("div", { className: "cell" },
      React.createElement("div", { className: "lbl" }, label),
      React.createElement("div", { className: "rv" }, value));
  }
  function ledgerRow(label, value) {
    return React.createElement("div", { className: "row" },
      React.createElement("div", { className: "lbl" }, label),
      React.createElement("div", { className: "val" }, value));
  }
  function vrow(label, value, serif) {
    return React.createElement("div", { className: "vrow" },
      React.createElement("div", { className: "vlbl" }, label),
      React.createElement("div", { className: "vval" }, value));
  }
  function teamScore(abbr, score, win) {
    return React.createElement("div", { className: "tm" },
      React.createElement("div", { className: "abbr" }, abbr),
      React.createElement("div", { className: "sc" + (win ? " win" : "") }, score));
  }
  function tlPt(yr, ev, accent) {
    return React.createElement("div", { className: "pt" + (accent ? " accent" : "") },
      React.createElement("div", { className: "dot" }),
      React.createElement("div", { className: "yr" }, yr),
      React.createElement("div", { className: "ev" }, ev));
  }
  function colorSw(c) {
    return React.createElement("div", { className: "sw" },
      React.createElement("span", { className: "chip", style: { background: c.hex } }),
      React.createElement("span", { className: "nm" }, c.name));
  }
  function wxCell(icon, big, small, cap) {
    return React.createElement("div", { className: "c" },
      WxIcon(icon),
      big ? React.createElement("div", { className: "big" }, big) : null,
      small ? React.createElement("div", { className: "small" }, small) : null,
      React.createElement("div", { className: "cap" }, cap));
  }
  function BoxScore(box) {
    const heads = [];
    for (let i = 1; i <= box.innings; i++) heads.push(i);
    function teamRow(t) {
      return React.createElement("tr", null,
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i }, n)),
        React.createElement("td", { className: "rhe rcol sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e)
      );
    }
    return React.createElement("table", { className: "box" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E")
        )
      ),
      React.createElement("tbody", null, teamRow(box.away), teamRow(box.home))
    );
  }

  window.WrigleySpread = Spread;
})();
