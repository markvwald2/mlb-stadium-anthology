/* milehigh-spread.jsx — the single Mile High Stadium spread, "Proof of Concept / The Borrowed Bowl".
   Reads window.MILEHIGH (local data) + window.MileHighProtractor.
   Left page: full-bleed hero + compact title/city block + altitude datum.
   Right page: EXACTLY two sections — Stadium Section and Visit Section.
   Concrete-and-steel editorial frame; Rockies purple/black/silver as restrained accents.
   Every populated field is rendered exactly once; n/a/unknown values are omitted. */
(function () {
  const D = window.MILEHIGH;
  const Field = window.MileHighProtractor;
  const C = D.colors;

  function Slot(props) {
    return React.createElement("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.src ? { src: props.src } : {}, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return React.createElement("div", { className: "mh-sec-h" },
      React.createElement("span", { className: "ix" }, props.ix),
      React.createElement("span", { className: "tt" }, props.title),
      props.note ? React.createElement("span", { className: "nt" }, props.note) : null
    );
  }

  /* faint surveyor / engineering grid for the hero datum */
  function SurveyGrid(props) {
    const lines = [];
    const w = props.w, h = props.h, step = props.step || 30;
    for (let x = 0; x <= w; x += step) lines.push(React.createElement("line", { key: "x" + x, x1: x, y1: 0, x2: x, y2: h, stroke: props.stroke, strokeWidth: 0.75 }));
    for (let y = 0; y <= h; y += step) lines.push(React.createElement("line", { key: "y" + y, x1: 0, y1: y, x2: w, y2: y, stroke: props.stroke, strokeWidth: 0.75 }));
    return React.createElement("svg", { className: props.className, viewBox: "0 0 " + w + " " + h, width: w, height: h, "aria-hidden": "true" }, lines);
  }

  function WxIcon(kind) {
    const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: C.primary.hex, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    if (kind === "drizzle") return React.createElement("svg", common,
      React.createElement("path", { d: "M7 15h9a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 7.5 7.2 3.9 3.9 0 0 0 7 15z" }),
      React.createElement("path", { d: "M8 18l-1 2M12 18l-1 2M16 18l-1 2" }));
    if (kind === "wind") return React.createElement("svg", common,
      React.createElement("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return React.createElement("svg", common,
      React.createElement("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  /* ---- the borrowed-bowl tenancy lifeline (horizontal) ---- */
  function Timeline() {
    const nodes = [
      { y: "1947", cap: "Construction began", mlb: false },
      { y: "1948", cap: "Opened as Bears Stadium", mlb: false },
      { y: "1960", cap: "Broncos begin tenancy", mlb: false },
      { y: "1968", cap: "Renamed Mile High Stadium", mlb: false },
      { y: "1993", cap: "MLB play begins", mlb: true },
      { y: "1994", cap: "Final MLB game", date: "Aug 11", mlb: true },
      { y: "2000", cap: "Last Bronco game", date: "Dec 23", mlb: false },
      { y: "2002", cap: "Demolished", mlb: false }
    ];
    return React.createElement("div", { className: "mh-timeline" },
      React.createElement("div", { className: "tl-track" },
        React.createElement("div", { className: "tl-line" }),
        React.createElement("div", { className: "tl-span" }),
        nodes.map((n, i) => React.createElement("div", { key: i, className: "tl-node" + (n.mlb ? " mlb" : "") },
          React.createElement("span", { className: "tl-dot" }),
          React.createElement("span", { className: "tl-yr" }, n.y),
          React.createElement("span", { className: "tl-cap" }, n.cap, n.date ? [React.createElement("br", { key: "b" }), n.date] : null)
        ))
      )
    );
  }

  function Spread() {
    return (
      React.createElement("div", { className: "mh-spread", "data-screen-label": "Mile High Stadium spread" },

        /* ============ LEFT PAGE / HERO ============ */
        React.createElement("div", { className: "mh-page mh-left" },
          React.createElement("div", { className: "mh-hero-slot" },
            React.createElement(Slot, { id: "milehigh-hero", src: "uploads/mile-high-stadium-00-main-93e6537b.jpg", placeholder: "Drop the Mile High Stadium hero photo \u2014 open-air multipurpose bowl: concrete-and-steel grandstands, movable east stand, packed crowd, Front Range / Denver edge", shape: "rect" })
          ),
          React.createElement("div", { className: "mh-hero-scrim" }),

          /* ── top masthead: title + elevation, purple on the pale sky ── */
          React.createElement("div", { className: "mh-topmast" },
            React.createElement("h1", { className: "mh-hero-name" },
              React.createElement("span", null, "Mile High "),
              React.createElement("span", null, "Stadium")
            ),
            React.createElement("div", { className: "mh-topmast-r" },
              React.createElement("div", { className: "mh-elev-cap" }, "Elevation \u00b7 exactly one mile"),
              React.createElement("div", { className: "mh-elev" },
                React.createElement("span", { className: "ev" }, "5,280"),
                React.createElement("span", { className: "eu" }, "FT")
              )
            )
          ),

          /* ── decreased bottom band: location + marks + era/coord ── */
          React.createElement("div", { className: "mh-plate" },
            React.createElement("div", { className: "mh-plate-l" },
              React.createElement("div", { className: "mh-hero-loc" }, D.city + ", " + D.state),
              React.createElement("div", { className: "mh-hero-marks" },
                React.createElement("img", { className: "nl", src: "assets/nl-logo.png", alt: "National League" }),
                React.createElement("span", { className: "div" }),
                React.createElement("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })
              )
            ),
            React.createElement("div", { className: "mh-plate-r" },
              React.createElement("div", { className: "mh-hero-era" },
                React.createElement("span", null, D.status),
                React.createElement("span", { className: "dot" }, "\u00b7"),
                React.createElement("span", null, D.roof_type),
                React.createElement("span", { className: "dot" }, "\u00b7"),
                React.createElement("span", null, D.years_active)
              ),
              React.createElement("div", { className: "mh-coord" }, D.lat + "  \u00b7  " + D.lon)
            )
          )
        ),

        /* ============ RIGHT PAGE ============ */
        React.createElement("div", { className: "mh-page mh-right" },
          React.createElement("div", { className: "mh-rp" },

            /* ============ SECTION 1 — STADIUM ============ */
            React.createElement("div", { className: "mh-section mh-stadium" },
              React.createElement(SecHead, { ix: "I", title: "Stadium Section", note: D.classification_era }),

              /* identity ribbon */
              React.createElement("div", { className: "mh-ribbon" },
                React.createElement("div", { className: "cell mark-cell" },
                  React.createElement("img", { className: "rib-mark", src: "assets/colorado-rockies-logo.svg", alt: "Colorado Rockies" })
                ),
                ribCell("Team", D.team_name),
                ribCell("League", D.league),
                ribCell("Division", D.division),
                React.createElement("div", { className: "cell colors-cell" },
                  React.createElement("div", { className: "rl" }, "Club Colors"),
                  React.createElement("div", { className: "sw-row" },
                    swatch(C.primary), swatch(C.secondary), swatch(C.accent)
                  )
                ),
                React.createElement("div", { className: "cell visit-cell" },
                  React.createElement("div", { className: "vn" }, "Visit"),
                  React.createElement("div", { className: "vv" }, "No. " + D.visit_order)
                )
              ),

              /* facts + diagram/finance */
              React.createElement("div", { className: "mh-body" },
                React.createElement("div", { className: "mh-facts" },
                  factRow("Capacity", D.capacity_current + " (" + D.capacity_opening + " opening)"),
                  factRow("Surface", D.surface + " (natural grass)"),
                  factRow("Type", D.stadium_type),
                  factRow("Architecture", D.architectural_style),
                  factRow("Fa\u00e7ade", D.facade_material),
                  factRow("Architect", D.architect),
                  factRow("Name History", D.name_history),
                  factRow("Renovations", D.renovations),
                  factRow("Address", D.address),
                  factRow("Location", D.location_classification),
                  factRow("Succeeded By", D.succeeded_by)
                ),

                React.createElement("div", { className: "mh-photos" },
                  React.createElement("figure", { className: "mh-photo" },
                    React.createElement(Slot, { id: "milehigh-rp-1", src: "uploads/mile-high-stadium-01.jpg", placeholder: "Open-air bowl \u2014 concrete-and-steel grandstands, packed crowd", shape: "rect" })
                  ),
                  React.createElement("figure", { className: "mh-photo" },
                    React.createElement(Slot, { id: "milehigh-rp-2", src: "uploads/mile-high-stadium-02.jpg", placeholder: "Movable east stand \u2014 expandable steel grandstand structure", shape: "rect" })
                  )
                ),

                React.createElement("div", { className: "mh-side" },
                  React.createElement("figure", { className: "mh-fieldfig" },
                    React.createElement("div", { className: "mh-fieldwrap" },
                      Field ? React.createElement(Field, {
                        lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                        orientation: D.orientation, degrees: D.orientation_degrees, accent: C.primary.hex
                      }) : null
                    ),
                    React.createElement("figcaption", { style: { letterSpacing: "0.3px", textTransform: "uppercase" } }, "LF " + D.left_field_distance + " \u00b7 CF " + D.center_field_distance + " \u00b7 RF " + D.right_field_distance)
                  ),
                  React.createElement("div", { className: "mh-finance" },
                    React.createElement("div", { className: "fin-h" }, "Cost & Financing"),
                    React.createElement("div", { className: "fin-cost" },
                      React.createElement("span", { className: "fc-v" }, D.stadium_cost),
                      React.createElement("span", { className: "fc-adj" }, D.stadium_cost_adjusted + " adj.")
                    ),
                    React.createElement("p", { className: "fin-v", style: { fontSize: "13px" } }, D.financing_method)
                  )
                )
              ),

              /* tenancy lifeline */
              React.createElement(Timeline, null),

              /* context prose */
              React.createElement("div", { className: "mh-ctx" },
                D.stadium_context.map((p, i) => i === 0
                  ? React.createElement("p", { key: i, className: "lead" },
                      React.createElement("span", { className: "mh-dropcap" }, p.slice(0, 1)),
                      p.slice(1))
                  : React.createElement("p", { key: i }, p))
              )
            ),

            /* ============ SECTION 2 — VISIT ============ */
            React.createElement("div", { className: "mh-section mh-visit" },
              React.createElement(SecHead, { ix: "II", title: "Home Opener \u2014 Friday, April 9, 1993", note: "Other visits: " + D.other_visits }),

              React.createElement("div", { className: "mh-vbody" },
                React.createElement("div", { className: "mh-vmain" },

                  /* line-score scorecard */
                  React.createElement("div", { className: "mh-scorecard" },
                    React.createElement("div", { className: "sc-head" },
                      React.createElement("div", { className: "sc-match" }, D.box.home.team + "  vs  " + D.box.away.team),
                      React.createElement("div", { className: "sc-result" },
                        React.createElement("span", { className: "rs" }, D.game_result),
                        React.createElement("span", { className: "fn" }, "Final \u00b7 " + D.innings_played + " innings \u00b7 " + D.day_night + " game")
                      )
                    ),
                    Scoreboard(D.box),
                    React.createElement("div", { className: "sc-facts" },
                      scFact("Attendance", D.attendance),
                      scFact("First Pitch", D.start_time + " " + D.time_zone),
                      scFact("Game Length", D.game_duration),
                      scFact("Winning Pitcher", D.winning_pitcher, "COL starter"),
                      scFact("Losing Pitcher", D.losing_pitcher, "MON starter")
                    )
                  ),

                  /* weather — single line */
                  React.createElement("div", { className: "mh-weather" },
                    React.createElement("span", { className: "wlabel" }, "Weather"),
                    React.createElement("span", { className: "witem" }, WxIcon("drizzle"), React.createElement("b", null, D.temperature), React.createElement("span", { className: "t" }, D.conditions)),
                    React.createElement("span", { className: "witem" }, WxIcon("wind"), React.createElement("span", { className: "k" }, "Wind"), React.createElement("b", null, D.wind)),
                    React.createElement("span", { className: "witem" }, WxIcon("drop"), React.createElement("span", { className: "k" }, "Humidity"), React.createElement("b", null, D.humidity))
                  )
                ),

                React.createElement("figure", { className: "mh-photo mh-vphoto" },
                  React.createElement(Slot, { id: "milehigh-rp-3", src: "uploads/mile-high-stadium-03.jpg", placeholder: "Home opener \u2014 game-day crowd / field, Rockies vs Expos, Apr 9, 1993", shape: "rect" })
                )
              )
            )
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function swatch(c) {
    return React.createElement("span", { className: "sw", title: c.name },
      React.createElement("span", { className: "chip", style: { background: c.hex } }),
      React.createElement("span", { className: "cn" }, c.name)
    );
  }
  function ribCell(label, value) {
    return React.createElement("div", { className: "cell" },
      React.createElement("div", { className: "rl" }, label),
      React.createElement("div", { className: "rv" }, value));
  }
  function factRow(label, value) {
    return React.createElement("div", { className: "row" },
      React.createElement("div", { className: "fl" }, label),
      React.createElement("div", { className: "fv" }, value));
  }
  function vsCell(label, value) {
    return React.createElement("div", { className: "vs-cell" },
      React.createElement("div", { className: "vs-l" }, label),
      React.createElement("div", { className: "vs-v" }, value));
  }
  function scFact(label, value, note) {
    return React.createElement("div", { className: "scf" },
      React.createElement("div", { className: "scf-l" }, label),
      React.createElement("div", { className: "scf-v" }, value,
        note ? React.createElement("span", { className: "scf-n" }, note) : null));
  }

  /* Integrated line score: runs column enlarged as the headline number. */
  function Scoreboard(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return React.createElement("tr", { className: win ? "win" : "" },
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i, className: "inn" }, n)),
        React.createElement("td", { className: "rcol sep" }, t.r),
        React.createElement("td", { className: "hecol" }, t.h),
        React.createElement("td", { className: "hecol" }, t.e)
      );
    }
    return React.createElement("table", { className: "mh-scoreboard" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          cols.map((n) => React.createElement("th", { key: n, className: "inn" }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E")
        )
      ),
      React.createElement("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)
      )
    );
  }

  window.MileHighSpread = Spread;
})();
