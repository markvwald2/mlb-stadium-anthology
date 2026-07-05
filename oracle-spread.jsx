/* oracle-spread.jsx — Oracle Park anthology spread. "The Bay as Architecture."
   Reads window.ORACLE. Warm charcoal rules, warm off-white paper, faded Giants
   orange + bay blue-green accents. Right-page grid organized by a quiet
   bay-edge datum curve; a San Francisco Bay water band closes the page. */
(function () {
  const D = window.ORACLE;
  const FieldDiagram = window.OracleProtractor;
  const Shoreline = window.OracleShoreline;
  const e = React.createElement;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", maxdim: props.maxdim || 1200 });
  }

  /* ---- logos (right page, top-right corner) ---- */
  function LogoWell(props) {
    if (props.kind === "mlb") {
      return e("img", { className: "op-well-img mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" });
    } else if (props.kind === "league") {
      return e("img", { className: "op-well-img nl", src: "assets/nl-logo.png", alt: "National League" });
    }
    return e("img", { className: "op-well-img giants", src: "assets/giants-logo.svg", alt: "San Francisco Giants" });
  }

  /* ---- weather icon (partly cloudy) ---- */
  function WxPartly() {
    return e("svg", { className: "op-wx-ico", width: "60", height: "48", viewBox: "0 0 60 48", fill: "none", stroke: "#514C44", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" },
      e("circle", { cx: "21", cy: "16", r: "7.5" }),
      e("g", { opacity: "0.9" },
        e("line", { x1: "21", y1: "3", x2: "21", y2: "6.5" }),
        e("line", { x1: "33", y1: "16", x2: "29.5", y2: "16" }),
        e("line", { x1: "12.5", y1: "7.5", x2: "15", y2: "10" }),
        e("line", { x1: "29.5", y1: "7.5", x2: "27", y2: "10" })),
      e("path", { d: "M27 38a8.5 8.5 0 0 1 .9-16.95 11 11 0 0 1 21 3.1A7 7 0 0 1 48 38z", fill: "#F1ECDF" }));
  }
  function WxRowIcon(kind) {
    const c = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "#514C44", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", className: "op-wxr-ico" };
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      e("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      e("path", { d: "M3 12h7" }));
    if (kind === "humidity") return e("svg", c,
      e("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  /* ---- San Francisco Bay water band + compass rose (bottom, full bleed) ---- */
  function CompassRose() {
    return e("svg", { className: "op-compass", width: "56", height: "56", viewBox: "0 0 56 56", fill: "none", "aria-hidden": "true" },
      e("circle", { cx: "28", cy: "28", r: "22", stroke: "#E7E1D2", strokeWidth: "1", opacity: "0.7" }),
      e("circle", { cx: "28", cy: "28", r: "16", stroke: "#E7E1D2", strokeWidth: "0.7", opacity: "0.45" }),
      e("path", { d: "M28 4 L31.4 26.6 L28 28 L24.6 26.6 Z", fill: "#E7E1D2", opacity: "0.92" }),
      e("path", { d: "M28 52 L24.6 29.4 L28 28 L31.4 29.4 Z", fill: "#BC6233", opacity: "0.85" }),
      e("path", { d: "M4 28 L26.6 24.6 L28 28 L26.6 31.4 Z", fill: "#E7E1D2", opacity: "0.55" }),
      e("path", { d: "M52 28 L29.4 31.4 L28 28 L29.4 24.6 Z", fill: "#E7E1D2", opacity: "0.55" }),
      e("text", { x: "28", y: "17.5", textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontSize: "7px", fill: "#E7E1D2", letterSpacing: ".05em" } }, "N"));
  }
  function WaterBand() {
    return e("div", { className: "op-water", "aria-hidden": "true" },
      e("svg", { className: "op-water-lines", viewBox: "0 0 1275 46", preserveAspectRatio: "none" },
        e("path", { d: "M0 14 C 220 6 380 22 620 14 C 880 6 1040 22 1275 12", fill: "none", stroke: "#E7E1D2", strokeWidth: "0.8", opacity: "0.3" }),
        e("path", { d: "M0 30 C 260 22 420 38 700 30 C 960 22 1120 38 1275 28", fill: "none", stroke: "#E7E1D2", strokeWidth: "0.8", opacity: "0.22" })));
  }

  function Spread() {
    const _c2 = (D.context[2] || "").split(/(?<=\.)\s+/);
    const c2a = _c2.slice(0, 1).join(" ");
    const c2b = _c2.slice(1).join(" ");
    return (
      e("div", { className: "op-spread", "data-screen-label": "Oracle Park spread" },

        /* ===================== LEFT PAGE / HERO ===================== */
        e("div", { className: "op-page op-left", "data-screen-label": "Oracle Park hero" },
          e("div", { className: "op-hero-slot" },
            e(Slot, { id: "oracle-hero", maxdim: 4243, placeholder: "Drop the Oracle Park aerial \u2014 ballpark + McCovey Cove + bay + city skyline" })),
          e("div", { className: "op-hero-scrim" }),
          e("div", { className: "op-hero-folio" }, "Retro Classic \u00b7 Waterfront ballpark"),

          /* small waterfront orientation cue (over the water, clear of gutter) */
          e("div", { className: "op-hero-coord" },
            e("svg", { width: "30", height: "30", viewBox: "0 0 30 30", fill: "none", stroke: "rgba(233,228,216,.75)", strokeWidth: "1" },
              e("circle", { cx: "15", cy: "15", r: "11" }),
              e("path", { d: "M15 4 L15 26 M4 15 L26 15", strokeWidth: "0.7", opacity: "0.6" }),
              e("path", { d: "M24 12 L26 15 L24 18", strokeWidth: "1.1" })),
            e("div", { className: "op-hero-coord-txt" },
              e("span", null, "E \u00b7 85\u00b0"),
              e("span", { className: "ll" }, D.coordinates_n),
              e("span", { className: "ll" }, D.coordinates_w))),

          e("div", { className: "op-hero-title" },
            e("h1", { className: "op-hero-name" }, "ORACLE PARK"),
            e("div", { className: "op-hero-loc" },
              e("span", { className: "bar" }),
              e("span", { className: "txt" }, "San Francisco, California"))),

          e("div", { className: "op-hero-foot" },
            e("span", null, D.address),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "Elevation ", e("em", { className: "hl" }, D.elevation)),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "Opened ", e("em", { className: "hl" }, "2000")))
        ),

        /* ===================== RIGHT PAGE ===================== */
        e("div", { className: "op-page op-right" },
          e(Shoreline, null),
          FieldDiagram ? e("figure", { className: "op-ctx-fig" },
            e(FieldDiagram, {
              lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
              orientation: D.field.orientation, degrees: D.field.orientation_degrees
            })) : null,
          e("div", { className: "op-rp" },

            /* --- top: stadium section header + logo wells --- */
            e("div", { className: "op-tophead" },
              e("div", { className: "op-tophead-left" },
                e("div", { className: "op-sect" },
                  e("span", { className: "tri" }),
                  e("span", { className: "t" }, "Stadium Section")),
                /* --- identity line --- */
                e("div", { className: "op-idline" },
                  e("span", { className: "team" }, D.team_name),
                  idDot(), e("span", null, D.league + " West"),
                  idDot(), e("span", null, "Open-Air Ballpark"),
                  idDot(), e("span", null, D.years_active),
                  idDot(), e("span", { className: "vo" }, "Visit " + D.visit_order + " of " + D.visit_total))),
              e("div", { className: "op-wells" },
                e(LogoWell, { kind: "team", cap: "San Francisco Giants" }),
                e(LogoWell, { kind: "mlb", cap: "Major League Baseball" }),
                e(LogoWell, { kind: "league", cap: "National League" }))),

            /* --- stadium grid --- */
            e("div", { className: "op-stadium" },

              /* LEFT: facts + classification chips */
              e("div", { className: "op-col-facts" },
                e("div", { className: "op-modh" }, "Stadium Facts"),
                e("div", { className: "op-table" },
                  D.facts.map((f, i) => factRow(f[0], f[1], i))),
                e("div", { className: "op-chips" },
                  D.chips.map((c, i) => chip(c[0], c[1], i)))),

              /* RIGHT: photos + (context | field) */
              e("div", { className: "op-col-main" },
                e("div", { className: "op-photos" },
                  e("div", { className: "op-pcard", "data-slot": "oracle-p1" },
                    e(Slot, { id: "oracle-p1", placeholder: "Brick + steel facade \u2014 exterior" })),
                  e("div", { className: "op-pcard", "data-slot": "oracle-p2" },
                    e(Slot, { id: "oracle-p2", placeholder: "Field + waterfront \u2014 interior" })),
                  e("div", { className: "op-pcard", "data-slot": "oracle-p4" },
                    e(Slot, { id: "oracle-p4", placeholder: "Portwalk \u2014 waterfront promenade" }))),
                e("div", { className: "op-ctxrow" },
                  e("div", { className: "op-context" },
                    e("div", { className: "op-modh" }, "The Bay as Architecture"),
                    e("div", { className: "op-ctx" },
                      e("div", { className: "op-ctx-col1" },
                        e("p", null, D.context[0]),
                        e("p", null, D.context[1])),
                      e("div", { className: "op-ctx-rest" },
                        e("div", { className: "op-ctx-figgap", "aria-hidden": "true" }),
                        e("p", null, D.context[2]),
                        e("p", null, D.context[3]))
                    )
                  )))),

            /* --- visit section --- */
            e("div", { className: "op-visit" },
              e("div", { className: "op-sect bar" },
                e("span", { className: "tri" }),
                e("span", { className: "t" }, "Visit Section")),
              e("div", { className: "op-vgrid" },

                /* game facts */
                e("div", { className: "op-vgame" },
                  e("div", { className: "op-modh sm" }, "Game Facts"),
                  e("div", { className: "op-gtable" },
                    grow("Visit", e(React.Fragment, null, e("span", { style: { fontWeight: 700, color: "var(--orange-deep)" } }, D.visit_order + " of " + D.visit_total), " \u00b7 " + D.trip_name)),
                    grow("Date / Time", D.featured_day + " \u00b7 " + D.featured_date + " \u00b7 " + D.first_pitch),
                    grow("Matchup", D.away_team + " at " + D.home_team),
                    growStrong("Result", D.result_line),
                    grow("Pitching", D.starter_away + " (" + D.away_abbr + ") vs " + D.starter_home + " (" + D.home_abbr + ")"),
                    grow("Attendance", D.attendance),
                    grow("Game Time", D.game_duration))),

                /* weather */
                e("div", { className: "op-vwx" },
                  e("div", { className: "op-modh sm" }, "Weather"),
                  e("div", { className: "op-wxmain" },
                    e(WxPartly, null),
                    e("div", { className: "op-wxtemp" },
                      e("span", { className: "deg" }, D.weather.temperature),
                      e("span", { className: "cond" }, D.weather.conditions))),
                  e("div", { className: "op-wxrows" },
                    wxRow("Wind", D.weather.wind, "wind"),
                    wxRow("Humidity", D.weather.humidity, "humidity"))),

                /* line score */
                e("div", { className: "op-vscore" },
                  e("div", { className: "op-modh sm" }, "Line Score"),
                  BoxScore(D.box),
                  e("div", { className: "op-decisions" },
                    decItem("W", D.winning_pitcher),
                    decItem("L", D.losing_pitcher),
                    decItem("S", D.save_pitcher))),

                /* visit photo — single image-slot; size via .op-vphoto .op-pcard */
                e("div", { className: "op-vphoto" },
                  e("div", { className: "op-pcard", "data-slot": "oracle-p3" },
                    e(Slot, { id: "oracle-p3", placeholder: "Game day \u2014 McCovey Cove" })))
              )),

            /* --- ballpark notes band --- */
            e("div", { className: "op-notes" },
              e("div", { className: "op-sect bar slim" },
                e("span", { className: "tri" }),
                e("span", { className: "t" }, "Ballpark Notes")),
              e("div", { className: "op-ngrid" },
                noteCell("Elevation", D.elevation),
                noteCell("Coordinates", (D.coordinates_n + " / " + D.coordinates_w).replace(/\u00b0\s+/g, "\u00b0"), "coord"),
                noteCell("Orientation", D.field.orientation + " / " + D.field.orientation_degrees + "\u00b0"),
                noteCell("Construction Start", D.construction_start),
                noteCostCell(),
                noteCell("Financing", D.financing_method, "wide"),
                noteAddrCell()))
          ),
          e(WaterBand, null)
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function idDot() { return e("span", { className: "iddot" }, "\u00b7"); }
  function factRow(k, v, i) {
    return e("div", { className: "row", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function chip(k, v, i) {
    return e("div", { className: "op-chip", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function grow(k, v) {
    return e("div", { className: "grow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function growStrong(k, v) {
    return e("div", { className: "grow strong" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function decItem(k, v) {
    return e("div", { className: "d" },
      e("span", { className: "dk" }, k),
      e("span", { className: "dv" }, v));
  }
  function wxRow(k, v, kind) {
    return e("div", { className: "op-wxr" },
      WxRowIcon(kind),
      e("div", { className: "op-wxr-txt" },
        e("span", { className: "k" }, k),
        e("span", { className: "v" }, v)));
  }
  function noteCell(k, v, cls) {
    return e("div", { className: "nc " + (cls || "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function noteCostCell() {
    return e("div", { className: "nc cost" },
      e("div", { className: "k" }, "Cost"),
      e("div", { className: "v big" }, D.stadium_cost),
      e("div", { className: "v adj" }, D.stadium_cost_adjusted + " adj."));
  }
  function noteAddrCell() {
    const a = D.address.split(", ");
    return e("div", { className: "nc" },
      e("div", { className: "k" }, "Address"),
      e("div", { className: "v" }, a[0], e("br", null), a.slice(1).join(", ")));
  }
  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t, win, away) {
      return e("tr", { className: (win ? "win " : "") + (away ? "awayrow" : "") },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "op-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null,
        tr(box.away, box.away.r > box.home.r, true),
        tr(box.home, box.home.r > box.away.r, false)));
  }

  window.OracleSpread = Spread;
})();
