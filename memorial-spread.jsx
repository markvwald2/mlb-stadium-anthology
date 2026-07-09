/* memorial-spread.jsx — "The Gateway Before the Revolution" spread for Memorial Stadium.
   Reads window.MEMORIAL, window.MemorialProtractor. Every populated structured value is placed
   exactly once. Concept: a transitional civic monument between the postwar municipal era
   and the retro-classic revolution Camden Yards would inaugurate. */
(function () {
  const e = React.createElement;
  const D = window.MEMORIAL;
  const Protractor = window.MemorialProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src });
  }

  /* ---- faint stadium-bowl footprint (the oval) behind the protractor ---- */
  function Footprint() {
    const ink = "#1C1B19";
    return e("svg", { className: "ms-footprint", viewBox: "0 0 290 360", "aria-hidden": "true" },
      e("g", { fill: "none", stroke: ink, strokeWidth: 2 },
        e("ellipse", { cx: 145, cy: 180, rx: 132, ry: 168 }),
        e("ellipse", { cx: 145, cy: 180, rx: 110, ry: 143 })
      )
    );
  }

  function wxIcon(kind) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "sun")  return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function recRow(k, v) {
    return e("div", { className: "row" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function csRow(k, v, end) {
    return e("div", { className: "ms-cs-row" + (end ? " end" : "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function vrow(k, v, lead) {
    return e("div", { className: "ms-vrow" + (lead ? " lead" : "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "ms-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    const homeWin = D.box.home.r > D.box.away.r;
    return e("div", { className: "ms-spread", "data-screen-label": "Memorial Stadium spread" },

      /* ================= LEFT PAGE — carved monument hero ================= */
      e("div", { className: "ms-page ms-left", "data-screen-label": "Memorial Stadium hero" },
        e("div", { className: "ms-hero-slot" },
          e(Slot, { id: "ms-hero", src: "images/memorial/memorial-stadium-00-main-d4a3b435.jpg", placeholder: "Drop a dramatic low-angle photograph of the memorial facade \u2014 colonnade, gateway, reinforced-concrete mass (treat it like a civic monument, not the field)" })),
        e("div", { className: "ms-hero-scrim" }),

        e("div", { className: "ms-hero-folio" },
          e("span", { className: "tick" }),
          e("span", null, "Baltimore Orioles")),

        e("div", { className: "ms-hero-title" },
          e("h1", { className: "ms-hero-name" }, "Memorial Stadium"),
          e("div", { className: "ms-hero-rule" }),
          e("div", { className: "ms-hero-loc" }, D.city + ", " + D.state)),

        e("div", { className: "ms-hero-colophon" },
          e("span", null, D.address),
          e("span", { className: "dot" }, "\u25C6"),
          e("span", null, D.coordinates),
          e("span", { className: "dot" }, "\u25C6"),
          e("span", null, "Elev. ", e("span", { className: "hl" }, D.elevation)))
      ),

      /* ================= RIGHT PAGE — three-bay gateway ================= */
      e("div", { className: "ms-page ms-right" },
        e("div", { className: "ms-rp" },

          /* --- STADIUM SECTION header --- */
          e("div", { className: "ms-sec" },
            e("div", { className: "lbl" },
              e("span", { className: "num" }, "I"),
              e("span", { className: "t" }, "The Stadium")),
            e("div", { className: "meta" }, D.classification_era + " \u00b7 " + D.stadium_type)),

          /* --- photo plates (museum framing, no captions) --- */
          e("div", { className: "ms-plates" },
            plate("ms-p1", "memorial-stadium-01.jpg", "Memorial facade \u2014 gateway elevation"),
            plate("ms-p2", "memorial-stadium-02.jpg", "Aerial \u2014 stadium and city"),
            plate("ms-p3", "memorial-stadium-03.jpg", "Seating bowl \u2014 field from the stands"),
            plate("ms-p4", "memorial-stadium-04.jpg", "Field level \u2014 batting practice"),
            plate("ms-p5", "memorial-stadium-05.jpg", "Bowl interior at dusk")),

          /* --- the gateway: three bays --- */
          e("div", { className: "ms-gateway" },

            /* LEFT BAY — Artifact Record */
            e("div", { className: "ms-bay left" },
              e("div", { className: "ms-bayh" }, "Stadium Record"),
              e("div", { className: "ms-record" },
                recRow("Team", e("b", null, D.team_name)),
                recRow("League", D.league + " \u00b7 " + D.division),
                recRow("Architect", D.architect),
                recRow("Style", D.architectural_style),
                recRow("Structure", D.facade_material),
                recRow("Surface", e("b", null, "Natural Grass")),
                recRow("Capacity", e(React.Fragment, null,
                  e("b", null, D.capacity_current), " ",
                  e("span", { className: "sm" }, "(originally " + D.capacity_opening + ")"))),
                recRow("Setting", D.location_classification),
                recRow("Cost", e(React.Fragment, null,
                  e("span", { className: "mono" }, D.stadium_cost), " ",
                  e("span", { className: "sm" }, "\u00b7 " + D.stadium_cost_adjusted + " adj."))),
                recRow("Financing", D.financing_method),
                recRow("Renovations", D.renovations),
                recRow("Succeeded By", e("b", null, D.succeeded_by)))),

            /* CENTER BAY — field protractor over the stadium-bowl oval, civic record */
            e("div", { className: "ms-bay center" },
              e("div", { className: "ms-void" },
                e("div", { className: "ms-orient" },
                  e("div", { className: "ms-stage" },
                    e(Footprint, null),
                    Protractor ? e(Protractor, {
                      lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                      orientation: D.orientation, degrees: D.orientation_degrees, accent: "#B8461E"
                    }) : null),
                  e("div", { className: "cap" }, "Field oriented " + D.orientation + " \u00b7 " + D.orientation_degrees + "\u00b0")),
                e("div", { className: "ms-cornerstone" },
                  e("div", { className: "ttl" }, "Civic Record"),
                  e("div", { className: "ms-cs-rows" },
                    csRow("Opened", D.opening_day),
                    csRow("MLB Era", D.years_active.replace(" for MLB", "")),
                    csRow("Final Game", D.final_game),
                    csRow("Demolished", D.demolition_year, true))))),

            /* RIGHT BAY — Stadium Context */
            e("div", { className: "ms-bay right" },
              e("div", { className: "ms-bayh" }, "The Memorial Wall"),
              e("div", { className: "ms-ctx" },
                D.stadium_context.map((p, i) => e("p", { key: i }, p))))
          ),

          /* --- VISIT SECTION — scorebook sheet --- */
          e("div", { className: "ms-visit" },
            e("div", { className: "ms-sec" },
              e("div", { className: "lbl" },
                e("span", { className: "num" }, "II"),
                e("span", { className: "t" }, "The Visit")),
              e("div", { className: "meta" }, D.trip_name + " Trip")),

            e("div", { className: "ms-scorebook" },

              /* featured game */
              e("div", { className: "ms-game" },
                e("div", { className: "ms-modlbl" }, "Featured Game \u00b7 " + D.visit_type),
                e("span", { className: "trip" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                e("div", { className: "ms-matchup" },
                  e("div", { className: "team-col" },
                    e("span", { className: "tcode away" }, D.away_team_abbreviation),
                    e("img", { className: "away-logo", src: "assets/oakland-athletics-logo.svg", alt: "Oakland Athletics" })),
                  e("span", { className: "at" }, "AT"),
                  e("div", { className: "team-col" },
                    e("span", { className: "tcode home" }, D.home_team_abbreviation),
                    e("img", { className: "home-logo", src: "assets/orioles-cartoon-logo.svg", alt: "Baltimore Orioles" }))),
                e("div", { className: "venue" }, D.away_team + " at " + D.home_team),
                e("div", { className: "ms-modlbl finalscore-lbl" }, "Final Score"),
                e("div", { className: "result" }, D.game_result)),

              /* line score + pitching + weather */
              e("div", { className: "ms-sbcol" },
                e("div", { className: "ms-modlbl" }, "Line Score \u00b7 " + D.innings_played + " Innings"),
                LineScore(D.box),
                e("div", { className: "ms-pitchrow" },
                  e("div", { className: "item" },
                    e("span", { className: "k" }, "Matchup"),
                    e("span", { className: "v" }, D.away_starting_pitcher + " (" + D.away_team_abbreviation + ") vs " + D.home_starting_pitcher + " (" + D.home_team_abbreviation + ")")),
                  e("div", { className: "item" },
                    e("span", { className: "k" }, "Decision"),
                    e("span", { className: "v" }, e("b", null, "W: " + D.winning_pitcher), " \u00b7 L: " + D.losing_pitcher))),
                e("div", { className: "ms-weather" },
                  wx("temp", D.temperature, "Temp"),
                  wx("sun", D.conditions, "Sky"),
                  wx("wind", D.wind, "Wind"),
                  wx("drop", D.humidity, "Humidity"))),

              /* visit info */
              e("div", { className: "ms-sbcol" },
                e("div", { className: "ms-modlbl" }, "Visit Information"),
                e("div", { className: "ms-vinfo" },
                  vrow("Visit No.", D.visit_order + " of " + D.visit_total, true),
                  vrow("Visit Date", D.first_visit_date),
                  vrow("Total Visits", D.visit_count),
                  vrow("Attendance", D.attendance),
                  vrow("First Pitch", D.first_pitch),
                  vrow("Duration", D.game_duration)),
                e("div", { className: "ms-leaguemarks" },
                  e("img", { className: "league", src: "assets/american-league-logo.png", alt: "American League" }),
                  e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })))
            )
          ),

          /* --- colophon footer --- */
          e("div", { className: "ms-foot" },
            e("span", { className: "end" }, "Postwar Civic Scale"))
        )
      )
    );

    function plate(id, src, ph) {
      return e("div", { className: "ms-plate" },
        e("div", { className: "inner" }, e(Slot, { id: id, src: "images/memorial/" + src, placeholder: ph })));
    }
    function stat(icon, lab, val, lead) {
      return e("div", { className: "ms-stat" + (lead ? " lead" : "") },
        e("div", { className: "lab" }, lab),
        e("div", { className: "val" }, icon ? wxIcon(icon) : null, e("span", null, val)));
    }
    function wx(icon, val, lab) {
      return e("div", { className: "ms-wx" },
        wxIcon(icon),
        e("div", { className: "val" }, val),
        e("div", { className: "lab" }, lab));
    }
    function swatch(c) {
      return e("span", { className: "sw" },
        e("i", { style: { background: c.hex } }),
        c.name);
    }
  }

  window.MemorialSpread = Spread;
})();
