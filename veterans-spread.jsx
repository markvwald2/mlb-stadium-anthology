/* veterans-spread.jsx — "Concrete Civic Bowl / Zero-Hit Ledger".
   Reads window.VETERANS + window.VetIcon/VetSurvey/VetOctorad/VetProtractor.
   Left page: full-bleed asphalt hero (octorad civic plan integrated).
   Right page: two stacked zones — Stadium Section (operations ribbon, five
   structural bays, museum facts, field instrument, unified context) and a
   scoreboard-derived Visit Section anchored on the Aug 15, 1990 line score. */
(function () {
  const e = React.createElement;
  const D = window.VETERANS;
  const Icon = window.VetIcon, Survey = window.VetSurvey, Octorad = window.VetOctorad, Prot = window.VetProtractor;
  const g = D.game;

  function Slot(p) { return e("image-slot", { id: p.id, placeholder: p.placeholder, shape: "rect" }); }

  function fact(k, v) {
    if (v == null || v === "") return null;
    return e("div", { className: "vet-frow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function rcell(k, v, cls, sub) {
    return e("div", { className: "vet-rc" },
      e("div", { className: "k" }, k),
      e("div", { className: "v " + (cls || "") }, v),
      sub ? e("div", { className: "sub" }, sub) : null);
  }
  function gi(k, v, cls) {
    if (v == null || v === "") return null;
    return e("div", { className: "vet-girow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v " + (cls || "") }, v));
  }
  function fd(k, v, unit) {
    return e("div", { className: "vet-fdrow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v, unit ? e("span", { className: "u" }, unit) : null));
  }

  /* line score — SF R/H cells get the zero-hit emphasis box */
  function LineScore() {
    const innings = D.innings_played;
    const heads = []; for (let i = 1; i <= innings; i++) heads.push(i);
    const away = g.box.away, home = g.box.home;
    function awayRow() {
      return e("tr", null,
        e("td", { className: "tm" }, away.abbr),
        away.byInning.map((n, i) => e("td", { key: i, className: n === "x" ? "x" : "" }, n)),
        e("td", { className: "rhe sep" }, away.r),
        e("td", { className: "rhe zero" }, away.h),
        e("td", { className: "rhe" }, away.e));
    }
    function homeRow() {
      return e("tr", { className: "win" },
        e("td", { className: "tm" }, home.abbr),
        home.byInning.map((n, i) => e("td", { key: i, className: n === "x" ? "x" : "" }, n)),
        e("td", { className: "rhe sep" }, home.r),
        e("td", { className: "rhe" }, home.h),
        e("td", { className: "rhe" }, home.e));
    }
    return e("table", { className: "vet-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null, awayRow(), homeRow()));
  }

  function Spread() {
    return e("div", { className: "vet-spread", "data-screen-label": "Veterans Stadium spread" },

      /* ===== LEFT / HERO ===== */
      e("div", { className: "vet-page vet-left", "data-screen-label": "Veterans Stadium hero" },
        e("div", { className: "vet-hero-slot" },
          e("image-slot", { id: "vet-hero",
            placeholder: "Elevated aerial \u2014 complete circular bowl, surrounding parking fields, South Philadelphia sports complex; skyline secondary",
            src: "uploads/veterans-visualization-thumbnail.jpg",
            shape: "rect" })),
        e("div", { className: "vet-hero-scrim" }),
        e(Survey, { className: "vet-hero-survey", stroke: "#CFC8B6", op: 0.16 }),
        e(Octorad, { className: "vet-hero-plan", stroke: "#D9D2BF", op: 0.2, accent: "#E0B763", degrees: D.orientation_degrees }),

        e("div", { className: "vet-marker" },
          e("div", { className: "yr" }, "1971"),
          e("div", { className: "yr bot" }, "2003")),
        e("div", { className: "vet-hero-folio" }, "Municipal Era \u00b7 Sports-Complex"),

        e("div", { className: "vet-hero-title" },
          e("h1", { className: "vet-hero-name" },
            e("span", { className: "l1" }, "Veterans"),
            e("span", { className: "l2" }, "Stadium")),
          e("div", { className: "vet-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "vet-hero-meta" },
            D.years_active + "  \u00b7  " + D.stadium_type + "  \u00b7  ",
            e("span", { className: "dem" }, D.status))),

        e("div", { className: "vet-hero-foot" },
          e("div", { className: "vet-hero-ident" },
            e("div", { className: "nm" }, D.team_short),
            e("div", { className: "sub" }, D.division)),
          e("div", { className: "vet-wells" },
            e("div", { className: "vet-well" },
              e("div", { className: "box" }, e("img", { src: "assets/philadelphia-phillies-logo.svg", alt: "Phillies" })),
              e("div", { className: "cap" }, "Phillies")),
            e("div", { className: "vet-well" },
              e("div", { className: "box" }, e("img", { src: "assets/nl-logo.png", alt: "National League" })),
              e("div", { className: "cap" }, "National League")),
            e("div", { className: "vet-well" },
              e("div", { className: "box" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
              e("div", { className: "cap" }, "Major League Baseball"))))),

      /* ===== RIGHT PAGE ===== */
      e("div", { className: "vet-page vet-right" },
        e("div", { className: "vet-rp" },

          /* operations metadata ribbon */
          e("div", { className: "vet-ribbon" },
            rcell("Team", D.team_short, "red"),
            rcell("League", D.league, "blue sm"),
            rcell("Classification", "Multipurpose Era", "", "Turf & Concrete"),
            rcell("Years Active", D.years_active),
            rcell("Visit Order", D.visit_order + " of 42"),
            rcell("Coordinates", D.coordinates, "mono"),
            rcell("Capacity", D.capacity_current, "", "Originally " + D.capacity_opening)),

          /* ---- STADIUM SECTION ---- */
          e("section", { className: "vet-stadium", "data-screen-label": "Stadium Section" },
            e("div", { className: "vet-sechead" },
              Icon("octorad", { size: 25, stroke: "#26241F", sw: 1.5 }),
              e("h2", null, "Stadium Section"),
              e("span", { className: "ln" }),
              e("span", { className: "eyebrow" }, D.architectural_style)),

            /* five structural bays */
            e("div", { className: "vet-bays" },
              e(Slot, { id: "vet-p1", placeholder: "Exterior fa\u00e7ade \u00b7 exposed precast concrete" }),
              e(Slot, { id: "vet-p2", placeholder: "Seating bowl" }),
              e(Slot, { id: "vet-p3", placeholder: "Scoreboard" }),
              e(Slot, { id: "vet-p4", placeholder: "Concourse" }),
              e(Slot, { id: "vet-p5", placeholder: "Sports-complex context" })),

            /* facts + field instrument */
            e("div", { className: "vet-sbody" },
              e("div", { className: "vet-facts-zone" },
                e("div", { className: "vet-colhdr" }, "Stadium Facts"),
                e("div", { className: "vet-facts" },
                  e("div", { className: "vet-fcol" },
                    fact("Opened", D.opening_day),
                    fact("Years Active", D.years_active),
                    fact("Construction", D.construction_start),
                    fact("All-Star Games", D.all_star_games),
                    fact("Final Game", D.final_game),
                    fact("Demolition", D.demolition_year),
                    fact("Status", D.status),
                    fact("Renovations", D.renovations)),
                  e("div", { className: "vet-fcol" },
                    fact("Surface", D.surface_type + " \u2014 " + D.surface),
                    fact("Architect", D.architect),
                    fact("Type", D.stadium_type_facts),
                    fact("Style", D.architectural_style),
                    fact("Roof", D.roof_type),
                    fact("Financing", D.financing)),
                  e("div", { className: "vet-fcol" },
                    fact("Fa\u00e7ade", D.facade),
                    fact("Era", D.classification_era),
                    fact("Location", D.location),
                    fact("Elevation", D.elevation),
                    fact("Coordinates", D.coordinates),
                    e("div", { className: "vet-frow" },
                      e("div", { className: "k" }, "Address"),
                      e("div", { className: "v" }, "3501 S Broad Street", e("br"), "Philadelphia, PA 19148", e("br"), "(former site)")),
                    fact("Cost", D.original_cost + " (" + D.adjusted_cost + " adj.)")))),

              e("div", { className: "vet-instr-zone" },
                e("div", { className: "vet-colhdr" }, "Field Plan"),
                Prot ? e(Prot, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                  orientation: D.orientation, degrees: D.orientation_degrees }) : null,
                e("div", { className: "vet-instr-cap" }, "Symmetrical Bowl \u00b7 " + D.orientation + " " + D.orientation_degrees + "\u00b0")),

              e("div", { className: "vet-field-zone" },
                e("div", { className: "vet-colhdr" }, "Stadium Lineage"),
                e("div", { className: "vet-lin" },
                  D.preceded_by.split(";").map((raw, i) => {
                    const nm = raw.trim();
                    const s = nm.indexOf(" / ");
                    const nmContent = s === -1 ? nm
                      : [nm.slice(0, s + 2), e("br", { key: "b" }), nm.slice(s + 3)];
                    return e("div", { className: "vet-lin-item", key: i },
                      e("div", { className: "vet-lin-dot" }),
                      e("div", null, e("div", { className: "vet-lin-nm" }, nmContent)));
                  }),
                  e("div", { className: "vet-lin-item cur" },
                    e("div", { className: "vet-lin-dot" }),
                    e("div", null,
                      e("div", { className: "vet-lin-nm" }, D.stadium_name),
                      e("div", { className: "vet-lin-yr" }, D.years_active)))),
                e("div", { className: "vet-lin-succ" },
                  e("span", { className: "lab" }, "Succeeded By"),
                  e("span", { className: "nm" }, D.succeeded_by)))),

            /* unified stadium context */
            e("div", { className: "vet-context-band" },
              e("div", { className: "vet-context" },
                D.stadium_context.map((p, i) => e("p", { key: i }, p))))),

          /* ---- VISIT SECTION (scoreboard annex) ---- */
          e("section", { className: "vet-visit", "data-screen-label": "Visit Section" },
            e("div", { className: "vet-sechead" },
              Icon("ticket", { size: 24, stroke: "#26241F", sw: 1.5 }),
              e("h2", null, "Visit Section"),
              e("span", { className: "ln" }),
              e("span", { className: "eyebrow" }, D.trip_name.toUpperCase() + " TRIP \u00b7 VISIT " + D.visit_order + " OF 42")),

            e("div", { className: "vet-scoreboard" },
              /* game information */
              e("div", { className: "vet-sb-col vet-sb-info" },
                e("div", { className: "vet-sb-lbl" }, "Game Information"),
                gi("Date", D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                gi("Matchup", "Giants (SF) at Phillies (PHI)"),
                gi("Result", g.result_line, "win"),
                gi("First Pitch", g.first_pitch, "mono"),
                gi("Duration", g.duration, "mono"),
                gi("Attendance", D.attendance, "mono"),
                gi("Trip", D.trip_name)),

              /* line score — focal element */
              e("div", { className: "vet-sb-col vet-sb-score" },
                e("div", { className: "vet-sb-date" },
                  e("span", null, "Line Score \u00b7 " + D.innings_played + " Innings"),
                  e("span", null, D.featured_visit_date.toUpperCase())),
                LineScore(),
                e("div", { className: "vet-sb-foot" },
                  e("span", { className: "vet-nohit" }, e("span", { className: "st" }, "\u2605"), D.no_hitter_note),
                  e("div", { className: "vet-dec" },
                    e("div", { className: "di" }, e("span", { className: "dk" }, "W"), e("span", { className: "dv" }, g.winning_pitcher)),
                    e("div", { className: "di" }, e("span", { className: "dk" }, "L"), e("span", { className: "dv" }, g.losing_pitcher))))),

              /* weather */
              e("div", { className: "vet-sb-col vet-sb-wx" },
                e("div", { className: "vet-sb-lbl" }, "Weather"),
                e("div", { className: "vet-wxtop" },
                  Icon(g.weather.sky, { size: 30, stroke: "#D7B25A", sw: 1.4 }),
                  e("div", null,
                    e("div", { className: "deg" }, g.weather.temperature),
                    e("div", { className: "cond" }, g.weather.conditions))),
                e("div", { className: "vet-wxrows" },
                  e("div", { className: "vet-wxrow" }, e("span", { className: "k" }, "Wind"), e("span", { className: "v" }, g.weather.wind)),
                  e("div", { className: "vet-wxrow" }, e("span", { className: "k" }, "Humidity"), e("span", { className: "v" }, g.weather.humidity)),
                  e("div", { className: "vet-wxrow" }, e("span", { className: "k" }, "Elevation"), e("span", { className: "v" }, D.elevation)))))),

          /* ---- material / concept ribbon ---- */
          e("div", { className: "vet-cues" },
            D.cues.map((c, i) => e("div", { className: "vet-cue", key: i },
              e("div", { className: "t" }, c.t),
              e("div", { className: "s" }, c.s)))))));
  }

  window.VeteransSpread = Spread;
})();
