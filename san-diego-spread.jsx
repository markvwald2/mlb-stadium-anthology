/* san-diego-spread.jsx — "The Civic Machine in the Valley".
   San Diego Stadium as Mission Valley infrastructure, with baseball operating as
   one tenant inside a larger multipurpose container. Reads window.SANDIEGO +
   window.SanDiegoProtractor. Right page is organized by a sweeping radial-arc
   system and a dominant vertical concrete data well (the circulation tower).
   Every populated field rendered once; no fabricated facts. */
(function () {
  const e = React.createElement;
  const D = window.SANDIEGO;
  const Protractor = window.SanDiegoProtractor;
  const C = D.colors;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" });
  }

  /* sweeping radial-arc system — the bowl / circulation geometry, anchored
     off the upper-left of the right page and sweeping down across the page. */
  function ArcSystem(props) {
    const stroke = props.stroke || "#6E6A5E";
    const op = props.op || 0.1;
    const cx = props.cx, cy = props.cy, rs = props.radii;
    return e("svg", { viewBox: "0 0 1275 1088", className: props.className, "aria-hidden": "true", preserveAspectRatio: "none" },
      rs.map((r, i) => e("circle", { key: i, cx: cx, cy: cy, r: r, fill: "none", stroke: stroke, strokeWidth: i === 0 ? 1.6 : 1, opacity: op })),
      Array.from({ length: 13 }).map((_, i) => {
        const a = (-0.12 + (i / 12) * 1.1) * Math.PI;
        const r0 = rs[0], r1 = rs[rs.length - 1];
        return e("line", { key: "s" + i,
          x1: cx + r1 * Math.cos(a), y1: cy + r1 * Math.sin(a),
          x2: cx + r0 * Math.cos(a), y2: cy + r0 * Math.sin(a),
          stroke: stroke, strokeWidth: 0.6, opacity: op * 0.7 });
      })
    );
  }

  function WxIcon(kind) {
    const c = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "#E7E0D0", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", className: "ico" };
    if (kind === "sun") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function factRow(k, v) {
    return e("div", { className: "row" }, e("div", { className: "lbl" }, k), e("div", { className: "val" }, v));
  }
  function vrow(k, v) {
    return e("div", { className: "sd-vrow" }, e("div", { className: "k" }, k), e("div", { className: "v" }, v));
  }
  function scoreRow(abbr, score, win, logo) {
    return e("div", { className: "tm" + (win ? " win" : "") },
      e("span", { className: "tok" }, e("img", { src: logo, alt: abbr })),
      e("span", { className: "ab" }, abbr), e("span", { className: "sc" }, score));
  }
  function wx(icon, big, small, cap) {
    return e("div", { className: "c" }, WxIcon(icon),
      big ? e("div", { className: "big" }, big) : null,
      small ? e("div", { className: "small" }, small) : null,
      e("div", { className: "cap" }, cap));
  }
  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t) {
      return e("tr", null,
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe rcol sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "sd-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        heads.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, tr(box.away), tr(box.home)));
  }

  function Spread() {
    return e("div", { className: "sd-spread", "data-screen-label": "San Diego Stadium spread" },

      /* ============== LEFT PAGE / HERO ============== */
      e("div", { className: "sd-page sd-left", "data-screen-label": "San Diego Stadium \u2014 hero" },
        e("div", { className: "sd-hero-slot" },
          e(Slot, { id: "sandiego-hero", placeholder: "Drop the San Diego Stadium aerial \u2014 the open-air concrete bowl in Mission Valley: freeway adjacency, vast parking fields, round circulation towers, the valley setting (avoid close baseball imagery)" })),
        e("div", { className: "sd-hero-scrim" }),
        e(ArcSystem, { className: "sd-hero-arcs", stroke: "#E7DECB", op: 0.16, cx: 1180, cy: 150, radii: [560, 470, 386, 308] }),

        /* municipal sign panel, low-left */
        e("div", { className: "sd-sign" },
          e("div", { className: "sd-sign-top" }, "Mission Valley \u00b7 California"),
          e("h1", { className: "sd-hero-name" },
            e("span", { className: "l1" }, "San Diego"),
            e("span", { className: "l2" }, "Stadium")),
          e("div", { className: "sd-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "sd-hero-meta" },
            D.years_active + "  \u00b7  " + D.stadium_type + "  \u00b7  ",
            e("span", { className: "dem" }, D.status))
        )
      ),

      /* ============== RIGHT PAGE ============== */
      e("div", { className: "sd-page sd-right" },
        e(ArcSystem, { className: "sd-watermark", stroke: "#6E6A5E", op: 0.08, cx: 70, cy: 70, radii: [1180, 1010, 860, 720, 600] }),
        e("div", { className: "sd-rp" },

          /* exhibit header */
          e("div", { className: "sd-head" },
            e("div", { className: "hl" },
              e("div", { className: "nm" }, "San Diego Stadium"),
              e("div", { className: "sub" }, D.classification_era + "  \u00b7  " + D.roof_type + "  \u00b7  " + D.location_classification)),
            e("div", { className: "hr" },
              e("div", { className: "k" }, "Era"),
              e("div", { className: "v" }, D.years_active))),

          /* body grid: dominant vertical data well | main column */
          e("div", { className: "sd-body" },

            /* ---- THE DATA WELL (vertical concrete circulation tower) ---- */
            e("div", { className: "sd-well" },
              e("div", { className: "sd-well-inner" },

                /* identity: team / league / marks */
                e("div", { className: "sd-identity" },
                  e("div", { className: "sd-seclbl" }, e("span", { className: "dot" }), e("span", { className: "t" }, "Identity")),
                  e("div", { className: "sd-marks" },
                    e("img", { src: "assets/padres-friar.svg", alt: "San Diego Padres", className: "sd-mark team" }),
                    e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball", className: "sd-mark" }),
                    e("img", { src: "assets/nl-logo.png", alt: "National League", className: "sd-mark" })),
                  e("div", { className: "sd-idline" }, D.team_name + "  \u00b7  " + D.league + "  \u00b7  " + D.division)),

                /* stadium facts — museum table */
                e("div", { className: "sd-facts" },
                  e("div", { className: "colhdr" }, "Stadium Facts"),
                  factRow("Construction Start", D.construction_start),
                  factRow("Opened", D.opened),
                  factRow("Active", D.years_active_mlb),
                  factRow("Architect", D.architect),
                  factRow("Style", D.architectural_style),
                  factRow("Type", D.stadium_type),
                  factRow("Roof", D.roof_type),
                  factRow("Structure", D.facade_material),
                  factRow("Surface", D.surface + " (" + D.playing_surface_type.toLowerCase() + ")"),
                  factRow("Capacity", D.capacity_opening + " \u2192 " + D.capacity_current),
                  factRow("Renovations", D.renovations),
                  factRow("All-Star Games", D.all_star_games),
                  factRow("Cost", D.stadium_cost + " (" + D.stadium_cost_adjusted + " adj.)"),
                  factRow("Financing", D.financing_method),
                  factRow("Elevation", D.elevation),
                  factRow("Coordinates", D.coordinates),
                  factRow("Successor", D.succeeded_by)),

                /* embedded field instrument */
                e("div", { className: "sd-instrument" },
                  e("div", { className: "colhdr" }, "Field Dimensions"),
                  Protractor ? e(Protractor, {
                    lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                    orientation: D.orientation, degrees: D.orientation_degrees, accent: C.secondary.hex
                  }) : null)
              )
            ),

            /* ---- MAIN COLUMN ---- */
            e("div", { className: "sd-main" },

              /* three documentary apertures (4:3) */
              e("div", { className: "sd-apertures" },
                e("div", { className: "ap" }, e(Slot, { id: "sd-p1", placeholder: "Exterior \u00b7 round circulation tower & ramps" })),
                e("div", { className: "ap" }, e(Slot, { id: "sd-p2", placeholder: "Open-air seating bowl" })),
                e("div", { className: "ap" }, e(Slot, { id: "sd-p3", placeholder: "Ramp / concourse detail" }))),

              /* lifecycle — quiet name-history sequence (tower markings) */
              e("div", { className: "sd-lifecycle" },
                e("div", { className: "sd-seclbl row" }, e("span", { className: "dot" }), e("span", { className: "t" }, "Lifecycle"), e("span", { className: "ln" }),
                  e("span", { className: "edge" }, "Opened April 8, 1969 \u00b7 Final Game September 28, 2003 \u00b7 Razed " + D.demolition_year)),
                e("div", { className: "sd-stations" },
                  D.name_history.map((n, i) =>
                    e("div", { className: "stn" + (i === 0 ? " first" : ""), key: i },
                      e("span", { className: "tick" }),
                      e("span", { className: "yr" }, n.years),
                      e("span", { className: "nmn" }, n.name))))),

              /* stadium context — one unified block */
              e("div", { className: "sd-context" },
                e("div", { className: "sd-seclbl" }, e("span", { className: "dot" }), e("span", { className: "t" }, "Stadium Context"), e("span", { className: "ln" })),
                e("div", { className: "body" }, D.stadium_context.map((p, i) => e("p", { key: i }, p)))),

              /* game record — scorekeeper insert (dark concrete band) */
              e("div", { className: "sd-visit" },
                e("div", { className: "sd-vband" },

                  e("div", { className: "vcol score" },
                    e("div", { className: "sd-vlbl" }, e("span", { className: "dot" }), e("span", { className: "t" }, "Featured Game")),
                    e("div", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date + "*"),
                    e("div", { className: "sd-score" },
                      scoreRow(D.box.home.abbr, D.box.home.r, D.box.home.r > D.box.away.r, "assets/padres-friar-centered.svg"),
                      e("div", { className: "dv" }),
                      scoreRow(D.box.away.abbr, D.box.away.r, D.box.away.r > D.box.home.r, "assets/los-angeles-dodgers-logo.svg")),
                    e("div", { className: "sd-est" }, "*estimated")),

                  e("div", { className: "vcol mid" },
                    e("div", { className: "sd-vsub" }, "Line Score \u00b7 " + D.innings_played + " innings"),
                    BoxScore(D.box),
                    e("div", { className: "sd-pitch" },
                      e("div", { className: "pl" }, D.home_starting_pitcher + " (SD) \u00b7 " + D.away_starting_pitcher + " (LAD)"),
                      e("div", { className: "pl" },
                        e("span", { className: "dec" }, "W"), " " + D.winning_pitcher + "  \u00b7  ",
                        e("span", { className: "dec" }, "L"), " " + D.losing_pitcher)),
                    e("div", { className: "sd-wx" },
                      wx("temp", D.temperature, null, "Temp"),
                      wx("sun", null, D.conditions, "Sky"),
                      wx("wind", null, D.wind, "Wind"),
                      wx("drop", D.humidity, null, "Humidity"))),

                  e("div", { className: "vcol info" },
                    e("div", { className: "sd-vsub" }, "Visit Information"),
                    e("div", { className: "sd-visitno" },
                      e("div", { className: "k" }, "Stadium"),
                      e("div", { className: "fig" },
                        e("span", { className: "num" }, String(D.visit_order)),
                        e("span", { className: "stack" },
                          e("span", { className: "of" }, "of"),
                          e("span", { className: "tot" }, "42")))),
                    vrow("Total Visits", String(D.visit_count)),
                    vrow("First Pitch", D.start_time + " " + D.time_zone),
                    vrow("Game", D.day_night + " Game"),
                    vrow("Duration", D.game_duration),
                    vrow("Attendance", D.attendance))
                ))
            )
          ),

          /* footer colophon */
          e("div", { className: "sd-foot" },
            e("span", { className: "plate" }, "San Diego Stadium"),
            e("span", { className: "mono" }, D.address),
            e("span", { className: "colors" },
              [C.primary, C.secondary, C.accent].map((c, i) =>
                e("span", { className: "sw", key: i },
                  e("span", { className: "chip", style: { background: c.hex } }),
                  e("span", { className: "nm" }, c.name)))))
        )
      )
    );
  }

  window.SanDiegoSpread = Spread;
})();
