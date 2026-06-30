/* nationals-spread.jsx — Nationals Park anthology spread. "Civic Grid / River Edge."
   Reads window.NATS. Limestone civic grid, navy structure, restrained red accents.
   The right page is organized as a Navy Yard / Capitol Riverfront district plan:
   a datum ribbon, a tall limestone Stadium Context panel, a museum-catalogue Facts
   block with an embedded protractor field instrument, civic-block photo frames, a
   Metro-style Visit panel with line score, and a Civic Record ledger. */
(function () {
  const D = window.NATS;
  const FieldDiagram = window.NatsProtractor;

  function Slot(props) {
    return React.createElement("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect" });
  }

  function ribCell(k, v, cls) {
    return React.createElement("div", { className: "rc " + (cls || "") },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }

  function catItem(k, v, vn, cls) {
    return React.createElement("div", { className: "np-cat " + (cls || "") },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v),
      vn ? React.createElement("div", { className: "vn" }, vn) : null);
  }

  function vRow(k, v) {
    return React.createElement("div", { className: "np-vrow" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }

  function photoCard(id, cap, tag, placeholder) {
    return React.createElement("div", { className: "np-pcard" },
      React.createElement(Slot, { id: id, placeholder: placeholder }));
  }

  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t, away) {
      return React.createElement("tr", { className: away ? "away" : "" },
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i, className: away ? "away-r" : "" }, n)),
        React.createElement("td", { className: "spc" }),
        React.createElement("td", { className: "rhe sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e));
    }
    return React.createElement("table", { className: "np-box" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "spc" }),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E"))),
      React.createElement("tbody", null,
        tr(box.away, true),
        tr(box.home, false)));
  }

  function Spread() {
    const F = D.facts;
    return (
      React.createElement("div", { className: "np-spread", "data-screen-label": "Nationals Park spread" },

        /* ===================== LEFT PAGE / HERO ===================== */
        React.createElement("div", { className: "np-page np-left", "data-screen-label": "Nationals Park hero" },
          React.createElement("div", { className: "np-hero-slot" },
            React.createElement(Slot, { id: "nats-hero", placeholder: "Drop the Nationals Park aerial \u2014 bowl + Navy Yard / Capitol Riverfront district + Anacostia River" })),
          React.createElement("div", { className: "np-hero-scrim" }),

          React.createElement("div", { className: "np-hero-head" },
            React.createElement("div", { className: "np-hero-rule" },
              React.createElement("span", { className: "bar" }),
              React.createElement("span", { className: "star" }, "\u2605")),
            React.createElement("h1", { className: "np-hero-name" }, "NATIONALS PARK"),
            React.createElement("div", { className: "np-hero-sub" },
              React.createElement("span", { className: "city" }, "Washington, D.C."),
              React.createElement("span", { className: "coords" }, D.coordinates_n + ", " + D.coordinates_w))
          ),

          React.createElement("div", { className: "np-meta" },
            React.createElement("div", { className: "cell" },
              React.createElement("div", { className: "k" }, "Setting"),
              React.createElement("div", { className: "v" }, D.location_type)),
            React.createElement("div", { className: "cell addr" },
              React.createElement("div", { className: "k" }, "Address"),
              React.createElement("div", { className: "v mono" }, D.address))
          )
        ),

        /* ===================== RIGHT PAGE ===================== */
        React.createElement("div", { className: "np-page np-right" },
          React.createElement("div", { className: "np-rp" },

            /* --- datum ribbon --- */
            React.createElement("div", { className: "np-ribbon" },
              ribCell("Team", D.team_name, "team"),
              ribCell("League", D.division),
              ribCell("Era", D.classification_era),
              ribCell("Years Active", D.years_active),
              ribCell("All-Star Game", D.all_star),
              ribCell("Preceded By", "RFK Stadium"),
              ribCell("Visit", D.visit_order + " of 42")),

            /* --- main region --- */
            React.createElement("div", { className: "np-main" },

              /* CONTEXT — tall limestone panel */
              React.createElement("div", { className: "np-context" },
                React.createElement("div", { className: "np-modh" },
                  React.createElement("span", null, "Glass on the Anacostia"),
                  React.createElement("span", { className: "ix" }, "\u2014 I")),
                React.createElement("div", { className: "np-ctx-body" },
                  React.createElement("div", { className: "np-ctx-paras" },
                    D.context.map((p, i) => React.createElement("p", { key: i }, p))),
                  React.createElement("div", { className: "np-ctx-photo" },
                    React.createElement(Slot, { id: "nats-ctx-photo", placeholder: "Navy Yard / Capitol Riverfront district \u2014 civic context plate" })))),

              /* RIGHT — specs + photos */
              React.createElement("div", { className: "np-rmain" },

                React.createElement("div", { className: "np-specs" },
                  /* facts catalogue */
                  React.createElement("div", { className: "np-facts" },
                    React.createElement("div", { className: "np-modh" },
                      React.createElement("span", null, "Stadium Facts"),
                      React.createElement("span", { className: "ix" }, "\u2014 II")),
                    React.createElement("div", { className: "np-catalog" },
                      catItem("Opened", F.opened),
                      catItem("Construction Start", D.construction_start),
                      catItem("Capacity", F.capacity, F.capacity_note),
                      catItem("Surface", F.surface, F.surface_note),
                      catItem("Elevation", F.elevation, F.elevation_note),
                      catItem("Configuration", F.roof + " \u00b7 " + F.type))),

                  /* protractor diagram */
                  React.createElement("div", { className: "np-diagram" },
                    React.createElement("div", { className: "np-modh" },
                      React.createElement("span", null, "Field Plan"),
                      React.createElement("span", { className: "ix" }, "N \u00b7 " + D.field.orientation_degrees + "\u00b0")),
                    React.createElement("figure", { className: "np-fp" },
                      FieldDiagram ? React.createElement(FieldDiagram, {
                        lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                        orientation: D.field.orientation, degrees: D.field.orientation_degrees, accent: "#14264B"
                      }) : null,
                      React.createElement("figcaption", { style: { letterSpacing: "1px" } }, "Oriented " + D.field.orientation + " \u00b7 Bearing " + D.field.orientation_degrees + "\u00b0"))),

                  /* identity logos */
                  React.createElement("div", { className: "np-identity" },
                    React.createElement("div", { className: "ih" }, "Identity"),
                    React.createElement("div", { className: "iwrap" },
                      React.createElement("img", { className: "logo-w", src: "assets/washington-nationals-logo.svg", alt: "Washington Nationals" }),
                      React.createElement("img", { className: "logo-mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
                      React.createElement("img", { className: "logo-nl", src: "assets/nl-logo.png", alt: "National League" })))
                ),

                /* photo civic blocks */
                React.createElement("div", { className: "np-photos" },
                  photoCard("nats-p1", "Exterior", "Exterior", "Precast civic facade / S Capitol St entrance"),
                  photoCard("nats-p2", "Concourse", "Concourse", "Open concourse / bowl + river view"),
                  photoCard("nats-p3", "Riverfront", "Riverfront", "Anacostia riverfront / Navy Yard district")),

                /* --- VISIT BAND --- */
                React.createElement("div", { className: "np-visit" },
              React.createElement("div", { className: "np-modh" },
                React.createElement("span", null, "Visit \u2014 Featured Game"),
                React.createElement("span", { className: "ix" }, "\u2014 III")),
              React.createElement("div", { className: "np-visit-grid" },

                /* game details — Metro info table */
                React.createElement("div", { className: "np-vg-col" },
                  React.createElement("div", { className: "np-veyebrow" },
                    React.createElement("div", null, D.trip_name + " Trip"),
                    React.createElement("div", null, D.featured_day + ", " + D.featured_date)),
                  React.createElement("div", { className: "np-vresult" }, "Cardinals 5, Nationals 1"),
                  React.createElement("div", { className: "np-vrows" },
                    vRow("Attendance", D.attendance),
                    vRow("First Pitch", D.first_pitch),
                    vRow("Duration", D.time_of_game),
                    vRow("Weather", D.weather.temperature + " \u00b7 " + D.weather.conditions),
                    vRow("Wind / Hum.", D.weather.wind + " \u00b7 " + D.weather.humidity))),

                /* line score + team logos */
                React.createElement("div", { className: "np-vg-col np-vscore" },
                  BoxScore(D.box),
                  React.createElement("div", { className: "np-logos-vs" },
                    React.createElement("div", { className: "tn tn-l" },
                      React.createElement("div", null, "St. Louis"),
                      React.createElement("div", null, "Cardinals")),
                    React.createElement("img", { className: "tlogo", src: "assets/st-louis-cardinals-logo.svg", alt: "St. Louis Cardinals" }),
                    React.createElement("span", { className: "vs" }, "vs."),
                    React.createElement("img", { className: "tlogo", src: "assets/washington-nationals-logo.svg", alt: "Washington Nationals" }),
                    React.createElement("div", { className: "tn tn-r" },
                      React.createElement("div", null, "Washington"),
                      React.createElement("div", null, "Nationals")))),

                /* pitching matchup / results */
                React.createElement("div", { className: "np-vg-col np-pitch" },
                  React.createElement("div", { className: "ph" }, "Pitching"),
                  React.createElement("div", { className: "np-pi-rows" },
                    pitchRow(D.away_abbr, D.starter_away),
                    pitchRow(D.home_abbr, D.starter_home)),
                  React.createElement("div", { className: "np-pi-dec" },
                    React.createElement("div", { className: "pd" },
                      React.createElement("span", { className: "k" }, "W"),
                      React.createElement("span", { className: "v" }, D.winning_pitcher)),
                    React.createElement("div", { className: "pd" },
                      React.createElement("span", { className: "k" }, "L"),
                      React.createElement("span", { className: "v" }, D.losing_pitcher)),
                    React.createElement("div", { className: "pd" },
                      React.createElement("span", { className: "k" }, "S"),
                      React.createElement("span", { className: "v dash" }, "\u2014"))))
              )
            ),

            /* --- CIVIC RECORD LEDGER --- */
            React.createElement("div", { className: "np-ledger" },
              React.createElement("div", { className: "np-modh" },
                React.createElement("span", null, "Civic Record \u2014 Construction & District"),
                React.createElement("span", { className: "ix" }, "\u2014 IV")),
              React.createElement("div", { className: "np-lgrid" },
                lCell("Architect", D.architect),
                lCell("Facade & Style", D.facade_material + ". " + D.architectural_style + "."),
                React.createElement("div", { className: "lc cost" },
                  React.createElement("div", { className: "k" }, "Cost"),
                  React.createElement("div", { className: "v big" }, D.stadium_cost),
                  React.createElement("div", { className: "v adj" }, D.stadium_cost_adjusted + " adj")),
                lCell("Financing", D.financing_method))),
                React.createElement("div", { className: "np-colophon" },
                  React.createElement("span", { className: "lead" }, "The Ballpark as Civic Anchor"),
                  React.createElement("span", { className: "sep" }, "\u2014"),
                  React.createElement("span", { className: "loc" }, "Navy Yard / Capitol Riverfront \u00b7 Anacostia River, Washington, D.C."))
              )
            )
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function dimItem(k, v) {
    return React.createElement("div", { className: "di" },
      React.createElement("span", { className: "dk" }, k),
      React.createElement("span", { className: "dv" }, (v || "").replace(" ft", "'")));
  }
  function pitchRow(abbr, name) {
    return React.createElement("div", { className: "pr" },
      React.createElement("span", { className: "ab" }, abbr),
      React.createElement("span", { className: "nm" }, name));
  }
  function lCell(k, v) {
    return React.createElement("div", { className: "lc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }

  window.NatsSpread = Spread;
})();
