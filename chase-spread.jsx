/* chase-spread.jsx — the single Chase Field spread, "The Environmental Machine".
   Reads window.CHASE (local data) + window.ChaseField.
   Left: full-bleed desert/aerial hero. Right: warm Sonoran paper, an
   architectural data sheet — photo strip, identity ribbon, then three columns
   (Stadium Facts + Field Dimensions · Visit + Weather + Line Score · Context).
   Sedona red is an accent only. Every populated field renders exactly once. */
(function () {
  const e = React.createElement;
  const D = window.CHASE;
  const ChaseField = window.ChaseField;
  const ChaseProtractor = window.ChaseProtractor;
  const SEDONA = "#A3392B";

  function Slot(props) {
    return e("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.style ? { style: props.style } : {}));
  }

  // red section eyebrow on a hairline, with optional mono note
  function SecHead(props) {
    return e("div", { className: "chf-h" },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null
    );
  }

  function factRow(row, i) {
    return e("div", { className: "chf-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null
      )
    );
  }

  // weather icons
  function WxIcon(kind) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none",
      stroke: "#6E665A", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "chf-wico" };
    if (kind === "sun") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 4.2 }),
      e("path", { d: "M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" }));
    if (kind === "clear") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 5 }),
      e("path", { d: "M12 3v1.6M12 19.4V21M3 12h1.6M19.4 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M18.4 5.6l-1.1 1.1M6.7 17.3l-1.1 1.1" }));
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c,
      e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }

  function wxCell(icon, value, label) {
    return e("div", { className: "chf-wcell" },
      WxIcon(icon),
      e("div", { className: "tx" },
        e("div", { className: "wv" }, value),
        e("div", { className: "wl" }, label))
    );
  }

  // vintage newspaper line score
  function LineScore(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "inn" }, n)),
        e("td", { className: "rcol sep" }, t.r),
        e("td", { className: "hecol" }, t.h),
        e("td", { className: "hecol" }, t.e)
      );
    }
    return e("table", { className: "chf-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          cols.map((n) => e("th", { key: n, className: "inn" }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E")
        )
      ),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)
      )
    );
  }

  function Spread() {
    return e("div", { className: "chf-spread", "data-screen-label": "Chase Field spread" },

      /* ============ LEFT PAGE / HERO ============ */
      e("div", { className: "chf-page chf-left" },
        e("div", { className: "chf-hero-slot" },
          e(Slot, { id: "chase-hero", placeholder: "Drop the Chase Field hero \u2014 aerial of the retractable roof, downtown Phoenix grid, desert basin & mountains at dusk", shape: "rect" })
        ),
        e("div", { className: "chf-hero-scrim" }),

        // Diamondbacks mark, upper-left
        e("img", { className: "chf-hero-logo", src: "assets/arizona-diamondbacks-logo.svg", alt: "Arizona Diamondbacks" }),

        // folio, upper-right
        e("div", { className: "chf-folio" }, "VISIT " + D.visit_order + " / " + D.visit_total),

        // spine metadata, far-left vertical
        e("div", { className: "chf-spine" }, "EST. " + D.est + "  \u00b7  PHOENIX, ARIZONA  \u00b7  VISIT " + D.visit_order),

        // a single faint roof-track datum line — the environmental machine
        e("div", { className: "chf-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "RETRACTABLE ROOF"), e("span", { className: "ln" }), e("span", { className: "tk" })
        ),

        // title block, lower-left
        e("div", { className: "chf-hero-title" },
          e("h1", { className: "chf-name", "data-t": "CHASE" }, "CHASE"),
          e("h1", { className: "chf-name", "data-t": "FIELD" }, "FIELD"),
          e("div", { className: "chf-sub" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)
          )
        ),

        // colophon, bottom-left
        e("div", { className: "chf-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "div" }),
          e("span", { className: "lg" }, D.league),
          e("span", { className: "dv" }, D.division)
        )
      ),

      /* ============ RIGHT PAGE ============ */
      e("div", { className: "chf-page chf-right" },
        e("div", { className: "chf-rp" },

          /* ---- IMAGE STRIP ---- */
          e("div", { className: "chf-strip" },
            D.strip.map((s, i) =>
              e("figure", { className: "chf-frame", key: i },
                e(Slot, { id: s[0], placeholder: s[1] }),
                e("figcaption", null, s[1])
              )
            )
          ),

          /* ---- IDENTITY RIBBON ---- */
          e("div", { className: "chf-ribbon" },
            e("div", { className: "cell mark" },
              e("img", { className: "rib-logo", src: "assets/arizona-diamondbacks-logo.svg", alt: "Arizona Diamondbacks" })
            ),
            ribCell("Team", D.team_short),
            ribCell("League", D.league),
            ribCell("Stadium Classification", D.classification_ribbon),
            ribCell("Years Active", D.years_active),
            ribCell("Opening Capacity", D.capacity_opening),
            ribCell("Visit Number", D.visit_order + " of " + D.visit_total)
          ),

          /* ---- THREE-COLUMN BODY ---- */
          e("div", { className: "chf-body" },

            /* COLUMN 1 — Stadium Facts (full spec sheet) */
            e("div", { className: "chf-col col1" },
              e("div", { className: "chf-mod" },
                e(SecHead, { title: "Stadium Facts" }),
                e("div", { className: "chf-facts" }, D.facts.map(factRow))
              )
            ),

            /* COLUMN 2 — Visit + Weather + Line Score */
            e("div", { className: "chf-col col2" },
              e("div", { className: "chf-mod" },
                e(SecHead, { title: "Visit Information", note: "(" + D.visit_order + " of " + D.visit_total + ")" }),
                e("div", { className: "chf-facts compact" }, D.visit.map(factRow))
              ),
              e("div", { className: "chf-mod" },
                e(SecHead, { title: "Weather" }),
                e("div", { className: "chf-weather" },
                  wxCell("sun", D.weather.temperature, "Temp"),
                  wxCell("clear", D.weather.conditions, "Conditions"),
                  wxCell("wind", D.weather.wind, "Wind"),
                  wxCell("drop", D.weather.humidity, "Humidity")
                )
              ),
              e("div", { className: "chf-mod" },
                e(SecHead, { title: "Line Score", note: "\u2014 " + D.game_day.toUpperCase() + ", " + D.game_date.toUpperCase() }),
                LineScore(D.box),
                e("div", { className: "chf-gcap" },
                  e("span", null, "Final"),
                  e("span", { className: "sep" }, "\u00b7"),
                  e("span", null, D.box.innings + " innings"),
                  e("span", { className: "sep" }, "\u00b7"),
                  e("span", null, D.game_duration)
                ),
                e("div", { className: "chf-dec" },
                  e("p", null, e("b", null, "W:"), " ", e("i", null, D.winning_pitcher), " (" + D.winning_team + ")"),
                  e("p", null, e("b", null, "L:"), " ", e("i", null, D.losing_pitcher), " (" + D.losing_team + ")"),
                  e("p", { className: "sv" }, e("b", null, "S:"), " " + D.save_pitcher)
                )
              ),
              e("div", { className: "chf-mod field" },
                e(SecHead, { title: "Field Dimensions" }),
                e("figure", { className: "chf-fieldfig" },
                  ChaseProtractor ? e(ChaseProtractor, {
                    lf: D.field.left_field, cf: D.field.center_field,
                    rf: D.field.right_field, orientation: D.field.orientation,
                    degrees: D.field.degrees, accent: SEDONA
                  }) : null
                )
              )
            ),

            /* COLUMN 3 — Stadium Context */
            e("div", { className: "chf-col col3" },
              e("div", { className: "chf-mod" },
                e(SecHead, { title: "Roof Over the Desert" }),
                e("div", { className: "chf-prose" },
                  D.stadium_context.map((p, i) => e("p", { key: i }, p))
                )
              )
            )
          )
        )
      )
    );
  }

  function ribCell(label, value, mono) {
    return e("div", { className: "cell" + (mono ? " coords" : "") },
      e("div", { className: "rl" }, label),
      e("div", { className: "rv" }, value)
    );
  }

  window.ChaseSpread = Spread;
})();
