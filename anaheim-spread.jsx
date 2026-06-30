/* anaheim-spread.jsx — Angel Stadium of Anaheim, "Freeway Landmark."
   Reads window.ANAHEIM + window.AnaheimField.
   LEFT  page: full-bleed Big A / freeway hero; a compact roadside-sign title
   lockup mounted to a structural mast (halo + crossbar), photo stays dominant.
   RIGHT page (warm paper), Big-A wayfinding architecture:
     HEADER   Stadium Section
     SURVEY   photo sign-panels (left) hung beside a vertical mast that carries
              the metadata rows (right), with the field instrument + footnotes
     STRATA   the three architectural lives as a crossbar of structural strata
     CONTEXT  one unified Stadium Context monograph
     VISIT    a typographic scoreboard — result, facts, archival line score
   The Big A organizes the grid; team red is a rule/accent only. Every populated
   field renders once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.ANAHEIM;
  const RED = "#B0122B", NAVY = "#0E2A4A";

  function Slot(props) {
    // Pattern B: full-res press photos referenced via <image-slot src=> — no
    // canvas downsample, no base64 in the sidecar. The slot stays re-framable;
    // pan/zoom persists as a tiny framing-only {s,x,y} entry in
    // .image-slots.state.json, and clearing a drop falls back to src. Files
    // live full-resolution in uploads/.
    var SRC = {
      "anaheim-hero": "uploads/anaheim-stadium-00-main.jpg",
      "anaheim-p1": "uploads/anaheim-stadium-01.jpg",
      "anaheim-p2": "uploads/anaheim-stadium-02.jpg",
      "anaheim-p3": "uploads/anaheim-stadium-03-42e20a0e.jpg",
      "anaheim-p4": "uploads/anaheim-stadium-04.jpg"
    };
    var attrs = { id: props.id, placeholder: props.placeholder, shape: "rect", statefile: ".image-slots.state.json" };
    if (SRC[props.id]) attrs.src = SRC[props.id];
    else if (props.src) attrs.src = props.src;
    return e("image-slot", attrs);
  }

  /* The Big A — structural device: A-frame mast, crossbar, halo ring. */
  function BigA(props) {
    const c = props.color || RED, w = props.w || 26;
    return e("svg", { viewBox: "0 0 40 56", width: w, height: w * 56 / 40, className: "as-biga",
        fill: "none", stroke: c, "aria-hidden": "true" },
      e("polygon", { points: "11.7,37 28.3,37 31.87,48 8.13,48", fill: c, stroke: "none" }),
      e("line", { x1: 20, y1: 11.5, x2: 6.5, y2: 53, strokeWidth: 2.6, strokeLinecap: "round" }),
      e("line", { x1: 20, y1: 11.5, x2: 33.5, y2: 53, strokeWidth: 2.6, strokeLinecap: "round" }),
      e("ellipse", { cx: 20, cy: 19, rx: 10.5, ry: 3.4, strokeWidth: 2 }));
  }

  function SectionHead(props) {
    return e("div", { className: "as-sec" },
      e(BigA, { w: props.big || 24 }),
      e("span", { className: "tag" }, props.tag),
      e("span", { className: "no" }, props.no),
      e("span", { className: "rule" }),
      props.tab ? e("span", { className: "tab" }, props.tab) : null);
  }

  /* ---- survey rail — metadata sign-panels hung off the mast ---- */
  function SurveyRow(s, i) {
    return e("div", { className: "as-prow", key: i },
      e("span", { className: "as-plabel" },
        e("span", { className: "pbar" }),
        e("span", { className: "pl" }, s[0])),
      e("span", { className: "pleader" }),
      e("span", { className: "pv", style: s[2] || null }, s[1]));
  }

  /* ---- line score (archival scoreboard artifact) ---- */
  function LineScore(box) {
    const cols = []; for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "sep rc" }, t.r), e("td", { className: "x" }, t.h), e("td", { className: "x" }, t.e));
    }
    return e("table", { className: "as-line" },
      e("thead", null, e("tr", null, e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function resultRow(cls, logo, alt, city, name, score, win) {
    return e("div", { className: "as-rrow " + cls },
      e("img", { src: logo, alt: alt }),
      e("span", { className: "rteam" },
        e("span", { className: "rcity" }, city),
        e("span", { className: "rname" }, name)),
      win ? e("span", { className: "rwin" }, "W") : null,
      e("span", { className: "rs" }, score));
  }

  function metaCell(l, v) {
    return e("div", { className: "as-mc" }, e("span", { className: "ml" }, l), e("span", { className: "mv" }, v));
  }

  /* understated line-art "clear" glyph (sun) */
  function SunIcon() {
    return e("svg", { className: "as-wxicon", viewBox: "0 0 40 40", fill: "none",
        stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" },
      e("circle", { cx: 20, cy: 20, r: 7 }),
      [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
        return e("line", { key: i, x1: 20 + c * 12, y1: 20 + s * 12, x2: 20 + c * 16, y2: 20 + s * 16 });
      }));
  }

  function Spread() {
    const F = D.field, V = D.visit, g = D.game, w = g.weather;

    return e("div", { className: "as", "data-screen-label": "Angel Stadium of Anaheim spread" },

      /* ================= LEFT / FREEWAY HERO ================= */
      e("div", { className: "as-page as-left", "data-screen-label": "Angel Stadium \u2014 Big A hero" },
        e("div", { className: "as-hero-slot" },
          e(Slot, { id: "anaheim-hero",
            placeholder: "Drop the Big A / freeway hero \u2014 the roadside sign mast and halo above Angel Stadium at dusk, the bowl and parking fields with the freeway sweeping past. Let the photograph dominate." })),
        e("div", { className: "as-hero-scrim" }),

        e("div", { className: "as-folio" },
          e("span", { className: "fk" }, "Visit"),
          e("span", { className: "fv" }, "06 / 42")),

        e("div", { className: "as-title" },
          e("div", { className: "as-mast" }),
          e("div", { className: "as-signbody" },
            e("div", { className: "as-signpanel" },
              e("h1", { className: "as-wordmark" },
                e("span", { className: "halo-a" }, "A"), "naheim Stadium")),
            e("div", { className: "as-cityline" }, "Anaheim, California"))),

        e("div", { className: "as-coords" }, D.coords_line + "   \u00b7   Elev. 148 ft   \u00b7   Open air"),
        e("div", { className: "as-hero-logos" },
          e("img", { className: "hl-team", src: "assets/angels-logo-1986.png", alt: "Los Angeles Angels" }),
          e("img", { className: "hl-al", src: "assets/american-league-logo.png", alt: "American League" }),
          e("img", { className: "hl-mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))),

      /* ================= RIGHT / WAYFINDING PANEL ================= */
      e("div", { className: "as-page as-right", "data-screen-label": "Angel Stadium \u2014 survey page" },

        /* ---- header ---- */
        e("div", { className: "as-pad", style: { top: "41px" } },
          e(SectionHead, { tag: "Stadium Section", no: "01", tab: D.team + " \u00b7 " + D.league + " \u00b7 " + D.division })),

        /* ---- survey band: photos | mast + metadata | field ---- */
        e("div", { className: "as-pad", style: { top: "82px" } },
          e("div", { className: "as-survey-band" },

            e("div", { className: "as-photos" },
              D.panels.map((p, i) => e("figure", { className: "as-photo", key: i },
                e(Slot, { id: p[0], placeholder: p[1] })))),

            e("div", { className: "as-survey" },
              e("div", { className: "as-col-panel" },
                D.spec.slice(0, 8).map(SurveyRow)),
              e("div", { className: "as-col-panel" },
                D.spec.slice(8, 16).map(SurveyRow))),

            e("div", { className: "as-fieldcol" },
              e("div", { className: "fc-h" }, "Field Plan"),
              window.AnaheimField
                ? e(window.AnaheimField, { lf: F.left_field, cf: F.center_field, rf: F.right_field, abbr: F.abbr, degrees: F.degrees })
                : null,
              e("div", { className: "as-foot" },
                D.footnotes.map((ft, i) => e("div", { className: "ft", key: i },
                  e("span", { className: "fl" }, ft[0]),
                  e("span", { className: "fv" }, ft[1]))),
                D.footnote_note
                  ? e("div", { className: "as-foot-note" }, D.footnote_note)
                  : null)))),

        /* ---- strata: three architectural lives (crossbar) ---- */
        e("div", { className: "as-pad", style: { top: "414px" } },
          e("div", { className: "as-life" },
            e("div", { className: "as-life-label" },
              e("span", { className: "ll1" }, "Three Lives"),
              e("span", { className: "ll2", style: { width: "126px" } }, "One concrete frame")),
            e("div", { className: "as-life-cols" },
              D.lifecycle.map((l, i) => e("div", { className: "as-lcol", key: i },
                e("span", { className: "ly" }, l[0]),
                e("span", { className: "le" }, l[1]),
                e("span", { className: "ld" }, l[2]))))),
          e("div", { className: "as-life-note" },
            e("span", null, e("b", null, "Era"), D.classification.era),
            e("span", null, e("b", null, "Stadium Type"), D.classification.type),
            e("span", null, e("b", null, "Style"), D.classification.style),
            e("span", null, e("b", null, "Fa\u00e7ade"), D.classification.facade),
            e("span", null, e("b", null, "Improvements"), D.classification.later))),

        /* ---- stadium context ---- */
        e("div", { className: "as-pad", style: { top: "549px" } },
          e("div", { className: "as-essay" },
            D.stadium_context.map((p, i) => i === 0
              ? e("p", { key: i }, e("span", { className: "fw-dropcap" }, p.charAt(0)), p.slice(1))
              : e("p", { key: i }, p)))),

        /* ---- visit section ---- */
        e("div", { className: "as-pad", style: { top: "844px" } },
          e(SectionHead, { tag: "Visit Section", no: "02",
            tab: V.trip + " \u00b7 No. 06 / 42 \u00b7 " + V.here + " Visits" })),

        e("div", { className: "as-pad", style: { top: "880px" } },
          e("div", { className: "as-visit" },

            /* left — result + facts */
            e("div", { className: "as-vleft" },
              e("div", { className: "as-result" },
                resultRow("home", "assets/angels-logo-1986.png", "Angels", g.home_city, g.home_name, g.home_score, true),
                resultRow("away", "assets/oakland-athletics-logo.svg", "Athletics", g.away_city, g.away_name, g.away_score, false)),
              e("div", { className: "as-vmeta" },
                metaCell("First Pitch", g.first_pitch),
                metaCell("Attendance", g.attendance),
                metaCell("Duration", g.duration))),

            /* right — scoreboard artifact */
            e("div", { className: "as-vright" },
              e("div", { className: "as-board-head" },
                e("span", { className: "bh-date" }, g.day + " \u00b7 " + g.date),
                e("span", { className: "bh-title" }, g.title),
                e("span", { className: "bh-other" }, "Other visit \u2014 " + V.other_visits[0])),
              e("div", { className: "as-board" }, LineScore(g.box)),
              e("div", { className: "as-board-foot" },
                e("div", { className: "as-pit" },
                  e("span", { className: "pl w" }, "W"), e("span", { className: "pn" }, g.win),
                  e("span", { className: "pl l" }, "L"), e("span", { className: "pn" }, g.loss),
                  e("span", { className: "pl s" }, "S"), e("span", { className: "pn" }, g.save)),
                e("div", { className: "as-wx" },
                  e(SunIcon, null),
                  e("span", { className: "wt" }, w.temperature),
                  e("span", { className: "wc" }, w.conditions),
                  e("span", { className: "wd" }, w.wind + " \u00b7 Humidity " + w.humidity)))))))
    );
  }

  window.AnaheimSpread = Spread;
})();
