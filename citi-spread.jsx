/* citi-spread.jsx — Citi Field anthology spread, concept "The Rotunda Grid."
   The Jackie Robinson Rotunda's arched masonry arcade organizes the right page:
   arched photo bays (the arcade), a limestone metadata datum, then two visually
   distinct zones — STADIUM SECTION (architectural, museum-spec) above, VISIT
   SECTION (modern scorecard) below. Brick piers, limestone bands, granite rules;
   quiet NY-monogram interlock registration (paired blue/orange strokes). Reads
   window.CITI and window.CitiProtractor. Mets royal blue + orange are restrained
   accents only — limestone, granite, and brick carry the page. */
(function () {
  const e = React.createElement;
  const D = window.CITI;
  const Prot = window.CitiProtractor;

  /* arched masonry bay — image-slot inside a brick frame with a round-arch crown */
  function Bay(props) {
    return e("div", { className: "cf-bay" },
      e("div", { className: "cf-bay-frame" },
        e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" })),
      e("span", { className: "cf-bay-key", "aria-hidden": "true" }));
  }

  /* quiet NY-monogram interlock registration: one blue vertical + one orange
     horizontal stroke crossing. Abstract alignment mark, never logo-like. */
  function Interlock() {
    return e("span", { className: "cf-interlock", "aria-hidden": "true" },
      e("span", { className: "v" }), e("span", { className: "h" }));
  }

  function ZoneHead(num, title) {
    return e("div", { className: "cf-zoneh" },
      e("span", { className: "key" }, num),
      e("span", { className: "t" }, title),
      e("span", { className: "arch", "aria-hidden": "true" }),
      Interlock());
  }

  function factRow(k, v, cls) {
    var parts = String(v).split("\n").filter(function (s) { return s.trim().length; });
    var vnode = parts.length > 1
      ? parts.map(function (p, i) { return e("div", { key: i, className: "vline" }, p); })
      : v;
    return e("div", { className: "cf-row" + (cls ? " " + cls : ""), key: k },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, vnode));
  }
  function ribCell(k, v, extra) {
    return e("div", { className: "cf-rc" + (extra ? " " + extra : "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function finCell(k, v, cls) {
    return e("div", { className: "cf-fc " + (cls || "") },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function gstat(k, v) {
    return e("div", { className: "cf-gs" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }

  /* one team row in the featured-game "versus ledger": logo, name, away/home +
     abbr, a W/L mark, and the run total as a hero numeral. Winner row accented. */
  function teamRow(opts) {
    return e("div", { className: "cf-trow " + opts.team + (opts.win ? " win" : "") },
      e("img", { className: "logo", src: opts.logo, alt: opts.name }),
      e("div", { className: "id" },
        e("div", { className: "nm" }, opts.name),
        e("div", { className: "mt" }, opts.side + " \u00b7 " + opts.abbr)),
      e("span", { className: "wl" }, opts.win ? "W" : "L"),
      e("div", { className: "runs" }, String(opts.runs)));
  }

  function wxIcon(kind) {
    const c = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5447", strokeWidth: 1.35, strokeLinecap: "round", strokeLinejoin: "round", className: "cf-wx-ico" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "cloud") return e("svg", c, e("path", { d: "M7 18h9a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7 11a3.5 3.5 0 0 0 0 7z" }), e("path", { d: "M16.5 7.5a2.6 2.6 0 0 1 3 1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }
  function wx(icon, val, lab) {
    return e("div", { className: "cf-wx" },
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
    return e("table", { className: "cf-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function Spread() {
    return e("div", { className: "cf-spread", "data-screen-label": "Citi Field spread" },

      /* ===================== LEFT PAGE / HERO ===================== */
      e("div", { className: "cf-page cf-left", "data-screen-label": "Citi Field hero" },
        e("div", { className: "cf-hero-slot" },
          e("image-slot", { id: "citi-hero", shape: "rect",
            placeholder: "Drop the Citi Field aerial \u2014 Jackie Robinson Rotunda + brick facade, seating bowl, Flushing Meadows rail / parkways / parking, Manhattan skyline beyond" })),
        e("div", { className: "cf-hero-scrim" }),
        e("div", { className: "cf-hero-grid", "aria-hidden": "true" }),

        /* drafting registration bracket + folio (top-left) */
        e("div", { className: "cf-bracket tl", "aria-hidden": "true" }),
        e("div", { className: "cf-hero-folio" },
          e("span", { className: "tick" }), e("span", null, D.folio)),

        /* carved-stone signage title block (lower-left) */
        e("div", { className: "cf-hero-plate" },
          e("div", { className: "cf-hero-eyebrow" }, "National League \u00b7 NL East"),
          e("h1", { className: "cf-hero-name" }, "Citi Field"),
          e("div", { className: "cf-hero-rule" }, e("span", { className: "arch", "aria-hidden": "true" })),
          e("div", { className: "cf-hero-sub" },
            e("span", { className: "city" }, D.city + ", " + D.state),
            e("span", { className: "midf" }, "\u2014"),
            e("span", { className: "est" }, "Est. ", e("em", null, "2009")))),

        /* hero footer — marks + colophon */
        e("div", { className: "cf-hero-marks" },
          e("img", { className: "cap", src: "assets/new-york-mets-logo.svg", alt: "New York Mets" }),
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
        e("div", { className: "cf-hero-colophon" },
          e("span", null, D.address),
          e("span", { className: "dot" }, "\u25AA"),
          e("span", null, D.coordinates_n + ", " + D.coordinates_w),
          e("span", { className: "dot" }, "\u25AA"),
          e("span", null, "Elev. ", e("em", { className: "hl" }, D.elevation)))
      ),

      /* ===================== RIGHT PAGE ===================== */
      e("div", { className: "cf-page cf-right" },
        e("div", { className: "cf-rp" },

          /* --- arched photo arcade (rotunda bays) --- */
          e("div", { className: "cf-arcade" },
            e(Bay, { id: "citi-p1", placeholder: "Jackie Robinson Rotunda / brick facade" }),
            e(Bay, { id: "citi-p2", placeholder: "Seating bowl + field" }),
            e(Bay, { id: "citi-p3", placeholder: "Scoreboard" }),
            e(Bay, { id: "citi-p4", placeholder: "Open concourse" }),
            e(Bay, { id: "citi-p5", placeholder: "Plaza / Flushing Meadows context" })),

          /* --- limestone metadata datum ribbon --- */
          e("div", { className: "cf-ribbon" },
            e("div", { className: "cf-rc brand" },
              e("img", { className: "cap", src: "assets/new-york-mets-logo.svg", alt: "New York Mets" }),
              e("div", { className: "id" },
                e("div", { className: "team" }, D.team_name),
                e("div", { className: "sub" }, D.league),
                e("div", { className: "sub" }, D.division))),
            ribCell("Classification", D.classification_era),
            ribCell("Years Active", D.years_active),
            e("div", { className: "cf-rc status" },
              e("div", { className: "k" }, "Status"),
              e("div", { className: "v" }, D.status)),
            e("div", { className: "cf-rc asg" },
              e("div", { className: "k" }, "All-Star Game"),
              e("div", { className: "v big" }, D.all_star_game)),
            e("div", { className: "cf-rc cap-cell" },
              e("div", { className: "k" }, "Capacity"),
              e("div", { className: "v big" }, D.capacity_opening)),
            e("div", { className: "cf-rc vo" },
              e("div", { className: "k" }, "Visit Order"),
              e("div", { className: "v big" }, D.visit_order + " of " + D.visit_total))),

          /* ===== STADIUM SECTION ===== */
          e("div", { className: "cf-zone stadium" },
            ZoneHead("I", "Stadium Section"),
            e("div", { className: "cf-stadium-cols" },

              /* col A: facts table */
              e("div", { className: "cf-facts-col" },
                e("div", { className: "cf-modh" }, "Stadium Facts"),
                e("div", { className: "cf-table" },
                  D.facts.map((f) => factRow(f[0], f[1])))),

              /* col B: architecture notes + field plan */
              e("div", { className: "cf-arch-col" },
                e("div", { className: "cf-modh" }, "Architecture"),
                e("div", { className: "cf-arch" },
                  e("div", { className: "ab" },
                    e("div", { className: "k" }, "Style"),
                    e("div", { className: "v" }, D.architectural_style)),
                  e("div", { className: "ab" },
                    e("div", { className: "k" }, "Facade"),
                    e("div", { className: "v" }, D.facade_material)),
                  e("div", { className: "ab" },
                    e("div", { className: "k" }, "Renovations"),
                    e("div", { className: "v" }, D.renovations))),
                e("figure", { className: "cf-fieldplan" },
                  e("figcaption", { className: "cf-modh sm" }, "Field Plan"),
                  Prot ? e(Prot, {
                    lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                    orientation: D.field.orientation, bearing: D.field.bearing
                  }) : null,
                  e("div", { className: "cf-fp-cap" },
                    e("span", null, "Orientation " + D.field.orientation + " \u00b7 " + D.field.bearing + "\u00b0"),
                    e("span", null, "LF \u00b7 CF \u00b7 RF (ft)")))),

              /* col C: unified Stadium Context */
              e("div", { className: "cf-ctx-block" },
                e("div", { className: "cf-modh" }, "Stadium Context"),
                e("div", { className: "cf-ctx" },
                  D.context.map(function (p, i) {
                    var ls = ["0.2px", "0.2px", "0px", "0.2px"];
                    return e("p", { key: i, style: { letterSpacing: ls[i] != null ? ls[i] : "0.2px" } }, p);
                  })))
            )),

          /* ===== VISIT SECTION ===== */
          e("div", { className: "cf-zone visit" },
            ZoneHead("II", "Group Visit"),
            e("div", { className: "cf-visit-grid" },

              /* featured game — versus ledger */
              e("div", { className: "cf-game" },
                e("div", { className: "cf-game-head" },
                  e("span", { className: "eyebrow" }, "Trip \u00b7 " + D.trip_name),
                  e("span", { className: "fin" }, "Final \u00b7 " + D.box.innings + " IN")),
                e("div", { className: "cf-game-date" }, D.featured_day + ", " + D.featured_date),
                e("div", { className: "cf-versus" },
                  teamRow({ team: "reds", logo: "assets/reds.svg", name: D.away_team,
                    abbr: D.away_abbr, side: "Away", runs: D.box.away.r,
                    win: D.box.away.r > D.box.home.r }),
                  teamRow({ team: "mets", logo: "assets/new-york-mets-logo.svg", name: D.home_team,
                    abbr: D.home_abbr, side: "Home", runs: D.box.home.r,
                    win: D.box.home.r > D.box.away.r })),
                e("div", { className: "gmeta" },
                  gstat("Attendance", D.attendance),
                  gstat("First Pitch", D.first_pitch),
                  gstat("Duration", D.game_duration))),

              /* line score */
              e("div", { className: "cf-score" },
                e("div", { className: "cf-modh sm" }, "Line Score \u00b7 " + D.box.innings + " Innings"),
                LineScore(D.box),
                e("div", { className: "cf-pitch" },
                  e("div", { className: "pr" },
                    e("span", { className: "k" }, "Matchup"),
                    e("span", { className: "v" }, D.matchup_line)),
                  e("div", { className: "pr" },
                    e("span", { className: "k" }, "Decisions"),
                    e("span", { className: "v" }, D.decisions_line))),
                e("div", { className: "cf-note" },
                  e("span", { className: "lab" }, "Game Note"),
                  e("span", { className: "txt" }, D.game_note))),

              /* weather */
              e("div", { className: "cf-weatherwrap" },
                e("div", { className: "cf-modh sm" }, "Weather"),
                e("div", { className: "cf-weather" },
                  wx("temp", D.weather.temperature, "Temp"),
                  wx("cloud", D.weather.conditions, "Sky"),
                  wx("wind", D.weather.wind, "Wind"),
                  wx("drop", D.weather.humidity, "Humidity")))
            )),

          /* --- construction & finance datum (footer band) --- */
          e("div", { className: "cf-finance" },
            finCell("Opened", D.opening_day),
            finCell("Construction Started", D.construction_start),
            e("div", { className: "cf-fc cost" },
              e("div", { className: "k" }, "Cost"),
              e("div", { className: "v big" }, D.stadium_cost),
              e("div", { className: "v adj" }, D.stadium_cost_adjusted + " adjusted")),
            finCell("Financing", D.financing_method, "wide"),
            e("div", { className: "cf-fc marks" },
              e("img", { className: "league", src: "assets/nl-logo.png", alt: "National League" }),
              e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })))
        )
      )
    );
  }

  window.CitiSpread = Spread;
})();
