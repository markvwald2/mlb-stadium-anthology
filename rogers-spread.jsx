/* rogers-spread.jsx — the single Rogers Centre spread, "The Retractable Machine".
   Reads window.ROGERS (local data) + window.RogersRoof + window.RogersProtractor.
   Left: full-bleed downtown/aerial hero, compact engineered title. Right: warm
   paper, blueprint / architectural-systems plate — a Stadium Section (photo strip,
   facts, retractable-roof section, unified context, field protractor, meta ribbon)
   and a distinct Visit Section (featured game, weather, line score, build notes).
   Royal/Navy blue + restrained red accents. Each populated value renders once. */
(function () {
  const e = React.createElement;
  const D = window.ROGERS;
  const RogersProtractor = window.RogersProtractor;
  const ROYAL = "#1453a0", NAVY = "#0e2a55", RED = "#b4232a";

  function Slot(props) {
    return e("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.src ? { src: props.src } : {}, props.style ? { style: props.style } : {}));
  }

  // crosshair target mark for the two major section heads
  function Cross() {
    return e("svg", { className: "rc-cross", width: 26, height: 26, viewBox: "0 0 26 26", fill: "none",
      stroke: NAVY, strokeWidth: 1.3 },
      e("circle", { cx: 13, cy: 13, r: 7.4 }),
      e("circle", { cx: 13, cy: 13, r: 2, fill: NAVY, stroke: "none" }),
      e("path", { d: "M13 1.4v4.2M13 20.4v4.2M1.4 13h4.2M20.4 13h4.2", strokeLinecap: "round" })
    );
  }

  function BigHead(props) {
    return e("div", { className: "rc-bighead" },
      e(Cross, null),
      e("h2", { className: "rc-bigtitle" }, props.title),
      e("span", { className: "rc-bigrule" }),
      props.sub ? e("span", { className: "rc-bigsub" }, props.sub) : null
    );
  }

  function ModHead(props) {
    return e("div", { className: "rc-modhead" },
      e("span", { className: "rc-modtitle" }, props.title),
      props.note ? e("span", { className: "rc-modnote" }, props.note) : null
    );
  }

  function factRows(rows) {
    return rows.map((row, i) =>
      e("div", { className: "rc-frow", key: i },
        e("div", { className: "k" }, row[0]),
        e("div", { className: "v" },
          e("span", { className: "vm", style: row[3] && row[3].vm ? row[3].vm : null }, row[1]),
          row[2] ? e("span", { className: "vs" }, row[2]) : null
        )
      )
    );
  }

  // ---- icons (featured-game strip + weather) ----
  function Icon(kind, stroke) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: stroke || "#fff",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "rc-ico" };
    if (kind === "group") return e("svg", c,
      e("circle", { cx: 8.5, cy: 8.5, r: 2.6 }), e("circle", { cx: 16, cy: 9, r: 2.2 }),
      e("path", { d: "M3.5 18c0-2.6 2.2-4.4 5-4.4s5 1.8 5 4.4M14.5 17.4c0-2.1 1.5-3.6 3.8-3.6 1.9 0 3.2 1.1 3.2 2.9" }));
    if (kind === "clock") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 8.4 }), e("path", { d: "M12 7.4V12l3.2 2" }));
    if (kind === "ticket") return e("svg", c,
      e("path", { d: "M3.4 8.4A1.6 1.6 0 0 0 5 6.8h14a1.6 1.6 0 0 0 1.6 1.6v2.2a1.6 1.6 0 0 0 0 3.2v2.2A1.6 1.6 0 0 0 19 17.2H5a1.6 1.6 0 0 0-1.6-1.6v-2.2a1.6 1.6 0 0 0 0-3.2z" }),
      e("path", { d: "M14 6.8v10.4", strokeDasharray: "1.6 1.8" }));
    if (kind === "timer") return e("svg", c,
      e("circle", { cx: 12, cy: 13.4, r: 7 }), e("path", { d: "M12 13.4l3-2.4M9.6 3.6h4.8M12 3.6v3" }));
    if (kind === "ball") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 8.4 }),
      e("path", { d: "M6.4 6.6c2.4 1.4 3.7 3.4 3.7 5.4s-1.3 4-3.7 5.4M17.6 6.6c-2.4 1.4-3.7 3.4-3.7 5.4s1.3 4 3.7 5.4" }));
    if (kind === "sun") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 4.2 }),
      e("path", { d: "M12 2.6v2.4M12 19v2.4M2.6 12H5M19 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7" }));
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c,
      e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    // ---- At a Glance icons ----
    if (kind === "status") return e("svg", c,
      e("path", { d: "M2.4 12h4l2.2-6 3.4 12 2.4-7 1.6 3h5" }));
    if (kind === "era") return e("svg", c,
      e("path", { d: "M4 7.2l8-3.6 8 3.6-8 3.6z" }),
      e("path", { d: "M4 12l8 3.6 8-3.6M4 16.4l8 3.6 8-3.6" }));
    if (kind === "roof") return e("svg", c,
      e("path", { d: "M3 12.4 12 5l9 7.4" }),
      e("path", { d: "M6 11.6V19h12v-7.4" }),
      e("path", { d: "M9.6 19v-3.4h4.8V19" }));
    if (kind === "pin") return e("svg", c,
      e("path", { d: "M12 21s6-5.3 6-10.2A6 6 0 0 0 6 10.8C6 15.7 12 21 12 21z" }),
      e("circle", { cx: 12, cy: 10.6, r: 2.2 }));
    if (kind === "elev") return e("svg", c,
      e("path", { d: "M2.6 19l5.2-9 3.2 5 2.6-4.4L21.4 19z" }),
      e("path", { d: "M7.8 10l1.8 3" }));
    return null;
  }

  // vintage line score; supports "x" (home didn't bat)
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
    return e("table", { className: "rc-box" },
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
        row(box.away, Number(box.away.r) > Number(box.home.r)),
        row(box.home, Number(box.home.r) > Number(box.away.r))
      )
    );
  }

  function Spread() {
    return e("div", { className: "rc-spread", "data-screen-label": "Rogers Centre spread" },

      /* ============ LEFT PAGE / HERO ============ */
      e("div", { className: "rc-page rc-left", "data-screen-label": "Rogers Centre hero (left page)" },
        e("div", { className: "rc-hero-slot" },
          e(Slot, { id: "rc-hero", src: "images/rogers/hero-stadium.jpg", placeholder: "Drop the Rogers Centre hero \u2014 elevated/aerial of the retractable-roof shell, open roof, downtown Toronto skyline & CN Tower" })
        ),
        e("div", { className: "rc-hero-scrim" }),

        // faint blueprint compass motif, lower-right over the photo
        e("svg", { className: "rc-hero-compass", width: 520, height: 520, viewBox: "0 0 520 520", fill: "none" },
          [250, 210, 168, 124].map((r, i) => e("circle", { key: i, cx: 260, cy: 260, r: r, stroke: "#cfe0f2", strokeWidth: 1, opacity: 0.18 })),
          e("path", { d: "M260 18v484M18 260h484", stroke: "#cfe0f2", strokeWidth: 1, opacity: 0.16 }),
          Array.from({ length: 24 }).map((_, i) => {
            const a = i * 15 * Math.PI / 180, x1 = 260 + 244 * Math.sin(a), y1 = 260 - 244 * Math.cos(a),
              x2 = 260 + 228 * Math.sin(a), y2 = 260 - 228 * Math.cos(a);
            return e("line", { key: "tk" + i, x1: x1, y1: y1, x2: x2, y2: y2, stroke: "#cfe0f2", strokeWidth: 1, opacity: 0.2 });
          })
        ),

        // folio, upper-right
        e("div", { className: "rc-folio" }, D.trip.toUpperCase() + "  \u00b7  VISIT " + D.visit_order),
        // spine, far-left vertical
        e("div", { className: "rc-spine" }, "EST. 1989  \u00b7  TORONTO, ONTARIO  \u00b7  CANADA"),

        // roof-track datum line near top
        e("div", { className: "rc-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "RETRACTABLE ROOF \u00b7 NNW " + D.field.bearing + "\u00b0"),
          e("span", { className: "ln" }), e("span", { className: "tk" })
        ),

        // title block, lower-left
        e("div", { className: "rc-hero-title" },
          e("h1", { className: "rc-name" }, "ROGERS", e("span", { className: "ln2" }, "CENTRE")),
          e("div", { className: "rc-sub" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)
          ),
          e("div", { className: "rc-identity" },
            e("img", { className: "rc-team-logo", src: D.home_logo, alt: "Toronto Blue Jays" }),
            e("div", { className: "rc-id-txt" },
              e("div", { className: "rc-team" }, D.team_name),
              e("div", { className: "rc-lg" },
                e("span", null, D.league), e("span", { className: "dot" }, "\u00b7"), e("span", { className: "dv" }, D.division))
            ),
            e("span", { className: "rc-id-div" }),
            e("img", { className: "rc-mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
            e("img", { className: "rc-al", src: "assets/american-league-logo.png", alt: "American League" })
          )
        )
      ),

      /* ============ RIGHT PAGE ============ */
      e("div", { className: "rc-page rc-right", "data-screen-label": "Rogers Centre data page (right page)" },
        e("div", { className: "rc-rp" },

          /* ---------- STADIUM SECTION ---------- */
          e("section", { className: "rc-stadium" },
            e(BigHead, { title: "Stadium Section" }),

            // photo strip (3 frames) — grows to fill the top of the page
            e("div", { className: "rc-strip" },
              D.strip.map((s) =>
                e("figure", { className: "rc-frame", key: s[0] },
                  e(Slot, { id: s[0], placeholder: s[1], src: s[2] })
                )
              )
            ),

            // ---- data cluster, pushed to the bottom of the page ----
            e("div", { className: "rc-dcluster" },
              // facts (full-width, two columns)
              e("div", { className: "rc-mod facts-mod" },
                e(ModHead, { title: "Stadium Facts" }),
                e("div", { className: "rc-facts twocol" }, factRows(D.facts))
              ),

              // protractor | meta row
              e("div", { className: "rc-drow" },
                e("div", { className: "rc-mod field" },
                  e(ModHead, { title: "Field Dimensions & Orientation" }),
                  e("figure", { className: "rc-fieldfig" },
                    RogersProtractor ? e(RogersProtractor, {
                      lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                      orientation: D.field.orientation, bearing: D.field.bearing, accent: RED
                    }) : null
                  )
                ),
                e("div", { className: "rc-mod meta-mod" },
                  e(ModHead, { title: "At a Glance" }),
                  e("div", { className: "rc-meta" },
                    D.meta.map((m, i) =>
                      e("div", { className: "rc-mcell", key: i },
                        e("span", { className: "micon" }, Icon(m[2], NAVY)),
                        e("span", { className: "ml" }, m[0]),
                        e("span", { className: "mv" }, m[1])
                      )
                    )
                  )
                )
              ),

              // unified stadium context (full-width, two columns)
              e("div", { className: "rc-mod context band" },
                e(ModHead, { title: "Baseball's First Retractable Roof" }),
                e("div", { className: "rc-prose" },
                  e("div", { className: "rc-pcol" },
                    e("p", null, D.stadium_context[0]),
                    e("p", null, D.stadium_context[1])
                  ),
                  e("div", { className: "rc-pcol" },
                    e("p", null, D.stadium_context[2]),
                    e("p", null, D.stadium_context[3])
                  )
                )
              )
            )
          ),

          /* ---------- VISIT SECTION ---------- */
          e("section", { className: "rc-visit" },
            e(BigHead, { title: "Visit Section" }),
            e("div", { className: "rc-visit-cap" }, D.trip.toUpperCase() + " TRIP  \u00b7  VISIT " + D.visit_order + " OF " + D.visit_total),

            // featured-visit bar
            e("div", { className: "rc-navbar" },
              e("span", { className: "lab" }, "Featured Visit"),
              e("span", { className: "sep" }, "\u00b7"),
              e("span", { className: "val" }, D.visit_day + ", " + D.visit_date)
            ),

            // stat strip
            e("div", { className: "rc-stats" },
              D.stats.map((s, i) =>
                e("div", { className: "rc-stat", key: i },
                  Icon(s[0], NAVY),
                  e("div", { className: "sv" }, s[1]),
                  e("div", { className: "sl" }, s[2])
                )
              )
            ),

            // weather
            e("div", { className: "rc-mod weather" },
              e(ModHead, { title: "Weather" }),
              e("div", { className: "rc-wx" },
                e("div", { className: "rc-wcell big" },
                  Icon("sun", "#8A8E92"),
                  e("div", { className: "tx" },
                    e("div", { className: "wv" }, D.weather.temperature),
                    e("div", { className: "wl" }, D.weather.conditions))
                ),
                e("div", { className: "rc-wcell" },
                  Icon("wind", "#8A8E92"),
                  e("div", { className: "tx" },
                    e("div", { className: "wv sm" }, D.weather.wind),
                    e("div", { className: "wl" }, "Wind"))
                ),
                e("div", { className: "rc-wcell" },
                  Icon("drop", "#8A8E92"),
                  e("div", { className: "tx" },
                    e("div", { className: "wv sm" }, D.weather.humidity),
                    e("div", { className: "wl" }, "Humidity"))
                )
              )
            ),

            // matchup
            e("div", { className: "rc-matchup" },
              e("img", { className: "mlogo", src: D.away_logo, alt: D.away_name }),
              e("div", { className: "mtxt" },
                e("div", { className: "away" }, D.away_name),
                e("div", { className: "at" }, "AT"),
                e("div", { className: "home" }, D.home_name)
              ),
              e("img", { className: "mlogo", src: D.home_logo, alt: D.home_name })
            ),

            // result bar + line score
            e("div", { className: "rc-navbar result" },
              e("span", { className: "val big" }, D.result)
            ),
            e("div", { className: "rc-mod linescore" },
              LineScore(D.box),
              e("div", { className: "rc-decgrid" },
                e("div", { className: "rc-dcol" },
                  e("span", { className: "dh" }, "Starters"),
                  e("p", null, e("b", null, D.starters.away), " ", e("i", null, "(" + D.starters.away_abbr + ")")),
                  e("p", { className: "vs" }, "vs."),
                  e("p", null, e("b", null, D.starters.home), " ", e("i", null, "(" + D.starters.home_abbr + ")"))
                ),
                e("div", { className: "rc-dcol" },
                  e("span", { className: "dh" }, "Decision"),
                  e("p", null, e("b", { className: "w" }, "W"), " ", D.decision.w),
                  e("p", null, e("b", { className: "l" }, "L"), " ", D.decision.l)
                )
              )
            ),

            // visit photo
            e("figure", { className: "rc-vphoto" },
              e(Slot, { id: D.visit_photo[0], placeholder: D.visit_photo[1], src: D.visit_photo[2] })
            ),

            // design & construction notes
            e("div", { className: "rc-mod build" },
              e(ModHead, { title: "Design & Construction" }),
              e("div", { className: "rc-facts tight" }, factRows(D.build))
            )
          )
        )
      )
    );
  }

  window.RogersSpread = Spread;
})();
