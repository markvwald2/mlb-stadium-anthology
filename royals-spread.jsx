/* royals-spread.jsx — the single Royals Stadium spread.
   Reads window.ROYALS (local data) + window.ProtractorDiagram.
   Every populated field is rendered exactly once. */
(function () {
  const D = window.ROYALS;
  const FieldDiagram = window.ProtractorDiagram;

  function Slot(props) {
    return React.createElement("image-slot", Object.assign({
      id: props.id, src: props.src, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return React.createElement("div", { className: "rs-sec-h" },
      React.createElement("span", { className: "ix" }, props.ix),
      React.createElement("span", { className: "tt" }, props.title),
      React.createElement("span", { className: "rule-fill" })
    );
  }

  /* The Royals mark — official full-color KC Royals shield. */
  function Crown() {
    return React.createElement("img", {
      className: "rs-crown", src: "assets/royals-logo.svg", "data-pp-filter": "keyline",
      alt: "Kansas City Royals", role: "img"
    });
  }

  /* The outfield fountains — fine vertical cascade lines along the hero's right edge. */
  function Fountains() {
    const cols = [];
    for (let i = 0; i < 9; i++) {
      const x = 26 + i * 40;
      const h = 220 + ((i * 53) % 160);
      const top = 250 + ((i * 97) % 240);
      cols.push(React.createElement("g", { key: i, opacity: 0.55 - (i % 3) * 0.08 },
        React.createElement("line", { x1: x, y1: top, x2: x, y2: top + h, stroke: "#D2B477", strokeWidth: 1 }),
        Array.from({ length: 7 }).map((_, j) =>
          React.createElement("circle", { key: j, cx: x, cy: top + (h / 7) * j, r: 1.6, fill: "#E7D6B6", opacity: 1 - j * 0.11 })
        )
      ));
    }
    return React.createElement("svg", { className: "rs-fountains", viewBox: "0 0 360 1113", preserveAspectRatio: "none", "aria-hidden": "true" }, cols);
  }

  function WxIcon(kind) {
    const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#EDE6D5", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, common);
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
      React.createElement("div", { className: "rs-spread", "data-screen-label": "Royals Stadium spread" },

        /* ============ LEFT PAGE / HERO ============ */
        React.createElement("div", { className: "rs-page rs-left" },
          React.createElement("div", { className: "rs-hero-slot" },
            React.createElement(Slot, { id: "royals-hero", src: "images/royals/royals-stadium-00-main.jpg", placeholder: "Drop the Royals Stadium hero photo (fountains \u00b7 crown scoreboard)", shape: "rect" })
          ),
          React.createElement(Fountains, null),
          React.createElement("div", { className: "rs-hero-scrim" }),
          React.createElement(Crown, null),
          React.createElement("div", { className: "rs-hero-title" },
            React.createElement("h1", { className: "rs-hero-name" },
              "Royals", React.createElement("span", { className: "l2" }, "Stadium")),
            React.createElement("div", { className: "rs-hero-banner" },
              React.createElement("span", { className: "tag" }, D.city + ", " + D.state),
              React.createElement("span", { className: "yrs" }, D.years_active))
          ),
          React.createElement("div", { className: "rs-hero-era" }, D.classification_era)
        ),

        /* ============ RIGHT PAGE ============ */
        React.createElement("div", { className: "rs-page rs-right" },
          React.createElement("div", { className: "rs-rp" },

            /* ---- IMAGE STRIP ---- */
            React.createElement("div", { className: "rs-strip" },
              React.createElement(Slot, { id: "royals-s1", src: "images/royals/royals-stadium-01.jpg", placeholder: "Exterior \u00b7 entry" }),
              React.createElement(Slot, { id: "royals-s2", src: "images/royals/royals-stadium-02.jpg", placeholder: "Outfield fountains" }),
              React.createElement(Slot, { id: "royals-s3", src: "images/royals/royals-stadium-03.jpg", placeholder: "Crown scoreboard" }),
              React.createElement(Slot, { id: "royals-s4", src: "images/royals/royals-stadium-04.jpg", placeholder: "Sports complex \u00b7 aerial" })
            ),

            /* ---- SPEC RIBBON ---- */
            React.createElement("div", { className: "rs-ribbon" },
              React.createElement("div", { className: "cell team-cell" },
                React.createElement("img", { className: "team-logo", src: "assets/royals-logo.svg", alt: "Kansas City Royals" }),
                React.createElement("div", { className: "tx" },
                  React.createElement("div", { className: "rs-lbl" }, "Team"),
                  React.createElement("div", { className: "rv", style: { letterSpacing: "-0.7px" } }, D.team_name))
              ),
              React.createElement("div", { className: "cell league-cell" },
                React.createElement("img", { className: "league-logo", src: "assets/american-league-logo.png", alt: "American League" }),
                React.createElement("div", { className: "tx" },
                  React.createElement("div", { className: "rs-lbl" }, "League"),
                  React.createElement("div", { className: "rv" }, D.league))
              ),
              ribCell("Division", D.division),
              ribCell("Era", D.classification_era),
              ribCell("Opened", D.opened),
              ribCell("Cost", "$70 million ($508M adj.)")
            ),

            /* ---- BODY: 3 COLUMNS ---- */
            React.createElement("div", { className: "rs-body-grid" },

              /* ===== COL A : Stadium Facts + Lineage ===== */
              React.createElement("div", { className: "rs-col" },
                React.createElement("div", { className: "rs-card" },
                  React.createElement(SecHead, { ix: "01", title: "Stadium Facts" }),
                  React.createElement("div", { className: "rs-ledger" },
                    ledgerRow("Architect", D.architect),
                    ledgerRow("Style", D.architectural_style),
                    ledgerRow("Type", D.stadium_type, { letterSpacing: "-0.6px" }),
                    ledgerRow("Field", D.surface),
                    ledgerRow("Facade", D.facade_material),
                    ledgerRow("Capacity", D.capacity_current + " (" + D.capacity_opening + " originally)"),
                    ledgerRow("Location", D.location_classification),
                    ledgerRow("Address", D.address),
                    ledgerRow("Coords", D.coordinates),
                    ledgerRow("Elevation", "870 feet"),
                    ledgerRow("All-Star Games", "1973, 2012", null, { letterSpacing: "0.3px" }),
                    ledgerRow("Financing", D.financing_method)
                  )
                ),
                React.createElement("div", { className: "rs-card" },
                  React.createElement(SecHead, { ix: "02", title: "Lineage" }),
                  React.createElement("div", { className: "rs-stack" },
                    React.createElement("div", { className: "rs-lbl k" }, "Name History"),
                    React.createElement("div", { className: "rs-val v" }, D.name_history)),
                  React.createElement("div", { className: "rs-stack" },
                    React.createElement("div", { className: "rs-lbl k" }, "Preceded By"),
                    React.createElement("div", { className: "rs-val v" }, D.preceded_by))
                ),
                React.createElement("div", { className: "rs-card" },
                  React.createElement(SecHead, { ix: "03", title: "Construction & Era" }),
                  React.createElement("div", { className: "rs-tl" },
                    React.createElement("div", { className: "track" }),
                    React.createElement("div", { className: "pts" },
                      tlPt("1968", "Construction begins \u00b7 Jul 11", false),
                      tlPt("1973", "Opening Day \u00b7 Apr 10", true),
                      tlPt("1993", "Renamed Kauffman Stadium", false),
                      tlPt("'07\u2013'09", "Major renovation", false)
                    )
                  ),
                  React.createElement("div", { className: "rs-reno" },
                    React.createElement("span", { className: "rs-lbl", style: { paddingTop: 2 } }, "Renovations"),
                    React.createElement("span", { className: "v" }, D.renovations)
                  )
                )
              ),

              /* ===== COL B : Stadium Context (lead) with inline field plan ===== */
              React.createElement("div", { className: "rs-col" },
                React.createElement("div", { className: "rs-card rs-ctxcard" },
                  React.createElement(SecHead, { ix: "04", title: "Fountains & Crown" }),
                  React.createElement("div", { className: "rs-ctx rs-ctx-lead" },
                    React.createElement("p", { key: 0 }, D.stadium_context[0]),
                    React.createElement("figure", { className: "rs-fieldfig" },
                      FieldDiagram ? React.createElement(FieldDiagram, {
                        lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                        orientation: D.orientation, degrees: D.orientation_degrees, accent: C.primary.hex
                      }) : null
                    ),
                    D.stadium_context.slice(1, 3).map((p, i) => React.createElement("p", { key: i + 1 }, p))
                  )
                )
              ),

              /* ===== COL C : The Visit (dark) ===== */
              React.createElement("div", { className: "rs-col" },
                React.createElement("div", { className: "rs-visit" },
                  React.createElement("div", { className: "vhead" },
                    React.createElement("span", { className: "tt" }, "Group Visit"),
                    React.createElement("span", { className: "pill" }, "Visit " + D.visit_order + " of 42")
                  ),
                  React.createElement("div", { className: "rs-vcols" },
                    React.createElement("div", null,
                      vrow("Day", D.featured_visit_day),
                      vrow("Date", D.featured_visit_date),
                      vrow("First Pitch", D.start_time + " " + D.time_zone)
                    ),
                    React.createElement("div", null,
                      vrow("Matchup", D.game_result),
                      vrow("Attendance", D.attendance),
                      vrow("Duration", D.game_duration)
                    )
                  ),
                  React.createElement("div", { className: "rs-matchup" },
                    React.createElement("div", { className: "rs-coin" },
                      React.createElement("img", { className: "mlogo", src: "assets/angels-logo-1986.png", alt: "California Angels" })),
                    teamScore(D.box.away.abbr, D.box.away.r, D.box.away.r > D.box.home.r),
                    React.createElement("span", { className: "at" }, "AT"),
                    teamScore(D.box.home.abbr, D.box.home.r, D.box.home.r > D.box.away.r),
                    React.createElement("div", { className: "rs-coin home" },
                      React.createElement("img", { className: "mlogo", src: "assets/royals-logo.svg", alt: "Kansas City Royals" }))
                  ),
                  BoxScore(D.box),
                  React.createElement("div", { className: "rs-vcols pit", style: { marginTop: 10 } },
                    React.createElement("div", null,
                      vrow("Home SP", D.home_starting_pitcher),
                      vrow("Away SP", D.away_starting_pitcher)
                    ),
                    React.createElement("div", null,
                      vrow("Win", D.winning_pitcher),
                      vrow("Loss", D.losing_pitcher),
                      vrow("Save", D.save_pitcher)
                    )
                  ),
                  React.createElement("div", { className: "rs-wx" },
                    wxCell("temp", D.temperature, null, "Temp"),
                    wxCell("sun", null, D.conditions, "Sky"),
                    wxCell("wind", null, D.wind, "Wind"),
                    wxCell("drop", D.humidity, null, "Humidity")
                  )
                ),
                React.createElement("div", { className: "rs-card rs-ctxcont" },
                  React.createElement("div", { className: "rs-ctx" },
                    D.stadium_context.slice(3).map((p, i) => React.createElement("p", { key: i }, p))
                  )
                )
              )
            )
          ),

          /* ---- FOOTER ---- */
          React.createElement("div", { className: "rs-footer" },
            React.createElement("div", { className: "fl" },
              React.createElement("div", { className: "plate" }, "ROYALS STADIUM"),
              React.createElement("div", { className: "sub" }, "Harry S. Truman Sports Complex \u00b7 Kansas City")
            ),
            React.createElement("div", { className: "status" },
              React.createElement("div", { className: "k" }, "STATUS"),
              React.createElement("div", { className: "v" }, D.status)
            )
          )
        ),

        React.createElement("div", { className: "rs-gutter" })
      )
    );
  }

  /* ---------- helpers ---------- */
  function ribCell(label, value) {
    return React.createElement("div", { className: "cell" },
      React.createElement("div", { className: "rs-lbl" }, label),
      React.createElement("div", { className: "rv" }, value));
  }
  function ledgerRow(label, value, style, lblStyle) {
    return React.createElement("div", { className: "row" },
      React.createElement("div", { className: "rs-lbl", style: lblStyle }, label),
      React.createElement("div", { className: "rs-val", style: style }, value));
  }
  function vrow(label, value) {
    return React.createElement("div", { className: "rs-vrow" },
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
    return React.createElement("table", { className: "rs-box" },
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

  window.RoyalsSpread = Spread;
})();
