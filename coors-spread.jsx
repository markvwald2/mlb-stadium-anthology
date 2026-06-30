/* coors-spread.jsx — the single Coors Field spread, "The Mile-High Datum".
   Reads window.COORS (local data) + window.FieldDiagram.
   Light cream architectural survey; Rockies purple used sparingly
   (title rule · datum line · field-orientation graphic · score · home-opener tab).
   Every populated field is rendered exactly once. */
(function () {
  const D = window.COORS;
  const FieldDiagram = window.ProtractorDiagram;
  const C = D.colors;

  function Slot(props) {
    return React.createElement("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.style ? { style: props.style } : {}));
  }

  /* section header — small charcoal eyebrow on a hairline */
  function SecHead(props) {
    return React.createElement("div", { className: "cf-sec-h" + (props.accent ? " accent" : "") },
      React.createElement("span", { className: "tt" }, props.title),
      props.note ? React.createElement("span", { className: "nt" }, props.note) : null
    );
  }

  /* a faint surveyor / Sanborn grid — the architectural benchmark texture */
  function SurveyGrid(props) {
    const lines = [];
    const w = props.w, h = props.h, step = props.step || 34;
    for (let x = 0; x <= w; x += step) lines.push(React.createElement("line", { key: "x" + x, x1: x, y1: 0, x2: x, y2: h, stroke: props.stroke, strokeWidth: 0.75 }));
    for (let y = 0; y <= h; y += step) lines.push(React.createElement("line", { key: "y" + y, x1: 0, y1: y, x2: w, y2: y, stroke: props.stroke, strokeWidth: 0.75 }));
    return React.createElement("svg", { className: props.className, viewBox: "0 0 " + w + " " + h, width: w, height: h, "aria-hidden": "true" },
      lines,
      props.children
    );
  }

  function WxIcon(kind) {
    const common = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: C.primary.hex, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    if (kind === "cloud") return React.createElement("svg", common,
      React.createElement("circle", { cx: 8, cy: 9, r: 3.4 }),
      React.createElement("path", { d: "M7 18h9a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 7.5 10.2 3.9 3.9 0 0 0 7 18z" }));
    if (kind === "wind") return React.createElement("svg", common,
      React.createElement("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return React.createElement("svg", common,
      React.createElement("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function Spread() {
    return (
      React.createElement("div", { className: "cf-spread", "data-screen-label": "Coors Field spread" },

        /* ============ LEFT PAGE / HERO ============ */
        React.createElement("div", { className: "cf-page cf-left" },
          React.createElement("div", { className: "cf-hero-slot" },
            React.createElement(Slot, { id: "coors-hero", placeholder: "Drop the Coors Field hero photo \u2014 elevated SW view: LoDo brick foreground, stadium bowl, Front Range horizon", shape: "rect" })
          ),
          React.createElement("div", { className: "cf-hero-scrim" }),

          /* the Mile-High Datum: surveyor benchmark + coordinates, lower-right */
          React.createElement("div", { className: "cf-datum" },
            React.createElement(SurveyGrid, { className: "cf-datum-grid", w: 360, h: 300, step: 30, stroke: "rgba(232,226,214,.30)" }),
            React.createElement("div", { className: "cf-datum-read" },
              datumRow("LAT", D.lat),
              datumRow("LON", D.lon),
              datumRow("ELEV", "5,280 FT")
            ),
            React.createElement("div", { className: "cf-datum-tick" })
          ),

          React.createElement("div", { className: "cf-hero-title" },
            React.createElement("h1", { className: "cf-hero-name" }, "Coors Field"),
            React.createElement("div", { className: "cf-hero-loc" }, D.city + ", " + D.state),
            React.createElement("div", { className: "cf-hero-rule" }),
            React.createElement("div", { className: "cf-hero-era" },
              React.createElement("span", null, "Retro Classic"),
              React.createElement("span", { className: "dot" }, "\u00b7"),
              React.createElement("span", null, "Open Air"),
              React.createElement("span", { className: "dot" }, "\u00b7"),
              React.createElement("span", null, "1995\u2013Present")
            )
          ),

          /* league + MLB marks — bottom-left colophon */
          React.createElement("div", { className: "cf-hero-marks" },
            React.createElement("img", { className: "nl", src: "assets/nl-logo.png", alt: "National League" }),
            React.createElement("span", { className: "div" }),
            React.createElement("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })
          )
        ),

        /* ============ RIGHT PAGE ============ */
        React.createElement("div", { className: "cf-page cf-right" },
          React.createElement("div", { className: "cf-rp" },

            /* ---- IMAGE STRIP ---- */
            React.createElement("div", { className: "cf-strip" },
              stripFrame("coors-s1", "Brick & sandstone fa\u00e7ade"),
              stripFrame("coors-s2", "Seating bowl"),
              stripFrame("coors-s3", "Social deck, added 2014"),
              stripFrame("coors-s4", "Warehouse district")
            ),

            /* ---- METADATA RIBBON ---- */
            React.createElement("div", { className: "cf-ribbon" },
              React.createElement("div", { className: "cell mark-cell" },
                React.createElement("img", { className: "rib-mark", src: "assets/colorado-rockies-logo.svg", alt: "Colorado Rockies" })
              ),
              ribCell("Team", D.team_name),
              ribCell("League", D.league),
              ribCell("Division", "NL West"),
              ribCell("Opened", D.opening_day),
              ribCell("Classification", D.classification_era),
              ribCell("Status", D.status),
              React.createElement("div", { className: "cell visit-cell" },
                React.createElement("div", { className: "vn" }, "Visit #" + D.visit_order),
                React.createElement("div", { className: "vd" }, "of " + D.visit_total)
              )
            ),

            /* ---- STADIUM SECTION (upper) ---- */
            React.createElement("div", { className: "cf-stadium" },

              /* Stadium Facts — table + tucked field diagram + construction/finance */
              React.createElement("div", { className: "cf-col cf-col-facts" },
                React.createElement(SecHead, { title: "Stadium Facts" }),
                React.createElement("div", { className: "cf-facts-grid" },
                  React.createElement("div", { className: "cf-facts" },
                    factRow("Opened", D.opening_day),
                    factRow("Years Active", "1995\u2013Present"),
                    factRow("Capacity", D.capacity_current + " (" + D.capacity_opening + " opening)"),
                    factRow("Surface", D.surface),
                    factRow("Architect", D.architect),
                    factRow("Type", "Open-air, baseball-only"),
                    factRow("Address", D.address),
                    factRow("Facade", D.facade_material),
                    factRow("Location", D.location_classification),
                    factRow("Preceded By", D.preceded_by),
                    factRow("Cost", D.stadium_cost + " (" + D.stadium_cost_adjusted + " adj.)"),
                    factRow("Financing", D.financing_method)
                  ),
                  React.createElement("div", { className: "cf-facts-side" },
                    React.createElement("figure", { className: "cf-fieldfig" },
                      React.createElement("div", { className: "cf-fieldwrap" },
                        FieldDiagram ? React.createElement(FieldDiagram, {
                          lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                          orientation: D.orientation, degrees: D.orientation_degrees, accent: C.primary.hex
                        }) : null
                      )
                    ),
                    React.createElement("div", { className: "cf-renov" },
                      React.createElement("div", { className: "fin-h" }, "Renovations"),
                      D.renovation_history.map((p, i) => React.createElement("p", { key: i, className: "renov-v" }, p))
                    )
                  )
                )
              ),

              /* Stadium Context */
              React.createElement("div", { className: "cf-col cf-col-ctx" },
                React.createElement(SecHead, { title: "The Mile-High Row" }),
                React.createElement("div", { className: "cf-ctx" },
                  D.stadium_context.map((p, i) => React.createElement("p", { key: i }, p))
                )
              )
            ),

            /* ---- THE MILE-HIGH DATUM LINE ---- */
            React.createElement("div", { className: "cf-datum-line" },
              React.createElement("span", { className: "cap" }, "First Visit \u2014 1995"),
              React.createElement("span", { className: "rule" })
            ),

            /* ---- VISIT SECTION (lower) ---- */
            React.createElement("div", { className: "cf-visit" },
              React.createElement("div", { className: "cf-visit-left" },

                /* Home Opener box — integrated scoreboard + game facts */
                React.createElement("div", { className: "cf-scorecard" },
                  React.createElement("div", { className: "tab" }, "Home Opener"),
                  React.createElement("div", { className: "sc-body" },
                    React.createElement("div", { className: "sc-date" }, D.box.date + "  \u00b7  Final / 14 innings"),
                    Scoreboard(D.box),
                    React.createElement("div", { className: "sc-facts" },
                      scFact("Attendance", D.attendance),
                      scFact("First Pitch", D.start_time + " " + D.time_zone),
                      scFact("Game Length", D.game_duration),
                      scFact("Winning Pitcher", D.winning_pitcher),
                      scFact("Losing Pitcher", D.losing_pitcher),
                      scFact("Save", D.save_pitcher)
                    )
                  )
                ),

                /* weather — single line, matches Home Opener width */
                React.createElement("div", { className: "cf-weather-strip" },
                  React.createElement("span", { className: "wlabel" }, "Weather"),
                  React.createElement("span", { className: "witem" }, WxIcon("cloud"), React.createElement("b", null, D.temperature), React.createElement("span", { className: "t" }, D.conditions)),
                  React.createElement("span", { className: "witem" }, WxIcon("wind"), React.createElement("span", { className: "k" }, "Wind"), React.createElement("b", null, D.wind)),
                  React.createElement("span", { className: "witem" }, WxIcon("drop"), React.createElement("span", { className: "k" }, "Humidity"), React.createElement("b", null, D.humidity))
                )
              ),

              /* opening-day photo — spans full height of the left column */
              React.createElement("figure", { className: "cf-visit-photo" },
                React.createElement(Slot, { id: "coors-visit-photo", placeholder: "Opening-week photo \u2014 crowd \u00b7 scoreboard \u00b7 first pitch" })
              )
            )
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function datumRow(k, v) {
    return React.createElement("div", { className: "drow" },
      React.createElement("span", { className: "dk" }, k),
      React.createElement("span", { className: "dv" }, v));
  }
  function stripFrame(id, sub) {
    return React.createElement("figure", { className: "cf-frame" },
      React.createElement(Slot, { id: id, placeholder: sub }));
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
  function finCell(label, value) {
    return React.createElement("div", { className: "fin-cell" },
      React.createElement("div", { className: "fin-l" }, label),
      React.createElement("div", { className: "fin-v" }, value));
  }
  function finRow(label, value) {
    return React.createElement("div", { className: "fin-row" },
      React.createElement("div", { className: "fin-l" }, label),
      React.createElement("div", { className: "fin-v" }, value));
  }
  function vrow(label, value) {
    return React.createElement("div", { className: "vr" },
      React.createElement("span", { className: "vl" }, label),
      React.createElement("span", { className: "dots" }),
      React.createElement("span", { className: "vv" }, value));
  }
  function scoreRow(abbr, score, win) {
    return React.createElement("div", { className: "sr" + (win ? " win" : "") },
      React.createElement("span", { className: "tm" }, abbr),
      React.createElement("span", { className: "sc" }, score));
  }
  function wxCell(icon, label, value) {
    return React.createElement("div", { className: "wc" },
      WxIcon(icon),
      React.createElement("div", { className: "tx" },
        React.createElement("div", { className: "wl" }, label),
        React.createElement("div", { className: "wv" }, value)));
  }

  function scFact(label, value) {
    return React.createElement("div", { className: "scf" },
      React.createElement("div", { className: "scf-l" }, label),
      React.createElement("div", { className: "scf-v" }, value));
  }

  /* Integrated scoreboard: line score with the runs column enlarged as the headline. */
  function Scoreboard(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return React.createElement("tr", { className: win ? "win" : "" },
        React.createElement("td", { className: "tm" }, t.team.indexOf("Rockies") >= 0 ? "Rockies" : "Mets"),
        t.byInning.map((n, i) => React.createElement("td", { key: i, className: "inn" }, n)),
        React.createElement("td", { className: "rcol sep" }, t.r),
        React.createElement("td", { className: "hecol" }, t.h),
        React.createElement("td", { className: "hecol" }, t.e)
      );
    }
    return React.createElement("table", { className: "cf-scoreboard" },
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

  window.CoorsSpread = Spread;
})();
