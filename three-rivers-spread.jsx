/* three-rivers-spread.jsx — "The Concrete Confluence".
   Reads window.THREE_RIVERS + window.TRSField/TRSBowl/TRSSurvey/TRSIcon.
   Left page: full-bleed hero. Right page: two zones — Stadium Section (left)
   and Visit Section (right) — separated, neither crossing the fold/gutter.
   Visit Section renders the Aug 14, 1990 DOUBLEHEADER as two parallel game blocks. */
(function () {
  const e = React.createElement;
  const D = window.THREE_RIVERS;
  const Survey = window.TRSSurvey, Icon = window.TRSIcon, Prot = window.TRSProtractor, Pop = window.TRSPopcorn;
  const GOLD_P = "#EEBB45";

  function Confluence() {
    return e("svg", { viewBox: "0 0 160 134", role: "img", "aria-label": "Confluence of Pittsburgh's three rivers" },
      e("path", { d: "M12 12 C 44 34 62 58 80 88", fill: "none", stroke: GOLD_P, strokeWidth: 3.2, strokeLinecap: "round", opacity: 0.9 }),
      e("path", { d: "M148 12 C 116 34 98 58 80 88", fill: "none", stroke: GOLD_P, strokeWidth: 3.2, strokeLinecap: "round", opacity: 0.9 }),
      e("path", { d: "M80 88 C 73 106 57 120 38 130", fill: "none", stroke: GOLD_P, strokeWidth: 4.6, strokeLinecap: "round" }),
      e("circle", { cx: 80, cy: 88, r: 4.6, fill: GOLD_P }));
  }

  function Slot(p) {
    var a = { id: p.id, placeholder: p.placeholder, shape: "rect" };
    if (p.src) a.src = p.src;
    return e("image-slot", a);
  }

  /* ---------- helpers ---------- */
  function fact(k, v, opts) {
    if (v == null || v === "") return null;
    const vProps = { className: "v" };
    if (opts && opts.style) vProps.style = opts.style;
    const rowCls = "trs-frow" + (opts && opts.cls ? " " + opts.cls : "");
    if (typeof v === "string" && v.indexOf("<") !== -1) {
      vProps.dangerouslySetInnerHTML = { __html: v };
      return e("div", { className: rowCls },
        e("div", { className: "k" }, k),
        e("div", vProps));
    }
    return e("div", { className: rowCls },
      e("div", { className: "k" }, k),
      e("div", vProps, v));
  }

  function LineScore(box, innings) {
    const heads = []; for (let i = 1; i <= innings; i++) heads.push(i);
    function tr(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: n === "x" ? "x" : "" }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "trs-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null,
        tr(box.away, box.away.r > box.home.r),
        tr(box.home, box.home.r > box.away.r)));
  }

  function scoreLine(name, runs, win) {
    return e("div", { className: "trs-sline" + (win ? " win" : "") },
      e("span", { className: "nm" }, name),
      e("span", { className: "sc" }, runs));
  }

  function decItem(k, v) {
    if (!v) return null;
    return e("div", { className: "di" }, e("span", { className: "dk" }, k), e("span", { className: "dv" }, v));
  }

  function gameWx(g) {
    const w = g.weather;
    return e("div", { className: "trs-gwx" },
      Icon(w.sky, { size: 20, stroke: "#3A3833", sw: 1.4 }),
      e("div", { className: "tc" },
        e("span", { className: "deg" }, w.temperature),
        e("span", { className: "cond" }, w.conditions)),
      e("div", { className: "wm" },
        e("div", { className: "wi" }, e("span", { className: "k" }, "Wind"), e("span", { className: "v" }, w.wind)),
        e("div", { className: "wi" }, e("span", { className: "k" }, "Humidity"), e("span", { className: "v" }, w.humidity))));
  }

  function vfRow(k, v) {
    return e("div", { className: "vf-row" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }

  function GameBlock(g) {
    const homeWin = g.home_runs > g.away_runs;
    return e("div", { className: "trs-game", key: g.no },
      e("div", { className: "trs-gbar" },
        e("span", { className: "tag" }, "GAME " + g.no),
        e("span", { className: "ttl" }, g.away_name.toUpperCase() + "  AT  " + g.home_name.toUpperCase())),
      e("div", { className: "trs-gbody" },
        // left — score + starters + decision
        e("div", { className: "trs-gleft" },
          e("div", { className: "trs-score" },
            scoreLine(g.home_name, g.home_runs, homeWin),
            scoreLine(g.away_name, g.away_runs, !homeWin)),
          e("div", { className: "trs-starters" },
            e("div", { className: "lbl" }, "Starting Pitchers"),
            e("div", { className: "sp" }, g.away_starter + " (" + g.away_abbr + ")",
              e("span", { className: "vs" }, "vs.")),
            e("div", { className: "sp" }, g.home_starter + " (" + g.home_abbr + ")")),
          e("div", { className: "trs-dec" },
            e("div", { className: "lbl" }, "Decision"),
            decItem("W", g.winning_pitcher),
            decItem("L", g.losing_pitcher),
            decItem("SV", g.save_pitcher))),
        // right — line score + clock + this game's weather
        e("div", { className: "trs-gright" },
          LineScore(g.box, D.innings_played),
          e("div", { className: "trs-gmeta" },
            e("div", { className: "gm" },
              e("span", { className: "k" }, "First Pitch"),
              e("span", { className: "v" }, g.first_pitch)),
            e("div", { className: "gm clock" },
              Icon("clock", { size: 17, stroke: "#5A5750", sw: 1.4 }),
              e("span", { className: "v" }, g.duration))),
          gameWx(g))));
  }

  function wxCell(g) {
    const w = g.weather;
    return e("div", { className: "trs-wxc" },
      e("div", { className: "top" },
        Icon(w.sky, { size: 22, stroke: "#3A3833", sw: 1.4 }),
        e("span", { className: "deg" }, w.temperature)),
      e("div", { className: "gl" }, "Game " + g.no + " \u00b7 " + w.conditions),
      e("div", { className: "rows" },
        e("div", { className: "wr" }, e("span", { className: "k" }, "Wind"), e("span", { className: "v" }, w.wind)),
        e("div", { className: "wr" }, e("span", { className: "k" }, "Humidity"), e("span", { className: "v" }, w.humidity))));
  }

  /* ---------- spread ---------- */
  function Spread() {
    const g1 = D.games[0], g2 = D.games[1];
    return e("div", { className: "trs-spread", "data-screen-label": "Three Rivers Stadium spread" },

      /* ===== LEFT / HERO ===== */
      e("div", { className: "trs-page trs-left" },
        e("div", { className: "trs-hero-slot" },
          e("image-slot", { id: "trs-hero", src: "images/three-rivers/hero-main.jpg", placeholder: "Aerial hero \u2014 circular bowl, three-river confluence, bridges & downtown Pittsburgh", shape: "rect" })),
        e("div", { className: "trs-hero-scrim" }),
        e(Survey, { className: "trs-survey-bl", stroke: "#E3CB7C", op: 0.5 }),
        e(Survey, { className: "trs-survey-br", stroke: "#E3CB7C", op: 0.42 }),
        e("div", { className: "trs-hero-crest" },
          e("img", { src: "assets/pirates-p.svg", className: "pmark", "data-lg": "", alt: "Pittsburgh Pirates" }),
          e("div", { className: "tt" },
            e("div", { className: "nm" }, D.team_name),
            e("div", { className: "sub" }, D.league + "  \u00b7  " + D.division))),
        e("div", { className: "trs-hero-title" },
          e("div", { className: "trs-hero-eyebrow" },
            e("span", null, "Pittsburgh"),
            e("span", { className: "dd" }),
            e("span", null, "Confluence of Three Rivers")),
          e("h1", { className: "trs-hero-name" },
            e("span", { className: "l1 trs-ds", "data-t": "Three Rivers" }, "Three Rivers"),
            e("span", { className: "l2 trs-ds", "data-t": "Stadium" }, "Stadium"))),
        e("div", { className: "trs-hero-foot" },
          e("div", { className: "trs-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "trs-hero-meta" },
            D.years_active + "  \u00b7  " + D.stadium_type + "  \u00b7  ",
            e("span", { className: "dem" }, D.status)),
          e("div", { className: "trs-hero-rivers" },
            e("span", null, "Allegheny"),
            e("span", { className: "sep" }, "\u00b7"),
            e("span", null, "Monongahela"),
            e("span", { className: "sep" }, "\u2192"),
            e("span", null, "Ohio")))),

      /* ===== RIGHT PAGE ===== */
      e("div", { className: "trs-page trs-right" },
        e("div", { className: "trs-rp" },

          /* ---- STADIUM SECTION ---- */
          e("section", { className: "trs-stadium", "data-screen-label": "Stadium Section" },
            e("div", { className: "trs-sechead" },
              Icon("crosshair", { size: 26, stroke: "#23211C", sw: 1.5 }),
              e("h2", null, "Stadium Section"),
              e("span", { className: "ln" })),

            e("div", { className: "trs-photos" },
              e(Slot, { id: "trs-p1", src: "images/three-rivers/p-exterior.jpg", placeholder: "Exterior \u00b7 exposed concrete bowl" }),
              e(Slot, { id: "trs-p2", src: "images/three-rivers/p-interior.jpg", placeholder: "Interior \u00b7 baseball configuration" }),
              e(Slot, { id: "trs-p3", src: "images/three-rivers/p-scoreboard.png", placeholder: "Scoreboard / upper deck" })),

            e("div", { className: "trs-facts" },
              e("div", { className: "fcol" },
                fact("Opened", D.opened),
                fact("Years Active", D.years_active),
                fact("Construction", D.construction_start),
                fact("Opening Day", D.opening_day),
                fact("All-Star Games", "1974, 1994", { cls: "allstar" }),
                fact("Final Game", D.final_game),
                fact("Demolition", D.demolition_year),
                fact("Status", D.status),
                fact("Capacity", D.capacity_opening + " \u2192 " + D.capacity_current),
                fact("Surface", D.surface_type + " \u2014 " + D.surface),
                fact("Architect", D.architect),
                fact("Type", D.stadium_type_facts, { style: { letterSpacing: "-0.7px" } }),
                fact("Style", D.architectural_style),
                fact("Renovations", D.renovations)),
              e("div", { className: "fcol" },
                fact("Roof", D.roof_type),
                fact("Fa\u00e7ade", D.facade),
                fact("Location", D.location),
                fact("Elevation", D.elevation),
                fact("Coordinates", D.coordinates),
                fact("Address", D.address),
                fact("Era", D.classification_era),
                fact("Preceded By", D.preceded_by),
                fact("Succeeded By", D.succeeded_by),
                fact("Cost", D.original_cost + " (" + D.adjusted_cost + " adj.)"),
                fact("Financing", D.financing))),

            e("div", { className: "trs-context" },
              e("img", { src: "popcorn-bucket.svg?v=5", className: "trs-ctx-wm", alt: "" }),
              D.stadium_context.map((p, i) => e("p", { key: i, style: { lineHeight: "17.55px" } }, p)))),

          /* ---- divider ---- */
          e("div", { className: "trs-zonerule" }),

          /* ---- VISIT SECTION ---- */
          e("section", { className: "trs-visit", "data-screen-label": "Visit Section" },
            e("div", { className: "trs-sechead visit" },
              e("h2", null, "Visit Section"),
              e("span", { className: "eyebrow" }, D.trip_name.toUpperCase() + " TRIP \u00b7 VISIT " +
                D.visit_order + " OF 42")),

            /* featured visit panel */
            e("div", { className: "trs-featbar" }, "FEATURED VISIT \u00b7 " +
              D.featured_visit_day.toUpperCase() + ", " + D.featured_visit_date.toUpperCase()),
            e("div", { className: "trs-featgrid" },
              e("div", { className: "fc" }, Icon("group", { size: 24, stroke: "#23211C", sw: 1.4 }),
                e("div", { className: "lab" }, D.visit_type)),
              e("div", { className: "fc" }, Icon("moon", { size: 22, stroke: "#23211C", sw: 1.4 }),
                e("div", { className: "lab" }, D.game_kind),
                e("div", { className: "sub" }, "Twi-Night")),
              e("div", { className: "fc" }, Icon("clock", { size: 22, stroke: "#23211C", sw: 1.4 }),
                e("div", { className: "lab two" }, g1.first_pitch.replace(" EDT", "")),
                e("div", { className: "lab two" }, g2.first_pitch.replace(" EDT", "")),
                e("div", { className: "sub" }, "First Pitch")),
              e("div", { className: "fc" }, Icon("ticket", { size: 22, stroke: "#23211C", sw: 1.4 }),
                e("div", { className: "lab" }, D.attendance),
                e("div", { className: "sub" }, "Attendance"))),

            /* the doubleheader — two parallel game records, each with its own weather */
            e("div", { className: "trs-games" }, GameBlock(g1), GameBlock(g2)),

            /* field-dimensions plate — fills the lower visit whitespace */
            e("div", { className: "trs-vfield" },
              e("div", { className: "vf-body" },
                Prot ? e(Prot, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                  orientation: D.orientation, degrees: D.orientation_degrees }) : null,
                e("div", { className: "vf-data" },
                  vfRow("Left Field", D.left_field_distance),
                  vfRow("Center Field", D.center_field_distance),
                  vfRow("Right Field", D.right_field_distance),
                  vfRow("Orientation", D.orientation + " \u00b7 " + D.orientation_degrees + "\u00b0"),
                  e("div", { className: "note" }, "Symmetrical concrete bowl")))),

            /* colophon ribbon */
            e("div", { className: "trs-foot" },
              e("img", { src: "assets/pirates-p.svg", className: "pmark", alt: "Pittsburgh Pirates" }),
              e("div", { className: "ft" },
                e("div", { className: "nm" }, D.stadium_name, e("span", { className: "yr" }, " \u00b7 " + D.years_active)),
                e("div", { className: "sub" }, D.city + ", " + D.state)),
              e("img", { src: "assets/nl-logo.png", className: "nl", alt: "National League" }))))));
  }

  window.ThreeRiversSpread = Spread;
})();
