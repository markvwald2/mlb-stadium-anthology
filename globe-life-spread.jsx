/* globe-life-spread.jsx — the single Globe Life Field spread, "The Enormous Room".
   Reads window.GLOBE + window.GlobeProtractor.
   Left: full-bleed interior hero — roof volume dominant, field small & far below,
   compact engineered signage title.
   Right: pale-daylight architectural SECTION — a dark overhead roof datum, a
   clerestory metadata ribbon, the Enclosure (glass-mullion fact bays + a stacked
   glass-wall of photos + subordinate field protractor + unified Stadium Context),
   then a heavy truss rule and the Visit scorekeeper insert with a dominant line
   score. Rangers royal/red are navigation accents only. */
(function () {
  const e = React.createElement;
  const D = window.GLOBE;
  const GlobeProtractor = window.GlobeProtractor;
  const BLUE = "#003278";

  function Slot(props) {
    // Photos referenced as real downscaled files via `src` (not data-URLs in the
    // sidecar) so .image-slots.state.json stays under the host writeFile cap and
    // recrops persist as tiny framing-only {s,x,y} entries.
    const a = { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect" };
    if (props.src) a.src = props.src;
    if (props.style) a.style = props.style;
    return e("image-slot", a);
  }

  // section eyebrow signage: structural label on a hairline
  function SecHead(props) {
    return e("div", { className: "glf-h" + (props.dark ? " dark" : "") },
      e("span", { className: "idx" }),
      e("span", { className: "t" }, props.title),
      props.sub ? e("span", { className: "s" }, props.sub) : null,
      props.note ? e("span", { className: "n" }, props.note) : null
    );
  }

  // weather glyphs
  function WxIcon(kind) {
    const c = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none",
      stroke: "#41494E", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "glf-wico" };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    if (kind === "temp") return e("svg", c,
      e("path", { d: "M12 3.5a2.2 2.2 0 0 1 2.2 2.2v8.1a3.6 3.6 0 1 1-4.4 0V5.7A2.2 2.2 0 0 1 12 3.5z" }),
      e("path", { d: "M12 9.5v5.2" }));
    if (kind === "moon") return e("svg", c,
      e("path", { d: "M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z" }));
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c,
      e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label) {
    return e("div", { className: "glf-wcell" },
      WxIcon(icon),
      e("div", { className: "tx" },
        e("div", { className: "wv" }, value),
        e("div", { className: "wl" }, label))
    );
  }

  // fact bay (glass curtain-wall panel)
  function Bay(bay, i) {
    const row2 = i >= 3;
    const rowstart = i === 0 || i === 3;
    const span = i < 3 ? 4 : (i === 3 ? 4 : 5);
    return e("div", { className: "glf-bay" + (row2 ? " row2" : "") + (rowstart ? " rowstart" : ""),
      key: i, style: { gridColumn: "span " + span } },
      e("div", { className: "glf-bay-cat" }, bay.cat),
      e("div", { className: "glf-bay-rows" },
        bay.rows.map((r, j) =>
          e("div", { className: "glf-bay-row", key: j },
            e("span", { className: "bk" }, r[0]),
            e("span", { className: "bv", style: r[2] && r[2].ls ? { letterSpacing: r[2].ls } : undefined }, r[1])
          )
        )
      )
    );
  }

  // dominant line score — scorekeeper insert
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
    return e("table", { className: "glf-box" },
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
    const v = D.visit;
    return e("div", { className: "glf-spread", "data-screen-label": "Globe Life Field spread" },

      /* ============ LEFT PAGE / INTERIOR HERO ============ */
      e("div", { className: "glf-page glf-left", "data-screen-label": "Globe Life Field hero (left)" },
        e("div", { className: "glf-hero-slot" },
          e(Slot, { id: "globe-hero", src: "images/globe/hero-main-print.jpg", placeholder: "Drop the Globe Life Field INTERIOR hero \u2014 high vantage looking down: roof trusses & retractable panels dominate, glass outfield wall, hanging scoreboards, the green field small & far below. Upper half = architectural airspace." })
        ),
        e("div", { className: "glf-hero-scrim" }),

        // overhead roof-truss datum spanning the upper airspace
        e("div", { className: "glf-trussdatum" },
          e("span", { className: "cap" }, "ROOF STRUCTURE"),
          e("span", { className: "ln" }),
          e("span", { className: "tk" }), e("span", { className: "tk" }), e("span", { className: "tk" }),
          e("span", { className: "tk" }), e("span", { className: "tk" }),
          e("span", { className: "ln" }),
          e("span", { className: "cap r" }, "VISIT 36 / 42")
        ),

        // upper-left wayfinding mark
        e("img", { className: "glf-hero-logo", "data-lg": "", src: "assets/texas-rangers-logo.svg", alt: "Texas Rangers" }),
        e("div", { className: "glf-spine" }, "GLOBE LIFE FIELD  \u00b7  ARLINGTON, TEXAS  \u00b7  THE ENORMOUS ROOM" ),

        // compact engineered signage title, lower-left
        e("div", { className: "glf-hero-title" },
          e("div", { className: "glf-titlerow" },
            e("h1", { className: "glf-name" },
              D.name_lines.map((ln, i) => e("span", { className: "ln", key: i }, ln))
            ),
            e("div", { className: "glf-loc" },
              e("span", { className: "l1" }, D.city),
              e("span", { className: "l2" }, D.state)
            )
          )
        ),

        // colophon — league marks, bottom-right
        e("div", { className: "glf-marks" },
          e("img", { className: "mlb", "data-lg": "", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("img", { className: "al", "data-lg": "", src: "assets/american-league-logo.png", alt: "American League" })
        )
      ),

      /* ============ RIGHT PAGE / ARCHITECTURAL SECTION ============ */
      e("div", { className: "glf-page glf-right", "data-screen-label": "Globe Life Field editorial (right)" },
        e("div", { className: "glf-rp" },

          /* ---- DARK OVERHEAD ROOF DATUM ---- */
          e("div", { className: "glf-roof" },
            e("span", { className: "wf" }, "GLOBE LIFE FIELD"),
            e("span", { className: "tkrow" },
              Array.from({ length: 22 }).map((_, i) => e("span", { className: "tk", key: i }))
            ),
            e("span", { className: "wf r" }, "ARLINGTON, TEXAS")
          ),

          e("div", { className: "glf-inner" },

            /* ---- CLERESTORY METADATA RIBBON ---- */
            e("div", { className: "glf-ribbon" },
              e("div", { className: "cell marks" },
                e("img", { src: "assets/texas-rangers-logo.svg", alt: "Texas Rangers" }),
                e("img", { className: "al", src: "assets/american-league-logo.png", alt: "American League" })
              ),
              D.ribbon.map((c, i) =>
                e("div", { className: "cell", key: i },
                  e("div", { className: "rl" }, c[0]),
                  e("div", { className: "rv" }, c[1])
                )
              )
            ),

            /* ---- BODY: data spine + glass-wall rail ---- */
            e("div", { className: "glf-body" },

              // data spine: enclosure fact bays, then unified Stadium Context
              e("div", { className: "glf-dataspine" },
                e(SecHead, { title: "The Enclosure", sub: "Stadium", note: "Architecture \u00b7 Cost \u00b7 Structure \u00b7 Site \u00b7 Lifecycle \u00b7 Field Geometry" }),
                e("div", { className: "glf-bays" },
                  D.bays.map(Bay),
                  e("div", { className: "glf-bay row2", style: { gridColumn: "span 3" }, key: "fg" },
                    e("div", { className: "glf-bay-cat" },
                      e("span", null, "Field Geometry")
                    ),
                    e("div", { className: "glf-fieldwrap" },
                      e("figure", { className: "glf-fieldfig" },
                        GlobeProtractor ? e(GlobeProtractor, {
                          lf: D.field.left_field, cf: D.field.center_field,
                          rf: D.field.right_field, orientation: D.field.orientation,
                          degrees: D.field.degrees, accent: BLUE
                        }) : null
                      ),
                      e("span", { className: "fo" }, D.field.orientation + " \u00b7 " + D.field.degrees + "\u00b0")
                    )
                  )
                ),
                e("div", { className: "glf-context" },
                  e(SecHead, { title: "The Glass Enclosure" }),
                  e("div", { className: "glf-prose" },
                    e("div", { className: "glf-col" }, D.stadium_context.slice(0, 2).map((p, i) => e("p", { key: "a" + i }, p))),
                    e("div", { className: "glf-col" }, D.stadium_context.slice(2).map((p, i) => e("p", { key: "b" + i }, p)))
                  )
                )
              ),

              // glass wall: stacked transparency / structure plates
              e("div", { className: "glf-rail" },
                D.glasswall.map((s, i) =>
                  e("figure", { className: "glf-plate", key: i },
                    e(Slot, { id: s[0], placeholder: s[1], src: s[2] })
                  )
                )
              )
            ),

            /* ---- TRUSS-SPAN RULE ---- */
            e("div", { className: "glf-truss" }),

            /* ---- THE VISIT (scorekeeper insert) ---- */
            e("div", { className: "glf-visit" },
              e(SecHead, { title: "The Visit", sub: "No. " + v.no + " of " + v.total,
                note: v.title + " \u00b7 " + v.trip + " trip \u00b7 " + v.day + ", " + v.date }),

              e("div", { className: "glf-visit-grid" },

                // dominant line score
                e("div", { className: "glf-score" },
                  e("div", { className: "glf-result" },
                    e("span", { className: "rt" }, v.away_team),
                    e("span", { className: "rn win" }, D.box.away.r),
                    e("span", { className: "vs" }, "\u2014" ),
                    e("span", { className: "rn" }, D.box.home.r),
                    e("span", { className: "rt rtr" }, v.home_team)
                  ),
                  LineScore(D.box),
                  e("div", { className: "glf-dec" },
                    e("span", null, e("b", null, "W"), " ", e("i", null, v.winning_pitcher)),
                    e("span", { className: "sp" }, "\u00b7"),
                    e("span", null, e("b", null, "L"), " ", e("i", null, v.losing_pitcher)),
                    e("span", { className: "sp" }, "\u00b7"),
                    e("span", null, "Final \u00b7 ", D.box.innings, " innings")
                  )
                ),

                // weather strip + pitching matchup + game details
                e("div", { className: "glf-visit-side" },
                  e("div", { className: "glf-weather" },
                    wxCell("temp", D.weather.temperature, "Temp"),
                    wxCell("moon", D.weather.conditions, "Conditions"),
                    wxCell("wind", D.weather.wind, "Wind"),
                    wxCell("drop", D.weather.humidity, "Humidity")
                  ),
                  vfact("Pitching Matchup", v.away_starter + " (" + v.away_abbr + ") vs " + v.home_starter + " (" + v.home_abbr + ")"),
                  e("div", { className: "glf-vfacts" },
                    vfact("First Pitch", v.first_pitch),
                    vfact("Duration", v.duration),
                    vfact("Attendance", v.attendance)
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  function vfact(k, val) {
    return e("div", { className: "glf-vf" },
      e("span", { className: "k" }, k),
      e("span", { className: "v" }, val)
    );
  }

  window.GlobeLifeSpread = Spread;
})();
