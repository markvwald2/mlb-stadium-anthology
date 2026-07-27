/* dodger-v2-spread.jsx — Dodger Stadium "Pastel Terraces."
   Reads window.DODGER + window.DodgerV2Field.
   LEFT  page: full-bleed Chavez Ravine aerial; a compact stacked title, a folio
   tab and a four-segment seat-tier rule that quietly foreshadows the system.
   RIGHT page: the 1962 seat palette descends the page as four terrace bands, in
   bowl order top→bottom —
     BAND 1  Sky       photo frieze + identity ribbon
     BAND 2  Turquoise  Stadium Section (facts + notes + field plan)
     BAND 3  Orange     Stadium Context (one unified monograph essay)
     BAND 4  Yellow     The Visit (two mirrored score panels)
   Colors organise; they are never explained or labelled. Every populated field
   renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.DODGER;

  const STRIP = [
    ["dodger-v2-s1", "Exterior approach \u2014 the terraced parking levels and concrete entry stepping up the Chavez Ravine hillside"],
    ["dodger-v2-s2", "Seating bowl detail \u2014 the open-air, color-coded decks carved into the grade", "images/dodger/dodger-stadium-02-level.jpg"],
    ["dodger-v2-s3", "Scoreboard view \u2014 the faceted mid-century sign / billboard structure beyond center field"],
    ["dodger-v2-s4", "Concourse \u2014 the open-air pedestrian level along the upper decks"],
    ["dodger-v2-s5", "Historic construction \u2014 Chavez Ravine grading and the bowl under construction, early 1960s"]
  ];

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src || ("images/dodger/" + props.id + ".webp"),
      style: { width: "100%", height: "100%" } });
  }

  function Sec(props) {
    return e("div", { className: "dv2-sec" },
      e("span", { className: "tag" }, props.tag),
      e("span", { className: "no", style: { color: props.color } }, props.no),
      props.sub ? e("span", { className: "sub" }, props.sub) : null);
  }

  /* Stadium spec matrix. Strict 4-column grid; the two long-form pairs become
     full-width wide-cell rows interleaved at fixed positions:
       row 1  Opened · Capacity · Status · Years Active        (primary)
       row 2  Architect · Style · Era · Stadium Type
       row 3  Façade (2) · Surface (2)
       row 4  Roof · Setting · Elevation · Coordinates
       row 5  Preceded By · Construction · Cost · Address       (historical)
       row 6  Financing (2) · Renovations (2)                  */
  function SpecGrid() {
    const norm = (s, key, tier) => e("div", { className: "cell" + tier, key: key },
      e("div", { className: "k" }, s[0]), e("div", { className: "v" }, s[1]));
    const wide = (n, key) => e("div", { className: "cell wide", key: key },
      e("div", { className: "k" }, n[0]), e("div", { className: "v" }, n[1]));
    const S = D.spec, N = D.notes;
    return e("div", { className: "dv2-spec", style: { flex: "1 1 0" } },
      norm(S[0], "s0", " tier-primary"), norm(S[1], "s1", " tier-primary"),
      norm(S[2], "s2", " tier-primary"), norm(S[3], "s3", " tier-primary"),
      norm(S[4], "s4", ""), norm(S[5], "s5", ""), norm(S[6], "s6", ""), norm(S[7], "s7", ""),
      wide(N[1], "facade"), wide(N[0], "surface"),
      norm(S[8], "s8", ""), norm(S[9], "s9", ""), norm(S[10], "s10", ""), norm(S[11], "s11", ""),
      norm(S[12], "s12", " tier-hist"), norm(S[13], "s13", " tier-hist"),
      norm(S[14], "s14", " tier-hist"), norm(S[15], "s15", " tier-hist"),
      wide(N[2], "financing"), wide(N[3], "renovations"));
  }

  /* line score */
  function Line(box) {
    const cols = []; for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "sep rc" }, t.r), e("td", null, t.h), e("td", null, t.e));
    }
    return e("table", { className: "dv2-line" },
      e("thead", null, e("tr", null, e("th", { className: "tm" }, "Inning"),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "nym"), row(box.home, "lad")));
  }

  function metaCell(l, v) {
    return e("div", { className: "dv2-mc" }, e("span", { className: "ml" }, l), e("span", { className: "mv" }, v));
  }

  function resultRow(cls, logo, alt, name, score) {
    return e("div", { className: "dv2-rrow " + cls },
      e("img", { src: logo, alt: alt }),
      e("span", { className: "rn" }, name),
      e("span", { className: "rs" }, score));
  }

  function pitchRow(cls, label, name) {
    return e("div", { className: "prow" },
      e("span", { className: "pl " + cls }, label),
      e("span", { className: "pn" }, name));
  }

  /* understated line-art "partly cloudy" glyph (sun behind a cloud) */
  function WeatherIcon(p) {
    return window.WxIcons.react(p && p.cond, { className: "wxicon", viewBox: "0 0 48 40",
      stroke: "currentColor", strokeWidth: 1.44, wrapTransform: "translate(4 0) scale(1.6667)" });
  }

  /* A horizontal four-zone game module: metadata · result+linescore · pitching · conditions.
     Each zone distributes its sections evenly (space-between) with hairline rules between. */
  function Panel(props) {
    const g = props.g;
    const w = g.weather;
    return e("div", { className: "dv2-gm" },
      e("div", { className: "dv2-gm-head" },
        e("span", { className: "gm-mass" }, "Game " + props.num),
        e("span", { className: "gm-date" }, g.day + ", " + g.date)),
      e("div", { className: "dv2-gm-body" },
        e("div", { className: "z z-meta" },
          metaCell("First Pitch", g.first_pitch),
          metaCell("Attendance", g.attendance),
          metaCell("Duration", g.duration)),
        e("div", { className: "z z-result" },
          e("div", { className: "dv2-result-top" },
            resultRow("mets", "assets/mets-logo-gamebox.svg", "Mets", g.away_name, g.away_score),
            resultRow("dodgers", "assets/dodgers-logo-gamebox.svg", "Dodgers", g.home_name, g.home_score)),
          e("div", { className: "dv2-rline" }, Line(g.box))),
        e("div", { className: "z z-pitch" },
          pitchRow("w", "WP", g.win),
          e("div", { className: "pgap" }, e("i", null)),
          pitchRow("l", "LP", g.loss),
          e("div", { className: "pgap" }, e("i", null)),
          pitchRow("s", "SV", g.save)),
        e("div", { className: "z z-cond" },
          e("div", null,
            e("div", { className: "dv2-cond-wx" },
              e(WeatherIcon, { cond: w.conditions }),
              e("div", { className: "ct" }, w.temperature)),
            e("div", { className: "cc" }, w.conditions)),
          e("div", { className: "dv2-cond-row" }, w.wind),
          e("div", { className: "dv2-cond-row" }, "Humidity " + w.humidity))));
  }

  function Spread() {
    const F = D.field, V = D.visit, g1 = D.games[0], g2 = D.games[1];

    return e("div", { className: "dv2", "data-screen-label": "Dodger Stadium spread (v2)" },

      /* ============== LEFT / AERIAL ============== */
      e("div", { className: "dv2-page dv2-left", "data-screen-label": "Dodger Stadium \u2014 aerial" },
        e("div", { className: "dv2-hero-slot" },
          e(Slot, { id: "dodger-v2-hero", src: "images/dodger/dodger-stadium-hero.jpg",
            placeholder: "Drop the elevated Chavez Ravine aerial \u2014 the open-air bowl geometry and color-coded decks, the hillside siting and terraced parking, with downtown Los Angeles in the distance. Let the photograph dominate." })),
        e("div", { className: "dv2-hero-scrim" }),
        e("div", { className: "dv2-folio" },
          e("span", { className: "fk" }, "Visit"),
          e("span", { className: "fv" }, "04 / 42")),
        e("div", { className: "dv2-title" },
          e("div", { className: "kick" }, "Chavez Ravine \u00b7 Est. 1962"),
          e("h1", null, "Dodger", e("br", null), "Stadium"),
          e("div", { className: "sub" }, "Los Angeles, California"),
          e("div", { className: "dv2-tiers" },
            e("span", { style: { background: "var(--sky)" } }),
            e("span", { style: { background: "var(--turq)" } }),
            e("span", { style: { background: "var(--orange)" } }),
            e("span", { style: { background: "var(--yellow)" } })),
          e("div", { className: "dv2-meta" }, D.coords_line + "  \u00b7  Elev. 520 ft  \u00b7  Open air"))),

      /* ============== RIGHT / TERRACES ============== */
      e("div", { className: "dv2-page dv2-right", "data-screen-label": "Dodger Stadium \u2014 terraces" },

        /* ---- BAND 1 · SKY · identity ---- */
        e("div", { className: "dv2-band", style: { top: "0px", height: "255px", background: "var(--sky-bg)" } },
          e("div", { className: "dv2-frieze", style: { top: "38px", height: "160px" } },
            STRIP.map((s, i) => e("figure", { key: i }, e(Slot, { id: s[0], placeholder: s[1], src: s[2] })))),
          e("div", { className: "dv2-ribbon", style: { top: "202px" } },
            e("div", { className: "rc logos" },
              e("div", { className: "dv2-lock" },
                e("span", { className: "lk team" }, e("img", { src: "assets/los-angeles-dodgers-logo.svg", alt: "Los Angeles Dodgers" })),
                e("span", { className: "lk lg" }, e("img", { src: "assets/nl-logo.png", alt: "National League" })),
                e("span", { className: "lk mlb" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })))),
            e("div", { className: "rc" }, e("div", { className: "rk" }, "Team"), e("div", { className: "rv" }, "Los Angeles Dodgers")),
            e("div", { className: "rc" }, e("div", { className: "rk" }, "Division"), e("div", { className: "rv" }, "National League West")),
            e("div", { className: "rc script" }, e("span", { className: "dv2-script", style: { letterSpacing: "11px" } }, "Chavez Ravine")),
            e("div", { className: "rc visit" }, e("div", { className: "rk" }, "Visit"), e("div", { className: "rv" }, "4 of 42")))),

        /* ---- BAND 2 · TURQUOISE · stadium section ---- */
        e("div", { className: "dv2-band", style: { top: "255px", height: "300px", background: "var(--turq-bg)" } },
          e("div", { className: "dv2-edge", style: { background: "var(--turq)" } }),
          e("div", { className: "dv2-pad", style: { top: "14px" } },
            e(Sec, { tag: "Stadium", no: "02", color: "var(--turq-ax)" })),
          e("div", { className: "dv2-pad", style: { top: "44px" } },
            e("div", { style: { display: "flex", gap: "28px", alignItems: "flex-start" } },
              e(SpecGrid, null),
              e("div", { className: "dv2-fieldcol", style: { flex: "0 0 200px" } },
                e("div", { className: "fc-allstar" }, "All-Star Games 1980, 2022"),
                e("div", { className: "fc-h" }, "Field Plan \u00b7 " + F.orientation + " " + F.degrees + "\u00b0"),
                window.DodgerV2Field ? e(window.DodgerV2Field, { lf: F.left_field, cf: F.center_field, rf: F.right_field, orientation: F.orientation, degrees: F.degrees, accent: "var(--turq-ax)", counterRotate: 26 }) : null)))),

        /* ---- BAND 3 · ORANGE · stadium context ---- */
        e("div", { className: "dv2-band", style: { top: "555px", height: "253px", background: "var(--orange-bg)" } },
          e("div", { className: "dv2-edge", style: { background: "var(--orange)" } }),
          e("div", { className: "dv2-pad", style: { top: "14px" } },
            e(Sec, { tag: "Pastel Terraces", no: "03", color: "var(--orange)" })),
          e("div", { className: "dv2-pad", style: { top: "43px" } },
            e("div", { className: "dv2-essay" },
              D.stadium_context.map((p, i) => i === 0
                ? e("p", { key: i }, e("span", { className: "fw-dropcap" }, p.charAt(0)), p.slice(1))
                : e("p", { key: i }, p))))),

        /* ---- BAND 4 · YELLOW · the visit ---- */
        e("div", { className: "dv2-band", style: { top: "808px", height: "280px", background: "var(--yellow-bg)" } },
          e("div", { className: "dv2-edge", style: { background: "var(--yellow)" } }),
          e("div", { className: "dv2-pad", style: { top: "10px" } },
            e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" } },
              e("div", { style: { display: "flex", alignItems: "baseline", gap: "14px" } },
                e(Sec, { tag: "The Visit", no: "04", color: "#B9912A" }),
                e("div", { className: "dv2-sec sub", style: { marginLeft: 0, fontFamily: "'Barlow Semi Condensed',sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--ink2)", whiteSpace: "nowrap", lineHeight: 1.1 } },
                  V.trip + " \u00b7 " + V.span)))),
          e("div", { className: "dv2-visit-other", style: { position: "absolute", right: "37.5px", top: "2px", height: "44px", alignItems: "center" } },
            e("div", { className: "ov-label" }, "Other Visits"),
            e("div", { className: "ov-grid" },
              V.other_visits.map(function (v, i) {
                var parts = v.split(" \u00b7 ");
                var date = parts[0], opp = parts[1] || null;
                return e("div", { className: "ov-cell", key: i },
                  e("div", { className: "ov-date" }, date),
                  opp ? e("div", { className: "ov-opp" }, opp) : null);
              }))),
          e("div", { className: "dv2-panels", style: { top: "44px", height: "190px" } },
            e(Panel, { key: "g1", g: g1, num: 1 }),
            e(Panel, { key: "g2", g: g2, num: 2 }))))
    );
  }

  window.DodgerV2Spread = Spread;
})();
