/* pnc-spread.jsx — PNC Park anthology spread. "Baseball framed by bridges."
   Reads window.PNC. Charcoal rules, warm off-white paper, Pirates gold accents. */
(function () {
  const D = window.PNC;
  const FieldDiagram = window.PNCProtractor;

  function Slot(props) {
    return React.createElement("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", maxdim: props.maxdim });
  }

  /* Pirates wordmark — gold "P" mark. */
  function PMark(props) {
    return React.createElement("img", { className: "pnc-pmark " + (props.tone || ""), src: "assets/pirates-p.svg", alt: "Pittsburgh Pirates" });
  }

  /* Compact field plan — schematic, hand-drawn architectural annotation. */
  function FieldPlan() {
    const VB = 200, cx = 100, cy = 104, deg = -22; // tilt toward ESE feel
    const grass = "#5C7E50", grassHi = "#6B8C5C", clay = "#BC9258", chalk = "#EDE7D6", line = "#36492F";
    const home = [100, 168], lf = [30, 96], rf = [170, 96], cf = [100, 40];
    const grassPath = "M 100 168 L 30 96 A 78 78 0 0 1 170 96 Z";
    const dia = "M 100 168 L 132 136 L 100 104 L 68 136 Z";
    const bases = [[132, 136], [100, 104], [68, 136]];
    return React.createElement("svg", { viewBox: "0 0 " + VB + " " + VB, className: "pnc-fp-svg", role: "img", "aria-label": "PNC Park field plan, oriented ESE" },
      React.createElement("defs", null,
        React.createElement("linearGradient", { id: "pncGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
          React.createElement("stop", { offset: "0", stopColor: grassHi }),
          React.createElement("stop", { offset: "1", stopColor: grass }))),
      React.createElement("g", { transform: "rotate(" + deg + " " + cx + " " + cy + ")" },
        React.createElement("path", { d: grassPath, fill: "url(#pncGrass)", stroke: line, strokeWidth: 1.5, strokeLinejoin: "round" }),
        // mowing arcs
        React.createElement("path", { d: "M 100 168 L 46 112 A 56 56 0 0 1 154 112 Z", fill: "none", stroke: "#67885A", strokeWidth: 1, opacity: 0.6 }),
        React.createElement("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: chalk, strokeWidth: 1.4, opacity: 0.92 }),
        React.createElement("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: chalk, strokeWidth: 1.4, opacity: 0.92 }),
        React.createElement("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.5, strokeLinejoin: "round" }),
        React.createElement("circle", { cx: 100, cy: 142, r: 4, fill: clay, stroke: chalk, strokeWidth: 0.9 }),
        bases.map((b, i) => React.createElement("rect", { key: i, x: b[0] - 2.6, y: b[1] - 2.6, width: 5.2, height: 5.2, fill: chalk, transform: "rotate(45 " + b[0] + " " + b[1] + ")" })),
        React.createElement("rect", { x: home[0] - 3, y: home[1] - 3, width: 6, height: 6, fill: chalk, transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
      )
    );
  }

  /* Weather glyphs — fine line-art. */
  function WxIcon(kind) {
    const c = { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", stroke: "#555046", strokeWidth: 1.05, strokeLinecap: "round", strokeLinejoin: "round", className: "pnc-wx-ico" };
    if (kind === "drizzle") return React.createElement("svg", c,
      React.createElement("path", { d: "M7 15a4 4 0 0 1 .4-7.98 5.5 5.5 0 0 1 10.6 1.48A3.5 3.5 0 0 1 17.5 15z" }),
      React.createElement("path", { d: "M8 18.5l-1 2M12 18.5l-1 2M16 18.5l-1 2" }));
    return null;
  }

  /* Small line-art glyphs for the wind/humidity rows (dark on paper). */
  function WxRowIcon(kind) {
    const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#555046", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className: "pnc-wxr-ico" };
    if (kind === "wind") return React.createElement("svg", c,
      React.createElement("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      React.createElement("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      React.createElement("path", { d: "M3 12h7" }));
    if (kind === "humidity") return React.createElement("svg", c,
      React.createElement("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  function Spread() {
    return (
      React.createElement("div", { className: "pnc-spread", "data-screen-label": "PNC Park spread" },

        /* ===================== LEFT PAGE / HERO ===================== */
        React.createElement("div", { className: "pnc-page pnc-left", "data-screen-label": "PNC Park hero" },
          React.createElement("div", { className: "pnc-hero-slot" },
            React.createElement(Slot, { id: "pnc-hero", maxdim: 4000, placeholder: "Drop the PNC Park aerial \u2014 skyline + Clemente Bridge + river + bowl" })),
          React.createElement("div", { className: "pnc-hero-scrim" }),
          React.createElement("div", { className: "pnc-hero-folio" }, "Retro Classic ballpark"),

          React.createElement("div", { className: "pnc-hero-title" },
            React.createElement("div", { className: "pnc-hero-frame" },
              React.createElement("h1", { className: "pnc-hero-name" },
                React.createElement("span", null, "PNC"),
                React.createElement("span", { className: "two" }, "PARK"))),
            React.createElement("div", { className: "pnc-hero-loc" },
              React.createElement("span", { className: "dot" }),
              React.createElement("span", { className: "txt" }, "Pittsburgh, Pennsylvania"))
          ),

          /* metadata strip */
          React.createElement("div", { className: "pnc-meta" },
            React.createElement("div", { className: "cell brand" },
              React.createElement(PMark, { tone: "gold" })),
            metaCell("Est.", "2001"),
            metaCell("Configuration", "Open Air"),
            metaCell("Use", "Baseball Only"),
            React.createElement("div", { className: "cell logos" },
              React.createElement("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
              React.createElement("img", { className: "nl-logo", src: "assets/nl-logo.png", alt: "National League" }))
          ),
          React.createElement("div", { className: "pnc-addr" },
            React.createElement("span", null, D.address),
            React.createElement("span", { className: "dot" }, "\u00b7"),
            React.createElement("span", null, D.coordinates_n + ", " + D.coordinates_w),
            React.createElement("span", { className: "dot" }, "\u00b7"),
            React.createElement("span", null, "Elevation ", React.createElement("em", { className: "hl" }, D.elevation)))
        ),

        /* ===================== RIGHT PAGE ===================== */
        React.createElement("div", { className: "pnc-page pnc-right" },
          React.createElement("div", { className: "pnc-rp" },

            /* --- STADIUM SECTION header --- */
            React.createElement("div", { className: "pnc-bar" },
              React.createElement("span", { className: "t" }, "Stadium Section"),
              React.createElement("span", { className: "ix" }, "I")),

            /* --- photo strip --- */
            React.createElement("div", { className: "pnc-photos" },
              photoCard("pnc-p1", "Exterior", "View"),
              photoCard("pnc-p2", "Ballpark", "View"),
              photoCard("pnc-p3", "Scoreboard", "View"),
              photoCard("pnc-p4", "Concourse", "View"),
              photoCard("pnc-p5", "Downtown", "View")),

            /* --- identity ribbon --- */
            React.createElement("div", { className: "pnc-ribbon" },
              React.createElement("div", { className: "rc logo" },
                React.createElement(PMark, { tone: "dark" })),
              React.createElement("div", { className: "rc team" },
                React.createElement("div", { className: "k" }, "Team"),
                React.createElement("div", { className: "v" }, D.team_name)),
              ribCell("Division", D.division),
              ribCell("Classification", D.classification_era),
              ribCell("Years Active", D.years_active),
              ribCell("Visit Order", D.visit_order + " of 42"),
              ribCell("Status", D.status)),

            /* --- body grid --- */
            React.createElement("div", { className: "pnc-body" },

              /* LEFT COLUMN — facts + ballpark details */
              React.createElement("div", { className: "pnc-colL" },
                React.createElement("div", { className: "pnc-mod facts" },
                  React.createElement("div", { className: "pnc-modh" }, "Stadium Facts"),
                  React.createElement("div", { className: "pnc-table" },
                    D.facts.map((f, i) => factRow(f[0], f[1], i)))),

                React.createElement("div", { className: "pnc-mod details" },
                  React.createElement("div", { className: "pnc-modh" }, "Ballpark Details"),
                  React.createElement("figure", { className: "pnc-fp" },
                    FieldDiagram ? React.createElement(FieldDiagram, {
                      lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                      orientation: D.field.orientation, degrees: D.field.orientation_degrees, accent: "#C29433"
                    }) : null))),

              /* RIGHT COLUMN — context + visit */
              React.createElement("div", { className: "pnc-colR" },
                React.createElement("div", { className: "pnc-mod context" },
                  React.createElement("div", { className: "pnc-modh" }, "Stadium Context"),
                  React.createElement("div", { className: "pnc-ctx" },
                    D.context.map((p, i) => React.createElement("p", { key: i }, p)))),

                React.createElement("div", { className: "pnc-visit" },
                  React.createElement("div", { className: "pnc-bar" },
                    React.createElement("span", { className: "t" }, "Visit Section"),
                    React.createElement("span", { className: "ix" }, "II")),
                  React.createElement("div", { className: "pnc-vgrid" },

                    /* featured game */
                    React.createElement("div", { className: "pnc-vgame" },
                      React.createElement("div", { className: "eyebrow" }, D.trip_name + " Trip"),
                      React.createElement("div", { className: "match" },
                        React.createElement("span", { className: "away" }, D.away_abbr),
                        React.createElement("span", { className: "at" }, "AT"),
                        React.createElement("span", { className: "home" }, D.home_abbr)),
                      React.createElement("div", { className: "gdate" }, D.featured_day + " · " + D.featured_date),
                      React.createElement("div", { className: "gresult" }, D.result_line),
                      React.createElement("div", { className: "gmeta" },
                        gstat("Attendance", D.attendance),
                        gstat("First Pitch", D.first_pitch))),

                    /* line score + decisions */
                    React.createElement("div", { className: "pnc-vscore" },
                      BoxScore(D.box),
                      React.createElement("div", { className: "pnc-dec sub matchup" },
                        decItem(D.away_abbr, D.starter_away),
                        React.createElement("span", { className: "vs" }, "vs"),
                        decItem(D.home_abbr, D.starter_home)),
                      React.createElement("div", { className: "pnc-dec" },
                        decItem("W", D.winning_pitcher),
                        decItem("L", D.losing_pitcher)),
                      React.createElement("div", { className: "pnc-dec sub" },
                        decItem("Time of Game", D.time_of_game))),

                    /* weather */
                    React.createElement("div", { className: "pnc-wx" },
                      React.createElement("div", { className: "wxh" }, "Weather"),
                      React.createElement("div", { className: "wxmain" },
                        WxIcon("drizzle"),
                        React.createElement("div", { className: "wxtemp" },
                          React.createElement("span", { className: "deg" }, D.weather.temperature),
                          React.createElement("span", { className: "cond" }, D.weather.conditions))),
                      React.createElement("div", { className: "wxrows" },
                        wxRow("Wind", D.weather.wind, "wind"),
                        wxRow("Humidity", D.weather.humidity, "humidity")))
                  ))
              )
            ),

            /* --- construction & finance band --- */
            React.createElement("div", { className: "pnc-finance" },
              React.createElement("div", { className: "pnc-bar" },
                React.createElement("span", { className: "t" }, "Construction & Finance"),
                React.createElement("span", { className: "ix" }, "III")),
              React.createElement("div", { className: "pnc-fgrid" },
                finCell("Architectural Style", D.architectural_style, "wide"),
                finCell("Facade Material", D.facade_material, "wide"),
                React.createElement("div", { className: "fc cost" },
                  React.createElement("div", { className: "k" }, "Stadium Cost"),
                  React.createElement("div", { className: "v big" }, D.stadium_cost),
                  React.createElement("div", { className: "v adj" }, D.stadium_cost_adjusted + " adj.")),
                finCell("Financing Method", D.financing_method, "wide")))
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function metaCell(k, v) {
    return React.createElement("div", { className: "cell" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function photoCard(id, l1, l2) {
    return React.createElement("div", { className: "pnc-pcard", "data-slot": id },
      React.createElement("image-slot", { id: id, class: "pnc-pslot", shape: "rect", placeholder: l1 + " " + l2 }));
  }
  function ribCell(k, v) {
    return React.createElement("div", { className: "rc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function finCell(k, v, cls) {
    return React.createElement("div", { className: "fc " + (cls || "") },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function factRow(k, v, i) {
    return React.createElement("div", { className: "row", key: i },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function dimRow(k, v) {
    return React.createElement("div", { className: "drow" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function gstat(k, v) {
    return React.createElement("div", { className: "gs" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function decItem(k, v) {
    return React.createElement("div", { className: "di" },
      React.createElement("span", { className: "k" }, k),
      React.createElement("span", { className: "v" }, v));
  }
  function wxRow(k, v, kind) {
    return React.createElement("div", { className: "wxr" },
      WxRowIcon(kind),
      React.createElement("div", { className: "wxr-txt" },
        React.createElement("span", { className: "k" }, k),
        React.createElement("span", { className: "v" }, v)));
  }
  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t, win) {
      return React.createElement("tr", { className: win ? "win" : "" },
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i }, n)),
        React.createElement("td", { className: "rhe sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e));
    }
    return React.createElement("table", { className: "pnc-box" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E"))),
      React.createElement("tbody", null,
        tr(box.away, box.away.r > box.home.r),
        tr(box.home, box.home.r > box.away.r)));
  }

  window.PNCSpread = Spread;
})();
