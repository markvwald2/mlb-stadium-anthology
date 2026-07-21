/* shea-spread.jsx — "The Fairgrounds Grid".
   Reads window.SHEA + window.SheaIcon/SheaFacade/SheaBowl/SheaProtractor.
   Left page: full-bleed aerial hero with a World's Fair color-panel signage
   title block. Right page: an exhibition-panel grid — a Stadium Section
   (route datum, three mounted photo plates, a framed Stadium Context, and a
   facts/lifecycle bay row with an embedded field protractor) and a visually
   distinct dark Visit Section scoreboard built on the Aug 16, 1990 line score. */
(function () {
  const e = React.createElement;
  const D = window.SHEA;
  const Icon = window.SheaIcon, Facade = window.SheaFacade, Bowl = window.SheaBowl, Prot = window.SheaProtractor;
  const g = D.game;
  const BLUE = "#0A2E73", ORANGE = "#E8531A", WHITE = "#E9E4D7";

  function Tab() {
    return e("div", { className: "shea-tab", "aria-hidden": "true" },
      e("i", { style: { background: BLUE } }),
      e("i", { style: { background: ORANGE } }),
      e("i", { style: { background: WHITE, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.16)" } }));
  }

  function dc(k, v, cls, st) {
    return e("div", { className: "shea-dc" },
      e("div", { className: "k" }, k),
      e("div", { className: "v " + (cls || ""), style: st || undefined }, v));
  }
  function fact(k, v) {
    if (v == null || v === "") return null;
    return e("div", { className: "shea-frow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function lrow(k, v, kStyle) {
    return e("div", { className: "shea-lrow" },
      e("div", { className: "k", style: kStyle }, k),
      e("div", { className: "v" }, v));
  }
  function gi(k, v, cls) {
    if (v == null || v === "") return null;
    return e("div", { className: "shea-girow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v " + (cls || "") }, v));
  }

  function LineScore() {
    const innings = D.innings_played;
    const heads = []; for (let i = 1; i <= innings; i++) heads.push(i);
    const away = g.box.away, home = g.box.home;
    function row(b, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, b.abbr),
        b.byInning.map((n, i) => e("td", { key: i, className: n === "x" ? "x" : "" }, n)),
        e("td", { className: "rhe sep" }, b.r),
        e("td", { className: "rhe" }, b.h),
        e("td", { className: "rhe" }, b.e));
    }
    return e("table", { className: "shea-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null, row(away, false), row(home, true)));
  }

  function Spread() {
    return e("div", { className: "shea-spread", "data-screen-label": "Shea Stadium spread" },

      /* ===== LEFT / HERO ===== */
      e("div", { className: "shea-page shea-left", "data-screen-label": "Shea Stadium hero" },
        e("div", { className: "shea-hero-slot" },
          e("image-slot", { id: "shea-hero",
            src: "images/shea/shea-stadium-00-main-6043f737.jpg",
            placeholder: "Elevated aerial \u2014 complete open-air circular bowl, blue-and-orange panel fa\u00e7ade, Flushing Meadows parkland and transit/parkway approach; skyline secondary",
            shape: "rect" })),
        e("div", { className: "shea-hero-scrim" }),
        e(Bowl, { className: "shea-hero-bowl", stroke: "#CFC9BA", op: 0.17, accent: "#E0A06A", degrees: D.orientation_degrees }),

        e("div", { className: "shea-marker" },
          e("div", { className: "panel" }),
          e("div", { className: "yrs" },
            e("div", { className: "yr", style: { textAlign: "center" } }, "1964"),
            e("div", { className: "yr bot" }, "2008"))),
        e("div", { className: "shea-hero-folio" }, "World\u2019s Fair Grounds", e("br"), "Multipurpose Era"),

        e("div", { className: "shea-hero-title" },
          e("div", { className: "shea-sign-main" },
            e("span", { className: "nm" }, "Shea Stadium"),
            e("div", { className: "shea-sign-globe" },
              Icon("globe", { size: 62, stroke: "#F4EFE3", sw: 1.7 }))),
          e("div", { className: "shea-sign-city" },
            e("span", null, D.city + ", " + D.state)),
          e("div", { className: "shea-sign-meta" },
            D.years_active + "  \u00b7  " + D.stadium_type + "  \u00b7  ",
            e("span", { className: "dem" }, D.status))),

        e("div", { className: "shea-hero-foot" },
          e("div", { className: "shea-hero-ident" },
            e("div", { className: "nm" }, D.team_short),
            e("div", { className: "sub" }, D.division)),
          e("div", { className: "shea-wells" },
            e("div", { className: "shea-well" },
              e("div", { className: "box" }, e("img", { src: "assets/new-york-mets-logo.svg", alt: "Mets" })),
              e("div", { className: "cap" }, "Mets")),
            e("div", { className: "shea-well" },
              e("div", { className: "box" }, e("img", { src: "assets/nl-logo.png", alt: "National League" })),
              e("div", { className: "cap" }, "National League")),
            e("div", { className: "shea-well" },
              e("div", { className: "box" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
              e("div", { className: "cap" }, "Major League"))))),

      /* ===== RIGHT PAGE ===== */
      e("div", { className: "shea-page shea-right" },
        e("div", { className: "shea-rp" },

          /* ---- Stadium Section header ---- */
          e("div", { className: "shea-sechead", "data-screen-label": "Stadium Section" },
            Tab(),
            e("div", { className: "htxt" },
              e("h2", null, "Stadium Section"),
              e("span", { className: "ln" }),
              e("span", { className: "eyebrow" }, D.era_short))),

          /* ---- metadata datum (route rule) ---- */
          e("div", { className: "shea-datum" },
            dc("Team", D.team_short, "orange"),
            dc("Division", "NL East", "blue"),
            dc("Classification", "Multipurpose Shared Use", "", { letterSpacing: "-0.1px" }),
            dc("Years Active", D.years_active),
            dc("Architect", D.architect, "", { letterSpacing: "0px" }),
            dc("Coordinates", D.coordinates, "mono"),
            dc("Capacity", D.capacity_current)),

          /* ---- three exhibition photo plates ---- */
          e("div", { className: "shea-plates" },
            e("div", { className: "shea-plate" },
              e("span", { className: "pnum" }, "01"),
              e("image-slot", { id: "shea-p1", src: "images/shea/shea-stadium-01.jpg", placeholder: "Blue-and-orange panel fa\u00e7ade \u00b7 exterior elevation", shape: "rect" }),
              e("span", { className: "tick" })),
            e("div", { className: "shea-plate" },
              e("span", { className: "pnum" }, "02"),
              e("image-slot", { id: "shea-p2", src: "images/shea/shea-stadium-02.jpg", placeholder: "Open-air seating bowl \u00b7 field level", shape: "rect" }),
              e("span", { className: "tick" })),
            e("div", { className: "shea-plate" },
              e("span", { className: "pnum" }, "03"),
              e("image-slot", { id: "shea-p3", src: "images/shea/shea-stadium-03v2.jpg", placeholder: "Scoreboard / outfield \u00b7 Home Run Apple", shape: "rect" }),
              e("span", { className: "tick" }))),

          /* ---- center: Stadium Context exhibition panel ---- */
          e("div", { className: "shea-context-wrap" },
            e("div", { className: "shea-context-head" },
              e("span", { className: "lab" }, "World's Fair Panels"),
              e("span", { className: "meta" }, "Flushing Meadows \u00b7 " + D.years_active)),
            e("div", { className: "shea-context" },
              D.stadium_context.map((p, i) => e("p", { key: i }, p)))),

          /* ---- bottom: data bays ---- */
          e("div", { className: "shea-bays" },

            /* Section A — Stadium Facts + Lifecycle (field diagram under
               Lifecycle), with a compact one-line lineage strip at the bottom */
            e("div", { className: "shea-bay shea-sec2" },
              e("div", { className: "shea-sec2-top" },
                e("div", { className: "shea-sec2-facts" },
                  e("div", { className: "shea-bay-hd" },
                    e("span", { className: "bt" }, "Stadium Facts"),
                    e("span", { className: "bn" }, "CONCRETE \u00b7 STEEL")),
                  fact("Surface", D.surface_type + " \u2014 " + D.surface),
                  fact("Fa\u00e7ade", D.facade),
                  fact("Style", D.architectural_style),
                  fact("Type / Roof", D.stadium_type_facts + " \u00b7 " + D.roof_type),
                  fact("Era", D.classification_era),
                  fact("Cost", D.original_cost + " \u00b7 " + D.adjusted_cost + " adj."),
                  fact("Financing", D.financing),
                  fact("Renovations", D.renovations),
                  fact("Elevation", D.elevation + " \u00b7 " + D.location),
                  fact("Address", D.address_line1 + ", " + D.address_line2 + " " + D.address_line3)),
                e("div", { className: "shea-sec2-life" },
                  e("div", { className: "shea-bay-hd" },
                    e("span", { className: "bt" }, "Lifecycle"),
                    e("span", { className: "bn" }, "CIVIC SCHEDULE")),
                  e("div", { className: "shea-life" },
                    lrow("Groundbreaking", D.construction_start, { letterSpacing: "0.4px" }),
                    lrow("Opening Day", D.opening_day),
                    lrow("All-Star Game", D.all_star_games),
                    lrow("Final Game", D.final_game),
                    lrow("Demolition", D.demolition_year)),
                  e("div", { className: "shea-life-diagram" },
                    Prot ? e(Prot, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                      orientation: D.orientation, degrees: D.orientation_degrees }) : null))),

              /* compact one-line lineage strip */
              e("div", { className: "shea-lin-strip" },
                e("span", { className: "ln-node ln-end" }, D.preceded_by),
                e("span", { className: "ln-arr" }),
                e("span", { className: "ln-node ln-cur" }, "Shea Stadium",
                  e("span", { className: "yr" }, D.years_active)),
                e("span", { className: "ln-arr" }),
                e("span", { className: "ln-node ln-end" }, D.succeeded_by))),

            /* Bay 3 — VISIT SECTION (distinct dark scoreboard) */
            e("div", { className: "shea-bay shea-visit-bay", "data-screen-label": "Visit Section" },
              e("div", { className: "shea-scoreboard" },
                e("div", { className: "shea-sb-hd" },
                  Icon("wayfind", { size: 22, stroke: "#E8531A", sw: 1.7 }),
                  e("span", { className: "bt" }, "Visit Section"),
                  e("span", { className: "eg" }, D.trip_name.toUpperCase() + " \u00b7 VISIT " + D.visit_order + " OF 42")),
                e("div", { className: "shea-sb-body" },
                  e("div", { className: "shea-sb-info" },
                    gi("Date", D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                    gi("Matchup", g.away_name + " at " + g.home_name),
                    gi("Game", D.game_kind + " \u00b7 " + D.visit_type),
                    gi("Result", g.result_line, "win"),
                    gi("First Pitch", g.first_pitch, "mono"),
                    gi("Duration", g.duration, "mono"),
                    gi("Attendance", D.attendance, "mono")),
                  e("div", { className: "shea-sb-main" },
                    e("div", { className: "shea-sb-date" },
                      e("span", null, "Line Score \u00b7 " + D.innings_played + " Innings"),
                      e("span", null, D.featured_visit_date.toUpperCase())),
                    LineScore(),
                    e("div", { className: "shea-sb-foot" },
                      e("div", { className: "shea-dec" },
                        e("div", { className: "di" }, e("span", { className: "dk" }, "W"), e("span", { className: "dv" }, g.winning_pitcher)),
                        e("div", { className: "di" }, e("span", { className: "dk" }, "L"), e("span", { className: "dv" }, g.losing_pitcher)),
                        e("div", { className: "di" }, e("span", { className: "dk" }, "SV"), e("span", { className: "dv" }, g.save_pitcher)))),
                    e("div", { className: "shea-wx" },
                      e("div", { className: "wx-icon" },
                        Icon(g.weather.sky, { size: 30, stroke: "#E8531A", sw: 1.6 })),
                      e("span", { className: "wx-deg" }, g.weather.temperature),
                      e("span", { className: "wx-cond" }, g.weather.conditions),
                      e("div", { className: "wx-metric" },
                        Icon("wind", { size: 16, stroke: "#9A937F", sw: 1.5 }),
                        e("span", { className: "wxv" }, g.weather.wind)),
                      e("div", { className: "wx-metric" },
                        Icon("drop", { size: 15, stroke: "#9A937F", sw: 1.5 }),
                        e("span", { className: "wxv" }, g.weather.humidity))),
                    e("div", { className: "shea-firstvisit" },
                      e("div", { className: "fv-head" },
                        e("span", { className: "fk" }, "First Visit"),
                        e("span", { className: "fdiv" }),
                        e("span", { className: "fdate" }, D.first_visit_day + " \u00b7 " + D.first_visit_date.replace("Aug", "August"))),
                      e("div", { className: "fv-line" },
                        e("div", { className: "fv-score" },
                          e("span", { className: "tw" }, "Mets"),
                          e("span", { className: "sc win" }, "7"),
                          e("span", { className: "dash" }, "\u2013"),
                          e("span", { className: "sc" }, "1"),
                          e("span", { className: "tl" }, "Cubs")),
                        e("span", { className: "fv-note" }, "First of two visits to Shea")),
                      e("div", { className: "fv-dec" },
                        e("span", { className: "di" }, e("span", { className: "dk" }, "W"), e("span", { className: "dv" }, D.first_visit_wp)),
                        e("span", { className: "di" }, e("span", { className: "dk" }, "L"), e("span", { className: "dv" }, D.first_visit_lp))))))))),

          /* ---- material / memory cue rail ---- */
          e("div", { className: "shea-cues" },
            D.cues.map((c, i) => e("div", { className: "shea-cue", key: i },
              e("div", { className: "t" }, c.t),
              e("div", { className: "s" }, c.s)))))));
  }

  window.SheaSpread = Spread;
})();
