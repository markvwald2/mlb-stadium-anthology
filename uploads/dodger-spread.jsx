/* dodger-spread.jsx — "Terraces of Chavez Ravine."
   Reads window.DODGER + window.DodgerProtractor.
   LEFT  page: full-bleed topographic aerial; a small civic enamel site-sign and a
   wayfinding folio tab. The photograph dominates.
   RIGHT page: a stack of concrete TERRACES that descend the page, aligned to the
   upper-deck roofline datum —
     T1  Masthead + roofline datum + full-bleed photo frieze
     T2  Stadium facts (museum spec rail) + field notation + extended labels
     T3  Stadium context essay (the only long-form prose)
     T4  Visit masthead
     T5  Two PAVILION masses (the two nights) flanking a central trip spine
   Every populated field renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.DODGER;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect",
      style: { width: "100%", height: "100%" } });
  }

  function Sec(props) {
    return e("div", { className: "ds-sec" },
      e("span", { className: "tag" }, props.tag),
      props.no ? e("span", { className: "no" }, props.no) : null,
      props.sub ? e("span", { className: "sub" }, props.sub) : null);
  }

  function Datum(props) {
    const ticks = [];
    for (let i = 0; i <= 12; i++) ticks.push(e("span", { key: i, className: "dt", style: { left: (i * 1275 / 12) + "px" } }));
    return e("div", { className: "ds-datum", style: { top: props.top } }, ticks,
      e("span", { className: "dl" }, props.label));
  }

  /* line score */
  function Line(box) {
    const cols = []; for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "sep rc" }, t.r), e("td", null, t.h), e("td", null, t.e));
    }
    return e("table", { className: "ds-line" },
      e("thead", null, e("tr", null, e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, box.away.r > box.home.r), row(box.home, box.home.r > box.away.r)));
  }

  function infoCell(l, v) {
    return e("div", { className: "c" }, e("span", { className: "il" }, l), e("span", { className: "iv" }, v));
  }

  function Pavilion(props) {
    const g = props.g, side = props.side;
    return e("div", { className: "ds-pavilion " + side },
      e("div", { className: "ds-pav-bill" },
        e("span", { className: "mass" }, g.mass),
        e("span", { className: "date" }, g.day.slice(0, 3).toUpperCase() + " \u00b7 " + g.date)),
      e("div", { className: "ds-pav-body" },
        e("div", { className: "ds-pav-score" },
          e("div", { className: "ds-pav-teams" },
            e("div", { className: "ds-pav-team away" },
              e("img", { src: "assets/new-york-mets-logo.svg", alt: "Mets" }),
              e("span", { className: "tn" }, g.away_name), e("span", { className: "sc" }, g.away_score)),
            e("div", { className: "ds-pav-team home" },
              e("img", { src: "assets/los-angeles-dodgers-logo.svg", alt: "Dodgers" }),
              e("span", { className: "tn" }, g.home_name), e("span", { className: "sc" }, g.home_score))),
          e("div", { className: "ds-pav-final" }, e("span", null, "FINAL"), e("span", null, g.box.innings + " INN"), e("span", null, g.type))),
        e("div", { className: "ds-pav-info" },
          infoCell("First Pitch", g.first_pitch), infoCell("Attendance", g.attendance), infoCell("Duration", g.duration)),
        Line(g.box),
        e("div", { className: "ds-pav-dec" },
          e("div", { className: "col" },
            e("div", { className: "ds-decrow" }, e("span", { className: "ds-dt w" }, "WP"), e("span", { className: "ds-dn" }, g.win)),
            e("div", { className: "ds-decrow" }, e("span", { className: "ds-dt l" }, "LP"), e("span", { className: "ds-dn" }, g.loss)),
            e("div", { className: "ds-decrow" }, e("span", { className: "ds-dt" }, "SV"), e("span", { className: "ds-dn" }, g.save))),
          e("div", { className: "col" },
            e("div", { className: "ds-decrow" }, e("span", { className: "ds-dt2" }, "Home St."), e("span", { className: "ds-dn" }, g.home_starter)),
            e("div", { className: "ds-decrow" }, e("span", { className: "ds-dt2" }, "Away St."), e("span", { className: "ds-dn" }, g.away_starter))))));
  }

  function wxCell(g) {
    const w = g.weather;
    return e("div", { className: "ds-wxcell" },
      e("div", { className: "wtop" },
        e("span", { className: "wd" }, g.date.replace(", 1986", "")),
        e("span", { className: "wt" }, w.temperature)),
      e("div", { className: "wc" }, w.conditions),
      e("div", { className: "wm" }, w.wind + "  \u00b7  Hum " + w.humidity));
  }

  function Spread() {
    const F = D.field, V = D.visit, g1 = D.games[0], g2 = D.games[1];

    return e("div", { className: "ds-spread", "data-screen-label": "Dodger Stadium spread" },

      /* ============== LEFT / AERIAL ============== */
      e("div", { className: "ds-page ds-left", "data-screen-label": "Dodger Stadium \u2014 aerial" },
        e("div", { className: "ds-hero-slot" },
          e(Slot, { id: "dodger-hero",
            placeholder: "Drop the elevated Chavez Ravine aerial \u2014 the hillside basin, terraced parking levels, open-air bowl geometry, the symmetrical outfield pavilions and the long upper-deck roofline. Topography first; downtown Los Angeles secondary." })),
        e("div", { className: "ds-hero-scrim" }),
        e("div", { className: "ds-folio" },
          e("span", { className: "fk" }, "Visit"),
          e("span", { className: "fv" }, "04 / 05")),
        e("div", { className: "ds-sign" },
          e("div", { className: "ds-sign-row" },
            e("div", { className: "ds-sign-name" }, D.stadium_name),
            e("div", { className: "ds-sign-idx" }, "NL WEST")),
          e("div", { className: "ds-sign-sub" }, D.city + " \u00b7 California"),
          e("div", { className: "ds-sign-meta" }, D.coords_line + "  \u00b7  " + D.site_line))),

      /* ============== RIGHT / TERRACES ============== */
      e("div", { className: "ds-page ds-right", "data-screen-label": "Dodger Stadium \u2014 terraces" },

        /* ---- T1 masthead + datum + frieze ---- */
        e("div", { className: "ds-band", style: { top: "0px", height: "226px", background: "var(--c1)" } },
          e("div", { className: "ds-pad", style: { top: "34px" } },
            e(Sec, { tag: "Stadium", no: "01", sub: "Chavez Ravine \u00b7 Designed Landform" })),
          e(Datum, { top: "74px", label: "Upper-deck roofline datum" }),
          e("div", { className: "ds-frieze", style: { top: "80px", height: "146px" } },
            D.strip.map((s, i) => e("figure", { key: i }, e(Slot, { id: s[0], placeholder: s[1] }))))),

        /* ---- T2 stadium facts ---- */
        e("div", { className: "ds-band step", style: { top: "226px", height: "250px", background: "var(--c2)" } },
          e("div", { className: "ds-pad", style: { top: "16px" } },
            e(Sec, { tag: "Stadium Facts", no: "02", sub: "Museum Record" }),
            e("div", { style: { display: "flex", gap: "24px", marginTop: "12px" } },
              e("div", { className: "ds-spec", style: { flex: "1 1 0" } },
                D.spec.map((s, i) => e("div", { className: "cell", key: i },
                  e("div", { className: "k" }, s[0]), e("div", { className: "v" }, s[1])))),
              e("div", { className: "ds-fieldnote", style: { flex: "0 0 150px" } },
                e("div", { className: "fn-h" }, "Field Plan \u00b7 Axis " + F.orientation + " " + F.degrees + "\u00b0"),
                window.DodgerProtractor ? e(window.DodgerProtractor, { lf: F.left_field, cf: F.center_field, rf: F.right_field, orientation: F.orientation, degrees: F.degrees }) : null)),
            e("div", { className: "ds-notes" },
              D.notes.map((n, i) => e("span", { className: "ds-note", key: i },
                e("span", { className: "nk" }, n[0]), e("span", { className: "nv" }, n[1])))))),

        /* ---- T3 stadium context ---- */
        e("div", { className: "ds-band step", style: { top: "476px", height: "218px", background: "var(--c3)" } },
          e("div", { className: "ds-pad", style: { top: "16px" } },
            e(Sec, { tag: "Stadium Context", no: "03", sub: "Monograph" }),
            e("div", { className: "ds-essay", style: { marginTop: "11px" } },
              D.stadium_context.map((p, i) => e("p", { key: i }, p))))),

        /* ---- T4 visit masthead ---- */
        e("div", { className: "ds-band step", style: { top: "694px", height: "48px", background: "var(--c4)" } },
          e("div", { className: "ds-pad", style: { top: "13px" } },
            e(Sec, { tag: "Visit", no: "04", sub: e(React.Fragment, null, V.trip, " \u00b7 ", e("b", null, V.note)) }))),

        /* ---- T5 pavilions + spine ---- */
        e("div", { className: "ds-band step", style: { top: "742px", height: "346px", background: "var(--c5)" } },
          e("div", { className: "ds-pavrow", style: { top: "8px", height: "296px" } },
            e(Pavilion, { g: g1, side: "left" }),
            e("div", { className: "ds-spine" },
              e("div", { className: "ds-spine-h" }, "The Series"),
              e("div", { className: "ds-spine-trip" },
                e("div", { className: "tn" }, V.span),
                e("div", { className: "dt" }, V.title + " \u00b7 No. " + V.no + " of " + V.total)),
              e("div", { className: "ds-spine-wx" }, wxCell(g1), wxCell(g2)),
              e("div", { className: "ds-spine-other" },
                e("div", { className: "oh" }, "Other Visits"),
                V.other_visits.map((o, i) => e("div", { className: "or", key: i }, o))),
              e("div", { className: "ds-spine-marks" },
                e("img", { src: "assets/nl-logo.png", alt: "National League" }),
                e("img", { src: "assets/mlb-logo.svg", alt: "MLB" }))),
            e(Pavilion, { g: g2, side: "right" }))))
    );
  }

  window.DodgerStadiumSpread = Spread;
})();
