/* wrigley-editorial.jsx — Wrigley Field "Editorial Atlas" spread (option B).
   Reads window.WRIGLEY. Serif-forward archival treatment inspired by a classic
   stadium-monograph plate: full-bleed aerial left page; right page with a four-up
   photo strip, a blue/serif metadata ribbon, a specifications table, a field-
   dimensions diagram, historical context behind a giant 1914 watermark, and a
   rust scorecard band. Every populated WRIGLEY value is routed here exactly once.
   Exposes window.WrigleyEditorial. */
(function () {
  const D = window.WRIGLEY;

  function Slot(props) {
    return React.createElement("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", src: props.src, fit: props.fit });
  }

  /* line-art weather glyphs */
  function WxGlyph(kind) {
    const c = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5347", strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round", className: "we-wx-ico" };
    if (kind === "temp") return React.createElement("svg", c,
      React.createElement("path", { d: "M10 13.6V5a2 2 0 1 1 4 0v8.6a4 4 0 1 1-4 0z" }),
      React.createElement("path", { d: "M12 13.5v-5" }));
    if (kind === "clear") return React.createElement("svg", c,
      React.createElement("circle", { cx: 12, cy: 12, r: 4 }),
      React.createElement("path", { d: "M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.8-1.8M18 6l1.8-1.8" }));
    if (kind === "wind") return React.createElement("svg", c,
      React.createElement("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      React.createElement("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      React.createElement("path", { d: "M3 12h7" }));
    if (kind === "humidity") return React.createElement("svg", c,
      React.createElement("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  function Spread() {
    const specs = [
      ["Opened", D.opening_day],
      ["First Cubs Game", "April 20, 1916"],
      ["Groundbreaking", D.construction_start],
      ["Renovations", D.renovations],
      ["Capacity", D.capacity_current + " (" + D.capacity_opening + " originally)"],
      ["Surface", D.playing_surface_type + " (" + D.surface + ")"],
      ["Architect", D.architect],
      ["Type", D.stadium_type],
      ["Previous Names", "Weeghman Park (1914\u20131920)\nCubs Park (1920\u20131926)"],
      ["Location Type", D.location_classification],
      ["Preceded By", D.preceded_by]
    ];

    return (
      React.createElement("div", { className: "we-spread", "data-screen-label": "Wrigley Field editorial spread" },

        /* ===================== LEFT PAGE / AERIAL ===================== */
        React.createElement("div", { className: "we-page we-left", "data-screen-label": "Wrigley Field aerial" },
          React.createElement("div", { className: "we-hero-slot" },
            React.createElement(Slot, { id: "wrigley-aerial", src: "images/wrigley/wrigley-field-00-main.jpg", fit: "cover", placeholder: "Drop the Wrigley aerial \u2014 the ballpark embedded in the Chicago street grid, rooftops beyond the outfield" })),
          React.createElement("div", { className: "we-hero-scrim" }),
          React.createElement("div", { className: "we-hero-mast" },
            React.createElement("img", { className: "wf-logo", src: "assets/wrigley-field-logo.svg", alt: "Wrigley Field" })),
          React.createElement("div", { className: "we-hero-block" },
            React.createElement("div", { className: "we-hero-loc" }, D.city + ", " + D.state),
            React.createElement("div", { className: "we-hero-rule" }),
            React.createElement("div", { className: "we-hero-stats" },
              React.createElement("div", null, D.years_active.toUpperCase() + "  \u00b7  " + D.league.toUpperCase())),
            React.createElement("div", { className: "we-hero-colophon" },
              D.address + "   \u00b7   " + D.coordinates + "   \u00b7   ELEV. " + D.elevation))
        ),

        /* ===================== RIGHT PAGE ===================== */
        React.createElement("div", { className: "we-page we-right" },
          React.createElement("div", { className: "we-rp" },

            /* --- photo strip --- */
            React.createElement("div", { className: "we-photos" },
              photo("we-p1", "Marquee", "narrow", "images/wrigley/wrigley-field-01.jpg"),
              photo("we-p2", "Ivy Wall", null, "images/wrigley/wrigley-field-02.jpg"),
              photo("we-p3", "Grandstand", null, "images/wrigley/wrigley-field-03.jpg"),
              photo("we-p4", "Skyline", "narrow", "images/wrigley/wrigley-field-04.jpg")),

            /* --- metadata ribbon --- */
            React.createElement("div", { className: "we-ribbon" },
              ribCell("Team", D.team_name),
              ribCell("Division", D.division),
              ribCell("Era", "Jewel Box & Early Concrete"),
              ribCell("Opened", D.opened),
              ribCell("Status", D.status),
              React.createElement("div", { className: "we-rc visitno" },
                React.createElement("div", { className: "k" }, "Ballpark"),
                React.createElement("div", { className: "v" },
                  React.createElement("span", { className: "ord" }, "1st"),
                  React.createElement("span", { className: "of" }, "of 42")))),

            /* --- middle: specs | field | context --- */
            React.createElement("div", { className: "we-middle" },

              React.createElement("div", { className: "we-specs" },
                React.createElement("table", { className: "we-spectable" },
                  React.createElement("tbody", null,
                    specs.map((s, i) => React.createElement("tr", { key: i },
                      React.createElement("th", null, s[0]),
                      React.createElement("td", null, String(s[1]).split("\n").map(function (ln, j, arr) {
                        return React.createElement(React.Fragment, { key: j }, ln, j < arr.length - 1 ? React.createElement("br", null) : null);
                      }))))))),

              React.createElement("div", { className: "we-field" },
                React.createElement("div", { className: "we-modh center" }, "Field Dimensions"),
                React.createElement("div", { className: "we-fd-group" },
                  React.createElement("div", { className: "we-streets" },
                    React.createElement("div", { className: "we-st we-st-top" }, "Waveland"),
                    React.createElement("div", { className: "we-st we-st-right" }, "Sheffield"),
                    React.createElement("div", { className: "we-st we-st-bottom" }, "Addison"),
                    React.createElement("div", { className: "we-st we-st-left" }, "Clark"),
                    React.createElement("div", { className: "we-fd-wrap" },
                      window.WrigleyProtractor ? React.createElement(window.WrigleyProtractor, {
                        lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                        orientation: D.orientation, degrees: D.orientation_degrees, accent: "#1C3D72"
                      }) : null)),
                  React.createElement("div", { className: "we-fd-nick" }, "\u201CThe Friendly Confines\u201D"))),

              React.createElement("div", { className: "we-context" },
                React.createElement("div", { className: "we-watermark" }, "1914"),
                React.createElement("div", { className: "we-modh blue" }, "Historical Context"),
                React.createElement("div", { className: "we-ctx" },
                  D.stadium_context.map((p, i) => React.createElement("p", { key: i }, p))))
            ),

            /* --- construction & finance strip --- */
            React.createElement("div", { className: "we-finance" },
              finCell("Architectural Style", D.architectural_style),
              finCell("Facade Material", D.facade_material),
              React.createElement("div", { className: "we-fc cost" },
                React.createElement("div", { className: "k" }, "Stadium Cost"),
                React.createElement("div", { className: "v" },
                  React.createElement("span", { className: "big" }, D.stadium_cost),
                  React.createElement("span", { className: "adj" }, D.stadium_cost_adjusted + " adj."))),
              finCell("Financing Method", D.financing_method)),

            /* --- visit information band --- */
            React.createElement("div", { className: "we-visit" },
              React.createElement("div", { className: "we-vtab" },
                React.createElement("svg", { className: "we-vtab-flag", viewBox: "0 0 104 96", role: "img", "aria-label": "Cubs L flag" },
                  React.createElement("circle", { cx: 22, cy: 8, r: 3.2, fill: "#F1ECDF" }),
                  React.createElement("line", { x1: 22, y1: 8, x2: 22, y2: 90, stroke: "#F1ECDF", strokeWidth: 3, strokeLinecap: "round" }),
                  React.createElement("rect", { x: 22, y: 14, width: 72, height: 50, fill: "#2A5BC4", stroke: "#EFE7D6", strokeWidth: 1.5 }),
                  React.createElement("path", { d: "M46 22 L56 22 L56 50 L69 50 L69 57 L46 57 Z", fill: "#F7F2E8" }))),

              React.createElement("div", { className: "we-vmain" },

                /* scorecard */
                React.createElement("div", { className: "we-score" },
                  React.createElement("div", { className: "we-score-top" },
                    React.createElement("span", { className: "tag" }, D.trip_name + " Trip"),
                    React.createElement("span", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date.toUpperCase())),
                  React.createElement("div", { className: "we-score-row" },
                    React.createElement("span", { className: "tm away" }, D.away_team.split(" ").pop()),
                    React.createElement("span", { className: "box" }, D.box.away.r)),
                  React.createElement("div", { className: "we-score-row" },
                    React.createElement("span", { className: "tm home" }, D.home_team.split(" ").pop()),
                    React.createElement("span", { className: "box" }, D.box.home.r)),
                  React.createElement("div", { className: "we-venue" }, "Wrigley Field \u00b7 " + D.city + ", " + D.state),
                  LineScore(D.box)),

                /* stats */
                React.createElement("div", { className: "we-stats" },
                  statRow("Attendance", D.attendance),
                  statRow("Start Time", D.start_time + " " + D.time_zone),
                  statRow("Game Time", D.game_duration),
                  React.createElement("div", { className: "we-stat block" },
                    React.createElement("div", { className: "k" }, "Pitching Matchup"),
                    React.createElement("div", { className: "v" }, D.away_starting_pitcher + " (" + D.away_team_abbreviation + ")"),
                    React.createElement("div", { className: "v em" }, "vs."),
                    React.createElement("div", { className: "v" }, D.home_starting_pitcher + " (" + D.home_team_abbreviation + ")")),
                  React.createElement("div", { className: "we-stat block" },
                    React.createElement("div", { className: "k" }, "Decision"),
                    React.createElement("div", { className: "v" }, React.createElement("b", null, "W:"), " " + D.winning_pitcher + " (" + D.away_team_abbreviation + ")"),
                    React.createElement("div", { className: "v" }, React.createElement("b", null, "L:"), " " + D.losing_pitcher + " (" + D.home_team_abbreviation + ")"))),

                /* weather + visit history */
                React.createElement("div", { className: "we-wxn" },
                  React.createElement("div", { className: "we-wx-head" }, React.createElement("span", null, "Weather")),
                  React.createElement("div", { className: "we-wx-row" },
                    wxItem("temp", D.temperature, "Temperature"),
                    wxItem("clear", D.conditions, "Conditions"),
                    wxItem("wind", D.wind, "Wind"),
                    wxItem("humidity", D.humidity, "Humidity")),
                  VisitLog())
              ))
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function photo(id, label, mod, src) {
    return React.createElement("div", { className: "we-pcard " + (mod || "") },
      React.createElement(Slot, { id: id, placeholder: label, src: src, fit: "cover" }),
      React.createElement("div", { className: "we-pcap" }, label));
  }
  function ribCell(k, v) {
    return React.createElement("div", { className: "we-rc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function ribCellLogo(k, v, src, alt) {
    return React.createElement("div", { className: "we-rc logo" },
      React.createElement("img", { className: "nl-logo", src: src, alt: alt }),
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function VisitLog() {
    const years = D.visit_log || [];
    const span = years.length ? years[0].year + "\u2013" + years[years.length - 1].year : "";
    return React.createElement("div", { className: "we-vlog" },
      React.createElement("div", { className: "we-vlog-head" },
        React.createElement("span", { className: "lab" }, "Visit History"),
        React.createElement("span", { className: "sub" }, "Multiple visits \u00b7 " + span)),
      React.createElement("div", { className: "we-vlog-list" },
      years.map(function (y) {
        return React.createElement("div", { className: "we-vlog-year", key: y.year },
          React.createElement("div", { className: "yr" }, y.year),
          React.createElement("div", { className: "ev" },
            y.games.map(function (g, i) {
              return React.createElement("div", { className: "evrow" + (g.featured ? " feat" : ""), key: i },
                React.createElement("span", { className: "d" }, g.date),
                g.opponent ? React.createElement("span", { className: "opp" }, "vs " + g.opponent) : null,
                g.note ? React.createElement("span", { className: "n" }, g.note) : null);
            })));
      })));
  }
  function finCell(k, v) {
    return React.createElement("div", { className: "we-fc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function statRow(k, v) {
    return React.createElement("div", { className: "we-stat" },
      React.createElement("span", { className: "k" }, k),
      React.createElement("span", { className: "v" }, v));
  }
  function wxItem(kind, val, label) {
    return React.createElement("div", { className: "we-wx-item" },
      WxGlyph(kind),
      React.createElement("div", { className: "we-wx-val" }, val),
      React.createElement("div", { className: "we-wx-lab" }, label));
  }
  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, away) {
      return React.createElement("tr", { className: away ? "away" : "home" },
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i }, n)),
        React.createElement("td", { className: "rhe sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e));
    }
    return React.createElement("table", { className: "we-line" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E"))),
      React.createElement("tbody", null,
        row(box.away, true),
        row(box.home, false)));
  }

  window.WrigleyEditorial = Spread;
})();
