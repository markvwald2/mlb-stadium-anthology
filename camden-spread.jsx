/* camden-spread.jsx — Oriole Park at Camden Yards anthology spread.
   Concept: "The Warehouse Datum." A continuous horizontal datum (the metadata
   ribbon + a green-steel spine) governs the alignment of every right-page
   module the way the stadium locks onto the B&O Warehouse. Reads window.CAMDEN,
   window.CamdenField. Warm paper / charcoal / brick / weathered green steel;
   orange + black are restrained accents only. */
(function () {
  const e = React.createElement;
  const D = window.CAMDEN;
  const Prot = window.CamdenProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" });
  }

  /* warehouse / factory glyph (sawtooth roof) — architectural data marker */
  function Warehouse(props) {
    const s = props.size || 26, c = props.color || "#2E4537";
    return e("svg", { width: s, height: s, viewBox: "0 0 28 28", fill: "none", stroke: c, strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round", "aria-hidden": "true" },
      e("path", { d: "M3 23V11l4-3 4 3 4-3 4 3 4-3 0 15" }),
      e("path", { d: "M3 23h22" }),
      e("path", { d: "M6 23v-5h4v5M14 23v-5h4v5" }));
  }

  /* weather glyphs — fine line-art on paper */
  function wxIcon(kind) {
    const c = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "#574F3F", strokeWidth: 1.35, strokeLinecap: "round", strokeLinejoin: "round", className: "cy-wx-ico" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "sun") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function factRow(k, v, i) {
    return e("div", { className: "cy-row", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function ribCell(k, v, extra) {
    return e("div", { className: "cy-rc" + (extra ? " " + extra : "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function finCell(k, v, cls) {
    return e("div", { className: "cy-fc " + (cls || "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function gstat(k, v) {
    return e("div", { className: "cy-gs" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function wx(icon, val, lab) {
    return e("div", { className: "cy-wx" },
      wxIcon(icon),
      e("div", { className: "val" }, val),
      e("div", { className: "lab" }, lab));
  }
  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "cy-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function photoCard(id, ph) {
    return e("div", { className: "cy-pcard" },
      e(Slot, { id: id, placeholder: ph }));
  }

  function Spread() {
    return e("div", { className: "cy-spread", "data-screen-label": "Oriole Park at Camden Yards spread" },

      /* ===================== LEFT PAGE / HERO ===================== */
      e("div", { className: "cy-page cy-left", "data-screen-label": "Camden Yards hero" },
        e("div", { className: "cy-hero-slot" },
          e(Slot, { id: "camden-hero", placeholder: "Drop the Camden Yards aerial \u2014 stadium bowl, B&O Warehouse edge, downtown Baltimore + harbor" })),
        e("div", { className: "cy-hero-scrim" }),
        e("div", { className: "cy-hero-grid", "aria-hidden": "true" }),

        /* drafting registration bracket + folio (top-left) */
        e("div", { className: "cy-bracket tl", "aria-hidden": "true" }),
        e("div", { className: "cy-hero-folio" },
          e("span", { className: "tick" }), e("span", null, D.folio)),

        /* freight nameplate title block (lower-left) */
        e("div", { className: "cy-hero-plate" },
          e("span", { className: "bolt tl" }), e("span", { className: "bolt tr" }),
          e("span", { className: "bolt bl" }), e("span", { className: "bolt br" }),
          e("h1", { className: "cy-hero-name" },
            e("span", { className: "l1" }, "Oriole Park"),
            e("span", { className: "l2" }, "at Camden Yards")),
          e("div", { className: "cy-hero-rule" }),
          e("div", { className: "cy-hero-sub" },
            e("span", { className: "city" }, D.city + ", " + D.state),
            e("span", { className: "mk" }, "B&O"))),

        /* hero footer — marks + colophon */
        e("div", { className: "cy-hero-marks" },
          e("img", { className: "cap", src: "assets/baltimore-orioles-logo.svg", alt: "Baltimore Orioles" }),
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
        e("div", { className: "cy-hero-colophon" },
          e("span", null, D.address),
          e("span", { className: "dot" }, "\u25AA"),
          e("span", null, D.coordinates_n + ", " + D.coordinates_w),
          e("span", { className: "dot" }, "\u25AA"),
          e("span", null, "Elev. ", e("em", { className: "hl" }, D.elevation)))
      ),

      /* ===================== RIGHT PAGE ===================== */
      e("div", { className: "cy-page cy-right" },
        e("div", { className: "cy-rp" },

          /* --- photo strip (warehouse bays) --- */
          e("div", { className: "cy-photos" },
            photoCard("camden-p1", "B&O Warehouse facade / exterior"),
            photoCard("camden-p2", "Seating bowl + field"),
            photoCard("camden-p3", "Scoreboard"),
            photoCard("camden-p4", "Warehouse concourse"),
            photoCard("camden-p5", "Aerial / downtown")),

          /* --- metadata datum ribbon (THE WAREHOUSE DATUM SPINE) --- */
          e("div", { className: "cy-ribbon" },
            e("div", { className: "cy-rc brand" },
              e("img", { className: "cap", src: "assets/baltimore-orioles-logo.svg", alt: "Baltimore Orioles" }),
              e("div", { className: "id" },
                e("div", { className: "team" }, D.team_name),
                e("div", { className: "sub" }, D.league),
                e("div", { className: "sub" }, D.division))),
            e("div", { className: "cy-rc" },
              e("div", { className: "k" }, "Classification"),
              e("div", { className: "v" }, D.classification_era)),
            ribCell("Years Active", D.years_active),
            e("div", { className: "cy-rc" },
              e("div", { className: "k" }, "Current Capacity"),
              e("div", { className: "v big" }, D.capacity_current)),
            e("div", { className: "cy-rc vo" },
              e("div", { className: "k" }, "Visit Order"),
              e("div", { className: "v big" }, D.visit_order + " of " + D.visit_total))),

          /* --- two zones hung from the datum --- */
          e("div", { className: "cy-body" },

            /* ===== STADIUM SECTION (left zone) ===== */
            e("div", { className: "cy-zone stadium" },
              e("div", { className: "cy-zoneh" },
                e("span", { className: "num" }, "I"),
                e("span", { className: "t" }, "Stadium Section")),

              e("div", { className: "cy-stadium-cols" },
                e("div", { className: "cy-facts" },
                  e("div", { className: "cy-modh" }, "Stadium Facts"),
                  e("div", { className: "cy-table" },
                    D.facts.map((f, i) => factRow(f[0], f[1], i)),
                    factRow("Style", D.architectural_style, "style"),
                    factRow("Facade", D.facade_material, "facade"),
                    factRow("Renovations", D.renovations, "renos")),

                  /* field plan (protractor) hung in the open space below the facts */
                  e("figure", { className: "cy-fieldplan" },
                    e("figcaption", { className: "cy-modh sm" }, "Field Plan"),
                    Prot ? e(Prot, {
                      lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                      orientation: D.field.orientation, bearing: D.field.bearing
                    }) : null,
                    e("div", { className: "cy-fp-cap" },
                      e("span", null, "Orientation " + D.field.orientation + " \u00b7 " + D.field.bearing + "\u00b0"),
                      e("span", null, "LF \u00b7 CF \u00b7 RF (ft)")))),

                e("div", { className: "cy-ctx-block" },
                  e("div", { className: "cy-modh" }, "The Warehouse Wall"),
                  e("div", { className: "cy-ctx" },
                    D.context.map((p, i) => e("p", { key: i }, p)))))),

            /* ===== VISIT SECTION (right zone, distinct panel) ===== */
            e("div", { className: "cy-zone visit" },
              e("div", { className: "cy-zoneh on-panel" },
                e("span", { className: "num" }, "II"),
                e("span", { className: "t" }, "Visit Section")),

              e("div", { className: "cy-game" },
                e("div", { className: "eyebrow" }, D.trip_name + " Trip \u00b7 " + D.featured_day + ", " + D.featured_date),
                e("div", { className: "match" },
                  e("div", { className: "tcol" },
                    e("img", { src: "assets/tampa-bay-rays-logo.svg", alt: D.away_team }),
                    e("span", { className: "code away" }, D.away_abbr)),
                  e("span", { className: "at" }, "AT"),
                  e("div", { className: "tcol" },
                    e("img", { src: "assets/baltimore-orioles-logo.svg", alt: D.home_team }),
                    e("span", { className: "code home" }, D.home_abbr))),
                e("div", { className: "result" }, D.result_line),
                e("div", { className: "gmeta" },
                  gstat("Attendance", D.attendance),
                  gstat("First Pitch", D.first_pitch),
                  gstat("Duration", D.game_duration))),

              e("div", { className: "cy-score" },
                e("div", { className: "cy-modh sm" }, "Line Score \u00b7 " + D.box.innings + " Innings"),
                LineScore(D.box)),

              e("div", { className: "cy-pitch" },
                e("div", { className: "pr" },
                  e("span", { className: "k" }, "Pitching Matchup"),
                  e("span", { className: "v" }, D.matchup_line)),
                e("div", { className: "pr" },
                  e("span", { className: "k" }, "Pitching Results"),
                  e("span", { className: "v" }, D.decisions_line))),

              e("div", { className: "cy-weather" },
                wx("temp", D.weather.temperature, "Temp"),
                wx("sun", D.weather.conditions, "Sky"),
                wx("wind", D.weather.wind, "Wind"),
                wx("drop", D.weather.humidity, "Humidity")))
          ),

          /* --- construction & finance datum (footer band) --- */
          e("div", { className: "cy-finance" },
            finCell("Opened", D.opening_day),
            finCell("Construction Started", D.construction_start),
            e("div", { className: "cy-fc cost" },
              e("div", { className: "k" }, "Cost"),
              e("div", { className: "v big" }, D.stadium_cost),
              e("div", { className: "v adj" }, D.stadium_cost_adjusted + " adjusted")),
            finCell("Financing", D.financing_method, "wide"),
            e("div", { className: "cy-fc marks" },
              e("img", { className: "league", src: "assets/american-league-logo.png", alt: "American League" }),
              e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })))
        )
      )
    );
  }

  window.CamdenSpread = Spread;
})();
