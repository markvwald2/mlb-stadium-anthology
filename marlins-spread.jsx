/* marlins-spread.jsx — the Marlins Park / loanDepot park spread, "Climate Vessel".
   Reads window.MARLINS + window.MarlinsProtractor.
   Left: full-bleed aerial of the white retractable-roof shell, with a compact
   Art-Deco signage title embedded into the roof structure. Right: a cool
   white / pale-aqua "climate vessel" data sheet — roof-cassette photo bay,
   identity ribbon, a three-column engineered body (Stadium Facts · Design &
   Lifecycle + Field instrument · Visit Section control panel), then a single
   frosted-glass Stadium Context panel. Miami Blue + Caliente Red as accents only.
   Every populated Codex field renders exactly once. */
(function () {
  const e = React.createElement;
  const D = window.MARLINS;
  const Protractor = window.MarlinsProtractor;
  const CALIENTE = "#D8473E";

  function Slot(props) {
    return e("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.src ? { src: props.src } : {}, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return e("div", { className: "mla-h" },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null
    );
  }

  function factRow(row, i) {
    var opts = (row[3] && typeof row[3] === "object") ? row[3] : {};
    return e("div", { className: "mla-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" + (opts.inline ? " vinline" : "") },
        e("span", { className: "vm", style: opts.vmStyle || null }, row[1]),
        row[2] ? e("span", { className: "vs", style: opts.vsStyle || null }, row[2]) : null
      )
    );
  }

  function WxIcon(kind) {
    const c = { width: 25, height: 25, viewBox: "0 0 24 24", fill: "none",
      stroke: "#46555C", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "mla-wico" };
    if (kind === "temp") return e("svg", c,
      e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }),
      e("path", { d: "M12 9v6.5" }));
    if (kind === "rain") return e("svg", c,
      e("path", { d: "M6.5 14a4.5 4.5 0 0 1 .6-8.96A5.5 5.5 0 0 1 17.5 7 3.8 3.8 0 0 1 17 14.5H7" }),
      e("path", { d: "M8 17.5l-1 2.5M12 17.5l-1 2.5M16 17.5l-1 2.5" }));
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c,
      e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }

  function wxCell(icon, value, label) {
    var val = value;
    if (icon === "wind") {
      var m = ("" + value).match(/^(\S+)\s+(.*)$/);
      if (m) val = [m[1], e("span", { className: "wunit", key: "u" }, " " + m[2].toLowerCase())];
    }
    return e("div", { className: "mla-wcell" },
      WxIcon(icon),
      e("div", { className: "tx" },
        e("div", { className: "wv" }, val),
        e("div", { className: "wl" }, label))
    );
  }

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
    return e("table", { className: "mla-box" },
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

  function ribCell(label, value, mono, cls) {
    return e("div", { className: "cell" + (mono ? " coords" : "") + (cls ? " " + cls : "") },
      e("div", { className: "rl" }, label),
      e("div", { className: "rv" }, value)
    );
  }

  function Spread() {
    return e("div", { className: "mla-spread", "data-screen-label": "Marlins Park spread" },

      /* ============ LEFT PAGE / HERO ============ */
      e("div", { className: "mla-page mla-left" },
        e("div", { className: "mla-hero-slot" },
          e(Slot, { id: "marlins-hero", src: "images/marlins/marlins-park-00-main-PS.jpg", placeholder: "Drop the Marlins Park hero \u2014 aerial looking down at the white retractable-roof shell, glass facade, Little Havana / former Orange Bowl site & Miami skyline beyond", shape: "rect" })
        ),
        e("div", { className: "mla-hero-scrim" }),

        // Marlins mark, upper-left
        e("img", { className: "mla-hero-logo", src: "assets/miami-marlins-logo.svg", alt: "Miami Marlins" }),

        // folio, upper-right
        e("div", { className: "mla-folio" }, "VISIT " + D.visit_order + " / " + D.visit_total),

        // spine metadata
        e("div", { className: "mla-spine" }, D.current_name + "  \u00b7  EST. " + D.est + "  \u00b7  MIAMI"),

        // roof-truss datum line motif (the climate vessel)
        e("div", { className: "mla-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "RETRACTABLE ROOF \u00b7 CLIMATE-CONTROLLED SHELL"),
          e("span", { className: "ln" }), e("span", { className: "tk" })
        ),

        // Art-Deco signage title block, lower-left
        e("div", { className: "mla-hero-title" },
          e("div", { className: "mla-deco-rule top" },
            e("span", { className: "step" }), e("span", { className: "l" })
          ),
          e("h1", { className: "mla-name" }, "MARLINS PARK"),
          e("div", { className: "mla-deco-rule bot" },
            e("span", { className: "l" }), e("span", { className: "step" })
          )
        ),

        // city/state, bottom-left
        e("div", { className: "mla-sub mla-hero-city" },
          e("span", { className: "bar" }),
          e("span", { className: "txt" }, D.city + ", " + D.state)
        )
      ),

      /* ============ RIGHT PAGE ============ */
      e("div", { className: "mla-page mla-right" },
        e("div", { className: "mla-rp" },

          /* ---- ROOF-CASSETTE PHOTO BAY ---- */
          e("div", { className: "mla-strip" },
            D.strip.map((s, i) =>
              e("figure", { className: "mla-cassette", key: i },
                e(Slot, { id: s[0], src: s[2], placeholder: s[1] })
              )
            )
          ),

          /* ---- IDENTITY RIBBON ---- */
          e("div", { className: "mla-ribbon" },
            e("div", { className: "cell mark" },
              e("img", { className: "rib-logo", src: "assets/miami-marlins-logo.svg", alt: "Miami Marlins" })
            ),
            ribCell("Team", D.team_name),
            ribCell("Division", D.division_short),
            ribCell("Classification", D.classification_ribbon, false, "wide"),
            ribCell("Years Active", D.years_active),
            ribCell("Visit Order", D.visit_order + " of " + D.visit_total),
            ribCell("Status", D.status)
          ),

          /* ---- THREE-COLUMN ENGINEERED BODY ---- */
          e("div", { className: "mla-body" },

            /* COLUMN 1 — STADIUM SECTION: facts + design & lifecycle, one distributed list */
            e("div", { className: "mla-col col1 panel" },
              e("div", { className: "mla-mod fill" },
                e(SecHead, { title: "Stadium Facts", note: "STADIUM SECTION" }),
                e("div", { className: "mla-facts compact distribute" },
                  D.facts.map(factRow).concat([
                    e("div", { className: "mla-subdiv", key: "lcdiv" }, e("span", { className: "t" }, "Design & Lifecycle"))
                  ]).concat(D.lifecycle.map(function (r, i) { return factRow(r, "lc" + i); }))
                )
              )
            ),

            /* COLUMN 2 — VISIT SECTION panel + separate FIELD box */
            e("div", { className: "mla-col col2 stack" },
              e("div", { className: "mla-subpanel panel visit" },
              e("div", { className: "mla-mod" },
                e(SecHead, { title: "Visit Information", note: "VISIT SECTION" }),
                e("div", { className: "mla-facts compact" }, D.visit.map(factRow))
              ),
              e("div", { className: "mla-mod" },
                e(SecHead, { title: D.game_title, note: D.game_day.toUpperCase() + " \u00b7 " + D.game_date.toUpperCase() }),
                LineScore(D.box),
                e("div", { className: "mla-gcap" },
                  e("span", null, "Final"),
                  e("span", { className: "sep" }, "\u00b7"),
                  e("span", null, D.box.innings + " innings"),
                  e("span", { className: "sep" }, "\u00b7"),
                  e("span", null, D.game_duration)
                ),
                e("div", { className: "mla-dec" },
                  e("p", null, e("i", null, D.away_starter), " (" + D.box.away.abbr + ") vs ", e("i", null, D.home_starter), " (" + D.box.home.abbr + ")"),
                  e("p", null, e("b", null, "W:"), " ", e("i", null, D.winning_pitcher), " \u00b7 ", e("b", null, "L:"), " ", e("i", null, D.losing_pitcher), " \u00b7 ", e("b", null, "S:"), " ", e("i", null, D.save_pitcher))
                )
              ),
              e("div", { className: "mla-mod" },
                e(SecHead, { title: "Weather", note: "FIRST VISIT" }),
                e("div", { className: "mla-weather" },
                  wxCell("temp", D.weather.temperature, "Temp"),
                  wxCell("rain", D.weather.conditions, "Conditions"),
                  wxCell("wind", D.weather.wind, "Wind"),
                  wxCell("drop", D.weather.humidity, "Humidity")
                )
              )
              ),
              e("div", { className: "mla-subpanel panel fieldbox" },
              e("div", { className: "mla-mod field" },
                e(SecHead, { title: "Field Dimensions", note: D.field.orientation + " \u00b7 " + D.field.degrees + "\u00b0" }),
                e("figure", { className: "mla-fieldfig" },
                  Protractor ? e(Protractor, {
                    lf: D.field.left_field, cf: D.field.center_field,
                    rf: D.field.right_field, orientation: D.field.orientation,
                    degrees: D.field.degrees, accent: CALIENTE
                  }) : null
                )
              )
              )
            ),

            /* COLUMN 3 — STADIUM CONTEXT, frosted-glass museum panel */
            e("div", { className: "mla-col col3 panel glass" },
              e("div", { className: "mla-mod" },
                e(SecHead, { title: "Glass & Color" }),
                e("div", { className: "mla-prose" },
                  D.stadium_context.map((p, i) => e("p", { key: i }, p))
                )
              ),
              e("div", { className: "mla-col3marks" },
                e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
                e("span", { className: "div" }),
                e("span", { className: "lg" }, D.league),
                e("span", { className: "dv" }, D.division_short)
              )
            )
          )
        )
      )
    );
  }

  window.MarlinsSpread = Spread;
})();
